import type { PhraseItem } from "@/types/lesson";
export default function PhrasesSection({ items }: { items: PhraseItem[] }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="bg-white/[0.025] border border-b-dim rounded-xl p-3">
          <p className="font-syne text-[13px] font-bold text-t100 mb-0.5">{item.korean}</p>
          {item.pronunciation && <p className="font-mono text-[7.5px] text-mint/45 mb-1">{item.pronunciation}</p>}
          <p className="font-mono text-[9px] text-t300 mb-2.5">{item.english}</p>
          <div className="border-t border-b-dim pt-2">
            <p className="font-mono text-[8px] text-t400 leading-[1.6]">
              <span className="text-mint/45 mr-1">Why it works →</span>{item.why_it_works}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
