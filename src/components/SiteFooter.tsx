import type { Lang } from "@/lib/context";
import { t } from "@/lib/i18n";
import { Logo } from "./Logo";

export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="mt-16 border-t border-border-subtle bg-canvas">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
        <Logo className="text-2xl" />
        <p className="max-w-md text-sm text-muted">{t(lang).footer}</p>
      </div>
    </footer>
  );
}
