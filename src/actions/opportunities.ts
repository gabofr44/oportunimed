"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { sanitize } from "@/lib/sanitization";
import { authLimiter } from "@/lib/rate-limit";
import {
  opportunitySchema,
  type OpportunityInput,
} from "@/lib/validations/opportunity";
import { getOpportunityStatus } from "@/types";

async function checkRateLimit(userId: string) {
  const { success } = await authLimiter.limit(userId);
  if (!success) {
    throw new Error("Too many requests. Please try again later.");
  }
}

export async function getOpportunities(filters?: {
  type?: string;
  subtype?: string;
  funding?: boolean;
  search?: string;
  level?: string;
  field?: string;
  course_level?: string;
  course_subject?: string;
  course_language?: string;
  call_status?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("opportunities")
    .select("*", { count: "exact" })
    .order("deadline", { ascending: true });

  if (filters?.type && filters.type !== "all") {
    query = query.eq("type", filters.type);
  }

  if (filters?.subtype && filters.subtype !== "all") {
    query = query.eq("subtype", filters.subtype);
  }

  if (filters?.funding) {
    query = query.eq("funding", true);
  }

  if (filters?.level && filters.level !== "all") {
    query = query.eq("educational_level", filters.level);
  }

  if (filters?.field && filters.field !== "all") {
    query = query.eq("educational_field", filters.field);
  }

  if (filters?.course_level && filters.course_level !== "all") {
    query = query.eq("course_level", filters.course_level);
  }

  if (filters?.course_subject && filters.course_subject !== "all") {
    query = query.eq("course_subject", filters.course_subject);
  }

  if (filters?.course_language && filters.course_language !== "all") {
    query = query.eq("course_language", filters.course_language);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching opportunities:", error);
    return { data: [], count: 0, error: error.message };
  }

  let results = data || [];

  // Smart search: search across ALL fields and rank by relevance
  if (filters?.search && filters.search.trim()) {
    const searchLower = filters.search.toLowerCase().trim();
    const searchTerms = searchLower.split(/\s+/).filter(t => t.length > 1);

    results = results
      .map(opp => {
        let score = 0;
        const titleLower = opp.title?.toLowerCase() || '';
        const institutionLower = opp.institution?.toLowerCase() || '';
        const locationLower = opp.location?.toLowerCase() || '';
        const descriptionLower = opp.description?.toLowerCase() || '';
        const linkLower = opp.link?.toLowerCase() || '';
        const tagsLower = (opp.tags || []).map((t: string) => t.toLowerCase()).join(' ');

        // Exact match in title = highest score
        if (titleLower.includes(searchLower)) score += 100;

        // Search each term separately
        for (const term of searchTerms) {
          // Title matches (highest priority)
          if (titleLower.includes(term)) score += 50;
          // Institution matches
          if (institutionLower.includes(term)) score += 30;
          // Location matches
          if (locationLower.includes(term)) score += 25;
          // Description matches
          if (descriptionLower.includes(term)) score += 20;
          // Tags match
          if (tagsLower.includes(term)) score += 15;
          // Link matches
          if (linkLower.includes(term)) score += 10;
        }

        return { ...opp, _score: score };
      })
      .filter(opp => opp._score > 0)
      .sort((a, b) => b._score - a._score);
  }

  // Filter by call status (activa, por_salir, pasada)
  if (filters?.call_status && filters.call_status !== "all") {
    const now = new Date();
    results = results.filter(opp => {
      const status = getOpportunityStatus(opp.deadline, opp.call_frequency);
      return status === filters.call_status;
    });
  }

  return { data: results, count: results.length, error: null };
}

export async function getOpportunityStats() {
  const supabase = await createClient();

  const { count: total } = await supabase
    .from("opportunities")
    .select("*", { count: "exact", head: true });

  const { data: locations } = await supabase
    .from("opportunities")
    .select("location");

  const { data: types } = await supabase
    .from("opportunities")
    .select("type");

  const uniqueLocations = new Set((locations || []).map((l: { location: string }) => l.location?.trim()).filter(Boolean));
  const uniqueTypes = new Set((types || []).map((t: { type: string }) => t.type).filter(Boolean));

  return {
    total: total || 0,
    countries: uniqueLocations.size,
    types: uniqueTypes.size,
  };
}

export async function getOpportunitiesByCountry(country: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .ilike("location", `%${country}%`)
    .order("deadline", { ascending: true });

  if (error) {
    console.error("Error fetching opportunities by country:", error);
    return { data: [], error: error.message };
  }

  return { data, error: null };
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
