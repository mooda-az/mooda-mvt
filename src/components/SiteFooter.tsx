import type { Lang } from "@/lib/context";
import { t } from "@/lib/i18n";

export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="mt-16 border-t border-border-subtle bg-canvas">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <span className="font-display text-2xl font-extrabold tracking-[-0.05em]">mooda.</span>
        <p className="max-w-md text-sm text-muted">{t(lang).footer}</p>
        <div className="flex gap-2 text-[11px] font-semibold">
          {["Visa", "Mastercard"].map((card) => (
            <span key={card} className="rounded border border-border-subtle px-2 py-1">
              {card}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
