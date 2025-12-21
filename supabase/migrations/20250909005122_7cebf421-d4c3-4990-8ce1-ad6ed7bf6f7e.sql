-- Remove overly permissive backend policies that create security vulnerabilities
-- These policies with "true" conditions allow unrestricted access to financial data

-- Drop the dangerous backend policies for transactions
DROP POLICY IF EXISTS "Backend can manage transactions" ON public.transactions;

-- Drop the dangerous backend policies for wallets  
DROP POLICY IF EXISTS "Backend can manage wallets" ON public.wallets;

-- Drop the dangerous backend policies for recharge_orders
DROP POLICY IF EXISTS "Backend can manage recharge orders" ON public.recharge_orders;

-- The is_backend_request function is no longer needed since we're using service role bypass
DROP FUNCTION IF EXISTS public.is_backend_request();

-- Note: Edge functions using service role key will bypass RLS entirely,
-- which is the secure way to handle backend operations in Supabase.
-- Regular user requests will only have access through user-specific policies.