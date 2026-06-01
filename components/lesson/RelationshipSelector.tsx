import type { RelationshipOption } from "@/types/lesson";

interface Props { options: RelationshipOption[]; selected: string; onChange: (id: string) => void }

export default function RelationshipSelector({ options, selected, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const active = opt.id === selected;
        return (
          <button key={opt.id} onClick={() => onChange(opt.id)}
            className={`text-left rounded-2xl p-4.5 border transition-all ${
              active 
                ? "bg-mint/[0.08] border-mint/45 shadow-[0_0_12px_rgba(0,229,180,0.12)]" 
                : "bg-white/[0.02] border-[rgba(255,255,255,0.08)] hover:border-mint/30 hover:bg-mint/[0.02]"
            }`}
          >
            <p className={`font-syne text-sm font-extrabold mb-1.5 ${active ? "text-mint" : "text-t100"}`}>{opt.label}</p>
            <p className={`font-mono text-[10px] leading-relaxed mb-3 ${active ? "text-mint/70" : "text-t300"}`}>{opt.summary}</p>
            <div className="flex flex-wrap gap-1.5">
              {opt.communication_traits.map((trait) => (
                <span key={trait} className={`font-mono text-[9px] px-2 py-0.5 rounded border ${
                  active 
                    ? "bg-mint/[0.08] border-mint/25 text-mint/80 font-bold" 
                    : "bg-white/[0.04] border-[rgba(255,255,255,0.08)] text-t300"
                }`}>
                  {trait}
                </span>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}
