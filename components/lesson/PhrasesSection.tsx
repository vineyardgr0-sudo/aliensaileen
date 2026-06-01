import type { PhraseItem } from "@/types/lesson";
export default function PhrasesSection({ items }: { items: PhraseItem[] }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="bg-white/[0.02] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4.5 shadow-sm animate-fade-up">
          <p className="font-syne text-[15px] font-bold text-t100 mb-1">{item.korean}</p>
          {item.pronunciation && <p className="font-mono text-[10px] text-mint/60 mb-1.5">[{item.pronunciation}]</p>}
          <p className="font-mono text-xs text-t200 mb-3">{item.english}</p>
          <div className="border-t border-[rgba(255,255,255,0.07)] pt-2.5">
            <p className="font-mono text-[10px] text-t300 leading-relaxed">
              <span className="text-mint/60 mr-1.5 font-bold">Why it works →</span>{item.why_it_works}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
