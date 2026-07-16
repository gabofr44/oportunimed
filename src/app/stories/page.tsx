import type { Metadata } from "next";
import { getPageSections } from "@/actions/admin";

export const metadata: Metadata = {
  title: "Student Stories | Oportunimed",
  description:
    "Read inspiring stories from students who found their path through international research and scholarship opportunities.",
};

export default async function StoriesPage() {
  const sectionsResult = await getPageSections("stories");

  const sections: Record<string, Record<string, unknown>> = {};
  if (sectionsResult.data) {
    for (const s of sectionsResult.data) {
      if (s.visible) {
        sections[s.section_key] = s.content as Record<string, unknown>;
      }
    }
  }

  const hero = sections.hero as { title?: string; subtitle?: string } | undefined;
  const storiesData = sections.stories as { items?: Array<{ name: string; country: string; destination: string; program: string; quote: string; year: string; avatar: string }> } | undefined;

  return (
    <main className="flex-1 bg-surface">
      <section className="bg-gradient-to-br from-primary via-slate-800 to-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Student <span className="text-orange">{hero?.title?.replace("Student ", "") || "Stories"}</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            {hero?.subtitle || ""}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(storiesData?.items || []).map((story) => (
            <div
              key={story.name}
              className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{story.avatar}</span>
                <div>
                  <h3 className="font-semibold text-text-main">{story.name}</h3>
                  <p className="text-sm text-text-muted">
                    {story.country} → {story.destination}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-xs font-medium text-orange">
                  {story.program}
                </span>
              </div>

              <blockquote className="mt-4 flex-1 border-l-4 border-orange pl-4 text-sm italic text-text-muted">
                &ldquo;{story.quote}&rdquo;
              </blockquote>

              <p className="mt-4 text-xs text-text-muted">Class of {story.year}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
