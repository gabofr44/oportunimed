import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCurrentUser } from "@/actions/auth";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export async function SiteLayout({ children }: SiteLayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-full flex-col">
      <Header user={user ? { email: user.email, name: user.profile?.full_name } : null} />
      <main className="flex-1 pt-14">{children}</main>
      <Footer />
    </div>
  );
}
