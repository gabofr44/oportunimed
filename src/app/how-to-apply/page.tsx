import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Apply | Global Pathways",
  description:
    "Step-by-step guide to applying for international scholarships, research programs, and internships.",
};

const steps = [
  {
    number: "01",
    title: "Research & Discover",
    description:
      "Browse our curated database of opportunities. Use filters to find programs that match your field, level, and interests.",
    details: [
      "Search by country, type, or keyword",
      "Filter by funding availability",
      "Read detailed program descriptions",
      "Save opportunities to your shortlist",
    ],
    icon: "🔍",
  },
  {
    number: "02",
    title: "Prepare Documents",
    description:
      "Most programs require similar documents. Start preparing them early to avoid last-minute stress.",
    details: [
      "Statement of Purpose (SOP)",
      "Letters of Recommendation",
      "CV / Resume",
      "Academic Transcripts",
      "Language Proficiency (IELTS/TOEFL)",
      "Research Proposal (for research programs)",
    ],
    icon: "📄",
  },
  {
    number: "03",
    title: "Write a Strong SOP",
    description:
      "Your Statement of Purpose is your chance to stand out. Make it personal, specific, and compelling.",
    details: [
      "Start with a hook that grabs attention",
      "Explain why this specific program",
      "Highlight relevant experience",
      "Show your future goals",
      "Proofread multiple times",
    ],
    icon: "✍️",
  },
  {
    number: "04",
    title: "Submit Application",
    description:
      "Follow the application instructions carefully. Most programs have online portals.",
    details: [
      "Create an account on the portal",
      "Fill in all required fields",
      "Upload documents in correct format",
      "Double-check everything before submitting",
      "Note the deadline and submit early",
    ],
    icon: "📤",
  },
  {
    number: "05",
    title: "Follow Up",
    description:
      "After submitting, keep track of your applications and follow up if needed.",
    details: [
      "Track application status on your dashboard",
      "Respond to any requests for additional info",
      "Prepare for interviews if required",
      "Accept offers before the deadline",
    ],
    icon: "📋",
  },
];

const tips = [
  {
    title: "Apply to Multiple Programs",
    description:
      "Don't put all your eggs in one basket. Apply to at least 3-5 programs to increase your chances.",
  },
  {
    title: "Start Early",
    description:
      "Begin preparing at least 3-6 months before the deadline. Rushed applications are rarely successful.",
  },
  {
    title: "Get Feedback",
    description:
      "Have mentors, professors, or peers review your SOP and application materials.",
  },
  {
    title: "Be Authentic",
    description:
      "Admissions committees can spot generic applications. Be genuine about your interests and goals.",
  },
];

export default function HowToApplyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface">
        <section className="bg-gradient-to-br from-primary via-slate-800 to-primary py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              How to <span className="text-orange">Apply</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              A step-by-step guide to securing your international opportunity
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-border bg-white p-8 shadow-sm"
              >
                <div className="flex items-start gap-6">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-orange text-2xl text-white">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-orange">
                        Step {step.number}
                      </span>
                    </div>
                    <h2 className="mt-1 text-xl font-bold text-text-main">
                      {step.title}
                    </h2>
                    <p className="mt-2 text-text-muted">{step.description}</p>

                    <ul className="mt-4 space-y-2">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-sm text-text-muted"
                        >
                          <svg
                            className="mt-0.5 size-4 shrink-0 text-orange"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
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

          <div className="mt-16 rounded-2xl border border-orange/20 bg-orange/5 p-8">
            <h2 className="text-2xl font-bold text-text-main">
              Pro Tips for a Successful Application
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {tips.map((tip) => (
                <div key={tip.title} className="rounded-xl bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-text-main">{tip.title}</h3>
                  <p className="mt-1 text-sm text-text-muted">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-text-main">Ready to Start?</h2>
            <p className="mt-2 text-text-muted">
              Browse opportunities and take the first step toward your global journey.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link href="/opportunities">
                <Button className="bg-orange text-white hover:bg-orange-hover">
                  Explore Opportunities
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline">Read More Guides</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
