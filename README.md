# mooda-mvt

Mooda-nın əsas dəyər təklifini ölçən Minimum Viable Test səhifəsi: istifadəçi
məhsulu sifariş edir, evdə yoxlayır və yalnız saxlamaq istədiyini alır. Xidmət
hələ aktiv deyil; səhifə sifariş və ödəniş qəbul etmir.

## Testin məqsədi

Fərziyyə: Bakıda alıcılar “sifariş et → evdə yoxla → sonra qərar ver” təklifinə
maraq göstərir və açılış xəbəri ilə ilk sifarişə 30% endirim qarşılığında mobil
nömrəsini paylaşır.

Əsas konversiya `lead_submitted`-dır. Məhsul kartları satış kataloqu deyil, dəyər
təklifini konkretləşdirən nümunə kolleksiyadır. Qiymət, stok, satıcı təsdiqi,
çatdırılma, checkout və ödəniş vədi verilmir.

## Səhifələr və funnel

- `/` — dəyər təklifi, mobil nömrə forması və nümunə kolleksiya.
- `/p/[id]` — konkret məhsula marağı mobil nömrə ilə qeyd edir.
- Funnel: `landing_view → lead_form_view → lead_submitted`.
- Məhsul marağı: `product_card_clicked → product_view → lead_submitted`.
- Uğursuz qeyd cəhdi: `lead_submit_failed`.

Reklam linki `/?lang=az|ru&utm_source=…&utm_medium=…&utm_campaign=…` formasındadır.

## Məlumatın saxlanması

Mobil nömrələr və eventlər yalnız Supabase Postgres-ə yazılır (`private.leads`,
`private.events`). Google Sheets və Telegram istifadə edilmir.

- `private` sxemi Data API-yə açıq deyil; REST/GraphQL və `anon` açarı bu cədvəlləri görmür.
- Tətbiq yalnız `mvt_writer` rolu ilə qoşulur: INSERT edə bilir, oxuya, dəyişə, silə bilmir.
  Bu bağlantı sızsa belə, nömrələr oxunmur.
- Nömrələrə Supabase Table Editor-də (schema: `private`) baxılır. Layihə üzvləri MFA ilə
  daxil olur, üzv sayı minimum saxlanılır.
- Eyni nömrə eyni məhsul (və ya ümumi forma) üçün bir dəfə yazılır.

`DATABASE_URL` boşdursa (lokal inkişaf), qeydlər nömrə maskalanaraq server loguna yazılır.
İstehsalda `DATABASE_URL` mütləq doldurulmalıdır.

### Supabase quraşdırması

1. Layihəni AB regionunda yaradın. Data API: söndürülü; "Automatically expose new tables":
   söndürülü; "Enable automatic RLS": açıq.
2. SQL Editor-də `supabase/schema.sql`-i işlədin.
3. SQL Editor-də rola güclü şifrə verin (şifrə repoya yazılmır):
   `alter role mvt_writer with password '<şifrə>';`
4. Connect → Transaction pooler bağlantısını götürün, istifadəçini `mvt_writer.<project-ref>`,
   şifrəni 3-cü addımdakı ilə əvəz edin və `DATABASE_URL`-ə yazın (lokal stack-də
   `mooda-local-runnable-env/.env` → `MOODA_MVT_DATABASE_URL`).
5. Settings → Database-də "Enforce SSL" açıq olsun.
6. MVT bitdikdən sonra (2026-11-30) nömrələr silinir və ya razılaşdırılmış sistemə köçürülür.

## Qaydalar

- Bu, atılacaq MVT kodudur; məhsul tətbiqinin arxitekturası deyil.
- Nümunə şəkillər Stitch maketindəndir və hazırda satışda olan məhsul kimi təqdim
  olunmur.
- Real trafikdən əvvəl kampaniyanın 30% endirim şərtləri və əlaqə razılığı hüquqi
  baxımdan təsdiqlənməlidir.
- Fərziyyə, əvvəlcədən təyin edilmiş uğur meyarı, nəticə və qərar `docs-mooda`-da
  saxlanılır.

## İşə salma

```bash
npm install
npm run dev
```

Başlanğıc: 2026-09-29. Planlanan arxivləmə: 2026-11-30.
