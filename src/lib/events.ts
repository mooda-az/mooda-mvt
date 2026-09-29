// MVT funnel-i: landing_view → lead_form_view → lead_submitted.
// Məhsul marağı ayrıca product_card_clicked → product_view ilə ölçülür.
export const EVENT_NAMES = [
  "landing_view",
  "product_card_clicked",
  "product_view",
  "lead_form_view",
  "lead_submitted",
  "lead_submit_failed",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

export function isEventName(value: unknown): value is EventName {
  return typeof value === "string" && (EVENT_NAMES as readonly string[]).includes(value);
}
