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
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-t400">
            {doneCount} / {liveCount} complete
          </p>
          <div className="h-1 w-24 bg-b-dim rounded-full overflow-hidden">
            <div
              className="h-full bg-mint rounded-full transition-all duration-700"
              style={{ width: liveCount > 0 ? `${(doneCount / liveCount) * 100}%` : "0%" }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        {cat.lessons.map((lesson, i) => {
          const isLive = lesson.status === "live";
          const lp = progress.lessons[lesson.id];
          const done = lp?.completed ?? false;
          const bookmarked = lp?.bookmarked ?? false;
          // Fix: safe access with fallback
          const score = lp?.quizScore ?? 0;

          const inner = (
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border ${
                done
                  ? "bg-mint/15 border-mint/35"
                  : isLive
                  ? "bg-b-dim border-b-mid"
                  : "bg-b-dim border-b-dim opacity-50"
              }`}>
                {done ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#00e5b4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span className="font-mono text-[8px] text-t400">0{i + 1}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-syne text-[13px] font-bold text-t100 truncate mb-0.5">{lesson.title}</p>
                <p className="font-mono text-[8px] text-t400">{lesson.sub}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {bookmarked && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="#00e5b4">
                    <path d="M2 2h8v9L6 8.5 2 11V2z"/>
                  </svg>
                )}
                {/* Fix: use safe score variable */}
                {done && score > 0 && (
                  <Badge variant="mint">{Math.round(score * 100)}%</Badge>
                )}
                {!done && isLive && (
                  <span className="font-mono text-[7.5px] text-mint/50">~{lesson.estimated_minutes}m</span>
                )}
                {!isLive && <Badge variant="dim">Soon</Badge>}
                {isLive && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-t400">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          );

          return isLive ? (
            <Link
              key={lesson.id}
              href={`/learn/${cat.id}/${lesson.id}`}
              className={`px-4 py-3.5 rounded-2xl border transition-all animate-fade-up ${
                done
                  ? "border-mint/18 bg-mint/[0.025] hover:border-mint/30"
                  : "border-b-mid hover:border-b-hi hover:bg-s2"
              }`}
            >
              {inner}
            </Link>
          ) : (
            <div key={lesson.id} className="px-4 py-3.5 rounded-2xl border border-b-dim opacity-40">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
