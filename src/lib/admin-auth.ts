"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const ADMIN_PASSWORD = "oportunimed2026";
const ADMIN_COOKIE = "oportunimed_admin";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function verifyAdminPassword(password: string): Promise<boolean> {
  if (password !== ADMIN_PASSWORD && password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    return false;
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return true;
}

export async function isAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === "true";
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Allow if logged in as admin via Supabase
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === "admin") return supabase;
  }

  // Allow if admin password session exists
  const isAdmin = await isAdminSession();
  if (isAdmin) return supabase;

  throw new Error("No tienes permisos de admin");
}
