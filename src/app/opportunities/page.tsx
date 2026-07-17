import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOpportunities } from "@/actions/opportunities";
import { Search, MapPin, Calendar, Sparkles, ArrowUpRight, GraduationCap, BookOpen } from "lucide-react";
import Link from "next/link";

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
    funding?: string;
    level?: string;
    field?: string;
  }>;
}

export default async function OpportunitiesPage({ searchParams }: Props) {
  const params = await searchParams;

  const { data: opportunities, count } = await getOpportunities({
    search: params.q,
    type: params.type,
    funding: params.funding === "true",
    level: params.level,
    field: params.field,
  });

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-text-main">Convocatorias</h1>
          <p className="mt-2 text-text-muted">
            Descubre {count} programas disponibles en todo el mundo
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full shrink-0 space-y-6 lg:w-72">
            <div className="bento-shadow rounded-2xl border border-border bg-card p-5 noise">
              <div className="relative z-10">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Filtros
                </h3>

                <form className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-text-main">
                      Buscar
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
                      <Input name="q" placeholder="Palabras clave..." defaultValue={params.q} className="pl-9" />
                    </div>
                  </div>

                  <div>
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
                      <option value="internship">Internados</option>
                      <option value="course">Cursos</option>
                    </select>
                  </div>

                  <div>
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

                  <Button type="submit" className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    Aplicar filtros
                  </Button>
                </form>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {opportunities && opportunities.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {opportunities.map((opp) => (
                  <Link key={opp.id} href={`/opportunities/${opp.id}`}>
                    <div className="bento-shadow card-hover group flex h-full flex-col rounded-2xl border border-border bg-card p-5 noise">
                      <div className="relative z-10 flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/5 text-sm font-bold text-primary">
                            {opp.institution.charAt(0)}
                          </div>
                          {opp.funding && (
                            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
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
                          {opp.institution} &middot; {opp.location}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${typeColors[opp.type]}`}>
                            {typeLabels[opp.type] || opp.type}
                          </span>
                          {opp.educational_level && opp.educational_level !== 'universidad' && (
                            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                              {levelLabels[opp.educational_level] || opp.educational_level}
                            </span>
                          )}
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

                        <div className="mt-auto pt-3">
                          <p className="flex items-center gap-1 text-xs text-text-muted">
                            <Calendar className="size-3" />
                            Deadline: {new Date(opp.deadline).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}
                          </p>
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
          </div>
        </div>
      </div>
    </main>
  );
}
