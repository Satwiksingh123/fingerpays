-- Fix function search path warning for is_backend_request function
CREATE OR REPLACE FUNCTION public.is_backend_request()
RETURNS boolean 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path TO 'public'
AS $$
BEGIN
  -- This function should only return true for service role requests
  -- In practice, edge functions with service role key bypass RLS
  RETURN false;
END;
$$;