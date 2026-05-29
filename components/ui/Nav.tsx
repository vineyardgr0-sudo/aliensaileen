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
      <div className="flex items-center justify-between h-12 px-4 max-w-2xl mx-auto">
        <div className="w-24 flex items-center">{left}</div>
        <div className="flex-1 flex items-center justify-center">
          {title ?? (
            <Link href="/" className="font-syne text-[11px] font-bold tracking-[0.1em] text-t100">
              ALIEN&apos;S <span className="text-mint">AILEEN</span>
            </Link>
          )}
        </div>
        <div className="w-24 flex items-center justify-end">{right}</div>
      </div>
    </nav>
  );
}

export function BackButton({ href, label = "Back" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "font-mono text-[9px] tracking-wider uppercase",
        "text-t300 hover:text-t100 transition-colors",
        "flex items-center gap-1 min-h-[32px]",
        "px-2.5 py-1.5",
        "border border-[rgba(255,255,255,0.09)] rounded-full",
        "hover:border-[rgba(255,255,255,0.18)]"
      )}
    >
      ← {label}
    </Link>
  );
}
