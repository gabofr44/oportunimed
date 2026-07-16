import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface SiteLayoutProps {
  children: React.ReactNode;
  headerData?: Record<string, unknown>;
  footerData?: Record<string, unknown>;
}

export function SiteLayout({ children, headerData, footerData }: SiteLayoutProps) {
  const navItems = (headerData?.nav_items as Array<{ label: string; href: string }>) || undefined;

  return (
    <div className="flex min-h-full flex-col">
      <Header
        navItems={navItems}
        siteName={headerData?.site_name as string}
        logoText={headerData?.logo_text as string}
      />
      <main className="flex-1">{children}</main>
      <Footer
        siteName={footerData?.site_name as string}
        logoText={footerData?.logo_text as string}
        tagline={footerData?.tagline as string}
        copyright={footerData?.copyright as string}
        exploreLinks={footerData?.explore_links as Array<{ label: string; href: string }>}
        resourceLinks={footerData?.resource_links as Array<{ label: string; href: string }>}
        legalLinks={footerData?.legal_links as Array<{ label: string; href: string }>}
      />
    </div>
  );
}
