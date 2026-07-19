import { Stethoscope } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Stethoscope className="size-8 animate-pulse text-blue" />
        <p className="text-sm text-text-muted">Cargando...</p>
      </div>
    </div>
  );
}
