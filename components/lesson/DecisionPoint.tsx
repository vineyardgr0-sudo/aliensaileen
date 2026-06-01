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
      <p className="font-headline text-t100 mb-4 leading-snug">{variant.question}</p>
      <div className="flex flex-col gap-2.5">
        {variant.options.map((opt, i) => {
          const s = done ? TAG[opt.tag] : null;
          return (
            <button key={i} onClick={() => !done && onChoose(opt)} disabled={done}
              className={`w-full text-left rounded-2xl px-4.5 py-3.5 border transition-all ${
                done 
                  ? (s?.card ?? "") 
                  : "bg-white/[0.02] border-[rgba(255,255,255,0.08)] hover:bg-white/[0.05] hover:border-mint/30 cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className={`font-syne text-sm font-extrabold mb-1.5 ${done ? (s?.text ?? "") : "text-t100"}`}>{opt.text}</p>
                  {done && <p className="font-mono text-[10px] text-t300 leading-relaxed">{opt.feedback}</p>}
                </div>
                {done && <span className={`font-mono text-[9px] tracking-wider uppercase px-2.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 font-bold ${s?.pill ?? ""}`}>{opt.tag}</span>}
              </div>
            </button>
          );
        })}
      </div>
      {done && chosen?.explanation && (
        <div className="mt-4 bg-mint/[0.03] border border-mint/[0.14] rounded-2xl p-5 animate-fade-up shadow-sm">
          <p className="font-headline text-mint/90 mb-2">{chosen.explanation.title}</p>
          <p className="font-mono text-[10.5px] text-t200 leading-relaxed mb-4">{chosen.explanation.description}</p>
          <div className="flex flex-col gap-1.5 mb-4">
            {chosen.explanation.details.map((d, i) => (
              <p key={i} className="font-mono text-[10px] text-t300 flex gap-2"><span className="text-mint flex-shrink-0">→</span>{d}</p>
            ))}
          </div>
          {chosen.explanation.natural_alternative.length > 0 && (
            <div className="border-t border-mint/[0.12] pt-3.5">
              <p className="font-caption text-mint/50 mb-2">Natural alternative</p>
              <div className="flex flex-wrap gap-2.5">
                {chosen.explanation.natural_alternative.map((alt) => (
                  <span key={alt} className="font-syne text-sm font-extrabold text-mint bg-mint/[0.09] border border-mint/22 px-3 py-1.5 rounded-lg">{alt}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
