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
  const [step, setStep] = useState(0);
  const startTimeRef = useRef(Date.now());

  const { lp, refresh } = useLessonProgress(lesson.meta.id);
  const catPath = `/learn/${lesson.meta.category}`;

  // Sync bookmark + completed state after mount (avoids hydration mismatch)
  useEffect(() => {
    setIsBookmarked(lp.bookmarked);
    if (lp.completed) setShowComplete(true);
  }, [lp.bookmarked, lp.completed]);

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
    setStep(0);
    startTimeRef.current = Date.now();
  }

  function toggleBookmark() {
    const next = progressStore.toggleBookmark(lesson.meta.id);
    setIsBookmarked(next);
    refresh();
  }

  const currentRel = lesson.relationship_selection.options.find((o) => o.id === selectedRel)!;

  function getStepName(s: number) {
    switch (s) {
      case 0: return "Situation Overview";
      case 1: return "Select Relationship";
      case 2: return "Decision Point";
      case 3: return `Vocabulary — ${currentRel.label.split(" ")[0]} Context`;
      case 4: return "Key Phrases";
      case 5: return "Sample Dialogue";
      case 6: return "Tone Guidance";
      case 7: return "Interactive Quiz";
      default: return "";
    }
  }

  return (
    <main className="min-h-screen bg-s0 flex flex-col justify-between">
      {/* HEADER (Speak/Duolingo style) */}
      <header className="sticky top-0 z-50 bg-s0 border-b border-[rgba(255,255,255,0.07)] safe-top">
        <div className="flex items-center justify-between h-16 px-5 max-w-2xl mx-auto gap-4">
          <Link
            href={catPath}
            aria-label="Exit lesson"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.12)] text-t300 hover:text-t100 hover:bg-white/[0.03] transition-all text-sm font-bold flex-shrink-0"
          >
            ✕
          </Link>
          
          {/* Progress Bar Container */}
          <div className="flex-1 h-2 bg-white/[0.08] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-mint rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((step + (showComplete ? 1 : 0)) / 8) * 100}%` }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleBookmark}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark lesson"}
              className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                isBookmarked
                  ? "border-mint/45 bg-mint/10 text-mint"
                  : "border-[rgba(255,255,255,0.12)] text-t400 hover:border-mint/30 hover:text-t100"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 12 12"
                fill={isBookmarked ? "currentColor" : "none"}
                stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 2h8v9L6 8.5 2 11V2z"/>
              </svg>
            </button>
            <span className="font-mono text-[10px] text-mint/50 tracking-wider font-bold hidden sm:inline-block">{lesson.meta.id}</span>
          </div>
        </div>
      </header>

      {/* ACTIVE CARD CONTAINER */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-5 py-8 justify-between">
        
        {showComplete ? (
          /* COMPLETE BANNER */
          <div className="my-auto px-6 py-8 rounded-3xl bg-mint/[0.03] border border-mint/20 text-center animate-scale-in shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="w-16 h-16 rounded-full bg-mint/15 border border-mint/30 flex items-center justify-center mx-auto mb-4 hover:scale-105 transition-transform">
              <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4.5 4.5L16 6" stroke="#00e5b4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="font-syne text-2xl font-extrabold text-mint mb-2">Lesson complete!</p>
            <p className="font-mono text-xs text-t300 leading-relaxed mb-6 max-w-sm mx-auto">
              {quizScore > 0 && `You scored ${Math.round(quizScore * 100)}% on the quiz! · `}
              {lesson.meta.category.replace(/_/g, " ")} · {lesson.title}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={catPath} className="font-mono text-xs tracking-wider uppercase px-6 py-3.5 rounded-full bg-mint text-s0 font-extrabold hover:bg-mint/90 active:scale-[0.98] hover:shadow-[0_0_15px_rgba(0,229,180,0.3)] transition-all min-h-[46px] flex items-center justify-center">
                Next lesson →
              </Link>
              <Link href="/dashboard" className="font-mono text-xs tracking-wider uppercase px-6 py-3.5 rounded-full border border-[rgba(255,255,255,0.12)] text-t300 font-bold hover:text-t100 hover:bg-white/[0.03] transition-all min-h-[46px] flex items-center justify-center">
                My Dashboard
              </Link>
              <button onClick={handleReset} className="font-mono text-xs tracking-wider uppercase px-6 py-3.5 rounded-full border border-[rgba(255,255,255,0.12)] text-t300 font-bold hover:text-t100 hover:bg-white/[0.03] transition-all min-h-[46px] flex items-center justify-center">
                Reset & replay
              </button>
            </div>
          </div>
        ) : (
          /* STEP CARD WIZARD */
          <div className="flex-1 flex flex-col justify-between">
            {/* Step Card Title */}
            <div className="mb-6 animate-fade-in">
              <div className="flex gap-2 flex-wrap mb-4">
                <Badge variant="mint">Step {step + 1} of 8</Badge>
                <Badge variant="violet">{getStepName(step)}</Badge>
                <Badge variant="dim">{lesson.meta.level}</Badge>
              </div>
              <h1 className="font-display-md text-t100 leading-snug">{lesson.title}</h1>
            </div>

            {/* Step Card Content */}
            <div className="flex-1 flex flex-col justify-start">
              {step === 0 && (
                <div className="animate-fade-up">
                  <ContextBlock context={lesson.context} />
                </div>
              )}

              {step === 1 && (
                <div className="animate-fade-up">
                  <p className="font-headline text-[15px] font-bold text-t100 mb-4">{lesson.relationship_selection.title}</p>
                  <RelationshipSelector
                    options={lesson.relationship_selection.options}
                    selected={selectedRel}
                    onChange={handleRelChange}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="animate-fade-up">
                  <DecisionPoint
                    variant={lesson.decision_point.variants[selectedRel]}
                    done={decisionDone}
                    chosen={chosenOption}
                    onChoose={handleDecision}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="animate-fade-up">
                  <VocabSection items={lesson.vocabulary[selectedRel]} lessonId={lesson.meta.id} />
                </div>
              )}

              {step === 4 && (
                <div className="animate-fade-up">
                  <PhrasesSection items={lesson.phrases[selectedRel]} />
                </div>
              )}

              {step === 5 && (
                <div className="animate-fade-up">
                  <DialogueSection turns={lesson.dialogue[selectedRel]} />
                </div>
              )}

              {step === 6 && (
                <div className="animate-fade-up">
                  <ToneGuidance guidance={lesson.tone_guidance[selectedRel]} />
                </div>
              )}

              {step === 7 && (
                <div className="animate-fade-up">
                  <QuizSection items={lesson.quiz[selectedRel]} onComplete={handleQuizComplete} />
                </div>
              )}
            </div>

            {/* Step Card Navigation */}
            <div className="flex gap-3 mt-8 pt-4 border-t border-[rgba(255,255,255,0.07)]">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="w-1/3 font-mono text-xs tracking-wider uppercase border border-[rgba(255,255,255,0.12)] text-t300 hover:text-t100 hover:bg-white/[0.03] rounded-full py-3.5 transition-all font-bold min-h-[46px] flex items-center justify-center"
                >
                  Back
                </button>
              )}
              {step < 7 ? (
                step === 2 ? (
                  decisionDone ? (
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 font-mono text-xs tracking-wider uppercase bg-mint text-s0 rounded-full py-3.5 hover:bg-mint/90 hover:shadow-[0_0_15px_rgba(0,229,180,0.3)] active:scale-[0.98] transition-all font-bold min-h-[46px] flex items-center justify-center animate-fade-in"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 font-mono text-xs tracking-wider uppercase bg-white/[0.03] border border-[rgba(255,255,255,0.06)] text-t400 rounded-full py-3.5 min-h-[46px] flex items-center justify-center cursor-not-allowed"
                    >
                      Select an option
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="flex-1 font-mono text-xs tracking-wider uppercase bg-mint text-s0 rounded-full py-3.5 hover:bg-mint/90 hover:shadow-[0_0_15px_rgba(0,229,180,0.3)] active:scale-[0.98] transition-all font-bold min-h-[46px] flex items-center justify-center"
                  >
                    Continue
                  </button>
                )
              ) : (
                !quizComplete && (
                  <div className="flex-1 font-mono text-[10px] text-t400 tracking-wider uppercase flex items-center justify-center bg-white/[0.02] border border-[rgba(255,255,255,0.06)] rounded-full min-h-[46px]">
                    Answer the quiz questions above
                  </div>
                )
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
