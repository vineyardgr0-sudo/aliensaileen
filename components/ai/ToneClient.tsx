"use client";

import { useState } from "react";
import Link from "next/link";

const RELATIONSHIPS = [
  { id: "crush",     label: "썸 / Crush",          emoji: "💭" },
  { id: "friend",    label: "친구 / Friend",         emoji: "👯" },
  { id: "colleague", label: "동료 / Colleague",       emoji: "🤝" },
  { id: "senior",    label: "선배·교수님 / Senior",   emoji: "🎓" },
  { id: "partner",   label: "연인 / Partner",         emoji: "💕" },
  { id: "client",    label: "클라이언트 / Client",    emoji: "💼" },
];

const EXAMPLES = [
  "존경하고 있습니다",
  "오늘 즐거웠습니다",
  "잘 지내셨어요?",
  "바빠요?",
  "다음에 봐요",
  "감사합니다. 다음 만남을 기대하겠습니다.",
];

export default function ToneClient() {
  const [text, setText] = useState("");
  const [relationship, setRelationship] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  async function analyze() {
    if (!text.trim() || isLoading) return;
    setIsLoading(true);
    setError("");
    setAnalysis("");

    try {
      const res = await fetch("/api/ai/tone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), targetRelationship: relationship || undefined }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setAnalysis(data.analysis);
      setHasAnalyzed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  function reset() {
    setText("");
    setRelationship("");
    setAnalysis("");
    setError("");
    setHasAnalyzed(false);
  }

  // Parse analysis into sections
  function renderAnalysis(raw: string) {
    const lines = raw.split("\n").filter(Boolean);
    return lines.map((line, i) => {
      if (line.startsWith("FEELS LIKE:")) {
        return (
          <div key={i} className="mb-4">
            <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-mint/60 mb-1.5">Feels like</p>
            <p className="font-syne text-base font-bold text-t100 leading-snug">{line.replace("FEELS LIKE:", "").trim()}</p>
          </div>
        );
      }
      if (line.startsWith("WHY:")) {
        return (
          <div key={i} className="mb-4 p-3 bg-s2 border border-b-dim rounded-xl">
            <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400 mb-1.5">Why it sounds that way</p>
            <p className="font-mono text-[12px] text-t200 leading-[1.7]">{line.replace("WHY:", "").trim()}</p>
          </div>
        );
      }
      if (line.startsWith("NATIVE WOULD SAY:")) {
        return (
          <div key={i} className="mb-4">
            <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-mint/60 mb-1.5">A native would say</p>
            <div className="bg-mint/[0.07] border border-mint/20 rounded-xl px-4 py-3">
              <p className="font-syne text-base font-bold text-mint">{line.replace("NATIVE WOULD SAY:", "").trim()}</p>
            </div>
          </div>
        );
      }
      if (line.startsWith("VARIATIONS:")) {
        return (
          <div key={i} className="mb-2">
            <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400 mb-2">By relationship</p>
          </div>
        );
      }
      if (line.startsWith("-")) {
        return (
          <div key={i} className="flex items-start gap-2 mb-2 ml-0">
            <div className="w-1.5 h-1.5 rounded-full bg-mint/40 flex-shrink-0 mt-2" />
            <p className="font-mono text-[12px] text-t200 leading-[1.65]">{line.replace(/^-\s*/, "")}</p>
          </div>
        );
      }
      if (line.startsWith("INSIGHT:")) {
        return (
          <div key={i} className="mt-4 p-3 bg-violet/[0.08] border border-violet/20 rounded-xl">
            <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-violet/60 mb-1.5">Cultural insight</p>
            <p className="font-mono text-[12px] text-t200 leading-[1.7]">{line.replace("INSIGHT:", "").trim()}</p>
          </div>
        );
      }
      if (line.startsWith("---")) return null;
      return (
        <p key={i} className="font-mono text-[12px] text-t300 leading-[1.7] mb-1">{line}</p>
      );
    });
  }

  return (
    <main className="min-h-screen bg-s0">
      <nav className="sticky top-0 z-50 border-b border-b-dim bg-s0/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-5 py-3 max-w-2xl mx-auto">
          <Link href="/ai/chat" className="font-mono text-[9px] tracking-wider uppercase text-t300 hover:text-t100 transition-colors px-2.5 py-1.5 border border-b-mid rounded-full">
            ← Chat
          </Link>
          <span className="font-syne text-[11px] font-bold tracking-[0.1em]">
            ALIEN&apos;S <span className="text-mint">AILEEN</span>
          </span>
          <span className="font-mono text-[9px] text-mint/40">Tone</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-5 py-8">

        {!hasAnalyzed ? (
          <>
            {/* Header */}
            <div className="mb-7">
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-mint/60 mb-3">Tone Corrector</p>
              <h1 className="font-syne text-2xl font-extrabold leading-tight mb-3">
                Paste any Korean.<br />
                <span className="text-mint">Feel how it lands.</span>
              </h1>
              <p className="font-mono text-[10px] text-t300 leading-[1.75]">
                Not grammar. Not spelling.<br />
                What does this sentence actually feel like to a native Korean?
              </p>
            </div>

            {/* Examples */}
            <div className="mb-5">
              <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400 mb-2.5">Try these examples</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setText(ex)}
                    className="font-mono text-[11px] px-3 py-1.5 border border-b-mid rounded-full text-t200 hover:border-mint/30 hover:text-mint transition-all"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="mb-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="한국어 문장을 입력하세요..."
                rows={3}
                className="w-full bg-s2 border border-b-mid rounded-xl px-4 py-3 font-mono text-[14px] text-t100 placeholder:text-t400 resize-none outline-none focus:border-mint/40 transition-colors leading-relaxed"
              />
            </div>

            {/* Relationship selector */}
            <div className="mb-6">
              <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400 mb-2.5">Who are you saying this to? (optional)</p>
              <div className="grid grid-cols-2 gap-2">
                {RELATIONSHIPS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRelationship(relationship === r.label ? "" : r.label)}
                    className={`text-left px-3 py-2 border rounded-xl text-[12px] font-mono transition-all ${
                      relationship === r.label
                        ? "bg-mint/[0.08] border-mint/35 text-mint"
                        : "border-b-dim text-t300 hover:border-mint/20"
                    }`}
                  >
                    {r.emoji} {r.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-500/[0.07] border border-red-500/20 rounded-xl">
                <p className="font-mono text-[11px] text-red-400">{error}</p>
              </div>
            )}

            <button
              onClick={analyze}
              disabled={!text.trim() || isLoading}
              className="w-full py-3 bg-mint/10 border border-mint/30 rounded-xl font-mono text-[10px] tracking-wider uppercase text-mint hover:bg-mint/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isLoading ? "분석 중..." : "Analyze tone →"}
            </button>
          </>
        ) : (
          <>
            {/* Result */}
            <div className="mb-5">
              <button onClick={reset} className="font-mono text-[9px] tracking-wider uppercase text-t300 hover:text-t100 transition-colors mb-5 flex items-center gap-1">
                ← Try another
              </button>

              <div className="bg-s2 border border-b-dim rounded-xl px-4 py-3 mb-5">
                <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400 mb-1">You wrote</p>
                <p className="font-syne text-sm font-bold text-t100">{text}</p>
                {relationship && (
                  <p className="font-mono text-[8px] text-t400 mt-1">To: {relationship}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                {renderAnalysis(analysis)}
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full py-3 border border-b-mid rounded-xl font-mono text-[10px] tracking-wider uppercase text-t300 hover:border-mint/25 hover:text-mint transition-all"
            >
              Analyze another sentence
            </button>
          </>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="mt-6 flex flex-col items-center gap-3 py-8">
            <div className="flex gap-1.5">
              {[0,1,2].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-mint/50 animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
              ))}
            </div>
            <p className="font-mono text-[9px] text-t400 tracking-wider uppercase">Reading the tone...</p>
          </div>
        )}

        {/* Bottom nav */}
        <div className="mt-10 pt-6 border-t border-b-dim flex gap-4 justify-center">
          <Link href="/ai/chat" className="font-mono text-[9px] tracking-wider uppercase text-t300 hover:text-mint transition-colors">
            AI Chat →
          </Link>
          <Link href="/" className="font-mono text-[9px] tracking-wider uppercase text-t300 hover:text-t100 transition-colors">
            Lessons →
          </Link>
        </div>
      </div>
    </main>
  );
}
