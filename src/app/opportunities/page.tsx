import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOpportunities } from "@/actions/opportunities";

const typeColors: Record<string, string> = {
  scholarship: "bg-emerald-50 text-emerald-700 border-emerald-200",
  research: "bg-blue-50 text-blue-700 border-blue-200",
  internship: "bg-purple-50 text-purple-700 border-purple-200",
  course: "bg-amber-50 text-amber-700 border-amber-200",
};

interface Props {
  searchParams: Promise<{
    q?: string;
    type?: string;
    funding?: string;
    page?: string;
  }>;
}

export default async function OpportunitiesPage({ searchParams }: Props) {
  const params = await searchParams;

  const { data: opportunities, count } = await getOpportunities({
    search: params.q,
    type: params.type,
    funding: params.funding === "true",
    page: params.page ? parseInt(params.page) : 1,
    limit: 12,
  });

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-main">Opportunities</h1>
            <p className="mt-2 text-text-muted">
              Discover {count} programs available worldwide
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <aside className="w-full shrink-0 space-y-6 lg:w-64">
              <div className="rounded-2xl border border-border bg-white p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
                  Filters
                </h3>

                <form className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-text-main">
                      Search
                    </label>
                    <Input name="q" placeholder="Keywords..." defaultValue={params.q} />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-text-main">
                      Type
                    </label>
                    <select
                      name="type"
                      defaultValue={params.type}
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text-main"
                    >
                      <option value="all">All Types</option>
                      <option value="scholarship">Scholarships</option>
                      <option value="research">Research</option>
                      <option value="internship">Internships</option>
                      <option value="course">Courses</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="funding"
                      id="funding"
                      defaultChecked={params.funding === "true"}
                      className="size-4 rounded border-border text-orange focus:ring-orange"
                    />
                    <label htmlFor="funding" className="text-sm text-text-main">
                      Funded only
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange text-white hover:bg-orange-hover"
                  >
                    Apply Filters
                  </Button>
                </form>
              </div>
            </aside>

            <div className="flex-1">
              {opportunities && opportunities.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {opportunities.map((opp) => (
                    <div
                      key={opp.id}
                      className="group flex flex-col rounded-2xl border border-border bg-white shadow-sm transition-all hover:border-orange hover:shadow-md"
                    >
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start justify-between">
                          <div className="flex size-9 items-center justify-center rounded-xl bg-surface text-sm font-bold text-primary">
                            {opp.institution.charAt(0)}
                          </div>
                          {opp.funding && (
                            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 text-xs">
                              Funded
                            </Badge>
                          )}
                        </div>

                        <h3 className="mt-3 text-base font-semibold text-text-main group-hover:text-orange transition-colors">
                          {opp.title}
                        </h3>
                        <p className="mt-1 text-sm text-text-muted">
                          {opp.institution} &middot; {opp.location}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          <span
                            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${typeColors[opp.type]}`}
                          >
                            {opp.type.charAt(0).toUpperCase() + opp.type.slice(1)}
                          </span>
                          {opp.tags.slice(0, 2).map((tag: string) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full border border-border bg-surface px-2 py-0.5 text-xs font-medium text-text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-3">
                          <p className="text-xs text-text-muted">
                            Deadline:{" "}
                            {new Date(opp.deadline).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-border px-5 py-2.5">
                        <Button
                          variant="ghost"
                          className="w-full justify-center text-sm text-orange hover:bg-orange/5 hover:text-orange-hover"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white py-20 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-surface">
                    <svg className="size-7 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-text-main">No opportunities found</h3>
                  <p className="mt-1 text-sm text-text-muted">
                    Try adjusting your filters or check back later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
