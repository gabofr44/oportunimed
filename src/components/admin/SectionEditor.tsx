"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updatePageSection, updateSectionVisibility } from "@/actions/admin";

interface Section {
  id: string;
  page: string;
  section_key: string;
  title: string;
  content: Record<string, unknown>;
  sort_order: number;
  visible: boolean;
}

function FieldEditor({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-text-muted">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text-main focus:border-orange focus:ring-1 focus:ring-orange"
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm"
        />
      )}
    </div>
  );
}

function CategoryItemsEditor({
  items,
  onChange,
}: {
  items: Array<{ label: string; description: string; icon: string }>;
  onChange: (
    items: Array<{ label: string; description: string; icon: string }>
  ) => void;
}) {
  const updateItem = (
    index: number,
    field: "label" | "description" | "icon",
    value: string
  ) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const addItem = () => {
    onChange([...items, { label: "", description: "", icon: "📌" }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3"
        >
          <Input
            value={item.icon}
            onChange={(e) => updateItem(i, "icon", e.target.value)}
            className="w-14 text-center"
            placeholder="🎓"
          />
          <div className="flex-1 space-y-2">
            <Input
              value={item.label}
              onChange={(e) => updateItem(i, "label", e.target.value)}
              placeholder="Category name"
            />
            <Input
              value={item.description}
              onChange={(e) => updateItem(i, "description", e.target.value)}
              placeholder="Description"
            />
          </div>
          <button
            onClick={() => removeItem(i)}
            className="mt-1 text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={addItem}
        className="w-full border-dashed"
      >
        + Add Item
      </Button>
    </div>
  );
}

function SectionCard({ section }: { section: Section }) {
  const [content, setContent] = useState(section.content);
  const [title, setTitle] = useState(section.title);
  const [visible, setVisible] = useState(section.visible);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const contentObj = content as Record<string, string>;

  const handleSave = () => {
    startTransition(async () => {
      await updatePageSection(section.id, content, title);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const handleToggleVisible = () => {
    const newVisible = !visible;
    setVisible(newVisible);
    startTransition(async () => {
      await updateSectionVisibility(section.id, newVisible);
    });
  };

  const updateField = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const renderFields = () => {
    switch (section.section_key) {
      case "hero":
        return (
          <>
            <FieldEditor
              label="Headline"
              value={String(contentObj.headline || "")}
              onChange={(v) => updateField("headline", v)}
            />
            <FieldEditor
              label="Subheadline"
              value={String(contentObj.subheadline || "")}
              onChange={(v) => updateField("subheadline", v)}
              multiline
            />
            <FieldEditor
              label="Search Placeholder"
              value={String(contentObj.search_placeholder || "")}
              onChange={(v) => updateField("search_placeholder", v)}
            />
            <div className="grid grid-cols-2 gap-3">
              <FieldEditor
                label="CTA 1 Text"
                value={String(contentObj.cta_1_text || "")}
                onChange={(v) => updateField("cta_1_text", v)}
              />
              <FieldEditor
                label="CTA 1 Link"
                value={String(contentObj.cta_1_link || "")}
                onChange={(v) => updateField("cta_1_link", v)}
              />
              <FieldEditor
                label="CTA 2 Text"
                value={String(contentObj.cta_2_text || "")}
                onChange={(v) => updateField("cta_2_text", v)}
              />
              <FieldEditor
                label="CTA 2 Link"
                value={String(contentObj.cta_2_link || "")}
                onChange={(v) => updateField("cta_2_link", v)}
              />
            </div>
          </>
        );

      case "categories":
        return (
          <>
            <FieldEditor
              label="Section Title"
              value={String(contentObj.title || "")}
              onChange={(v) => updateField("title", v)}
            />
            <FieldEditor
              label="Subtitle"
              value={String(contentObj.subtitle || "")}
              onChange={(v) => updateField("subtitle", v)}
            />
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
                Category Items
              </label>
              <CategoryItemsEditor
                items={
                  Array.isArray(contentObj.items)
                    ? (contentObj.items as Array<{
                        label: string;
                        description: string;
                        icon: string;
                      }>)
                    : []
                }
                onChange={(items) =>
                  setContent((prev) => ({ ...prev, items }))
                }
              />
            </div>
          </>
        );

      case "featured":
        return (
          <>
            <FieldEditor
              label="Section Title"
              value={String(contentObj.title || "")}
              onChange={(v) => updateField("title", v)}
            />
            <FieldEditor
              label="Subtitle"
              value={String(contentObj.subtitle || "")}
              onChange={(v) => updateField("subtitle", v)}
            />
          </>
        );

      case "footer":
        return (
          <>
            <FieldEditor
              label="Tagline"
              value={String(contentObj.tagline || "")}
              onChange={(v) => updateField("tagline", v)}
              multiline
            />
            <FieldEditor
              label="Copyright Name"
              value={String(contentObj.copyright || "")}
              onChange={(v) => updateField("copyright", v)}
            />
          </>
        );

      default:
        return (
          <div className="rounded-lg border border-dashed border-border bg-surface p-4 text-center text-sm text-text-muted">
            Section type: <code className="font-mono">{section.section_key}</code>
          </div>
        );
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all ${
        visible
          ? "border-border bg-white"
          : "border-dashed border-slate-300 bg-slate-50 opacity-60"
      }`}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-orange/10 text-sm">
            {section.section_key === "hero" && "🏠"}
            {section.section_key === "categories" && "📂"}
            {section.section_key === "featured" && "⭐"}
            {section.section_key === "footer" && "📎"}
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-sm font-semibold text-text-main focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleVisible}
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              visible
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {visible ? "Visible" : "Hidden"}
          </button>
          <Button
            size="sm"
            className="bg-orange text-white hover:bg-orange-hover"
            onClick={handleSave}
            disabled={isPending}
          >
            {saved ? "✓ Saved" : isPending ? "..." : "Save"}
          </Button>
        </div>
      </div>
      <div className="space-y-4 p-5">{renderFields()}</div>
    </div>
  );
}

export function SectionEditor({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-text-main">Page Sections</h2>
          <p className="text-sm text-text-muted">
            Edit each section below. Changes appear live on the site.
          </p>
        </div>
      </div>

      {sections.map((section) => (
        <SectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}
