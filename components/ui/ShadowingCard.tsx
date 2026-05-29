"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  korean: string;
  pronunciation: string;
  english: string;
  tip?: string;
  breakdownSteps?: string[];
}

export function ShadowingCard({ korean, pronunciation, english, tip, breakdownSteps }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-b-dim rounded-2xl overflow-hidden bg-s1">
      {/* Main phrase */}
      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <p className="font-syne text-[18px] font-bold text-t100 leading-tight mb-1">{korean}</p>
            <p className="font-mono text-[9px] text-mint/55 tracking-wide">{pronunciation}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-b-mid flex items-center justify-center text-t300 hover:border-mint/30 hover:text-mint transition-all"
            aria-label={isExpanded ? "Collapse" : "Show breakdown"}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={cn("transition-transform", isExpanded && "rotate-180")}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <p className="font-mono text-[9.5px] text-t300">{english}</p>
      </div>

      {/* Shadowing steps */}
      {isExpanded && (
        <div className="border-t border-b-dim px-4 py-3 bg-s2 animate-fade-up">
          {tip && (
            <div className="flex gap-2 mb-3">
              <span className="font-mono text-[7px] tracking-wider uppercase text-mint/60 px-2 py-0.5 bg-mint/[0.08] border border-mint/20 rounded-full flex-shrink-0 mt-0.5">
                Tip
              </span>
              <p className="font-mono text-[9px] text-t300 leading-[1.65]">{tip}</p>
            </div>
          )}
          {breakdownSteps && breakdownSteps.length > 0 && (
            <div>
              <p className="font-mono text-[7px] tracking-[0.18em] uppercase text-t400 mb-2">
                Practice steps
              </p>
              <div className="flex flex-col gap-1.5">
                {breakdownSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-b-mid flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-[7px] text-t400">{i + 1}</span>
                    </span>
                    <p className="font-syne text-[13px] font-bold text-t100">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
