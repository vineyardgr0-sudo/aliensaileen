"use client";

import { useState, useEffect } from "react";
import type { VocabularyItem } from "@/types/lesson";
import { progressStore } from "@/lib/progress/store";

interface Props {
  items: VocabularyItem[];
  lessonId?: string;
}

export default function VocabSection({ items, lessonId }: Props) {
  const [saved, setSaved] = useState<Set<string>>(new Set());

  // Fix A: initialize saved state from progressStore on mount + when lessonId changes
  useEffect(() => {
    if (!lessonId) return;
    const lp = progressStore.getLesson(lessonId);
    setSaved(new Set(lp.savedExpressions ?? []));
  }, [lessonId]);

  if (!items?.length) return null;

  function toggleSave(word: string) {
    if (!lessonId) return;
    const next = new Set(saved);
    if (next.has(word)) {
      next.delete(word);
      progressStore.removeExpression(lessonId, word);
    } else {
      next.add(word);
      progressStore.saveExpression(lessonId, word);
    }
    setSaved(next);
  }

  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div key={i} className="flex items-center py-3 border-b border-b-dim last:border-0 gap-3">
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-0.5">
              <p className="font-syne text-[15px] font-bold text-t100">{item.word}</p>
              {item.pronunciation && (
                <p className="font-mono text-[8px] text-mint/45">{item.pronunciation}</p>
              )}
            </div>
            <p className="font-mono text-[8.5px] text-t400">{item.usage}</p>
          </div>
          <div className="text-right flex-shrink-0 flex items-center gap-2">
            <p className="font-syne text-[11px] font-bold text-t200">{item.meaning}</p>
            {lessonId && (
              <button
                onClick={() => toggleSave(item.word)}
                aria-label={saved.has(item.word) ? "Remove saved" : "Save expression"}
                className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                  saved.has(item.word)
                    ? "border-mint/40 bg-mint/10 text-mint"
                    : "border-b-mid text-t400 hover:border-mint/30 hover:text-mint/60"
                }`}
              >
                <svg width="10" height="10" viewBox="0 0 12 12"
                  fill={saved.has(item.word) ? "currentColor" : "none"}
                  stroke="currentColor" strokeWidth="1.3"
                  strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 2h8v9L6 8.5 2 11V2z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
