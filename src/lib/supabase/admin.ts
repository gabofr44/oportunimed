import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Uses the service role key to bypass RLS. Only call this AFTER requireAdmin()
// has already verified the caller is an admin (via password session or
// Supabase role) - this client trusts that check completely, same pattern
// as the rest of the admin panel which gates access at the application layer.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
