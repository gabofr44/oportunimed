"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getSiteContent() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .order("section");

  if (error) return { data: [], error: error.message };
  return { data, error: null };
}

export async function updateSiteContent(key: string, value: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value }, { onConflict: "key" });

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  return { error: null };
}

export async function getAllOpportunities() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data, error: null };
}

export async function adminCreateOpportunity(input: {
  title: string;
  institution: string;
  location: string;
  type: string;
  funding: boolean;
  deadline: string;
  description?: string;
  link?: string;
  tags: string[];
  is_featured: boolean;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunities")
    .insert(input)
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  revalidatePath("/");
  revalidatePath("/opportunities");
  revalidatePath("/admin");
  return { data, error: null };
}

export async function adminUpdateOpportunity(id: string, input: Record<string, unknown>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("opportunities")
    .update(input)
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/opportunities");
  revalidatePath("/admin");
  return { error: null };
}

export async function adminDeleteOpportunity(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("opportunities")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/opportunities");
  revalidatePath("/admin");
  return { error: null };
}
