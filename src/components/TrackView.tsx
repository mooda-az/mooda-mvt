"use client";

import { useEffect } from "react";
import type { EventName } from "@/lib/events";
import { track } from "@/lib/track";

export function TrackView({ name, productId }: { name: EventName; productId?: string }) {
  useEffect(() => {
    track(name, { productId });
  }, [name, productId]);
  return null;
}
