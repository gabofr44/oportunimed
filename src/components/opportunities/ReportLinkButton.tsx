"use client";

import { useState, useTransition } from "react";
import { Flag, Check } from "lucide-react";
import { reportBrokenLink } from "@/actions/link-reports";

interface Props {
  opportunityId: string;
}

export function ReportLinkButton({ opportunityId }: Props) {
  const [state, setState] = useState<"idle" | "confirming" | "done">("idle");
  const [isPending, startTransition] = useTransition();

  if (state === "done") {
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-success">
        <Check className="size-3.5" />
        Gracias, lo vamos a revisar
      </span>
    );
  }

  if (state === "confirming") {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-text-muted">¿El link no lleva a la convocatoria?</span>
        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              await reportBrokenLink(opportunityId);
              setState("done");
            });
          }}
          className="rounded-lg bg-red-50 px-2.5 py-1 font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-60 dark:bg-red-950 dark:text-red-300"
        >
          Sí, reportar
        </button>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="text-text-muted hover:text-text-main"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setState("confirming")}
      className="flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors hover:text-red-600"
    >
      <Flag className="size-3.5" />
      Reportar link roto
    </button>
  );
}