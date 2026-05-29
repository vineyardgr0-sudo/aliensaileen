import type { DialogueTurn } from "@/types/lesson";
export default function DialogueSection({ turns }: { turns: DialogueTurn[] }) {
  if (!turns?.length) return null;
  return (
    <div className="flex flex-col gap-2">
      {turns.map((turn, i) => {
        const isUser = turn.side === "fan" || turn.side === "user";
        return (
          <div key={i} className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center font-mono text-[7px] font-medium border ${
              isUser ? "bg-mint/[0.12] border-mint/28 text-mint"
              : turn.side === "client" ? "bg-orange-400/20 border-orange-400/35 text-orange-300"
              : "bg-violet/20 border-violet/35 text-violet/90"}`}>
              {turn.speaker.substring(0, 4)}
            </div>
            <div className={`max-w-[78%] px-3 py-2 rounded-xl ${
              isUser ? "bg-mint/[0.07] border border-mint/18 rounded-tr-sm"
              : turn.side === "client" ? "bg-orange-400/[0.08] border border-orange-400/18 rounded-tl-sm"
              : "bg-violet/[0.1] border border-violet/18 rounded-tl-sm"}`}>
              <p className="font-syne text-[11px] font-bold text-t100 mb-1">{turn.korean}</p>
              <p className="font-mono text-[8px] text-t400">{turn.english}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
