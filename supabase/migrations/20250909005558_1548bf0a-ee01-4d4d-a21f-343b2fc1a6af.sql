-- CRITICAL SECURITY FIXES FOR FINGERPAY WALLET APPLICATION

-- 1. REMOVE DANGEROUS FINANCIAL DATA MANIPULATION POLICIES
-- Users should NEVER be able to modify wallet balances or create/update transactions directly
-- Only backend edge functions should handle financial operations

-- Drop dangerous wallet modification policies
DROP POLICY IF EXISTS "Users can update their own wallet" ON public.wallets;
DROP POLICY IF EXISTS "Users can create their own wallet" ON public.wallets;

-- Drop dangerous transaction modification policies  
DROP POLICY IF EXISTS "Users can create their own transactions" ON public.transactions;

-- 2. ADD MISSING UNIQUE CONSTRAINTS TO PREVENT DUPLICATE RECORDS
-- Each user should only have one wallet and one profile
ALTER TABLE public.wallets ADD CONSTRAINT unique_user_wallet UNIQUE (user_id);
ALTER TABLE public.profiles ADD CONSTRAINT unique_user_profile UNIQUE (user_id);

-- 3. ADD MISSING DATABASE TRIGGERS FOR AUTOMATIC WALLET OPERATIONS
-- Wire up the existing trigger functions that were created but never connected

-- Trigger to automatically create wallet when profile is created
DROP TRIGGER IF EXISTS create_wallet_on_profile_trigger ON public.profiles;
CREATE TRIGGER create_wallet_on_profile_trigger
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.create_wallet_on_profile();

-- Trigger to update wallet balance when transactions are inserted/updated
DROP TRIGGER IF EXISTS update_wallet_balance_trigger ON public.transactions;
CREATE TRIGGER update_wallet_balance_trigger
  AFTER INSERT OR UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_wallet_balance();

-- Trigger to automatically update updated_at timestamps
DROP TRIGGER IF EXISTS update_wallets_updated_at ON public.wallets;
CREATE TRIGGER update_wallets_updated_at
  BEFORE UPDATE ON public.wallets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_recharge_orders_updated_at ON public.recharge_orders;
CREATE TRIGGER update_recharge_orders_updated_at
  BEFORE UPDATE ON public.recharge_orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_transactions_updated_at ON public.transactions;
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. STRENGTHEN UPDATE POLICIES WITH PROPER WITH CHECK CONSTRAINTS
-- Recreate profile UPDATE policy with WITH CHECK constraint
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Recreate recharge orders UPDATE policy with WITH CHECK constraint
DROP POLICY IF EXISTS "Users can update their own recharge orders" ON public.recharge_orders;
CREATE POLICY "Users can update their own recharge orders" 
ON public.recharge_orders 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 5. CREATE SECURE READ-ONLY POLICIES FOR FINANCIAL DATA
-- Users can only VIEW their financial data, never modify it directly

-- Secure wallet policy - READ ONLY
CREATE POLICY "Users can view their own wallet" 
ON public.wallets 
FOR SELECT 
USING (auth.uid() = user_id);

-- Note: Transactions already has a proper SELECT policy, keeping it as-is
-- "Users can view their own transactions" policy is already secure

-- 6. ADD FOREIGN KEY CONSTRAINTS FOR DATA INTEGRITY
-- Ensure referential integrity between related tables
ALTER TABLE public.wallets 
ADD CONSTRAINT fk_wallets_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.profiles 
ADD CONSTRAINT fk_profiles_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.transactions 
ADD CONSTRAINT fk_transactions_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.transactions 
ADD CONSTRAINT fk_transactions_wallet_id 
FOREIGN KEY (wallet_id) REFERENCES public.wallets(id) ON DELETE CASCADE;

ALTER TABLE public.recharge_orders 
ADD CONSTRAINT fk_recharge_orders_user_id 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 7. ADD VALIDATION CONSTRAINTS
-- Ensure financial amounts are always positive and within reasonable limits
ALTER TABLE public.wallets 
ADD CONSTRAINT check_balance_non_negative CHECK (balance >= 0),
ADD CONSTRAINT check_daily_limit_positive CHECK (daily_limit > 0),
ADD CONSTRAINT check_max_balance_positive CHECK (max_balance > 0),
ADD CONSTRAINT check_reasonable_limits CHECK (daily_limit <= max_balance);

ALTER TABLE public.transactions 
ADD CONSTRAINT check_amount_positive CHECK (amount > 0);

ALTER TABLE public.recharge_orders 
ADD CONSTRAINT check_amount_positive CHECK (amount > 0);