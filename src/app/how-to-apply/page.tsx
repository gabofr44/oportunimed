import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPageSections } from "@/actions/admin";

export const metadata: Metadata = {
  title: "How to Apply | Oportunimed",
  description:
    "Step-by-step guide to applying for international scholarships, research programs, and internships.",
};

export default async function HowToApplyPage() {
  const sectionsResult = await getPageSections("how-to-apply");

  const sections: Record<string, Record<string, unknown>> = {};
  if (sectionsResult.data) {
    for (const s of sectionsResult.data) {
      if (s.visible) {
        sections[s.section_key] = s.content as Record<string, unknown>;
      }
    }
  }

  const hero = sections.hero as { title?: string; subtitle?: string } | undefined;
  const stepsData = sections.steps as { items?: Array<{ number: string; icon: string; title: string; description: string; details: string[] }> } | undefined;
  const tipsData = sections.tips as { title?: string; items?: Array<{ title: string; description: string }> } | undefined;
  const ctaData = sections.cta as { title?: string; subtitle?: string; button_1_text?: string; button_1_link?: string; button_2_text?: string; button_2_link?: string } | undefined;

  return (
    <main className="flex-1 bg-surface">
      <section className="bg-gradient-to-br from-primary via-slate-800 to-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            How to <span className="text-orange">{hero?.title || "Apply"}</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            {hero?.subtitle || ""}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {(stepsData?.items || []).map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-border bg-white p-8 shadow-sm"
            >
              <div className="flex items-start gap-6">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-orange text-2xl text-white">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-bold text-orange">Step {step.number}</span>
                  <h2 className="mt-1 text-xl font-bold text-text-main">{step.title}</h2>
                  <p className="mt-2 text-text-muted">{step.description}</p>
                  <ul className="mt-4 space-y-2">
                    {(step.details || []).map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-text-muted">
                        <svg className="mt-0.5 size-4 shrink-0 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tipsData && (
          <div className="mt-16 rounded-2xl border border-orange/20 bg-orange/5 p-8">
            <h2 className="text-2xl font-bold text-text-main">{tipsData.title}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {(tipsData.items || []).map((tip) => (
                <div key={tip.title} className="rounded-xl bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-text-main">{tip.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {ctaData && (
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-text-main">{ctaData.title}</h2>
            <p className="mt-2 text-text-muted">{ctaData.subtitle}</p>
            <div className="mt-6 flex justify-center gap-4">
              <Link href={ctaData.button_1_link || "/opportunities"}>
                <Button className="bg-orange text-white hover:bg-orange-hover">
                  {ctaData.button_1_text || "Explore"}
                </Button>
              </Link>
              <Link href={ctaData.button_2_link || "/blog"}>
                <Button variant="outline">{ctaData.button_2_text || "Read More"}</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
