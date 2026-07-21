import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOpportunityById } from "@/actions/opportunities";
import { createClient } from "@/lib/supabase/server";
import { ApplyButton } from "@/components/opportunities/ApplyButton";
import { ChecklistSection } from "@/components/opportunities/ChecklistSection";
import { SaveButton } from "@/components/opportunities/SaveButton";
import { ReportLinkButton } from "@/components/opportunities/ReportLinkButton";
import { getSavedOpportunityIds } from "@/actions/favorites";
import { ArrowLeft, MapPin, Calendar, ExternalLink, Sparkles, GraduationCap, BookOpen, Timer } from "lucide-react";
import { getOpportunityStatus, getStatusLabel } from "@/types";

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

const educationalLevelLabels: Record<string, string> = {
  secundaria: "Secundaria",
  preparatoria: "Preparatoria",
  universidad: "Universidad",
  posgrado: "Posgrado",
  profesional: "Profesional",
};

const educationalFieldLabels: Record<string, string> = {
  general: "General",
  ciencias: "Ciencias",
  ciencias_salud: "Ciencias de la Salud",
  ciencias_sociales: "Ciencias Sociales",
  administracion: "Administración",
  ingenieria: "Ingeniería",
  tecnologia: "Tecnología",
  humanidades: "Humanidades",
  derecho: "Derecho",
  educacion: "Educación",
  artes: "Artes",
};

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const { data: opportunity } = await getOpportunityById(id);

  if (!opportunity) {
    return { title: "Convocatoria no encontrada | Oportunimed" };
  }

  const typeName = typeLabels[opportunity.type] || opportunity.type;
  const title = `${opportunity.title} | ${typeName} en ${opportunity.location} | Oportunimed`;
  const description =
    opportunity.description?.slice(0, 155) ||
    `${typeName} en ${opportunity.location}. Fecha límite: ${new Date(opportunity.deadline).toLocaleDateString("es-ES")}. Encuentra los detalles y aplica en Oportunimed.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  };
}

export default async function OpportunityDetailPage({ params }: Props) {
  const { id } = await params;
  const { data: opportunity, error } = await getOpportunityById(id);

  if (error || !opportunity) {
    notFound();
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const savedIds = user ? await getSavedOpportunityIds() : [];
  const isSaved = savedIds.includes(id);
  let checklistItems = null;
  if (user) {
    const { data: cl } = await supabase
      .from("checklists")
      .select("items")
      .eq("user_id", user.id)
      .eq("opportunity_id", id)
      .maybeSingle();
    checklistItems = cl?.items || null;
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
                {opportunity.title.charAt(0)}
              </div>
              <div className="flex flex-wrap gap-2">
                {(() => {
                  const status = getOpportunityStatus(opportunity.deadline, opportunity.call_frequency);
                  const statusColor = status === "activa" ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300" :
                    status === "por_salir" ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300" :
                    "border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400";
                  return (
                    <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${statusColor}`}>
                      <Timer className="size-3" />
                      {getStatusLabel(status)}
                    </span>
                  );
                })()}
                {opportunity.funding && (
                  <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <Sparkles className="mr-1 size-3" />
                    Financiado
                  </Badge>
                )}
                {opportunity.subtype && (
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${typeColors[opportunity.type]} opacity-80`}>
                    {opportunity.subtype.replace(/_/g, " ")}
                  </span>
                )}
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${typeColors[opportunity.type]}`}>
                  {typeLabels[opportunity.type] || opportunity.type}
                </span>
                <SaveButton
                  opportunityId={opportunity.id}
                  initialSaved={isSaved}
                  isLoggedIn={!!user}
                  size="md"
                />
              </div>
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
              {opportunity.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {opportunity.location}
              </span>
              {opportunity.deadline && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-4" />
                  Fecha límite:{" "}
                  {new Date(opportunity.deadline).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {opportunity.tags.map((tag: string) => (
                <span key={tag} className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {opportunity.educational_level && (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
                  <GraduationCap className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-text-muted">Nivel Educativo</p>
                    <p className="font-medium text-text-main">{educationalLevelLabels[opportunity.educational_level] || opportunity.educational_level}</p>
                  </div>
                </div>
              )}
              {opportunity.educational_field && (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
                  <BookOpen className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-text-muted">Rama Educativa</p>
                    <p className="font-medium text-text-main">{educationalFieldLabels[opportunity.educational_field] || opportunity.educational_field}</p>
                  </div>
                </div>
              )}
              {opportunity.call_frequency && (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
                  <Timer className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-text-muted">Frecuencia de Convocatoria</p>
                    <p className="font-medium text-text-main">{opportunity.call_frequency}</p>
                  </div>
                </div>
              )}
              {opportunity.type === "course" && opportunity.course_level && (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
                  <GraduationCap className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-text-muted">Nivel del Curso</p>
                    <p className="font-medium text-text-main">
                      {opportunity.course_level === "beginner" ? "Principiante" :
                       opportunity.course_level === "intermediate" ? "Intermedio" :
                       opportunity.course_level === "advanced" ? "Avanzado" : opportunity.course_level}
                    </p>
                  </div>
                </div>
              )}
              {opportunity.type === "course" && opportunity.course_duration && (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
                  <Calendar className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-text-muted">Duración</p>
                    <p className="font-medium text-text-main">{opportunity.course_duration}</p>
                  </div>
                </div>
              )}
              {opportunity.type === "course" && opportunity.course_subject && (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
                  <BookOpen className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-text-muted">Materia</p>
                    <p className="font-medium text-text-main">{opportunity.course_subject}</p>
                  </div>
                </div>
              )}
              {opportunity.type === "course" && opportunity.course_language && (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
                  <BookOpen className="size-5 text-primary" />
                  <div>
                    <p className="text-xs text-text-muted">Idioma</p>
                    <p className="font-medium text-text-main">{opportunity.course_language === "en" ? "Inglés" : opportunity.course_language === "es" ? "Español" : opportunity.course_language}</p>
                  </div>
                </div>
              )}
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

            <div className="mt-3">
              <ReportLinkButton opportunityId={opportunity.id} />
            </div>

            <ChecklistSection opportunityId={opportunity.id} initialItems={checklistItems as any} isAuthenticated={!!user} />
          </div>
        </div>
      </div>
    </main>
  );
}