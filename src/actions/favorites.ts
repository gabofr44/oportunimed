"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleSaved(opportunityId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Debes iniciar sesión para guardar oportunidades" };
  }

  const { data: existing } = await supabase
    .from("saved_opportunities")
    .select("id")
    .eq("user_id", user.id)
    .eq("opportunity_id", opportunityId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("saved_opportunities")
      .delete()
      .eq("id", existing.id);

    if (error) return { error: error.message };
    revalidatePath("/opportunities");
    revalidatePath("/dashboard/favoritos");
    return { saved: false, error: null };
  }

  const { error } = await supabase.from("saved_opportunities").insert({
    user_id: user.id,
    opportunity_id: opportunityId,
  });

  if (error) return { error: error.message };
  revalidatePath("/opportunities");
  revalidatePath("/dashboard/favoritos");
  return { saved: true, error: null };
}

export async function getSavedOpportunityIds(): Promise<string[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("saved_opportunities")
    .select("opportunity_id")
    .eq("user_id", user.id);

  return (data || []).map((row) => row.opportunity_id);
}

export async function getSavedOpportunities() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { data: [], error: "Unauthorized" };

  const { data, error } = await supabase
    .from("saved_opportunities")
    .select(
      `
      id,
      created_at,
      opportunities (*)
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };

  return { data: data || [], error: null };
}