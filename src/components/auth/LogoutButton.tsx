import { signOut } from "@/actions/auth";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-text-main transition-all hover:border-blue/30 hover:shadow-sm sm:w-auto"
      >
        <LogOut className="size-4" />
        Cerrar sesión
      </button>
    </form>
  );
}