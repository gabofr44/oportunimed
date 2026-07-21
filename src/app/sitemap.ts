import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oportunimed.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const { data: opportunities } = await supabase
    .from("opportunities")
    .select("id, updated_at")
    .order("updated_at", { ascending: false });

  const opportunityUrls: MetadataRoute.Sitemap = (opportunities || []).map((opp) => ({
    url: `${SITE_URL}/opportunities/${opp.id}`,
    lastModified: opp.updated_at ? new Date(opp.updated_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily" as const, priority: 1 },
    { url: `${SITE_URL}/opportunities`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/stories`, changeFrequency: "weekly" as const, priority: 0.5 },
    { url: `${SITE_URL}/recursos`, changeFrequency: "weekly" as const, priority: 0.5 },
    { url: `${SITE_URL}/destinations`, changeFrequency: "weekly" as const, priority: 0.5 },
    { url: `${SITE_URL}/how-to-apply`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${SITE_URL}/proximos`, changeFrequency: "daily" as const, priority: 0.6 },
  ].map((entry) => ({ ...entry, lastModified: new Date() }));

  return [...staticUrls, ...opportunityUrls];
}
