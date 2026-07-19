import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { educational_level, educational_field, interests, goals, preferred_types } = body;

  const { error } = await supabase
    .from("profiles")
    .update({
      educational_level: educational_level || null,
      educational_field: educational_field || null,
      interests: interests || [],
      goals: goals || [],
      onboarding_complete: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Create notification preferences based on onboarding answers
  await supabase
    .from("notification_preferences")
    .upsert({
      user_id: user.id,
      email: user.email,
      types: preferred_types || [],
      fields: interests || [],
      active: true,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });

  return NextResponse.json({ success: true });
}
