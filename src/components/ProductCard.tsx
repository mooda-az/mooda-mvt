import Image from "next/image";
import type { Lang } from "@/lib/context";
import { t } from "@/lib/i18n";
import type { Product } from "@/lib/products";
import { TrackedLink } from "./TrackedLink";

export function ProductCard({ product, lang }: { product: Product; lang: Lang }) {
  const d = t(lang);
  return (
    <TrackedLink href={`/p/${product.id}`} name="product_card_clicked" productId={product.id} className="group block rounded-lg">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-ghost">
        <Image
          src={product.image}
          alt={product.alt[lang]}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="mt-3 space-y-1.5">
        <p className="line-clamp-2 text-sm font-medium">{product.title[lang]}</p>
        <p className="text-xs font-semibold text-secondary transition-colors group-hover:text-secondary-container">
          {d.productCardCta} →
        </p>
      </div>
    </TrackedLink>
  );
}
