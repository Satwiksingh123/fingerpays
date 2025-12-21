-- CRITICAL SECURITY FIXES - FINAL VERSION

-- 1. REMOVE DANGEROUS FINANCIAL DATA MANIPULATION POLICIES
DROP POLICY IF EXISTS "Users can update their own wallet" ON public.wallets;
DROP POLICY IF EXISTS "Users can create their own wallet" ON public.wallets;
DROP POLICY IF EXISTS "Users can create their own transactions" ON public.transactions;

-- 2. ADD MISSING UNIQUE CONSTRAINTS TO PREVENT DUPLICATE RECORDS
DO $$ BEGIN
    ALTER TABLE public.wallets ADD CONSTRAINT unique_user_wallet UNIQUE (user_id);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER TABLE public.profiles ADD CONSTRAINT unique_user_profile UNIQUE (user_id);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 3. ADD MISSING DATABASE TRIGGERS FOR AUTOMATIC WALLET OPERATIONS
DROP TRIGGER IF EXISTS create_wallet_on_profile_trigger ON public.profiles;
CREATE TRIGGER create_wallet_on_profile_trigger
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.create_wallet_on_profile();

DROP TRIGGER IF EXISTS update_wallet_balance_trigger ON public.transactions;
CREATE TRIGGER update_wallet_balance_trigger
  AFTER INSERT OR UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_wallet_balance();

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

-- 5. ADD FOREIGN KEY CONSTRAINTS FOR DATA INTEGRITY
DO $$ BEGIN
    ALTER TABLE public.wallets ADD CONSTRAINT fk_wallets_user_id 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER TABLE public.profiles ADD CONSTRAINT fk_profiles_user_id 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER TABLE public.transactions ADD CONSTRAINT fk_transactions_user_id 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER TABLE public.transactions ADD CONSTRAINT fk_transactions_wallet_id 
    FOREIGN KEY (wallet_id) REFERENCES public.wallets(id) ON DELETE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER TABLE public.recharge_orders ADD CONSTRAINT fk_recharge_orders_user_id 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 6. ADD VALIDATION CONSTRAINTS FOR FINANCIAL DATA
DO $$ BEGIN
    ALTER TABLE public.wallets ADD CONSTRAINT check_balance_non_negative CHECK (balance >= 0);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER TABLE public.wallets ADD CONSTRAINT check_daily_limit_positive CHECK (daily_limit > 0);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER TABLE public.wallets ADD CONSTRAINT check_max_balance_positive CHECK (max_balance > 0);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER TABLE public.wallets ADD CONSTRAINT check_reasonable_limits CHECK (daily_limit <= max_balance);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER TABLE public.transactions ADD CONSTRAINT check_transaction_amount_positive CHECK (amount > 0);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER TABLE public.recharge_orders ADD CONSTRAINT check_recharge_amount_positive CHECK (amount > 0);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;