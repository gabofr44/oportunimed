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
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

const emptyForm = {
  title: "",
  institution: "",
  location: "",
  type: "scholarship" as string,
  subtype: "" as string,
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
      subtype: opp.subtype || "",
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
      subtype: form.subtype || undefined,
      funding: form.funding,
      deadline: form.deadline,
      description: form.description || undefined,
      link: form.link || undefined,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
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
          prev.map((i) => (i.id === editingId ? { ...i, ...data } : i)) as Opportunity[]
        );
        setMessage("Actualizado!");
      } else {
        const { data: created, error } = await adminCreateOpportunity(data);
        if (error) {
          setMessage("Error: " + error);
          return;
        }
        setItems((prev) => [created as Opportunity, ...prev]);
        setMessage("Creado!");
      }
      resetForm();
      setTimeout(() => setMessage(""), 2000);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar esta convocatoria?")) return;
    startTransition(async () => {
      const { error } = await adminDeleteOpportunity(id);
      if (!error) {
        setItems((prev) => prev.filter((i) => i.id !== id));
        setMessage("Eliminado!");
        setTimeout(() => setMessage(""), 2000);
      }
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-text-muted">
          {items.length} convocatorias
        </p>
        <div className="flex gap-2">
          {message && (
            <span className={`text-sm font-medium ${message.startsWith("Error") ? "text-red-600" : "text-blue"}`}>{message}</span>
          )}
          <Button
            className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Cancelar" : <><Plus className="mr-1 size-4" /> Nueva convocatoria</>}
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="mb-8 bento-shadow rounded-2xl border border-blue/20 bg-card p-6 noise">
          <div className="relative z-10">
            <h3 className="mb-4 text-lg font-semibold text-text-main">
              {editingId ? "Editar convocatoria" : "Nueva convocatoria"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-text-muted">Título *</label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Beca Fulbright 2026" className="rounded-xl" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-text-muted">Institución *</label>
                <Input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })} placeholder="U.S. Department of State" className="rounded-xl" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-text-muted">Ubicación *</label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Estados Unidos" className="rounded-xl" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-text-muted">Tipo</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value, subtype: "" })} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm">
                  <option value="scholarship">Beca</option>
                  <option value="research">Investigación</option>
                  <option value="internship">Internship</option>
                  <option value="internado_ss">Internado y SS</option>
                  <option value="course">Curso</option>
                  <option value="event">Evento</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-text-muted">Subcategoría</label>
                <select value={form.subtype} onChange={(e) => setForm({ ...form, subtype: e.target.value })} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm">
                  <option value="">Sin subcategoría</option>
                  {form.type === "scholarship" && <><option value="full_scholarship">Beca Completa</option><option value="fellowship">Fellowship</option><option value="government">Gubernamental</option><option value="need_based">Necesidad Económica</option><option value="merit_based">Mérito Académico</option><option value="travel_grant">Travel Grant</option></>}
                  {form.type === "internship" && <><option value="corporate">Corporativo</option><option value="un_international">Organismo Internacional</option><option value="consulting">Consultoría</option><option value="tech">Tecnología</option><option value="research_internship">Investigación</option></>}
                  {form.type === "internado_ss" && <><option value="internado_pregrado">Internado Médico Pregrado</option><option value="servicio_social">Servicio Social</option></>}
                  {form.type === "research" && <><option value="phd">Doctorado</option><option value="postdoc">Postdoctorado</option><option value="research_fellowship">Fellowship Investigación</option><option value="clinical_fellowship">Fellowship Clínico</option><option value="summer_research">Verano de Investigación</option><option value="winter_research">Invierno de Investigación</option><option value="observership">Observership</option></>}
                  {form.type === "course" && <><option value="online">En Línea</option><option value="certification">Certificación</option><option value="bootcamp">Bootcamp</option><option value="summer_school">Escuela de Verano</option><option value="short_program">Programa Corto</option><option value="mentorship">Mentoría</option></>}
                  {form.type === "event" && <><option value="congress">Congreso</option><option value="hackathon">Hackathon</option><option value="competition">Competencia</option><option value="conference">Conferencia</option><option value="exchange">Intercambio</option><option value="mission_brain">Mission Brain</option><option value="student_chapter">Capítulo Estudiantil</option></>}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-text-muted">Deadline *</label>
                <Input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="rounded-xl" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-text-muted">Tags (separados por coma)</label>
                <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="Financiado, Graduado, USA" className="rounded-xl" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-text-muted">Descripción</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm" placeholder="Describe la oportunidad..." />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-text-muted">Enlace (opcional)</label>
                <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." className="rounded-xl" />
              </div>
              <div className="flex items-center gap-4 sm:col-span-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.funding} onChange={(e) => setForm({ ...form, funding: e.target.checked })} className="size-4 rounded" />
                  <span className="text-sm">Financiado</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="size-4 rounded" />
                  <span className="text-sm">Destacado</span>
                </label>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleSubmit} disabled={isPending || !form.title || !form.institution}>
                {isPending ? <Loader2 className="mr-1 size-4 animate-spin" /> : null}
                {isPending ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
              </Button>
              <Button variant="outline" className="rounded-xl" onClick={resetForm}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((opp) => (
          <div key={opp.id} className="bento-shadow flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:shadow-sm noise">
            <div className="relative z-10 flex min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className="truncate text-sm font-semibold text-text-main">{opp.title}</h4>
                {opp.is_featured && (
                  <Badge className="bg-blue/8 text-blue text-xs">Destacado</Badge>
                )}
              </div>
            </div>
            <div className="relative z-10 flex gap-1">
              <Button variant="ghost" size="sm" onClick={() => handleEdit(opp)}>
                <Pencil className="size-3.5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(opp.id)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
