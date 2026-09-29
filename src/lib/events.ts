// MVT-1-in ölçdüyü eventlər. Funnel: landing_view → product_view →
// checkout_view → payment_selected → (cod_prompt_shown → cod_to_card | cod_declined)
// → order_submitted.
export const EVENT_NAMES = [
  "landing_view",
  "product_view",
  "checkout_view",
  "payment_selected",
  "cod_prompt_shown",
  "cod_to_card",
  "cod_declined",
  "order_submitted",
  "payment_redirect",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

export function isEventName(value: unknown): value is EventName {
  return typeof value === "string" && (EVENT_NAMES as readonly string[]).includes(value);
}
