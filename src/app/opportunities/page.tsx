import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { getOpportunities } from "@/actions/opportunities";
import { getCurrentUser } from "@/actions/auth";
import { getSavedOpportunityIds } from "@/actions/favorites";
import { getOpportunityStatus, getStatusLabel } from "@/types";
import { Search, MapPin, Calendar, Sparkles, ArrowUpRight, GraduationCap, BookOpen, Timer, Star } from "lucide-react";
import Link from "next/link";
import { GuidedTour } from "@/components/onboarding/GuidedTour";
import { TourHelpButton } from "@/components/onboarding/TourHelpButton";
import { SaveButton } from "@/components/opportunities/SaveButton";
import { SearchAutocomplete } from "@/components/opportunities/SearchAutocomplete";
import { CompareButton } from "@/components/opportunities/CompareButton";
import { CompareFloatingBar } from "@/components/opportunities/CompareFloatingBar";

export const metadata: Metadata = {
  title: "Convocatorias de Becas, Investigación e Internships | Oportunimed",
  description:
    "Explora cientos de becas, programas de investigación, internships y cursos para estudiantes de ciencias de la salud en todo el mundo. Filtra por nivel educativo, área y financiamiento.",
};

const tourSteps = [
  {
    targetId: "tour-search",
    title: "Busca por palabras clave",
    description: "Escribe el nombre de un país, tema o institución (ej. \"neurología\" o \"Alemania\") para encontrar convocatorias relacionadas.",
  },
  {
    targetId: "tour-type",
    title: "Filtra por tipo",
    description: "Elige si buscas becas, investigación, internships, cursos u otro tipo de convocatoria. La subcategoría de abajo se ajusta según lo que elijas aquí.",
  },
  {
    targetId: "tour-level-field",
    title: "Ajusta a tu perfil académico",
    description: "Nivel Educativo y Rama Educativa filtran las convocatorias según en qué etapa vas y qué área estudias, para no ver oportunidades que no te aplican.",
  },
  {
    targetId: "tour-estado",
    title: "Revisa el estado de la convocatoria",
    description: "\"Activa\" significa que puedes aplicar ahora mismo; \"Por salir\" son próximas a abrir. Combínalo con \"Solo financiados\" si buscas apoyo económico.",
  },
  {
    targetId: "tour-submit",
    title: "Aplica los filtros",
    description: "Los filtros no se aplican solos — dale clic aquí después de elegir los que te interesan.",
  },
  {
    targetId: "tour-results",
    title: "Ve el detalle y aplica",
    description: "Cada tarjeta te lleva a la página de detalle, y de ahí a la convocatoria oficial. Ahí es donde realmente aplicas — nosotros solo te ayudamos a encontrarla.",
  },
];

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

const subtypeLabels: Record<string, string> = {
  full_scholarship: "Beca Completa",
  fellowship: "Fellowship",
  government: "Gubernamental",
  need_based: "Necesidad Económica",
  merit_based: "Mérito Académico",
  travel_grant: "Travel Grant",
  corporate: "Corporativo",
  un_international: "Organismo Internacional",
  consulting: "Consultoría",
  tech: "Tecnología",
  research_internship: "Investigación",
  internado_pregrado: "Internado Médico Pregrado",
  servicio_social: "Servicio Social",
  phd: "Doctorado",
  postdoc: "Postdoctorado",
  research_fellowship: "Fellowship Investigación",
  clinical_fellowship: "Fellowship Clínico",
  summer_research: "Verano de Investigación",
  winter_research: "Invierno de Investigación",
  observership: "Observership",
  online: "En Línea",
  certification: "Certificación",
  bootcamp: "Bootcamp",
  summer_school: "Escuela de Verano",
  short_program: "Programa Corto",
  mentorship: "Mentoría",
  congress: "Congreso",
  hackathon: "Hackathon",
  competition: "Competencia",
  conference: "Conferencia",
  exchange: "Intercambio",
  mission_brain: "Mission Brain",
  student_chapter: "Capítulo Estudiantil",
};

const subtypesByType: Record<string, { value: string; label: string }[]> = {
  scholarship: [
    { value: "all", label: "Todas las becas" },
    { value: "full_scholarship", label: "Beca Completa" },
    { value: "fellowship", label: "Fellowship" },
    { value: "government", label: "Gubernamental" },
    { value: "need_based", label: "Necesidad Económica" },
    { value: "merit_based", label: "Mérito Académico" },
    { value: "travel_grant", label: "Travel Grant" },
  ],
  internship: [
    { value: "all", label: "Todas las internships" },
    { value: "corporate", label: "Corporativo" },
    { value: "un_international", label: "Organismo Internacional" },
    { value: "consulting", label: "Consultoría" },
    { value: "tech", label: "Tecnología" },
    { value: "research_internship", label: "Investigación" },
  ],
  internado_ss: [
    { value: "all", label: "Todos" },
    { value: "internado_pregrado", label: "Internado Médico Pregrado" },
    { value: "servicio_social", label: "Servicio Social" },
  ],
  research: [
    { value: "all", label: "Toda la investigación" },
    { value: "phd", label: "Doctorado" },
    { value: "postdoc", label: "Postdoctorado" },
    { value: "research_fellowship", label: "Fellowship Investigación" },
    { value: "clinical_fellowship", label: "Fellowship Clínico" },
    { value: "summer_research", label: "Verano de Investigación" },
    { value: "winter_research", label: "Invierno de Investigación" },
    { value: "observership", label: "Observership" },
  ],
  course: [
    { value: "all", label: "Todos los cursos" },
    { value: "online", label: "En Línea" },
    { value: "certification", label: "Certificación" },
    { value: "bootcamp", label: "Bootcamp" },
    { value: "summer_school", label: "Escuela de Verano" },
    { value: "short_program", label: "Programa Corto" },
    { value: "mentorship", label: "Mentoría" },
  ],
  event: [
    { value: "all", label: "Todos los eventos" },
    { value: "congress", label: "Congreso" },
    { value: "hackathon", label: "Hackathon" },
    { value: "competition", label: "Competencia" },
    { value: "conference", label: "Conferencia" },
    { value: "exchange", label: "Intercambio" },
    { value: "mission_brain", label: "Mission Brain" },
    { value: "student_chapter", label: "Capítulo Estudiantil" },
  ],
};

const statusColors: Record<string, string> = {
  activa: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
  por_salir: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  pasada: "bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700",
};

const levelLabels: Record<string, string> = {
  secundaria: "Secundaria",
  preparatoria: "Preparatoria",
  universidad: "Universidad",
  posgrado: "Posgrado",
  profesional: "Profesional",
};

const fieldLabels: Record<string, string> = {
  general: "General",
  ciencias: "Ciencias",
  ciencias_salud: "Ciencias de la Salud",
  ciencias_sociales: "Ciencias Sociales",
  administracion: "Administración / Negocios",
  ingenieria: "Ingeniería",
  tecnologia: "Tecnología / Computación",
  humanidades: "Humanidades",
  derecho: "Derecho",
  educacion: "Educación",
  artes: "Artes",
};

interface Props {
  searchParams: Promise<{
    q?: string;
    type?: string;
    subtype?: string;
    funding?: string;
    level?: string;
    field?: string;
    course_level?: string;
    course_subject?: string;
    course_language?: string;
    call_status?: string;
    recommended?: string;
    page?: string;
  }>;
}


export default async function OpportunitiesPage({ searchParams }: Props) {
  const params = await searchParams;
  const user = await getCurrentUser();
  const savedIds = new Set(user ? await getSavedOpportunityIds() : []);
  const userLevel = user?.profile?.educational_level as string | undefined;
  const userField = user?.profile?.educational_field as string | undefined;
  const recommended = params.recommended === "true" && !!(userLevel || userField);

  const currentPage = Math.max(1, parseInt(params.page || "1", 10) || 1);

  const { data: opportunities, count, totalPages } = await getOpportunities({
    search: params.q,
    type: params.type,
    subtype: params.subtype,
    funding: params.funding === "true",
    level: params.level,
    field: params.field,
    course_level: params.course_level,
    course_subject: params.course_subject,
    course_language: params.course_language,
    call_status: params.call_status,
    recommended: recommended || undefined,
    userLevel,
    userField,
    page: currentPage,
  });

  const buildPageHref = (targetPage: number) => {
    const sp = new URLSearchParams();
    if (params.q) sp.set("q", params.q);
    if (params.type) sp.set("type", params.type);
    if (params.subtype) sp.set("subtype", params.subtype);
    if (params.funding) sp.set("funding", params.funding);
    if (params.level) sp.set("level", params.level);
    if (params.field) sp.set("field", params.field);
    if (params.course_level) sp.set("course_level", params.course_level);
    if (params.course_subject) sp.set("course_subject", params.course_subject);
    if (params.course_language) sp.set("course_language", params.course_language);
    if (params.call_status) sp.set("call_status", params.call_status);
    if (params.recommended) sp.set("recommended", params.recommended);
    sp.set("page", String(targetPage));
    return `/opportunities?${sp.toString()}`;
  };

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-main">Convocatorias</h1>
            <p className="mt-2 text-text-muted">
              Descubre {count} programas disponibles en todo el mundo
            </p>
          </div>
          <TourHelpButton />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full shrink-0 space-y-6 lg:w-72">
            <div className="bento-shadow rounded-2xl border border-border bg-card p-5 noise">
              <div className="relative z-10">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Filtros
                </h3>

                <form className="space-y-4">
                  {user && (userLevel || userField) && (
                    <div>
                      <Link
                        href={recommended ? "/opportunities" : "/opportunities?recommended=true"}
                        className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                          recommended
                            ? "border-yellow-300 bg-yellow-50 text-yellow-800 dark:border-yellow-700 dark:bg-yellow-950 dark:text-yellow-200"
                            : "border-border bg-card text-text-muted hover:border-yellow-300/50"
                        }`}
                      >
                        <Star className={`size-4 ${recommended ? "fill-yellow-500 text-yellow-500" : ""}`} />
                        {recommended ? "Recomendados activos" : "Recomendado para ti"}
                      </Link>
                    </div>
                  )}
                  <div id="tour-search">
                    <label className="mb-1 block text-sm font-medium text-text-main">
                      Buscar
                    </label>
                    <SearchAutocomplete defaultValue={params.q} />
                  </div>

                  <div id="tour-type">
                    <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-text-main">
                      <span className="size-1.5 rounded-full bg-blue" />
                      Tipo de Convocatoria
                    </label>
                    <select
                      name="type"
                      defaultValue={params.type}
                      className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-text-main"
                    >
                      <option value="all">Todos</option>
                      <option value="scholarship">Becas</option>
                      <option value="research">Investigación</option>
                      <option value="internship">Internships</option>
                      <option value="course">Cursos</option>
                      <option value="internado_ss">Internado y SS</option>
                      <option value="event">Eventos</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-text-main">
                      <span className="size-1.5 rounded-full bg-purple-500" />
                      Subcategoría
                    </label>
                    <select
                      name="subtype"
                      defaultValue={params.subtype}
                      className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-text-main"
                    >
                      <option value="all">Todas las subcategorías</option>
                      {params.type && params.type !== "all" && subtypesByType[params.type]
                        ? subtypesByType[params.type].map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))
                        : Object.entries(subtypesByType).map(([, subs]) =>
                            subs.slice(0, 1).map((s) =>
                              s.value === "all" ? null : (
                                <option key={s.value} value={s.value}>{s.label}</option>
                              )
                            )
                          )}
                    </select>
                  </div>

                  <div id="tour-level-field">
                    <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-text-main">
                      <GraduationCap className="size-3.5 text-blue" />
                      Nivel Educativo
                    </label>
                    <select
                      name="level"
                      defaultValue={params.level}
                      className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-text-main"
                    >
                      <option value="all">Todos los niveles</option>
                      <option value="secundaria">Secundaria</option>
                      <option value="preparatoria">Preparatoria</option>
                      <option value="universidad">Universidad</option>
                      <option value="posgrado">Posgrado (Maestría/Doctorado)</option>
                      <option value="profesional">Profesional / Carrera</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-text-main">
                      <BookOpen className="size-3.5 text-blue" />
                      Rama Educativa
                    </label>
                    <select
                      name="field"
                      defaultValue={params.field}
                      className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-text-main"
                    >
                      <option value="all">Todas las ramas</option>
                      <option value="general">General / Multidisciplinario</option>
                      <option value="ciencias">Ciencias</option>
                      <option value="ciencias_salud">Ciencias de la Salud</option>
                      <option value="ciencias_sociales">Ciencias Sociales</option>
                      <option value="administracion">Administración / Negocios</option>
                      <option value="ingenieria">Ingeniería</option>
                      <option value="tecnologia">Tecnología / Computación</option>
                      <option value="humanidades">Humanidades</option>
                      <option value="derecho">Derecho</option>
                      <option value="educacion">Educación</option>
                      <option value="artes">Artes</option>
                    </select>
                  </div>

                  {params.type === "course" && (
                    <>
                      <div>
                        <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-text-main">
                          Nivel del Curso
                        </label>
                        <select
                          name="course_level"
                          defaultValue={params.course_level}
                          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-text-main"
                        >
                          <option value="all">Todos los niveles</option>
                          <option value="beginner">Principiante</option>
                          <option value="intermediate">Intermedio</option>
                          <option value="advanced">Avanzado</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-text-main">
                          Materia
                        </label>
                        <select
                          name="course_subject"
                          defaultValue={params.course_subject}
                          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-text-main"
                        >
                          <option value="all">Todas las materias</option>
                          <option value="Medicina">Medicina</option>
                          <option value="Salud Pública">Salud Pública</option>
                          <option value="Neurología">Neurología</option>
                          <option value="Epidemiología">Epidemiología</option>
                          <option value="Biología">Biología</option>
                          <option value="Química">Química</option>
                          <option value="Física">Física</option>
                          <option value="Matemáticas">Matemáticas</option>
                          <option value="Ciencias de la Computación">Ciencias de la Computación</option>
                          <option value="Programación">Programación</option>
                          <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                          <option value="Ciencia de Datos">Ciencia de Datos</option>
                          <option value="Ingeniería">Ingeniería</option>
                          <option value="Negocios">Negocios</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Finanzas">Finanzas</option>
                          <option value="Filosofía">Filosofía</option>
                          <option value="Historia">Historia</option>
                          <option value="Psicología">Psicología</option>
                          <option value="Sociología">Sociología</option>
                          <option value="Derecho">Derecho</option>
                          <option value="Educación">Educación</option>
                          <option value="Arte">Arte</option>
                          <option value="Música">Música</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-text-main">
                          Idioma
                        </label>
                        <select
                          name="course_language"
                          defaultValue={params.course_language}
                          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-text-main"
                        >
                          <option value="all">Todos los idiomas</option>
                          <option value="en">Inglés</option>
                          <option value="es">Español</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div id="tour-estado">
                    <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-text-main">
                      <Timer className="size-3.5 text-blue" />
                      Estado
                    </label>
                    <select
                      name="call_status"
                      defaultValue={params.call_status}
                      className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-text-main"
                    >
                      <option value="all">Todos los estados</option>
                      <option value="activa">Activa</option>
                      <option value="por_salir">Por salir</option>
                      <option value="pasada">Pasada</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="funding"
                      id="funding"
                      defaultChecked={params.funding === "true"}
                      className="size-4 rounded border-border text-blue focus:ring-blue"
                    />
                    <label htmlFor="funding" className="text-sm text-text-main">
                      Solo financiados
                    </label>
                  </div>

                  <Button id="tour-submit" type="submit" className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    Aplicar filtros
                  </Button>
                </form>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {opportunities && opportunities.length > 0 ? (
              <div id="tour-results" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {opportunities.map((opp) => (
                  <Link key={opp.id} href={`/opportunities/${opp.id}`}>
                    <div className="bento-shadow card-hover group flex h-full flex-col rounded-2xl border border-border bg-card p-5 noise">
                      <div className="relative z-10 flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/5 text-sm font-bold text-primary">
                            {opp.title.charAt(0)}
                          </div>
                          <div className="flex items-center gap-1.5">
                            {opp.funding && (
                              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                <Sparkles className="mr-1 size-3" />
                                Financiado
                              </Badge>
                            )}
                            <SaveButton
                              opportunityId={opp.id}
                              initialSaved={savedIds.has(opp.id)}
                              isLoggedIn={!!user}
                            />
                            <CompareButton opportunityId={opp.id} />
                          </div>
                        </div>

                        <h3 className="mt-3 text-base font-semibold text-text-main group-hover:text-blue transition-colors">
                          {opp.title}
                        </h3>
                        <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
                          <MapPin className="size-3 shrink-0" />
                          {opp.location}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${typeColors[opp.type]}`}>
                            {typeLabels[opp.type] || opp.type}
                          </span>
                          {opp.subtype && (
                            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${typeColors[opp.type]} opacity-80`}>
                              {subtypeLabels[opp.subtype] || opp.subtype}
                            </span>
                          )}
                          {opp.educational_level
                            ?.filter((lv: string) => lv !== 'universidad')
                            .map((lv: string) => (
                              <span key={lv} className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                                {levelLabels[lv] || lv}
                              </span>
                            ))}
                          {opp.educational_field && opp.educational_field !== 'general' && (
                            <span className="inline-flex items-center rounded-full border border-border bg-surface px-2 py-0.5 text-xs font-medium text-text-muted">
                              {fieldLabels[opp.educational_field] || opp.educational_field}
                            </span>
                          )}
                          {opp.tags.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="inline-flex items-center rounded-full border border-border bg-surface px-2 py-0.5 text-xs font-medium text-text-muted">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-3 space-y-1.5">
                          <p className="flex items-center gap-1 text-xs text-text-muted">
                            <Calendar className="size-3" />
                            Deadline: {new Date(opp.deadline).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}
                          </p>
                          {opp.call_frequency && (
                            <p className="flex items-center gap-1 text-xs text-text-muted">
                              <Timer className="size-3" />
                              {opp.call_frequency}
                            </p>
                          )}
                          <div className="flex items-center gap-1.5">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border ${statusColors[getOpportunityStatus(opp.deadline, opp.call_frequency)]}`}>
                              {getStatusLabel(getOpportunityStatus(opp.deadline, opp.call_frequency))}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 mt-3 flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-text-muted transition-colors group-hover:border-blue/20 group-hover:text-blue">
                        Ver detalles
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-surface">
                  <Search className="size-6 text-text-muted" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text-main">No se encontraron convocatorias</h3>
                <p className="mt-1 text-sm text-text-muted">
                  Ajusta tus filtros o vuelve pronto para ver nuevas oportunidades.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Link
                  href={buildPageHref(Math.max(1, currentPage - 1))}
                  aria-disabled={currentPage === 1}
                  className={`rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-text-main transition-colors hover:border-blue/30 ${
                    currentPage === 1 ? "pointer-events-none opacity-40" : ""
                  }`}
                >
                  Anterior
                </Link>

                <span className="px-2 text-sm text-text-muted">
                  Página {currentPage} de {totalPages}
                </span>

                <Link
                  href={buildPageHref(Math.min(totalPages, currentPage + 1))}
                  aria-disabled={currentPage === totalPages}
                  className={`rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-text-main transition-colors hover:border-blue/30 ${
                    currentPage === totalPages ? "pointer-events-none opacity-40" : ""
                  }`}
                >
                  Siguiente
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <GuidedTour storageKey="oportunimed_tour_opportunities" steps={tourSteps} />
      <CompareFloatingBar />
    </main>
  );
}