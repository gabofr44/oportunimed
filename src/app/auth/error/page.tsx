import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-main">Authentication Error</h1>
        <p className="mt-2 text-text-muted">
          Something went wrong during authentication. Please try again.
        </p>
        <Link href="/auth/login" className="mt-6 inline-block">
          <Button className="bg-orange text-white hover:bg-orange-hover">
            Back to Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
