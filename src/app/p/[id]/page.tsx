import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackView } from "@/components/TrackView";
import { t } from "@/lib/i18n";
import { findProduct, isRetiredProduct } from "@/lib/products";
import { getContext } from "@/lib/server-context";

export default async function ProductPage({ params }: PageProps<"/p/[id]">) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) {
    if (isRetiredProduct(id)) permanentRedirect("/#kolleksiya");
    notFound();
  }

  const { lang } = await getContext();
  const d = t(lang);

  return (
    <>
      <TrackView name="product_view" productId={product.id} />
      <SiteHeader lang={lang} />
      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[1440px] scroll-mt-28 flex-1 px-5 py-5 sm:px-6 md:px-8 md:py-10">
        <Link href="/#kolleksiya" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-primary">
          ← {d.back}
        </Link>
        <div className="mt-4 grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-ghost">
            <Image src={product.image} alt={product.alt[lang]} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="min-w-0 space-y-6 md:pt-4">
            <div className="space-y-2">
              <h1 className="font-display text-[26px] font-bold leading-8 tracking-[-0.015em] md:text-[32px] md:leading-10">
                {product.title[lang]}
              </h1>
            </div>
            <div className="border-t border-border-subtle pt-6">
              <h2 className="font-display text-xl font-bold tracking-[-0.015em]">{d.productInterestTitle}</h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-muted">{d.productInterestBody}</p>
            </div>
            <LeadCaptureForm
              d={d}
              placement="product"
              productId={product.id}
            />
          </div>
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
