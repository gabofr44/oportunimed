import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Próximos 30 Días | OportuniMed",
  description: "Convocatorias con fecha límite en los próximos 30 días.",
};

const typeColors: Record<string, string> = {
  scholarship: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  research: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  internship: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
  internado_ss: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
  course: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  event: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",
};

const typeLabels: Record<string, string> = {
  scholarship: "Beca",
  research: "Investigación",
  internship: "Internship",
  internado_ss: "Internado y SS",
  course: "Curso",
  event: "Evento",
};

export default async function ProximosPage() {
  const supabase = await createClient();
  const now = new Date();
  const thirtyDays = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const { data: opportunities } = await supabase
    .from("opportunities")
    .select("*")
    .gte("deadline", now.toISOString())
    .lte("deadline", thirtyDays.toISOString())
    .order("deadline", { ascending: true });

  const items = opportunities || [];

  const weeks: { label: string; items: typeof items }[] = [];
  for (let w = 0; w < 4; w++) {
    const start = new Date(now.getTime() + w * 7 * 24 * 60 * 60 * 1000);
    const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);
    const weekItems = items.filter((o) => {
      const d = new Date(o.deadline);
      return d >= start && d < end;
    });
    if (weekItems.length > 0) {
      const weekLabel = w === 0 ? "Esta semana" : w === 1 ? "Próxima semana" : `Semana ${w + 1}`;
      weeks.push({ label: weekLabel, items: weekItems });
    }
  }

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
          Próximos 30 días
        </h1>
        <p className="mt-2 text-text-muted">
          {items.length} convocatorias con deadline en los próximos 30 días
        </p>

        {weeks.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center mt-8">
            <Calendar className="size-10 text-text-muted" />
            <h3 className="mt-4 text-lg font-semibold text-text-main">No hay convocatorias próximas</h3>
            <p className="mt-1 text-sm text-text-muted">Vuelve pronto para ver nuevas fechas límite.</p>
            <Link href="/opportunities" className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground">
              Ver todas
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}

        {weeks.map((week) => (
          <section key={week.label} className="mt-10 first:mt-8">
            <h2 className="text-xl font-bold text-text-main flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                {week.items.length}
              </span>
              {week.label}
            </h2>
            <div className="mt-4 space-y-2">
              {week.items.map((opp: any) => (
                <Link key={opp.id} href={`/opportunities/${opp.id}`}>
                  <div className="bento-shadow card-hover group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-3 noise transition-all">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-text-main">
                        {new Date(opp.deadline).getDate()}
                      </span>
                      <span className="text-[10px] uppercase text-text-muted">
                        {new Date(opp.deadline).toLocaleDateString("es-ES", { month: "short" })}
                      </span>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-text-main group-hover:text-blue transition-colors truncate">
                        {opp.title}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-text-muted mt-0.5">
                        <MapPin className="size-3" />
                        {opp.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${typeColors[opp.type]}`}>
                        {typeLabels[opp.type] || opp.type}
                      </span>
                      {opp.funding && (
                        <Sparkles className="size-3.5 text-emerald-500" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
