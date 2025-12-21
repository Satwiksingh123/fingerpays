-- CRITICAL SECURITY FIXES FOR FINGERPAY WALLET APPLICATION

-- 1. REMOVE DANGEROUS FINANCIAL DATA MANIPULATION POLICIES
-- Users should NEVER be able to modify wallet balances or create/update transactions directly

DROP POLICY IF EXISTS "Users can update their own wallet" ON public.wallets;
DROP POLICY IF EXISTS "Users can create their own wallet" ON public.wallets;
DROP POLICY IF EXISTS "Users can create their own transactions" ON public.transactions;

-- 2. ADD UNIQUE CONSTRAINTS TO PREVENT DUPLICATE RECORDS
DO $$
BEGIN
    -- Add unique constraints if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_user_wallet'
    ) THEN
        ALTER TABLE public.wallets ADD CONSTRAINT unique_user_wallet UNIQUE (user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_user_profile'
    ) THEN
        ALTER TABLE public.profiles ADD CONSTRAINT unique_user_profile UNIQUE (user_id);
    END IF;
END $$;

-- 3. ADD MISSING DATABASE TRIGGERS
DROP TRIGGER IF EXISTS create_wallet_on_profile_trigger ON public.profiles;
CREATE TRIGGER create_wallet_on_profile_trigger
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.create_wallet_on_profile();

DROP TRIGGER IF EXISTS update_wallet_balance_trigger ON public.transactions;
CREATE TRIGGER update_wallet_balance_trigger
  AFTER INSERT OR UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_wallet_balance();

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_wallets_updated_at ON public.wallets;
CREATE TRIGGER update_wallets_updated_at
  BEFORE UPDATE ON public.wallets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. STRENGTHEN UPDATE POLICIES WITH WITH CHECK CONSTRAINTS
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own recharge orders" ON public.recharge_orders;
CREATE POLICY "Users can update their own recharge orders" 
ON public.recharge_orders 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 5. ENSURE SECURE READ-ONLY POLICY FOR WALLETS
DROP POLICY IF EXISTS "Users can view their own wallet" ON public.wallets;
CREATE POLICY "Users can view their own wallet" 
ON public.wallets 
FOR SELECT 
USING (auth.uid() = user_id);

-- 6. ADD VALIDATION CONSTRAINTS FOR FINANCIAL INTEGRITY
DO $$
BEGIN
    -- Add validation constraints if they don't exist
    BEGIN
        ALTER TABLE public.wallets ADD CONSTRAINT check_balance_non_negative CHECK (balance >= 0);
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;

    BEGIN
        ALTER TABLE public.wallets ADD CONSTRAINT check_daily_limit_positive CHECK (daily_limit > 0);
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;

    BEGIN
        ALTER TABLE public.transactions ADD CONSTRAINT check_amount_positive CHECK (amount > 0);
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;

    BEGIN
        ALTER TABLE public.recharge_orders ADD CONSTRAINT check_recharge_amount_positive CHECK (amount > 0);
    EXCEPTION
        WHEN duplicate_object THEN NULL;
    END;
END $$;