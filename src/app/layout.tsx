import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { getPageSections } from "@/actions/admin";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oportunimed | Research & Scholarships Worldwide",
  description:
    "Find prestigious research programs, scholarships, and academic experiences worldwide to enrich your CV.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headerRes, footerRes] = await Promise.all([
    getPageSections("header"),
    getPageSections("footer"),
  ]);

  const headerData = headerRes.data?.[0]?.content as Record<string, unknown> | undefined;
  const footerData = footerRes.data?.[0]?.content as Record<string, unknown> | undefined;

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteLayout headerData={headerData} footerData={footerData}>
          {children}
        </SiteLayout>
      </body>
    </html>
  );
}
