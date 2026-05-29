// ═══════════════════════════════════════════════════════════
// ALIENSAILEEN — Progress Store
// localStorage-based. Zero backend cost. Ready for Supabase.
// ═══════════════════════════════════════════════════════════

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  decisionCorrect: boolean | null;
  quizScore: number;
  completedAt: string | null;
  bookmarked: boolean;
  savedExpressions: string[];
  timeSpentSeconds: number;
}

export interface UserProgress {
  lessons: Record<string, LessonProgress>;
  totalCompleted: number;
  streakDays: number;
  lastActiveDate: string | null;
  onboardingComplete: boolean;
}

const KEY = "aa_progress_v2";

// Exported so hooks can use as stable initial value (avoids SSR mismatch)
export const DEFAULT_PROGRESS: UserProgress = {
  lessons: {},
  totalCompleted: 0,
  streakDays: 0,
  lastActiveDate: null,
  onboardingComplete: false,
};

function defaultLessonInternal(lessonId: string): LessonProgress {
  return {
    lessonId,
    completed: false,
    decisionCorrect: null,
    quizScore: 0,
    completedAt: null,
    bookmarked: false,
    savedExpressions: [],
    timeSpentSeconds: 0,
  };
}

function load(): UserProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function save(data: UserProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Storage quota exceeded — fail silently
  }
}

export const progressStore = {
  get(): UserProgress {
    return load();
  },

  // Exposed so hooks can initialize without calling get()
  defaultLesson(lessonId: string): LessonProgress {
    return defaultLessonInternal(lessonId);
  },

  getLesson(lessonId: string): LessonProgress {
    const data = load();
    return data.lessons[lessonId] ?? defaultLessonInternal(lessonId);
  },

  markComplete(lessonId: string, score: number, decisionCorrect: boolean): void {
    const data = load();
    const existing = data.lessons[lessonId] ?? defaultLessonInternal(lessonId);
    const wasCompleted = existing.completed;

    data.lessons[lessonId] = {
      ...existing,
      completed: true,
      quizScore: score,
      decisionCorrect,
      completedAt: new Date().toISOString(),
    };

    if (!wasCompleted) {
      data.totalCompleted += 1;
      const today = new Date().toDateString();
      const last = data.lastActiveDate;
      if (last !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        data.streakDays = last === yesterday ? data.streakDays + 1 : 1;
        data.lastActiveDate = today;
      }
    }

    save(data);
  },

  toggleBookmark(lessonId: string): boolean {
    const data = load();
    const lesson = data.lessons[lessonId] ?? defaultLessonInternal(lessonId);
    lesson.bookmarked = !lesson.bookmarked;
    data.lessons[lessonId] = lesson;
    save(data);
    return lesson.bookmarked;
  },

  saveExpression(lessonId: string, expression: string): void {
    const data = load();
    const lesson = data.lessons[lessonId] ?? defaultLessonInternal(lessonId);
    if (!lesson.savedExpressions.includes(expression)) {
      lesson.savedExpressions = [...lesson.savedExpressions, expression];
      data.lessons[lessonId] = lesson;
      save(data);
    }
  },

  removeExpression(lessonId: string, expression: string): void {
    const data = load();
    const lesson = data.lessons[lessonId] ?? defaultLessonInternal(lessonId);
    lesson.savedExpressions = lesson.savedExpressions.filter((e) => e !== expression);
    data.lessons[lessonId] = lesson;
    save(data);
  },

  completeOnboarding(): void {
    const data = load();
    data.onboardingComplete = true;
    save(data);
  },

  reset(): void {
    if (typeof window !== "undefined") localStorage.removeItem(KEY);
  },
};
