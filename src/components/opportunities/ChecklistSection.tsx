"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Square, Plus, Loader2, PartyPopper, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { saveChecklist, initChecklist } from "@/actions/checklists";

interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

interface ChecklistSectionProps {
  opportunityId: string;
  initialItems?: ChecklistItem[] | null;
  isAuthenticated?: boolean;
}

export function ChecklistSection({ opportunityId, initialItems, isAuthenticated }: ChecklistSectionProps) {
  const [items, setItems] = useState<ChecklistItem[]>(initialItems || []);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [hasChecklist, setHasChecklist] = useState(!!initialItems);
  const [showCelebration, setShowCelebration] = useState(false);

  const doneCount = items.filter((i) => i.done).length;
  const allDone = hasChecklist && items.length > 0 && doneCount === items.length;

  useEffect(() => {
    if (allDone && !showCelebration) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
    }
  }, [allDone]);

  const toggleItem = useCallback(async (itemId: string) => {
    const newItems = items.map((i) => (i.id === itemId ? { ...i, done: !i.done } : i));
    setItems(newItems);
    setLoading(true);
    const { error } = await saveChecklist(opportunityId, newItems);
    if (error) {
      setItems(items);
    }
    setLoading(false);
  }, [items, opportunityId]);

  const createChecklist = useCallback(async () => {
    setInitLoading(true);
    const { data } = await initChecklist(opportunityId);
    if (data?.items) {
      setItems(data.items as ChecklistItem[]);
      setHasChecklist(true);
    }
    setInitLoading(false);
  }, [opportunityId]);

  if (!isAuthenticated) {
    return (
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 noise">
        <div className="relative z-10">
          <h2 className="text-lg font-semibold text-text-main">Checklist de aplicación</h2>
          <p className="mt-1 text-sm text-text-muted">Inicia sesión para crear tu checklist y dar seguimiento a los requisitos.</p>
          <Link href="/auth/login">
            <Button className="mt-3 rounded-xl text-sm">Iniciar sesión</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!hasChecklist) {
    return (
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 noise">
        <div className="relative z-10">
          <h2 className="text-lg font-semibold text-text-main">Checklist de aplicación</h2>
          <p className="mt-1 text-sm text-text-muted">Lleva el control de los requisitos para esta convocatoria.</p>
          <Button onClick={createChecklist} disabled={initLoading} className="mt-3 rounded-xl text-sm" variant="outline">
            {initLoading ? <Loader2 className="mr-1 size-4 animate-spin" /> : <Plus className="mr-1 size-4" />}
            Crear checklist
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 relative">
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 via-background/95 to-amber-500/10 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.6, repeat: 2 }}
            >
              <PartyPopper className="size-12 text-primary" />
            </motion.div>
            <p className="mt-3 text-xl font-bold text-text-main">¡Completado!</p>
            <p className="text-sm text-text-muted text-center max-w-xs">
              Tienes todo listo para aplicar. ¡Mucho éxito!
            </p>
            <div className="mt-3 flex gap-1">
              {[1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  initial={{ y: 0 }}
                  animate={{ y: [-10, 0] }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                >
                  <Sparkles className={`size-4 ${i === 1 ? "text-yellow-500" : i === 2 ? "text-blue" : "text-primary"}`} />
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-2xl border border-border bg-card p-6 noise">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-main">Checklist de aplicación</h2>
            <span className="text-xs text-text-muted">{doneCount}/{items.length}</span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-surface overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${items.length > 0 ? (doneCount / items.length) * 100 : 0}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <ul className="mt-4 space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => toggleItem(item.id)}
                  disabled={loading}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all hover:bg-surface disabled:opacity-70"
                >
                  {item.done ? (
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="shrink-0"
                    >
                      <CheckSquare className="size-5 text-primary" />
                    </motion.div>
                  ) : (
                    <Square className="size-5 shrink-0 text-text-muted" />
                  )}
                  <span className={item.done ? "line-through text-text-muted" : "text-text-main"}>
                    {item.label}
                  </span>
                  {item.done && <CheckSquare className="size-3 ml-auto text-primary/50 shrink-0" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
