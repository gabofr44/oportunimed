"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";

interface Props {
  title: string;
  path: string;
}

export function ShareButton({ title, path }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    return `${base}${path}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable - silently ignore
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${title} — ${getUrl()}`)}`;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-text-muted transition-colors hover:border-blue/30 hover:text-blue"
      >
        <Share2 className="size-3.5" />
        Compartir
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-1 w-48 rounded-xl border border-border bg-card p-1.5 shadow-lg">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-text-main hover:bg-secondary"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                handleCopy();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-text-main hover:bg-secondary"
            >
              {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
              {copied ? "¡Copiado!" : "Copiar link"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
