"use client";

import { useState } from "react";
import { updateProfile } from "@/actions/profiles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const LEVEL_OPTIONS = [
  { value: "secundaria", label: "Secundaria" },
  { value: "preparatoria", label: "Preparatoria / Bachillerato" },
  { value: "universidad", label: "Universidad (Pregrado)" },
  { value: "posgrado", label: "Posgrado" },
  { value: "profesional", label: "Profesional / Egresado" },
];

const FIELD_OPTIONS = [
  { value: "", label: "Selecciona un campo" },
  { value: "ciencias_salud", label: "Ciencias de la Salud" },
  { value: "ciencias", label: "Ciencias" },
  { value: "ciencias_sociales", label: "Ciencias Sociales" },
  { value: "ingenieria", label: "Ingeniería" },
  { value: "tecnologia", label: "Tecnología" },
  { value: "administracion", label: "Administración" },
  { value: "humanidades", label: "Humanidades" },
  { value: "derecho", label: "Derecho" },
  { value: "educacion", label: "Educación" },
  { value: "artes", label: "Artes" },
];

interface ProfileFormProps {
  fullName?: string | null;
  bio?: string | null;
  country?: string | null;
  university?: string | null;
  educationalLevel?: string | null;
  educationalField?: string | null;
  showEducation?: boolean;
}

export function ProfileForm({
  fullName,
  bio,
  country,
  university,
  educationalLevel,
  educationalField,
  showEducation,
}: ProfileFormProps) {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await updateProfile(formData);

    if (result?.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage("Guardado correctamente");
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!showEducation ? (
        <>
          <div>
            <label htmlFor="full_name" className="mb-1 block text-sm font-medium text-text-main">
              Nombre completo
            </label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              defaultValue={fullName || ""}
              placeholder="Tu nombre completo"
              className="rounded-xl"
            />
          </div>
          <div>
            <label htmlFor="bio" className="mb-1 block text-sm font-medium text-text-main">
              Biografía
            </label>
            <textarea
              id="bio"
              name="bio"
              defaultValue={bio || ""}
              placeholder="Cuéntanos un poco sobre ti..."
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="country" className="mb-1 block text-sm font-medium text-text-main">
                País
              </label>
              <Input
                id="country"
                name="country"
                type="text"
                defaultValue={country || ""}
                placeholder="Tu país de origen"
                className="rounded-xl"
              />
            </div>
            <div>
              <label htmlFor="university" className="mb-1 block text-sm font-medium text-text-main">
                Universidad / Institución
              </label>
              <Input
                id="university"
                name="university"
                type="text"
                defaultValue={university || ""}
                placeholder="Nombre de tu universidad"
                className="rounded-xl"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="educational_level" className="mb-1 block text-sm font-medium text-text-main">
                Nivel educativo
              </label>
              <select
                id="educational_level"
                name="educational_level"
                defaultValue={educationalLevel || ""}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-main focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
              >
                <option value="">Selecciona tu nivel</option>
                {LEVEL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="educational_field" className="mb-1 block text-sm font-medium text-text-main">
                Campo de estudio
              </label>
              <select
                id="educational_field"
                name="educational_field"
                defaultValue={educationalField || ""}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-main focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20"
              >
                {FIELD_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      {status === "success" && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
          <CheckCircle className="size-4 shrink-0" />
          {message}
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          <AlertCircle className="size-4 shrink-0" />
          {message}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </div>
    </form>
  );
}
