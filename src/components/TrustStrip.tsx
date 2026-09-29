import type { Lang } from "@/lib/context";
import { t } from "@/lib/i18n";

const ICONS = ["✓", "↺", "→"];

export function TrustStrip({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <section aria-label={d.trustTitle} className="mx-auto grid max-w-[1440px] gap-3 px-4 md:grid-cols-3 md:px-8">
      {d.trust.map((item, i) => (
        <div
          key={item.title}
          className="flex gap-3 rounded-lg border border-border-subtle bg-canvas p-4 shadow-[var(--shadow-card)]"
        >
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-trust-glaze font-bold text-trust"
          >
            {ICONS[i]}
          </span>
          <div>
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="text-xs text-muted">{item.body}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
