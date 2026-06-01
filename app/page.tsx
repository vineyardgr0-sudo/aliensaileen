import { Suspense } from "react"
import LoginToast from "@/components/LoginToast"
import AuthButton from "@/components/AuthButton"
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { Badge } from "@/components/ui/Badge";
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export default async function HomePage() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const liveCount = CATEGORIES.flatMap((c) => c.lessons).filter((l) => l.status === "live").length;

  return (
    <main className="min-h-screen bg-s0 flex flex-col">
      <Suspense fallback={null}><LoginToast /></Suspense>
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-[rgba(255,255,255,0.07)] bg-s0/95 backdrop-blur-md safe-top">
        <div className="flex items-center justify-between h-16 px-5 max-w-2xl mx-auto">
          <span className="font-syne text-[13px] md:text-sm font-bold tracking-[0.15em] text-t100">
            ALIEN&apos;S <span className="text-mint">AILEEN</span>
          </span>
          <div className="flex items-center gap-3.5">
            <Badge variant="mint" className="hidden sm:inline-flex">{liveCount} live</Badge>
            <AuthButton />
            <Link href="/dashboard" className="font-mono text-[11px] tracking-wider uppercase text-t300 hover:text-mint transition-colors font-bold min-h-[38px] flex items-center">
              My progress
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">

        {/* ── HERO ── */}
        <section className="px-5 pt-12 pb-10 border-b border-b-dim stagger">
          <p className="font-caption text-mint mb-5 animate-fade-in">
            / Korean Communication Training /
          </p>
          <h1 className="font-display-xl leading-[1.05] mb-6 animate-fade-up">
            Korean Is<br />
            <span className="text-mint">Contextual.</span>
          </h1>
          <p className="font-body text-t300 leading-relaxed max-w-md mb-8 animate-fade-up">
            Train communication decisions, not memorized translations.
            The same sentence feels completely different depending on who you&apos;re speaking to.
          </p>

          {/* Flow */}
          <div className="flex items-center gap-2 flex-wrap animate-fade-in">
            {[
              { label: "Situation", lit: true },
              { label: "Relationship", lit: true },
              { label: "Decision", lit: true },
              { label: "Feedback", lit: false },
              { label: "Outcome", lit: false },
            ].map((n, i, arr) => (
              <div key={n.label} className="flex items-center gap-2">
                <span className={`font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-lg border transition-all ${
                  n.lit
                    ? "bg-mint/10 border-mint/30 text-mint font-bold"
                    : "bg-white/[0.025] border-b-dim text-t400"
                }`}>
                  {n.label}
                </span>
                {i < arr.length - 1 && <span className="text-t400 text-xs">→</span>}
              </div>
            ))}
          </div>
        </section>

        {/* ── CUSTOMIZED ACCESS BLOCK ── */}
        {!user ? (
          <section className="mx-5 my-6 p-6 rounded-2xl bg-white/[0.02] border border-[rgba(255,255,255,0.08)] relative overflow-hidden flex flex-col items-center text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-fade-up">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-mint/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-violet/10 rounded-full blur-3xl pointer-events-none" />
            
            <span className="font-caption text-mint mb-2">/ To get access, you should sign in /</span>
            <h2 className="font-headline mb-3 text-t100">
              Unlock Interactive Korean Training
            </h2>
            <p className="font-body-sm text-t300 max-w-sm mb-6 leading-relaxed">
              Sign in with your Google account to get access to real-world scenarios, track your communication decisions, and view expert feedback.
            </p>
            <AuthButton />
          </section>
        ) : (
          <section className="mx-5 my-6 p-6 rounded-2xl bg-white/[0.02] border border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-fade-up">
            <div>
              <span className="font-caption text-mint mb-1">/ Active Session /</span>
              <h2 className="font-headline text-t100 mb-1">Welcome back</h2>
              <p className="font-mono text-xs text-t300 truncate max-w-[280px] md:max-w-xs">{user.email}</p>
            </div>
            <Link
              href="/dashboard"
              className="font-mono text-xs tracking-wider uppercase px-5 py-3 rounded-full bg-mint text-s0 font-bold hover:bg-mint/90 transition-all text-center flex items-center justify-center min-h-[44px]"
            >
              Go to Dashboard →
            </Link>
          </section>
        )}

        {/* ── QUICK START CTA ── */}
        <section className="px-5 py-6 border-b border-b-dim">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/learn/fan_meeting/FM_001"
              className="group relative p-5 bg-mint/[0.04] border border-mint/20 rounded-2xl hover:bg-mint/[0.08] hover:border-mint/35 hover:shadow-[0_0_12px_rgba(0,229,180,0.15)] transition-all min-h-[110px] flex flex-col justify-between"
            >
              <div>
                <p className="font-caption text-mint/60 mb-2">Start here</p>
                <p className="font-headline text-t100 mb-1.5 group-hover:text-mint transition-colors">
                  Fan Meeting
                </p>
                <p className="font-body-sm text-t300">First Greeting · 8 min</p>
              </div>
              <div className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-mint/10 group-hover:bg-mint/20 flex items-center justify-center transition-colors">
                <span className="text-mint text-sm">→</span>
              </div>
            </Link>
            <Link
              href="/dashboard"
              className="group relative p-5 bg-s1 border border-b-mid rounded-2xl hover:border-b-hi hover:bg-white/[0.02] hover:shadow-[0_0_12px_rgba(255,255,255,0.04)] transition-all min-h-[110px] flex flex-col justify-between"
            >
              <div>
                <p className="font-caption text-t400 mb-2">Progress</p>
                <p className="font-headline text-t100 mb-1.5 group-hover:text-mint transition-colors">
                  My Dashboard
                </p>
                <p className="font-body-sm text-t300">Track completions</p>
              </div>
              <div className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-white/[0.05] group-hover:bg-white/[0.1] flex items-center justify-center transition-colors">
                <span className="text-t200 text-sm">→</span>
              </div>
            </Link>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="px-5 py-8 border-b border-b-dim">
          <p className="font-caption text-t400 mb-5">Scenario categories</p>
          <div className="flex flex-col gap-4 stagger">
            {CATEGORIES.map((cat) => {
              const live = cat.lessons.filter((l) => l.status === "live").length;
              const isAvail = live > 0;
              const glowClass = cat.id === "fan_meeting" ? "glow-fan-meeting" :
                                cat.id === "dating" ? "glow-dating" :
                                cat.id === "workplace" ? "glow-workplace" : "glow-daily";
              return (
                <div
                  key={cat.id}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 animate-fade-up glow-card ${glowClass} ${
                    isAvail
                      ? "border-b-mid hover:border-mint/30 hover:shadow-[0_0_24px_rgba(0,0,0,0.4)]"
                      : "border-b-dim opacity-40"
                  }`}
                >
                  {isAvail ? (
                    <Link href={`/learn/${cat.id}`} className="flex group">
                      <CatContent cat={cat} live={live} />
                    </Link>
                  ) : (
                    <div className="flex">
                      <CatContent cat={cat} live={live} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── WHY DIFFERENT ── */}
        <section className="px-5 py-8 border-b border-b-dim">
          <p className="font-caption text-t400 mb-6">Why this is different</p>
          <div className="grid gap-4 stagger">
            {[
              {
                num: "01",
                title: "Relationship before vocabulary",
                body: "Every section adapts based on who you're speaking to. RM vs V. Senior client vs familiar colleague. The content shifts — so does the emotional register.",
              },
              {
                num: "02",
                title: "Decisions, not drills",
                body: "You choose between real options and see exactly why one sounds natural while another sounds like a press conference opener.",
              },
              {
                num: "03",
                title: "The explanation is the lesson",
                body: "We don't just mark things correct or wrong. We explain the cultural and emotional mechanism behind every tone difference.",
              },
            ].map((p) => (
              <div key={p.num} className="border border-b-dim rounded-2xl p-5 bg-s1 animate-fade-up">
                <span className="font-mono text-[10px] text-mint font-bold block mb-2">{p.num}</span>
                <h3 className="font-headline text-t100 mb-2 leading-snug">{p.title}</h3>
                <p className="font-body-sm text-t300 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="px-5 py-8 border-t border-b-dim mt-auto">
          <div className="flex items-center justify-between">
            <p className="font-caption text-t400">
              Korean Is Contextual. · Alien&apos;s Aileen
            </p>
            <Link href="/explore" className="font-caption text-t300 hover:text-mint transition-colors">
              Explore all →
            </Link>
          </div>
        </footer>

      </div>
    </main>
  );
}

function CatContent({ cat, live }: { cat: (typeof CATEGORIES)[0]; live: number }) {
  return (
    <>
      <div className="w-[4px] flex-shrink-0 rounded-l-md" style={{ background: cat.color, opacity: live > 0 ? 1 : 0.3 }} />
      <div className="flex-1 px-5 py-4.5 z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] tracking-widest text-t400 font-bold">{cat.num}</span>
          <span
            className="font-mono text-[9px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border font-bold"
            style={live > 0 ? { background: `${cat.color}14`, borderColor: `${cat.color}35`, color: `${cat.color}E6` } : {}}
          >
            {live > 0 ? `${live} available` : "Preparing"}
          </span>
        </div>
        <h2 className="font-headline text-t100 mb-1.5 group-hover:text-mint transition-colors">{cat.name}</h2>
        <p className="font-body-sm text-t300 mb-4 leading-relaxed">{cat.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {cat.lessons.slice(0, 3).map((l) => (
            <span
              key={l.id}
              className="font-mono text-[9px] px-2.5 py-1 rounded-full border font-medium"
              style={
                l.status === "live"
                  ? { background: `${cat.color}0d`, borderColor: `${cat.color}25`, color: `${cat.color}B3` }
                  : { borderColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.2)" }
              }
            >
              {l.title}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
