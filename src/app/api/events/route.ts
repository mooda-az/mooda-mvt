import { NextResponse, type NextRequest } from "next/server";
import { isEventName } from "@/lib/events";
import { requestContext } from "@/lib/request-context";
import { deliverEvent } from "@/lib/sinks";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { name?: unknown; productId?: unknown; detail?: unknown }
    | null;
  if (!body || !isEventName(body.name) || body.name === "order_submitted") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const ctx = requestContext(request);
  await deliverEvent({
    createdAt: new Date().toISOString(),
    name: body.name,
    session: ctx.session,
    lang: ctx.lang,
    variant: ctx.variant,
    source: ctx.source,
    productId: typeof body.productId === "string" ? body.productId.slice(0, 64) : "",
    detail: typeof body.detail === "string" ? body.detail.slice(0, 200) : "",
  });
  return new NextResponse(null, { status: 204 });
}
