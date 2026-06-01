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
        <div key={i} className="flex items-center py-4 border-b border-[rgba(255,255,255,0.07)] last:border-0 gap-4 animate-fade-up">
          <div className="flex-1">
            <div className="flex items-baseline gap-2.5 mb-1">
              <p className="font-syne text-[16px] font-bold text-t100">{item.word}</p>
              {item.pronunciation && (
                <p className="font-mono text-[10px] font-medium text-mint/60">[{item.pronunciation}]</p>
              )}
            </div>
            <p className="font-mono text-xs text-t300">{item.usage}</p>
          </div>
          <div className="text-right flex-shrink-0 flex items-center gap-3">
            <p className="font-syne text-sm font-bold text-t200">{item.meaning}</p>
            {lessonId && (
              <button
                onClick={() => toggleSave(item.word)}
                aria-label={saved.has(item.word) ? "Remove saved" : "Save expression"}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                  saved.has(item.word)
                    ? "border-mint/45 bg-mint/10 text-mint"
                    : "border-[rgba(255,255,255,0.12)] text-t400 hover:border-mint/30 hover:text-mint"
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12"
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
