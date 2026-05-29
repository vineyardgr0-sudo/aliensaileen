"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  lessonId: string;
  expression: string;
  initialSaved?: boolean;
  onToggle?: (saved: boolean, expression: string) => void;
}

export function BookmarkButton({ lessonId, expression, initialSaved = false, onToggle }: Props) {
  const [saved, setSaved] = useState(initialSaved);

  function toggle() {
    const next = !saved;
    setSaved(next);
    onToggle?.(next, expression);
  }

  return (
    <button
      onClick={toggle}
      aria-label={saved ? "Remove bookmark" : "Save expression"}
      className={cn(
        "w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200",
        saved
          ? "border-mint/40 bg-mint/10 text-mint"
          : "border-b-dim text-t400 hover:border-mint/30 hover:text-mint/60"
      )}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 2h8v9L6 8.5 2 11V2z"/>
      </svg>
    </button>
  );
}
