import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Student Stories | Global Pathways",
  description:
    "Read inspiring stories from students who found their path through international research and scholarship opportunities.",
};

const stories = [
  {
    name: "Maria Rodriguez",
    country: "Spain",
    destination: "Germany",
    program: "DAAD Research Grant",
    quote:
      "Global Pathways helped me discover the DAAD program. I never knew such opportunities existed for computational neuroscience research in Berlin.",
    year: "2025",
    avatar: "👩‍🔬",
  },
  {
    name: "James Chen",
    country: "Canada",
    destination: "Japan",
    program: "MEXT Scholarship",
    quote:
      "The application guide on this platform was invaluable. I went from zero knowledge about Japanese scholarships to a fully funded position in Tokyo.",
    year: "2025",
    avatar: "👨‍💻",
  },
  {
    name: "Aisha Patel",
    country: "India",
    destination: "United States",
    program: "Fulbright Student Program",
    quote:
      "The SOP templates and review tips gave me the confidence to apply. Now I'm pursuing my PhD at MIT with full funding.",
    year: "2024",
    avatar: "👩‍🎓",
  },
  {
    name: "Carlos Mendoza",
    country: "Mexico",
    destination: "Canada",
    program: "MITACS Globalink",
    quote:
      "I found my summer research internship through Global Pathways. The experience led to a full graduate position at the University of Toronto.",
    year: "2025",
    avatar: "👨‍🔬",
  },
  {
    name: "Sophie Laurent",
    country: "France",
    destination: "Netherlands",
    program: "Holland Scholarship",
    quote:
      "Moving to Amsterdam was the best decision. The platform made it easy to compare programs and find the perfect fit for my research interests.",
    year: "2024",
    avatar: "👩‍🏫",
  },
  {
    name: "Kim Ji-hoon",
    country: "South Korea",
    destination: "United Kingdom",
    program: "Chevening Scholarship",
    quote:
      "From Seoul to London, Global Pathways was my compass. The step-by-step application guide was a game changer.",
    year: "2025",
    avatar: "👨‍🎓",
  },
];

export default function StoriesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface">
        <section className="bg-gradient-to-br from-primary via-slate-800 to-primary py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Student <span className="text-orange">Stories</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Real experiences from students who found their global pathway
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
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
      <Footer />
    </>
  );
}
