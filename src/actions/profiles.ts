"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Profile } from "@/types";

export async function getProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  return {
    email: user.email,
    ...profile,
  } as {
    email: string | undefined;
  } & Profile;
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const full_name = formData.get("full_name") as string | null;
  const bio = formData.get("bio") as string | null;
  const country = formData.get("country") as string | null;
  const university = formData.get("university") as string | null;
  const educational_level = formData.get("educational_level") as string | null;
  const educational_field = formData.get("educational_field") as string | null;

  const updates: Record<string, unknown> = {};
  if (full_name !== null) updates.full_name = full_name || null;
  if (bio !== null) updates.bio = bio || null;
  if (country !== null) updates.country = country || null;
  if (university !== null) updates.university = university || null;
  if (educational_level !== null) updates.educational_level = educational_level || null;
  if (educational_field !== null) updates.educational_field = educational_field || null;

  if (Object.keys(updates).length === 0) {
    return { error: "No hay datos para actualizar" };
  }

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

async function updateProfileJson(data: Record<string, unknown>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "No autenticado" };
  }

  const { error } = await supabase
    .from("profiles")
    .update(data)
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function updateInterests(interests: string[]) {
  return updateProfileJson({ interests });
}

export async function updateGoals(goals: string[]) {
  return updateProfileJson({ goals });
}
