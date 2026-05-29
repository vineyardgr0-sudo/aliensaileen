"use client";
import type { DecisionVariant, DecisionOption } from "@/types/lesson";

const TAG = {
  correct: { card: "bg-mint/[0.07] border-mint/40", text: "text-mint", pill: "bg-mint/[0.14] text-mint" },
  wrong:   { card: "bg-red-500/[0.05] border-red-500/20", text: "text-red-400/80", pill: "bg-red-500/[0.12] text-red-400/90" },
  neutral: { card: "bg-white/[0.04] border-white/[0.14]", text: "text-t300", pill: "bg-white/[0.10] text-t300" },
};

interface Props { variant: DecisionVariant; done: boolean; chosen: DecisionOption | null; onChoose: (opt: DecisionOption) => void }

export default function DecisionPoint({ variant, done, chosen, onChoose }: Props) {
  return (
    <div>
      <p className="font-syne text-[12px] font-bold text-t100/90 leading-snug mb-3">{variant.question}</p>
      <div className="flex flex-col gap-1.5">
        {variant.options.map((opt, i) => {
          const s = done ? TAG[opt.tag] : null;
          return (
            <button key={i} onClick={() => !done && onChoose(opt)} disabled={done}
              className={`w-full text-left rounded-lg px-3 py-2.5 border transition-all ${done ? (s?.card ?? "") : "bg-white/[0.025] border-b-dim hover:bg-white/[0.05] hover:border-b-mid cursor-pointer"}`}>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className={`font-syne text-[13px] font-bold mb-1 ${done ? (s?.text ?? "") : "text-t100"}`}>{opt.text}</p>
                  {done && <p className="font-mono text-[8.5px] text-t300">{opt.feedback}</p>}
                </div>
                {done && <span className={`font-mono text-[7px] tracking-wider uppercase px-2 py-0.5 rounded-lg whitespace-nowrap flex-shrink-0 ${s?.pill ?? ""}`}>{opt.tag}</span>}
              </div>
            </button>
          );
        })}
      </div>
      {done && chosen?.explanation && (
        <div className="mt-3 bg-mint/[0.04] border border-mint/[0.14] rounded-lg p-3 animate-fade-up">
          <p className="font-syne text-[11px] font-bold text-mint/80 mb-2">{chosen.explanation.title}</p>
          <p className="font-mono text-[9px] text-t300 leading-[1.7] mb-3">{chosen.explanation.description}</p>
          <div className="flex flex-col gap-1 mb-3">
            {chosen.explanation.details.map((d, i) => (
              <p key={i} className="font-mono text-[8.5px] text-t400 flex gap-2"><span className="text-mint flex-shrink-0">→</span>{d}</p>
            ))}
          </div>
          {chosen.explanation.natural_alternative.length > 0 && (
            <div className="border-t border-mint/[0.12] pt-2.5">
              <p className="font-mono text-[7.5px] tracking-wider uppercase text-mint/45 mb-2">Natural alternative</p>
              <div className="flex flex-wrap gap-2">
                {chosen.explanation.natural_alternative.map((alt) => (
                  <span key={alt} className="font-syne text-sm font-bold text-mint bg-mint/[0.09] border border-mint/22 px-2.5 py-1 rounded-md">{alt}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
