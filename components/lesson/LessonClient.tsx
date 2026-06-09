"use client";

// ================================================================
// FILE: components/lesson/LessonClient.tsx  (REPLACE EXISTING)
//
// CHANGES (3 items, visual only):
//   1. Section 02 — Relationship selector:
//      Output preview appears immediately when relationship selected.
//      Shows the correct expression from decision_point.variants.
//
//   2. Section 03 — Decision point feedback:
//      explanation.title is now the typographic HERO (34px Syne).
//      Comparison options are secondary, below the hero insight.
//
//   3. Section label + minor visual refinements throughout.
//      No structural changes to any section.
//
// UNTOUCHED:
//   All imports, all child components, all state variables,
//   all handlers, all lesson data rendering, all routing.
//   ContextBlock, RelationshipSelector, DecisionPoint,
//   VocabSection, PhrasesSection, DialogueSection,
//   ToneGuidance, QuizSection — all unchanged.
// ================================================================

import { useState } from "react";
import Link from "next/link";
import type { Lesson, DecisionOption } from "@/types/lesson";
import ContextBlock from "./ContextBlock";
import RelationshipSelector from "./RelationshipSelector";
import DecisionPoint from "./DecisionPoint";
import VocabSection from "./VocabSection";
import PhrasesSection from "./PhrasesSection";
import DialogueSection from "./DialogueSection";
import ToneGuidance from "./ToneGuidance";
import QuizSection from "./QuizSection";

interface Props {
  lesson: Lesson;
}

export default function LessonClient({ lesson }: Props) {
  const relIds = lesson.relationship_selection.options.map((o) => o.id);
  const [selectedRel, setSelectedRel] = useState(relIds[0]);
  const [decisionDone, setDecisionDone] = useState(false);
  const [chosenOption, setChosenOption] = useState<DecisionOption | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  // progress — identical to original
  const progress = quizComplete
    ? 100
    : decisionDone
    ? 40
    : selectedRel !== relIds[0]
    ? 15
    : 8;

  function handleRelChange(id: string) {
    setSelectedRel(id);
    setDecisionDone(false);
    setChosenOption(null);
    setQuizComplete(false);
  }

  function handleReset() {
    setDecisionDone(false);
    setChosenOption(null);
    setQuizComplete(false);
  }

  const currentRel = lesson.relationship_selection.options.find(
    (o) => o.id === selectedRel
  )!;

  // ── CHANGE 1: get correct option for output preview ──────────
  const currentVariant = lesson.decision_point.variants[selectedRel];
  const correctOption = currentVariant?.options.find(
    (o) => o.tag === "correct"
  );

  return (
    <main className="min-h-screen bg-ink pb-16">

      {/* ── NAV — identical ── */}
      <nav className="flex items-center justify-between px-5 py-3 border-b border-white/[0.07] sticky top-0 bg-ink z-50">
        <Link
          href={`/lessons/${lesson.meta.category}`}
          className="font-mono text-[9px] tracking-wider uppercase text-text-muted hover:text-text-primary transition-colors px-2.5 py-1.5 border border-white/[0.08] rounded-full"
        >
          ← Lessons
        </Link>
        <span className="font-syne text-xs font-bold tracking-widest">
          ALIEN&apos;S <span className="text-mint">AILEEN</span>
        </span>
        <span className="font-mono text-[9px] text-mint/40 tracking-wider">
          {lesson.meta.id}
        </span>
      </nav>

      {/* ── PROGRESS — identical ── */}
      <div className="h-[2px] bg-white/[0.05]">
        <div
          className="h-full bg-mint transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── LESSON HEADER — identical ── */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <div className="flex gap-2 flex-wrap mb-3">
          <span className="font-mono text-[7.5px] tracking-[0.14em] uppercase px-2 py-1 rounded-full bg-mint/10 border border-mint/28 text-mint/80">
            {lesson.meta.category.replace("_", " ")}
          </span>
          <span className="font-mono text-[7.5px] tracking-[0.14em] uppercase px-2 py-1 rounded-full bg-violet/10 border border-violet/28 text-violet/80">
            Lesson {String(lesson.meta.lesson_number).padStart(2, "0")}
          </span>
          <span className="font-mono text-[7.5px] tracking-[0.14em] uppercase px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.09] text-text-hint">
            {lesson.meta.level}
          </span>
        </div>
        <h1 className="font-syne text-xl font-extrabold leading-snug mb-2">
          {lesson.title}
        </h1>
        <p className="font-mono text-[8.5px] text-text-hint leading-relaxed">
          {lesson.context.location} · {lesson.context.interaction_time} ·{" "}
          {lesson.context.communication_style}
        </p>
      </div>

      {/* ── 01 CONTEXT — identical ── */}
      <Section label="01 — Situation">
        <ContextBlock context={lesson.context} />
      </Section>

      {/* ── 02 RELATIONSHIP — CHANGED ── */}
      <Section label="02 — Select relationship — all content below adapts">
        <p className="font-syne text-sm font-bold text-text-primary/85 mb-3">
          {lesson.relationship_selection.title}
        </p>
        <RelationshipSelector
          options={lesson.relationship_selection.options}
          selected={selectedRel}
          onChange={handleRelChange}
        />

        {/* ── OUTPUT PREVIEW — new ──────────────────────────────
            Appears immediately when relationship selected.
            Shows correct expression so user sees transformation
            before tapping Continue. Same data from JSON. */}
        {correctOption && (
          <div className="mt-4 rounded-xl border border-mint/20 bg-mint/[0.04] px-4 py-4">
            <p className="font-mono text-[8px] tracking-[0.22em] text-mint/70 mb-2">
              OUTPUT PREVIEW
            </p>
            <p className="font-syne text-2xl font-black text-white leading-tight mb-1.5">
              {correctOption.text}
            </p>
            <p className="font-mono text-[9px] text-text-muted leading-relaxed">
              {correctOption.feedback}
            </p>
          </div>
        )}
      </Section>

      {/* ── 03 DECISION POINT — CHANGED ── */}
      <Section label="03 — Decision point">

        {/* ── FEEDBACK HERO — new ──────────────────────────────
            When decision is done: explanation.title becomes the
            typographic hero (34px Syne), before the option cards.
            If no explanation.title, falls back to original layout. */}
        {decisionDone && chosenOption?.explanation?.title && (
          <div className="mb-5">
            <h2 className="font-syne font-black leading-[1.05] mb-3"
              style={{ fontSize: "clamp(1.6rem, 6vw, 2.1rem)" }}
            >
              {/* Red accent on first word if wrong/neutral */}
              {chosenOption.tag === "wrong" || chosenOption.tag === "neutral" ? (
                <>
                  <span className="text-red-400">
                    {chosenOption.explanation.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                  {chosenOption.explanation.title.split(" ").length > 2 && (
                    <span className="text-white">
                      {" " + chosenOption.explanation.title.split(" ").slice(2).join(" ")}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-mint">
                  {chosenOption.explanation.title}
                </span>
              )}
            </h2>
            {chosenOption.explanation.description && (
              <p className="font-mono text-[10px] text-text-muted leading-relaxed mb-4">
                {chosenOption.explanation.description}
              </p>
            )}
            <div className="h-px bg-white/[0.06] mb-4" />
          </div>
        )}

        <DecisionPoint
          variant={lesson.decision_point.variants[selectedRel]}
          done={decisionDone}
          chosen={chosenOption}
          onChoose={(opt) => {
            setChosenOption(opt);
            setDecisionDone(true);
          }}
        />
      </Section>

      {/* ── 04 VOCABULARY — identical ── */}
      <Section label={`04 — Vocabulary — ${currentRel.label.split(" ")[0]} context`}>
        <VocabSection items={lesson.vocabulary[selectedRel]} />
      </Section>

      {/* ── 05 PHRASES — identical ── */}
      <Section label="05 — Key phrases">
        <PhrasesSection items={lesson.phrases[selectedRel]} />
      </Section>

      {/* ── 06 DIALOGUE — identical ── */}
      <Section label="06 — Sample dialogue">
        <DialogueSection turns={lesson.dialogue[selectedRel]} />
      </Section>

      {/* ── 07 TONE — identical ── */}
      <Section label="07 — Tone guidance">
        <ToneGuidance guidance={lesson.tone_guidance[selectedRel]} />
      </Section>

      {/* ── 08 QUIZ — identical ── */}
      <Section label="08 — Quiz — fill in the blank">
        <QuizSection
          items={lesson.quiz[selectedRel]}
          onComplete={() => setQuizComplete(true)}
        />
      </Section>

      {/* ── COMPLETE — identical ── */}
      {quizComplete && (
        <div className="mx-5 my-4 px-5 py-4 rounded-xl bg-mint/[0.06] border border-mint/22 text-center">
          <p className="font-syne text-sm font-extrabold text-mint mb-1">
            Lesson complete
          </p>
          <p className="font-mono text-[8.5px] text-text-muted leading-relaxed">
            {lesson.meta.category.replace("_", " ")} · Lesson{" "}
            {lesson.meta.lesson_number} · {lesson.title}
          </p>
        </div>
      )}

      {/* ── ACTIONS — identical ── */}
      <div className="flex gap-2 justify-center px-5 pt-4">
        <button
          onClick={handleReset}
          className="font-mono text-[8px] tracking-wider uppercase px-4 py-2 rounded-full border border-white/[0.1] text-text-muted hover:border-white/20 hover:text-text-primary transition-all"
        >
          Reset lesson
        </button>
        <Link
          href={`/lessons/${lesson.meta.category}`}
          className="font-mono text-[8px] tracking-wider uppercase px-4 py-2 rounded-full border border-white/[0.1] text-text-muted hover:border-white/20 hover:text-text-primary transition-all"
        >
          Back to lessons
        </Link>
      </div>
    </main>
  );
}

// Section component — identical to original
function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 py-4 border-b border-white/[0.05]">
      <p className="font-mono text-[7.5px] tracking-[0.2em] uppercase text-text-hint mb-3">
        {label}
      </p>
      {children}
    </div>
  );
}
