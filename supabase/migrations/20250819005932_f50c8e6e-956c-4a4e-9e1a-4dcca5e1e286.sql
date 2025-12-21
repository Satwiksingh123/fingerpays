-- Production Hardening: Fix RLS policies and add performance indexes

-- Drop overly permissive policies
DROP POLICY IF EXISTS "System can manage recharge orders" ON public.recharge_orders;
DROP POLICY IF EXISTS "Service role can manage transactions" ON public.transactions;
DROP POLICY IF EXISTS "Service role can manage wallets" ON public.wallets;

-- Create secure RLS policies for recharge_orders
CREATE POLICY "Users can create their own recharge orders"
ON public.recharge_orders
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recharge orders"
ON public.recharge_orders
FOR UPDATE
USING (auth.uid() = user_id);

-- Create secure RLS policies for transactions
CREATE POLICY "Users can create their own transactions"
ON public.transactions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create secure RLS policies for wallets
CREATE POLICY "Users can create their own wallet"
ON public.wallets
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add performance indexes
CREATE INDEX IF NOT EXISTS idx_transactions_user_id_created_at ON public.transactions (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions (type);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON public.transactions (status);
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON public.wallets (user_id);
CREATE INDEX IF NOT EXISTS idx_recharge_orders_user_id ON public.recharge_orders (user_id);
CREATE INDEX IF NOT EXISTS idx_recharge_orders_status ON public.recharge_orders (status);

-- Create secure function for backend operations (for edge functions)
CREATE OR REPLACE FUNCTION public.is_backend_request()
RETURNS boolean AS $$
BEGIN
  -- This function should only return true for service role requests
  -- In practice, edge functions with service role key bypass RLS
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Add backend-only policies (these will only work with service role key)
CREATE POLICY "Backend can manage transactions"
ON public.transactions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Backend can manage wallets" 
ON public.wallets
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Backend can manage recharge orders"
ON public.recharge_orders
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);