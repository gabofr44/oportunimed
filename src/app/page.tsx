import { HeroSection } from "@/components/sections/HeroSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturedOpportunities } from "@/components/sections/FeaturedOpportunities";
import { getFeaturedOpportunities, getOpportunityStats } from "@/actions/opportunities";
import { getPageSections } from "@/actions/admin";
import { CtaSection } from "@/components/sections/CtaSection";

export default async function Home() {
  const [featuredResult, sectionsResult, stats] = await Promise.all([
    getFeaturedOpportunities(),
    getPageSections("home"),
    getOpportunityStats(),
  ]);

  const sections: Record<string, Record<string, unknown>> = {};
  if (sectionsResult.data) {
    for (const s of sectionsResult.data) {
      if (s.visible) {
        sections[s.section_key] = s.content as Record<string, unknown>;
      }
    }
  }

  const hero = {
    ...(sections.hero as Record<string, string> | undefined),
    totalOpps: stats.total,
    totalCountries: stats.countries,
    totalTypes: stats.types,
  };
  const featured = sections.featured as { title?: string; subtitle?: string } | undefined;
  const cta = sections.cta as { title?: string; subtitle?: string; button_text?: string; button_link?: string } | undefined;

  return (
    <>
      <HeroSection content={hero} />
      <CategoriesSection />
      <FeaturedOpportunities
        opportunities={featuredResult.data || []}
        title={featured?.title}
        subtitle={featured?.subtitle}
      />
      <CtaSection content={cta} />
    </>
  );
}
