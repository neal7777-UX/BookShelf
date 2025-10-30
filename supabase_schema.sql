-- 需要 pgcrypto 以使用 gen_random_uuid()
create extension if not exists pgcrypto;

-- 建立 books 資料表
create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  cover text not null,
  status text not null check (status in ('unread','reading','completed')),
  rating int default 0 check (rating between 0 and 5),
  notes text,
  created_at timestamp with time zone default now()
);

-- RLS 與匿名讀寫（如需限制權限可調整）
alter table public.books enable row level security;
create policy "Enable read for anon" on public.books for select using (true);
create policy "Enable insert for anon" on public.books for insert with check (true);
create policy "Enable update for anon" on public.books for update using (true);
create policy "Enable delete for anon" on public.books for delete using (true);
