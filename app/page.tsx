import Link from "next/link";
import { Nav } from "@/components/ui/Nav";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES, getAllLiveCount } from "@/data/categories";

export default function HomePage() {
  const liveCount = getAllLiveCount();
  return (
    <main className="min-h-screen bg-s0">
      <Nav
        left={<span className="font-syne text-[11px] font-bold tracking-[0.12em] text-t100">ALIEN&apos;S <span className="text-mint">AILEEN</span></span>}
        right={
          <div className="flex items-center gap-2">
            <Badge variant="mint">{liveCount} live</Badge>
            <Link href="/dashboard" className="font-mono text-[9px] tracking-wider uppercase text-t300 hover:text-mint transition-colors">My progress</Link>
          </div>
        }
      />
      <section className="px-5 py-8 border-b border-b-dim">
        <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-t400 mb-2">Korean Communication Training</p>
        <h1 className="font-syne text-3xl font-extrabold text-t100 leading-tight mb-3">Korean Is<br /><span className="text-mint">Contextual.</span></h1>
        <p className="font-mono text-[10px] text-t300 leading-[1.75] mb-6">Train communication decisions,<br />not memorized translations.</p>
      </section>
      <section className="px-5 py-5 border-b border-b-dim">
        <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-t400 mb-3">Start a lesson</p>
        <div className="flex flex-col gap-2.5">
          {[
            { href: "/learn/fan_meeting/FM_001", cat: "Fan Meeting", lesson: "First Greeting", min: 8, color: "#00e5b4" },
            { href: "/learn/dating/DT_001", cat: "Dating", lesson: "썸 to Closer — Tone Shift", min: 9, color: "#f472b6" },
            { href: "/learn/workplace/BM_001", cat: "Workplace", lesson: "First Business Meeting", min: 10, color: "#818cf8" },
          ].map((item) => (
            <Link key={item.href} href={item.href}
              className="group flex items-center gap-3 px-4 py-3.5 bg-s1 border border-b-mid rounded-2xl hover:border-b-hi hover:bg-s2 transition-all">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[7.5px] tracking-[0.14em] uppercase mb-0.5" style={{ color: `${item.color}99` }}>{item.cat}</p>
                <p className="font-syne text-[13px] font-bold text-t100 truncate">{item.lesson}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-mono text-[8px] text-t400">~{item.min}m</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-t400"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="px-5 py-5">
        <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-t400 mb-3">Scenario categories</p>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => {
            const live = cat.lessons.filter((l) => l.status === "live").length;
            return (
              <Link key={cat.id} href={`/learn/${cat.id}`}
                className="flex items-center gap-3 px-4 py-3 bg-s1 border border-b-dim rounded-xl hover:border-b-mid transition-all">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                <span className="font-syne text-[13px] font-bold text-t100 flex-1">{cat.name}</span>
                <span className="font-mono text-[8px] text-t400">{live} live</span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
