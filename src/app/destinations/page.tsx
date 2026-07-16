import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Destinations | Global Pathways",
  description:
    "Explore study and research destinations worldwide. Find opportunities in Europe, North America, Asia, and more.",
};

const regions = [
  {
    name: "Europe",
    description: "World-class universities and research institutions across 40+ countries.",
    countries: ["Germany", "United Kingdom", "France", "Netherlands", "Sweden", "Switzerland"],
    count: 245,
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "North America",
    description: "Leading research hubs and prestigious scholarship programs.",
    countries: ["United States", "Canada", "Mexico"],
    count: 189,
    color: "from-emerald-500 to-emerald-700",
  },
  {
    name: "Asia Pacific",
    description: "Fast-growing academic powerhouses with generous funding.",
    countries: ["Japan", "South Korea", "Australia", "Singapore", "China"],
    count: 156,
    color: "from-orange-500 to-orange-700",
  },
  {
    name: "Latin America",
    description: "Emerging research destinations with rich cultural experiences.",
    countries: ["Brazil", "Argentina", "Chile", "Colombia", "Mexico"],
    count: 98,
    color: "from-purple-500 to-purple-700",
  },
  {
    name: "Middle East & Africa",
    description: "Growing academic networks and unique research opportunities.",
    countries: ["UAE", "South Africa", "Israel", "Saudi Arabia"],
    count: 67,
    color: "from-amber-500 to-amber-700",
  },
];

const topDestinations = [
  { name: "Germany", programs: 89, image: "🇩🇪" },
  { name: "United States", programs: 134, image: "🇺🇸" },
  { name: "United Kingdom", programs: 76, image: "🇬🇧" },
  { name: "Canada", programs: 67, image: "🇨🇦" },
  { name: "Japan", programs: 45, image: "🇯🇵" },
  { name: "Australia", programs: 52, image: "🇦🇺" },
  { name: "Netherlands", programs: 38, image: "🇳🇱" },
  { name: "France", programs: 41, image: "🇫🇷" },
];

export default function DestinationsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface">
        <section className="bg-gradient-to-br from-primary via-slate-800 to-primary py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Study <span className="text-orange">Destinations</span>
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Explore opportunities in over 50 countries worldwide
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-text-main">Top Destinations</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {topDestinations.map((dest) => (
              <Link
                key={dest.name}
                href={`/opportunities?q=${dest.name}`}
                className="group rounded-2xl border border-border bg-white p-4 text-center transition-all hover:border-orange hover:shadow-md"
              >
                <span className="text-4xl">{dest.image}</span>
                <p className="mt-2 text-sm font-semibold text-text-main group-hover:text-orange">
                  {dest.name}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  {dest.programs} programs
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-text-main">By Region</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((region) => (
              <div
                key={region.name}
                className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className={`bg-gradient-to-r ${region.color} p-6 text-white`}>
                  <h3 className="text-xl font-bold">{region.name}</h3>
                  <p className="mt-1 text-sm opacity-90">{region.count} opportunities</p>
                </div>
                <div className="p-6">
                  <p className="text-sm text-text-muted">{region.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {region.countries.map((country) => (
                      <span
                        key={country}
                        className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-text-muted"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/opportunities?q=${region.name}`}
                    className="mt-4 inline-block text-sm font-medium text-orange hover:text-orange-hover"
                  >
                    Explore {region.name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
