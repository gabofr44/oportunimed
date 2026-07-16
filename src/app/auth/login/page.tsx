"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { signIn, signInWithGoogle } from "@/actions/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <AuthForm
        type="login"
        onSubmit={signIn}
        onGoogle={signInWithGoogle}
      />
    </div>
  );
}
