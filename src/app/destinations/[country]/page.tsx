import { notFound } from "next/navigation";
import Link from "next/link";
import { getOpportunitiesByCountry } from "@/actions/opportunities";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, ExternalLink, Sparkles } from "lucide-react";

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

interface Props {
  params: Promise<{ country: string }>;
}

export default async function CountryPage({ params }: Props) {
  const { country } = await params;
  const countryName = decodeURIComponent(country);
  const { data: opportunities, error } = await getOpportunitiesByCountry(countryName);

  if (error || !opportunities) {
    notFound();
  }

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/destinations"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-blue transition-colors"
        >
          <ArrowLeft className="size-4" />
          Volver a destinos
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
          Oportunidades en {countryName}
        </h1>
        <p className="mt-2 text-text-muted">
          {opportunities.length} {opportunities.length === 1 ? "programa encontrado" : "programas encontrados"}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp: {
            id: string; title: string; type: string; deadline: string; location: string;
            funding: boolean; tags: string[]; link?: string | null; description?: string | null;
          }) => (
            <Link key={opp.id} href={`/opportunities/${opp.id}`}>
              <div className="bento-shadow card-hover group flex h-full flex-col rounded-2xl border border-border bg-card p-5 noise">
                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${typeColors[opp.type]}`}>
                      {typeLabels[opp.type] || opp.type}
                    </span>
                    {opp.funding && (
                      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <Sparkles className="mr-1 size-3" />
                        Financiado
                      </Badge>
                    )}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-text-main group-hover:text-blue transition-colors">
                    {opp.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
                    <MapPin className="size-3 shrink-0" />
                    {opp.location}
                  </p>
                  <p className="mt-3 flex items-center gap-1 text-xs text-text-muted">
                    <Calendar className="size-3" />
                    Deadline: {new Date(opp.deadline).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}
                  </p>
                  {opp.tags && opp.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {opp.tags.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="inline-flex items-center rounded-full border border-border bg-surface px-2 py-0.5 text-xs font-medium text-text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative z-10 mt-3 flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-text-muted transition-colors group-hover:border-blue/20 group-hover:text-blue">
                  Ver detalles
                  <ExternalLink className="size-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {opportunities.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center mt-8">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-surface">
              <MapPin className="size-6 text-text-muted" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-text-main">No hay oportunidades en este destino</h3>
            <p className="mt-1 text-sm text-text-muted">
              Prueba explorar otros destinos.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
