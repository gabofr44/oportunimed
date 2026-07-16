"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sanitize } from "@/lib/sanitization";
import { authLimiter } from "@/lib/rate-limit";
import {
  opportunitySchema,
  type OpportunityInput,
} from "@/lib/validations/opportunity";

async function checkRateLimit(userId: string) {
  const { success } = await authLimiter.limit(userId);
  if (!success) {
    throw new Error("Too many requests. Please try again later.");
  }
}

export async function getOpportunities(filters?: {
  type?: string;
  funding?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}) {
  const supabase = await createClient();

  const page = filters?.page || 1;
  const limit = filters?.limit || 12;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("opportunities")
    .select("*", { count: "exact" })
    .gte("deadline", new Date().toISOString())
    .order("deadline", { ascending: true })
    .range(offset, offset + limit - 1);

  if (filters?.type && filters.type !== "all") {
    query = query.eq("type", filters.type);
  }

  if (filters?.funding) {
    query = query.eq("funding", true);
  }

  if (filters?.search) {
    const sanitizedSearch = sanitize(filters.search);
    query = query.or(
      `title.ilike.%${sanitizedSearch}%,institution.ilike.%${sanitizedSearch}%,location.ilike.%${sanitizedSearch}%`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching opportunities:", error);
    return { data: [], count: 0, error: error.message };
  }

  return { data, count: count || 0, error: null };
}

export async function getFeaturedOpportunities() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("is_featured", true)
    .gte("deadline", new Date().toISOString())
    .order("deadline", { ascending: true })
    .limit(6);

  if (error) {
    console.error("Error fetching featured opportunities:", error);
    return { data: [], error: error.message };
  }

  return { data, error: null };
}

export async function getOpportunityById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function createOpportunity(input: OpportunityInput) {
  const parsed = opportunitySchema.safeParse(input);

  if (!parsed.success) {
    return { data: null, error: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: { auth: ["Unauthorized"] } };
  }

  try {
    await checkRateLimit(user.id);
  } catch (e) {
    return { data: null, error: { auth: [(e as Error).message] } };
  }

  const sanitizedData = {
    ...parsed.data,
    title: sanitize(parsed.data.title),
    institution: sanitize(parsed.data.institution),
    location: sanitize(parsed.data.location),
    description: parsed.data.description
      ? sanitize(parsed.data.description)
      : undefined,
  };

  const { data, error } = await supabase
    .from("opportunities")
    .insert({
      ...sanitizedData,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    return { data: null, error: { db: [error.message] } };
  }

  revalidatePath("/opportunities");
  return { data, error: null };
}

export async function updateOpportunity(id: string, input: Partial<OpportunityInput>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: { auth: ["Unauthorized"] } };
  }

  const sanitizedInput: Record<string, unknown> = { ...input };
  if (input.title) sanitizedInput.title = sanitize(input.title);
  if (input.institution) sanitizedInput.institution = sanitize(input.institution);
  if (input.location) sanitizedInput.location = sanitize(input.location);
  if (input.description) sanitizedInput.description = sanitize(input.description);

  const { data, error } = await supabase
    .from("opportunities")
    .update(sanitizedInput)
    .eq("id", id)
    .eq("created_by", user.id)
    .select()
    .single();

  if (error) {
    return { data: null, error: { db: [error.message] } };
  }

  revalidatePath("/opportunities");
  return { data, error: null };
}

export async function deleteOpportunity(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("opportunities")
    .delete()
    .eq("id", id)
    .eq("created_by", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/opportunities");
  return { error: null };
}
