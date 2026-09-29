import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackView } from "@/components/TrackView";
import { TrustStrip } from "@/components/TrustStrip";
import { t } from "@/lib/i18n";
import { heroImage, products } from "@/lib/products";
import { getContext } from "@/lib/server-context";

export default async function Landing() {
  const { lang, variant } = await getContext();
  const d = t(lang);
  return (
    <>
      <TrackView name="landing_view" />
      <SiteHeader lang={lang} />
      <main className="flex-1">
        <section className="bg-primary text-on-primary">
          <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-4 py-10 md:grid-cols-2 md:px-8 md:py-16">
            <div className="space-y-5">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.04em]">
                <span className="h-0.5 w-6 bg-secondary" />
                {d.heroKicker}
              </p>
              <h1 className="font-display text-[34px] font-extrabold leading-[40px] tracking-[-0.02em] md:text-5xl md:leading-[56px] md:tracking-[-0.03em]">
                {d.heroTitle1}
                <br />
                <span className="italic font-semibold">{d.heroTitle2}</span>
              </h1>
              <p className="max-w-md text-base text-white/75">{d.heroBody}</p>
              <a
                href="#kolleksiya"
                className="inline-flex h-12 items-center rounded bg-canvas px-6 text-sm font-semibold text-primary transition active:scale-[0.98] md:h-11"
              >
                {d.heroCta} →
              </a>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:aspect-[5/4]">
              <Image src={heroImage} alt="" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </section>

        {variant === "t" && (
          <div className="-mt-0 pt-8">
            <TrustStrip lang={lang} />
          </div>
        )}

        <section id="kolleksiya" className="mx-auto max-w-[1440px] scroll-mt-24 px-4 pt-10 md:px-8 md:pt-16">
          <h2 className="font-display text-[26px] font-bold leading-8 tracking-[-0.015em] md:text-[32px] md:leading-10">
            {d.gridTitle}
          </h2>
          <p className="mt-1 text-sm text-muted">{d.gridSubtitle}</p>
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} lang={lang} variant={variant} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
