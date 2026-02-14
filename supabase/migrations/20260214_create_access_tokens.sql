-- Create access_tokens table
create table if not exists access_tokens (
  id uuid default uuid_generate_v4() primary key,
  token text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone not null,
  created_by uuid references auth.users(id),
  is_active boolean default true
);

-- Enable RLS
alter table access_tokens enable row level security;

-- Policy for anyone (anon) to read valid tokens (to validate access)
create policy "Public can read valid tokens"
  on access_tokens for select
  using (true);

-- Policy for authenticated users (admins) to insert tokens
create policy "Admins can insert tokens"
  on access_tokens for insert
  with check (auth.role() = 'authenticated');

-- Policy for authenticated users (admins) to update/delete tokens if needed
create policy "Admins can update tokens"
  on access_tokens for update
  using (auth.role() = 'authenticated');
