"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stethoscope, Lock } from "lucide-react";

export function AdminGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "oportunimed2026") {
      sessionStorage.setItem("admin_unlocked", "true");
      onUnlock();
    } else {
      setError("Contraseña incorrecta");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="bento-shadow w-full max-w-sm rounded-2xl border border-border bg-card p-8 noise">
        <div className="relative z-10 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Stethoscope className="size-6" />
          </div>
          <h1 className="text-xl font-bold text-text-main">Panel de Admin</h1>
          <p className="mt-1 text-sm text-text-muted">
            Ingresa la contraseña para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 mt-6 space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <Input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Contraseña"
              className="rounded-xl pl-9"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
