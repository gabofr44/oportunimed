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
import { Stethoscope, RefreshCw, ExternalLink, FileText, Target, Settings } from "lucide-react";

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
  { key: "home", label: "Inicio", icon: "🏠" },
  { key: "header", label: "Header / Nav", icon: "📌" },
  { key: "footer", label: "Footer", icon: "📎" },
  { key: "how-to-apply", label: "Cómo Postular", icon: "📝" },
  { key: "blog", label: "Blog", icon: "📰" },
  { key: "stories", label: "Historias", icon: "💬" },
  { key: "destinations", label: "Destinos", icon: "🌍" },
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
    <div className="min-h-screen bg-background">
      <div className="glass border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Stethoscope className="size-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-text-main">
                Oportuni<span className="text-blue">Med</span>
              </span>
            </Link>
            <span className="rounded-full bg-blue/8 px-3 py-0.5 text-xs font-medium text-blue">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1.5 text-sm text-text-muted hover:text-blue transition-colors"
            >
              <RefreshCw className="size-3.5" />
              Actualizar
            </button>
            <Link href="/" className="flex items-center gap-1.5 text-sm text-text-muted hover:text-blue transition-colors">
              Ver sitio
              <ExternalLink className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex gap-1 rounded-xl border border-border bg-card p-1">
          {([
            { key: "page" as Tab, label: "Editor de páginas", icon: <FileText className="size-4" /> },
            { key: "opportunities" as Tab, label: "Convocatorias", icon: <Target className="size-4" /> },
            { key: "settings" as Tab, label: "Configuración", icon: <Settings className="size-4" /> },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                tab === t.key
                  ? "bg-primary text-primary-foreground"
                  : "text-text-muted hover:bg-secondary"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="size-8 animate-spin rounded-full border-4 border-blue border-t-transparent" />
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950">
            <p className="text-red-700 dark:text-red-300">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Reintentar
            </button>
          </div>
        ) : !data ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-text-muted">No se cargaron datos.</p>
            <button
              onClick={handleRefresh}
              className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
            >
              Cargar datos
            </button>
          </div>
        ) : (
          <>
            {tab === "page" && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-card p-3">
                  {PAGES.map((p) => (
                    <button
                      key={p.key}
                      onClick={() => setSelectedPage(p.key)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        selectedPage === p.key
                          ? "bg-primary text-primary-foreground"
                          : "text-text-muted hover:bg-secondary"
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
