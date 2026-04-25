-- InsightSync AI — Supabase Schema
-- Run this in the Supabase SQL Editor to create all tables

-- Products
create table if not exists products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text,
  description text,
  created_at  timestamptz not null default now()
);

-- Feedback
create table if not exists feedback (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  source           text,
  source_type      text not null default 'Internal' check (source_type in ('Internal', 'External')),
  raw_text         text not null,
  sentiment        text check (sentiment in ('Positive', 'Negative', 'Neutral', 'Mixed')),
  date             date,
  analyzed         boolean not null default false,
  product_id       uuid references products(id) on delete cascade,
  confidence_score text,
  source_url       text,          -- URL of the original post/review (used for deduplication)
  created_at       timestamptz not null default now()
);

-- Migration for existing installs (skip if running schema fresh):
-- alter table feedback add column if not exists source_url text;

-- Insights
create table if not exists insights (
  id                    uuid primary key default gen_random_uuid(),
  name                  text not null,
  category              text not null check (category in ('Feature Request', 'Bug', 'UI/UX', 'Positive')),
  severity              integer check (severity between 1 and 5),
  description           text,
  related_feedback_id   uuid references feedback(id) on delete set null,
  related_feedback_title text,
  product_id            uuid references products(id) on delete cascade,
  occurrence_count      integer not null default 1,
  source_type           text check (source_type in ('Internal', 'External')),
  created_at            timestamptz not null default now()
);

-- PRDs
create table if not exists prds (
  id                   uuid primary key default gen_random_uuid(),
  product_name         text not null,
  goal                 text,
  target_audience      text,
  executive_summary    text,
  problem_statement    text,
  proposed_solution    text,
  user_stories         text,
  success_metrics      text,
  selected_insight_ids text,
  status               text not null default 'Draft' check (status in ('Draft', 'In Review', 'Approved', 'Archived')),
  created_at           timestamptz not null default now()
);

-- Row Level Security (optional — enable when auth is added)
-- alter table products enable row level security;
-- alter table feedback enable row level security;
-- alter table insights enable row level security;
-- alter table prds enable row level security;
