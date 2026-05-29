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
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="bg-s2 border border-b-dim rounded-xl p-4">
          <p className="font-syne text-[11px] font-bold text-t200 mb-3 leading-snug">{item.question}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {item.prefix && (
              <span className="font-syne text-[13px] font-bold text-t300">{item.prefix}</span>
            )}
            <input
              type="text"
              value={answers[i]}
              onChange={(e) => {
                const a = [...answers]; a[i] = e.target.value; setAnswers(a);
              }}
              disabled={checked[i]}
              placeholder={"_".repeat(item.answer.length)}
              className={`font-mono text-[12px] px-2.5 py-1.5 rounded-lg border outline-none min-w-[80px] transition-all bg-s1 text-t100 ${
                states[i] === "correct" ? "border-mint/55 bg-mint/[0.07] text-mint"
                : states[i] === "wrong" ? "border-red-500/40 bg-red-500/[0.06] text-red-400/85"
                : "border-b-mid focus:border-mint/40"
              }`}
            />
            {item.suffix && (
              <span className="font-syne text-[13px] font-bold text-t300">{item.suffix}</span>
            )}
            {!checked[i] && (
              <button
                onClick={() => check(i)}
                className="font-mono text-[7.5px] tracking-wider uppercase px-3 py-1.5 rounded-lg bg-mint/[0.1] border border-mint/30 text-mint hover:bg-mint/[0.18] transition-all"
              >
                Check
              </button>
            )}
          </div>
          {checked[i] && (
            <p className={`font-mono text-[9px] mt-2 ${states[i] === "correct" ? "text-mint/75" : "text-red-400/75"}`}>
              {states[i] === "correct" ? `✓ Correct — ${item.answer}` : `✗ Answer: ${item.answer}`}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
