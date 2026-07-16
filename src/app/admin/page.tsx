"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { AdminGate } from "@/components/admin/AdminGate";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { OpportunityManager } from "@/components/admin/OpportunityManager";
import { getSiteContent, getAllOpportunities } from "@/actions/admin";
import type { Opportunity } from "@/types";

type Tab = "content" | "opportunities";

interface AdminData {
  content: { key: string; value: string; section: string }[];
  opportunities: Opportunity[];
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("admin_unlocked") === "true";
    }
    return false;
  });
  const [tab, setTab] = useState<Tab>("opportunities");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUnlock = useCallback(() => {
    setUnlocked(true);
    setLoading(true);
    Promise.all([getSiteContent(), getAllOpportunities()]).then(
      ([contentRes, oppsRes]) => {
        setData({
          content: contentRes.data || [],
          opportunities: (oppsRes.data || []) as Opportunity[],
        });
        setLoading(false);
      }
    );
  }, []);

  if (!unlocked) {
    return <AdminGate onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-orange text-white font-bold text-sm">
                GP
              </div>
              <span className="text-lg font-bold text-primary">Oportunimed</span>
            </Link>
            <span className="rounded-full bg-orange/10 px-3 py-0.5 text-xs font-medium text-orange">
              Admin
            </span>
          </div>
          <Link
            href="/"
            className="text-sm text-text-muted hover:text-orange"
          >
            View Site →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex gap-1 rounded-xl border border-border bg-white p-1">
          <button
            onClick={() => setTab("opportunities")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === "opportunities"
                ? "bg-orange text-white"
                : "text-text-muted hover:bg-surface"
            }`}
          >
            Opportunities
          </button>
          <button
            onClick={() => setTab("content")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === "content"
                ? "bg-orange text-white"
                : "text-text-muted hover:bg-surface"
            }`}
          >
            Site Content
          </button>
        </div>

        {loading || !data ? (
          <div className="flex items-center justify-center py-20">
            <div className="size-8 animate-spin rounded-full border-4 border-orange border-t-transparent" />
          </div>
        ) : (
          <>
            {tab === "opportunities" && (
              <OpportunityManager opportunities={data.opportunities} />
            )}
            {tab === "content" && <ContentEditor content={data.content} />}
          </>
        )}
      </div>
    </div>
  );
}
