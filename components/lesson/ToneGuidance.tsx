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
      <div className="flex flex-col gap-1.5">
        {ROWS.map(({ key, label, cls }) => (
          <div key={key} className={`flex items-start gap-3 rounded-lg px-3 py-2.5 border ${cls.card}`}>
            <span className={`font-mono text-[7px] tracking-wider uppercase px-2 py-0.5 rounded-lg flex-shrink-0 mt-0.5 ${cls.pill}`}>{label}</span>
            <p className={`font-mono text-[9px] leading-[1.65] ${cls.text}`}>{guidance[key]}</p>
          </div>
        ))}
      </div>
      <div className="mt-2.5 bg-white/[0.025] border border-b-dim rounded-lg px-3 py-2.5">
        <p className="font-mono text-[8.5px] text-t400 leading-[1.7]">{guidance.tone_summary}</p>
      </div>
      {guidance.spectrum && (
        <div className="mt-2.5 bg-white/[0.02] border border-b-dim rounded-lg px-3 py-3">
          <p className="font-mono text-[7px] tracking-[0.18em] uppercase text-t400 mb-2">Formality spectrum</p>
          <div className="relative h-1 bg-white/[0.08] rounded-full my-3">
            <div className="absolute h-full bg-mint/40 rounded-full" style={{ width: `${pos}%` }} />
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-mint border-2 border-s0" style={{ left: `${pos}%` }} />
          </div>
          <div className="flex justify-between">
            {guidance.spectrum.map((s) => (
              <span key={s.label} className={`font-mono text-[7.5px] ${s.recommended ? "text-mint" : "text-t400"}`}>{s.label}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
