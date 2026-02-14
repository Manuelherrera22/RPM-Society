-- Allow public read access to inspections (required for Simple Auth dashboard)
create policy "Allow public read access for inspections"
  on inspections for select
  using (true);
