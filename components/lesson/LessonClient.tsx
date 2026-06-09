"use client";

import { useState, useEffect, useRef } from "react";
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
import { ShadowingCard } from "@/components/ui/ShadowingCard";

interface Props {
  lesson: Lesson;
}

const TOTAL_STEPS = 8;

export default function LessonClient({ lesson }: Props) {
  const relIds = lesson.relationship_selection.options.map((o) => o.id);
  const [step, setStep] = useState(1);
  const [selectedRel, setSelectedRel] = useState(relIds[0]);
  const [decisionDone, setDecisionDone] = useState(false);
  const [chosenOption, setChosenOption] = useState<DecisionOption | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);

  // ShadowingCard state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const waveformRef = useRef<HTMLCanvasElement>(null);

  // Inline Tone Corrector state
  const [toneText, setToneText] = useState("");
  const [toneAnalysis, setToneAnalysis] = useState("");
  const [toneLoading, setToneLoading] = useState(false);
  const [toneError, setToneError] = useState("");
  const [toneAnalyzed, setToneAnalyzed] = useState(false);

  // Scroll to top on step change
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  function handleRelChange(id: string) {
    setSelectedRel(id);
    setDecisionDone(false);
    setChosenOption(null);
    setQuizComplete(false);
  }

  function handleReset() {
    setStep(1);
    setSelectedRel(relIds[0]);
    setDecisionDone(false);
    setChosenOption(null);
    setQuizComplete(false);
    setIsPlaying(false);
    setIsRecording(false);
    setHasRecording(false);
    setToneText("");
    setToneAnalysis("");
    setToneAnalyzed(false);
  }

  function advance() {
    setStep((s) => s + 1);
  }

  async function analyzeTone() {
    if (!toneText.trim() || toneLoading) return;
    setToneLoading(true);
    setToneError("");
    setToneAnalysis("");
    try {
      const res = await fetch("/api/ai/tone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: toneText.trim(),
          targetRelationship: currentRel.label,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setToneAnalysis(data.analysis);
      setToneAnalyzed(true);
    } catch (err) {
      setToneError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setToneLoading(false);
    }
  }

  const currentRel = lesson.relationship_selection.options.find(
    (o) => o.id === selectedRel
  )!;

  const currentVariant = lesson.decision_point.variants[selectedRel];
  const correctOption = currentVariant?.options.find((o) => o.tag === "correct");
  const phrases = lesson.phrases[selectedRel] ?? [];
  const firstPhrase = phrases[0];

  return (
    <main className="min-h-screen bg-ink pb-24" ref={topRef}>

      {/* ── NAV ── */}
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
          {step}/{TOTAL_STEPS}
        </span>
      </nav>

      {/* ── PROGRESS BAR ── */}
      <div className="h-[2px] bg-white/[0.05]">
        <div
          className="h-full bg-mint transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── LESSON HEADER ── */}
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

      {/* ══ STEP 1 — SITUATION ══ */}
      {step === 1 && (
        <StepCard label="01 — Situation">
          <ContextBlock context={lesson.context} />
          <Continue onClick={advance} />
        </StepCard>
      )}

      {/* ══ STEP 2 — RELATIONSHIP + OUTPUT PREVIEW ══ */}
      {step === 2 && (
        <StepCard label="02 — Select relationship — all content below adapts">
          <p className="font-syne text-sm font-bold text-text-primary/85 mb-3">
            {lesson.relationship_selection.title}
          </p>
          <RelationshipSelector
            options={lesson.relationship_selection.options}
            selected={selectedRel}
            onChange={handleRelChange}
          />
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
          <Continue onClick={advance} />
        </StepCard>
      )}

      {/* ══ STEP 3 — DECISION ══ */}
      {step === 3 && (
        <StepCard label="03 — Decision point">
          <DecisionPoint
            variant={lesson.decision_point.variants[selectedRel]}
            done={decisionDone}
            chosen={chosenOption}
            onChoose={(opt) => {
              setChosenOption(opt);
              setDecisionDone(true);
              setTimeout(() => advance(), 600);
            }}
          />
        </StepCard>
      )}

      {/* ══ STEP 4 — FEEDBACK HERO ══ */}
      {step === 4 && chosenOption && (
        <StepCard label="04 — Feedback">
          {chosenOption.explanation?.title && (
            <div className="mb-5">
              <h2
                className="font-syne font-black leading-[1.05] mb-3"
                style={{ fontSize: "clamp(1.6rem, 6vw, 2.1rem)" }}
              >
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
                  <span className="text-mint">{chosenOption.explanation.title}</span>
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
            done={true}
            chosen={chosenOption}
            onChoose={() => {}}
          />
          <Continue onClick={advance} />
        </StepCard>
      )}

      {/* ══ STEP 5 — VOCABULARY ══ */}
      {step === 5 && (
        <StepCard label={`05 — Key language — ${currentRel.label.split(" ")[0]} context`}>
          <VocabSection items={lesson.vocabulary[selectedRel]} />
          <Continue onClick={advance} />
        </StepCard>
      )}

      {/* ══ STEP 6 — PHRASES + SHADOWING + TONE CORRECTOR ══ */}
      {step === 6 && (
        <StepCard label="06 — Natural phrases">

          <PhrasesSection items={lesson.phrases[selectedRel]} />

          {firstPhrase && (
            <div className="mt-5">
              <ShadowingCard
                phrase={firstPhrase}
                isPlaying={isPlaying}
                isRecording={isRecording}
                hasRecording={hasRecording}
                waveformRef={waveformRef}
                onPlay={() => setIsPlaying((v) => !v)}
                onRecord={() => setIsRecording(true)}
                onStopRecord={() => { setIsRecording(false); setHasRecording(true); }}
                onPlayback={() => setIsPlaying((v) => !v)}
              />
            </div>
          )}

          {/* ── INLINE TONE CORRECTOR ── */}
          <div className="mt-6 pt-5 border-t border-white/[0.05]">
            <p className="font-mono text-[7.5px] tracking-[0.2em] uppercase text-text-hint mb-4">
              Tone corrector — test your own expression
            </p>
            <div className="bg-s2/50 border border-b-dim rounded-xl p-4">
              <p className="font-mono text-[8px] text-text-hint mb-2">
                To: <span className="text-mint">{currentRel.label}</span>
              </p>
              {!toneAnalyzed ? (
                <>
                  <textarea
                    value={toneText}
                    onChange={(e) => setToneText(e.target.value)}
                    placeholder="한국어 문장을 입력하세요..."
                    rows={2}
                    className="w-full bg-s3 border border-b-mid rounded-xl px-3 py-2.5 font-mono text-[13px] text-t100 placeholder:text-t400 resize-none outline-none focus:border-mint/40 transition-colors leading-relaxed mb-3"
                  />
                  {toneError && (
                    <p className="font-mono text-[10px] text-red-400 mb-2">{toneError}</p>
                  )}
                  <button
                    onClick={analyzeTone}
                    disabled={!toneText.trim() || toneLoading}
                    className="w-full py-2.5 bg-mint/10 border border-mint/30 rounded-xl font-mono text-[9px] tracking-wider uppercase text-mint hover:bg-mint/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {toneLoading ? "분석 중..." : "Analyze tone →"}
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-s3 border border-b-dim rounded-xl px-3 py-2.5 mb-3">
                    <p className="font-mono text-[8px] text-t400 mb-1">You wrote</p>
                    <p className="font-syne text-sm font-bold text-t100">{toneText}</p>
                  </div>
                  <div className="font-mono text-[11px] text-t200 leading-[1.7] whitespace-pre-wrap mb-3">
                    {toneAnalysis}
                  </div>
                  <button
                    onClick={() => { setToneText(""); setToneAnalysis(""); setToneAnalyzed(false); setToneError(""); }}
                    className="font-mono text-[9px] tracking-wider uppercase text-t300 hover:text-mint transition-colors"
                  >
                    ← Try another
                  </button>
                </>
              )}
            </div>
          </div>

          <Continue onClick={advance} />
        </StepCard>
      )}

      {/* ══ STEP 7 — QUIZ ══ */}
      {step === 7 && (
        <StepCard label="07 — Quiz — fill in the blank">
          <QuizSection
            items={lesson.quiz[selectedRel]}
            onComplete={() => { setQuizComplete(true); advance(); }}
          />
        </StepCard>
      )}

      {/* ══ STEP 8 — COMPLETE ══ */}
      {step === 8 && quizComplete && (
        <StepCard label="08 — Complete">
          <div className="py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-mint/10 border border-mint/30 flex items-center justify-center mx-auto mb-5">
              <span className="text-mint text-2xl">✓</span>
            </div>
            <p className="font-syne text-xl font-extrabold text-mint mb-2">
              Lesson complete
            </p>
            <p className="font-mono text-[8.5px] text-text-muted leading-relaxed mb-8">
              {lesson.meta.category.replace("_", " ")} · Lesson{" "}
              {lesson.meta.lesson_number} · {lesson.title}
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              <button
                onClick={handleReset}
                className="font-mono text-[8px] tracking-wider uppercase px-4 py-2 rounded-full border border-white/[0.1] text-text-muted hover:border-white/20 hover:text-text-primary transition-all"
              >
                Restart lesson
              </button>
              <Link
                href={`/lessons/${lesson.meta.category}`}
                className="font-mono text-[8px] tracking-wider uppercase px-4 py-2 rounded-full border border-mint/30 text-mint hover:bg-mint/10 transition-all"
              >
                Back to lessons
              </Link>
            </div>
          </div>
        </StepCard>
      )}

    </main>
  );
}

function StepCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-5 animate-in fade-in duration-300">
      <p className="font-mono text-[7.5px] tracking-[0.2em] uppercase text-text-hint mb-4">
        {label}
      </p>
      {children}
    </div>
  );
}

function Continue({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-6 w-full py-3.5 rounded-xl border border-white/[0.1] bg-white/[0.03] font-mono text-[9px] tracking-[0.22em] uppercase text-text-muted hover:border-white/20 hover:text-text-primary active:scale-[0.98] transition-all duration-150"
    >
      Continue →
    </button>
  );
}
