import type { RelationshipOption } from "@/types/lesson";

interface Props { options: RelationshipOption[]; selected: string; onChange: (id: string) => void }

export default function RelationshipSelector({ options, selected, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => {
        const active = opt.id === selected;
        return (
          <button key={opt.id} onClick={() => onChange(opt.id)}
            className={`text-left rounded-xl p-3 border transition-all ${active ? "bg-mint/[0.08] border-mint/40" : "bg-white/[0.025] border-b-dim hover:border-mint/28 hover:bg-mint/[0.03]"}`}>
            <p className={`font-syne text-xs font-bold mb-1 ${active ? "text-mint" : "text-t100"}`}>{opt.label}</p>
            <p className={`font-mono text-[7.5px] mb-2 ${active ? "text-mint/50" : "text-t400"}`}>{opt.summary}</p>
            <div className="flex flex-wrap gap-1">
              {opt.communication_traits.map((trait) => (
                <span key={trait} className={`font-mono text-[7px] px-1.5 py-0.5 rounded border ${active ? "bg-mint/[0.08] border-mint/20 text-mint/65" : "bg-white/[0.04] border-b-dim text-t400"}`}>
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
