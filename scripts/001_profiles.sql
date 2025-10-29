create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  role text not null check (role in ('student','mentor','employer','administrator')),
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "Update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);
