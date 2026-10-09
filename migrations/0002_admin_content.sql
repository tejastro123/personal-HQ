-- Admin console content tables (personal-HQ).
-- Auth schema lives in 0001_auth.sql (Better Auth). This file is app content only.

-- Site settings overlay (single JSON document under key 'site').
create table if not exists site_settings (
  id          serial primary key,
  key         text not null unique,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

-- Projects the admin has created or overridden. Unpublished rows hide a static
-- project of the same id; published rows replace/extend the static catalog.
create table if not exists admin_projects (
  id           text primary key,
  data         jsonb not null,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Blog posts the admin has created or overridden.
create table if not exists admin_blog_posts (
  slug         text primary key,
  data         jsonb not null,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Contact form submissions (public insert, admin read/delete).
create table if not exists contact_messages (
  id         serial primary key,
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);

-- Resume lens overrides (JSON per lens id).
create table if not exists admin_resume_lenses (
  lens_id     text primary key,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

-- Audit trail for admin mutations.
create table if not exists admin_audit_log (
  id            serial primary key,
  admin_user_id text not null,
  admin_email   text not null,
  action        text not null,
  entity        text not null,
  entity_id     text,
  detail        jsonb,
  created_at    timestamptz not null default now()
);

create index if not exists contact_messages_created_idx
  on contact_messages (created_at desc);
create index if not exists admin_audit_log_created_idx
  on admin_audit_log (created_at desc);
