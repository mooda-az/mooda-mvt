import Link from "next/link";
import type { Lang } from "@/lib/context";
import { t } from "@/lib/i18n";
import { Logo } from "./Logo";

export function SiteHeader({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <header className="sticky top-0 z-20">
      <div className="bg-secondary px-4 py-2.5 text-center text-xs font-bold leading-5 tracking-[0.01em] text-on-primary sm:text-sm">
        <span className="text-balance">{d.topBar}</span>
      </div>
      <div className="border-b border-border-subtle bg-canvas/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-8">
          <Link href="/" aria-label={d.homeLabel} className="rounded-sm">
            <Logo className="text-[28px]" />
          </Link>
          <Link
            href={`?lang=${lang === "az" ? "ru" : "az"}`}
            className="flex h-11 min-w-11 items-center justify-center rounded-full border border-border-subtle px-3 text-xs font-semibold tracking-[0.02em] transition-colors hover:border-primary hover:bg-ghost"
            aria-label={lang === "az" ? "Русский язык" : "Azərbaycan dili"}
          >
            {d.langSwitch}
          </Link>
        </div>
      </div>
    </header>
  );
}
