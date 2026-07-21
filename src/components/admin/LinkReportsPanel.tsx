"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { Flag, ExternalLink, Check, RotateCcw } from "lucide-react";
import { getLinkReports, resolveLinkReport } from "@/actions/link-reports";

interface Report {
  id: string;
  note: string | null;
  resolved: boolean;
  created_at: string;
  opportunity_id: string;
  opportunities: { id: string; title: string; link: string | null } | null;
}

export function LinkReportsPanel() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = () => {
    getLinkReports().then((res) => {
      setReports((res.data || []) as unknown as Report[]);
      setError(res.error);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const toggleResolved = (reportId: string, current: boolean) => {
    startTransition(async () => {
      await resolveLinkReport(reportId, !current);
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, resolved: !current } : r))
      );
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-4 border-blue border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950">
        <p className="text-red-700 dark:text-red-300">{error}</p>
      </div>
    );
  }

  const pending = reports.filter((r) => !r.resolved);
  const resolved = reports.filter((r) => r.resolved);

  if (reports.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <Flag className="mx-auto size-8 text-text-muted" />
        <p className="mt-3 text-text-muted">No hay links reportados. Buenas noticias.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
          Pendientes ({pending.length})
        </h3>
        {pending.length === 0 ? (
          <p className="text-sm text-text-muted">No hay reportes pendientes.</p>
        ) : (
          <div className="space-y-2">
            {pending.map((r) => (
              <ReportRow key={r.id} report={r} isPending={isPending} onToggle={toggleResolved} />
            ))}
          </div>
        )}
      </div>

      {resolved.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted">
            Resueltos ({resolved.length})
          </h3>
          <div className="space-y-2">
            {resolved.map((r) => (
              <ReportRow key={r.id} report={r} isPending={isPending} onToggle={toggleResolved} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ReportRow({
  report,
  isPending,
  onToggle,
}: {
  report: Report;
  isPending: boolean;
  onToggle: (id: string, current: boolean) => void;
}) {
  const opp = report.opportunities;

  return (
    <div
      className={`flex flex-col gap-2 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
        report.resolved ? "border-border bg-surface" : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
      }`}
    >
      <div className="min-w-0">
        {opp ? (
          <Link
            href={`/opportunities/${opp.id}`}
            target="_blank"
            className="font-medium text-text-main hover:text-blue"
          >
            {opp.title}
          </Link>
        ) : (
          <span className="text-text-muted">Oportunidad eliminada</span>
        )}
        {opp?.link && (
          <a
            href={opp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-1 truncate text-xs text-text-muted hover:text-blue"
          >
            <ExternalLink className="size-3 shrink-0" />
            {opp.link}
          </a>
        )}
        {report.note && <p className="mt-1 text-sm text-text-muted">&ldquo;{report.note}&rdquo;</p>}
        <p className="mt-1 text-xs text-text-muted">
          Reportado el {new Date(report.created_at).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}
        </p>
      </div>

      <button
        type="button"
        disabled={isPending}
        onClick={() => onToggle(report.id, report.resolved)}
        className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-60 ${
          report.resolved
            ? "border-border bg-card text-text-muted hover:border-blue/30"
            : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
        }`}
      >
        {report.resolved ? (
          <>
            <RotateCcw className="size-3.5" />
            Reabrir
          </>
        ) : (
          <>
            <Check className="size-3.5" />
            Marcar resuelto
          </>
        )}
      </button>
    </div>
  );
}
