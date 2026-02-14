-- Drop the restrictive policy
drop policy if exists "Admins can insert tokens" on access_tokens;

-- Create a new policy allowing public inserts (for now, as AdminDashboard uses simple auth)
create policy "Allow public inserts for access_tokens"
  on access_tokens for insert
  with check (true);

-- Also allow updates (for revocation)
drop policy if exists "Admins can update tokens" on access_tokens;
create policy "Allow public updates for access_tokens"
  on access_tokens for update
  using (true);
