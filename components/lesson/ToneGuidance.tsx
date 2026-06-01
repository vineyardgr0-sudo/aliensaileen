import type { ToneGuidance as TG } from "@/types/lesson";
const ROWS = [
  { key: "avoid" as const,   label: "avoid",   cls: { card: "bg-red-500/[0.05] border-red-500/[0.13]",   pill: "bg-red-500/[0.13] text-red-400",  text: "text-red-400/75"  } },
  { key: "neutral" as const, label: "neutral", cls: { card: "bg-white/[0.04] border-white/[0.10]",        pill: "bg-white/[0.10] text-t300",        text: "text-t300"        } },
  { key: "correct" as const, label: "correct", cls: { card: "bg-mint/[0.05] border-mint/[0.18]",          pill: "bg-mint/[0.13] text-mint",         text: "text-mint/75"     } },
];
export default function ToneGuidance({ guidance }: { guidance: TG }) {
  const rec = guidance.spectrum?.find((s) => s.recommended);
  const pos = rec?.position ?? 50;
  return (
    <div>
      <div className="flex flex-col gap-2.5">
        {ROWS.map(({ key, label, cls }) => (
          <div key={key} className={`flex items-start gap-4.5 rounded-2xl px-4 py-3 border ${cls.card} animate-fade-up`}>
            <span className={`font-mono text-[9px] tracking-wider uppercase px-2.5 py-0.5 rounded-full flex-shrink-0 mt-0.5 font-bold ${cls.pill}`}>{label}</span>
            <p className={`font-mono text-xs leading-relaxed ${cls.text}`}>{guidance[key]}</p>
          </div>
        ))}
      </div>
      <div className="mt-3.5 bg-white/[0.02] border border-[rgba(255,255,255,0.08)] rounded-2xl px-4.5 py-3.5 animate-fade-up">
        <p className="font-mono text-xs text-t200 leading-relaxed">{guidance.tone_summary}</p>
      </div>
      {guidance.spectrum && (
        <div className="mt-3.5 bg-white/[0.02] border border-[rgba(255,255,255,0.08)] rounded-2xl px-4.5 py-4 animate-fade-up">
          <p className="font-caption text-t400 mb-3">Formality spectrum</p>
          <div className="relative h-1.5 bg-white/[0.08] rounded-full my-4">
            <div className="absolute h-full bg-mint/40 rounded-full" style={{ width: `${pos}%` }} />
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-mint border-2 border-s0" style={{ left: `${pos}%` }} />
          </div>
          <div className="flex justify-between">
            {guidance.spectrum.map((s) => (
              <span key={s.label} className={`font-mono text-[9px] font-medium ${s.recommended ? "text-mint font-bold" : "text-t400"}`}>{s.label}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
