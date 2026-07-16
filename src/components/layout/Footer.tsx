import Link from "next/link";
import { Stethoscope } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Stethoscope className="size-4" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-text-main">
                Oportuni<span className="text-blue">Med</span>
              </span>
              <p className="mt-0.5 text-xs text-text-muted">
                Una plataforma para estudiantes de medicina.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-text-muted">
            <Link href="/how-to-apply" className="hover:text-text-main transition-colors">Contacto</Link>
            <a href="https://github.com/gabofr44/oportunimed" target="_blank" rel="noopener noreferrer" className="hover:text-text-main transition-colors">Github</a>
            <a href="#" className="hover:text-text-main transition-colors">X</a>
            <Link href="/privacy" className="hover:text-text-main transition-colors">Privacidad</Link>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-text-muted">
          © {new Date().getFullYear()} OportuniMed. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
