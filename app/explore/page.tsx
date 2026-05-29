import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { Nav, BackButton } from "@/components/ui/Nav";
import { Badge } from "@/components/ui/Badge";

export default function ExplorePage() {
  const total = CATEGORIES.flatMap((c) => c.lessons).length;
  const live = CATEGORIES.flatMap((c) => c.lessons).filter((l) => l.status === "live").length;

  return (
    <main className="min-h-screen bg-s0">
      <Nav left={<BackButton href="/" label="Home" />} />

      <div className="max-w-2xl mx-auto px-5 py-6">
        <div className="mb-6 animate-fade-in">
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-t400 mb-2">Explore</p>
          <h1 className="font-syne text-2xl font-extrabold mb-2">All Scenarios</h1>
          <p className="font-mono text-[9.5px] text-t300">
            {live} lessons available · {total - live} in preparation
          </p>
        </div>

        <div className="flex flex-col gap-5 stagger">
          {CATEGORIES.map((cat) => {
            const liveL = cat.lessons.filter((l) => l.status === "live");
            return (
              <div key={cat.id} className="animate-fade-up">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                    <h2 className="font-syne text-[14px] font-bold text-t100">{cat.name}</h2>
                  </div>
                  <Badge variant={liveL.length > 0 ? "mint" : "dim"}>
                    {liveL.length > 0 ? `${liveL.length} available` : "Preparing"}
                  </Badge>
                </div>
                <p className="font-mono text-[9px] text-t300 mb-3 leading-[1.6]">{cat.description}</p>
                <div className="flex flex-col gap-2">
                  {cat.lessons.map((lesson, i) => {
                    const isLive = lesson.status === "live";
                    const inner = (
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[9px] text-t400 w-5 flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <p className="font-syne text-[12px] font-bold text-t100 mb-0.5">{lesson.title}</p>
                          <p className="font-mono text-[7.5px] text-t400">{lesson.sub}</p>
                        </div>
                        {isLive ? (
                          <Badge variant="mint">~{lesson.estimated_minutes}m</Badge>
                        ) : (
                          <Badge variant="dim">Soon</Badge>
                        )}
                      </div>
                    );
                    return isLive ? (
                      <Link
                        key={lesson.id}
                        href={`/learn/${cat.id}/${lesson.id}`}
                        className="px-4 py-3 rounded-xl border border-b-mid hover:border-mint/30 hover:bg-mint/[0.02] transition-all"
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div key={lesson.id} className="px-4 py-3 rounded-xl border border-b-dim opacity-38">
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
