"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { sanitize } from "@/lib/sanitization";
import { requireAdmin } from "@/lib/admin-auth";

// ============================================
// Site Content (key-value settings)
// ============================================

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
  const supabase = await requireAdmin();
  const sanitized = sanitize(value);

  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value: sanitized }, { onConflict: "key" });

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  return { error: null };
}

// ============================================
// Opportunities (admin)
// ============================================

export async function getAllOpportunities() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data, error: null };
}

export async function adminCreateOpportunity(data: {
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
  const supabase = await requireAdmin();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: created, error } = await supabase
    .from("opportunities")
    .insert({
      title: sanitize(data.title),
      institution: sanitize(data.institution),
      location: sanitize(data.location),
      type: data.type,
      funding: data.funding,
      deadline: data.deadline,
      description: data.description ? sanitize(data.description) : null,
      link: data.link || null,
      tags: data.tags,
      is_featured: data.is_featured,
      created_by: user?.id || null,
    })
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  revalidatePath("/opportunities");
  revalidatePath("/");
  return { data: created, error: null };
}

export async function adminUpdateOpportunity(
  id: string,
  data: {
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
  }
) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("opportunities")
    .update({
      title: sanitize(data.title),
      institution: sanitize(data.institution),
      location: sanitize(data.location),
      type: data.type,
      funding: data.funding,
      deadline: data.deadline,
      description: data.description ? sanitize(data.description) : null,
      link: data.link || null,
      tags: data.tags,
      is_featured: data.is_featured,
    })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/opportunities");
  revalidatePath("/");
  return { error: null };
}

export async function adminDeleteOpportunity(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("opportunities")
    .delete()
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/opportunities");
  revalidatePath("/");
  return { error: null };
}

// ============================================
// Page Sections
// ============================================

export async function getAllPageSections() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("page_sections")
    .select("*")
    .order("page")
    .order("sort_order");

  if (error) return { data: [], error: error.message };
  return { data, error: null };
}

export async function getPageSections(page: string = "home") {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page", page)
    .order("sort_order");

  if (error) return { data: [], error: error.message };
  return { data, error: null };
}

export async function updatePageSection(
  id: string,
  content: Record<string, unknown>,
  title?: string
) {
  const supabase = await requireAdmin();
  const update: Record<string, unknown> = { content };
  if (title) update.title = title;

  const { error } = await supabase
    .from("page_sections")
    .update(update)
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  return { error: null };
}

export async function updateSectionVisibility(id: string, visible: boolean) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("page_sections")
    .update({ visible })
    .eq("id", id);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { error: null };
}

export async function reorderSections(ids: string[]) {
  const supabase = await requireAdmin();

  const updates = ids.map((id, index) =>
    supabase
      .from("page_sections")
      .update({ sort_order: index + 1 })
      .eq("id", id)
  );

  await Promise.all(updates);
  revalidatePath("/");
  return { error: null };
}
