// MVT konteksti: proxy.ts ilk girişdə dili və reklam mənbəyini cookie-yə
// yazır; səhifələr və qeyd endpoint-ləri eyni kontekstdən istifadə edir.

export type Lang = "az" | "ru";

export const COOKIE = {
  // Ad dəyişib: köhnə `mvt_lang` prefetch xətası ilə 30 günlük `ru` yazırdı, oxunmur.
  lang: "mvt_lang_s",
  source: "mvt_src",
  session: "mvt_sid",
} as const;

export function parseLang(value: string | undefined | null): Lang | undefined {
  return value === "az" || value === "ru" ? value : undefined;
}
