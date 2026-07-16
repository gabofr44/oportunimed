import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturedOpportunities } from "@/components/sections/FeaturedOpportunities";
import { getFeaturedOpportunities } from "@/actions/opportunities";

export default async function Home() {
  const { data: featuredOpportunities } = await getFeaturedOpportunities();

  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <FeaturedOpportunities opportunities={featuredOpportunities || []} />
      </main>
      <Footer />
    </>
  );
}
