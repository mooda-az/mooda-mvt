import { NextResponse, type NextRequest } from "next/server";
import { deliveryFee, findProduct } from "@/lib/products";
import { normalizePhone } from "@/lib/phone";
import { requestContext } from "@/lib/request-context";
import { deliverEvent, deliverOrder } from "@/lib/sinks";
import { t } from "@/lib/i18n";

const ZONES = t("az").zones;

type Body = {
  productId?: unknown;
  size?: unknown;
  name?: unknown;
  phone?: unknown;
  district?: unknown;
  address?: unknown;
  note?: unknown;
  // card — birbaşa kart seçdi; cod_to_card — əvvəl qapıda ödəniş seçdi, sonra karta keçdi
  paymentPath?: unknown;
};

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Body | null;
  if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const product = findProduct(text(body.productId, 64));
  const size = text(body.size, 16);
  const name = text(body.name, 120);
  const phone = normalizePhone(text(body.phone, 32));
  const district = Number(body.district);
  const address = text(body.address, 300);
  const note = text(body.note, 300);
  const paymentPath = body.paymentPath === "cod_to_card" ? "cod_to_card" : "card";

  if (
    !product ||
    !product.sizes.includes(size) ||
    !name ||
    !phone ||
    !Number.isInteger(district) ||
    district < 0 ||
    district >= ZONES.length ||
    !address
  ) {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }

  const ctx = requestContext(request);
  const fee = deliveryFee(product.price);
  const total = product.price + fee;
  const orderId = `MVT-${Date.now().toString(36).toUpperCase()}`;
  const createdAt = new Date().toISOString();

  const row = {
    createdAt,
    orderId,
    session: ctx.session,
    lang: ctx.lang,
    variant: ctx.variant,
    source: ctx.source,
    productId: product.id,
    seller: product.seller,
    size,
    price: product.price,
    deliveryFee: fee,
    total,
    paymentPath,
    name,
    phone,
    district: ZONES[district],
    address,
    note,
  };

  const telegram = [
    `🛍 Yeni MVT sifarişi ${orderId}`,
    `${product.seller} · ${product.title.az} · ölçü ${size}`,
    `Yekun: ${total.toFixed(2)} AZN (${paymentPath === "cod_to_card" ? "qapıda → kart" : "kart"})`,
    `${name} · ${phone}`,
    `${ZONES[district]} · ${address}`,
    note ? `Qeyd: ${note}` : "",
    `Variant ${ctx.variant} · ${ctx.lang}${ctx.source ? ` · ${ctx.source}` : ""}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await deliverOrder(row, telegram);
  } catch {
    return NextResponse.json({ error: "sink_failed" }, { status: 502 });
  }

  await deliverEvent({
    createdAt,
    name: "order_submitted",
    session: ctx.session,
    lang: ctx.lang,
    variant: ctx.variant,
    source: ctx.source,
    productId: product.id,
    detail: paymentPath,
  });

  return NextResponse.json({ orderId, paymentUrl: process.env.PAYMENT_LINK_URL || null });
}
