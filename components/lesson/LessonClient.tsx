"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Lesson, DecisionOption } from "@/types/lesson";
import { useLessonProgress } from "@/hooks/useProgress";
import { progressStore } from "@/lib/progress/store";
import ContextBlock from "./ContextBlock";
import RelationshipSelector from "./RelationshipSelector";
import DecisionPoint from "./DecisionPoint";
import VocabSection from "./VocabSection";
import PhrasesSection from "./PhrasesSection";
import DialogueSection from "./DialogueSection";
import ToneGuidance from "./ToneGuidance";
import QuizSection from "./QuizSection";
import { Nav, BackButton } from "@/components/ui/Nav";
import { Badge } from "@/components/ui/Badge";

interface Props { lesson: Lesson }

export default function LessonClient({ lesson }: Props) {
  const relIds = lesson.relationship_selection.options.map((o) => o.id);
  const [selectedRel, setSelectedRel] = useState(relIds[0]);
  const [decisionDone, setDecisionDone] = useState(false);
  const [decisionCorrect, setDecisionCorrect] = useState(false);
  const [chosenOption, setChosenOption] = useState<DecisionOption | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const startTimeRef = useRef(Date.now());

  const { lp, refresh } = useLessonProgress(lesson.meta.id);
  const catPath = `/learn/${lesson.meta.category}`;

  // Sync bookmark + completed state after mount (avoids hydration mismatch)
  useEffect(() => {
    setIsBookmarked(lp.bookmarked);
    if (lp.completed) setShowComplete(true);
  }, [lp.bookmarked, lp.completed]);

  // Progress steps: 8 → 20 → 50 → 100
  const progress = showComplete ? 100 : quizComplete ? 85 : decisionDone ? 50 : selectedRel !== relIds[0] ? 20 : 8;

  function handleRelChange(id: string) {
    setSelectedRel(id);
    setDecisionDone(false);
    setChosenOption(null);
    setDecisionCorrect(false);
  }

  function handleDecision(opt: DecisionOption) {
    setChosenOption(opt);
    setDecisionDone(true);
    setDecisionCorrect(opt.tag === "correct");
  }

  function handleQuizComplete(score: number) {
    setQuizScore(score);
    setQuizComplete(true);
    setTimeout(() => {
      progressStore.markComplete(lesson.meta.id, score, decisionCorrect);
      refresh();
      setShowComplete(true);
    }, 600);
  }

  function handleReset() {
    setDecisionDone(false);
    setChosenOption(null);
    setDecisionCorrect(false);
    setQuizComplete(false);
    setQuizScore(0);
    setShowComplete(false);
    startTimeRef.current = Date.now();
  }

  function toggleBookmark() {
    const next = progressStore.toggleBookmark(lesson.meta.id);
    setIsBookmarked(next);
    refresh();
  }

  const currentRel = lesson.relationship_selection.options.find((o) => o.id === selectedRel)!;

  return (
    <main className="min-h-screen bg-s0">
      <Nav
        left={<BackButton href={catPath} label="Lessons" />}
        right={
          <div className="flex items-center gap-2">
            <button
              onClick={toggleBookmark}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark lesson"}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                isBookmarked
                  ? "border-mint/40 bg-mint/10 text-mint"
                  : "border-b-dim text-t400 hover:border-b-mid hover:text-t100"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12"
                fill={isBookmarked ? "currentColor" : "none"}
                stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 2h8v9L6 8.5 2 11V2z"/>
              </svg>
            </button>
            <span className="font-mono text-[9px] text-mint/40 tracking-wider">{lesson.meta.id}</span>
          </div>
        }
      />

      {/* PROGRESS BAR */}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* LESSON HEADER */}
        <div className="px-5 py-5 border-b border-b-dim">
          <div className="flex gap-2 flex-wrap mb-3">
            <Badge variant="mint">{lesson.meta.category.replace(/_/g, " ")}</Badge>
            <Badge variant="violet">Lesson {String(lesson.meta.lesson_number).padStart(2, "0")}</Badge>
            <Badge variant="dim">{lesson.meta.level} · ~{lesson.meta.estimated_minutes}min</Badge>
            {showComplete && <Badge variant="success">Completed ✓</Badge>}
          </div>
          <h1 className="font-syne text-xl font-extrabold leading-snug mb-2">{lesson.title}</h1>
          <p className="font-mono text-[8.5px] text-t300 leading-relaxed">
            {lesson.context.location} · {lesson.context.interaction_time} · {lesson.context.communication_style}
          </p>
        </div>

        <Section label="01 — Situation" delay={0}>
          <ContextBlock context={lesson.context} />
        </Section>

        <Section label="02 — Select relationship — all content below adapts" delay={40}>
          <p className="font-syne text-[13px] font-bold text-t100/85 mb-3">{lesson.relationship_selection.title}</p>
          <RelationshipSelector
            options={lesson.relationship_selection.options}
            selected={selectedRel}
            onChange={handleRelChange}
          />
        </Section>

        <Section label="03 — Decision point" delay={80}>
          <DecisionPoint
            variant={lesson.decision_point.variants[selectedRel]}
            done={decisionDone}
            chosen={chosenOption}
            onChoose={handleDecision}
          />
        </Section>

        <Section label={`04 — Vocabulary — ${currentRel.label.split(" ")[0]} context`} delay={120}>
          <VocabSection items={lesson.vocabulary[selectedRel]} lessonId={lesson.meta.id} />
        </Section>

        <Section label="05 — Key phrases" delay={160}>
          <PhrasesSection items={lesson.phrases[selectedRel]} />
        </Section>

        <Section label="06 — Sample dialogue" delay={200}>
          <DialogueSection turns={lesson.dialogue[selectedRel]} />
        </Section>

        <Section label="07 — Tone guidance" delay={240}>
          <ToneGuidance guidance={lesson.tone_guidance[selectedRel]} />
        </Section>

        <Section label="08 — Quiz — fill in the blank" delay={280}>
          <QuizSection items={lesson.quiz[selectedRel]} onComplete={handleQuizComplete} />
        </Section>

        {/* COMPLETE BANNER */}
        {showComplete && (
          <div className="mx-5 my-5 px-5 py-5 rounded-2xl bg-mint/[0.07] border border-mint/22 text-center animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-mint/15 border border-mint/30 flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4.5 4.5L16 6" stroke="#00e5b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="font-syne text-base font-extrabold text-mint mb-1">Lesson complete</p>
            <p className="font-mono text-[9px] text-t300 leading-relaxed mb-4">
              {quizScore > 0 && `Quiz score: ${Math.round(quizScore * 100)}% · `}
              {lesson.meta.category.replace(/_/g, " ")} · {lesson.title}
            </p>
            <div className="flex gap-2 justify-center">
              <Link href={catPath} className="font-mono text-[9px] tracking-wider uppercase px-4 py-2 rounded-full bg-mint/10 border border-mint/30 text-mint hover:bg-mint/20 transition-all">
                Next lesson →
              </Link>
              <Link href="/dashboard" className="font-mono text-[9px] tracking-wider uppercase px-4 py-2 rounded-full border border-b-mid text-t300 hover:text-t100 transition-all">
                Dashboard
              </Link>
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex gap-2 justify-center px-5 pt-4 pb-12">
          <button onClick={handleReset} className="font-mono text-[8px] tracking-wider uppercase px-4 py-2 rounded-full border border-b-dim text-t400 hover:border-b-mid hover:text-t100 transition-all">
            Reset lesson
          </button>
          <Link href={catPath} className="font-mono text-[8px] tracking-wider uppercase px-4 py-2 rounded-full border border-b-dim text-t400 hover:text-t100 transition-all">
            Back to lessons
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({ label, children, delay }: { label: string; children: React.ReactNode; delay: number }) {
  return (
    <div className="px-5 py-5 border-b border-b-dim animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <p className="font-mono text-[7.5px] tracking-[0.2em] uppercase text-t400 mb-3">{label}</p>
      {children}
    </div>
  );
}
