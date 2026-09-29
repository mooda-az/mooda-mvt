# mooda-mvt

Mooda üçün Minimum Viable Test (MVT) səhifələri: landing, fake checkout və
reklam variantları. **Atılacaq kod** — məhsul deyil.

## Qaydalar

- Bu depo `fe-mooda-*` / `be-mooda-*` qaydalarına tabe deyil: hexagonal
  arxitektura, persisted query, codegen, tam test matrisi tələb olunmur.
- Heç bir kod buradan məhsul depolarına köçürülmür. Test qalib gələrsə,
  funksiya məhsulda öz qaydaları ilə yenidən yazılır.
- Backend və verilənlər bazası yoxdur. Sifariş/qeydiyyat məlumatı xarici
  alətə (Sheets / Airtable / Telegram) gedir; icra concierge ilə, əl ilə.
- Real ödəniş yalnız lisenziyalı bank/PSP ödəniş linki ilə. Kartdan-karta
  köçürmə qəbul edilmir (`DEC-2026-004`).
- Çek və qaimə satıcı butikdən olur, Mooda adından yox.

## Fərziyyələr və nəticələr

Fərziyyə, uğur meyarı (test başlamazdan **əvvəl**), nəticə və qərar
`docs-mooda`-da saxlanılır, burada yox. Əlaqəli: `OPEN-014`, `OPEN-004`,
`RISK-017`, `RISK-019`.

| ID | Fərziyyə | Səhifə |
| --- | --- | --- |
| MVT-1 | Müştəri qapıda ödəniş olmadan kartla alar | `/`, `/p/[id]`, `/checkout` |
| MVT-3 | Hansı dəyər təklifi (çeşid / qaytarma / sürət) cəlb edir | — |

## MVT-1 necə işləyir

- Reklam linki: `/?lang=az|ru&v=t|p&utm_source=…`. `v=t` etibar elementlərini
  (VÖEN, qaytarma, butik adı) göstərir, `v=p` göstərmir; verilməyibsə 50/50.
- Checkout-da iki seçim: «Kartla indi ödə» və «Qapıda ödə». Qapıda ödəniş
  seçilərsə, «hələ aktiv deyil» dialoqu çıxır: karta keçid (`cod_to_card`)
  və ya imtina + səbəb (`cod_declined`) ölçülür.
- Sifariş `SHEETS_WEBHOOK_URL` (bax `apps-script/Code.gs`) və/və ya Telegram-a
  gedir; eventlər Sheets-in `events` vərəqinə. Env: `.env.example`.
- Məhsullar `src/lib/products.ts`-dədir; şəkillər Stitch maketindən
  nümunədir — testdən əvvəl real butik məhsulları ilə əvəzlənir.
- Dizayn: `docs-mooda/…/stitch/…/mooda_editorial_marketplace/DESIGN.md`.

## İşə salma

```bash
npm install
npm run dev
```

## Ömür

Başlanğıc: 2026-09-29. Planlanan arxivləmə: 2026-11-30 — testlər bitəndə
depo arxivlənir.
