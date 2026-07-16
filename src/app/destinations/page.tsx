import type { Metadata } from "next";
import Link from "next/link";
import { getPageSections } from "@/actions/admin";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Destinos | Oportunimed",
  description: "Explora destinos de estudio e investigación en todo el mundo.",
};

export default async function DestinationsPage() {
  const sectionsResult = await getPageSections("destinations");

  const sections: Record<string, Record<string, unknown>> = {};
  if (sectionsResult.data) {
    for (const s of sectionsResult.data) {
      if (s.visible) {
        sections[s.section_key] = s.content as Record<string, unknown>;
      }
    }
  }

  const hero = sections.hero as { title?: string; subtitle?: string } | undefined;
  const topData = sections.top as { title?: string; items?: Array<{ name: string; flag: string; programs: number }> } | undefined;
  const regionsData = sections.regions as { title?: string; items?: Array<{ name: string; description: string; countries: string[]; count: number; color: string }> } | undefined;

  return (
    <main className="flex-1 bg-background">
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight text-text-main sm:text-5xl">
            {hero?.title || "Destinos"}
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            {hero?.subtitle || "Explora oportunidades alrededor del mundo"}
          </p>
        </div>
      </section>

      {topData && (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-text-main">{topData.title}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {(topData.items || []).map((dest) => (
              <Link
                key={dest.name}
                href={`/opportunities?q=${dest.name}`}
                className="bento-shadow card-hover group rounded-2xl border border-border bg-card p-4 text-center noise"
              >
                <span className="relative z-10 text-4xl">{dest.flag}</span>
                <p className="relative z-10 mt-2 text-sm font-semibold text-text-main group-hover:text-blue">
                  {dest.name}
                </p>
                <p className="relative z-10 mt-1 text-xs text-text-muted">
                  {dest.programs} programas
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {regionsData && (
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-text-main">{regionsData.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(regionsData.items || []).map((region) => (
              <div
                key={region.name}
                className="bento-shadow card-hover overflow-hidden rounded-2xl border border-border bg-card noise"
              >
                <div className="bg-gradient-to-r from-primary/80 to-primary p-6 text-white">
                  <h3 className="text-xl font-bold">{region.name}</h3>
                  <p className="mt-1 text-sm opacity-90">{region.count} oportunidades</p>
                </div>
                <div className="relative z-10 p-6">
                  <p className="text-sm text-text-muted">{region.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(region.countries || []).map((country) => (
                      <span key={country} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-text-muted">
                        {country}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/opportunities?q=${region.name}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue hover:underline"
                  >
                    Explorar {region.name}
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
