import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Props {
  searchParams: Promise<{ reason?: string; detail?: string }>;
}

export default async function AuthErrorPage({ searchParams }: Props) {
  const { reason, detail } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-main">Error de autenticación</h1>
        <p className="mt-2 text-text-muted">
          Algo salió mal durante la autenticación. Por favor, intenta de nuevo.
        </p>
        {(reason || detail) && (
          <div className="mt-4 mx-auto max-w-md rounded-xl border border-red-200 bg-red-50 p-4 text-left text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {reason && <p><strong>Tipo:</strong> {reason}</p>}
            {detail && <p className="mt-1 break-words"><strong>Detalle:</strong> {detail}</p>}
          </div>
        )}
        <Link href="/auth/login" className="mt-6 inline-block">
          <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
            Volver al inicio de sesión
          </Button>
        </Link>
      </div>
    </div>
  );
}