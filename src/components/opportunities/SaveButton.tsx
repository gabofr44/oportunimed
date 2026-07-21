"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { toggleSaved } from "@/actions/favorites";

interface Props {
  opportunityId: string;
  initialSaved: boolean;
  isLoggedIn: boolean;
  size?: "sm" | "md";
}

export function SaveButton({ opportunityId, initialSaved, isLoggedIn, size = "sm" }: Props) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const dim = size === "sm" ? "size-8" : "size-10";
  const iconDim = size === "sm" ? "size-4" : "size-5";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    const next = !saved;
    setSaved(next);

    startTransition(async () => {
      const result = await toggleSaved(opportunityId);
      if (result.error) {
        setSaved(!next);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={saved}
      aria-label={saved ? "Quitar de guardados" : "Guardar oportunidad"}
      title={saved ? "Quitar de guardados" : "Guardar oportunidad"}
      className={`flex ${dim} shrink-0 items-center justify-center rounded-xl border transition-all ${
        saved
          ? "border-blue-200 bg-blue-50 text-blue dark:border-blue-800 dark:bg-blue-950"
          : "border-border bg-card text-text-muted hover:border-blue/30 hover:text-blue"
      } disabled:opacity-60`}
    >
      <Bookmark className={iconDim} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}