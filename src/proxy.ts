import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, parseLang, parseVariant } from "./lib/context";

const MAX_AGE = 60 * 60 * 24 * 30;

export function proxy(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const updates = new Map<string, string>();

  const lang = parseLang(searchParams.get("lang"));
  if (lang) updates.set(COOKIE.lang, lang);

  // Variant reklam linkində (?v=t|p) verilir; verilməyibsə 50/50 təyin olunur
  // və sonrakı girişlərdə dəyişmir.
  const variant = parseVariant(searchParams.get("v"));
  if (variant) updates.set(COOKIE.variant, variant);
  else if (!request.cookies.has(COOKIE.variant)) updates.set(COOKIE.variant, Math.random() < 0.5 ? "t" : "p");

  if (!request.cookies.has(COOKIE.session)) updates.set(COOKIE.session, crypto.randomUUID());

  const utm = ["utm_source", "utm_medium", "utm_campaign", "utm_content"]
    .map((key) => searchParams.get(key))
    .filter(Boolean)
    .join("|");
  if (utm) updates.set(COOKIE.source, utm);

  if (updates.size === 0) return NextResponse.next();

  // Eyni sorğunun render-i də yeni dəyəri görsün deyə həm sorğuya, həm cavaba yazılır.
  for (const [name, value] of updates) request.cookies.set(name, value);
  const response = NextResponse.next({ request: { headers: request.headers } });
  for (const [name, value] of updates) {
    response.cookies.set(name, value, { maxAge: MAX_AGE, sameSite: "lax", path: "/" });
  }
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
