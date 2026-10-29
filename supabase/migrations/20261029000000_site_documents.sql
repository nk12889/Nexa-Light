-- Firestore-style document store: one row per (collection, id), fields in jsonb.
create table public.documents (
    collection text not null,
    id text not null,
    data jsonb not null default '{}'::jsonb,
    updated_at timestamptz not null default now(),
    primary key (collection, id)
);

-- Supabase Auth users allowed to edit the site.
create table public.admin_users (
    user_id uuid primary key references auth.users (id) on delete cascade,
    created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
    select exists (select 1 from public.admin_users where user_id = (select auth.uid()));
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at := now();
    return new;
end;
$$;

create trigger documents_touch before update on public.documents
for each row execute function public.touch_updated_at();

alter table public.documents enable row level security;
alter table public.admin_users enable row level security;

-- Public site reads all content; only admins write.
create policy "documents readable by everyone" on public.documents
    for select to anon, authenticated using (true);
create policy "admins insert documents" on public.documents
    for insert to authenticated with check ((select public.is_admin()));
create policy "admins update documents" on public.documents
    for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "admins delete documents" on public.documents
    for delete to authenticated using ((select public.is_admin()));

create policy "admins see own admin row" on public.admin_users
    for select to authenticated using (user_id = (select auth.uid()));

-- Live updates for the public site (replaces Firestore onSnapshot).
alter publication supabase_realtime add table public.documents;
