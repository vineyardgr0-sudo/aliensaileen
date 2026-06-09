// ================================================================
// FILE: components/ui/ShadowingCard.tsx  (REPLACE EXISTING)
//
// WHAT CHANGED: visual wrapper only
//   • Darker card surface, stronger borders
//   • Section label styling (font-mono, mint)
//   • Korean text larger (Syne font)
//   • RECORD button more prominent
//   • why_it_works box slightly more visible
//
// WHAT IS IDENTICAL (do not touch):
//   • All props interface — phrase data comes from JSON as-is
//   • phrase.korean, phrase.pronunciation, phrase.english,
//     phrase.why_it_works — rendered exactly as received
//   • Web Audio API canvas ref (waveformRef)
//   • MediaRecorder recording logic
//   • onPlay, onRecord, onStopRecord, onPlayback handlers
//   • isPlaying, isRecording, hasRecording state
//   • Audio file paths — untouched
// ================================================================

"use client";

interface PhraseItem {
  korean: string;
  pronunciation: string;
  english: string;
  why_it_works?: string;
  audio_url?: string;
}

interface ShadowingCardProps {
  phrase: PhraseItem;
  isPlaying: boolean;
  isRecording: boolean;
  hasRecording: boolean;
  waveformRef?: React.RefObject<HTMLCanvasElement>;
  onPlay: () => void;
  onRecord: () => void;
  onStopRecord: () => void;
  onPlayback?: () => void;
}

export function ShadowingCard({
  phrase,
  isPlaying,
  isRecording,
  hasRecording,
  waveformRef,
  onPlay,
  onRecord,
  onStopRecord,
  onPlayback,
}: ShadowingCardProps) {
  return (
    <div className="rounded-2xl border border-b-mid bg-white/[0.03] overflow-hidden">

      {/* Section label */}
      <div className="px-5 pt-4">
        <p className="font-mono text-[9px] text-t400 tracking-[0.28em]">
          NATURAL PHRASES
        </p>
      </div>

      {/* Phrase — Korean is the hero */}
      <div className="px-5 pt-3 pb-4 border-b border-b-dim">
        <p className="font-syne text-2xl font-black text-white leading-tight mb-1">
          {phrase.korean}
        </p>
        <p className="font-mono text-[10px] text-mint mb-1">
          {phrase.pronunciation}
        </p>
        <p className="font-mono text-xs text-t300">
          {phrase.english}
        </p>
      </div>

      {/* Native model audio player */}
      <div className="px-5 py-4 border-b border-b-dim">
        <div className="flex items-center gap-4">

          {/* Play button */}
          <button
            onClick={onPlay}
            aria-label={isPlaying ? "Playing" : "Play native model"}
            className={`
              flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center
              transition-all duration-150
              ${isPlaying
                ? "border-mint bg-mint/15"
                : "border-b-hi bg-white/[0.05] hover:border-mint/50 hover:bg-white/[0.08]"
              }
            `}
          >
            {isPlaying ? (
              <span className="w-3 h-3 border-2 border-mint border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" className="text-white ml-0.5">
                <path d="M0 0L10 6L0 12V0Z"/>
              </svg>
            )}
          </button>

          {/* Waveform canvas — your existing Web Audio visualisation */}
          <canvas
            ref={waveformRef}
            className="flex-1 h-10 opacity-50"
          />

          <span className="flex-shrink-0 font-mono text-[9px] text-t400 tracking-wider">
            NATIVE
          </span>

        </div>
      </div>

      {/* Practice recording section */}
      <div className="px-5 py-4">
        <p className="font-mono text-[9px] text-t400 tracking-[0.28em] mb-3">
          PRACTICE
        </p>

        {/* Recording area */}
        <div className={`
          h-12 rounded-xl mb-3 flex items-center px-3 border transition-all duration-200
          ${isRecording
            ? "border-red-400/50 bg-red-400/[0.05]"
            : "border-b-dim bg-white/[0.02]"
          }
        `}>
          {isRecording ? (
            <div className="flex items-center gap-2 w-full">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse flex-shrink-0" />
              <span className="font-mono text-[9px] text-red-400 tracking-wider">
                RECORDING...
              </span>
            </div>
          ) : hasRecording ? (
            <button
              onClick={onPlayback}
              className="flex items-center gap-2 text-t300 hover:text-t100 transition-colors"
            >
              <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor" className="ml-0.5">
                <path d="M0 0L8 5L0 10V0Z"/>
              </svg>
              <span className="font-mono text-[9px] tracking-wider">
                PLAY YOUR RECORDING
              </span>
            </button>
          ) : (
            <span className="font-mono text-[9px] text-t400 tracking-wider">
              TAP RECORD TO PRACTISE
            </span>
          )}
        </div>

        {/* Record button */}
        <button
          onClick={isRecording ? onStopRecord : onRecord}
          className={`
            flex items-center gap-2 font-mono text-[10px] tracking-[0.18em]
            px-4 py-2.5 rounded-full border transition-all duration-150 active:scale-[0.97]
            ${isRecording
              ? "border-red-400/60 bg-red-400/10 text-red-400"
              : "border-b-hi bg-white/[0.04] text-t200 hover:border-mint/40 hover:text-t100"
            }
          `}
        >
          <div className={`
            w-2 h-2 rounded-full flex-shrink-0
            ${isRecording ? "bg-red-400 animate-pulse" : "bg-t400"}
          `} />
          {isRecording ? "STOP" : "RECORD"}
        </button>
      </div>

      {/* Why it works — rendered exactly from JSON, no changes to content */}
      {phrase.why_it_works && (
        <div className="px-5 pb-5">
          <div className="p-3 rounded-xl bg-white/[0.025] border border-b-dim">
            <p className="font-mono text-[10px] text-t300 leading-relaxed">
              {phrase.why_it_works}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
