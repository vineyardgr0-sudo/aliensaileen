import type { Lesson } from "@/types/lesson";
import FM_001 from "@/data/lessons/FM_001";
import BM_001 from "@/data/lessons/BM_001";
import DT_001 from "@/data/lessons/DT_001";
import DL_005 from "@/data/lessons/DL_005";
import DL_006 from "@/data/lessons/DL_006";
import WP_004 from "@/data/lessons/WP_004";

// ── LESSON REGISTRY ──────────────────────────────────────────────
// To add a lesson:
// 1. Create data/lessons/XX_00N.ts
// 2. Import it here
// 3. Add to REGISTRY
// 4. Update data/categories.ts: set status: "live"
// ────────────────────────────────────────────────────────────────

const REGISTRY: Record<string, Lesson> = {
  FM_001,
  BM_001,
  DT_001,
  DL_005,
  DL_006,
  WP_004,
  // FM_002,  // preparing
  // WP_001,  // preparing
  // WP_002,  // preparing
  // WP_003,  // preparing — Group Dinner (회식) Dynamics
  // DL_001,  // preparing
};

export function getLesson(id: string): Lesson | null {
  return REGISTRY[id] ?? null;
}

export function getAllLessonIds(): string[] {
  return Object.keys(REGISTRY);
}
