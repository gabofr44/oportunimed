import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface HeroContent {
  headline?: string;
  subheadline?: string;
  search_placeholder?: string;
  cta_1_text?: string;
  cta_1_link?: string;
  cta_2_text?: string;
  cta_2_link?: string;
}

export function HeroSection({ content }: { content?: HeroContent }) {
  const c = content || {};

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-slate-800 to-primary">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {(c.headline || "").split("Starts Here").length > 1 ? (
              <>
                {(c.headline || "").split("Starts Here")[0]}
                <span className="text-orange">Starts Here</span>
                {(c.headline || "").split("Starts Here")[1] || "."}
              </>
            ) : (
              c.headline || "Your Global Research Journey Starts Here."
            )}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            {c.subheadline || ""}
          </p>

          <div className="mx-auto mt-10 max-w-xl">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Input
                  type="text"
                  placeholder={c.search_placeholder || "Search..."}
                  className="h-12 pl-10 text-base"
                />
              </div>
              <Button className="h-12 bg-orange px-6 text-white hover:bg-orange-hover">
                Search
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={c.cta_1_link || "/opportunities"}>
              <Button
                size="lg"
                className="bg-orange text-white hover:bg-orange-hover"
              >
                {c.cta_1_text || "Explore"}
              </Button>
            </Link>
            <Link href={c.cta_2_link || "/how-to-apply"}>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-500 text-white hover:bg-white/10"
              >
                {c.cta_2_text || "Learn More"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
