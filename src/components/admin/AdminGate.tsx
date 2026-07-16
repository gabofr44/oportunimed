"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "oportunimed2026") {
      sessionStorage.setItem("admin_unlocked", "true");
      onUnlock();
    } else {
      setError("Wrong password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-orange text-xl text-white font-bold">
            GP
          </div>
          <h1 className="mt-4 text-xl font-bold text-text-main">Admin Panel</h1>
          <p className="mt-1 text-sm text-text-muted">
            Enter the admin password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Password"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-orange text-white hover:bg-orange-hover"
          >
            Enter
          </Button>
        </form>
      </div>
    </div>
  );
}
