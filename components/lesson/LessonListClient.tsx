"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import type { CategoryManifest } from "@/types/lesson";
import { Badge } from "@/components/ui/Badge";

interface Props { cat: CategoryManifest }

export default function LessonListClient({ cat }: Props) {
  const { progress } = useProgress();

  const liveCount = cat.lessons.filter((l) => l.status === "live").length;
  const doneCount = cat.lessons.filter(
    (l) => l.status === "live" && progress.lessons[l.id]?.completed
  ).length;

  return (
    <div className="px-5 py-5">
      {liveCount > 0 && (
        <div className="flex items-center justify-between mb-5 px-1">
          <p className="font-caption text-t400">
            {doneCount} / {liveCount} complete
          </p>
          <div className="h-1.5 w-32 bg-b-dim rounded-full overflow-hidden">
            <div
              className="h-full bg-mint rounded-full transition-all duration-700"
              style={{ width: liveCount > 0 ? `${(doneCount / liveCount) * 100}%` : "0%" }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3.5">
        {cat.lessons.map((lesson, i) => {
          const isLive = lesson.status === "live";
          const lp = progress.lessons[lesson.id];
          const done = lp?.completed ?? false;
          const bookmarked = lp?.bookmarked ?? false;
          const score = lp?.quizScore ?? 0;

          const inner = (
            <div className="flex items-center gap-4">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border ${
                done
                  ? "bg-mint/15 border-mint/35"
                  : isLive
                  ? "bg-white/[0.03] border-[rgba(255,255,255,0.12)]"
                  : "bg-white/[0.01] border-[rgba(255,255,255,0.06)] opacity-50"
              }`}>
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#00e5b4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span className="font-mono text-xs font-bold text-t300">0{i + 1}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-headline text-[15px] font-bold text-t100 truncate mb-1 group-hover:text-mint transition-colors">{lesson.title}</p>
                <p className="font-mono text-[10px] text-t300 leading-normal">{lesson.sub}</p>
              </div>

              <div className="flex items-center gap-2.5 flex-shrink-0">
                {bookmarked && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="#00e5b4" className="animate-scale-in">
                    <path d="M2 2h8v9L6 8.5 2 11V2z"/>
                  </svg>
                )}
                {done && score > 0 && (
                  <Badge variant="mint">{Math.round(score * 100)}%</Badge>
                )}
                {!done && isLive && (
                  <span className="font-mono text-[10px] font-bold text-mint/60">~{lesson.estimated_minutes}m</span>
                )}
                {!isLive && <Badge variant="dim">Soon</Badge>}
                {isLive && (
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="text-t400 group-hover:text-t100 transition-colors">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          );

          return isLive ? (
            <Link
              key={lesson.id}
              href={`/learn/${cat.id}/${lesson.id}`}
              className={`px-5 py-4 rounded-2xl border transition-all animate-fade-up group ${
                done
                  ? "border-mint/20 bg-mint/[0.025] hover:border-mint/35 hover:bg-mint/[0.04]"
                  : "bg-white/[0.015] border-[rgba(255,255,255,0.08)] hover:border-mint/30 hover:bg-mint/[0.015]"
              }`}
            >
              {inner}
            </Link>
          ) : (
            <div key={lesson.id} className="px-5 py-4 rounded-2xl border border-[rgba(255,255,255,0.05)] opacity-40 bg-white/[0.005]">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
