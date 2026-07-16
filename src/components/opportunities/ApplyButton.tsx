"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { applyToOpportunity } from "@/actions/applications";

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
      setMessage("Application submitted successfully!");
    }
  };

  if (status === "success") {
    return (
      <Button size="lg" disabled className="bg-emerald-600 text-white">
        <svg className="mr-2 size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Applied
      </Button>
    );
  }

  return (
    <div>
      <Button
        size="lg"
        className="bg-orange text-white hover:bg-orange-hover"
        onClick={handleApply}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Applying..." : "Apply Now"}
      </Button>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">{message}</p>
      )}
    </div>
  );
}
