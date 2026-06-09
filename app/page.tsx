"use client";

// ================================================================
// FILE: app/page.tsx  (REPLACE EXISTING)
// CHANGES:
//   1. Hero — same copy, stronger visual hierarchy
//   2. "BEGIN TRAINING" replaces plain "Sign In" card
//   3. Relationship Profiler replaces static sign-in gate
//   4. Live mini-demo shows output change on category select
//   5. Local mock auth flow fires after profiler selection
// UNTOUCHED: all lesson data, routing, auth provider
// ================================================================

import { useState, useEffect } from "react";

const CATEGORIES = [
  {
    id: "workplace",
    kor: "회사",
    en: "Workplace",
    traits: ["hierarchy", "register"],
    demo: [
      { rel: "상사", out: "저 왔습니다.", note: "습니다체 — hierarchically correct" },
      { rel: "동료", out: "왔어요 / 나 왔어", note: "depends on closeness" },
    ],
  },
  {
    id: "dating",
    kor: "데이트",
    en: "Dating",
    traits: ["warmth", "썸 / 소개팅"],
    demo: [
      { rel: "썸", out: "저 왔어요 :)", note: "해요체 — warm, first impression" },
      { rel: "연인", out: "나 왔어!", note: "반말 — natural with closeness" },
    ],
  },
  {
    id: "fan_meeting",
    kor: "팬미팅",
    en: "Fan Meeting",
    traits: ["K-pop", "fan culture"],
    demo: [
      { rel: "아이돌", out: "안녕하세요! 팬이에요.", note: "해요체 — warm, conversational" },
      { rel: "선배 팬", out: "안녕하세요~", note: "polite peer register" },
    ],
  },
  {
    id: "daily_life",
    kor: "일상",
    en: "Daily Life",
    traits: ["social", "everyday"],
    demo: [
      { rel: "선배", out: "안녕하세요, 저 왔어요.", note: "해요체 — respectful casual" },
      { rel: "친구", out: "나 왔어!", note: "반말 — natural" },
    ],
  },
];

type Phase = "hero" | "profiler" | "entering";

export default function LandingPage() {
  const [phase, setPhase] = useState<Phase>("hero");
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("mock_user_email");
    if (saved) {
      setUserEmail(saved);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("mock_user_email");
    setUserEmail(null);
  };

  const activeId = hovered || selected || "workplace";
  const activeCategory = CATEGORIES.find((c) => c.id === activeId)!;

  function handleStart() {
    setPhase("profiler");
    setSelected("workplace");
  }

  function handleSelect(id: string) {
    setSelected(id);
    setPhase("entering");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("aileen_initial_category", id);
    }
    setTimeout(() => {
      localStorage.setItem("mock_user_email", "mungyuri@gmail.com");
      window.location.href = "/dashboard";
    }, 700);
  }

  return (
    <main className="min-h-screen bg-s0 text-white flex flex-col">

      {/* ── NAV ──────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-5 py-4 border-b border-b-dim">
        <span className="font-mono text-[10px] text-t200 tracking-[0.22em]">
          ALIEN&apos;S <span className="text-mint">AILEEN</span>
        </span>
        <div className="flex items-center gap-3.5">
          {mounted && userEmail ? (
            <>
              <a
                href="/dashboard"
                className="font-mono text-[10px] tracking-wider uppercase text-mint hover:underline font-bold"
              >
                Dashboard
              </a>
              <button
                onClick={handleSignOut}
                className="font-mono text-[9px] tracking-wider uppercase border border-[rgba(255,255,255,0.12)] text-t300 hover:text-t100 rounded-full px-3 py-1 hover:bg-white/[0.04] transition-all"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <span className="font-mono text-[9px] text-t400 tracking-widest">5 LIVE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
            </>
          )}
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      {phase === "hero" && (
        <div className="flex-1 flex flex-col px-5 pt-10 pb-8 max-w-xl mx-auto w-full">

          <p className="font-mono text-[9px] text-mint tracking-[0.28em] mb-6">
            / Korean Communication Training /
          </p>

          <h1 className="font-syne text-[clamp(3.2rem,14vw,5.5rem)] font-black leading-[0.88] tracking-tight mb-5">
            <span className="text-white block">Korean Is</span>
            <span className="text-mint block">Contextual.</span>
          </h1>

          <p className="font-mono text-t200 text-sm leading-relaxed mb-8 max-w-sm">
            The same sentence. Six relationships. Six correct expressions.
            No existing app teaches this.
          </p>

          {/* Flow strip */}
          <div className="flex items-center gap-1.5 flex-wrap mb-10">
            {["SITUATION", "RELATIONSHIP", "DECISION", "FEEDBACK", "OUTCOME"].map((s, i) => (
              <div key={s} className="flex items-center gap-1.5">
                <span className={`
                  font-mono text-[9px] tracking-[0.12em] px-2.5 py-1 rounded-full border
                  ${i < 3 ? "border-mint/50 text-mint" : "border-b-mid text-t400"}
                `}>
                  {s}
                </span>
                {i < 4 && <span className="text-t400 text-[10px]">→</span>}
              </div>
            ))}
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 rounded-2xl bg-mint text-s0 font-mono text-[11px] font-bold tracking-[0.18em] hover:bg-mint/90 active:scale-[0.98] transition-all mb-3"
          >
            BEGIN TRAINING →
          </button>
          <p className="text-center font-mono text-[9px] text-t400 tracking-widest">
            Free to start · Sign in with Google
          </p>

        </div>
      )}

      {/* ── PROFILER ─────────────────────────────────────── */}
      {(phase === "profiler" || phase === "entering") && (
        <div className="flex-1 flex flex-col px-5 pt-8 pb-6 max-w-xl mx-auto w-full">

          <p className="font-mono text-[9px] text-mint tracking-[0.28em] mb-5">
            / RELATIONSHIP PROFILER /
          </p>

          <h2 className="font-syne text-2xl font-black text-white leading-tight mb-1">
            Where do you need
          </h2>
          <h2 className="font-syne text-2xl font-black text-mint leading-tight mb-2">
            Korean the most?
          </h2>
          <p className="font-mono text-[10px] text-t300 mb-6">
            Select one to see how it changes everything.
          </p>

          {/* Category cards */}
          <div className="flex flex-col gap-2 mb-5">
            {CATEGORIES.map((cat) => {
              const isActive = selected === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelect(cat.id)}
                  onMouseEnter={() => setHovered(cat.id)}
                  onMouseLeave={() => setHovered(null)}
                  disabled={phase === "entering"}
                  className={`
                    w-full text-left p-4 rounded-2xl border transition-all duration-200
                    ${isActive
                      ? "border-mint/50 bg-mint/7"
                      : "border-b-mid bg-white/[0.025] hover:border-b-hi hover:bg-white/[0.04]"
                    }
                    ${phase === "entering" && !isActive ? "opacity-30" : ""}
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className={`font-syne text-xl font-black ${isActive ? "text-mint" : "text-white"}`}>
                          {cat.kor}
                        </span>
                        <span className={`font-mono text-[11px] font-bold ${isActive ? "text-mint/80" : "text-t200"}`}>
                          {cat.en}
                        </span>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {cat.traits.map((t) => (
                          <span key={t} className="font-mono text-[8px] px-2 py-0.5 rounded-full border border-b-mid text-t300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Check / uncheck */}
                    <div className={`
                      flex-shrink-0 w-5 h-5 rounded-full mt-0.5 flex items-center justify-center
                      ${isActive ? "bg-mint" : "border border-b-hi"}
                    `}>
                      {isActive && (
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path d="M1 3.5L3 5.5L8 1" stroke="#0c0c0e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live mini-demo */}
          {activeCategory && (
            <div className="rounded-2xl border border-mint/20 bg-mint/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-syne text-base font-black text-white">나 왔어</span>
                <span className="text-mint/60 text-sm">→</span>
                <span className="font-mono text-[9px] text-mint/70 tracking-wider">
                  {activeCategory.en} 선택 시
                </span>
              </div>
              <div className="flex flex-col gap-2.5">
                {activeCategory.demo.map((d, i) => (
                  <div key={i} className={`flex items-baseline gap-3 ${i > 0 ? "opacity-55" : ""}`}>
                    <span className="font-mono text-[9px] text-t400 tracking-wider min-w-[44px]">
                      {d.rel}
                    </span>
                    <div>
                      <div className="font-syne text-[17px] font-black text-white leading-tight">
                        {d.out}
                      </div>
                      <div className="font-mono text-[9px] text-t300 mt-0.5">
                        {d.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Entering state */}
          {phase === "entering" && (
            <div className="flex items-center gap-3 mt-5">
              <div className="w-4 h-4 border-2 border-mint border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-[10px] text-mint tracking-widest">
                INITIALISING SYSTEM...
              </span>
            </div>
          )}

          {phase === "profiler" && (
            <p className="mt-4 text-center font-mono text-[9px] text-t400">
              Sign in with Google · Takes 10 seconds
            </p>
          )}

        </div>
      )}

    </main>
  );
}
