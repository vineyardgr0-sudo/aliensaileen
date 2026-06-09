"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  }, []);

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
    <main className="min-h-screen bg-s0 flex flex-col">

      {/* ── NAV ── */}
      <Nav
        left={<BackButton href={catPath} label="Lessons" />}
        right={
          <div className="flex items-center gap-2">
            <button
              onClick={toggleBookmark}
              aria-label={bookmarked ? "Remove bookmark" : "Bookmark lesson"}
              className={cn(
                "w-8 h-8 rounded-full border flex items-center justify-center transition-all",
                bookmarked
                  ? "border-mint/40 bg-mint/10 text-mint"
                  : "border-b-dim text-t400 hover:border-b-mid hover:text-t100"
              )}
            >
              <svg width="12" height="12" viewBox="0 0 12 12"
                fill={bookmarked ? "currentColor" : "none"}
                stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 2h8v9L6 8.5 2 11V2z" />
              </svg>
            </button>
            <span className="font-mono text-[9px] text-t400 tracking-wider">{lesson.meta.id}</span>
          </div>
        }
      />

      {/* ── PROGRESS BAR ── */}
      <div className="h-[3px] bg-b-dim flex-shrink-0">
        <div
          className="h-full transition-all duration-500 ease-smooth"
          style={{ width: `${pct}%`, background: catColor }}
        />
      </div>

      {/* ── PROGRESS HEADER ── */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-b-dim bg-s0 flex-shrink-0">
        <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400">
          Step {step} of {TOTAL_STEPS}
        </span>
        <span className="font-mono text-[9px] font-medium" style={{ color: catColor }}>
          {STEP_NAMES[step as StepId]}
        </span>
      </div>

      {/* ── STEP CONTENT ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-5 py-5 flex flex-col gap-4">

          {/* ══ STEP 1: MISSION ══ */}
          {step === 1 && (
            <StepFade>
              <CategoryBadge category={lesson.meta.category} color={catColor} />
              <div className="bg-s1 border border-b-dim rounded-2xl p-5">
                <p className="font-syne text-xl font-extrabold text-t100 leading-snug mb-3">
                  {lesson.title}
                </p>
                <p className="font-mono text-[10px] text-t300 leading-[1.75] mb-4">
                  {lesson.context.description}
                </p>
                <div className="flex flex-col gap-1.5 mb-4">
                  {lesson.context.goal.map((g, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-mono text-[9px] mt-0.5" style={{ color: catColor }}>→</span>
                      <span className="font-mono text-[9px] text-t300 leading-[1.6]">{g}</span>
                    </div>
                  ))}
                </div>
                {/* Cultural note */}
                <div
                  className="rounded-xl px-3.5 py-3"
                  style={{ background: `${catColor}0d`, borderLeft: `2px solid ${catColor}` }}
                >
                  <p className="font-mono text-[9px] leading-[1.7]" style={{ color: `${catColor}CC` }}>
                    {lesson.context.cultural_note}
                  </p>
                </div>
              </div>
              <CtaButton onClick={() => goStep(2)} catColor={catColor}>
                Start Mission →
              </CtaButton>
            </StepFade>
          )}

          {/* ══ STEP 2: CHOOSE CONTEXT ══ */}
          {step === 2 && (
            <StepFade>
              <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400">
                {lesson.relationship_selection.title}
              </p>
              <p className="font-mono text-[10px] text-t300 leading-[1.65]">
                {lesson.relationship_selection.description}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {lesson.relationship_selection.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setRelId(opt.id)}
                    className={cn(
                      "text-left p-4 rounded-2xl border transition-all",
                      relId === opt.id
                        ? "border-2 bg-s2"
                        : "border-b-mid bg-s1 hover:border-b-hi"
                    )}
                    style={relId === opt.id ? { borderColor: catColor, background: `${catColor}08` } : {}}
                  >
                    <p className="font-syne text-[13px] font-bold text-t100 mb-1">{opt.label}</p>
                    <p className="font-mono text-[8.5px] text-t400 mb-2">{opt.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {opt.communication_traits.slice(0, 3).map((t) => (
                        <span key={t} className="font-mono text-[7.5px] px-2 py-0.5 rounded-full bg-b-dim text-t400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
              <CtaButton
                onClick={() => goStep(3)}
                disabled={!relId}
                catColor={catColor}
              >
                Continue →
              </CtaButton>
            </StepFade>
          )}

          {/* ══ STEP 3: DECISION ══ */}
          {step === 3 && decVariant && (
            <StepFade>
              <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400">
                Decision Challenge
              </p>
              <div className="bg-s1 border border-b-mid rounded-2xl p-5">
                <p className="font-syne text-[17px] font-bold text-t100 leading-snug mb-5">
                  {decVariant.question}
                </p>
                <div className="flex flex-col gap-3">
                  {decVariant.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => pickDecision(opt)}
                      className={cn(
                        "w-full text-left px-4 py-4 rounded-xl border transition-all",
                        chosenOpt
                          ? opt === chosenOpt
                            ? opt.tag === "correct"
                              ? "border-[rgba(16,185,129,0.5)] bg-[rgba(16,185,129,0.07)]"
                              : "border-[rgba(239,68,68,0.4)] bg-[rgba(239,68,68,0.06)]"
                            : "border-b-dim opacity-40"
                          : "border-b-mid bg-s2 hover:border-b-hi hover:bg-s3 active:scale-[0.99]"
                      )}
                      disabled={!!chosenOpt}
                    >
                      <p className={cn(
                        "font-syne text-[17px] font-bold",
                        chosenOpt
                          ? opt === chosenOpt
                            ? opt.tag === "correct" ? "text-emerald-400" : "text-red-400"
                            : "text-t400"
                          : "text-t100"
                      )}>
                        {opt.text}
                      </p>
                      {chosenOpt === opt && (
                        <p className="font-mono text-[9px] mt-1.5 leading-[1.6]"
                          style={{
                            color: opt.tag === "correct" ? "rgba(52,211,153,0.8)" : "rgba(252,165,165,0.8)"
                          }}>
                          {opt.feedback}
                        </p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </StepFade>
          )}

          {/* ══ STEP 4: FEEDBACK ══ */}
          {step === 4 && chosenOpt && (
            <StepFade>
              <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400">Feedback</p>

              {/* Result banner */}
              <div className={cn(
                "rounded-2xl p-5 border",
                chosenOpt.tag === "correct"
                  ? "bg-[rgba(16,185,129,0.07)] border-[rgba(16,185,129,0.3)]"
                  : "bg-[rgba(239,68,68,0.06)] border-[rgba(239,68,68,0.25)]"
              )}>
                <p className={cn(
                  "font-syne text-[18px] font-extrabold mb-2",
                  chosenOpt.tag === "correct" ? "text-emerald-400" : "text-red-400"
                )}>
                  {chosenOpt.tag === "correct" ? "✓ Correct" : "✗ Not quite"}
                </p>
                <p className="font-mono text-[10px] text-t300 leading-[1.7]">{chosenOpt.feedback}</p>
                {chosenOpt.explanation && (
                  <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                    <p className="font-syne text-[12px] font-bold text-t200 mb-1">
                      {chosenOpt.explanation.title}
                    </p>
                    <p className="font-mono text-[9.5px] text-t300 leading-[1.7] mb-2">
                      {chosenOpt.explanation.description}
                    </p>
                    <ul className="flex flex-col gap-1">
                      {chosenOpt.explanation.details.map((d: string, i: number) => (
                        <li key={i} className="font-mono text-[9px] text-t400 flex items-start gap-1.5">
                          <span className="mt-0.5 text-t400">·</span>{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Reference comparison — always shown */}
              {decVariant && (
                <div className="bg-s1 border border-b-dim rounded-2xl overflow-hidden">
                  <p className="font-mono text-[7.5px] tracking-[0.18em] uppercase text-t400 px-4 py-3 border-b border-b-dim">
                    Why it sounds that way
                  </p>
                  {decVariant.options.map((opt, i) => {
                    const isNatural  = opt.tag === "correct";
                    const isCasual   = opt.tag === "neutral";
                    const isFormal   = opt.tag === "wrong" && !isCasual;
                    const tagLabel   = isNatural ? "Natural" : isCasual ? "Too casual" : "Too formal";
                    const tagStyle   = isNatural
                      ? { background: "rgba(16,185,129,0.12)", color: "#34d399" }
                      : isCasual
                      ? { background: "rgba(245,158,11,0.12)", color: "#fbbf24" }
                      : { background: "rgba(239,68,68,0.1)", color: "#f87171" };
                    const why = opt.explanation?.formality_analysis?.why_wrong
                      ?? (isNatural ? opt.feedback : opt.explanation?.details[0] ?? "");
                    return (
                      <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-b-dim last:border-b-0">
                        <span className="font-mono text-[7px] tracking-[0.1em] uppercase px-2 py-0.5 rounded flex-shrink-0 mt-0.5 whitespace-nowrap" style={tagStyle}>
                          {tagLabel}
                        </span>
                        <div>
                          <p className="font-syne text-[15px] font-bold text-t100 mb-0.5">{opt.text}</p>
                          <p className="font-mono text-[8.5px] text-t400 leading-[1.55]">{why}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <CtaButton onClick={() => goStep(5)} catColor={catColor}>
                Continue →
              </CtaButton>
            </StepFade>
          )}

          {/* ══ STEP 5: KEY LANGUAGE ══ */}
          {step === 5 && (
            <StepFade>
              <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400">Key Language</p>
              <p className="font-mono text-[10px] text-t300">
                Vocabulary relevant to this relationship and context. Tap to expand.
              </p>
              <div className="flex flex-col gap-2">
                {vocab.map((item, i) => (
                  <VocabAccordion key={i} item={item} lessonId={lesson.meta.id} catColor={catColor} vocabIndex={i} />
                ))}
              </div>
              <CtaButton onClick={() => goStep(6)} catColor={catColor}>
                Continue →
              </CtaButton>
            </StepFade>
          )}

          {/* ══ STEP 6: NATURAL PHRASES ══ */}
          {step === 6 && (
            <StepFade>
              <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400">Natural Phrases</p>
              <div className="flex flex-col gap-3">
                {phrases.map((ph, i) => {
                  const idx = String(i + 1).padStart(2, "0");
                  const audioSrc = ph.audio_url
                    ?? `/audio/${lesson.meta.id}/${relId}/ph_${idx}.m4a`;
                  return (
                    <div key={i} className="bg-s1 border border-b-dim rounded-2xl p-4">
                      <p className="font-syne text-[17px] font-bold text-t100 mb-1">{ph.korean}</p>
                      <AudioPlayer src={audioSrc} catColor={catColor} />
                      <p className="font-mono text-[8.5px] mt-2 mb-2" style={{ color: `${catColor}70` }}>{ph.pronunciation}</p>
                      <p className="font-mono text-[10px] text-t300 mb-3">{ph.english}</p>
                      <div className="px-3 py-2 rounded-lg bg-s2">
                        <p className="font-mono text-[9px] text-t300 leading-[1.65]">{ph.why_it_works}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tone guidance if available */}
              {toneGuide && (
                <div className="bg-s1 border border-b-dim rounded-2xl overflow-hidden">
                  <p className="font-mono text-[7.5px] tracking-[0.18em] uppercase text-t400 px-4 py-3 border-b border-b-dim">
                    Tone guidance
                  </p>
                  {([
                    { tag: "avoid",   label: "Avoid",   text: toneGuide.avoid,   cls: "rgba(239,68,68,0.1)",  txt: "#f87171", bg: "rgba(239,68,68,0.04)"  },
                    { tag: "neutral", label: "Neutral",  text: toneGuide.neutral, cls: "rgba(245,158,11,0.1)", txt: "#fbbf24", bg: "rgba(245,158,11,0.03)" },
                    { tag: "correct", label: "Correct",  text: toneGuide.correct, cls: "rgba(16,185,129,0.12)",txt: "#34d399", bg: "rgba(16,185,129,0.04)" },
                  ] as const).map((row) => (
                    <div key={row.tag} className="flex items-start gap-3 px-4 py-3 border-b border-b-dim last:border-b-0" style={{ background: row.bg }}>
                      <span className="font-mono text-[7px] tracking-[0.1em] uppercase px-2 py-0.5 rounded flex-shrink-0 mt-0.5 whitespace-nowrap" style={{ background: row.cls, color: row.txt }}>
                        {row.label}
                      </span>
                      <p className="font-mono text-[9px] leading-[1.65]" style={{ color: row.txt }}>{row.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <CtaButton onClick={() => goStep(7)} catColor={catColor}>
                Continue →
              </CtaButton>
            </StepFade>
          )}

          {/* ══ STEP 7: MINI QUIZ ══ */}
          {step === 7 && (
            <StepFade>
              <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400">Mini Quiz</p>
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
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto mb-4"
                  style={{ borderColor: catColor, background: `${catColor}12` }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 14l6 6L23 8" stroke={catColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-syne text-2xl font-extrabold mb-1" style={{ color: catColor }}>
                  Mission Complete
                </p>
                <p className="font-mono text-[10px] text-t400 mb-5">
                  {lesson.meta.category.replace(/_/g, " ")} · {lesson.title}
                </p>
              </div>

              {/* XP badge */}
              <div className="flex justify-center mb-4">
                <span className="font-mono text-[10px] font-medium px-5 py-2 rounded-full border"
                  style={{ color: catColor, borderColor: `${catColor}40`, background: `${catColor}0d` }}>
                  +120 XP earned
                </span>
              </div>

              {/* Skills */}
              <div className="bg-s1 border border-b-dim rounded-2xl p-5 mb-4">
                <p className="font-mono text-[7.5px] tracking-[0.18em] uppercase text-t400 mb-3">
                  Skills learned
                </p>
                {[
                  `${lesson.meta.category.replace(/_/g, " ")} Register`,
                  "해요체 — emotional calibration",
                  rel ? `Speaking to ${rel.label}` : "Relationship-based tone",
                  "Contextual explanation",
                ].map((skill, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-2 border-b border-b-dim last:border-b-0">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 6.5l3 3L11 3" stroke={catColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-mono text-[10px] text-t200">{skill}</span>
                  </div>
                ))}
              </div>

              {/* Quiz score */}
              {quizScores.length > 0 && (
                <div className="bg-s1 border border-b-dim rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-t400">Quiz score</span>
                  <span className="font-mono text-[13px] font-bold" style={{ color: catColor }}>
                    {quizScores.filter(Boolean).length}/{quizScores.length} correct
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Link href={catPath}
                  className="w-full text-center py-3.5 rounded-xl font-mono text-[10px] tracking-wider uppercase font-medium text-s0 transition-opacity hover:opacity-90"
                  style={{ background: catColor }}>
                  Next Lesson →
                </Link>
                <button onClick={restart}
                  className="w-full py-3.5 rounded-xl font-mono text-[10px] tracking-wider uppercase text-t300 border border-b-mid hover:text-t100 transition-colors">
                  Replay with {rel
                    ? lesson.relationship_selection.options.find((o) => o.id !== relId)?.label ?? "another"
                    : "another"}
                </button>
                <Link href="/dashboard"
                  className="w-full text-center py-3.5 rounded-xl font-mono text-[10px] tracking-wider uppercase text-t400 border border-b-dim hover:text-t300 transition-colors">
                  Dashboard
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

// ── Audio Player ──────────────────────────────────────────────────
function AudioPlayer({ src, catColor }: { src: string; catColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef  = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying]   = useState(false);
  const [loaded,  setLoaded]    = useState(false);
  const [error,   setError]     = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef   = useRef<MediaElementAudioSourceNode | null>(null);

  // Draw static bars on mount
  useEffect(() => {
    drawBars(new Float32Array(64).fill(0.08), false);
  }, []);

  function drawBars(data: Float32Array, active: boolean) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.offsetWidth || 200;
    const H = 36;
    canvas.width  = W;
    canvas.height = H;
    ctx.clearRect(0, 0, W, H);
    const barW = 3, gap = 2, total = barW + gap;
    const bars = Math.floor(W / total);
    for (let i = 0; i < bars; i++) {
      const idx = Math.floor(i / bars * data.length);
      const amp  = Math.min(1, Math.abs(data[idx] || 0.06));
      const h    = Math.max(3, amp * H * 0.9);
      const y    = (H - h) / 2;
      ctx.fillStyle = active ? catColor : "rgba(255,255,255,0.18)";
      ctx.globalAlpha = active ? 0.85 : 0.5;
      ctx.beginPath();
      (ctx as any).roundRect?.(i * total, y, barW, h, 1.5) ??
        ctx.rect(i * total, y, barW, h);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function animateWave() {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const buf = new Float32Array(analyser.fftSize);
    function frame() {
      if (analyser) {
        analyser.getFloatTimeDomainData(buf);
      }
      drawBars(buf, true);
      const audio = audioRef.current;
      if (audio) setProgress(audio.currentTime / (audio.duration || 1));
      if (!audioRef.current?.paused) rafRef.current = requestAnimationFrame(frame);
      else { drawBars(new Float32Array(64).fill(0.08), false); setProgress(0); }
    }
    rafRef.current = requestAnimationFrame(frame);
  }

  async function toggle() {
    if (error) return;

    // Lazy-init audio
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.oncanplaythrough = () => setLoaded(true);
      audio.onerror = () => setError(true);
      audio.onended = () => { setPlaying(false); setProgress(0); drawBars(new Float32Array(64).fill(0.08), false); };
      audioRef.current = audio;

      // Web Audio API setup
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      const source = ctx.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current   = source;
    }

    const audio = audioRef.current;
    if (audioCtxRef.current?.state === "suspended") await audioCtxRef.current.resume();

    if (playing) {
      audio.pause();
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
      drawBars(new Float32Array(64).fill(0.08), false);
    } else {
      await audio.play();
      setPlaying(true);
      animateWave();
    }
  }

  if (error) return null;

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={toggle}
        aria-label={playing ? "Stop" : "Play pronunciation"}
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all border"
        style={{
          background: playing ? catColor : `${catColor}18`,
          borderColor: `${catColor}50`,
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          {playing
            ? <><rect x="2" y="2" width="2.5" height="6" rx="0.5" fill={catColor === "#00e5b4" ? "#0a0a0b" : "#fff"}/><rect x="5.5" y="2" width="2.5" height="6" rx="0.5" fill={catColor === "#00e5b4" ? "#0a0a0b" : "#fff"}/></>
            : <path d="M3 2l5 3-5 3V2z" fill={catColor}/>
          }
        </svg>
      </button>
      <div className="flex-1 relative">
        <canvas ref={canvasRef} style={{ width: "100%", height: "36px", display: "block" }} />
        {playing && (
          <div className="absolute bottom-0 left-0 h-[2px] transition-all rounded-full"
            style={{ width: `${progress * 100}%`, background: catColor }} />
        )}
      </div>
    </div>
  );
}

// ── Fade wrapper ─────────────────────────────────────────────────
function StepFade({ children }: { children?: any }) {
  return (
    <div className="animate-fade-up flex flex-col gap-4 pb-8">
      {children}
    </div>
  );
}

// ── Category badge ────────────────────────────────────────────────
function CategoryBadge({ category, color }: { category: string; color: string }) {
  const label = category.replace(/_/g, " ");
  return (
    <span
      className="inline-flex font-mono text-[8px] tracking-[0.14em] uppercase px-3 py-1 rounded-full border self-start"
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
}: {
  onClick: () => void;
  disabled?: boolean;
  children?: any;
  catColor: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3.5 rounded-xl font-mono text-[10px] tracking-wider uppercase font-medium text-s0 transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.99]"
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
  vocabIndex,
}: {
  item: VocabularyItem;
  lessonId: string;
  catColor: string;
  vocabIndex: number;
  key?: number;
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
    <div className="bg-s1 border border-b-dim rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o: boolean) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <p className="font-syne text-[16px] font-bold text-t100">{item.word}</p>
          <p className="font-mono text-[10px] text-t400">{item.meaning}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleSave}
            aria-label={saved ? "Remove saved" : "Save word"}
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center border transition-all",
              saved ? "border-mint/40 bg-mint/10 text-mint" : "border-b-mid text-t400 hover:text-t200"
            )}
          >
            <svg width="9" height="9" viewBox="0 0 12 12"
              fill={saved ? "currentColor" : "none"}
              stroke="currentColor" strokeWidth="1.3"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 2h8v9L6 8.5 2 11V2z" />
            </svg>
          </button>
          <svg
            width="13" height="13" viewBox="0 0 13 13" fill="none"
            className={cn("transition-transform duration-200 text-t400", open && "rotate-180")}
          >
            <path d="M2.5 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-3 border-t border-b-dim">
          {item.pronunciation && (
            <p className="font-mono text-[9px] mt-2.5 mb-1.5" style={{ color: `${catColor}80` }}>
              {item.pronunciation}
            </p>
          )}
          <AudioPlayer
            src={`/audio/${lessonId}/vocab/vc_${String(vocabIndex + 1).padStart(2, "0")}.m4a`}
            catColor={catColor}
          />
          <p className="font-mono text-[10px] text-t300 leading-[1.65] mt-2">{item.usage}</p>
          {item.formality && (
            <span className="inline-block mt-2 font-mono text-[7.5px] px-2 py-0.5 rounded-full bg-b-dim text-t400">
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
    const isOk = val === item.answer || val === item.blank;
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
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="bg-s1 border border-b-dim rounded-2xl p-4">
          <p className="font-syne text-[13px] font-bold text-t200 mb-3 leading-snug">
            {item.question}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {item.prefix && (
              <span className="font-syne text-[14px] font-bold text-t300">{item.prefix}</span>
            )}
            <input
              type="text"
              value={answers[i]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const a = [...answers]; a[i] = e.target.value; setAnswers(a);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter" && !checked[i]) checkOne(i); }}
              disabled={checked[i]}
              placeholder={item.hint ?? "___"}
              aria-label={`Answer for: ${item.question}`}
              className={cn(
                "font-mono text-[13px] px-3 py-2 rounded-lg border outline-none transition-all min-w-[80px]",
                checked[i]
                  ? correct[i]
                    ? "border-[rgba(16,185,129,0.5)] bg-[rgba(16,185,129,0.06)] text-emerald-400"
                    : "border-[rgba(239,68,68,0.4)] bg-[rgba(239,68,68,0.06)] text-red-400"
                  : "border-b-mid bg-s2 text-t100 focus:border-b-hi"
              )}
            />
            {item.suffix && (
              <span className="font-syne text-[14px] font-bold text-t300">{item.suffix}</span>
            )}
            {!checked[i] && (
              <button
                onClick={() => checkOne(i)}
                className="font-mono text-[8px] tracking-wider uppercase px-3 py-2 rounded-lg border border-b-mid text-t300 hover:text-t100 transition-colors"
              >
                Check
              </button>
            )}
          </div>
          {checked[i] && (
            <p className={cn(
              "font-mono text-[9px] mt-2 leading-[1.6]",
              correct[i] ? "text-emerald-400" : "text-red-400"
            )}>
              {correct[i] ? `✓ Correct` : `✗ Answer: ${item.answer}`}
            </p>
          )}
        </div>
      ))}

      {!allChecked && (
        <p className="font-mono text-[8.5px] text-t400 text-center">
          Check all answers to continue
        </p>
      )}
    </div>
  );
}
