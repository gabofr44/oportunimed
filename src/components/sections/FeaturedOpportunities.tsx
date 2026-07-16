import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Opportunity } from "@/types";

const typeColors: Record<string, string> = {
  scholarship: "bg-emerald-50 text-emerald-700 border-emerald-200",
  research: "bg-blue-50 text-blue-700 border-blue-200",
  internship: "bg-purple-50 text-purple-700 border-purple-200",
  course: "bg-amber-50 text-amber-700 border-amber-200",
};

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-white shadow-sm transition-all hover:border-orange hover:shadow-md">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between">
          <div className="flex size-10 items-center justify-center rounded-xl bg-surface text-lg font-bold text-primary">
            {opportunity.institution.charAt(0)}
          </div>
          {opportunity.funding && (
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
              Funded
            </Badge>
          )}
        </div>

        <h3 className="mt-4 text-lg font-semibold text-text-main group-hover:text-orange transition-colors">
          {opportunity.title}
        </h3>
        <p className="mt-1 text-sm text-text-muted">
          {opportunity.institution} &middot; {opportunity.location}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${typeColors[opportunity.type]}`}
          >
            {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
          </span>
          {opportunity.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <p className="text-xs text-text-muted">
            Deadline:{" "}
            {new Date(opportunity.deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="border-t border-border px-6 py-3">
        <Button
          variant="ghost"
          className="w-full justify-center text-orange hover:bg-orange/5 hover:text-orange-hover"
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-surface">
        <svg className="size-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-text-main">No opportunities found</h3>
      <p className="mt-1 text-sm text-text-muted">
        Try adjusting your filters or check back later for new opportunities.
      </p>
    </div>
  );
}

interface FeaturedOpportunitiesProps {
  opportunities: Opportunity[];
  title?: string;
  subtitle?: string;
}

export function FeaturedOpportunities({ opportunities, title, subtitle }: FeaturedOpportunitiesProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-main sm:text-4xl">
            {title || "Featured Opportunities"}
          </h2>
          <p className="mt-3 text-lg text-text-muted">
            {subtitle || "Hand-picked programs to jumpstart your academic career"}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.length > 0 ? (
            opportunities.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        <div className="mt-10 text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-orange text-orange hover:bg-orange hover:text-white"
          >
            View All Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
}
