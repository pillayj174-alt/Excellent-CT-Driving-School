-- Excellent CT Driving School: Supabase schema
-- Run this in Supabase SQL Editor.

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  interest text,
  message text,
  status text not null default 'new' check (status in ('new','contacted','confirmed','completed','cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating integer not null check (rating between 1 and 5),
  text text not null,
  service text default 'Customer review',
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;
alter table public.reviews enable row level security;

-- Public website may create bookings and reviews.
drop policy if exists "Public can submit bookings" on public.bookings;
create policy "Public can submit bookings" on public.bookings
for insert to anon, authenticated with check (true);

drop policy if exists "Public can submit reviews" on public.reviews;
create policy "Public can submit reviews" on public.reviews
for insert to anon, authenticated with check (approved = false);

-- Public website may only read approved reviews.
drop policy if exists "Public can read approved reviews" on public.reviews;
create policy "Public can read approved reviews" on public.reviews
for select to anon, authenticated using (approved = true);

-- Authenticated owner can manage bookings and reviews.
drop policy if exists "Owner can read bookings" on public.bookings;
create policy "Owner can read bookings" on public.bookings
for select to authenticated using (auth.uid() is not null);

drop policy if exists "Owner can update bookings" on public.bookings;
create policy "Owner can update bookings" on public.bookings
for update to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "Owner can delete bookings" on public.bookings;
create policy "Owner can delete bookings" on public.bookings
for delete to authenticated using (auth.uid() is not null);

drop policy if exists "Owner can read reviews" on public.reviews;
create policy "Owner can read reviews" on public.reviews
for select to authenticated using (auth.uid() is not null);

drop policy if exists "Owner can update reviews" on public.reviews;
create policy "Owner can update reviews" on public.reviews
for update to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "Owner can delete reviews" on public.reviews;
create policy "Owner can delete reviews" on public.reviews
for delete to authenticated using (auth.uid() is not null);

-- Optional: keep only these tables exposed through the API.
