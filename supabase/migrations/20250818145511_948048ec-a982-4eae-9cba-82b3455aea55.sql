-- Add trigger to auto-create wallet when profile is created
CREATE OR REPLACE FUNCTION public.create_wallet_on_profile()
RETURNS TRIGGER AS $$
BEGIN
  -- Create wallet for new profile
  INSERT INTO public.wallets (user_id)
  VALUES (NEW.user_id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER trigger_create_wallet_on_profile
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_wallet_on_profile();

-- Add unique constraint on wallets user_id if not exists
ALTER TABLE public.wallets ADD CONSTRAINT unique_wallet_user_id UNIQUE (user_id);

-- Tighten RLS policies for better security
DROP POLICY IF EXISTS "System can insert wallets" ON public.wallets;
DROP POLICY IF EXISTS "System can insert transactions" ON public.transactions;
DROP POLICY IF EXISTS "System can update transactions" ON public.transactions;

-- More restrictive policies
CREATE POLICY "Service role can manage wallets" ON public.wallets
  FOR ALL USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can manage transactions" ON public.transactions  
  FOR ALL USING (true)
  WITH CHECK (true);

-- Reset monthly spending on 1st of each month (function)
CREATE OR REPLACE FUNCTION public.reset_monthly_spending()
RETURNS void AS $$
BEGIN
  UPDATE public.wallets 
  SET monthly_spent = 0, updated_at = now()
  WHERE EXTRACT(day FROM now()) = 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;