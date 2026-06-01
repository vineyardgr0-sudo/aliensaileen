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

      <div className="max-w-2xl mx-auto px-5 py-8">
        <div className="mb-8">
          <p className="font-caption text-t400 mb-2">Your journey</p>
          <h1 className="font-display-md text-t100 mb-1.5">Dashboard</h1>
          <p className="font-mono text-xs text-t300">Track your Korean communication progress</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Completed", value: completedCount, suffix: `/ ${liveLessons.length}` },
            { label: "Day streak", value: progress.streakDays ?? 0, suffix: "days" },
            { label: "Saved", value: savedExpressions.length, suffix: "exprs" },
          ].map((stat) => (
            <div key={stat.label} className="bg-s1 border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 text-center shadow-sm">
              <p className="font-caption text-t400 mb-1.5">{stat.label}</p>
              <p className="font-syne text-2xl font-extrabold text-t100 leading-none">{stat.value}</p>
              <p className="font-mono text-[10.5px] text-t300 mt-1.5">{stat.suffix}</p>
            </div>
          ))}
        </div>

        {/* OVERALL RING */}
        <div className="bg-s1 border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 mb-6 flex items-center gap-6 shadow-sm">
          <ProgressRing value={pct} size={72} strokeWidth={5} />
          <div>
            <p className="font-headline text-t100 mb-1">{pct}% complete</p>
            <p className="font-mono text-xs text-t300">
              {completedCount} of {liveLessons.length} lessons finished
            </p>
            {pct === 0 && (
              <Link href="/learn/fan_meeting" className="inline-block mt-2.5 font-mono text-xs tracking-wider uppercase text-mint font-bold hover:underline">
                Start first lesson →
              </Link>
            )}
          </div>
        </div>

        {/* BY CATEGORY */}
        <div className="mb-6 animate-fade-up">
          <p className="font-caption text-t400 mb-4">By category</p>
          <div className="flex flex-col gap-3">
            {CATEGORIES.map((cat) => {
              const catLive = cat.lessons.filter((l) => l.status === "live");
              const catDone = catLive.filter((l) => progress.lessons[l.id]?.completed).length;
              const catPct = catLive.length > 0 ? (catDone / catLive.length) * 100 : 0;
              return (
                <Link key={cat.id} href={`/learn/${cat.id}`}
                  className="bg-s1 border border-[rgba(255,255,255,0.08)] rounded-2xl p-4.5 hover:border-mint/30 hover:bg-mint/[0.01] transition-all group">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                      <span className="font-syne text-[14px] font-bold text-t100">{cat.name}</span>
                    </div>
                    <span className="font-mono text-xs text-t300 group-hover:text-mint transition-colors">
                      {catDone} / {catLive.length}
                    </span>
                  </div>
                  <div className="h-1.5 bg-b-dim rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${catPct}%`, background: cat.color }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ALL LESSONS */}
        <div className="mb-6 animate-fade-up">
          <p className="font-caption text-t400 mb-4">All lessons</p>
          <div className="flex flex-col gap-2.5">
            {liveLessons.map((lesson) => {
              const lp = progress.lessons[lesson.id];
              const cat = CATEGORIES.find((c) => c.lessons.some((l) => l.id === lesson.id));
              const score = lp?.quizScore ?? 0;
              return (
                <Link key={lesson.id} href={`/learn/${cat?.id}/${lesson.id}`}
                  className="flex items-center gap-4 px-5 py-4 bg-s1 border border-[rgba(255,255,255,0.08)] rounded-2xl hover:border-mint/30 hover:bg-mint/[0.01] transition-all group">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    lp?.completed ? "bg-mint/15 border border-mint/35" : "bg-white/[0.03] border border-[rgba(255,255,255,0.12)]"
                  }`}>
                    {lp?.completed && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#00e5b4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline text-[14px] font-bold text-t100 truncate group-hover:text-mint transition-colors">{lesson.title}</p>
                    <p className="font-mono text-[10px] text-t300">{lesson.sub}</p>
                  </div>
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    {lp?.bookmarked && (
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="#00e5b4" className="animate-scale-in">
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
          <div className="mb-8 animate-fade-up">
            <p className="font-caption text-t400 mb-4">Saved expressions</p>
            <div className="flex flex-col gap-2.5">
              {savedExpressions.map((expr, i) => (
                <div key={i} className="flex items-center gap-3.5 px-5 py-3.5 bg-s1 border border-[rgba(255,255,255,0.08)] rounded-2xl shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-mint/50 flex-shrink-0" />
                  <p className="font-syne text-[14px] font-bold text-t100 flex-1">{expr}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {completedCount === 0 && (
          <div className="text-center py-12 animate-fade-up">
            <p className="font-mono text-xs text-t300 mb-6">No lessons completed yet.</p>
            <Link href="/learn/fan_meeting/FM_001"
              className="inline-block font-mono text-xs tracking-wider uppercase px-6 py-3 border border-mint/35 rounded-full text-mint hover:bg-mint/[0.08] hover:shadow-[0_0_10px_rgba(0,229,180,0.2)] transition-all min-h-[44px] flex items-center justify-center max-w-[220px] mx-auto font-bold">
              Start your first lesson →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
