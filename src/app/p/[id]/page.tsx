import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SizePicker } from "@/components/SizePicker";
import { TrackView } from "@/components/TrackView";
import { t } from "@/lib/i18n";
import { findProduct, formatAzn } from "@/lib/products";
import { getContext } from "@/lib/server-context";

export default async function ProductPage({ params }: PageProps<"/p/[id]">) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  const { lang, variant } = await getContext();
  const d = t(lang);

  return (
    <>
      <TrackView name="product_view" productId={product.id} />
      <SiteHeader lang={lang} />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 md:px-8 md:py-10">
        <Link href="/#kolleksiya" className="text-sm text-muted hover:text-primary">
          ← {d.back}
        </Link>
        <div className="mt-4 grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-ghost">
            <Image src={product.image} alt={product.alt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="space-y-6 md:pt-4">
            <div className="space-y-2">
              {variant === "t" && (
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.04em] text-muted">
                  {d.seller}: {product.seller}
                  <span className="rounded bg-trust-glaze px-1.5 py-0.5 text-trust">{d.sellerVerified}</span>
                </p>
              )}
              <h1 className="font-display text-[26px] font-bold leading-8 tracking-[-0.015em] md:text-[32px] md:leading-10">
                {product.title[lang]}
              </h1>
              <p className="tabular flex items-baseline gap-3">
                <span className="font-display text-2xl font-extrabold tracking-[-0.02em]">{formatAzn(product.price)}</span>
                {product.oldPrice && <span className="text-sm text-muted line-through">{formatAzn(product.oldPrice)}</span>}
              </p>
            </div>
            <SizePicker
              productId={product.id}
              sizes={product.sizes}
              labels={{ size: d.size, chooseSize: d.chooseSize, order: d.order }}
            />
            {variant === "t" && (
              <ul className="space-y-3 border-t border-border-subtle pt-5">
                {d.trust.map((item) => (
                  <li key={item.title} className="text-sm">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-muted"> — {item.body}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
