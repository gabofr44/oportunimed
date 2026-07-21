import Link from "next/link";
import { getOpportunitiesByIds } from "@/actions/opportunities";
import { ArrowLeft, ExternalLink, Sparkles, Scale } from "lucide-react";

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
  administracion: "Administración",
  ingenieria: "Ingeniería",
  tecnologia: "Tecnología",
  humanidades: "Humanidades",
  derecho: "Derecho",
  educacion: "Educación",
  artes: "Artes",
};

interface Props {
  searchParams: Promise<{ ids?: string }>;
}

interface CompareRow {
  label: string;
  render: (opp: Record<string, unknown>) => React.ReactNode;
}

const rows: CompareRow[] = [
  { label: "Tipo", render: (o) => typeLabels[o.type as string] || (o.type as string) },
  { label: "Ubicación", render: (o) => (o.location as string) || "—" },
  {
    label: "Financiado",
    render: (o) =>
      o.funding ? (
        <span className="inline-flex items-center gap-1 text-success">
          <Sparkles className="size-3.5" /> Sí
        </span>
      ) : (
        "No"
      ),
  },
  {
    label: "Deadline",
    render: (o) =>
      o.deadline
        ? new Date(o.deadline as string).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
  },
  {
    label: "Nivel Educativo",
    render: (o) => (o.educational_level ? levelLabels[o.educational_level as string] || (o.educational_level as string) : "—"),
  },
  {
    label: "Rama Educativa",
    render: (o) => (o.educational_field ? fieldLabels[o.educational_field as string] || (o.educational_field as string) : "—"),
  },
  {
    label: "Etiquetas",
    render: (o) => ((o.tags as string[])?.length ? (o.tags as string[]).join(", ") : "—"),
  },
];

export default async function CompararPage({ searchParams }: Props) {
  const { ids: idsParam } = await searchParams;
  const ids = (idsParam || "").split(",").filter(Boolean);

  const { data: opportunities } = await getOpportunitiesByIds(ids);

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/opportunities"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-blue transition-colors"
        >
          <ArrowLeft className="size-4" />
          Volver a Convocatorias
        </Link>

        <div className="mb-8 flex items-center gap-2">
          <Scale className="size-6 text-purple-600" />
          <h1 className="text-3xl font-bold tracking-tight text-text-main">Comparar oportunidades</h1>
        </div>

        {!opportunities || opportunities.length < 2 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center">
            <h3 className="text-lg font-semibold text-text-main">
              Selecciona al menos 2 oportunidades para comparar
            </h3>
            <p className="mt-1 text-sm text-text-muted">
              Usa el ícono de balanza en las tarjetas de Convocatorias.
            </p>
            <Link href="/opportunities" className="mt-4 inline-block">
              <span className="inline-block rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.03]">
                Explorar convocatorias
              </span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card noise">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="w-40 p-4 text-left text-xs font-semibold uppercase tracking-wider text-text-muted">
                    &nbsp;
                  </th>
                  {opportunities.map((opp) => {
                    const o = opp as Record<string, unknown>;
                    return (
                      <th key={o.id as string} className="min-w-[220px] p-4 text-left align-top">
                        <Link href={`/opportunities/${o.id}`} className="font-semibold text-text-main hover:text-blue">
                          {o.title as string}
                        </Link>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-b-0">
                    <td className="p-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                      {row.label}
                    </td>
                    {opportunities.map((opp) => {
                      const o = opp as Record<string, unknown>;
                      return (
                        <td key={o.id as string} className="p-4 text-text-main">
                          {row.render(o)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="p-4">&nbsp;</td>
                  {opportunities.map((opp) => {
                    const o = opp as Record<string, unknown>;
                    return (
                      <td key={o.id as string} className="p-4">
                        {o.link ? (
                          <a href={o.link as string} target="_blank" rel="noopener noreferrer">
                            <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-main transition-colors hover:border-blue/30 hover:text-blue">
                              Sitio oficial
                              <ExternalLink className="size-3.5" />
                            </span>
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}