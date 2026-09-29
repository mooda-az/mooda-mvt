import "server-only";
import type { NextRequest } from "next/server";
import { COOKIE, parseLang, parseVariant } from "./context";

export function requestContext(request: NextRequest) {
  const c = request.cookies;
  return {
    session: c.get(COOKIE.session)?.value ?? "",
    lang: parseLang(c.get(COOKIE.lang)?.value) ?? "az",
    variant: parseVariant(c.get(COOKIE.variant)?.value) ?? "t",
    source: c.get(COOKIE.source)?.value ?? "",
  };
}
