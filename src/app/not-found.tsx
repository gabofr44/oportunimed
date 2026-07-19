import Link from "next/link";
import { Stethoscope } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-blue/5 text-3xl">
        <Stethoscope className="size-8 text-blue" />
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight text-text-main">404</h1>
      <p className="mt-2 text-lg text-text-muted">Página no encontrada</p>
      <p className="mt-1 text-sm text-text-muted">La página que buscas no existe o fue movida.</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.03]"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
