import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOpportunityById } from "@/actions/opportunities";
import { ApplyButton } from "@/components/opportunities/ApplyButton";

const typeColors: Record<string, string> = {
  scholarship: "bg-emerald-50 text-emerald-700 border-emerald-200",
  research: "bg-blue-50 text-blue-700 border-blue-200",
  internship: "bg-purple-50 text-purple-700 border-purple-200",
  course: "bg-amber-50 text-amber-700 border-amber-200",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OpportunityDetailPage({ params }: Props) {
  const { id } = await params;
  const { data: opportunity, error } = await getOpportunityById(id);

  if (error || !opportunity) {
    notFound();
  }

  return (
    <main className="flex-1 bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/opportunities"
          className="mb-6 inline-flex items-center gap-1 text-sm text-text-muted hover:text-orange"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Opportunities
        </Link>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-surface text-2xl font-bold text-primary">
              {opportunity.institution.charAt(0)}
            </div>
            <div className="flex gap-2">
              {opportunity.funding && (
                <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                  Funded
                </Badge>
              )}
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${typeColors[opportunity.type]}`}
              >
                {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
              </span>
            </div>
          </div>

          <h1 className="mt-6 text-2xl font-bold text-text-main sm:text-3xl">
            {opportunity.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {opportunity.institution}
            </span>
            <span className="flex items-center gap-1">
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {opportunity.location}
            </span>
            <span className="flex items-center gap-1">
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Deadline:{" "}
              {new Date(opportunity.deadline).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {opportunity.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {opportunity.description && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-text-main">Description</h2>
              <p className="mt-3 leading-relaxed text-text-muted">
                {opportunity.description}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ApplyButton opportunityId={opportunity.id} />
            {opportunity.link && (
              <a
                href={opportunity.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  Visit Official Website
                  <svg className="ml-2 size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
