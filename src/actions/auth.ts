"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { authSchema, type AuthInput } from "@/lib/validations/opportunity";
import { loginLimiter } from "@/lib/rate-limit";

async function checkLoginRateLimit(identifier: string) {
  const { success } = await loginLimiter.limit(identifier);
  if (!success) {
    throw new Error("Demasiados intentos. Espera un minuto e intenta de nuevo.");
  }
}

export async function signUp(
  input: AuthInput
): Promise<{ error?: Record<string, string[]>; success?: boolean }> {
  const parsed = authSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  try {
    await checkLoginRateLimit(parsed.data.email);
  } catch (e) {
    return { error: { auth: [(e as Error).message] } };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/auth/callback`,
    },
  });

  if (error) {
    return { error: { auth: [error.message] } };
  }

  return { success: true };
}

export async function signIn(
  input: AuthInput
): Promise<{ error?: Record<string, string[]>; success?: boolean }> {
  const parsed = authSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  try {
    await checkLoginRateLimit(parsed.data.email);
  } catch (e) {
    return { error: { auth: [(e as Error).message] } };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: { auth: [error.message] } };
  }

  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*, educational_level, educational_field")
    .eq("id", user.id)
    .single();

  return { ...user, profile };
}
