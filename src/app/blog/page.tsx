import type { Metadata } from "next";
import Link from "next/link";
import { getPageSections } from "@/actions/admin";
import { Clock, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Oportunimed",
  description: "Consejos, guías e información para tu viaje académico internacional.",
};

const categoryColors: Record<string, string> = {
  "Application Tips": "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Scholarships: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Research: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  Planning: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  "Visa & Legal": "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
  "Career Development": "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
};

export default async function BlogPage() {
  const sectionsResult = await getPageSections("blog");

  const sections: Record<string, Record<string, unknown>> = {};
  if (sectionsResult.data) {
    for (const s of sectionsResult.data) {
      if (s.visible) {
        sections[s.section_key] = s.content as Record<string, unknown>;
      }
    }
  }

  const hero = sections.hero as { title?: string; subtitle?: string } | undefined;
  const postsData = sections.posts as { items?: Array<{ slug: string; title: string; excerpt: string; category: string; date: string; readTime: string }> } | undefined;

  return (
    <main className="flex-1 bg-background">
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight text-text-main sm:text-5xl">
            {hero?.title || "Blog"}
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            {hero?.subtitle || "Consejos e información para tu viaje académico"}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {(postsData?.items || []).map((post) => (
            <article
              key={post.slug}
              className="bento-shadow card-hover group overflow-hidden rounded-2xl border border-border bg-card noise"
            >
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[post.category] || "bg-slate-50 text-slate-700"}`}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock className="size-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-semibold text-text-main group-hover:text-blue transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="mt-2 line-clamp-3 text-sm text-text-muted">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <time className="text-xs text-text-muted">
                    {new Date(post.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-sm font-medium text-blue hover:underline"
                  >
                    Leer más
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
