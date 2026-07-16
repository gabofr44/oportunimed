import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOpportunityById } from "@/actions/opportunities";
import { ApplyButton } from "@/components/opportunities/ApplyButton";
import { ArrowLeft, MapPin, Calendar, Building, ExternalLink, Sparkles } from "lucide-react";

const typeColors: Record<string, string> = {
  scholarship: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  research: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  internship: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
  course: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
};

const typeLabels: Record<string, string> = {
  scholarship: "Beca",
  research: "Investigación",
  internship: "Internado",
  course: "Curso",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OpportunityDetailPage({ params }: Props) {
  const { id } = await params;
  const { data: opportunity, error } = await getOpportunityById(id);

  if (error || !opportunity) {
    notFound();
  }

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/opportunities"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-blue transition-colors"
        >
          <ArrowLeft className="size-4" />
          Volver a Convocatorias
        </Link>

        <div className="bento-shadow rounded-2xl border border-border bg-card p-6 noise sm:p-8">
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/5 text-2xl font-bold text-primary">
                {opportunity.institution.charAt(0)}
              </div>
              <div className="flex gap-2">
                {opportunity.funding && (
                  <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <Sparkles className="mr-1 size-3" />
                    Financiado
                  </Badge>
                )}
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${typeColors[opportunity.type]}`}>
                  {typeLabels[opportunity.type] || opportunity.type}
                </span>
              </div>
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
              {opportunity.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <Building className="size-4" />
                {opportunity.institution}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {opportunity.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                Deadline:{" "}
                {new Date(opportunity.deadline).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {opportunity.tags.map((tag: string) => (
                <span key={tag} className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted">
                  {tag}
                </span>
              ))}
            </div>

            {opportunity.description && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-text-main">Descripción</h2>
                <p className="mt-3 leading-relaxed text-text-muted">
                  {opportunity.description}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ApplyButton opportunityId={opportunity.id} />
              {opportunity.link && (
                <a href={opportunity.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="rounded-xl">
                    Sitio oficial
                    <ExternalLink className="ml-2 size-4" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
