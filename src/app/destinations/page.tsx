import type { Metadata } from "next";
import Link from "next/link";
import { getPageSections } from "@/actions/admin";

export const metadata: Metadata = {
  title: "Destinations | Oportunimed",
  description:
    "Explore study and research destinations worldwide. Find opportunities in Europe, North America, Asia, and more.",
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
    <main className="flex-1 bg-surface">
      <section className="bg-gradient-to-br from-primary via-slate-800 to-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Study <span className="text-orange">{hero?.title?.replace("Study ", "") || "Destinations"}</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            {hero?.subtitle || ""}
          </p>
        </div>
      </section>

      {topData && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-text-main">{topData.title}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {(topData.items || []).map((dest) => (
              <Link
                key={dest.name}
                href={`/opportunities?q=${dest.name}`}
                className="group rounded-2xl border border-border bg-white p-4 text-center transition-all hover:border-orange hover:shadow-md"
              >
                <span className="text-4xl">{dest.flag}</span>
                <p className="mt-2 text-sm font-semibold text-text-main group-hover:text-orange">
                  {dest.name}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  {dest.programs} programs
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {regionsData && (
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-text-main">{regionsData.title}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(regionsData.items || []).map((region) => (
              <div
                key={region.name}
                className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className={`bg-gradient-to-r ${region.color} p-6 text-white`}>
                  <h3 className="text-xl font-bold">{region.name}</h3>
                  <p className="mt-1 text-sm opacity-90">{region.count} opportunities</p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-text-muted">{region.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(region.countries || []).map((country) => (
                      <span
                        key={country}
                        className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-text-muted"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/opportunities?q=${region.name}`}
                    className="mt-4 inline-block text-sm font-medium text-orange hover:text-orange-hover"
                  >
                    Explore {region.name} →
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
