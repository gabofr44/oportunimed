"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function getChecklist(opportunityId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Unauthorized" };

  const { data, error } = await supabase
    .from("checklists")
    .select("*")
    .eq("user_id", user.id)
    .eq("opportunity_id", opportunityId)
    .maybeSingle();

  if (error) return { data: null, error: error.message };
  return { data, error: null };
}

const defaultItems = [
  { id: "cv", label: "Preparar CV / currículum", done: false },
  { id: "recommendation", label: "Solicitar cartas de recomendación", done: false },
  { id: "transcripts", label: "Obtener expediente académico / transcripts", done: false },
  { id: "language", label: "Certificado de idioma (TOEFL/IELTS)", done: false },
  { id: "essay", label: "Redactar carta de motivación / ensayo", done: false },
  { id: "passport", label: "Verificar vigencia del pasaporte", done: false },
];

export async function saveChecklist(opportunityId: string, items: { id: string; label: string; done: boolean }[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("checklists")
    .upsert({
      user_id: user.id,
      opportunity_id: opportunityId,
      items,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id, opportunity_id" });

  if (error) return { error: error.message };
  revalidatePath(`/opportunities/${opportunityId}`);
  return { error: null };
}

export async function initChecklist(opportunityId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: "Unauthorized" };

  const { data, error } = await supabase
    .from("checklists")
    .upsert({
      user_id: user.id,
      opportunity_id: opportunityId,
      items: defaultItems,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id, opportunity_id" })
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  revalidatePath(`/opportunities/${opportunityId}`);
  return { data, error: null };
}
