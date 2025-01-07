"use client";

import React from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  aiResponse: string | null;
}

const CopyButton: React.FC<CopyButtonProps> = ({ aiResponse }) => {
  const handleCopy = () => {
    if (aiResponse) {
      navigator.clipboard
        .writeText(aiResponse)
        .then(() => toast.success("Copied to clipboard!"))
        .catch(() => toast.error("Failed to copy!"));
    } else {
      toast.info("No content to copy.");
    }
  };

  return (
    <Button variant="ghost" className="text-primary" onClick={handleCopy}>
      Copy
    </Button>
  );
};

export default CopyButton;
