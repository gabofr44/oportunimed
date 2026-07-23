import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

const DAYS_AHEAD = 7;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oportunimed.vercel.app";

interface SavedRow {
  id: string;
  user_id: string;
  opportunities: {
    id: string;
    title: string;
    deadline: string;
    location: string;
  } | null;
}

// Vercel Cron calls this on a schedule (see vercel.json). Protected with
// CRON_SECRET so it can't be triggered by anyone else.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY no configurada" }, { status: 500 });
  }

  const admin = createAdminClient();
  const resend = new Resend(process.env.RESEND_API_KEY);

  const now = new Date();
  const cutoff = new Date(now.getTime() + DAYS_AHEAD * 24 * 60 * 60 * 1000);

  // Favoritos con deadline en los proximos DAYS_AHEAD dias que no se han recordado
  const { data: saved, error } = await admin
    .from("saved_opportunities")
    .select("id, user_id, opportunities (id, title, deadline, location)")
    .is("reminder_sent_at", null)
    .returns<SavedRow[]>();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const upcoming = (saved || []).filter((row) => {
    if (!row.opportunities?.deadline) return false;
    const deadline = new Date(row.opportunities.deadline);
    return deadline > now && deadline <= cutoff;
  });

  if (upcoming.length === 0) {
    return NextResponse.json({ sent: 0, message: "Sin recordatorios pendientes" });
  }

  // Agrupar por usuario para mandar un solo correo con todos sus deadlines
  const byUser = new Map<string, SavedRow[]>();
  for (const row of upcoming) {
    const list = byUser.get(row.user_id) || [];
    list.push(row);
    byUser.set(row.user_id, list);
  }

  let sentCount = 0;
  const savedIdsToMark: string[] = [];

  for (const [userId, rows] of byUser.entries()) {
    // Respeta preferencias explicitas de notificacion si el usuario las desactivo
    const { data: prefs } = await admin
      .from("notification_preferences")
      .select("email, active")
      .eq("user_id", userId)
      .maybeSingle();

    if (prefs && prefs.active === false) continue;

    const { data: userData } = await admin.auth.admin.getUserById(userId);
    const email = prefs?.email || userData?.user?.email;
    if (!email) continue;

    const itemsHtml = rows
      .map((r) => {
        const opp = r.opportunities!;
        const deadline = new Date(opp.deadline).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return `<li style="margin-bottom:12px;">
          <a href="${SITE_URL}/opportunities/${opp.id}" style="color:#2563EB;font-weight:600;text-decoration:none;">${opp.title}</a>
          <br/><span style="color:#6b7280;font-size:14px;">${opp.location} · Fecha límite: ${deadline}</span>
        </li>`;
      })
      .join("");

    try {
      await resend.emails.send({
        from: "Oportunimed <onboarding@resend.dev>",
        to: email,
        subject: `Tienes ${rows.length} convocatoria${rows.length === 1 ? "" : "s"} guardada${rows.length === 1 ? "" : "s"} por vencer`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
            <h2 style="color:#09090B;">Tus favoritos están por cerrar</h2>
            <p style="color:#374151;">Estas oportunidades que guardaste cierran en los próximos ${DAYS_AHEAD} días:</p>
            <ul style="list-style:none;padding:0;">${itemsHtml}</ul>
            <p style="margin-top:24px;">
              <a href="${SITE_URL}/dashboard/favoritos" style="color:#2563EB;">Ver todos tus favoritos</a>
            </p>
          </div>
        `,
      });
      sentCount++;
      savedIdsToMark.push(...rows.map((r) => r.id));
    } catch (err) {
      console.error(`Error enviando recordatorio a usuario ${userId}:`, err);
    }
  }

  if (savedIdsToMark.length > 0) {
    await admin
      .from("saved_opportunities")
      .update({ reminder_sent_at: new Date().toISOString() })
      .in("id", savedIdsToMark);
  }

  return NextResponse.json({ sent: sentCount, opportunities: savedIdsToMark.length });
}
