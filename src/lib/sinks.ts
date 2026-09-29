import "server-only";

// Backend yoxdur: erkən giriş qeydləri və eventlər Google Sheets-ə (Apps Script web app)
// və/və ya Telegram-a gedir. Hansı env verilibsə, o işləyir.

export type Row = Record<string, string | number | boolean | null>;

async function toSheets(sheet: "leads" | "events", row: Row): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ secret: process.env.SHEETS_WEBHOOK_SECRET ?? "", sheet, row }),
    redirect: "follow",
  });
  // Apps Script xətanı da 200 ilə qaytarır; nəticə gövdədədir.
  const result = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!res.ok || !result?.ok) throw new Error(`Sheets webhook ${res.status} ${result?.error ?? ""}`);
}

async function toTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}`);
}

export function sinksConfigured(): boolean {
  return Boolean(
    process.env.SHEETS_WEBHOOK_URL || (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
  );
}

// Qeyd itməməlidir: ən azı bir kanal uğurlu olmalıdır, əks halda xəta.
export async function deliverLead(row: Row, telegramText: string): Promise<void> {
  if (!sinksConfigured()) {
    console.info("[mvt] lead (sink yoxdur)", row);
    return;
  }
  const deliveries: Promise<void>[] = [];
  if (process.env.SHEETS_WEBHOOK_URL) deliveries.push(toSheets("leads", row));
  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    deliveries.push(toTelegram(telegramText));
  }
  const results = await Promise.allSettled(deliveries);
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  failures.forEach((f) => console.error("[mvt] lead sink xətası", f.reason));
  if (failures.length === results.length) throw new Error("Heç bir sink qeydi qəbul etmədi");
}

// Event itkisi tolerans edilir — yalnız loglanır.
export async function deliverEvent(row: Row): Promise<void> {
  if (!process.env.SHEETS_WEBHOOK_URL) {
    console.info("[mvt] event", row);
    return;
  }
  await toSheets("events", row).catch((e) => console.error("[mvt] event sink xətası", e));
}
