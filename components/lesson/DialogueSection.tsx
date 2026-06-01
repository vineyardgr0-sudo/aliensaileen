import type { DialogueTurn } from "@/types/lesson";
export default function DialogueSection({ turns }: { turns: DialogueTurn[] }) {
  if (!turns?.length) return null;
  return (
    <div className="flex flex-col gap-3">
      {turns.map((turn, i) => {
        const isUser = turn.side === "fan" || turn.side === "user";
        return (
          <div key={i} className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
            <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-mono text-[9px] font-bold border uppercase tracking-wider ${
              isUser ? "bg-mint/[0.12] border-mint/35 text-mint"
              : turn.side === "client" ? "bg-orange-400/20 border-orange-400/35 text-orange-300"
              : "bg-violet/20 border-violet/35 text-violet/90"}`}>
              {turn.speaker.substring(0, 3)}
            </div>
            <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl border ${
              isUser ? "bg-mint/[0.07] border-mint/20 rounded-tr-sm"
              : turn.side === "client" ? "bg-orange-400/[0.08] border-orange-400/20 rounded-tl-sm"
              : "bg-violet/[0.1] border-violet/20 rounded-tl-sm"}`}>
              <p className="font-syne text-[13px] font-bold text-t100 mb-1">{turn.korean}</p>
              <p className="font-mono text-[10px] text-t300 leading-normal">{turn.english}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
