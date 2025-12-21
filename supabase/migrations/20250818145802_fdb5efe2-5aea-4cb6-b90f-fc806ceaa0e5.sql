-- Fix remaining function search path warnings for wallet functions

-- Fix create_user_wallet function
CREATE OR REPLACE FUNCTION public.create_user_wallet()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.wallets (user_id)
  VALUES (NEW.user_id);
  RETURN NEW;
END;
$$;

-- Fix update_wallet_balance function  
CREATE OR REPLACE FUNCTION public.update_wallet_balance()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.status = 'completed' THEN
    IF NEW.type = 'recharge' THEN
      UPDATE public.wallets 
      SET 
        balance = balance + NEW.amount,
        total_recharged = total_recharged + NEW.amount,
        updated_at = now()
      WHERE user_id = NEW.user_id;
    ELSIF NEW.type IN ('payment', 'transfer_out') THEN
      UPDATE public.wallets 
      SET 
        balance = balance - NEW.amount,
        total_spent = total_spent + NEW.amount,
        monthly_spent = monthly_spent + NEW.amount,
        updated_at = now()
      WHERE user_id = NEW.user_id;
    ELSIF NEW.type IN ('refund', 'transfer_in') THEN
      UPDATE public.wallets 
      SET 
        balance = balance + NEW.amount,
        updated_at = now()
      WHERE user_id = NEW.user_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;