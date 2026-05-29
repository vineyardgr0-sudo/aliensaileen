import Link from "next/link";
export default function NotFound() {
  return (
    <main className="min-h-screen bg-s0 flex flex-col items-center justify-center px-5">
      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-mint/50 mb-4">404</p>
      <h1 className="font-syne text-2xl font-extrabold text-t100 mb-3">Page not found</h1>
      <p className="font-mono text-[10px] text-t300 mb-8 text-center leading-relaxed">This lesson may still be in preparation.</p>
      <Link href="/" className="font-mono text-[9px] tracking-wider uppercase px-5 py-2.5 rounded-full border border-mint/30 text-mint hover:bg-mint/[0.08] transition-all">
        ← Back to categories
      </Link>
    </main>
  );
}
