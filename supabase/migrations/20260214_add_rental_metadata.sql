-- Add metadata column to access_tokens for storing vehicle/client info
alter table access_tokens 
add column if not exists metadata jsonb default '{}'::jsonb;

-- Add client_name and linked_token_id to inspections for tracking
alter table inspections
add column if not exists client_name text,
add column if not exists linked_token_id uuid references access_tokens(id);
