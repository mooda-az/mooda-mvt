import { NextResponse, type NextRequest } from "next/server";
import { normalizePhone } from "@/lib/phone";
import { findProduct } from "@/lib/products";
import { requestContext } from "@/lib/request-context";
import { deliverEvent, deliverLead } from "@/lib/sinks";

type Body = {
  phone?: unknown;
  placement?: unknown;
  productId?: unknown;
  productTitle?: unknown;
};

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Body | null;
  if (!body) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const phone = normalizePhone(text(body.phone, 32));
  const placement = body.placement === "product" ? "product" : "hero";
  const productId = text(body.productId, 64);
  const product = productId ? findProduct(productId) : undefined;
  const productTitle = product?.title.az ?? text(body.productTitle, 160);

  if (!phone || (placement === "product" && !product)) {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }

  const ctx = requestContext(request);
  const createdAt = new Date().toISOString();
  const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}`;
  const row = {
    createdAt,
    leadId,
    session: ctx.session,
    lang: ctx.lang,
    source: ctx.source,
    phone,
    placement,
    productId,
    productTitle,
    offer: "first_order_30_percent",
  };

  const telegram = [
    `✨ Yeni MVT erkən giriş qeydi ${leadId}`,
    `Telefon: ${phone}`,
    product ? `Məhsul marağı: ${product.title.az} (${product.id})` : "Maraq: ümumi erkən giriş",
    `Mənbə: ${placement} · ${ctx.lang}${ctx.source ? ` · ${ctx.source}` : ""}`,
    "Təklif: ilk sifarişə 30% açılış endirimi",
  ].join("\n");

  try {
    await deliverLead(row, telegram);
  } catch {
    return NextResponse.json({ error: "sink_failed" }, { status: 502 });
  }

  await deliverEvent({
    createdAt,
    name: "lead_submitted",
    session: ctx.session,
    lang: ctx.lang,
    source: ctx.source,
    productId,
    detail: placement,
  });

  return NextResponse.json({ leadId });
}
