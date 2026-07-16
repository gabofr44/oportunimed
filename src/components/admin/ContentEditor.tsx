"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateSiteContent } from "@/actions/admin";

interface ContentEditorProps {
  content: { key: string; value: string; section: string }[];
}

export function ContentEditor({ content }: ContentEditorProps) {
  const [items, setItems] = useState(content);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState<string | null>(null);

  const handleUpdate = (key: string, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, value } : item))
    );
  };

  const handleSave = (key: string, value: string) => {
    startTransition(async () => {
      await updateSiteContent(key, value);
      setSaved(key);
      setTimeout(() => setSaved(null), 2000);
    });
  };

  const sections = [...new Set(items.map((i) => i.section))];

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section}>
          <h3 className="mb-4 text-lg font-semibold text-text-main capitalize">
            {section.replace("_", " ")}
          </h3>
          <div className="space-y-4">
            {items
              .filter((i) => i.section === section)
              .map((item) => (
                <div key={item.key} className="rounded-xl border border-border bg-white p-4">
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-text-muted">
                    {item.key.replace(/_/g, " ")}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={item.value}
                      onChange={(e) => handleUpdate(item.key, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      className="shrink-0 bg-orange text-white hover:bg-orange-hover"
                      onClick={() => handleSave(item.key, item.value)}
                      disabled={isPending}
                    >
                      {saved === item.key ? "Saved!" : "Save"}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
