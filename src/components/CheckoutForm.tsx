"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Dict } from "@/lib/i18n";
import { normalizePhone } from "@/lib/phone";
import type { Product } from "@/lib/products";
import { track } from "@/lib/track";

type Method = "card" | "cod";
type Fields = { name: string; phone: string; district: string; address: string; note: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Stage =
  | { kind: "form" }
  | { kind: "cod_prompt" }
  | { kind: "declined"; sent: boolean }
  | { kind: "done"; orderId: string; paymentUrl: string | null };

type Props = {
  d: Dict;
  product: Pick<Product, "id" | "seller" | "image" | "alt"> & { title: string };
  size: string;
  showSeller: boolean;
  prices: { subtotal: string; delivery: string | null; total: string };
};

export function CheckoutForm({ d, product, size, showSeller, prices }: Props) {
  const [fields, setFields] = useState<Fields>({ name: "", phone: "+994 ", district: "", address: "", note: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [method, setMethod] = useState<Method | null>(null);
  const [stage, setStage] = useState<Stage>({ kind: "form" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [reason, setReason] = useState("");

  const set = (key: keyof Fields) => (e: { target: { value: string } }) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  function validate(): boolean {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = d.errRequired;
    if (!normalizePhone(fields.phone)) next.phone = d.errPhone;
    if (fields.district === "") next.district = d.errRequired;
    if (!fields.address.trim()) next.address = d.errRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function chooseMethod(m: Method) {
    setMethod(m);
    track("payment_selected", { productId: product.id, detail: m });
  }

  async function submitOrder(paymentPath: "card" | "cod_to_card") {
    setSubmitting(true);
    setSubmitError(false);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, size, ...fields, district: Number(fields.district), paymentPath }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { orderId: string; paymentUrl: string | null };
      setStage({ kind: "done", ...data });
      if (data.paymentUrl) {
        track("payment_redirect", { productId: product.id });
        setTimeout(() => window.location.assign(data.paymentUrl!), 1500);
      }
    } catch {
      setSubmitError(true);
      setStage({ kind: "form" });
    } finally {
      setSubmitting(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!method || !validate()) return;
    if (method === "cod") {
      track("cod_prompt_shown", { productId: product.id });
      setStage({ kind: "cod_prompt" });
      return;
    }
    void submitOrder("card");
  }

  function codToCard() {
    track("cod_to_card", { productId: product.id });
    setMethod("card");
    void submitOrder("cod_to_card");
  }

  function sendDecline() {
    track("cod_declined", { productId: product.id, detail: reason || "no_reason" });
    setStage({ kind: "declined", sent: true });
  }

  if (stage.kind === "done") {
    return (
      <Panel>
        <div className="space-y-4 py-6 text-center">
          <span aria-hidden className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-trust-glaze text-2xl text-trust">
            ✓
          </span>
          <h1 className="font-display text-2xl font-bold tracking-[-0.01em]">{d.thanksTitle}</h1>
          <p className="text-sm text-muted">
            {d.thanksOrderId}: <span className="tabular font-semibold text-primary">{stage.orderId}</span>
          </p>
          <p className="mx-auto max-w-sm text-sm">{stage.paymentUrl ? d.thanksRedirect : d.thanksCard}</p>
          <Link href="/" className="inline-block text-sm font-semibold underline underline-offset-4">
            {d.thanksHome}
          </Link>
        </div>
      </Panel>
    );
  }

  if (stage.kind === "declined") {
    return (
      <Panel>
        <div className="space-y-4 py-6 text-center">
          <p className="text-sm">{d.codThanks}</p>
          <Link href="/" className="inline-block text-sm font-semibold underline underline-offset-4">
            {d.thanksHome}
          </Link>
        </div>
      </Panel>
    );
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <form id="checkout-form" onSubmit={onSubmit} noValidate className="space-y-6">
        <Panel step={1} title={d.contactTitle}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={d.name} error={errors.name}>
              <input autoComplete="name" value={fields.name} onChange={set("name")} className={input(errors.name)} />
            </Field>
            <Field label={d.phone} error={errors.phone}>
              <input type="tel" inputMode="tel" autoComplete="tel" value={fields.phone} onChange={set("phone")} className={input(errors.phone)} />
            </Field>
            <Field label={d.district} error={errors.district} hint={d.zoneNote}>
              <select value={fields.district} onChange={set("district")} className={input(errors.district)}>
                <option value="" disabled>
                  {d.districtPick}
                </option>
                {d.zones.map((z, i) => (
                  <option key={z} value={i}>
                    {z}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={d.address} error={errors.address}>
              <input autoComplete="street-address" value={fields.address} onChange={set("address")} className={input(errors.address)} />
            </Field>
            <div className="md:col-span-2">
              <Field label={d.note}>
                <textarea rows={2} value={fields.note} onChange={set("note")} className={`${input()} h-auto py-3`} />
              </Field>
            </div>
          </div>
        </Panel>

        <Panel step={2} title={d.paymentTitle}>
          <div role="radiogroup" aria-label={d.paymentTitle} className="grid gap-3 md:grid-cols-2">
            <MethodOption checked={method === "card"} onSelect={() => chooseMethod("card")} title={d.payCard} hint={d.payCardHint} icon="▭" />
            <MethodOption checked={method === "cod"} onSelect={() => chooseMethod("cod")} title={d.payCod} hint={d.payCodHint} icon="₼" />
          </div>
        </Panel>

        {submitError && <p role="alert" className="text-sm text-error">{d.errSubmit}</p>}

        <button
          type="submit"
          disabled={!method || submitting}
          className="h-12 w-full rounded bg-primary text-sm font-semibold text-on-primary transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ghost disabled:text-muted lg:hidden"
        >
          {submitting ? d.submitting : method === "cod" ? d.submitCod : d.submitCard} · {prices.total}
        </button>
      </form>

      <aside className="h-fit space-y-4 rounded-lg border border-border-subtle bg-canvas p-5 shadow-[var(--shadow-card)] lg:sticky lg:top-28">
        <h2 className="font-display text-xl font-semibold">{d.summary}</h2>
        <div className="flex gap-3">
          <div className="relative h-24 w-18 shrink-0 overflow-hidden rounded bg-ghost">
            <Image src={product.image} alt={product.alt} fill sizes="72px" className="object-cover" />
          </div>
          <div className="space-y-1 text-sm">
            {showSeller && <p className="text-[10px] font-bold uppercase tracking-[0.04em] text-muted">{d.seller}: {product.seller}</p>}
            <p className="font-semibold">{product.title}</p>
            <p className="text-muted">{d.size}: {size}</p>
          </div>
        </div>
        <dl className="tabular space-y-2 border-t border-border-subtle pt-4 text-sm">
          <Row label={d.subtotal} value={prices.subtotal} />
          <Row label={d.delivery} value={prices.delivery ?? d.free} accent={prices.delivery === null} />
          <div className="flex items-baseline justify-between border-t border-border-subtle pt-3">
            <dt className="font-semibold">{d.total}</dt>
            <dd className="font-display text-2xl font-extrabold tracking-[-0.02em]">{prices.total}</dd>
          </div>
        </dl>
        <button
          type="submit"
          form="checkout-form"
          disabled={!method || submitting}
          className="hidden h-11 w-full rounded bg-primary text-sm font-semibold text-on-primary transition active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ghost disabled:text-muted lg:block"
        >
          {submitting ? d.submitting : method === "cod" ? d.submitCod : d.submitCard}
        </button>
      </aside>

      {stage.kind === "cod_prompt" && (
        <div role="dialog" aria-modal="true" aria-labelledby="cod-title" className="fixed inset-0 z-30 flex items-end justify-center bg-primary/40 p-4 md:items-center">
          <div className="w-full max-w-md space-y-4 rounded-lg bg-canvas p-6 shadow-[var(--shadow-float)]">
            <h2 id="cod-title" className="font-display text-xl font-semibold">{d.codTitle}</h2>
            <p className="text-sm text-muted">{d.codBody}</p>
            <button
              type="button"
              onClick={codToCard}
              disabled={submitting}
              className="h-12 w-full rounded bg-primary text-sm font-semibold text-on-primary transition active:scale-[0.98] disabled:opacity-60"
            >
              {submitting ? d.submitting : d.codContinue}
            </button>
            <details className="group">
              <summary className="flex h-12 cursor-pointer list-none items-center justify-center rounded border border-primary text-sm font-semibold">
                {d.codDecline}
              </summary>
              <fieldset className="mt-4 space-y-2">
                <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.02em]">{d.codReasonLabel}</legend>
                {d.codReasons.map((r, i) => (
                  <label key={r} className="flex items-center gap-3 text-sm">
                    <input type="radio" name="reason" value={i} checked={reason === String(i)} onChange={() => setReason(String(i))} className="h-[18px] w-[18px] accent-primary" />
                    {r}
                  </label>
                ))}
                <button type="button" onClick={sendDecline} className="mt-3 h-11 w-full rounded bg-ghost text-sm font-semibold hover:bg-border-subtle">
                  {d.codSend}
                </button>
              </fieldset>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}

function input(error?: string) {
  return `h-12 w-full rounded-lg border bg-canvas px-4 text-sm outline-none transition focus:border-[1.5px] focus:border-primary ${
    error ? "border-error" : "border-border-subtle"
  }`;
}

function Panel({ step, title, children }: { step?: number; title?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border-subtle bg-canvas p-5 shadow-[var(--shadow-card)] md:p-6">
      {title && (
        <h2 className="mb-5 flex items-center gap-3 font-display text-xl font-semibold">
          {step && <span className="flex h-8 w-8 items-center justify-center rounded bg-primary text-sm text-on-primary">{step}</span>}
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold">{label}</span>
      {children}
      {error ? <span className="block text-xs text-error">{error}</span> : hint && <span className="block text-xs text-muted">{hint}</span>}
    </label>
  );
}

function MethodOption({ checked, onSelect, title, hint, icon }: { checked: boolean; onSelect: () => void; title: string; hint: string; icon: string }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className={`flex items-start gap-3 rounded-lg border p-4 text-left transition ${
        checked ? "border-[1.5px] border-primary bg-sand" : "border-border-subtle hover:border-primary"
      }`}
    >
      <span aria-hidden className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${checked ? "border-primary" : "border-muted"}`}>
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
      </span>
      <span className="space-y-0.5">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span aria-hidden>{icon}</span>
          {title}
        </span>
        <span className="block text-xs text-muted">{hint}</span>
      </span>
    </button>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className={accent ? "font-semibold text-trust" : ""}>{value}</dd>
    </div>
  );
}
