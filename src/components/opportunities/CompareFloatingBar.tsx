"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Scale, X } from "lucide-react";

const STORAGE_KEY = "oportunimed_compare";

function readCompareIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CompareFloatingBar() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setIds(readCompareIds());
    sync();
    window.addEventListener("oportunimed:compare-updated", sync);
    return () => window.removeEventListener("oportunimed:compare-updated", sync);
  }, []);

  const clear = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event("oportunimed:compare-updated"));
  };

  if (ids.length < 2) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div className="bento-shadow flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 noise">
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm font-medium text-text-main">
            <Scale className="size-4 text-purple-600" />
            {ids.length} para comparar
          </div>
          <Link
            href={`/comparar?ids=${ids.join(",")}`}
            className="rounded-xl bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Comparar
          </Link>
          <button
            type="button"
            onClick={clear}
            aria-label="Limpiar comparador"
            className="text-text-muted transition-colors hover:text-text-main"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}