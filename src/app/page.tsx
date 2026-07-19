import { HeroSection } from "@/components/sections/HeroSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturedOpportunities } from "@/components/sections/FeaturedOpportunities";
import { getFeaturedOpportunities, getOpportunities } from "@/actions/opportunities";
import { getPageSections } from "@/actions/admin";
import { CtaSection } from "@/components/sections/CtaSection";

export default async function Home() {
  const [featuredResult, sectionsResult, allOpps] = await Promise.all([
    getFeaturedOpportunities(),
    getPageSections("home"),
    getOpportunities(),
  ]);

  const opportunities = allOpps.data || [];
  const totalOpps = opportunities.length;
  const countries = new Set(opportunities.map((o: { country_code?: string | null }) => o.country_code).filter(Boolean));
  const types = new Set(opportunities.map((o: { type: string }) => o.type));

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
    totalOpps,
    totalCountries: countries.size,
    totalTypes: types.size,
  };
  const categories = sections.categories as Record<string, unknown> | undefined;
  const featured = sections.featured as { title?: string; subtitle?: string } | undefined;
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
      <CtaSection content={cta} />
    </>
  );
}
