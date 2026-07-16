"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { applyToOpportunity } from "@/actions/applications";
import { CheckCircle, Loader2 } from "lucide-react";

interface ApplyButtonProps {
  opportunityId: string;
}

export function ApplyButton({ opportunityId }: ApplyButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    setStatus("loading");
    const result = await applyToOpportunity(opportunityId);
    if (result.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage("¡Postulación enviada exitosamente!");
    }
  };

  if (status === "success") {
    return (
      <Button size="lg" disabled className="rounded-xl bg-success text-white">
        <CheckCircle className="mr-2 size-4" />
        Postulado
      </Button>
    );
  }

  return (
    <div>
      <Button
        size="lg"
        className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={handleApply}
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Postular ahora"
        )}
      </Button>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">{message}</p>
      )}
    </div>
  );
}
