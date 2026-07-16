import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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

  const featured = sections.featured as
    | { title?: string; subtitle?: string }
    | undefined;

  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection content={sections.hero as Record<string, string> | undefined} />
        <CategoriesSection content={sections.categories as Record<string, unknown> | undefined} />
        <FeaturedOpportunities
          opportunities={featuredResult.data || []}
          title={featured?.title}
          subtitle={featured?.subtitle}
        />
      </main>
      <Footer />
    </>
  );
}
