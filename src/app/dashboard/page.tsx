import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/actions/auth";
import { getUserApplications } from "@/actions/applications";
import Link from "next/link";

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  withdrawn: "bg-slate-50 text-slate-700 border-slate-200",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: applications } = await getUserApplications();

  return (
    <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-main">Dashboard</h1>
            <p className="mt-2 text-text-muted">
              Welcome back, {user.profile?.full_name || user.email}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="text-sm text-text-muted">Total Applications</p>
              <p className="mt-1 text-3xl font-bold text-text-main">
                {applications?.length || 0}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="text-sm text-text-muted">Pending</p>
              <p className="mt-1 text-3xl font-bold text-amber-600">
                {applications?.filter((a) => a.status === "pending").length || 0}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6">
              <p className="text-sm text-text-muted">Accepted</p>
              <p className="mt-1 text-3xl font-bold text-emerald-600">
                {applications?.filter((a) => a.status === "accepted").length || 0}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-text-main">My Applications</h2>

            {applications && applications.length > 0 ? (
              <div className="mt-4 space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between rounded-2xl border border-border bg-white p-5"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-main">
                        {(app as Record<string, unknown>).opportunities
                          ? (app as Record<string, unknown>).opportunities
                            ? ((app as Record<string, unknown>).opportunities as Record<string, string>).title
                            : "Unknown"
                          : "Unknown"}
                      </h3>
                      <p className="mt-1 text-sm text-text-muted">
                        {(app as Record<string, unknown>).opportunities
                          ? `${(app as Record<string, unknown>).opportunities as Record<string, string>} `
                          : ""}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">
                        Applied:{" "}
                        {new Date(app.applied_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={statusColors[app.status]}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-border bg-white py-12 text-center">
                <p className="text-text-muted">No applications yet</p>
                <Link href="/opportunities" className="mt-4 inline-block">
                  <Button className="bg-orange text-white hover:bg-orange-hover">
                    Browse Opportunities
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
  );
}
