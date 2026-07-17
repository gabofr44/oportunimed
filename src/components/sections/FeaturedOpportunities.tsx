"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Opportunity } from "@/types";
import { ArrowUpRight, Calendar, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

const typeConfig: Record<string, { label: string; className: string }> = {
  scholarship: { label: "Beca", className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800" },
  research: { label: "Investigación", className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800" },
  internship: { label: "Internado", className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800" },
  course: { label: "Curso", className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800" },
};

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const tc = typeConfig[opportunity.type] || typeConfig.course;

  return (
    <Link href={`/opportunities/${opportunity.id}`}>
      <div className="bento-shadow card-hover group flex h-full flex-col rounded-2xl border border-border bg-card p-5 noise">
        <div className="relative z-10 flex flex-1 flex-col">
          <div className="flex items-start justify-between">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/5 text-sm font-bold text-primary">
              {opportunity.title.charAt(0)}
            </div>
            {opportunity.funding && (
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Sparkles className="mr-1 size-3" />
                Financiado
              </Badge>
            )}
          </div>

          <h3 className="mt-3 text-base font-semibold text-text-main group-hover:text-blue transition-colors">
            {opportunity.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
            <MapPin className="size-3 shrink-0" />
            {opportunity.location}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tc.className}`}>
              {tc.label}
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
            <p className="flex items-center gap-1 text-xs text-text-muted">
              <Calendar className="size-3" />
              Deadline: {new Date(opportunity.deadline).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-3 flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-text-muted transition-colors group-hover:border-blue/20 group-hover:text-blue">
          Ver detalles
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}

interface FeaturedOpportunitiesProps {
  opportunities: Opportunity[];
  title?: string;
  subtitle?: string;
}

export function FeaturedOpportunities({ opportunities, title, subtitle }: FeaturedOpportunitiesProps) {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
            {title || "Convocatorias Destacadas"}
          </h2>
          <p className="mt-3 text-base text-text-muted">
            {subtitle || "Programas seleccionados para impulsar tu carrera"}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.length > 0 ? (
            opportunities.slice(0, 6).map((opp, i) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <OpportunityCard opportunity={opp} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-surface2">
                <Sparkles className="size-6 text-text-muted" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-text-main">No hay convocatorias disponibles</h3>
              <p className="mt-1 text-sm text-text-muted">
                Vuelve pronto para nuevas oportunidades.
              </p>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/opportunities"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-medium text-text-main transition-all hover:border-blue/30 hover:shadow-sm"
          >
            Ver todas las convocatorias
            <ArrowUpRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}