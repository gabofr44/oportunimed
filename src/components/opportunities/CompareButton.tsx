"use client";

import { useState, useEffect } from "react";
import { Scale } from "lucide-react";

const STORAGE_KEY = "oportunimed_compare";
const MAX_COMPARE = 3;

function readCompareIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCompareIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("oportunimed:compare-updated"));
}

interface Props {
  opportunityId: string;
}

export function CompareButton({ opportunityId }: Props) {
  const [selected, setSelected] = useState(false);
  const [atLimit, setAtLimit] = useState(false);

  useEffect(() => {
    const sync = () => {
      const ids = readCompareIds();
      setSelected(ids.includes(opportunityId));
      setAtLimit(ids.length >= MAX_COMPARE && !ids.includes(opportunityId));
    };
    sync();
    window.addEventListener("oportunimed:compare-updated", sync);
    return () => window.removeEventListener("oportunimed:compare-updated", sync);
  }, [opportunityId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const ids = readCompareIds();
    if (ids.includes(opportunityId)) {
      writeCompareIds(ids.filter((id) => id !== opportunityId));
    } else {
      if (ids.length >= MAX_COMPARE) return;
      writeCompareIds([...ids, opportunityId]);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={atLimit}
      aria-pressed={selected}
      title={
        atLimit
          ? `Ya tienes ${MAX_COMPARE} oportunidades para comparar`
          : selected
          ? "Quitar del comparador"
          : "Agregar al comparador"
      }
      className={`flex size-8 shrink-0 items-center justify-center rounded-xl border transition-all ${
        selected
          ? "border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-800 dark:bg-purple-950"
          : "border-border bg-card text-text-muted hover:border-purple-300 hover:text-purple-600"
      } disabled:cursor-not-allowed disabled:opacity-40`}
    >
      <Scale className="size-4" />
    </button>
  );
}