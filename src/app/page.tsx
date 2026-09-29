import { HeroCarousel } from "@/components/HeroCarousel";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackView } from "@/components/TrackView";
import { t } from "@/lib/i18n";
import { products } from "@/lib/products";
import { getContext } from "@/lib/server-context";

export default async function Landing() {
  const { lang } = await getContext();
  const d = t(lang);
  return (
    <>
      <TrackView name="landing_view" />
      <SiteHeader lang={lang} />
      <main id="main-content" tabIndex={-1} className="scroll-mt-28 flex-1">
        <section className="bg-primary text-on-primary">
          <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-5 py-8 sm:px-6 sm:py-10 md:grid-cols-2 md:px-8 md:py-16">
            <div className="min-w-0 space-y-5">
              <p className="flex items-center gap-3 text-base font-bold leading-6 md:text-lg">
                <span aria-hidden="true" className="h-0.5 w-6 shrink-0 bg-secondary" />
                <span className="text-pretty">{d.heroKicker}</span>
              </p>
              <h1 className="text-balance font-display text-[34px] font-extrabold leading-[40px] tracking-[-0.02em] md:text-5xl md:leading-[56px] md:tracking-[-0.03em]">
                {d.heroTitle1}
                <br />
                <span className="italic font-semibold">{d.heroTitle2}</span>
              </h1>
              <p className="max-w-xl border-l-2 border-secondary py-1 pl-4 text-sm font-bold leading-6 text-white md:text-base">
                {d.heroOffer}
              </p>
              <p className="max-w-xl text-pretty text-base text-white/80">{d.heroBody}</p>
              <LeadCaptureForm d={d} placement="hero" theme="dark" />
            </div>
            <HeroCarousel d={d} />
          </div>
        </section>

        <section id="kolleksiya" className="mx-auto max-w-[1440px] scroll-mt-28 px-5 pt-10 sm:px-6 md:px-8 md:pt-16">
          <h2 className="font-display text-[26px] font-bold leading-8 tracking-[-0.015em] md:text-[32px] md:leading-10">
            {d.gridTitle}
          </h2>
          <p className="mt-1 text-sm text-muted">{d.gridSubtitle}</p>
          <div className="mt-6 grid grid-cols-1 gap-x-3 gap-y-8 min-[360px]:grid-cols-2 md:grid-cols-4 md:gap-x-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} lang={lang} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
