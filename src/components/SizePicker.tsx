"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  productId: string;
  sizes: string[];
  labels: { size: string; chooseSize: string; order: string };
};

export function SizePicker({ productId, sizes, labels }: Props) {
  const [size, setSize] = useState(sizes.length === 1 ? sizes[0] : "");
  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.02em]">{labels.size}</legend>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={size === s}
              onClick={() => setSize(s)}
              className={`h-11 min-w-12 rounded border px-3 text-sm font-semibold transition ${
                size === s ? "border-primary bg-primary text-on-primary" : "border-border-subtle bg-canvas hover:border-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>
      {size ? (
        <Link
          href={`/checkout?product=${encodeURIComponent(productId)}&size=${encodeURIComponent(size)}`}
          className="flex h-12 w-full items-center justify-center rounded bg-primary text-sm font-semibold text-on-primary transition active:scale-[0.98] md:h-11"
        >
          {labels.order}
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="h-12 w-full cursor-not-allowed rounded bg-ghost text-sm font-semibold text-muted md:h-11"
        >
          {labels.chooseSize}
        </button>
      )}
    </div>
  );
}
