import { cn } from "@/lib/utils";

export type ToneLevel = "avoid" | "neutral" | "correct";

interface ToneRow {
  level: ToneLevel;
  label: string;
  text: string;
}

const STYLES: Record<ToneLevel, { card: string; pill: string; text: string; dot: string }> = {
  avoid: {
    card: "bg-red-500/[0.05] border-red-500/[0.13]",
    pill: "bg-red-500/[0.14] text-red-400",
    text: "text-red-400/80",
    dot:  "bg-red-400",
  },
  neutral: {
    card: "bg-white/[0.035] border-white/[0.09]",
    pill: "bg-white/[0.09] text-t300",
    text: "text-t300",
    dot:  "bg-t300",
  },
  correct: {
    card: "bg-mint/[0.05] border-mint/[0.18]",
    pill: "bg-mint/[0.14] text-mint",
    text: "text-mint/80",
    dot:  "bg-mint",
  },
};

interface Props {
  rows: ToneRow[];
  summary?: string;
  spectrum?: { label: string; position: number; recommended: boolean }[];
}

export function ToneComparisonCard({ rows, summary, spectrum }: Props) {
  const rec = spectrum?.find((s) => s.recommended);
  const pos = rec?.position ?? 50;

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => {
        const s = STYLES[row.level];
        return (
          <div key={row.level} className={cn("flex items-start gap-3 rounded-xl px-3.5 py-3 border", s.card)}>
            <span className={cn("font-mono text-[7px] tracking-wider uppercase px-2 py-0.5 rounded-lg flex-shrink-0 mt-0.5", s.pill)}>
              {row.label}
            </span>
            <p className={cn("font-mono text-[9.5px] leading-[1.65]", s.text)}>{row.text}</p>
          </div>
        );
      })}

      {spectrum && (
        <div className="mt-1 px-3.5 py-3 bg-s2 border border-b-dim rounded-xl">
          <p className="font-mono text-[7px] tracking-[0.18em] uppercase text-t400 mb-3">Formality spectrum</p>
          <div className="relative h-1 bg-b-dim rounded-full">
            <div
              className="absolute h-full bg-mint/40 rounded-full"
              style={{ width: `${pos}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-mint border-2 border-s0"
              style={{ left: `${pos}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {spectrum.map((s) => (
              <span key={s.label} className={cn(
                "font-mono text-[7.5px]",
                s.recommended ? "text-mint" : "text-t400"
              )}>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {summary && (
        <div className="px-3.5 py-3 bg-s2 border border-b-dim rounded-xl">
          <p className="font-mono text-[9px] text-t300 leading-[1.7]">{summary}</p>
        </div>
      )}
    </div>
  );
}
