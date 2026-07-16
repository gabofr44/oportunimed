"use client";

import { useState, useCallback, useSyncExternalStore, useEffect } from "react";
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

interface Section {
  id: string;
  page: string;
  section_key: string;
  title: string;
  content: Record<string, unknown>;
  sort_order: number;
  visible: boolean;
}

interface AdminData {
  content: { key: string; value: string; section: string }[];
  opportunities: Opportunity[];
  sectionsByPage: Record<string, Section[]>;
}

const PAGES = [
  { key: "home", label: "Homepage", icon: "🏠" },
  { key: "header", label: "Header / Nav", icon: "📌" },
  { key: "footer", label: "Footer", icon: "📎" },
  { key: "how-to-apply", label: "How to Apply", icon: "📝" },
  { key: "blog", label: "Blog", icon: "📰" },
  { key: "stories", label: "Student Stories", icon: "💬" },
  { key: "destinations", label: "Destinations", icon: "🌍" },
];

function getUnlockedSnapshot() {
  if (typeof window === "undefined") return "false";
  return sessionStorage.getItem("admin_unlocked") || "false";
}

function subscribeToUnlock(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export default function AdminPage() {
  const unlockedStr = useSyncExternalStore(
    subscribeToUnlock,
    getUnlockedSnapshot,
    () => "false"
  );
  const unlocked = unlockedStr === "true";

  if (!unlocked) {
    const handleUnlock = () => {
      sessionStorage.setItem("admin_unlocked", "true");
      window.dispatchEvent(new Event("storage"));
    };
    return <AdminGate onUnlock={handleUnlock} />;
  }

  return <AdminPanel />;
}

function AdminPanel() {
  const [tab, setTab] = useState<Tab>("page");
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPage, setSelectedPage] = useState("home");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [contentRes, oppsRes] = await Promise.all([
        getSiteContent(),
        getAllOpportunities(),
      ]);

      const sectionsByPage: Record<string, Section[]> = {};
      await Promise.all(
        PAGES.map(async (p) => {
          const res = await getPageSections(p.key);
          sectionsByPage[p.key] = (res.data || []) as Section[];
        })
      );

      setData({
        content: contentRes.data || [],
        opportunities: (oppsRes.data || []) as Opportunity[],
        sectionsByPage,
      });
    } catch (e) {
      setError((e as Error).message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchData();
  }, [fetchData]);

  const handleRefresh = useCallback(() => {
    setData(null);
    void fetchData();
  }, [fetchData]);

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
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="text-sm text-text-muted hover:text-orange"
            >
              Refresh
            </button>
            <Link href="/" className="text-sm text-text-muted hover:text-orange">
              View Site →
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="size-8 animate-spin rounded-full border-4 border-orange border-t-transparent" />
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-4 rounded-lg bg-orange px-4 py-2 text-sm text-white hover:bg-orange-hover"
            >
              Try Again
            </button>
          </div>
        ) : !data ? (
          <div className="rounded-2xl border border-border bg-white p-8 text-center">
            <p className="text-text-muted">No data loaded.</p>
            <button
              onClick={handleRefresh}
              className="mt-4 rounded-lg bg-orange px-4 py-2 text-sm text-white hover:bg-orange-hover"
            >
              Load Data
            </button>
          </div>
        ) : (
          <>
            {tab === "page" && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-white p-3">
                  {PAGES.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setSelectedPage(p.key)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        selectedPage === p.key
                          ? "bg-orange text-white"
                          : "text-text-muted hover:bg-surface"
                      }`}
                    >
                      <span>{p.icon}</span>
                      <span>{p.label}</span>
                      <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                        {(data.sectionsByPage[p.key] || []).length}
                      </span>
                    </button>
                  ))}
                </div>

                <SectionEditor
                  sections={data.sectionsByPage[selectedPage] || []}
                  page={selectedPage}
                />
              </div>
            )}
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
