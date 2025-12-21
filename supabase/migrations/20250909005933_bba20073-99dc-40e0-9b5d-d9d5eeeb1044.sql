-- Additional security improvements to address linter warnings

-- 1. Configure more secure OTP settings
-- Reduce OTP expiry time to 10 minutes (600 seconds) for better security
UPDATE auth.config 
SET 
  otp_exp = 600,
  password_min_length = 8
WHERE NOT EXISTS (
  SELECT 1 FROM auth.config WHERE otp_exp = 600
);

-- 2. Enable additional security constraints
-- Add validation for email formats and stronger password requirements
DO $$
BEGIN
  -- Add email validation constraint if it doesn't exist
  BEGIN
    ALTER TABLE public.profiles 
    ADD CONSTRAINT valid_email_format 
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
  EXCEPTION WHEN duplicate_object THEN
    -- Constraint already exists, ignore
  END;
  
  -- Add phone number validation constraint if it doesn't exist
  BEGIN
    ALTER TABLE public.profiles 
    ADD CONSTRAINT valid_phone_format 
    CHECK (phone_number ~ '^[0-9+\-\s()]+$' AND length(phone_number) >= 10);
  EXCEPTION WHEN duplicate_object THEN
    -- Constraint already exists, ignore
  END;
END $$;

-- 3. Add additional financial validation constraints
DO $$
BEGIN
  -- Ensure transaction amounts have reasonable limits
  BEGIN
    ALTER TABLE public.transactions 
    ADD CONSTRAINT reasonable_transaction_amount 
    CHECK (amount <= 50000); -- Max transaction 50k
  EXCEPTION WHEN duplicate_object THEN
    -- Constraint already exists, ignore
  END;
  
  -- Ensure recharge amounts have reasonable limits
  BEGIN
    ALTER TABLE public.recharge_orders 
    ADD CONSTRAINT reasonable_recharge_amount 
    CHECK (amount <= 10000 AND amount >= 10); -- Min 10, Max 10k recharge
  EXCEPTION WHEN duplicate_object THEN
    -- Constraint already exists, ignore
  END;
END $$;