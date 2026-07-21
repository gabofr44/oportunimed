"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchTitleSuggestions } from "@/actions/opportunities";

interface Suggestion {
  id: string;
  title: string;
  type: string;
  location: string;
}

const typeLabels: Record<string, string> = {
  scholarship: "Beca",
  research: "Investigación",
  internship: "Internado",
  course: "Curso",
};

interface Props {
  defaultValue?: string;
}

export function SearchAutocomplete({ defaultValue }: Props) {
  const [value, setValue] = useState(defaultValue || "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (value.trim().length < 2) {
        setSuggestions([]);
        setOpen(false);
        return;
      }
      startTransition(async () => {
        const results = await searchTitleSuggestions(value);
        setSuggestions(results);
        setOpen(results.length > 0);
      });
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
      <Input
        name="q"
        placeholder="Palabras clave..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        autoComplete="off"
        className="pl-9"
      />

      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-72 overflow-y-auto rounded-xl border border-border bg-card shadow-lg">
          {suggestions.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => router.push(`/opportunities/${s.id}`)}
              className="flex w-full flex-col items-start gap-0.5 border-b border-border px-3 py-2 text-left last:border-b-0 hover:bg-secondary"
            >
              <span className="text-sm font-medium text-text-main">{s.title}</span>
              <span className="text-xs text-text-muted">
                {typeLabels[s.type] || s.type} · {s.location}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}