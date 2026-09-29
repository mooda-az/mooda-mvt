import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/CheckoutForm";
import { SiteHeader } from "@/components/SiteHeader";
import { TrackView } from "@/components/TrackView";
import { t } from "@/lib/i18n";
import { deliveryFee, findProduct, formatAzn } from "@/lib/products";
import { getContext } from "@/lib/server-context";

export default async function CheckoutPage({ searchParams }: PageProps<"/checkout">) {
  const query = await searchParams;
  const product = typeof query.product === "string" ? findProduct(query.product) : undefined;
  const size = typeof query.size === "string" ? query.size : "";
  if (!product || !product.sizes.includes(size)) notFound();

  const { lang, variant } = await getContext();
  const d = t(lang);
  const fee = deliveryFee(product.price);

  return (
    <>
      <TrackView name="checkout_view" productId={product.id} />
      <SiteHeader lang={lang} />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 md:px-8 md:py-10">
        <h1 className="mb-6 font-display text-[26px] font-bold leading-8 tracking-[-0.015em] md:text-[32px] md:leading-10">
          {d.checkoutTitle}
        </h1>
        <CheckoutForm
          d={d}
          product={{ id: product.id, seller: product.seller, image: product.image, alt: product.alt, title: product.title[lang] }}
          size={size}
          showSeller={variant === "t"}
          prices={{
            subtotal: formatAzn(product.price),
            delivery: fee > 0 ? formatAzn(fee) : null,
            total: formatAzn(product.price + fee),
          }}
        />
      </main>
    </>
  );
}
