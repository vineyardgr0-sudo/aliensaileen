"use client";

import { useState, useEffect } from "react";
import type { QuizItem } from "@/types/lesson";

interface Props {
  items: QuizItem[];
  onComplete: (score: number) => void;
}

export default function QuizSection({ items, onComplete }: Props) {
  const [answers, setAnswers] = useState<string[]>(items.map(() => ""));
  const [states, setStates] = useState<("idle"|"correct"|"wrong")[]>(items.map(() => "idle"));
  const [checked, setChecked] = useState<boolean[]>(items.map(() => false));

  useEffect(() => {
    setAnswers(items.map(() => ""));
    setStates(items.map(() => "idle"));
    setChecked(items.map(() => false));
  }, [items]);

  function check(i: number) {
    const q = items[i];
    const val = answers[i].trim();
    const ok = val === q.answer || val === q.blank || val === q.prefix + q.answer + q.suffix;
    const ns = [...states]; ns[i] = ok ? "correct" : "wrong"; setStates(ns);
    const nc = [...checked]; nc[i] = true; setChecked(nc);

    if (nc.every(Boolean)) {
      const correct = ns.filter((s) => s === "correct").length;
      onComplete(correct / items.length);
    }
  }

  if (!items?.length) return null;

  return (
    <div className="flex flex-col gap-3.5">
      {items.map((item, i) => (
        <div key={i} className="bg-s1 border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 shadow-sm animate-fade-up">
          <p className="font-syne text-[13px] font-bold text-t200 mb-3.5 leading-snug">{item.question}</p>
          <div className="flex items-center gap-3 flex-wrap">
            {item.prefix && (
              <span className="font-syne text-[15px] font-extrabold text-t100">{item.prefix}</span>
            )}
            <input
              type="text"
              value={answers[i]}
              onChange={(e) => {
                const a = [...answers]; a[i] = e.target.value; setAnswers(a);
              }}
              disabled={checked[i]}
              placeholder={"_".repeat(item.answer.length)}
              className={`font-mono text-sm px-4 py-2 rounded-xl border outline-none min-w-[100px] transition-all bg-s2 text-t100 min-h-[40px] ${
                states[i] === "correct" ? "border-mint/55 bg-mint/[0.07] text-mint font-bold"
                : states[i] === "wrong" ? "border-red-500/40 bg-red-500/[0.06] text-red-400/85"
                : "border-[rgba(255,255,255,0.12)] focus:border-mint/50"
              }`}
            />
            {item.suffix && (
              <span className="font-syne text-[15px] font-extrabold text-t100">{item.suffix}</span>
            )}
            {!checked[i] && (
              <button
                onClick={() => check(i)}
                className="font-mono text-[10px] tracking-wider uppercase px-4 py-2 rounded-xl bg-mint text-s0 font-bold hover:bg-mint/90 hover:shadow-[0_0_10px_rgba(0,229,180,0.25)] transition-all min-h-[40px]"
              >
                Check
              </button>
            )}
          </div>
          {checked[i] && (
            <p className={`font-mono text-[11px] font-bold mt-3 ${states[i] === "correct" ? "text-mint" : "text-red-400"}`}>
              {states[i] === "correct" ? `✓ Correct — ${item.answer}` : `✗ Answer: ${item.answer}`}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
