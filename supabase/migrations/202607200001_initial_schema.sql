create extension if not exists pgcrypto;

create type public.app_role as enum ('user', 'brand', 'moderator', 'admin');
create type public.content_status as enum ('draft', 'pending', 'published', 'under_review', 'hidden', 'deleted');

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  role public.app_role not null default 'user',
  display_name text not null,
  birth_date date,
  approximate_area text,
  pronouns text,
  bio text,
  verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profile_photos (
  id uuid primary key default gen_random_uuid(), profile_id uuid not null references public.profiles(id) on delete cascade,
  storage_path text not null, sort_order int not null default 0, created_at timestamptz not null default now()
);
create table public.interests (id uuid primary key default gen_random_uuid(), slug text unique not null, label text not null);
create table public.user_interests (profile_id uuid references public.profiles(id) on delete cascade, interest_id uuid references public.interests(id) on delete cascade, primary key (profile_id, interest_id));
create table public.identity_verifications (
  id uuid primary key default gen_random_uuid(), profile_id uuid not null references public.profiles(id) on delete cascade,
  provider_reference_encrypted text, level text not null, status text not null, checked_at timestamptz not null default now(), created_at timestamptz not null default now()
);
create table public.devices (id uuid primary key default gen_random_uuid(), profile_id uuid not null references public.profiles(id) on delete cascade, fingerprint_hash text not null, trusted_at timestamptz, last_seen_at timestamptz not null default now());

create table public.places (
  id uuid primary key default gen_random_uuid(), name text not null, category text not null, commercial_address text not null,
  district text not null, latitude double precision, longitude double precision, budget_min integer, budget_max integer,
  verification_status text not null default 'pending', updated_at timestamptz not null default now()
);
create table public.place_amenities (id uuid primary key default gen_random_uuid(), slug text unique not null, label text not null);
create table public.place_amenity_reports (
  id uuid primary key default gen_random_uuid(), place_id uuid not null references public.places(id) on delete cascade,
  amenity_id uuid not null references public.place_amenities(id), reporter_id uuid not null references public.profiles(id),
  is_present boolean not null, status text not null default 'pending', observed_at date, created_at timestamptz not null default now()
);
create table public.place_reviews (
  id uuid primary key default gen_random_uuid(), place_id uuid not null references public.places(id) on delete cascade,
  author_id uuid not null references public.profiles(id), body text not null, visit_date date, context text,
  received_free boolean not null default false, rating smallint check (rating between 1 and 5), status public.content_status not null default 'pending', created_at timestamptz not null default now()
);
create table public.review_media (id uuid primary key default gen_random_uuid(), review_id uuid not null references public.place_reviews(id) on delete cascade, storage_path text not null, media_type text not null check (media_type in ('photo','video')), created_at timestamptz not null default now());

create table public.brands (id uuid primary key default gen_random_uuid(), name text not null, legal_name text, verification_status text not null default 'pending', created_at timestamptz not null default now());
create table public.brand_members (brand_id uuid references public.brands(id) on delete cascade, profile_id uuid references public.profiles(id) on delete cascade, member_role text not null default 'member', primary key (brand_id, profile_id));
create table public.brand_verifications (id uuid primary key default gen_random_uuid(), brand_id uuid not null references public.brands(id) on delete cascade, status text not null, checked_at timestamptz, reviewer_id uuid references public.profiles(id));
create table public.events (
  id uuid primary key default gen_random_uuid(), brand_id uuid not null references public.brands(id), place_id uuid not null references public.places(id),
  title text not null, starts_at timestamptz not null, ends_at timestamptz, spots integer not null check (spots > 0), benefit text not null,
  includes text, excludes text, requirements text, review_policy text not null, status text not null default 'published', created_at timestamptz not null default now()
);
create table public.event_applications (event_id uuid references public.events(id) on delete cascade, profile_id uuid references public.profiles(id) on delete cascade, status text not null default 'submitted', created_at timestamptz not null default now(), primary key (event_id, profile_id));
create table public.event_attendance (event_id uuid references public.events(id) on delete cascade, profile_id uuid references public.profiles(id) on delete cascade, checked_in_at timestamptz, checked_out_at timestamptz, primary key (event_id, profile_id));
create table public.event_reviews (id uuid primary key default gen_random_uuid(), event_id uuid not null references public.events(id) on delete cascade, author_id uuid not null references public.profiles(id), body text not null, received_free boolean not null default true, status public.content_status not null default 'pending', created_at timestamptz not null default now());

create table public.plans (
  id uuid primary key default gen_random_uuid(), creator_id uuid not null references public.profiles(id), place_id uuid not null references public.places(id),
  title text not null, category text not null, starts_at timestamptz not null, duration_minutes integer, spots integer not null check (spots between 2 and 50),
  budget_min integer, budget_max integer, description text, group_type text, social_style text, accessibility_notes text,
  photos_allowed boolean not null default false, rules text, status text not null default 'draft', created_at timestamptz not null default now()
);
create table public.plan_members (plan_id uuid references public.plans(id) on delete cascade, profile_id uuid references public.profiles(id) on delete cascade, status text not null default 'interested', joined_at timestamptz not null default now(), primary key (plan_id, profile_id));
create table public.saved_items (id uuid primary key default gen_random_uuid(), profile_id uuid not null references public.profiles(id) on delete cascade, item_type text not null, item_id uuid not null, created_at timestamptz not null default now(), unique(profile_id, item_type, item_id));

create table public.conversations (id uuid primary key default gen_random_uuid(), kind text not null default 'direct', plan_id uuid references public.plans(id) on delete set null, created_at timestamptz not null default now());
create table public.conversation_members (conversation_id uuid references public.conversations(id) on delete cascade, profile_id uuid references public.profiles(id) on delete cascade, muted_until timestamptz, joined_at timestamptz not null default now(), primary key (conversation_id, profile_id));
create table public.messages (id uuid primary key default gen_random_uuid(), conversation_id uuid not null references public.conversations(id) on delete cascade, sender_id uuid not null references public.profiles(id), body text not null, reply_to_id uuid references public.messages(id), moderation_status text not null default 'allowed', created_at timestamptz not null default now());
create table public.message_reports (id uuid primary key default gen_random_uuid(), message_id uuid not null references public.messages(id) on delete cascade, reporter_id uuid not null references public.profiles(id), reason text not null, created_at timestamptz not null default now());
create table public.calls (id uuid primary key default gen_random_uuid(), conversation_id uuid not null references public.conversations(id), initiator_id uuid not null references public.profiles(id), kind text not null check (kind in ('audio','video')), status text not null, started_at timestamptz, ended_at timestamptz);

create table public.blocks (blocker_id uuid references public.profiles(id) on delete cascade, blocked_id uuid references public.profiles(id) on delete cascade, created_at timestamptz not null default now(), primary key (blocker_id, blocked_id), check (blocker_id <> blocked_id));
create table public.reports (id uuid primary key default gen_random_uuid(), reporter_id uuid not null references public.profiles(id), subject_type text not null, subject_id uuid not null, category text not null, detail text, status text not null default 'open', created_at timestamptz not null default now());
create table public.moderation_actions (id uuid primary key default gen_random_uuid(), report_id uuid references public.reports(id), subject_profile_id uuid references public.profiles(id), moderator_id uuid references public.profiles(id), action text not null, rationale text, expires_at timestamptz, created_at timestamptz not null default now());

create table public.trusted_contacts (id uuid primary key default gen_random_uuid(), profile_id uuid not null references public.profiles(id) on delete cascade, encrypted_name text not null, encrypted_contact text not null, created_at timestamptz not null default now());
create table public.safety_sessions (id uuid primary key default gen_random_uuid(), profile_id uuid not null references public.profiles(id) on delete cascade, plan_id uuid references public.plans(id), trusted_contact_id uuid references public.trusted_contacts(id), expected_end_at timestamptz not null, location_expires_at timestamptz, status text not null default 'active', created_at timestamptz not null default now());
create table public.safety_checkins (id uuid primary key default gen_random_uuid(), session_id uuid not null references public.safety_sessions(id) on delete cascade, status text not null, created_at timestamptz not null default now());
create table public.notifications (id uuid primary key default gen_random_uuid(), profile_id uuid not null references public.profiles(id) on delete cascade, kind text not null, title text not null, body text not null, read_at timestamptz, created_at timestamptz not null default now());
create table public.user_preferences (profile_id uuid primary key references public.profiles(id) on delete cascade, notifications jsonb not null default '{}'::jsonb, privacy jsonb not null default '{}'::jsonb, reduce_motion boolean not null default false, updated_at timestamptz not null default now());
create table public.audit_logs (id bigint generated always as identity primary key, actor_id uuid references public.profiles(id), action text not null, subject_type text not null, subject_id uuid, metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now());

create index messages_conversation_created_idx on public.messages(conversation_id, created_at);
create index plans_starts_at_idx on public.plans(starts_at) where status = 'published';
create index events_starts_at_idx on public.events(starts_at) where status = 'published';
create index places_district_idx on public.places(district);

