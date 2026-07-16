import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturedOpportunities } from "@/components/sections/FeaturedOpportunities";
import { getFeaturedOpportunities } from "@/actions/opportunities";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const [featuredResult, contentResult] = await Promise.all([
    getFeaturedOpportunities(),
    supabase.from("site_content").select("key, value"),
  ]);

  const contentMap: Record<string, string> = {};
  if (contentResult.data) {
    contentResult.data.forEach((item: { key: string; value: string }) => {
      contentMap[item.key] = item.value;
    });
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection
          headline={contentMap.hero_headline}
          subheadline={contentMap.hero_subheadline}
          cta1={contentMap.hero_cta_1}
          cta2={contentMap.hero_cta_2}
          searchPlaceholder={contentMap.hero_search_placeholder}
        />
        <CategoriesSection />
        <FeaturedOpportunities opportunities={featuredResult.data || []} />
      </main>
      <Footer />
    </>
  );
}
