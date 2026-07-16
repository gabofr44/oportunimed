import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Oportunimed",
  description:
    "Tips, guides, and insights for your international academic journey. Learn how to write winning applications and secure funding.",
};

const posts = [
  {
    slug: "how-to-write-winning-sop",
    title: "How to Write a Winning Statement of Purpose",
    excerpt:
      "Your SOP is your chance to stand out. Learn the structure, tone, and key elements that make admissions committees take notice.",
    category: "Application Tips",
    date: "2026-07-10",
    readTime: "8 min read",
  },
  {
    slug: "top-scholarships-2026",
    title: "Top 10 Scholarships for International Students in 2026",
    excerpt:
      "From Fulbright to Erasmus Mundus, discover the most generous scholarship programs open for applications this year.",
    category: "Scholarships",
    date: "2026-07-05",
    readTime: "12 min read",
  },
  {
    slug: "research-abroad-guide",
    title: "The Complete Guide to Research Abroad",
    excerpt:
      "Everything you need to know about finding research positions, contacting professors, and securing funding overseas.",
    category: "Research",
    date: "2026-06-28",
    readTime: "15 min read",
  },
  {
    slug: "cost-of-living-comparison",
    title: "Cost of Living: Comparing Study Destinations",
    excerpt:
      "A data-driven comparison of living costs across top study destinations to help you budget your international experience.",
    category: "Planning",
    date: "2026-06-20",
    readTime: "10 min read",
  },
  {
    slug: "visa-application-tips",
    title: "Visa Application Tips: Avoid Common Mistakes",
    excerpt:
      "Navigate the visa application process with confidence. Learn from common mistakes and how to prepare a strong application.",
    category: "Visa & Legal",
    date: "2026-06-15",
    readTime: "7 min read",
  },
  {
    slug: "networking-academic-conferences",
    title: "Networking at Academic Conferences: A Student Guide",
    excerpt:
      "How to make the most of academic conferences, build your network, and open doors for future collaborations.",
    category: "Career Development",
    date: "2026-06-10",
    readTime: "6 min read",
  },
];

const categoryColors: Record<string, string> = {
  "Application Tips": "bg-blue-50 text-blue-700",
  Scholarships: "bg-emerald-50 text-emerald-700",
  Research: "bg-purple-50 text-purple-700",
  Planning: "bg-amber-50 text-amber-700",
  "Visa & Legal": "bg-red-50 text-red-700",
  "Career Development": "bg-cyan-50 text-cyan-700",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface">
        <section className="bg-gradient-to-br from-primary via-slate-800 to-primary py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              The Oportunimed <span className="text-orange">Blog</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Tips, guides, and insights for your international academic journey
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {posts.map((post) => (
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
      <Footer />
    </>
  );
}
