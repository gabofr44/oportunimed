"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  adminCreateOpportunity,
  adminUpdateOpportunity,
  adminDeleteOpportunity,
} from "@/actions/admin";
import type { Opportunity } from "@/types";

const emptyForm = {
  title: "",
  institution: "",
  location: "",
  type: "scholarship" as string,
  funding: false,
  deadline: "",
  description: "",
  link: "",
  tags: "",
  is_featured: false,
};

export function OpportunityManager({
  opportunities,
}: {
  opportunities: Opportunity[];
}) {
  const [items, setItems] = useState(opportunities);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (opp: Opportunity) => {
    setForm({
      title: opp.title,
      institution: opp.institution,
      location: opp.location,
      type: opp.type,
      funding: opp.funding,
      deadline: opp.deadline.split("T")[0],
      description: opp.description || "",
      link: opp.link || "",
      tags: opp.tags.join(", "),
      is_featured: opp.is_featured,
    });
    setEditingId(opp.id);
    setShowForm(true);
  };

  const handleSubmit = () => {
    const data = {
      title: form.title,
      institution: form.institution,
      location: form.location,
      type: form.type,
      funding: form.funding,
      deadline: form.deadline,
      description: form.description || undefined,
      link: form.link || undefined,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      is_featured: form.is_featured,
    };

    startTransition(async () => {
      if (editingId) {
        const { error } = await adminUpdateOpportunity(editingId, data);
        if (error) {
          setMessage("Error: " + error);
          return;
        }
        setItems((prev) =>
          prev.map((i) =>
            i.id === editingId ? { ...i, ...data } : i
          ) as Opportunity[]
        );
        setMessage("Updated!");
      } else {
        const { data: created, error } = await adminCreateOpportunity(data);
        if (error) {
          setMessage("Error: " + error);
          return;
        }
        setItems((prev) => [created as Opportunity, ...prev]);
        setMessage("Created!");
      }
      resetForm();
      setTimeout(() => setMessage(""), 2000);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this opportunity?")) return;
    startTransition(async () => {
      const { error } = await adminDeleteOpportunity(id);
      if (!error) {
        setItems((prev) => prev.filter((i) => i.id !== id));
        setMessage("Deleted!");
        setTimeout(() => setMessage(""), 2000);
      }
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-text-muted">
          {items.length} opportunities
        </p>
        <div className="flex gap-2">
          {message && (
            <span className="text-sm font-medium text-orange">{message}</span>
          )}
          <Button
            className="bg-orange text-white hover:bg-orange-hover"
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Cancel" : "+ New Opportunity"}
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl border border-orange/30 bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-text-main">
            {editingId ? "Edit Opportunity" : "New Opportunity"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-text-muted">
                Title *
              </label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Fulbright Scholarship 2026"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text-muted">
                Institution *
              </label>
              <Input
                value={form.institution}
                onChange={(e) =>
                  setForm({ ...form, institution: e.target.value })
                }
                placeholder="U.S. Department of State"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text-muted">
                Location *
              </label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
                placeholder="United States"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text-muted">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
              >
                <option value="scholarship">Scholarship</option>
                <option value="research">Research</option>
                <option value="internship">Internship</option>
                <option value="course">Course</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text-muted">
                Deadline *
              </label>
              <Input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-text-muted">
                Tags (comma separated)
              </label>
              <Input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="Fully Funded, Graduate, USA"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-text-muted">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                placeholder="Describe the opportunity..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-text-muted">
                Link (optional)
              </label>
              <Input
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center gap-4 sm:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.funding}
                  onChange={(e) =>
                    setForm({ ...form, funding: e.target.checked })
                  }
                  className="size-4 rounded"
                />
                <span className="text-sm">Funded</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) =>
                    setForm({ ...form, is_featured: e.target.checked })
                  }
                  className="size-4 rounded"
                />
                <span className="text-sm">Featured</span>
              </label>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              className="bg-orange text-white hover:bg-orange-hover"
              onClick={handleSubmit}
              disabled={isPending || !form.title || !form.institution}
            >
              {isPending ? "Saving..." : editingId ? "Update" : "Create"}
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((opp) => (
          <div
            key={opp.id}
            className="flex items-center justify-between rounded-xl border border-border bg-white p-4 transition-all hover:shadow-sm"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="truncate text-sm font-semibold text-text-main">
                  {opp.title}
                </h4>
                {opp.is_featured && (
                  <Badge className="bg-orange/10 text-orange text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="mt-0.5 text-xs text-text-muted">
                {opp.institution} &middot; {opp.location} &middot;{" "}
                {opp.type}
              </p>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(opp)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleDelete(opp.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
