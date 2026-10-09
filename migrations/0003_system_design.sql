-- System design layer for personal-HQ.
-- Content versioning, outbox events, contact idempotency, rate-limit audit.

-- Single-row content version counter (optimistic concurrency + cache keys).
create table if not exists content_meta (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

-- Append-only event log (outbox-style). Admin mutations emit here so public
-- cache invalidation and the dashboard can observe what changed.
create table if not exists content_events (
  id          serial primary key,
  kind        text not null,          -- project.upsert | site.save | contact.create | ...
  entity      text not null,
  entity_id   text,
  detail      jsonb,
  actor_email text,
  created_at  timestamptz not null default now()
);

-- Idempotent contact submissions: unique key per client token.
create table if not exists contact_idempotency (
  key        text primary key,
  email      text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

-- Compact rate-limit hits for observability (primary limiter is in-memory).
create table if not exists rate_limit_hits (
  id         serial primary key,
  bucket     text not null,
  key        text not null,
  created_at timestamptz not null default now()
);

create index if not exists content_events_created_idx
  on content_events (created_at desc);
create index if not exists content_events_kind_idx
  on content_events (kind, created_at desc);
create index if not exists rate_limit_hits_bucket_idx
  on rate_limit_hits (bucket, created_at desc);
