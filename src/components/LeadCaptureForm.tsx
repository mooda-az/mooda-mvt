"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Dict } from "@/lib/i18n";
import { normalizePhone } from "@/lib/phone";
import { track } from "@/lib/track";

type Props = {
  d: Dict;
  placement: "hero" | "product";
  theme?: "dark" | "light";
  productId?: string;
  productTitle?: string;
};

export function LeadCaptureForm({ d, placement, theme = "light", productId, productTitle }: Props) {
  const [phone, setPhone] = useState("+994 ");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const tracked = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    track("lead_form_view", { productId, detail: placement });
  }, [placement, productId]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizePhone(phone);
    if (!normalized) {
      setError(d.leadPhoneError);
      inputRef.current?.focus();
      return;
    }

    setError("");
    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalized, placement, productId, productTitle }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("success");
    } catch {
      setStatus("idle");
      setError(d.leadSubmitError);
      track("lead_submit_failed", { productId, detail: placement });
    }
  }

  const dark = theme === "dark";

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-lg border p-4 ${dark ? "border-white/20 bg-white/10 text-white" : "border-success/25 bg-success-glaze text-primary"}`}
      >
        <p className="font-display text-lg font-bold">{d.leadSuccessTitle}</p>
        <p className={`mt-1 text-sm ${dark ? "text-white/75" : "text-muted"}`}>{d.leadSuccessBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl" aria-label={d.leadFormLabel}>
      <label htmlFor={`lead-phone-${placement}`} className={`block text-xs font-semibold ${dark ? "text-white" : "text-primary"}`}>
        {d.phone}
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          ref={inputRef}
          id={`lead-phone-${placement}`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          spellCheck={false}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `lead-phone-${placement}-error` : `lead-phone-${placement}-hint`}
          className={`h-12 min-w-0 flex-1 rounded border px-4 text-base transition-colors ${
            dark ? "border-white/25 bg-white text-primary" : "border-border-subtle bg-canvas text-primary"
          } ${error ? "border-error" : "focus-visible:border-primary"}`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`h-12 shrink-0 rounded px-5 text-sm font-semibold transition-[background-color,transform] active:scale-[0.98] disabled:cursor-wait disabled:opacity-65 ${
            dark ? "bg-secondary text-white hover:bg-secondary-container" : "bg-primary text-on-primary hover:bg-neutral"
          }`}
        >
          {status === "submitting" ? d.leadSubmitting : d.leadCta}
        </button>
      </div>
      {error ? (
        <p id={`lead-phone-${placement}-error`} role="alert" className={`mt-2 text-xs ${dark ? "text-rose-200" : "text-error"}`}>
          {error}
        </p>
      ) : (
        <p id={`lead-phone-${placement}-hint`} className={`mt-2 text-xs ${dark ? "text-white/65" : "text-muted"}`}>
          {d.leadPrivacy}
        </p>
      )}
    </form>
  );
}
