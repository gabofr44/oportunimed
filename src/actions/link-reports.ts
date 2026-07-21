"use server";

import { createClient } from "@/lib/supabase/server";

export async function reportBrokenLink(opportunityId: string, note?: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("link_reports").insert({
    opportunity_id: opportunityId,
    user_id: user?.id || null,
    note: note?.trim() || null,
  });

  if (error) return { error: error.message };
  return { error: null };
}