import type { CategoryManifest } from "@/types/lesson";

export const CATEGORIES: CategoryManifest[] = [
  {
    id: "fan_meeting", num: "01", name: "Fan Meeting", color: "#00e5b4",
    tagline: "K-pop idol interaction — hierarchy, warmth, emotional calibration.",
    description: "K-pop idol interaction. Learn how to speak naturally at fan meetings — the right register, the right warmth.",
    lessons: [
      { id: "FM_001", title: "First Greeting", sub: "Fan sign event · RM or V · Beginner", status: "live", level: "beginner", estimated_minutes: 8 },
      { id: "FM_002", title: "Complimenting Appearance", sub: "Fan sign event · Beginner", status: "preparing", level: "beginner", estimated_minutes: 8 },
      { id: "FM_003", title: "Expressing Long-term Support", sub: "Fan sign event · Beginner", status: "preparing", level: "beginner", estimated_minutes: 7 },
      { id: "FM_004", title: "Asking a Question", sub: "Fan sign event · Intermediate", status: "preparing", level: "intermediate", estimated_minutes: 10 },
    ],
  },
  {
    id: "dating", num: "02", name: "Dating", color: "#f472b6",
    tagline: "Romantic context — emotional distance calibration across relationship stages.",
    description: "Romantic Korean. From 썸 to established relationship — how tone signals emotional distance, and how the language shifts as closeness grows.",
    lessons: [
      { id: "DT_001", title: "썸 to Closer — Tone Shift", sub: "Post-date · 썸 or established · Beginner", status: "live", level: "beginner", estimated_minutes: 9 },
      { id: "DT_002", title: "Expressing Affection Naturally", sub: "Casual setting · Beginner", status: "preparing", level: "beginner", estimated_minutes: 8 },
      { id: "DT_003", title: "말 놓기 — Dropping Formality", sub: "Milestone conversation · Intermediate", status: "preparing", level: "intermediate", estimated_minutes: 10 },
      { id: "DT_004", title: "Conflict and Repair", sub: "Text / call · Intermediate", status: "preparing", level: "intermediate", estimated_minutes: 12 },
    ],
  },
  {
    id: "workplace", num: "03", name: "Workplace", color: "#818cf8",
    tagline: "Professional Korean — formality shifts, hierarchy, team dynamics.",
    description: "Korean business communication. The invisible rules of first meetings, hierarchy, 회식 dynamics, and how to sound both professional and human.",
    lessons: [
      { id: "BM_001", title: "First Business Meeting", sub: "Korean client · Senior or peer · Beginner", status: "live", level: "beginner", estimated_minutes: 10 },
      { id: "WP_004", title: "Responding to Feedback", sub: "Office · 선배/상사 or 동료 · Intermediate", status: "live", level: "intermediate", estimated_minutes: 10 },
      { id: "WP_001", title: "First Day — Team Introduction", sub: "Office · Junior to senior · Beginner", status: "preparing", level: "beginner", estimated_minutes: 9 },
      { id: "WP_002", title: "호칭 정하기 — Forms of Address", sub: "Office · 선배/상사 or 동료 · Intermediate", status: "live", level: "intermediate", estimated_minutes: 10 },
      { id: "WP_003", title: "Group Dinner (회식) Dynamics", sub: "Evening · Intermediate", status: "preparing", level: "intermediate", estimated_minutes: 12 },
    ],
  },
  {
    id: "daily", num: "04", name: "Daily Life", color: "#fb923c",
    tagline: "Real-world Korean — strangers, service workers, semi-familiar adults.",
    description: "Everyday Korean. The situations no textbook covers — how to text someone older, how to read a passive refusal, how service Korean actually works.",
    lessons: [
      { id: "DL_005", title: "Meeting Your Partner's Mother", sub: "Family home · 예비 장모님 or 어머니 · Intermediate", status: "live", level: "intermediate", estimated_minutes: 10 },
      { id: "DL_006", title: "Meeting Your Boyfriend's Mother", sub: "Family home · 예비 시어머님 or 친어머니 · Intermediate", status: "live", level: "intermediate", estimated_minutes: 10 },
      { id: "DL_001", title: "Texting Someone Older", sub: "Messaging · Beginner", status: "preparing", level: "beginner", estimated_minutes: 8 },
      { id: "DL_002", title: "Café Order — Service Tone", sub: "Café · Beginner", status: "preparing", level: "beginner", estimated_minutes: 7 },
      { id: "DL_003", title: "Detecting a Passive Refusal", sub: "Social · Intermediate", status: "preparing", level: "intermediate", estimated_minutes: 10 },
      { id: "DL_004", title: "University Lab Hierarchy", sub: "Academic · Intermediate", status: "preparing", level: "intermediate", estimated_minutes: 9 },
    ],
  },
];

export function getCategoryById(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}

export function getAllLiveCount() {
  return CATEGORIES.flatMap((c) => c.lessons).filter((l) => l.status === "live").length;
}
