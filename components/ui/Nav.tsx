"use client";

// ================================================================
// FILE: components/ui/Nav.tsx  (REPLACE EXISTING)
// CHANGES:
//   1. Added 2px progress bar at top (mint)
//   2. Added lesson ID mono-label on right
//   3. Added relationship context sub-label under logo
//   4. Back button styled as system pill
//   5. Preserved legacy BackButton export and legacy props for full compatibility
// ================================================================

import Link from "next/link";
import { useLessonProgress } from "@/hooks/useProgress";
import { progressStore } from "@/lib/progress/store";
import { cn } from "@/lib/utils";

interface NavProps {
  lessonId?: string;
  relationship?: string;
  progress?: number;        // 0–1, optional — shows progress bar if provided
  showBack?: boolean;
  backHref?: string;
  showBookmark?: boolean;

  // Legacy compatibility props
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
}

export function Nav({
  lessonId,
  relationship,
  progress,
  showBack = false,
  backHref = "/",
  showBookmark = false,
  left,
  right,
  title,
  className,
}: NavProps) {
  const { lp, refresh } = useLessonProgress(lessonId || "");
  const isBookmarked = lessonId ? lp.bookmarked : false;

  function handleToggleBookmark() {
    if (!lessonId) return;
    progressStore.toggleBookmark(lessonId);
    refresh();
  }

  const pct = progress != null ? Math.round(progress * 100) : null;
  const isLegacy = left !== undefined || right !== undefined || title !== undefined;

  return (
    <header className={cn("sticky top-0 z-50 bg-s0/95 backdrop-blur-sm flex-shrink-0", className)}>
      {/* ── Progress bar ── */}
      {pct != null && (
        <div className="h-[2px] w-full bg-b-dim">
          <div
            className="h-full bg-mint transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      {isLegacy ? (
        <nav className="border-b border-[rgba(255,255,255,0.07)] safe-top">
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
      ) : (
        /* ── New Nav content ── */
        <div className="flex items-center justify-between px-4 py-3 border-b border-b-dim max-w-2xl mx-auto w-full">
          {/* Left */}
          {showBack ? (
            <Link
              href={backHref}
              className="flex items-center gap-1.5 font-mono text-[10px] text-t300 tracking-[0.15em] border border-b-mid rounded-full px-3 py-1.5 hover:text-t100 hover:border-b-hi transition-colors"
            >
              ← LESSONS
            </Link>
          ) : (
            <div className="w-24" />
          )}

          {/* Center */}
          <div className="flex flex-col items-center">
            <span className="font-mono text-[10px] tracking-[0.22em]">
              <span className="text-t200">ALIEN&apos;S </span>
              <span className="text-mint">AILEEN</span>
            </span>
            {relationship && (
              <span className="font-mono text-[8px] text-t400 tracking-[0.15em] mt-0.5 uppercase">
                {relationship}
              </span>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 w-24 justify-end">
            {lessonId && (
              <span className="font-mono text-[10px] text-t400 tracking-[0.15em]">
                {lessonId}
              </span>
            )}
            {showBookmark && lessonId && (
              <button
                onClick={handleToggleBookmark}
                aria-label={isBookmarked ? "Remove bookmark" : "Bookmark lesson"}
                className={cn(
                  "w-7 h-7 rounded-full border flex items-center justify-center transition-all",
                  isBookmarked
                    ? "border-mint/40 bg-mint/10 text-mint"
                    : "border-b-dim text-t400 hover:text-t200"
                )}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 2h8v9L6 8.5 2 11V2z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
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
