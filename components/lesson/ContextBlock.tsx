import type { LessonContext } from "@/types/lesson";

export default function ContextBlock({ context }: { context: LessonContext }) {
  return (
    <div className="bg-white/[0.02] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 shadow-sm">
      <p className="font-body text-t200 mb-5 leading-relaxed">{context.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-5">
        {[{ k: "Location", v: context.location }, { k: "Time", v: context.interaction_time }, { k: "Goal", v: context.goal[0] }, { k: "Style", v: context.communication_style }].map((item) => (
          <div key={item.k}>
            <p className="font-caption text-t400 mb-1.5">{item.k}</p>
            <p className="font-mono text-xs font-bold text-t200">{item.v}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-[rgba(255,255,255,0.07)] pt-4">
        <p className="font-body-sm text-mint/80 leading-relaxed">◆ {context.cultural_note}</p>
      </div>
    </div>
  );
}
