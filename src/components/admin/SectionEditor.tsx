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
          className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-text-main focus:border-blue focus:ring-1 focus:ring-blue"
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

function ArrayItemsEditor({
  label,
  items,
  onChange,
  fields,
}: {
  label: string;
  items: Record<string, string | number>[];
  onChange: (items: Record<string, string | number>[]) => void;
  fields: { key: string; label: string; type?: "text" | "textarea" | "number" }[];
}) {
  const updateItem = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const addItem = () => {
    const empty: Record<string, string | number> = {};
    fields.forEach((f) => {
      empty[f.key] = f.type === "number" ? 0 : "";
    });
    onChange([...items, empty]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-muted">
        {label}
      </label>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-surface p-3"
          >
            <div className="flex items-start gap-2">
              <div className="flex-1 space-y-2">
                {fields.map((field) => (
                  <div key={field.key}>
                    <label className="mb-0.5 block text-xs text-text-muted">
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={String(item[field.key] || "")}
                        onChange={(e) => updateItem(i, field.key, e.target.value)}
                        rows={2}
                        className="w-full rounded border border-border bg-card px-2 py-1.5 text-sm"
                      />
                    ) : field.type === "number" ? (
                      <Input
                        type="number"
                        value={String(item[field.key] || 0)}
                        onChange={(e) =>
                          updateItem(i, field.key, parseInt(e.target.value) || 0)
                        }
                        className="text-sm"
                      />
                    ) : (
                      <Input
                        value={String(item[field.key] || "")}
                        onChange={(e) => updateItem(i, field.key, e.target.value)}
                        className="text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => removeItem(i)}
                className="mt-6 text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
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
    </div>
  );
}

function SectionCard({ section }: { section: Section }) {
  const [content, setContent] = useState(section.content);
  const [title, setTitle] = useState(section.title);
  const [visible, setVisible] = useState(section.visible);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const c = content as Record<string, unknown>;

  const handleSave = () => {
    setError(null);
    startTransition(async () => {
      const result = await updatePageSection(section.id, content, title);
      if (result.error) {
        setError(result.error);
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    });
  };

  const handleToggleVisible = () => {
    const newVisible = !visible;
    setVisible(newVisible);
    setError(null);
    startTransition(async () => {
      const result = await updateSectionVisibility(section.id, newVisible);
      if (result.error) {
        setError(result.error);
        setVisible(!newVisible);
      }
    });
  };

  const updateField = (key: string, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const renderFields = () => {
    const key = section.section_key;
    const page = section.page;

    // ============================================
    // HOME PAGE
    // ============================================
    if (page === "home" && key === "hero") {
      return (
        <>
          <FieldEditor label="Headline" value={String(c.headline || "")} onChange={(v) => updateField("headline", v)} />
          <FieldEditor label="Subheadline" value={String(c.subheadline || "")} onChange={(v) => updateField("subheadline", v)} multiline />
          <FieldEditor label="Search Placeholder" value={String(c.search_placeholder || "")} onChange={(v) => updateField("search_placeholder", v)} />
          <div className="grid grid-cols-2 gap-3">
            <FieldEditor label="CTA 1 Text" value={String(c.cta_1_text || "")} onChange={(v) => updateField("cta_1_text", v)} />
            <FieldEditor label="CTA 1 Link" value={String(c.cta_1_link || "")} onChange={(v) => updateField("cta_1_link", v)} />
            <FieldEditor label="CTA 2 Text" value={String(c.cta_2_text || "")} onChange={(v) => updateField("cta_2_text", v)} />
            <FieldEditor label="CTA 2 Link" value={String(c.cta_2_link || "")} onChange={(v) => updateField("cta_2_link", v)} />
          </div>
        </>
      );
    }

    if (page === "home" && key === "categories") {
      return (
        <>
          <FieldEditor label="Section Title" value={String(c.title || "")} onChange={(v) => updateField("title", v)} />
          <FieldEditor label="Subtitle" value={String(c.subtitle || "")} onChange={(v) => updateField("subtitle", v)} />
          <ArrayItemsEditor
            label="Category Items"
            items={Array.isArray(c.items) ? (c.items as Record<string, string | number>[]) : []}
            onChange={(items) => setContent((prev) => ({ ...prev, items }))}
            fields={[
              { key: "icon", label: "Icon (emoji)", type: "text" },
              { key: "label", label: "Name", type: "text" },
              { key: "description", label: "Description", type: "text" },
            ]}
          />
        </>
      );
    }

    if (page === "home" && key === "featured") {
      return (
        <>
          <FieldEditor label="Section Title" value={String(c.title || "")} onChange={(v) => updateField("title", v)} />
          <FieldEditor label="Subtitle" value={String(c.subtitle || "")} onChange={(v) => updateField("subtitle", v)} />
        </>
      );
    }

    if (page === "home" && key === "stats") {
      return (
        <>
          <FieldEditor label="Section Title" value={String(c.title || "")} onChange={(v) => updateField("title", v)} />
          <FieldEditor label="Subtitle" value={String(c.subtitle || "")} onChange={(v) => updateField("subtitle", v)} />
          <ArrayItemsEditor
            label="Stats Items"
            items={Array.isArray(c.items) ? (c.items as Record<string, string | number>[]) : []}
            onChange={(items) => setContent((prev) => ({ ...prev, items }))}
            fields={[
              { key: "icon", label: "Icon (emoji)", type: "text" },
              { key: "value", label: "Value", type: "text" },
              { key: "label", label: "Label", type: "text" },
            ]}
          />
        </>
      );
    }

    if (page === "home" && key === "cta") {
      return (
        <>
          <FieldEditor label="Title" value={String(c.title || "")} onChange={(v) => updateField("title", v)} />
          <FieldEditor label="Subtitle" value={String(c.subtitle || "")} onChange={(v) => updateField("subtitle", v)} multiline />
          <div className="grid grid-cols-2 gap-3">
            <FieldEditor label="Button Text" value={String(c.button_text || "")} onChange={(v) => updateField("button_text", v)} />
            <FieldEditor label="Button Link" value={String(c.button_link || "")} onChange={(v) => updateField("button_link", v)} />
          </div>
        </>
      );
    }

    // ============================================
    // HEADER
    // ============================================
    if (page === "header" && key === "header") {
      return (
        <>
          <div className="grid grid-cols-2 gap-3">
            <FieldEditor label="Site Name" value={String(c.site_name || "")} onChange={(v) => updateField("site_name", v)} />
            <FieldEditor label="Logo Text" value={String(c.logo_text || "")} onChange={(v) => updateField("logo_text", v)} />
          </div>
          <ArrayItemsEditor
            label="Navigation Items"
            items={Array.isArray(c.nav_items) ? (c.nav_items as Record<string, string | number>[]) : []}
            onChange={(items) => setContent((prev) => ({ ...prev, nav_items: items }))}
            fields={[
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "Link (URL)", type: "text" },
            ]}
          />
        </>
      );
    }

    // ============================================
    // FOOTER
    // ============================================
    if (page === "footer" && key === "footer") {
      return (
        <>
          <div className="grid grid-cols-2 gap-3">
            <FieldEditor label="Site Name" value={String(c.site_name || "")} onChange={(v) => updateField("site_name", v)} />
            <FieldEditor label="Logo Text" value={String(c.logo_text || "")} onChange={(v) => updateField("logo_text", v)} />
          </div>
          <FieldEditor label="Tagline" value={String(c.tagline || "")} onChange={(v) => updateField("tagline", v)} multiline />
          <FieldEditor label="Copyright" value={String(c.copyright || "")} onChange={(v) => updateField("copyright", v)} />
          <ArrayItemsEditor
            label="Explore Links"
            items={Array.isArray(c.explore_links) ? (c.explore_links as Record<string, string | number>[]) : []}
            onChange={(items) => setContent((prev) => ({ ...prev, explore_links: items }))}
            fields={[
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "Link", type: "text" },
            ]}
          />
          <ArrayItemsEditor
            label="Resource Links"
            items={Array.isArray(c.resource_links) ? (c.resource_links as Record<string, string | number>[]) : []}
            onChange={(items) => setContent((prev) => ({ ...prev, resource_links: items }))}
            fields={[
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "Link", type: "text" },
            ]}
          />
          <ArrayItemsEditor
            label="Legal Links"
            items={Array.isArray(c.legal_links) ? (c.legal_links as Record<string, string | number>[]) : []}
            onChange={(items) => setContent((prev) => ({ ...prev, legal_links: items }))}
            fields={[
              { key: "label", label: "Label", type: "text" },
              { key: "href", label: "Link", type: "text" },
            ]}
          />
        </>
      );
    }

    // ============================================
    // HOW TO APPLY
    // ============================================
    if (page === "how-to-apply" && key === "hero") {
      return (
        <>
          <FieldEditor label="Title" value={String(c.title || "")} onChange={(v) => updateField("title", v)} />
          <FieldEditor label="Subtitle" value={String(c.subtitle || "")} onChange={(v) => updateField("subtitle", v)} multiline />
        </>
      );
    }

    if (page === "how-to-apply" && key === "steps") {
      return (
        <ArrayItemsEditor
          label="Application Steps"
          items={Array.isArray(c.items) ? (c.items as Record<string, string | number>[]) : []}
          onChange={(items) => setContent((prev) => ({ ...prev, items }))}
          fields={[
            { key: "number", label: "Step #", type: "text" },
            { key: "icon", label: "Icon (emoji)", type: "text" },
            { key: "title", label: "Title", type: "text" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "details", label: "Details (comma separated)", type: "text" },
          ]}
        />
      );
    }

    if (page === "how-to-apply" && key === "tips") {
      return (
        <>
          <FieldEditor label="Section Title" value={String(c.title || "")} onChange={(v) => updateField("title", v)} />
          <ArrayItemsEditor
            label="Tips"
            items={Array.isArray(c.items) ? (c.items as Record<string, string | number>[]) : []}
            onChange={(items) => setContent((prev) => ({ ...prev, items }))}
            fields={[
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ]}
          />
        </>
      );
    }

    if (page === "how-to-apply" && key === "cta") {
      return (
        <>
          <FieldEditor label="Title" value={String(c.title || "")} onChange={(v) => updateField("title", v)} />
          <FieldEditor label="Subtitle" value={String(c.subtitle || "")} onChange={(v) => updateField("subtitle", v)} multiline />
          <div className="grid grid-cols-2 gap-3">
            <FieldEditor label="Button 1 Text" value={String(c.button_1_text || "")} onChange={(v) => updateField("button_1_text", v)} />
            <FieldEditor label="Button 1 Link" value={String(c.button_1_link || "")} onChange={(v) => updateField("button_1_link", v)} />
            <FieldEditor label="Button 2 Text" value={String(c.button_2_text || "")} onChange={(v) => updateField("button_2_text", v)} />
            <FieldEditor label="Button 2 Link" value={String(c.button_2_link || "")} onChange={(v) => updateField("button_2_link", v)} />
          </div>
        </>
      );
    }

    // ============================================
    // BLOG
    // ============================================
    if (page === "blog" && key === "hero") {
      return (
        <>
          <FieldEditor label="Title" value={String(c.title || "")} onChange={(v) => updateField("title", v)} />
          <FieldEditor label="Subtitle" value={String(c.subtitle || "")} onChange={(v) => updateField("subtitle", v)} multiline />
        </>
      );
    }

    if (page === "blog" && key === "posts") {
      return (
        <ArrayItemsEditor
          label="Blog Posts"
          items={Array.isArray(c.items) ? (c.items as Record<string, string | number>[]) : []}
          onChange={(items) => setContent((prev) => ({ ...prev, items }))}
          fields={[
            { key: "slug", label: "Slug (URL)", type: "text" },
            { key: "title", label: "Title", type: "text" },
            { key: "excerpt", label: "Excerpt", type: "textarea" },
            { key: "category", label: "Category", type: "text" },
            { key: "date", label: "Date (YYYY-MM-DD)", type: "text" },
            { key: "readTime", label: "Read Time", type: "text" },
          ]}
        />
      );
    }

    // ============================================
    // STORIES
    // ============================================
    if (page === "stories" && key === "hero") {
      return (
        <>
          <FieldEditor label="Title" value={String(c.title || "")} onChange={(v) => updateField("title", v)} />
          <FieldEditor label="Subtitle" value={String(c.subtitle || "")} onChange={(v) => updateField("subtitle", v)} multiline />
        </>
      );
    }

    if (page === "stories" && key === "stories") {
      return (
        <ArrayItemsEditor
          label="Student Stories"
          items={Array.isArray(c.items) ? (c.items as Record<string, string | number>[]) : []}
          onChange={(items) => setContent((prev) => ({ ...prev, items }))}
          fields={[
            { key: "avatar", label: "Avatar (emoji)", type: "text" },
            { key: "name", label: "Name", type: "text" },
            { key: "country", label: "From Country", type: "text" },
            { key: "destination", label: "Destination", type: "text" },
            { key: "program", label: "Program Name", type: "text" },
            { key: "quote", label: "Quote", type: "textarea" },
            { key: "year", label: "Year", type: "text" },
          ]}
        />
      );
    }

    // ============================================
    // DESTINATIONS
    // ============================================
    if (page === "destinations" && key === "hero") {
      return (
        <>
          <FieldEditor label="Title" value={String(c.title || "")} onChange={(v) => updateField("title", v)} />
          <FieldEditor label="Subtitle" value={String(c.subtitle || "")} onChange={(v) => updateField("subtitle", v)} multiline />
        </>
      );
    }

    if (page === "destinations" && key === "top") {
      return (
        <>
          <FieldEditor label="Section Title" value={String(c.title || "")} onChange={(v) => updateField("title", v)} />
          <ArrayItemsEditor
            label="Top Destinations"
            items={Array.isArray(c.items) ? (c.items as Record<string, string | number>[]) : []}
            onChange={(items) => setContent((prev) => ({ ...prev, items }))}
            fields={[
              { key: "flag", label: "Flag (emoji)", type: "text" },
              { key: "name", label: "Country", type: "text" },
              { key: "programs", label: "# Programs", type: "number" },
            ]}
          />
        </>
      );
    }

    if (page === "destinations" && key === "regions") {
      return (
        <>
          <FieldEditor label="Section Title" value={String(c.title || "")} onChange={(v) => updateField("title", v)} />
          <ArrayItemsEditor
            label="Regions"
            items={Array.isArray(c.items) ? (c.items as Record<string, string | number>[]) : []}
            onChange={(items) => setContent((prev) => ({ ...prev, items }))}
            fields={[
              { key: "name", label: "Name", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "countries", label: "Countries (comma separated)", type: "text" },
              { key: "count", label: "# Opportunities", type: "number" },
              { key: "color", label: "Color (tailwind)", type: "text" },
            ]}
          />
        </>
      );
    }

    // ============================================
    // FALLBACK
    // ============================================
    return (
      <div className="rounded-lg border border-dashed border-border bg-surface p-4 text-center text-sm text-text-muted">
        Section: <code className="font-mono">{section.page}/{section.section_key}</code>
      </div>
    );
  };

  return (
    <div
      className={`rounded-2xl border transition-all ${
        visible
          ? "border-border bg-card"
          : "border-dashed border-slate-300 bg-slate-50 opacity-60"
      }`}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-blue/8 text-sm">
            {section.section_key === "hero" && "🏠"}
            {section.section_key === "categories" && "📂"}
            {section.section_key === "featured" && "⭐"}
            {section.section_key === "footer" && "📎"}
            {section.section_key === "header" && "📌"}
            {section.section_key === "steps" && "📋"}
            {section.section_key === "tips" && "💡"}
            {section.section_key === "posts" && "📰"}
            {section.section_key === "stories" && "💬"}
            {section.section_key === "top" && "🌍"}
            {section.section_key === "regions" && "🗺️"}
            {section.section_key === "cta" && "📢"}
            {section.section_key === "stats" && "📊"}
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-sm font-semibold text-text-main focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          {error && (
            <span className="text-xs text-red-600 max-w-48 truncate" title={error}>
              Error saving
            </span>
          )}
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
            className={`${saved ? "bg-success" : error ? "bg-red-600" : "bg-primary"} text-white hover:opacity-90`}
            onClick={handleSave}
            disabled={isPending}
          >
            {saved ? "✓ Saved" : isPending ? "..." : error ? "Retry" : "Save"}
          </Button>
        </div>
      </div>
      <div className="space-y-4 p-5">{renderFields()}</div>
    </div>
  );
}

export function SectionEditor({ sections, page }: { sections: Section[]; page: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-text-main capitalize">
            {page.replace(/-/g, " ")} Sections
          </h2>
          <p className="text-sm text-text-muted">
            Edit each section below. Changes appear live on the site.
          </p>
        </div>
      </div>

      {sections.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <p className="text-text-muted">No sections found for this page.</p>
        </div>
      ) : (
        sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))
      )}
    </div>
  );
}
