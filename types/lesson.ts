// ═══════════════════════════════════════════════════════════════
// ALIENSAILEEN — Production Type System
// Stable from MVP → Phase 2 AI → Phase 3 Speech
// ═══════════════════════════════════════════════════════════════

export type LessonTag = "correct" | "neutral" | "wrong" | "acceptable" | "awkward" | "inappropriate";
export type LessonCategory = "fan_meeting" | "dating" | "workplace" | "daily";
export type LessonLevel = "beginner" | "intermediate" | "advanced";
export type LessonStatus = "live" | "preparing";
export type Formality = "반말" | "해요체" | "습니다체";
export type QuizType = "fill_blank"; // Phase 2: | "multiple_choice" | "reorder"

// ── Meta ────────────────────────────────────────────────────────
export interface LessonMeta {
  id: string;
  category: LessonCategory;
  lesson_number: number;
  level: LessonLevel;
  topic: string;
  status: LessonStatus;
  estimated_minutes: number;
}

// ── Context ─────────────────────────────────────────────────────
export interface LessonContext {
  description: string;
  location: string;
  interaction_time: string;
  communication_style: string;
  goal: string[];
  cultural_note: string;
}

// ── Relationship ────────────────────────────────────────────────
export interface RelationshipOption {
  id: string;
  label: string;
  summary: string;
  communication_traits: string[];
  archetype?: string; // Phase 2: AI persona
}

export interface RelationshipSelection {
  title: string;
  description: string;
  options: RelationshipOption[];
}

// ── Decision Point ───────────────────────────────────────────────
export interface FormalityAnalysis {
  used: Formality;
  why_wrong: string;
  recommended: Formality;
}

export interface DecisionExplanation {
  title: string;
  description: string;
  details: string[];
  natural_alternative: string[];
  formality_analysis?: FormalityAnalysis;
}

export interface DecisionOption {
  text: string;
  tag: LessonTag;
  feedback: string;
  explanation?: DecisionExplanation;
}

export interface DecisionVariant {
  question: string;
  options: DecisionOption[];
}

export interface DecisionPoint {
  variants: Record<string, DecisionVariant>;
}

// ── Vocabulary ───────────────────────────────────────────────────
export interface VocabularyItem {
  word: string;
  pronunciation: string;
  meaning: string;
  usage: string;
  formality?: Formality;
}

// ── Phrases ─────────────────────────────────────────────────────
export type AwkwardLabel =
  | "Incorrect register"
  | "Too casual"
  | "Too formal"
  | "Too generic"
  | "Lacks relationship specificity"
  | "Lacks cultural specificity"
  | "Focus shifted away from listener";

export interface AwkwardPhrase {
  korean: string;
  pronunciation: string;
  label?: AwkwardLabel;
  why_awkward: string;
}

export interface PhraseItem {
  korean: string;
  pronunciation: string;
  english: string;
  why_it_works: string;
  awkward?: AwkwardPhrase;
  audio_url?: string; // Phase 2
}

// ── Dialogue ────────────────────────────────────────────────────
export interface DialogueTurn {
  speaker: string;
  side: "fan" | "idol" | "user" | "client" | "colleague" | "other";
  korean: string;
  english: string;
  branch_id?: string; // Phase 2: branching
}

// ── Tone Guidance ────────────────────────────────────────────────
export interface ToneSpectrum {
  label: string;
  position: number; // 0–100
  recommended: boolean;
}

export interface ToneGuidance {
  avoid: string;
  neutral: string;
  correct: string;
  tone_summary: string;
  spectrum?: ToneSpectrum[];
}

// ── Quiz ────────────────────────────────────────────────────────
export interface QuizItem {
  type: QuizType;
  question: string;
  prefix: string;
  blank: string;
  suffix: string;
  answer: string;
  hint?: string;
}

// ── Full Lesson ──────────────────────────────────────────────────
export interface Lesson {
  meta: LessonMeta;
  title: string;
  context: LessonContext;
  relationship_selection: RelationshipSelection;
  decision_point: DecisionPoint;
  vocabulary: Record<string, VocabularyItem[]>;
  phrases: Record<string, PhraseItem[]>;
  dialogue: Record<string, DialogueTurn[]>;
  tone_guidance: Record<string, ToneGuidance>;
  quiz: Record<string, QuizItem[]>;
}

// ── Category Manifest ────────────────────────────────────────────
export interface LessonSummary {
  id: string;
  title: string;
  sub: string;
  status: LessonStatus;
  level: LessonLevel;
  estimated_minutes: number;
}

export interface CategoryManifest {
  id: LessonCategory;
  num: string;
  name: string;
  color: string;
  description: string;
  tagline: string;
  lessons: LessonSummary[];
}
