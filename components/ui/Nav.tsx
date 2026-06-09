import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
}

// Fix D: replaced "border-b border-b-dim" with explicit border utility
// "border-b-dim" is a color token (rgba(255,255,255,0.06)) — use it correctly
// as border-b + border-color: "border-b border-[rgba(255,255,255,0.06)]"
export function Nav({ left, right, title, className }: NavProps) {
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 bg-s0/95 backdrop-blur-md flex-shrink-0",
        "border-b border-[rgba(255,255,255,0.07)]",
        "safe-top",
        className
      )}
    >
      <div className="flex items-center justify-between h-16 px-5 max-w-2xl mx-auto">
        <div className="w-32 flex items-center">{left}</div>
        <div className="flex-1 flex items-center justify-center">
          {title ?? (
            <Link href="/" className="font-syne text-[13px] md:text-sm font-bold tracking-[0.15em] text-t100 hover:text-mint transition-colors">
              ALIEN&apos;S <span className="text-mint">AILEEN</span>
            </Link>
          )}
        </div>
        <div className="w-32 flex items-center justify-end">{right}</div>
      </div>
    </nav>
  );
}

export function BackButton({ href, label = "Back" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "font-mono text-[11px] tracking-wider uppercase font-bold",
        "text-t300 hover:text-t100 transition-colors",
        "flex items-center gap-1.5 min-h-[38px]",
        "px-4 py-2",
        "border border-[rgba(255,255,255,0.12)] rounded-full",
        "hover:border-[rgba(255,255,255,0.22)] hover:bg-white/[0.03]"
      )}
    >
      ← {label}
    </Link>
  );
}
