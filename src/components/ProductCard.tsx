import Image from "next/image";
import Link from "next/link";
import type { Lang, Variant } from "@/lib/context";
import { t } from "@/lib/i18n";
import { formatAzn, type Product } from "@/lib/products";

export function ProductCard({ product, lang, variant }: { product: Product; lang: Lang; variant: Variant }) {
  const d = t(lang);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return (
    <Link href={`/p/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-ghost">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {discount > 0 && (
            <span className="rounded bg-secondary-glaze px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.04em] text-secondary">
              -{discount}%
            </span>
          )}
          {variant === "t" && (
            <span className="rounded bg-trust-glaze px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.04em] text-trust">
              {d.sellerVerified}
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 space-y-1">
        {variant === "t" && (
          <p className="text-[10px] font-bold uppercase tracking-[0.04em] text-muted">{product.seller}</p>
        )}
        <p className="line-clamp-1 text-sm">{product.title[lang]}</p>
        <p className="tabular flex items-baseline gap-2">
          <span className="font-display text-lg font-extrabold tracking-[-0.02em]">{formatAzn(product.price)}</span>
          {product.oldPrice && <span className="text-xs text-muted line-through">{formatAzn(product.oldPrice)}</span>}
        </p>
      </div>
    </Link>
  );
}
