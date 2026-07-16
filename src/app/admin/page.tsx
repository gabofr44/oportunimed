"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { AdminGate } from "@/components/admin/AdminGate";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { OpportunityManager } from "@/components/admin/OpportunityManager";
import { SectionEditor } from "@/components/admin/SectionEditor";
import {
  getSiteContent,
  getAllOpportunities,
  getPageSections,
} from "@/actions/admin";
import type { Opportunity } from "@/types";

type Tab = "page" | "opportunities" | "settings";

interface AdminData {
  content: { key: string; value: string; section: string }[];
  opportunities: Opportunity[];
  sections: Array<{
    id: string;
    page: string;
    section_key: string;
    title: string;
    content: Record<string, unknown>;
    sort_order: number;
    visible: boolean;
  }>;
}

function getUnlockedSnapshot() {
  if (typeof window === "undefined") return "false";
  return sessionStorage.getItem("admin_unlocked") || "false";
}

function subscribeToUnlock(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("page");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(false);

  const unlockedStr = useSyncExternalStore(
    subscribeToUnlock,
    getUnlockedSnapshot,
    () => "false"
  );
  const unlocked = unlockedStr === "true";

  const fetchData = useCallback(async () => {
    if (data) return;
    setLoading(true);
    const [contentRes, oppsRes, sectionsRes] = await Promise.all([
      getSiteContent(),
      getAllOpportunities(),
      getPageSections("home"),
    ]);
    setData({
      content: contentRes.data || [],
      opportunities: (oppsRes.data || []) as Opportunity[],
      sections: (sectionsRes.data || []) as AdminData["sections"],
    });
    setLoading(false);
  }, [data]);

  if (!unlocked) {
    const handleUnlock = () => {
      sessionStorage.setItem("admin_unlocked", "true");
      window.dispatchEvent(new Event("storage"));
    };
    return <AdminGate onUnlock={handleUnlock} />;
  }

  return (
    <AdminPanel
      tab={tab}
      setTab={setTab}
      data={data}
      loading={loading}
      fetchData={fetchData}
    />
  );
}

function AdminPanel({
  tab,
  setTab,
  data,
  loading,
  fetchData,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  data: AdminData | null;
  loading: boolean;
  fetchData: () => Promise<void>;
}) {
  if (!data && !loading) {
    void fetchData();
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
          <Link href="/" className="text-sm text-text-muted hover:text-orange">
            View Site →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex gap-1 rounded-xl border border-border bg-white p-1">
          <button
            onClick={() => setTab("page")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === "page"
                ? "bg-orange text-white"
                : "text-text-muted hover:bg-surface"
            }`}
          >
            📄 Page Editor
          </button>
          <button
            onClick={() => setTab("opportunities")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === "opportunities"
                ? "bg-orange text-white"
                : "text-text-muted hover:bg-surface"
            }`}
          >
            🎯 Opportunities
          </button>
          <button
            onClick={() => setTab("settings")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === "settings"
                ? "bg-orange text-white"
                : "text-text-muted hover:bg-surface"
            }`}
          >
            ⚙️ Settings
          </button>
        </div>

        {loading || !data ? (
          <div className="flex items-center justify-center py-20">
            <div className="size-8 animate-spin rounded-full border-4 border-orange border-t-transparent" />
          </div>
        ) : (
          <>
            {tab === "page" && <SectionEditor sections={data.sections} />}
            {tab === "opportunities" && (
              <OpportunityManager opportunities={data.opportunities} />
            )}
            {tab === "settings" && <ContentEditor content={data.content} />}
          </>
        )}
      </div>
    </div>
  );
}
