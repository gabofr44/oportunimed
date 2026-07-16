import { HeroSection } from "@/components/sections/HeroSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturedOpportunities } from "@/components/sections/FeaturedOpportunities";
import { getFeaturedOpportunities } from "@/actions/opportunities";
import { getPageSections } from "@/actions/admin";

export default async function Home() {
  const [featuredResult, sectionsResult] = await Promise.all([
    getFeaturedOpportunities(),
    getPageSections("home"),
  ]);

  const sections: Record<string, Record<string, unknown>> = {};
  if (sectionsResult.data) {
    for (const s of sectionsResult.data) {
      if (s.visible) {
        sections[s.section_key] = s.content as Record<string, unknown>;
      }
    }
  }

  const hero = sections.hero as Record<string, string> | undefined;
  const categories = sections.categories as Record<string, unknown> | undefined;
  const featured = sections.featured as { title?: string; subtitle?: string } | undefined;
  const stats = sections.stats as { title?: string; subtitle?: string; items?: Array<{ icon: string; value: string; label: string }> } | undefined;
  const cta = sections.cta as { title?: string; subtitle?: string; button_text?: string; button_link?: string } | undefined;

  return (
    <>
      <HeroSection content={hero} />
      <CategoriesSection content={categories} />
      <FeaturedOpportunities
        opportunities={featuredResult.data || []}
        title={featured?.title}
        subtitle={featured?.subtitle}
      />

      {stats && stats.items && (
        <section className="bg-surface py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-text-main sm:text-4xl">{stats.title}</h2>
              <p className="mt-3 text-lg text-text-muted">{stats.subtitle}</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.items.map((item) => (
                <div key={item.label} className="rounded-2xl border border-border bg-white p-6 text-center">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="mt-3 text-3xl font-bold text-orange">{item.value}</div>
                  <div className="mt-1 text-sm text-text-muted">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {cta && (
        <section className="bg-gradient-to-br from-primary via-slate-800 to-primary py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{cta.title}</h2>
            <p className="mt-4 text-lg text-slate-300">{cta.subtitle}</p>
            <div className="mt-8">
              <a
                href={cta.button_link || "/opportunities"}
                className="inline-flex h-12 items-center rounded-lg bg-orange px-8 text-base font-semibold text-white transition-colors hover:bg-orange-hover"
              >
                {cta.button_text || "Get Started"}
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
