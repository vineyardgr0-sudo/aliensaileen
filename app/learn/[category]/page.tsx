import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { Nav, BackButton } from "@/components/ui/Nav";
import { Badge } from "@/components/ui/Badge";
import LessonListClient from "@/components/lesson/LessonListClient";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = CATEGORIES.find((c) => c.id === params.category);
  if (!cat) notFound();

  return (
    <main className="min-h-screen bg-s0">
      <Nav left={<BackButton href="/" label="Home" />} />

      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="px-5 py-6 border-b border-b-dim animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
            <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-t400">{cat.num}</span>
          </div>
          <h1 className="font-syne text-2xl font-extrabold mb-2">{cat.name}</h1>
          <p className="font-mono text-[9.5px] text-t300 leading-[1.65] max-w-sm">{cat.description}</p>
        </div>

        {/* LESSON LIST — client for progress */}
        <LessonListClient cat={cat} />
      </div>
    </main>
  );
}
