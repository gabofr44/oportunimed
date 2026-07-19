"use client";

import { useState } from "react";
import { updateInterests, updateGoals } from "@/actions/profiles";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle, X, Plus } from "lucide-react";

const ALL_FIELDS = [
  { value: "ciencias_salud", label: "Ciencias de la Salud", color: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300" },
  { value: "ciencias", label: "Ciencias", color: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  { value: "ciencias_sociales", label: "Ciencias Sociales", color: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300" },
  { value: "ingenieria", label: "Ingeniería", color: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300" },
  { value: "tecnologia", label: "Tecnología", color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300" },
  { value: "administracion", label: "Administración", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  { value: "humanidades", label: "Humanidades", color: "bg-pink-50 text-pink-700 dark:bg-pink-950 dark:text-pink-300" },
  { value: "derecho", label: "Derecho", color: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
  { value: "educacion", label: "Educación", color: "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300" },
  { value: "artes", label: "Artes", color: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300" },
];

const ALL_GOALS = [
  { value: "extranjero", label: "Ir al extranjero", icon: "🌍" },
  { value: "maestria_doctorado", label: "Maestría / Doctorado", icon: "🎓" },
  { value: "hospital_internacional", label: "Hospital Internacional", icon: "🏥" },
  { value: "investigacion", label: "Investigación", icon: "🔬" },
  { value: "voluntariado", label: "Voluntariado", icon: "🤝" },
  { value: "startup", label: "Emprender / Startup", icon: "🚀" },
  { value: "no_se", label: "Aún no lo sé", icon: "🤷" },
];

interface InterestsGoalsCardProps {
  interests: string[];
  goals: string[];
  fieldLabels: Record<string, string>;
  goalLabels: Record<string, string>;
}

function getFieldColor(value: string): string {
  return ALL_FIELDS.find((f) => f.value === value)?.color || "bg-slate-50 text-slate-700";
}

export function InterestsGoalsCard({
  interests,
  goals,
  fieldLabels,
  goalLabels,
}: InterestsGoalsCardProps) {
  const [editingInterests, setEditingInterests] = useState(false);
  const [editingGoals, setEditingGoals] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(interests);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(goals);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSaveInterests() {
    setSaving(true);
    setStatus("idle");
    setMessage("");
    const result = await updateInterests(selectedInterests);
    if (result?.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage("Intereses actualizados");
      setEditingInterests(false);
    }
    setSaving(false);
  }

  async function handleSaveGoals() {
    setSaving(true);
    setStatus("idle");
    setMessage("");
    const result = await updateGoals(selectedGoals);
    if (result?.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage("Metas actualizadas");
      setEditingGoals(false);
    }
    setSaving(false);
  }

  function toggleInterest(value: string) {
    setSelectedInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function toggleGoal(value: string) {
    setSelectedGoals((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  return (
    <div className="bento-shadow space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
      {/* Interests */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-text-main">Intereses</h3>
            <p className="mt-1 text-sm text-text-muted">
              Áreas de conocimiento que te interesan
            </p>
          </div>
          <button
            onClick={() => {
              setEditingInterests(!editingInterests);
              setSelectedInterests(interests);
            }}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium text-blue hover:bg-blue/8 transition-colors"
          >
            {editingInterests ? (
              <>
                <X className="size-3.5" /> Cancelar
              </>
            ) : (
              <>
                <Plus className="size-3.5" /> Editar
              </>
            )}
          </button>
        </div>

        {editingInterests ? (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {ALL_FIELDS.map((field) => (
                <button
                  key={field.value}
                  onClick={() => toggleInterest(field.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedInterests.includes(field.value)
                      ? field.color + " ring-2 ring-blue/40"
                      : "border border-border bg-surface text-text-muted hover:bg-secondary"
                  }`}
                >
                  {field.label}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={handleSaveInterests}
                disabled={saving}
                className="rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Guardar intereses"
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {interests.length > 0 ? (
              interests.map((i) => (
                <span
                  key={i}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getFieldColor(i)}`}
                >
                  {fieldLabels[i] || i}
                </span>
              ))
            ) : (
              <p className="text-sm text-text-muted">
                No has seleccionado intereses aún
              </p>
            )}
          </div>
        )}
      </div>

      <hr className="border-border" />

      {/* Goals */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-text-main">Metas</h3>
            <p className="mt-1 text-sm text-text-muted">
              Tus objetivos profesionales
            </p>
          </div>
          <button
            onClick={() => {
              setEditingGoals(!editingGoals);
              setSelectedGoals(goals);
            }}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium text-blue hover:bg-blue/8 transition-colors"
          >
            {editingGoals ? (
              <>
                <X className="size-3.5" /> Cancelar
              </>
            ) : (
              <>
                <Plus className="size-3.5" /> Editar
              </>
            )}
          </button>
        </div>

        {editingGoals ? (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {ALL_GOALS.map((goal) => (
                <button
                  key={goal.value}
                  onClick={() => toggleGoal(goal.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    selectedGoals.includes(goal.value)
                      ? "bg-blue/10 text-blue ring-2 ring-blue/40"
                      : "border border-border bg-surface text-text-muted hover:bg-secondary"
                  }`}
                >
                  {goal.icon} {goal.label}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={handleSaveGoals}
                disabled={saving}
                className="rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {saving ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Guardar metas"
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {goals.length > 0 ? (
              goals.map((g) => {
                const goal = ALL_GOALS.find((a) => a.value === g);
                return (
                  <span
                    key={g}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-main"
                  >
                    {goal?.icon} {goalLabels[g] || g}
                  </span>
                );
              })
            ) : (
              <p className="text-sm text-text-muted">
                No has seleccionado metas aún
              </p>
            )}
          </div>
        )}
      </div>

      {status !== "idle" && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
            status === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
          }`}
        >
          {status === "success" ? (
            <CheckCircle className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          {message}
        </div>
      )}
    </div>
  );
}
