import Link from "next/link";
import type { Lang } from "@/lib/context";
import { t } from "@/lib/i18n";

export function SiteHeader({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <header className="sticky top-0 z-20">
      <div className="bg-primary px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.04em] text-on-primary">
        {d.topBar}
      </div>
      <div className="border-b border-border-subtle bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="font-display text-[28px] font-extrabold tracking-[-0.05em]">
            mooda.
          </Link>
          <Link
            href={`?lang=${lang === "az" ? "ru" : "az"}`}
            className="rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold tracking-[0.02em] hover:bg-ghost"
            aria-label={lang === "az" ? "Русский язык" : "Azərbaycan dili"}
          >
            {d.langSwitch}
          </Link>
        </div>
      </div>
    </header>
  );
}
