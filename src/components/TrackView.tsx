"use client";

import { useEffect, useRef } from "react";
import type { EventName } from "@/lib/events";
import { track } from "@/lib/track";

export function TrackView({ name, productId }: { name: EventName; productId?: string }) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    track(name, { productId });
  }, [name, productId]);
  return null;
}
