import type { EventName } from "./events";

export function track(name: EventName, props: { productId?: string; detail?: string } = {}): void {
  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, ...props }),
    keepalive: true,
  }).catch(() => undefined);
}
