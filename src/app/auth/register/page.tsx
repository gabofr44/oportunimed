"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { signUp, signInWithGoogle } from "@/actions/auth";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <AuthForm
        type="register"
        onSubmit={signUp}
        onGoogle={signInWithGoogle}
      />
    </div>
  );
}
