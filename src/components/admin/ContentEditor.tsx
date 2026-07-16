"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateSiteContent } from "@/actions/admin";
import { Save } from "lucide-react";

interface ContentEditorProps {
  content: { key: string; value: string; section: string }[];
}

export function ContentEditor({ content }: ContentEditorProps) {
  const [items, setItems] = useState(content);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = (key: string, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, value } : item))
    );
  };

  const handleSave = (key: string, value: string) => {
    setError(null);
    startTransition(async () => {
      const result = await updateSiteContent(key, value);
      if (result.error) {
        setError(result.error);
      } else {
        setSaved(key);
        setTimeout(() => setSaved(null), 2000);
      }
    });
  };

  const sections = [...new Set(items.map((i) => i.section))];

  if (sections.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
        <p className="text-text-muted">No hay contenido. Ejecuta la migración primero.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          Error: {error}
        </div>
      )}
      {sections.map((section) => (
        <div key={section}>
          <h3 className="mb-4 text-lg font-semibold text-text-main capitalize">
            {section.replace("_", " ")}
          </h3>
          <div className="space-y-3">
            {items
              .filter((i) => i.section === section)
              .map((item) => (
                <div key={item.key} className="bento-shadow rounded-xl border border-border bg-card p-4 noise">
                  <div className="relative z-10">
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-text-muted">
                      {item.key.replace(/_/g, " ")}
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={item.value}
                        onChange={(e) => handleUpdate(item.key, e.target.value)}
                        className="flex-1 rounded-xl"
                      />
                      <Button
                        size="sm"
                        className={`shrink-0 rounded-xl ${
                          saved === item.key
                            ? "bg-success"
                            : "bg-primary"
                        } text-white hover:opacity-90`}
                        onClick={() => handleSave(item.key, item.value)}
                        disabled={isPending}
                      >
                        {saved === item.key ? "✓" : <Save className="size-3.5" />}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
