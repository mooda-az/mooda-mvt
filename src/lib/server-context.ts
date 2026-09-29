import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { COOKIE, parseLang, type Lang } from "./context";

export const getContext = cache(async function getContext(): Promise<{ lang: Lang }> {
  const jar = await cookies();
  return {
    lang: parseLang(jar.get(COOKIE.lang)?.value) ?? "az",
  };
});
