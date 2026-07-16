import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-main">Error de autenticación</h1>
        <p className="mt-2 text-text-muted">
          Algo salió mal durante la autenticación. Por favor, intenta de nuevo.
        </p>
        <Link href="/auth/login" className="mt-6 inline-block">
          <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
            Volver al inicio de sesión
          </Button>
        </Link>
      </div>
    </div>
  );
}
