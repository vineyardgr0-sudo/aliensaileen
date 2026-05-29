import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { Badge } from "@/components/ui/Badge";

export default function HomePage() {
  const liveCount = CATEGORIES.flatMap((c) => c.lessons).filter((l) => l.status === "live").length;

  return (
    <main className="min-h-screen bg-s0 flex flex-col">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-b-dim bg-s0/95 backdrop-blur-md safe-top">
        <div className="flex items-center justify-between h-12 px-4 max-w-2xl mx-auto">
          <span className="font-syne text-[11px] font-bold tracking-[0.1em]">
            ALIEN&apos;S <span className="text-mint">AILEEN</span>
          </span>
          <div className="flex items-center gap-3">
            <Badge variant="mint">{liveCount} live</Badge>
            <Link href="/dashboard" className="font-mono text-[9px] tracking-wider uppercase text-t300 hover:text-mint transition-colors">
              My progress
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">

        {/* ── HERO ── */}
        <section className="px-5 pt-10 pb-8 border-b border-b-dim stagger">
          <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-mint/60 mb-4 animate-fade-in">
            Korean Communication Training
          </p>
          <h1 className="font-syne text-[40px] font-extrabold leading-[1.05] tracking-tight mb-5 animate-fade-up">
            Korean Is<br />
            <span className="text-mint">Contextual.</span>
          </h1>
          <p className="font-mono text-[10.5px] text-t300 leading-[1.85] max-w-xs mb-7 animate-fade-up">
            Train communication decisions, not memorized translations.
            The same sentence feels completely different depending on who you&apos;re speaking to.
          </p>

          {/* Flow */}
          <div className="flex items-center gap-1.5 flex-wrap animate-fade-in">
            {[
              { label: "Situation", lit: true },
              { label: "Relationship", lit: true },
              { label: "Decision", lit: true },
              { label: "Feedback", lit: false },
              { label: "Outcome", lit: false },
            ].map((n, i, arr) => (
              <div key={n.label} className="flex items-center gap-1.5">
                <span className={`font-mono text-[8px] tracking-wider uppercase px-2.5 py-1 rounded-md border transition-all ${
                  n.lit
                    ? "bg-mint/10 border-mint/30 text-mint"
                    : "bg-white/[0.025] border-b-dim text-t400"
                }`}>
                  {n.label}
                </span>
                {i < arr.length - 1 && <span className="text-t400 text-[10px]">→</span>}
              </div>
            ))}
          </div>
        </section>

        {/* ── QUICK START CTA ── */}
        <section className="px-5 py-5 border-b border-b-dim">
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/learn/fan_meeting/FM_001"
              className="group relative px-4 py-4 bg-mint/[0.07] border border-mint/25 rounded-2xl hover:bg-mint/[0.12] hover:border-mint/40 transition-all"
            >
              <p className="font-mono text-[7.5px] tracking-[0.18em] uppercase text-mint/60 mb-2">Start here</p>
              <p className="font-syne text-sm font-bold text-t100 mb-1 leading-snug group-hover:text-mint transition-colors">
                Fan Meeting
              </p>
              <p className="font-mono text-[8.5px] text-t300 leading-[1.5]">First Greeting · 8 min</p>
              <div className="absolute right-3 bottom-3 w-6 h-6 rounded-full bg-mint/10 flex items-center justify-center">
                <span className="text-mint text-xs">→</span>
              </div>
            </Link>
            <Link
              href="/dashboard"
              className="group px-4 py-4 bg-s2 border border-b-mid rounded-2xl hover:border-b-hi transition-all"
            >
              <p className="font-mono text-[7.5px] tracking-[0.18em] uppercase text-t400 mb-2">Progress</p>
              <p className="font-syne text-sm font-bold text-t100 mb-1 leading-snug group-hover:text-t100 transition-colors">
                My Dashboard
              </p>
              <p className="font-mono text-[8.5px] text-t300 leading-[1.5]">Track completions</p>
            </Link>
          </div>
        </section>

        {/* ── CATEGORIES ── */}
        <section className="px-5 py-6 border-b border-b-dim">
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-t400 mb-5">Scenario categories</p>
          <div className="flex flex-col gap-3 stagger">
            {CATEGORIES.map((cat) => {
              const live = cat.lessons.filter((l) => l.status === "live").length;
              const isAvail = live > 0;
              return (
                <div
                  key={cat.id}
                  className={`rounded-2xl border overflow-hidden transition-all duration-300 animate-fade-up ${
                    isAvail
                      ? "border-b-mid hover:border-mint/30 hover:bg-mint/[0.015]"
                      : "border-b-dim opacity-40"
                  }`}
                >
                  {isAvail ? (
                    <Link href={`/learn/${cat.id}`} className="flex">
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
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-t400 mb-5">Why this is different</p>
          <div className="grid gap-3 stagger">
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
              <div key={p.num} className="border border-b-dim rounded-2xl p-4 bg-s1 animate-fade-up">
                <span className="font-mono text-[8px] text-t400 block mb-2">{p.num}</span>
                <h3 className="font-syne text-[13px] font-bold text-t100 mb-2 leading-snug">{p.title}</h3>
                <p className="font-mono text-[9.5px] text-t300 leading-[1.7]">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="px-5 py-6 border-t border-b-dim mt-auto">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[8px] text-t400">
              Korean Is Contextual. · Alien&apos;s Aileen
            </p>
            <Link href="/explore" className="font-mono text-[8px] text-t400 hover:text-mint transition-colors">
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
      <div className="w-[3px] flex-shrink-0 rounded-l-sm" style={{ background: cat.color, opacity: live > 0 ? 1 : 0.3 }} />
      <div className="flex-1 px-4 py-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[8px] tracking-widest text-t400">{cat.num}</span>
          <span
            className="font-mono text-[7px] tracking-wider uppercase px-2 py-0.5 rounded-full border"
            style={live > 0 ? { background: `${cat.color}14`, borderColor: `${cat.color}35`, color: `${cat.color}CC` } : {}}
          >
            {live > 0 ? `${live} available` : "Preparing"}
          </span>
        </div>
        <h2 className="font-syne text-[14px] font-bold text-t100 mb-1">{cat.name}</h2>
        <p className="font-mono text-[9px] text-t300 leading-[1.55] mb-3">{cat.tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {cat.lessons.slice(0, 3).map((l) => (
            <span
              key={l.id}
              className="font-mono text-[7.5px] px-2 py-0.5 rounded-full border"
              style={
                l.status === "live"
                  ? { background: `${cat.color}0d`, borderColor: `${cat.color}25`, color: `${cat.color}99` }
                  : { borderColor: "rgba(255,255,255,0.06)", color: "rgba(232,230,224,0.22)" }
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
