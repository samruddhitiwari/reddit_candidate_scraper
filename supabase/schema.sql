-- ============================================
-- Candidate Finder – Supabase Database Schema
-- ============================================

-- Leads table: stores discovered Reddit posts
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  reddit_username text not null,
  post_title text not null,
  post_url text unique not null,
  subreddit text not null,
  detected_role text not null,
  keyword_matched text,
  score int default 0,
  created_at timestamptz default now(),
  scraped_at timestamptz default now()
);

-- Index for common queries
create index if not exists idx_leads_detected_role on public.leads(detected_role);
create index if not exists idx_leads_subreddit on public.leads(subreddit);
create index if not exists idx_leads_created_at on public.leads(created_at desc);

-- User preferences table: email alert settings per user
create table if not exists public.user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email_alerts_enabled boolean default false,
  alert_roles text[] default '{}',
  plan text default 'free' check (plan in ('free', 'pro')),
  created_at timestamptz default now(),
  unique(user_id)
);

-- ============================================
-- Row Level Security
-- ============================================

-- Leads: read-only for authenticated users
alter table public.leads enable row level security;

create policy "Authenticated users can read leads"
  on public.leads
  for select
  to authenticated
  using (true);

-- Service role can insert leads (scraper)
create policy "Service role can insert leads"
  on public.leads
  for insert
  to service_role
  using (true);

-- User preferences: users manage their own
alter table public.user_preferences enable row level security;

create policy "Users can read own preferences"
  on public.user_preferences
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own preferences"
  on public.user_preferences
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own preferences"
  on public.user_preferences
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
