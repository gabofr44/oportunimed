-- Fix: handle_new_user() fallaba con "relation profiles does not exist"
-- porque el trigger corre sin el schema "public" en el search_path por defecto.
-- Esto bloqueaba TODO registro nuevo (Google OAuth y email/password).
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$;
