import { redirect } from "next/navigation";
import { getProfile } from "@/actions/profiles";
import { getCurrentUser } from "@/actions/auth";
import { ProfileForm } from "./profile-form";
import { InterestsGoalsCard } from "./interests-goals";
import {
  Mail,
  Calendar,
  Shield,
  MapPin,
  GraduationCap,
  BookOpen,
} from "lucide-react";

const LEVEL_LABELS: Record<string, string> = {
  secundaria: "Secundaria",
  preparatoria: "Preparatoria / Bachillerato",
  universidad: "Universidad (Pregrado)",
  posgrado: "Posgrado",
  profesional: "Profesional / Egresado",
};

const FIELD_LABELS: Record<string, string> = {
  ciencias_salud: "Ciencias de la Salud",
  ciencias: "Ciencias",
  ciencias_sociales: "Ciencias Sociales",
  ingenieria: "Ingeniería",
  tecnologia: "Tecnología",
  administracion: "Administración",
  humanidades: "Humanidades",
  derecho: "Derecho",
  educacion: "Educación",
  artes: "Artes",
};

const GOAL_LABELS: Record<string, string> = {
  extranjero: "Ir al extranjero",
  maestria_doctorado: "Maestría / Doctorado",
  hospital_internacional: "Hospital Internacional",
  investigacion: "Investigación",
  voluntariado: "Voluntariado",
  startup: "Emprender / Startup",
  no_se: "Aún no lo sé",
};

function getInitials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function CuentaPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const profile = await getProfile();
  if (!profile) {
    redirect("/");
  }

  const p = profile;
  const initials = getInitials(p.full_name);
  const memberSince = formatDate(p.created_at);

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-text-main">
            Mi Cuenta
          </h1>
          <p className="mt-1 text-text-muted">
            Administra tu perfil y preferencias
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Header Card */}
          <div className="bento-shadow relative overflow-hidden rounded-2xl border border-border bg-card">
            <div className="absolute inset-0 bg-gradient-to-br from-blue/5 via-transparent to-purple/5" />
            <div className="relative z-10 flex flex-col items-center gap-6 p-8 sm:flex-row">
              <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue to-purple-600 text-2xl font-bold text-white shadow-lg">
                {initials}
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-text-main">
                  {p.full_name || "Sin nombre"}
                </h2>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <span className="flex items-center gap-1.5 text-sm text-text-muted">
                    <Mail className="size-3.5" />
                    {p.email}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-text-muted">
                    <Calendar className="size-3.5" />
                    Miembro desde {memberSince}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue/8 px-3 py-1 text-xs font-medium text-blue">
                    <Shield className="size-3" />
                    {p.role === "admin" ? "Admin" : "Estudiante"}
                  </span>
                  {p.country && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald/8 px-3 py-1 text-xs font-medium text-emerald-600">
                      <MapPin className="size-3" />
                      {p.country}
                    </span>
                  )}
                  {p.educational_level && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber/8 px-3 py-1 text-xs font-medium text-amber-600">
                      <GraduationCap className="size-3" />
                      {LEVEL_LABELS[p.educational_level] || p.educational_level}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bento-shadow rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-text-main">
                Información Personal
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                Tu nombre y datos básicos de perfil
              </p>
            </div>
            <ProfileForm
              fullName={p.full_name}
              bio={p.bio}
              country={p.country}
              university={p.university}
            />
          </div>

          {/* Educational Information */}
          <div className="bento-shadow rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-text-main">
                Información Educativa
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                Tu nivel de estudios y área de especialización
              </p>
            </div>
            <ProfileForm
              educationalLevel={p.educational_level}
              educationalField={p.educational_field}
              showEducation
            />
          </div>

          {/* Interests & Goals */}
          <InterestsGoalsCard
            interests={p.interests || []}
            goals={p.goals || []}
            fieldLabels={FIELD_LABELS}
            goalLabels={GOAL_LABELS}
          />

          {/* Account Info */}
          <div className="bento-shadow rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-text-main">
                Información de la Cuenta
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                Datos técnicos de tu cuenta
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-4">
                <label className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  Email
                </label>
                <p className="mt-1 text-sm text-text-main">{p.email}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <label className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  ID de Usuario
                </label>
                <p className="mt-1 break-all font-mono text-xs text-text-muted">
                  {p.id}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <label className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  Miembro desde
                </label>
                <p className="mt-1 text-sm text-text-main">
                  {memberSince}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <label className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  Rol
                </label>
                <p className="mt-1 text-sm text-text-main capitalize">
                  {p.role === "admin" ? "Administrador" : "Estudiante"}
                </p>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 dark:border-red-900 dark:bg-red-950/30 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/50">
                <BookOpen className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-700 dark:text-red-400">
                  Zona de Peligro
                </h3>
                <p className="text-sm text-red-600/70 dark:text-red-400/70">
                  Acciones irreversibles para tu cuenta
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-red-200 bg-white p-4 dark:border-red-800 dark:bg-card">
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="font-medium text-text-main">
                    Eliminar cuenta
                  </p>
                  <p className="text-sm text-text-muted">
                    Una vez eliminada, no podrás recuperar tus datos
                  </p>
                </div>
                <button
                  disabled
                  className="shrink-0 rounded-xl border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 opacity-50 transition-all hover:bg-red-50 disabled:cursor-not-allowed dark:border-red-800 dark:bg-transparent dark:text-red-400"
                  title="Próximamente"
                >
                  Eliminar cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
