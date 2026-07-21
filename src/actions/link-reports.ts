"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

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

export async function getLinkReports() {
  await requireAdmin();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("link_reports")
    .select("id, note, resolved, created_at, opportunity_id, opportunities (id, title, link)")
    .order("resolved", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data: data || [], error: null };
}

export async function resolveLinkReport(reportId: string, resolved: boolean) {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from("link_reports")
    .update({ resolved })
    .eq("id", reportId);

  if (error) return { error: error.message };
  revalidatePath("/admin");
  return { error: null };
}