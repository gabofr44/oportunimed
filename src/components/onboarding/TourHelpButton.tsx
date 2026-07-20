"use client";

import { HelpCircle } from "lucide-react";

export function TourHelpButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("oportunimed:restart-tour"))}
      className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-text-muted transition-colors hover:border-blue/30 hover:text-blue"
      aria-label="Repetir recorrido guiado"
      title="¿Cómo funciona esta página?"
    >
      <HelpCircle className="size-3.5" />
      ¿Cómo funciona?
    </button>
  );
}