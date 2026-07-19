import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/actions/auth";
import { getNotificationPreferences, saveNotificationPreferences } from "@/actions/notifications";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const typeOptions = [
  { value: "scholarship", label: "Becas" },
  { value: "research", label: "Investigación" },
  { value: "internship", label: "Internships" },
  { value: "internado_ss", label: "Internado y SS" },
  { value: "course", label: "Cursos" },
  { value: "event", label: "Eventos" },
];

const fieldOptions = [
  { value: "general", label: "General" },
  { value: "ciencias_salud", label: "Ciencias de la Salud" },
  { value: "ciencias", label: "Ciencias" },
  { value: "ingenieria", label: "Ingeniería" },
  { value: "tecnologia", label: "Tecnología" },
  { value: "administracion", label: "Administración" },
  { value: "humanidades", label: "Humanidades" },
  { value: "derecho", label: "Derecho" },
  { value: "educacion", label: "Educación" },
  { value: "artes", label: "Artes" },
];

const levelOptions = [
  { value: "secundaria", label: "Secundaria" },
  { value: "preparatoria", label: "Preparatoria" },
  { value: "universidad", label: "Universidad" },
  { value: "posgrado", label: "Posgrado" },
  { value: "profesional", label: "Profesional" },
];

export default async function AlertasPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const { data: prefs } = await getNotificationPreferences();

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-blue transition-colors">
          <ArrowLeft className="size-4" />
          Volver al dashboard
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-text-main">Alertas</h1>
        <p className="mt-2 text-text-muted">
          Configura qué tipo de oportunidades quieres recibir por correo.
        </p>

        <form action={async (formData: FormData) => {
          "use server";
          const types = formData.getAll("types") as string[];
          const fields = formData.getAll("fields") as string[];
          const levels = formData.getAll("levels") as string[];
          const email = formData.get("email") as string;
          const frequency = formData.get("frequency") as string;
          const active = formData.has("active");

          await saveNotificationPreferences({
            email: email || undefined,
            types: types.length > 0 ? types : undefined,
            fields: fields.length > 0 ? fields : undefined,
            levels: levels.length > 0 ? levels : undefined,
            frequency,
            active,
          });
        }}>
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 noise">
              <div className="relative z-10">
                <h2 className="text-lg font-semibold text-text-main">Correo electrónico</h2>
                <input
                  type="email"
                  name="email"
                  defaultValue={prefs?.email || user.email || ""}
                  placeholder="tu@correo.com"
                  className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-main outline-none focus:border-blue"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 noise">
              <div className="relative z-10">
                <h2 className="text-lg font-semibold text-text-main">Tipos de oportunidad</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {typeOptions.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-main cursor-pointer hover:border-blue/30 has-[:checked]:border-blue has-[:checked]:bg-blue/5">
                      <input
                        type="checkbox"
                        name="types"
                        value={opt.value}
                        defaultChecked={!prefs?.types || prefs.types.includes(opt.value)}
                        className="size-4 rounded border-border text-blue"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 noise">
              <div className="relative z-10">
                <h2 className="text-lg font-semibold text-text-main">Campos educativos</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {fieldOptions.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-main cursor-pointer hover:border-blue/30 has-[:checked]:border-blue has-[:checked]:bg-blue/5">
                      <input
                        type="checkbox"
                        name="fields"
                        value={opt.value}
                        defaultChecked={!prefs?.fields || prefs.fields.includes(opt.value)}
                        className="size-4 rounded border-border text-blue"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 noise">
              <div className="relative z-10">
                <h2 className="text-lg font-semibold text-text-main">Nivel educativo</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {levelOptions.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-main cursor-pointer hover:border-blue/30 has-[:checked]:border-blue has-[:checked]:bg-blue/5">
                      <input
                        type="checkbox"
                        name="levels"
                        value={opt.value}
                        defaultChecked={!prefs?.levels || prefs.levels.includes(opt.value)}
                        className="size-4 rounded border-border text-blue"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 noise">
              <div className="relative z-10">
                <h2 className="text-lg font-semibold text-text-main">Frecuencia</h2>
                <select name="frequency" defaultValue={prefs?.frequency || "daily"} className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-main">
                  <option value="instant">Inmediata (cada nueva convocatoria)</option>
                  <option value="daily">Resumen diario</option>
                  <option value="weekly">Resumen semanal</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 noise cursor-pointer">
              <input type="checkbox" name="active" defaultChecked={prefs?.active !== false} className="size-5 rounded border-border text-blue" />
              <div>
                <p className="font-semibold text-text-main">Activar alertas</p>
                <p className="text-sm text-text-muted">Recibe notificaciones según tu configuración</p>
              </div>
            </label>

            <Button type="submit" className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 py-6">
              Guardar configuración
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
