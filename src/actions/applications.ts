"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function applyToOpportunity(opportunityId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to apply" };
  }

  const { data, error } = await supabase
    .from("applications")
    .insert({
      user_id: user.id,
      opportunity_id: opportunityId,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return { error: "You have already applied to this opportunity" };
    }
    return { error: error.message };
  }

  revalidatePath("/opportunities");
  return { data, error: null };
}

export async function getUserApplications() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: [], error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("applications")
    .select(`
      *,
      opportunities (
        title,
        institution,
        location,
        type,
        deadline
      )
    `)
    .eq("user_id", user.id)
    .order("applied_at", { ascending: false });

  if (error) {
    return { data: [], error: error.message };
  }

  return { data, error: null };
}

export async function updateApplicationStatus(
  applicationId: string,
  status: "pending" | "accepted" | "rejected" | "withdrawn"
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", applicationId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/opportunities");
  return { error: null };
}
