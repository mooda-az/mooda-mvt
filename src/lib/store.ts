import "server-only";
import postgres from "postgres";

// Erkən giriş qeydləri və eventlər Supabase Postgres-in private sxeminə gedir (supabase/schema.sql).
// Qoşulma yalnız INSERT hüququ olan mvt_writer roludur, Supavisor pooler (transaction mode) üzərindən.

export type Lead = {
  leadId: string;
  phone: string;
  placement: "hero" | "product";
  productId: string;
  product: string;
  lang: string;
  source: string;
  session: string;
  offer: string;
};

export type Event = {
  name: string;
  session: string;
  lang: string;
  source: string;
  productId: string;
  detail: string;
};

const globalForDb = globalThis as unknown as { mvtDb?: postgres.Sql };

function db(): postgres.Sql | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  // Transaction mode prepared statement-ləri dəstəkləmir.
  globalForDb.mvtDb ??= postgres(url, { prepare: false, ssl: "require", max: 5 });
  return globalForDb.mvtDb;
}

// +994501234567 → +99450***4567: loglarda tam nömrə görünməsin.
const maskPhone = (phone: string) => `${phone.slice(0, 6)}***${phone.slice(-4)}`;

// Qeyd itməməlidir: yazıla bilmirsə xəta atılır və istifadəçi təkrar cəhd edir.
// Eyni nömrə + məhsul ikinci dəfə gəlirsə səssizcə keçilir.
export async function saveLead(lead: Lead): Promise<void> {
  const sql = db();
  if (!sql) {
    console.info("[mvt] lead (DATABASE_URL yoxdur)", { ...lead, phone: maskPhone(lead.phone) });
    return;
  }
  await sql`
    insert into private.leads
      (lead_id, phone, placement, product_id, product, lang, source, session, offer)
    values
      (${lead.leadId}, ${lead.phone}, ${lead.placement}, ${lead.productId}, ${lead.product},
       ${lead.lang}, ${lead.source}, ${lead.session}, ${lead.offer})
    on conflict do nothing
  `;
}

// Event itkisi tolerans edilir — yalnız loglanır.
export async function saveEvent(event: Event): Promise<void> {
  const sql = db();
  if (!sql) {
    console.info("[mvt] event", event);
    return;
  }
  await sql`
    insert into private.events (name, session, lang, source, product_id, detail)
    values (${event.name}, ${event.session}, ${event.lang}, ${event.source},
            ${event.productId}, ${event.detail})
  `.catch((e) => console.error("[mvt] event yazılmadı", e instanceof Error ? e.message : e));
}
