import type { Metadata } from "next";
import { getPageSections } from "@/actions/admin";
import { Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Historias | Oportunimed",
  description: "Lee historias inspiradoras de estudiantes que encontraron su camino a través de oportunidades internacionales.",
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
    <main className="flex-1 bg-background">
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight text-text-main sm:text-5xl">
            {hero?.title || "Historias de Estudiantes"}
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            {hero?.subtitle || "Experiencias reales de quienes dieron el paso"}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(storiesData?.items || []).map((story) => (
            <div
              key={story.name}
              className="bento-shadow card-hover flex flex-col rounded-2xl border border-border bg-card p-6 noise"
            >
              <div className="relative z-10 flex flex-1 flex-col">
                <div className="flex items-center gap-4">
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main">{story.name}</h3>
                    <p className="text-sm text-text-muted">
                      {story.country} → {story.destination}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="inline-flex items-center rounded-full bg-blue/8 px-3 py-1 text-xs font-medium text-blue">
                    {story.program}
                  </span>
                </div>

                <blockquote className="mt-4 flex-1 border-l-2 border-blue/20 pl-4 text-sm italic text-text-muted">
                  <Quote className="mb-1 size-4 text-blue/20" />
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                <p className="mt-4 text-xs text-text-muted">Generación {story.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
