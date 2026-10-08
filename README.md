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

## Yayım: mvt.mooda.az

Sayt ayrıca Hetzner Cloud serverində işləyir (OpenCrop serverindən ayrı). Kod `deploy/`-dadır.

### İnfrastruktur

| Nə | Dəyər |
|---|---|
| Server | Hetzner `mooda-preprod` layihəsi, `ubuntu-4gb-hel1-2` (CAX11, ARM64, 2 vCPU, 4 GB, Helsinki) |
| IP | `37.27.158.134` / `2a01:4f9:c015:5475::/64` |
| SSH | `ssh mooda-mvt-1` (root, `~/.ssh/id_ed25519_hetzner`) |
| Firewall | Hetzner `mooda-mvt-fw`: daxilə yalnız TCP 22, 80, 443 və ICMP |
| DNS | Hetzner DNS zonası `mooda.az`; `A mvt → 37.27.158.134` |
| Domen qeydiyyatı | online.az → "DNS server": `hydrogen.ns.hetzner.com`, `oxygen.ns.hetzner.com`, `helium.ns.hetzner.de` (əl ilə qeyd olunur; yayılması 4–24 saat) |
| HTTPS | Caddy, Let's Encrypt (HTTP-01), avtomatik yenilənir |

### Serverdə edilənlər (2026-10-08)

- Paketlər yeniləndi, yeni kernel ilə yenidən başladıldı.
- Docker (`docker.io`) və Compose v2 quruldu; konteyner logları 10 MB × 3 ilə məhdudlaşdırıldı.
- 2 GB swap (`/swapfile`, `vm.swappiness=10`).
- `unattended-upgrades` ilə avtomatik təhlükəsizlik yeniləmələri.
- SSH: şifrə ilə giriş bağlıdır, root yalnız açarla (`/etc/ssh/sshd_config.d/00-mooda.conf`).
- `/opt/mooda-mvt/`: `compose.yaml`, `Caddyfile` və `.env` (yalnız `DATABASE_URL`, `chmod 600`).

### Konteynerlər

- `mvt`: Next.js (`mvt.Dockerfile`, `linux/arm64`), port 3200 yalnız daxili şəbəkədə, 768 MB limit.
- `caddy`: 80/443 (443/udp HTTP/3), `mvt:3200`-ə reverse proxy, 128 MB limit.

Image registry yoxdur: `deploy/deploy.sh` image-i Mac-də qurur və `docker save | ssh docker load` ilə göndərir.

### Yeniləmə

```bash
deploy/deploy.sh                       # qur, göndər, compose up
ssh mooda-mvt-1 'cd /opt/mooda-mvt && docker compose logs -f --tail 50'
```

`DATABASE_URL` dəyişəndə serverdəki `/opt/mooda-mvt/.env`-i yeniləyin və
`docker compose up -d mvt` işlədin. Dəyəri repoya və ya çata yazmayın.

### Bağlama (MVT bitəndə)

`ssh mooda-mvt-1 'cd /opt/mooda-mvt && docker compose down -v'`, sonra Hetzner-də serveri,
`mooda-mvt-fw`-ni və lazım deyilsə `mooda.az` DNS zonasını silin.

### Açıq məsələlər

- Supabase layihəsi `ap-southeast-1` (Sinqapur) regionundadır; server Helsinkidədir. AB
  regionuna köçürmə hüquqi təsdiq və gecikmə baxımından tövsiyə olunur.
- Cloudflare (proxy, rate limit) qoşulmayıb: `.az` domeni nameserver olmadan Cloudflare-in
  domen yoxlamasından keçmədi. Delegasiya işə düşəndən sonra yenidən cəhd edilə bilər.

Başlanğıc: 2026-09-29. Planlanan arxivləmə: 2026-11-30.
