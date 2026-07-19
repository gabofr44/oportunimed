import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/actions/auth";
import { getUserApplications, updateApplicationStatus } from "@/actions/applications";
import { getNotificationPreferences } from "@/actions/notifications";
import Link from "next/link";
import { FileText, Clock, CheckCircle, ArrowUpRight, Eye, XCircle, Bell, BellRing } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  rejected: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
  withdrawn: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700",
};

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  accepted: "Aceptado",
  rejected: "Rechazado",
  withdrawn: "Retirado",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (!user.profile?.onboarding_complete) {
    redirect("/onboarding");
  }

  const { data: applications } = await getUserApplications();
  const { data: notifPrefs } = await getNotificationPreferences();
  const total = applications?.length || 0;
  const pending = applications?.filter((a) => a.status === "pending").length || 0;
  const accepted = applications?.filter((a) => a.status === "accepted").length || 0;

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-text-main">Dashboard</h1>
          <p className="mt-2 text-text-muted">
            Bienvenido, {user.profile?.full_name || user.email}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total postulaciones", value: total, icon: <FileText className="size-5 text-blue" /> },
            { label: "Pendientes", value: pending, icon: <Clock className="size-5 text-amber-500" /> },
            { label: "Aceptadas", value: accepted, icon: <CheckCircle className="size-5 text-success" /> },
          ].map((stat) => (
            <div key={stat.label} className="bento-shadow rounded-2xl border border-border bg-card p-6 noise">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-text-muted">{stat.label}</p>
                  {stat.icon}
                </div>
                <p className="mt-2 text-3xl font-bold text-text-main">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-text-main">Mis postulaciones</h2>

          {applications && applications.length > 0 ? (
            <div className="mt-4 space-y-3">
              {applications.map((app) => {
                const oppData = (app as Record<string, unknown>).opportunities as Record<string, string> | null;
                const oppId = app.opportunity_id;
                return (
                  <div
                    key={app.id}
                    className="bento-shadow flex items-center justify-between rounded-2xl border border-border bg-card p-5 noise"
                  >
                    <div className="relative z-10 flex-1">
                      <h3 className="font-semibold text-text-main">
                        {oppData?.title || "Desconocido"}
                      </h3>
                      <p className="mt-1 text-xs text-text-muted">
                        Postulado:{" "}
                        {new Date(app.applied_at).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="relative z-10 flex items-center gap-3">
                      {oppId && (
                        <Link href={`/opportunities/${oppId}`}>
                          <Button variant="outline" size="sm" className="rounded-xl text-xs">
                            <Eye className="mr-1 size-3" />
                            Ver
                          </Button>
                        </Link>
                      )}
                      {app.status === "pending" && (
                        <form action={async () => {
                          "use server";
                          await updateApplicationStatus(app.id, "withdrawn");
                        }}>
                          <Button type="submit" variant="outline" size="sm" className="rounded-xl text-xs border-red-200 text-red-600 hover:bg-red-50">
                            <XCircle className="mr-1 size-3" />
                            Retirar
                          </Button>
                        </form>
                      )}
                      <Badge variant="outline" className={statusColors[app.status]}>
                        {statusLabels[app.status] || app.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-border bg-card py-12 text-center">
              <p className="text-text-muted">Aún no tienes postulaciones</p>
              <Link href="/opportunities" className="mt-4 inline-block">
                <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                  Explorar convocatorias
                  <ArrowUpRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-text-main flex items-center gap-2">
            <Bell className="size-5 text-blue" />
            Alertas de nuevas convocatorias
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Recibe notificaciones cuando publiquemos oportunidades que coincidan con tu perfil.
          </p>

          <div className="mt-4 rounded-2xl border border-border bg-card p-6 noise">
            <div className="relative z-10">
              {notifPrefs?.active ? (
                <div className="flex items-center gap-3">
                  <BellRing className="size-8 text-primary" />
                  <div>
                    <p className="font-semibold text-text-main">Alertas activas</p>
                    <p className="text-xs text-text-muted">
                      {notifPrefs.types?.length ? `Tipos: ${notifPrefs.types.join(", ")}` : "Todos los tipos"}
                      {notifPrefs.fields?.length ? ` · Campos: ${notifPrefs.fields.join(", ")}` : ""}
                      {notifPrefs.email ? ` · Enviar a: ${notifPrefs.email}` : ""}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-text-muted">No tienes alertas configuradas.</p>
              )}
              <div className="mt-4 flex gap-3">
                <Link href="/dashboard/alertas">
                  <Button variant={notifPrefs?.active ? "outline" : "default"} className="rounded-xl text-sm">
                    {notifPrefs?.active ? "Editar alertas" : "Configurar alertas"}
                  </Button>
                </Link>
                <Link href="/proximos">
                  <Button variant="outline" className="rounded-xl text-sm">
                    Ver próximos 30 días
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
