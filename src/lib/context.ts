// MVT konteksti: dil (az/ru) və etibar variantı (A/B). proxy.ts ilk girişdə
// query-dən (?lang=, ?v=, utm_*) cookie-yə yazır; səhifələr cookie-dən oxuyur.

export type Lang = "az" | "ru";
// t — etibar elementləri görünür (VÖEN, qaytarma, butik adı); p — sadə versiya
export type Variant = "t" | "p";

export const COOKIE = {
  lang: "mvt_lang",
  variant: "mvt_v",
  source: "mvt_src",
  session: "mvt_sid",
} as const;

export function parseLang(value: string | undefined | null): Lang | undefined {
  return value === "az" || value === "ru" ? value : undefined;
}

export function parseVariant(value: string | undefined | null): Variant | undefined {
  return value === "t" || value === "p" ? value : undefined;
}
