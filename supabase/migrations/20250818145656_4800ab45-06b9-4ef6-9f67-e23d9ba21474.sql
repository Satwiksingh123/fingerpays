-- Fix security warnings by adding proper search paths to functions

-- Fix create_wallet_on_profile function
CREATE OR REPLACE FUNCTION public.create_wallet_on_profile()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path TO 'public'
AS $$
BEGIN
  -- Create wallet for new profile
  INSERT INTO public.wallets (user_id)
  VALUES (NEW.user_id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Fix reset_monthly_spending function  
CREATE OR REPLACE FUNCTION public.reset_monthly_spending()
RETURNS void 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.wallets 
  SET monthly_spent = 0, updated_at = now()
  WHERE EXTRACT(day FROM now()) = 1;
END;
$$;