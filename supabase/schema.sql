begin;

create extension if not exists pgcrypto;
create schema if not exists private;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  company_name text not null check (char_length(company_name) between 2 and 160),
  inn text not null unique check (inn ~ '^\d{8,14}$'),
  status text not null default 'pending' check (status in ('active', 'pending', 'blocked')),
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  full_name text not null check (char_length(full_name) between 2 and 160),
  login_email text not null unique check (login_email = lower(login_email)),
  role text not null default 'buyer' check (role in ('admin', 'buyer')),
  created_at timestamptz not null default now()
);
create index if not exists profiles_organization_id_idx on public.profiles(organization_id);

create table if not exists public.lots (
  id uuid primary key default gen_random_uuid(),
  lot_number text not null unique check (char_length(lot_number) between 1 and 30),
  animal_type text not null check (animal_type in ('cattle', 'sheep', 'horse', 'yak')),
  breed text not null check (char_length(breed) between 1 and 100),
  region text not null check (char_length(region) between 1 and 100),
  quantity integer not null check (quantity between 1 and 100000),
  weight_kg numeric(12,2) not null check (weight_kg > 0 and weight_kg <= 10000000),
  feed_type text not null check (char_length(feed_type) between 1 and 100),
  contract_type text not null check (contract_type in ('spot', 'forward')),
  status text not null default 'available' check (status in ('available', 'reserved', 'sold', 'closed')),
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists lots_status_created_at_idx on public.lots(status, created_at desc);

create or replace function private.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists lots_set_updated_at on public.lots;
create trigger lots_set_updated_at before update on public.lots
for each row execute function private.set_updated_at();

create or replace function public.create_managed_user_profile(
  p_user_id uuid,
  p_company_name text,
  p_inn text,
  p_full_name text,
  p_login_email text,
  p_role text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  organization_id uuid;
begin
  insert into public.organizations (company_name, inn, status)
  values (p_company_name, p_inn, 'active')
  returning id into organization_id;

  insert into public.profiles (id, organization_id, full_name, login_email, role)
  values (p_user_id, organization_id, p_full_name, p_login_email, p_role);

  return organization_id;
end;
$$;
revoke all on function public.create_managed_user_profile(uuid, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.create_managed_user_profile(uuid, text, text, text, text, text) to service_role;
grant select on table public.profiles to service_role;
grant select on table public.organizations to service_role;
create or replace function public.set_managed_organization_status(
  p_caller_id uuid,
  p_organization_id uuid,
  p_status text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_id uuid;
begin
  perform pg_advisory_xact_lock(hashtext('agromal_admin_status'));

  if not exists (
    select 1 from public.profiles p
    join public.organizations o on o.id = p.organization_id
    where p.id = p_caller_id and p.role = 'admin' and o.status = 'active'
  ) then raise exception 'FORBIDDEN';
  end if;

  if p_status not in ('active', 'blocked') then raise exception 'INVALID_STATUS';
  end if;

  if p_status = 'blocked' then
    if exists (select 1 from public.profiles where id = p_caller_id and organization_id = p_organization_id) then
      raise exception 'SELF_BLOCK_FORBIDDEN';
    end if;
    if not exists (
      select 1 from public.profiles p
      join public.organizations o on o.id = p.organization_id
      where p.role = 'admin' and o.status = 'active' and o.id <> p_organization_id
    ) then raise exception 'LAST_ADMIN_REQUIRED';
    end if;
  end if;

  update public.organizations set status = p_status where id = p_organization_id returning id into updated_id;
  if updated_id is null then raise exception 'ORGANIZATION_NOT_FOUND';
  end if;
  return updated_id;
end;
$$;
revoke all on function public.set_managed_organization_status(uuid, uuid, text) from public, anon, authenticated;
grant execute on function public.set_managed_organization_status(uuid, uuid, text) to service_role;

create or replace function public.current_access_context()
returns table (
  user_id uuid,
  full_name text,
  role text,
  organization_id uuid,
  company_name text,
  organization_status text
)
language sql
security definer
stable
set search_path = ''
as $$
  select p.id, p.full_name, p.role, o.id, o.company_name, o.status
  from public.profiles p
  join public.organizations o on o.id = p.organization_id
  where p.id = auth.uid()
  limit 1;
$$;

revoke all on function public.current_access_context() from public, anon;
grant execute on function public.current_access_context() to authenticated;

revoke all on public.organizations, public.profiles, public.lots from anon;
grant select on public.organizations, public.profiles, public.lots to authenticated;
grant insert, update, delete on public.lots to authenticated;

commit;
