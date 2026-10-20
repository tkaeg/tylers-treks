-- Comments on trip stops. Run once in the Supabase SQL editor.
--
-- RLS is on with no policies, so the public anon key can't read or write
-- this table at all — only api/comments.js (using the secret key) can.
--
-- To hide a comment: Table Editor -> comments -> set hidden = true.

create table comments (
  id          bigint generated always as identity primary key,
  stop_id     text        not null,
  name        text        not null check (char_length(name) between 1 and 60),
  body        text        not null check (char_length(body) between 1 and 2000),
  ip_hash     text        not null,
  hidden      boolean     not null default false,
  created_at  timestamptz not null default now()
);

create index comments_stop_id_idx on comments (stop_id, created_at);
create index comments_ip_hash_idx on comments (ip_hash, created_at);

alter table comments enable row level security;
