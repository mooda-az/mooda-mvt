"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { EventName } from "@/lib/events";
import { track } from "@/lib/track";

type Props = {
  href: string;
  className?: string;
  name: EventName;
  productId?: string;
  detail?: string;
  children: ReactNode;
};

export function TrackedLink({ href, className, name, productId, detail, children }: Props) {
  return (
    <Link href={href} className={className} onClick={() => track(name, { productId, detail })}>
      {children}
    </Link>
  );
}
