import type { Metadata } from "next";
import { getPageSections } from "@/actions/admin";
import { CheckCircle, ArrowRight, BookOpen, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Cómo Postular | Oportunimed",
  description: "Guía paso a paso para aplicar a becas, programas de investigación e internados internacionales.",
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
    <main className="flex-1 bg-background">
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-text-muted">
            <BookOpen className="size-4 text-blue" />
            Guía completa
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-text-main sm:text-5xl">
            {hero?.title || "Cómo Postular"}
          </h1>
          <p className="mt-4 text-lg text-text-muted">
            {hero?.subtitle || "Sigue estos pasos para asegurar tu lugar en el programa ideal."}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {(stepsData?.items || []).map((step) => (
            <div key={step.number} className="bento-shadow rounded-2xl border border-border bg-card p-6 noise sm:p-8">
              <div className="relative z-10 flex items-start gap-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue/8 text-blue text-lg font-bold">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-text-main">{step.title}</h2>
                  <p className="mt-2 text-text-muted">{step.description}</p>
                  <ul className="mt-4 space-y-2">
                    {(step.details || []).map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-text-muted">
                        <CheckCircle className="mt-0.5 size-4 shrink-0 text-success" />
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
          <div className="mt-16 rounded-2xl border border-blue/10 bg-blue/3 p-8 noise">
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <Lightbulb className="size-5 text-blue" />
                <h2 className="text-2xl font-bold text-text-main">{tipsData.title}</h2>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {(tipsData.items || []).map((tip) => (
                  <div key={tip.title} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="font-semibold text-text-main">{tip.title}</h3>
                    <p className="mt-1 text-sm text-text-muted">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {ctaData && (
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-text-main">{ctaData.title}</h2>
            <p className="mt-2 text-text-muted">{ctaData.subtitle}</p>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href={ctaData.button_1_link || "/opportunities"}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-lg"
              >
                {ctaData.button_1_text || "Explorar"}
                <ArrowRight className="size-4" />
              </a>
              <a
                href={ctaData.button_2_link || "/blog"}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-medium text-text-main transition-all hover:border-blue/30 hover:shadow-sm"
              >
                {ctaData.button_2_text || "Leer más"}
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
