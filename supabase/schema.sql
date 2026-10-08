-- mooda-mvt: erkən giriş nömrələri və funnel eventləri.
-- Supabase → SQL Editor-də bir dəfə işlədin. Sonra mvt_writer-ə şifrəni ayrıca verin
-- (README → Supabase). Şifrə bu fayla yazılmır.
--
-- private sxemi Data API-yə açıq deyil: REST/GraphQL bu cədvəlləri görmür.
-- Tətbiq yalnız mvt_writer ilə qoşulur və yalnız INSERT edə bilir — oxuya, dəyişə, silə bilmir.
-- Nömrələrə Table Editor-də (schema: private) baxılır.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table private.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  lead_id     text not null unique,
  phone       text not null check (phone ~ '^\+994\d{9}$'),
  placement   text not null check (placement in ('hero', 'product')),
  product_id  text not null default '',
  product     text not null default '',
  lang        text not null,
  source      text not null default '',
  session     text not null default '',
  offer       text not null,
  -- Eyni nömrə eyni məhsul (və ya ümumi forma) üçün bir dəfə yazılır.
  unique (phone, product_id)
);

create table private.events (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  session     text not null default '',
  lang        text not null,
  source      text not null default '',
  product_id  text not null default '',
  detail      text not null default ''
);

alter table private.leads enable row level security;
alter table private.events enable row level security;
revoke all on private.leads, private.events from public, anon, authenticated;

do $$
begin
  if not exists (select from pg_roles where rolname = 'mvt_writer') then
    create role mvt_writer login noinherit;
  end if;
end $$;

grant usage on schema private to mvt_writer;
grant insert on private.leads, private.events to mvt_writer;

create policy mvt_writer_insert on private.leads for insert to mvt_writer with check (true);
create policy mvt_writer_insert on private.events for insert to mvt_writer with check (true);
