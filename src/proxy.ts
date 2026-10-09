import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, parseLang } from "./lib/context";

const MAX_AGE = 60 * 60 * 24 * 30;

export function proxy(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const updates = new Map<string, string>();

  const lang = parseLang(searchParams.get("lang"));
  if (lang) updates.set(COOKIE.lang, lang);

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
    // Dil yalnız bu ziyarət üçün yadda qalır: yeni ziyarət yenə az ilə başlayır.
    const maxAge = name === COOKIE.lang ? undefined : MAX_AGE;
    response.cookies.set(name, value, { maxAge, sameSite: "lax", path: "/" });
  }
  return response;
}

// Link prefetch-ləri proxy-dən keçməməlidir: `?lang=ru` linkinin prefetch-i istifadəçi
// heç nə seçmədən dil cookie-sini dəyişirdi.
export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
