import { NextResponse, type NextRequest } from "next/server";
import { normalizePhone } from "@/lib/phone";
import { findProduct } from "@/lib/products";
import { requestContext } from "@/lib/request-context";
import { saveEvent, saveLead } from "@/lib/store";

type Body = {
  phone?: unknown;
  placement?: unknown;
  productId?: unknown;
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

  if (!phone || (placement === "product" && !product)) {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }

  const ctx = requestContext(request);
  const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}`;

  try {
    await saveLead({
      leadId,
      phone,
      placement,
      productId: product ? productId : "",
      product: product?.title.az ?? "",
      lang: ctx.lang,
      source: ctx.source,
      session: ctx.session,
      offer: "first_order_30_percent",
    });
  } catch (e) {
    // Xəta obyekti sorğu parametrlərini (nömrəni) daşıya bilər — yalnız mesaj loglanır.
    console.error("[mvt] lead yazılmadı", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "store_failed" }, { status: 502 });
  }

  await saveEvent({
    name: "lead_submitted",
    session: ctx.session,
    lang: ctx.lang,
    source: ctx.source,
    productId,
    detail: placement,
  });

  return NextResponse.json({ leadId });
}
