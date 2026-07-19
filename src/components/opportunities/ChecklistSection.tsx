"use client";

import { useState, useCallback } from "react";
import { CheckSquare, Square, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveChecklist, initChecklist } from "@/actions/checklists";

interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

interface ChecklistSectionProps {
  opportunityId: string;
  initialItems?: ChecklistItem[] | null;
}

export function ChecklistSection({ opportunityId, initialItems }: ChecklistSectionProps) {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems || []);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [hasChecklist, setHasChecklist] = useState(!!initialItems);

  const toggleItem = useCallback(async (itemId: string) => {
    const newItems = items.map((i) => (i.id === itemId ? { ...i, done: !i.done } : i));
    setItems(newItems);
    setLoading(true);
    await saveChecklist(opportunityId, newItems);
    setLoading(false);
  }, [items, opportunityId]);

  const createChecklist = useCallback(async () => {
    setInitLoading(true);
    await initChecklist(opportunityId);
    const res = await fetch(`/api/checklist?opportunityId=${opportunityId}`);
    const data = await res.json();
    if (data.items) {
      setItems(data.items);
      setHasChecklist(true);
    }
    setInitLoading(false);
  }, [opportunityId]);

  if (!hasChecklist) {
    return (
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-text-main">Checklist de aplicación</h2>
        <p className="mt-1 text-sm text-text-muted">Lleva el control de los requisitos para esta convocatoria.</p>
        <Button onClick={createChecklist} disabled={initLoading} className="mt-3 rounded-xl text-sm" variant="outline">
          {initLoading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Plus className="mr-1 size-4" />}
          Crear checklist
        </Button>
      </div>
    );
  }

  const doneCount = items.filter((i) => i.done).length;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-main">Checklist de aplicación</h2>
        <span className="text-xs text-text-muted">{doneCount}/{items.length} completado</span>
      </div>
      <div className="mt-3 h-1.5 w-full rounded-full bg-surface overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${items.length > 0 ? (doneCount / items.length) * 100 : 0}%` }}
        />
      </div>
      <ul className="mt-4 space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => toggleItem(item.id)}
              disabled={loading}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-surface"
            >
              {item.done ? (
                <CheckSquare className="size-4 shrink-0 text-primary" />
              ) : (
                <Square className="size-4 shrink-0 text-text-muted" />
              )}
              <span className={item.done ? "line-through text-text-muted" : "text-text-main"}>
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
