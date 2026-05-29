"use client";

import { useState, useEffect, useCallback } from "react";
import {
  progressStore,
  type UserProgress,
  type LessonProgress,
  DEFAULT_PROGRESS,
} from "@/lib/progress/store";

// Fix B: don't call progressStore.get() on every render.
// Use a stable DEFAULT_PROGRESS for SSR, hydrate after mount.
export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [mounted, setMounted] = useState(false);

  const refresh = useCallback(() => setProgress(progressStore.get()), []);

  useEffect(() => {
    // Hydrate from localStorage after mount — avoids SSR/CSR mismatch
    setProgress(progressStore.get());
    setMounted(true);

    const handler = (e: StorageEvent) => {
      if (e.key === "aa_progress_v2") setProgress(progressStore.get());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return {
    progress,
    mounted,
    getLesson: (id: string): LessonProgress => progressStore.getLesson(id),
    markComplete: (id: string, score: number, correct: boolean) => {
      progressStore.markComplete(id, score, correct);
      refresh();
    },
    toggleBookmark: (id: string) => {
      const result = progressStore.toggleBookmark(id);
      refresh();
      return result;
    },
    saveExpression: (id: string, expr: string) => {
      progressStore.saveExpression(id, expr);
      refresh();
    },
    removeExpression: (id: string, expr: string) => {
      progressStore.removeExpression(id, expr);
      refresh();
    },
    completeOnboarding: () => {
      progressStore.completeOnboarding();
      refresh();
    },
    refresh,
  };
}

export function useLessonProgress(lessonId: string) {
  const [lp, setLp] = useState<LessonProgress>(() =>
    progressStore.defaultLesson(lessonId)
  );

  const refresh = useCallback(
    () => setLp(progressStore.getLesson(lessonId)),
    [lessonId]
  );

  useEffect(() => {
    refresh();
    const handler = (e: StorageEvent) => {
      if (e.key === "aa_progress_v2") refresh();
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [lessonId, refresh]);

  return { lp, refresh };
}
