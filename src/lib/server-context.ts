import "server-only";
import { cookies } from "next/headers";
import { COOKIE, parseLang, parseVariant, type Lang, type Variant } from "./context";

export async function getContext(): Promise<{ lang: Lang; variant: Variant }> {
  const jar = await cookies();
  return {
    lang: parseLang(jar.get(COOKIE.lang)?.value) ?? "az",
    variant: parseVariant(jar.get(COOKIE.variant)?.value) ?? "t",
  };
}
