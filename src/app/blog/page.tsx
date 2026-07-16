import type { Metadata } from "next";
import Link from "next/link";
import { getPageSections } from "@/actions/admin";

export const metadata: Metadata = {
  title: "Blog | Oportunimed",
  description:
    "Tips, guides, and insights for your international academic journey. Learn how to write winning applications and secure funding.",
};

const categoryColors: Record<string, string> = {
  "Application Tips": "bg-blue-50 text-blue-700",
  Scholarships: "bg-emerald-50 text-emerald-700",
  Research: "bg-purple-50 text-purple-700",
  Planning: "bg-amber-50 text-amber-700",
  "Visa & Legal": "bg-red-50 text-red-700",
  "Career Development": "bg-cyan-50 text-cyan-700",
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
    <main className="flex-1 bg-surface">
      <section className="bg-gradient-to-br from-primary via-slate-800 to-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            The Oportunimed <span className="text-orange">{hero?.title?.replace("The Oportunimed ", "") || "Blog"}</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            {hero?.subtitle || ""}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {(postsData?.items || []).map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[post.category] || "bg-slate-50 text-slate-700"}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-text-muted">{post.readTime}</span>
                </div>

                <h2 className="mt-4 text-lg font-semibold text-text-main group-hover:text-orange transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="mt-2 line-clamp-3 text-sm text-text-muted">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <time className="text-xs text-text-muted">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-orange hover:text-orange-hover"
                  >
                    Read more →
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
