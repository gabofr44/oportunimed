"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

export interface TourStep {
  targetId: string;
  title: string;
  description: string;
}

interface Props {
  storageKey: string;
  steps: TourStep[];
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PADDING = 8;

export function GuidedTour({ storageKey, steps }: Props) {
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[stepIndex];

  const measure = useCallback(() => {
    if (!currentStep) return;
    const el = document.getElementById(currentStep.targetId);
    if (!el) {
      // Target isn't on screen for this user/state - skip forward automatically
      setStepIndex((i) => (i < steps.length - 1 ? i + 1 : i));
      return;
    }
    // Jump instantly (no smooth) para que el navegador termine de hacer scroll
    // antes de medir - medir durante una animacion de scroll suave lee una
    // posicion vieja (previa al scroll) y descoloca el spotlight/tooltip.
    el.scrollIntoView({ block: "center", behavior: "auto" });
    // Espera un ciclo completo de layout+paint a que el salto de scroll se asiente.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        setRect({
          top: r.top - PADDING,
          left: r.left - PADDING,
          width: r.width + PADDING * 2,
          height: r.height + PADDING * 2,
        });
      });
    });
  }, [currentStep, steps.length]);

  useEffect(() => {
    const seen = typeof window !== "undefined" && localStorage.getItem(storageKey);
    if (!seen) {
      const t = setTimeout(() => setActive(true), 500);
      return () => clearTimeout(t);
    }
  }, [storageKey]);

  // Allow a "?" help button elsewhere on the page to replay the tour
  useEffect(() => {
    const handler = () => {
      setStepIndex(0);
      setActive(true);
    };
    window.addEventListener("oportunimed:restart-tour", handler);
    return () => window.removeEventListener("oportunimed:restart-tour", handler);
  }, []);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(measure, 350);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [active, stepIndex, measure]);

  const finish = () => {
    setActive(false);
    localStorage.setItem(storageKey, "1");
  };

  const next = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      finish();
    }
  };

  const prev = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  if (!active || !currentStep) return null;

  // Position tooltip below the target if there's room, otherwise above
  const tooltipTop = rect
    ? rect.top + rect.height + 16 + window.scrollY < window.innerHeight + window.scrollY - 220
      ? rect.top + rect.height + 16
      : rect.top - 16
    : 0;
  const placeBelow = rect
    ? rect.top + rect.height + 16 < window.innerHeight - 220
    : true;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Recorrido guiado">
      {/* Dimmed backdrop with spotlight cutout via box-shadow */}
      {rect && (
        <div
          className="absolute rounded-xl transition-all duration-300 ease-out"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            boxShadow: "0 0 0 9999px rgba(9, 9, 11, 0.65)",
            pointerEvents: "none",
          }}
        />
      )}
      {!rect && <div className="absolute inset-0 bg-background/70" />}

      {/* Tooltip card */}
      {rect && (
        <div
          ref={tooltipRef}
          className="bento-shadow absolute w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-border bg-card p-5 noise transition-all duration-300 ease-out"
          style={{
            top: placeBelow ? tooltipTop : undefined,
            bottom: placeBelow ? undefined : window.innerHeight - rect.top + 16,
            left: Math.min(Math.max(rect.left, 16), window.innerWidth - 400),
          }}
        >
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue">
                <Sparkles className="size-3.5" />
                Paso {stepIndex + 1} de {steps.length}
              </div>
              <button
                onClick={finish}
                aria-label="Cerrar recorrido"
                className="text-text-muted transition-colors hover:text-text-main"
              >
                <X className="size-4" />
              </button>
            </div>

            <h3 className="mt-3 text-base font-semibold text-text-main">
              {currentStep.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
              {currentStep.description}
            </p>

            <div className="mt-5 flex items-center justify-between gap-2">
              <button
                onClick={finish}
                className="text-xs font-medium text-text-muted transition-colors hover:text-text-main"
              >
                Saltar tour
              </button>
              <div className="flex items-center gap-2">
                {stepIndex > 0 && (
                  <button
                    onClick={prev}
                    className="flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-text-main transition-colors hover:border-blue/30"
                  >
                    <ArrowLeft className="size-3.5" />
                    Anterior
                  </button>
                )}
                <button
                  onClick={next}
                  className="flex items-center gap-1 rounded-xl bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {stepIndex < steps.length - 1 ? "Siguiente" : "Entendido"}
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}