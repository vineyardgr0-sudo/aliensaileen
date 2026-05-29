import type { LessonContext } from "@/types/lesson";

export default function ContextBlock({ context }: { context: LessonContext }) {
  return (
    <div className="bg-white/[0.025] border border-b-dim rounded-xl p-4">
      <p className="font-mono text-[9.5px] text-t300 leading-[1.75] mb-4">{context.description}</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[{ k: "Location", v: context.location }, { k: "Time", v: context.interaction_time }, { k: "Goal", v: context.goal[0] }, { k: "Style", v: context.communication_style }].map((item) => (
          <div key={item.k}>
            <p className="font-mono text-[7px] tracking-[0.16em] uppercase text-t400 mb-1">{item.k}</p>
            <p className="font-mono text-[9px] text-t300">{item.v}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-b-dim pt-3">
        <p className="font-mono text-[8.5px] text-mint/55 leading-[1.65]">◆ {context.cultural_note}</p>
      </div>
    </div>
  );
}
