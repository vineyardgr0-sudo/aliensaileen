"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type {
  Lesson,
  DecisionOption,
  VocabularyItem,
  PhraseItem,
  DialogueTurn,
  QuizItem,
} from "@/types/lesson";
import { useLessonProgress } from "@/hooks/useProgress";
import { progressStore } from "@/lib/progress/store";
import { Nav, BackButton } from "@/components/ui/Nav";
import { cn } from "@/lib/utils";

// Local type alias — avoids React namespace resolution issues
type ReactNode = React.ReactNode;

// ─── STEP IDs ────────────────────────────────────────────────────
type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
const TOTAL_STEPS = 8;
const STEP_NAMES: Record<StepId, string> = {
  1: "Mission",
  2: "Choose Context",
  3: "Decision",
  4: "Feedback",
  5: "Key Language",
  6: "Natural Phrases",
  7: "Mini Quiz",
  8: "Complete",
};

// ─── CATEGORY COLOR MAP ───────────────────────────────────────────
const CAT_COLOR: Record<string, string> = {
  fan_meeting: "#7c3aed",
  dating:      "#ec4899",
  workplace:   "#3b82f6",
  daily:       "#f97316",
};

// ─── PROPS ────────────────────────────────────────────────────────
interface Props {
  lesson: Lesson;
}

// ═══════════════════════════════════════════════════════════════════
export default function LessonClient({ lesson }: Props) {
  const catColor = CAT_COLOR[lesson.meta.category] ?? "#7c3aed";
  const relIds = lesson.relationship_selection.options.map((o) => o.id);

  // ── State ──────────────────────────────────────────────────────
  const [step, setStep]           = useState<StepId>(1);
  const [relId, setRelId]         = useState<string | null>(null);
  const [chosenOpt, setChosenOpt] = useState<DecisionOption | null>(null);
  const [quizScores, setQuizScores] = useState<boolean[]>([]);
  const [bookmarked, setBookmarked] = useState(false);

  const { lp, refresh } = useLessonProgress(lesson.meta.id);

  // Sync bookmark on mount
  useEffect(() => {
    setBookmarked(lp.bookmarked);
  }, [lp.bookmarked]);

  // ── Derived ───────────────────────────────────────────────────
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  const rel  = relId
    ? lesson.relationship_selection.options.find((o) => o.id === relId) ?? null
    : null;

  const decVariant = relId ? lesson.decision_point.variants[relId] ?? null : null;
  const vocab      = relId ? (lesson.vocabulary[relId] ?? [])      : [];
  const phrases    = relId ? (lesson.phrases[relId] ?? [])         : [];
  const dialogue   = relId ? (lesson.dialogue[relId] ?? [])        : [];
  const toneGuide  = relId ? lesson.tone_guidance[relId] ?? null   : null;
  const quiz       = relId ? (lesson.quiz[relId] ?? [])            : [];

  // ── Handlers ──────────────────────────────────────────────────
  function goStep(n: StepId) {
    setStep(n);
  }

  function pickDecision(opt: DecisionOption) {
    setChosenOpt(opt);
    // small delay so user sees selection highlight before transition
    setTimeout(() => goStep(4), 350);
  }

  const handleQuizDone = useCallback((scores: boolean[]) => {
    setQuizScores(scores);
    const correct = scores.filter(Boolean).length;
    const score   = scores.length > 0 ? correct / scores.length : 0;
    const decCorrect = chosenOpt?.tag === "correct";
    progressStore.markComplete(lesson.meta.id, score, decCorrect);
    refresh();
    setTimeout(() => goStep(8), 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenOpt, lesson.meta.id, refresh]);

  function toggleBookmark() {
    const next = progressStore.toggleBookmark(lesson.meta.id);
    setBookmarked(next);
    refresh();
  }

  function restart() {
    setStep(1);
    setRelId(null);
    setChosenOpt(null);
    setQuizScores([]);
  }

  const catPath = `/learn/${lesson.meta.category}`;

  // ═══════════════════════════════════════════════════════════════
  return (
    <main 
      className="min-h-screen bg-s0 flex flex-col selection:bg-[var(--cat-color-30)] selection:text-white"
      style={{
        "--cat-color": catColor,
        "--cat-color-05": `${catColor}0d`,
        "--cat-color-10": `${catColor}1a`,
        "--cat-color-20": `${catColor}33`,
        "--cat-color-30": `${catColor}4d`,
        "--cat-color-50": `${catColor}80`,
        "--cat-color-60": `${catColor}99`,
      } as React.CSSProperties}
    >
      {/* ── Embedded Custom CSS for Keyframe Animations & Custom Classes ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes floatAnimation {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes checkPop {
          0% {
            stroke-dashoffset: 50;
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            stroke-dashoffset: 0;
            transform: scale(1);
          }
        }
        @keyframes xpBadgeFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            box-shadow: 0 4px 12px var(--cat-color-20);
          }
          50% {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 8px 20px var(--cat-color-30);
          }
        }
        .animate-fade-up-custom {
          animation: fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float-custom {
          animation: floatAnimation 3.5s ease-in-out infinite;
        }
        .neon-glow-btn {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .neon-glow-btn:hover:not(:disabled) {
          box-shadow: 0 0 16px var(--cat-color-50);
          transform: translateY(-1px);
        }
        .neon-glow-btn:active:not(:disabled) {
          transform: translateY(0px) scale(0.98);
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 99px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.16);
        }
      `}} />

      {/* ── NAV ── */}
      <Nav
        left={<BackButton href={catPath} label="Lessons" />}
        right={
          <div className="flex items-center gap-3">
            <button
              onClick={toggleBookmark}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark lesson"}
              className={cn(
                "w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 active:scale-90",
                bookmarked
                  ? "border-mint/50 bg-mint/15 text-mint shadow-[0_0_12px_rgba(52,211,153,0.2)]"
                  : "border-b-dim text-t400 hover:border-b-mid hover:text-t100 hover:bg-white/5"
              )}
            >
              <svg width="14" height="14" viewBox="0 0 12 12"
                fill={bookmarked ? "currentColor" : "none"}
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 2h8v9L6 8.5 2 11V2z" />
              </svg>
            </button>
            <span className="font-mono text-[10px] text-t400 tracking-wider bg-white/5 px-2.5 py-1 rounded-md border border-white/5">{lesson.meta.id}</span>
          </div>
        }
      />

      {/* ── STEPPER BAR (PROGRESS INDICATOR) ── */}
      <div className="px-5 py-3.5 border-b border-b-dim bg-s0 flex items-center justify-between flex-shrink-0 gap-3">
        <div className="flex-1 flex items-center gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === step;
            const isCompleted = stepNum < step;
            return (
              <div
                key={stepNum}
                onClick={() => {
                  if (isCompleted || stepNum === 1 || (stepNum <= 3 && relId) || (stepNum <= 7 && chosenOpt)) {
                    goStep(stepNum as StepId);
                  }
                }}
                className={cn(
                  "h-1.5 rounded-full flex-1 transition-all duration-300 cursor-pointer",
                  isActive 
                    ? "bg-[var(--cat-color)] shadow-[0_0_8px_var(--cat-color)]"
                    : isCompleted
                    ? "bg-[var(--cat-color)] opacity-60"
                    : "bg-white/10 hover:bg-white/20"
                )}
                title={STEP_NAMES[stepNum as StepId]}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <span className="font-mono text-[9px] tracking-wider text-t400 whitespace-nowrap">
            STEP {step}/{TOTAL_STEPS}
          </span>
          <span className="font-mono text-[9px] font-semibold px-2 py-0.5 rounded bg-[var(--cat-color-10)] text-[var(--cat-color)] whitespace-nowrap">
            {STEP_NAMES[step as StepId]}
          </span>
        </div>
      </div>

      {/* ── STEP CONTENT ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-5 py-6 flex flex-col gap-5">

          {/* ══ STEP 1: MISSION ══ */}
          {step === 1 && (
            <StepFade>
              <CategoryBadge category={lesson.meta.category} color={catColor} />
              
              <div className="relative overflow-hidden bg-s1 border border-white/10 rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:border-[var(--cat-color-30)]">
                {/* Grid Background Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--cat-color)] opacity-[0.03] blur-3xl pointer-events-none rounded-full" />
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                  <span className="font-mono text-[9px] text-t400 uppercase tracking-widest">System Online · Incoming Mission</span>
                </div>

                <h1 className="font-syne text-2xl font-extrabold text-t100 leading-snug mb-3 tracking-tight">
                  {lesson.title}
                </h1>
                
                <p className="font-mono text-[11px] text-t300 leading-relaxed mb-6 border-l-2 border-white/15 pl-3">
                  {lesson.context.description}
                </p>

                <div className="space-y-3 mb-6 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  <p className="font-mono text-[8px] tracking-[0.15em] uppercase text-t400 mb-2">Key Objectives</p>
                  {lesson.context.goal.map((g, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="font-mono text-[10px] mt-0.5 text-[var(--cat-color)]">✦</span>
                      <span className="font-mono text-[10.5px] text-t200 leading-[1.5]">{g}</span>
                    </div>
                  ))}
                </div>

                {/* Cultural note */}
                <div
                  className="rounded-xl px-4 py-3.5 border border-[var(--cat-color-20)]"
                  style={{ background: `var(--cat-color-05)` }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--cat-color)" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                    <span className="font-mono text-[8px] tracking-wider uppercase text-[var(--cat-color)] font-bold">Cultural Calibration</span>
                  </div>
                  <p className="font-mono text-[10px] leading-[1.65] text-t300">
                    {lesson.context.cultural_note}
                  </p>
                </div>
              </div>
              
              <CtaButton onClick={() => goStep(2)} catColor={catColor} className="neon-glow-btn">
                Start Mission →
              </CtaButton>
            </StepFade>
          )}

          {/* ══ STEP 2: CHOOSE CONTEXT ══ */}
          {step === 2 && (
            <StepFade>
              <div className="mb-2">
                <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-t400 mb-1">
                  {lesson.relationship_selection.title}
                </p>
                <p className="font-mono text-[11px] text-t300 leading-[1.6]">
                  {lesson.relationship_selection.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {lesson.relationship_selection.options.map((opt) => {
                  const isChosen = relId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setRelId(opt.id)}
                      className={cn(
                        "text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group",
                        isChosen
                          ? "bg-[var(--cat-color-05)] shadow-[0_0_20px_var(--cat-color-20)]"
                          : "border-white/10 bg-s1 hover:border-white/20 hover:bg-s2 hover:-translate-y-1"
                      )}
                      style={isChosen ? { borderColor: "var(--cat-color)", borderWidth: "2px" } : {}}
                    >
                      {isChosen && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--cat-color)" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                      
                      <p className="font-syne text-[14px] font-bold text-t100 mb-1 group-hover:text-[var(--cat-color)] transition-colors">
                        {opt.label}
                      </p>
                      <p className="font-mono text-[9.5px] text-t300 leading-normal mb-3 min-h-[36px]">
                        {opt.summary}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {opt.communication_traits.map((t) => (
                          <span 
                            key={t} 
                            className={cn(
                              "font-mono text-[8px] px-2 py-0.5 rounded-md transition-colors",
                              isChosen 
                                ? "bg-[var(--cat-color-20)] text-[var(--cat-color)] font-semibold"
                                : "bg-white/5 text-t400"
                            )}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <CtaButton
                onClick={() => goStep(3)}
                disabled={!relId}
                catColor={catColor}
                className="neon-glow-btn"
              >
                Continue →
              </CtaButton>
            </StepFade>
          )}

          {/* ══ STEP 3: DECISION ══ */}
          {step === 3 && decVariant && (
            <StepFade>
              <div className="mb-2">
                <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-t400 mb-1">
                  Decision Challenge
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[9px] text-t400">Context:</span>
                  <span className="font-mono text-[9px] font-bold text-[var(--cat-color)] bg-[var(--cat-color-10)] px-2 py-0.5 rounded">
                    {rel?.label}
                  </span>
                </div>
              </div>

              <div className="bg-s1 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                <p className="font-syne text-[18px] font-bold text-t100 leading-snug mb-6">
                  {decVariant.question}
                </p>
                
                <div className="flex flex-col gap-3.5">
                  {decVariant.options.map((opt, i) => {
                    const letters = ["A", "B", "C", "D"];
                    const letter = letters[i] ?? "?";
                    const isChosen = opt === chosenOpt;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => pickDecision(opt)}
                        className={cn(
                          "w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 relative group active:scale-[0.99]",
                          chosenOpt
                            ? isChosen
                              ? opt.tag === "correct"
                                ? "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                : "border-rose-500/40 bg-rose-500/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                              : "border-white/5 opacity-35"
                            : "border-white/10 bg-s2 hover:border-white/20 hover:bg-s3"
                        )}
                        disabled={!!chosenOpt}
                      >
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold border transition-colors flex-shrink-0",
                            chosenOpt
                              ? isChosen
                                ? opt.tag === "correct"
                                  ? "border-emerald-500 bg-emerald-500 text-black"
                                  : "border-rose-500 bg-rose-500 text-white"
                                : "border-white/10 text-t400"
                              : "border-white/15 bg-white/5 text-t300 group-hover:border-white/30 group-hover:bg-white/10"
                          )}>
                            {letter}
                          </span>
                          <p className={cn(
                            "font-syne text-[16px] font-bold flex-1 leading-snug",
                            chosenOpt
                              ? isChosen
                                ? opt.tag === "correct" ? "text-emerald-400" : "text-rose-400"
                                : "text-t400"
                              : "text-t100 group-hover:text-white transition-colors"
                          )}>
                            {opt.text}
                          </p>
                        </div>
                        
                        {chosenOpt === opt && (
                          <div className="mt-3 pl-10 border-t border-white/5 pt-2.5">
                            <p className={cn(
                              "font-mono text-[10px] leading-relaxed",
                              opt.tag === "correct" ? "text-emerald-400/90" : "text-rose-300/90"
                            )}>
                              {opt.feedback}
                            </p>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </StepFade>
          )}

          {/* ══ STEP 4: FEEDBACK ══ */}
          {step === 4 && chosenOpt && (
            <StepFade>
              <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-t400 mb-1">Feedback</p>

              {/* Result banner */}
              <div className={cn(
                "rounded-2xl p-6 border relative overflow-hidden shadow-2xl",
                chosenOpt.tag === "correct"
                  ? "bg-emerald-950/15 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.05)]"
                  : "bg-rose-950/15 border-rose-500/25 shadow-[0_0_30px_rgba(239,68,68,0.05)]"
              )}>
                {/* Floating accent light */}
                <div className={cn(
                  "absolute -top-12 -right-12 w-28 h-28 blur-3xl rounded-full opacity-20 pointer-events-none",
                  chosenOpt.tag === "correct" ? "bg-emerald-500" : "bg-rose-500"
                )} />

                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center shadow-lg",
                    chosenOpt.tag === "correct" ? "bg-emerald-500 text-black" : "bg-rose-500 text-white"
                  )}>
                    {chosenOpt.tag === "correct" ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </div>
                  <p className={cn(
                    "font-syne text-[20px] font-extrabold tracking-tight",
                    chosenOpt.tag === "correct" ? "text-emerald-400" : "text-rose-400"
                  )}>
                    {chosenOpt.tag === "correct" ? "Excellent Choice!" : "Not Quite Perfect"}
                  </p>
                </div>
                
                <p className="font-mono text-[11px] text-t300 leading-relaxed pl-1">
                  {chosenOpt.feedback}
                </p>
                
                {chosenOpt.explanation && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="font-syne text-[14px] font-bold text-t100 mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--cat-color)" }} />
                      {chosenOpt.explanation.title}
                    </p>
                    <p className="font-mono text-[10.5px] text-t300 leading-relaxed mb-3">
                      {chosenOpt.explanation.description}
                    </p>
                    <ul className="grid grid-cols-1 gap-2 bg-black/10 border border-white/5 rounded-xl p-3">
                      {chosenOpt.explanation.details.map((d: string, i: number) => (
                        <li key={i} className="font-mono text-[10px] text-t400 flex items-start gap-2">
                          <span className="text-[var(--cat-color)] mt-0.5">•</span>
                          <span className="leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Comparison of all options — Formality scale representation */}
              {decVariant && (
                <div className="bg-s1 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                  <div className="px-5 py-3.5 border-b border-white/10 bg-white/[0.01] flex items-center justify-between">
                    <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400">
                      Formality Comparison
                    </span>
                    <span className="font-mono text-[8px] text-t400 bg-white/5 px-2 py-0.5 rounded">
                      {rel?.label} Context
                    </span>
                  </div>
                  
                  <div className="divide-y divide-white/5">
                    {decVariant.options.map((opt, i) => {
                      const isNatural  = opt.tag === "correct";
                      const isCasual   = opt.tag === "neutral";
                      const isFormal   = opt.tag === "wrong" && !isCasual;
                      const tagLabel   = isNatural ? "Natural" : isCasual ? "Too casual" : "Too formal";
                      
                      let tagBadgeColor = "text-rose-400 bg-rose-500/10 border-rose-500/20";
                      if (isNatural) tagBadgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
                      if (isCasual) tagBadgeColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";

                      const why = opt.explanation?.formality_analysis?.why_wrong
                        ?? (isNatural ? opt.feedback : opt.explanation?.details[0] ?? "");
                        
                      return (
                        <div key={i} className={cn(
                          "p-4 flex gap-4 transition-colors",
                          opt === chosenOpt ? "bg-white/[0.01]" : ""
                        )}>
                          <span className={cn(
                            "font-mono text-[8px] tracking-wider uppercase px-2.5 py-1 rounded-md border flex-shrink-0 mt-0.5 h-fit text-center min-w-[76px]",
                            tagBadgeColor
                          )}>
                            {tagLabel}
                          </span>
                          <div className="space-y-1">
                            <p className="font-syne text-[15px] font-bold text-t100 leading-tight">
                              {opt.text}
                            </p>
                            <p className="font-mono text-[9.5px] text-t400 leading-relaxed">
                              {why}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <CtaButton onClick={() => goStep(5)} catColor={catColor} className="neon-glow-btn">
                Continue →
              </CtaButton>
            </StepFade>
          )}

          {/* ══ STEP 5: KEY LANGUAGE ══ */}
          {step === 5 && (
            <StepFade>
              <div className="mb-2">
                <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-t400 mb-1">Key Language</p>
                <p className="font-mono text-[11px] text-t300 leading-relaxed">
                  Core expressions for this scenario. Tap an item to review pronunciation and usage details.
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                {vocab.map((item, i) => (
                  <VocabAccordion key={i} item={item} lessonId={lesson.meta.id} catColor={catColor} />
                ))}
              </div>
              
              <CtaButton onClick={() => goStep(6)} catColor={catColor} className="neon-glow-btn">
                Continue →
              </CtaButton>
            </StepFade>
          )}

          {/* ══ STEP 6: NATURAL PHRASES ══ */}
          {step === 6 && (
            <StepFade>
              <div className="mb-2">
                <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-t400 mb-1">Natural Phrases</p>
                <p className="font-mono text-[11px] text-t300 leading-relaxed">
                  Practice speaking these high-frequency phrases suitable for this relationship.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {phrases.map((ph, i) => (
                  <div key={i} className="bg-s1 border border-white/10 rounded-2xl p-5 shadow-lg relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--cat-color)] opacity-[0.01] blur-2xl rounded-full group-hover:opacity-[0.03] transition-opacity" />
                    
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-syne text-[18px] font-extrabold text-t100 tracking-tight leading-snug">
                          {ph.korean}
                        </p>
                        <p className="font-mono text-[9px] tracking-wide mt-1 text-[var(--cat-color)] opacity-80">
                          [ {ph.pronunciation} ]
                        </p>
                      </div>
                      
                      {/* Audio Wave Decorator Button */}
                      <button 
                        aria-label="Play phrase audio"
                        className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-t400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 flex-shrink-0"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                      </button>
                    </div>
                    
                    <p className="font-mono text-[11px] text-t300 mb-3.5 leading-relaxed pl-0.5">
                      {ph.english}
                    </p>
                    
                    <div className="px-4 py-3 rounded-xl bg-black/25 border border-white/5">
                      <p className="font-mono text-[9.5px] text-t400 leading-relaxed">
                        <span className="text-[var(--cat-color)] font-bold mr-1">TIPS:</span> {ph.why_it_works}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tone guidance if available */}
              {toneGuide && (
                <div className="bg-s1 border border-white/10 rounded-2xl overflow-hidden shadow-xl mt-2">
                  <div className="px-5 py-3.5 border-b border-white/10 bg-white/[0.01]">
                    <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400">
                      Tone Calibration Guidance
                    </span>
                  </div>
                  
                  <div className="divide-y divide-white/5">
                    {([
                      { tag: "avoid",   label: "Avoid",   text: toneGuide.avoid,   colorCls: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
                      { tag: "neutral", label: "Neutral",  text: toneGuide.neutral, colorCls: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
                      { tag: "correct", label: "Correct",  text: toneGuide.correct, colorCls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                    ] as const).map((row) => (
                      <div key={row.tag} className="flex gap-4 p-4 items-start">
                        <span className={cn(
                          "font-mono text-[8px] tracking-wider uppercase px-2.5 py-1 rounded-md border flex-shrink-0 mt-0.5 w-[76px] text-center",
                          row.colorCls
                        )}>
                          {row.label}
                        </span>
                        <p className="font-mono text-[10px] leading-relaxed text-t300 pt-0.5">{row.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <CtaButton onClick={() => goStep(7)} catColor={catColor} className="neon-glow-btn">
                Continue →
              </CtaButton>
            </StepFade>
          )}

          {/* ══ STEP 7: MINI QUIZ ══ */}
          {step === 7 && (
            <StepFade>
              <div className="mb-2">
                <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-t400 mb-1">Mini Quiz</p>
                <p className="font-mono text-[11px] text-t300 leading-relaxed">
                  Verify your understanding. Type correct expressions in the blank fields.
                </p>
              </div>
              <MiniQuiz
                items={quiz}
                catColor={catColor}
                onComplete={handleQuizDone}
              />
            </StepFade>
          )}

          {/* ══ STEP 8: COMPLETION ══ */}
          {step === 8 && (
            <StepFade>
              <div className="text-center py-6 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--cat-color)] opacity-[0.06] blur-3xl rounded-full pointer-events-none" />

                {/* Animated circular success check badge */}
                <div 
                  className="w-20 h-20 rounded-2xl border flex items-center justify-center mx-auto mb-5 shadow-2xl relative animate-float-custom"
                  style={{ 
                    borderColor: "var(--cat-color)", 
                    background: `linear-gradient(135deg, var(--cat-color-10), var(--cat-color-20))`,
                    boxShadow: `0 0 30px var(--cat-color-20)`
                  }}
                >
                  <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
                    <path 
                      d="M5 14l6 6L23 8" 
                      stroke="var(--cat-color)" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      style={{
                        strokeDasharray: 50,
                        strokeDashoffset: 0,
                        animation: "checkPop 0.5s ease-out forwards"
                      }}
                    />
                  </svg>
                </div>
                
                <h2 className="font-syne text-2xl font-extrabold mb-1.5 tracking-tight" style={{ color: "var(--cat-color)" }}>
                  Mission Accomplished!
                </h2>
                <p className="font-mono text-[10.5px] text-t400 tracking-wide">
                  {lesson.meta.category.replace(/_/g, " ").toUpperCase()} · {lesson.title}
                </p>
              </div>

              {/* XP Badge with float animation */}
              <div className="flex justify-center mb-2">
                <span className="font-mono text-[11px] font-bold px-6 py-2.5 rounded-xl border flex items-center gap-2 shadow-lg"
                  style={{ 
                    color: "var(--cat-color)", 
                    borderColor: "var(--cat-color-30)", 
                    background: "var(--cat-color-10)",
                    animation: "xpBadgeFloat 2s ease-in-out infinite"
                  }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  +120 XP SECURED
                </span>
              </div>

              {/* Skills Learned Dashboard */}
              <div className="bg-s1 border border-white/10 rounded-2xl p-5 shadow-xl">
                <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400 mb-3.5 pl-0.5">
                  Skills Mastered
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    `Register: ${lesson.meta.category.replace(/_/g, " ")}`,
                    "해요체 (Polite Style) Emotional Calibration",
                    rel ? `Target Relationship: ${rel.label}` : "Relationship-based tone",
                    "Formality Contextual Flexibility",
                  ].map((skill, i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-white/[0.01] border border-white/5">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--cat-color-10)" }}>
                        <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                          <path d="M2 6.5l3 3L11 3" stroke="var(--cat-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="font-mono text-[10.5px] text-t200 font-semibold">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quiz score summary */}
              {quizScores.length > 0 && (
                <div className="bg-s1 border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between shadow-md">
                  <span className="font-mono text-[10px] text-t400 font-medium">Evaluation Performance</span>
                  <span className="font-mono text-[14px] font-bold px-3 py-1 rounded-lg" style={{ color: "var(--cat-color)", backgroundColor: "var(--cat-color-10)" }}>
                    {quizScores.filter(Boolean).length} / {quizScores.length} Correct
                  </span>
                </div>
              )}

              {/* Gamified Action Buttons */}
              <div className="flex flex-col gap-2.5 mt-2">
                <Link href={catPath}
                  className="w-full text-center py-4 rounded-xl font-mono text-[11px] tracking-widest uppercase font-bold text-black transition-all hover:opacity-90 active:scale-[0.99] shadow-lg shadow-[var(--cat-color-20)]"
                  style={{ background: "var(--cat-color)" }}>
                  Advance to Next Mission →
                </Link>
                
                <button onClick={restart}
                  className="w-full py-4 rounded-xl font-mono text-[11px] tracking-widest uppercase font-bold text-t200 border border-white/10 bg-white/5 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-[0.99]">
                  Replay Scenario {rel ? `(${rel.label === "Closer colleague" ? "Senior colleague" : "Closer colleague"})` : ""}
                </button>
                
                <Link href="/dashboard"
                  className="w-full text-center py-4 rounded-xl font-mono text-[11px] tracking-widest uppercase font-bold text-t400 border border-white/5 hover:text-t200 hover:bg-white/5 transition-all active:scale-[0.99]">
                  Return to Dashboard
                </Link>
              </div>
            </StepFade>
          )}

        </div>
      </div>
    </main>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SUB-COMPONENTS — all in this file, no extra imports needed
// ═══════════════════════════════════════════════════════════════════

// ── Fade wrapper ─────────────────────────────────────────────────
function StepFade({ children }: { children?: any }) {
  return (
    <div className="animate-fade-up-custom flex flex-col gap-4 pb-8">
      {children}
    </div>
  );
}

// ── Category badge ────────────────────────────────────────────────
function CategoryBadge({ category, color }: { category: string; color: string }) {
  const label = category.replace(/_/g, " ");
  return (
    <span
      className="inline-flex font-mono text-[8px] tracking-[0.14em] uppercase px-3.5 py-1.5 rounded-full border self-start font-bold"
      style={{ color, borderColor: `${color}40`, background: `${color}10` }}
    >
      {label}
    </span>
  );
}

// ── CTA button ────────────────────────────────────────────────────
function CtaButton({
  onClick,
  disabled,
  children,
  catColor,
  className,
}: {
  onClick: () => void;
  disabled?: boolean;
  children?: any;
  catColor: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full py-4 rounded-xl font-mono text-[11px] tracking-widest uppercase font-bold text-black transition-all disabled:opacity-35 disabled:cursor-not-allowed active:scale-[0.99]",
        className
      )}
      style={{ background: catColor }}
    >
      {children}
    </button>
  );
}

// ── Vocab accordion ───────────────────────────────────────────────
function VocabAccordion({
  item,
  lessonId,
  catColor,
}: {
  item: VocabularyItem;
  lessonId: string;
  catColor: string;
}) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  // Check if already saved on mount
  useEffect(() => {
    const lp = progressStore.getLesson(lessonId);
    setSaved(lp.savedExpressions.includes(item.word));
  }, [lessonId, item.word]);

  function toggleSave(e: React.MouseEvent) {
    e.stopPropagation();
    if (saved) {
      progressStore.removeExpression(lessonId, item.word);
      setSaved(false);
    } else {
      progressStore.saveExpression(lessonId, item.word);
      setSaved(true);
    }
  }

  return (
    <div className={cn(
      "border rounded-xl overflow-hidden transition-all duration-300 shadow-md",
      open 
        ? "border-[var(--cat-color-30)] bg-s2" 
        : "border-white/10 bg-s1 hover:border-white/20 hover:bg-s2"
    )}
    style={open ? { boxShadow: "0 4px 20px rgba(0,0,0,0.2)" } : {}}
    >
      <button
        onClick={() => setOpen((o: boolean) => !o)}
        className="w-full flex items-center justify-between px-4.5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <p className="font-syne text-[17px] font-bold text-t100">
            {item.word}
          </p>
          <div className="w-[1px] h-3.5 bg-white/10 flex-shrink-0" />
          <p className="font-mono text-[11px] text-t300 truncate pr-2">
            {item.meaning}
          </p>
        </div>
        
        <div className="flex items-center gap-3.5 flex-shrink-0">
          <button
            onClick={toggleSave}
            aria-label={saved ? "Remove saved" : "Save word"}
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-300 active:scale-75",
              saved 
                ? "border-mint/50 bg-mint/15 text-mint shadow-[0_0_8px_rgba(52,211,153,0.15)]" 
                : "border-white/10 text-t400 hover:text-t200 hover:border-white/20 hover:bg-white/5"
            )}
          >
            <svg width="10" height="10" viewBox="0 0 12 12"
              fill={saved ? "currentColor" : "none"}
              stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 2h8v9L6 8.5 2 11V2z" />
            </svg>
          </button>
          
          <svg
            width="12" height="12" viewBox="0 0 13 13" fill="none"
            className={cn("transition-transform duration-300 text-t400", open && "rotate-180")}
          >
            <path d="M2.5 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>
      
      {open && (
        <div className="px-5 pb-4.5 pt-1 border-t border-white/5 bg-black/10 animate-fade-up-custom">
          {item.pronunciation && (
            <p className="font-mono text-[10px] mt-2 mb-2 font-medium" style={{ color: "var(--cat-color)" }}>
              [ {item.pronunciation} ]
            </p>
          )}
          <p className="font-mono text-[11px] text-t300 leading-relaxed mb-3">
            {item.usage}
          </p>
          {item.formality && (
            <span className="inline-block font-mono text-[8px] font-bold px-2.5 py-0.5 rounded bg-white/5 text-t400 border border-white/5">
              {item.formality}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ── Mini Quiz ─────────────────────────────────────────────────────
function MiniQuiz({
  items,
  catColor,
  onComplete,
}: {
  items: QuizItem[];
  catColor: string;
  onComplete: (scores: boolean[]) => void;
}) {
  // Each item: answer typed by user, whether checked, whether correct
  const [answers, setAnswers]   = useState<string[]>(items.map(() => ""));
  const [checked, setChecked]   = useState<boolean[]>(items.map(() => false));
  const [correct, setCorrect]   = useState<boolean[]>(items.map(() => false));

  const allChecked = checked.every(Boolean);

  function checkOne(i: number) {
    const item = items[i];
    const val  = answers[i].trim();
    // Accept if val matches answer or blank field
    const isOk = val.toLowerCase() === item.answer.toLowerCase() || val.toLowerCase() === item.blank.toLowerCase();
    const nc = [...correct]; nc[i] = isOk; setCorrect(nc);
    const nch = [...checked]; nch[i] = true; setChecked(nch);

    // If this was the last one, report completion
    const allDone = nch.every(Boolean);
    if (allDone) {
      onComplete(nc);
    }
  }

  // Always call hooks before any early return
  const noItems = items.length === 0;
  useEffect(() => {
    if (noItems) onComplete([]);
  }, [noItems, onComplete]);

  if (noItems) return null;

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div key={i} className="bg-s1 border border-white/10 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <p className="font-syne text-[14px] font-bold text-t200 mb-4 leading-relaxed pl-0.5">
            {item.question}
          </p>
          
          <div className="flex items-center gap-2 flex-wrap">
            {item.prefix && (
              <span className="font-syne text-[15px] font-bold text-t300">{item.prefix}</span>
            )}
            
            <input
              type="text"
              value={answers[i]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const a = [...answers]; a[i] = e.target.value; setAnswers(a);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { 
                if (e.key === "Enter" && !checked[i] && answers[i].trim()) {
                  checkOne(i); 
                }
              }}
              disabled={checked[i]}
              placeholder={item.hint ?? "Enter expression..."}
              aria-label={`Answer for: ${item.question}`}
              className={cn(
                "font-mono text-[13px] px-4 py-2.5 rounded-xl border outline-none transition-all duration-300 min-w-[140px] flex-1",
                checked[i]
                  ? correct[i]
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-semibold"
                    : "border-rose-500/50 bg-rose-500/10 text-rose-400 font-semibold"
                  : "border-white/10 bg-s2 text-t100 focus:border-[var(--cat-color)] focus:bg-s3 focus:shadow-[0_0_12px_var(--cat-color-20)]"
              )}
            />
            
            {item.suffix && (
              <span className="font-syne text-[15px] font-bold text-t300">{item.suffix}</span>
            )}
            
            {!checked[i] && (
              <button
                onClick={() => {
                  if (answers[i].trim()) checkOne(i);
                }}
                disabled={!answers[i].trim()}
                className="font-mono text-[9px] tracking-widest uppercase px-4 py-2.5 rounded-xl border border-white/10 text-t300 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Verify
              </button>
            )}
          </div>
          
          {checked[i] && (
            <div className="mt-3.5 flex items-start gap-2 pl-0.5 animate-fade-up-custom">
              <span className={cn(
                "font-mono text-[9.5px] font-bold",
                correct[i] ? "text-emerald-400" : "text-rose-400"
              )}>
                {correct[i] ? "✓ CORRECT" : `✗ INCORRECT`}
              </span>
              {!correct[i] && (
                <span className="font-mono text-[9.5px] text-t400">
                  · Correct response: <strong className="text-white font-mono">{item.answer}</strong>
                </span>
              )}
            </div>
          )}
        </div>
      ))}

      {!allChecked && (
        <p className="font-mono text-[9px] text-t400 text-center mt-1 animate-pulse">
          Complete all items to advance to final calibration.
        </p>
      )}
    </div>
  );
}
