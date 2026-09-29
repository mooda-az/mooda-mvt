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

## Məlumatın çatdırılması

Backend və verilənlər bazası yoxdur. Mobil nömrələr `SHEETS_WEBHOOK_URL` vasitəsilə
Google Sheets-in `leads` vərəqinə və/və ya Telegram-a gedir; eventlər `events`
vərəqinə yazılır. Konfiqurasiya üçün `.env.example` və `apps-script/Code.gs`-ə baxın.

Heç bir kanal konfiqurasiya edilməyibsə, lokal inkişafda qeydlər server loguna
yazılır. İstehsalda ən azı bir kanal konfiqurasiya edilməlidir.

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
