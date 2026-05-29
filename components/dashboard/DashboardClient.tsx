"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { CATEGORIES } from "@/data/categories";
import { Nav, BackButton } from "@/components/ui/Nav";
import { Badge } from "@/components/ui/Badge";
import { ProgressRing } from "@/components/ui/ProgressRing";

export default function DashboardClient() {
  const { progress } = useProgress();

  const allLessons = CATEGORIES.flatMap((c) => c.lessons);
  const liveLessons = allLessons.filter((l) => l.status === "live");
  const completedCount = liveLessons.filter((l) => progress.lessons[l.id]?.completed).length;
  const pct = liveLessons.length > 0 ? Math.round((completedCount / liveLessons.length) * 100) : 0;

  const savedExpressions = Object.values(progress.lessons).flatMap(
    (l) => l.savedExpressions ?? []
  );

  return (
    <main className="min-h-screen bg-s0">
      <Nav left={<BackButton href="/" label="Home" />} right={
        <span className="font-mono text-[9px] text-mint/40 tracking-wider">Progress</span>
      } />

      <div className="max-w-2xl mx-auto px-5 py-6">
        <div className="mb-6">
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-t400 mb-2">Your journey</p>
          <h1 className="font-syne text-2xl font-extrabold mb-1">Dashboard</h1>
          <p className="font-mono text-[10px] text-t300">Track your Korean communication progress</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Completed", value: completedCount, suffix: `/ ${liveLessons.length}` },
            { label: "Day streak", value: progress.streakDays ?? 0, suffix: "days" },
            { label: "Saved", value: savedExpressions.length, suffix: "exprs" },
          ].map((stat) => (
            <div key={stat.label} className="bg-s1 border border-b-dim rounded-2xl p-4 text-center">
              <p className="font-mono text-[7.5px] tracking-wider uppercase text-t400 mb-1">{stat.label}</p>
              <p className="font-syne text-2xl font-extrabold text-t100">{stat.value}</p>
              <p className="font-mono text-[7.5px] text-t400 mt-0.5">{stat.suffix}</p>
            </div>
          ))}
        </div>

        {/* OVERALL RING */}
        <div className="bg-s1 border border-b-dim rounded-2xl p-5 mb-5 flex items-center gap-5">
          <ProgressRing value={pct} size={64} strokeWidth={4} />
          <div>
            <p className="font-syne text-xl font-extrabold text-t100 mb-0.5">{pct}% complete</p>
            <p className="font-mono text-[9.5px] text-t300">
              {completedCount} of {liveLessons.length} lessons finished
            </p>
            {pct === 0 && (
              <Link href="/learn/fan_meeting" className="inline-block mt-2 font-mono text-[8.5px] tracking-wider uppercase text-mint hover:underline">
                Start first lesson →
              </Link>
            )}
          </div>
        </div>

        {/* BY CATEGORY */}
        <div className="mb-5">
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-t400 mb-3">By category</p>
          <div className="flex flex-col gap-2.5">
            {CATEGORIES.map((cat) => {
              const catLive = cat.lessons.filter((l) => l.status === "live");
              const catDone = catLive.filter((l) => progress.lessons[l.id]?.completed).length;
              const catPct = catLive.length > 0 ? (catDone / catLive.length) * 100 : 0;
              return (
                <Link key={cat.id} href={`/learn/${cat.id}`}
                  className="bg-s1 border border-b-dim rounded-xl p-4 hover:border-b-mid transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                      <span className="font-syne text-[13px] font-bold text-t100">{cat.name}</span>
                    </div>
                    <span className="font-mono text-[9px] text-t300 group-hover:text-mint transition-colors">
                      {catDone}/{catLive.length}
                    </span>
                  </div>
                  <div className="h-1 bg-b-dim rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${catPct}%`, background: cat.color }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ALL LESSONS */}
        <div className="mb-5">
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-t400 mb-3">All lessons</p>
          <div className="flex flex-col gap-2">
            {liveLessons.map((lesson) => {
              const lp = progress.lessons[lesson.id];
              const cat = CATEGORIES.find((c) => c.lessons.some((l) => l.id === lesson.id));
              // Fix: safe quizScore access
              const score = lp?.quizScore ?? 0;
              return (
                <Link key={lesson.id} href={`/learn/${cat?.id}/${lesson.id}`}
                  className="flex items-center gap-3 px-4 py-3 bg-s1 border border-b-dim rounded-xl hover:border-b-mid transition-all">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                    lp?.completed ? "bg-mint/15 border border-mint/35" : "bg-b-dim border border-b-mid"
                  }`}>
                    {lp?.completed && (
                      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#00e5b4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-syne text-[12px] font-bold text-t100 truncate">{lesson.title}</p>
                    <p className="font-mono text-[8px] text-t400">{lesson.sub}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {lp?.bookmarked && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="#00e5b4">
                        <path d="M2 2h8v9L6 8.5 2 11V2z"/>
                      </svg>
                    )}
                    {lp?.completed && score > 0 && <Badge variant="mint">{Math.round(score * 100)}%</Badge>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* SAVED EXPRESSIONS */}
        {savedExpressions.length > 0 && (
          <div className="mb-6">
            <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-t400 mb-3">Saved expressions</p>
            <div className="flex flex-col gap-2">
              {savedExpressions.map((expr, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 bg-s1 border border-b-dim rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-mint/40 flex-shrink-0" />
                  <p className="font-syne text-[13px] font-bold text-t100 flex-1">{expr}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {completedCount === 0 && (
          <div className="text-center py-10">
            <p className="font-mono text-[10px] text-t400 mb-4">No lessons completed yet.</p>
            <Link href="/learn/fan_meeting/FM_001"
              className="inline-block font-mono text-[9px] tracking-wider uppercase px-5 py-2.5 border border-mint/30 rounded-full text-mint hover:bg-mint/[0.08] transition-all">
              Start your first lesson →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
