"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Props {
  korean: string;
  pronunciation: string;
  english: string;
  tip?: string;
  breakdownSteps?: string[];
  audioSrc: string;
  catColor: string;
  enablePractice?: boolean;
}

// ── DSP & Waveform Helpers ──────────────────────────────────────────
function getRmsEnvelope(data: any, bins: number): Float32Array {
  const envelope = new Float32Array(bins);
  const blockSize = Math.floor(data.length / bins);
  for (let i = 0; i < bins; i++) {
    const start = i * blockSize;
    const end = Math.min(data.length, start + blockSize);
    let sum = 0;
    for (let j = start; j < end; j++) {
      sum += data[j] * data[j];
    }
    const rms = Math.sqrt(sum / (end - start || 1));
    envelope[i] = rms;
  }
  
  // Normalize
  let max = 0;
  for (let i = 0; i < bins; i++) {
    if (envelope[i] > max) max = envelope[i];
  }
  if (max > 0) {
    for (let i = 0; i < bins; i++) {
      envelope[i] /= max;
    }
  }
  return envelope;
}

function compareEnvelopes(model: any, user: any, modelDuration: number, userDuration: number): number {
  const durDiff = Math.abs(modelDuration - userDuration);
  const durScore = Math.max(0, 100 - (durDiff / Math.max(modelDuration, 0.5)) * 100);
  
  let dotProd = 0;
  let modelNorm = 0;
  let userNorm = 0;
  for (let i = 0; i < model.length; i++) {
    dotProd += model[i] * user[i];
    modelNorm += model[i] * model[i];
    userNorm += user[i] * user[i];
  }
  const cosSim = dotProd / (Math.sqrt(modelNorm * userNorm) || 1);
  const correlationScore = Math.max(0, cosSim * 100);
  
  let score = Math.round(correlationScore * 0.7 + durScore * 0.3);
  return Math.min(99, Math.max(45, score));
}

function evaluateTtsPronunciation(userEnvelope: any, userDuration: number, textToSpeak?: string): number {
  const charCount = textToSpeak ? textToSpeak.length : 8;
  const targetDuration = charCount * 0.25; 
  
  const durDiff = Math.abs(targetDuration - userDuration);
  const durScore = Math.max(0, 100 - (durDiff / Math.max(targetDuration, 0.5)) * 80);
  
  let silentBlocks = 0;
  const totalBlocks = userEnvelope.length;
  for (let i = 0; i < totalBlocks; i++) {
    if (userEnvelope[i] < 0.15) silentBlocks++;
  }
  const activityRatio = (totalBlocks - silentBlocks) / totalBlocks;
  
  let activityScore = 100;
  if (activityRatio < 0.3) activityScore = 30;
  else if (activityRatio > 0.95) activityScore = 60;
  else activityScore = 100 - Math.abs(activityRatio - 0.65) * 100;
  
  let score = Math.round(activityScore * 0.6 + durScore * 0.4);
  score += Math.floor(Math.random() * 6) - 3;
  return Math.min(98, Math.max(50, score));
}

function drawStaticEnvelope(canvas: HTMLCanvasElement | null, envelope: any, color: string) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.offsetWidth || 200;
  const H = canvas.offsetHeight || 24;
  canvas.width = W;
  canvas.height = H;
  ctx.clearRect(0, 0, W, H);
  
  const barW = 2;
  const gap = 1.5;
  const total = barW + gap;
  const bars = Math.floor(W / total);
  
  for (let i = 0; i < bars; i++) {
    const idx = Math.floor(i / bars * envelope.length);
    const val = envelope[idx] || 0.05;
    const h = Math.max(2, val * H * 0.85);
    const y = (H - h) / 2;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    (ctx as any).roundRect?.(i * total, y, barW, h, 1) ?? ctx.rect(i * total, y, barW, h);
    ctx.fill();
  }
}

export function ShadowingCard({
  korean,
  pronunciation,
  english,
  tip,
  breakdownSteps,
  audioSrc,
  catColor,
  enablePractice = true,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Audio Playback states & refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Failure fallback states
  const [useTTS, setUseTTS] = useState(false);
  const [audioUnavailable, setAudioUnavailable] = useState(false);

  // Practice & Voice Recording states & refs
  const [showPractice, setShowPractice] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [userPlaying, setUserPlaying] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const modelWaveCanvasRef = useRef<HTMLCanvasElement>(null);
  const userWaveCanvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const userStreamRef = useRef<MediaStream | null>(null);
  const recordingRafRef = useRef<number>(0);
  const userAudioRef = useRef<HTMLAudioElement | null>(null);

  const isRecordingRef = useRef(false);
  const playingRef = useRef(false);
  const useTTSRef = useRef(false);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    useTTSRef.current = useTTS;
  }, [useTTS]);

  const drawBars = useCallback((data: Float32Array, active: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.offsetWidth || 200;
    const H = 32;
    canvas.width = W;
    canvas.height = H;
    ctx.clearRect(0, 0, W, H);
    const barW = 3, gap = 2, total = barW + gap;
    const bars = Math.floor(W / total);
    for (let i = 0; i < bars; i++) {
      const idx = Math.floor(i / bars * data.length);
      const amp = Math.min(1, Math.abs(data[idx] || 0.08));
      const h = Math.max(3, amp * H * 0.9);
      const y = (H - h) / 2;
      ctx.fillStyle = active ? catColor : "rgba(255,255,255,0.15)";
      ctx.globalAlpha = active ? 0.85 : 0.4;
      ctx.beginPath();
      (ctx as any).roundRect?.(i * total, y, barW, h, 1.5) ?? ctx.rect(i * total, y, barW, h);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, [catColor]);

  // Initial draw of static bars
  useEffect(() => {
    drawBars(new Float32Array(64).fill(0.08), false);
  }, [drawBars]);

  // Cleanup references on unmount to prevent leaks and double playbacks
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (userAudioRef.current) {
        userAudioRef.current.pause();
        userAudioRef.current = null;
      }
      if (userStreamRef.current) {
        userStreamRef.current.getTracks().forEach(track => track.stop());
        userStreamRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (recordingRafRef.current) {
        cancelAnimationFrame(recordingRafRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const animateWave = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const buf = new Float32Array(analyser.fftSize);
    
    const frame = () => {
      if (analyser) analyser.getFloatTimeDomainData(buf);
      drawBars(buf, true);
      const audio = audioRef.current;
      if (audio) {
        setProgress(audio.currentTime / (audio.duration || 1));
      }
      if (audioRef.current && !audioRef.current.paused) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        drawBars(new Float32Array(64).fill(0.08), false);
        setProgress(0);
        setPlaying(false);
      }
    };
    rafRef.current = requestAnimationFrame(frame);
  }, [drawBars]);

  const animateTtsWave = useCallback((durationMs: number) => {
    const start = performance.now();
    const buf = new Float32Array(64);
    
    const frame = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(1, elapsed / durationMs);
      setProgress(pct);
      
      if (pct < 1 && window.speechSynthesis.speaking && playingRef.current) {
        for (let i = 0; i < buf.length; i++) {
          buf[i] = Math.max(0.04, Math.sin(i * 0.2 + elapsed * 0.01) * 0.35 + Math.random() * 0.15);
        }
        drawBars(buf, true);
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setPlaying(false);
        setProgress(0);
        drawBars(new Float32Array(64).fill(0.08), false);
      }
    };
    rafRef.current = requestAnimationFrame(frame);
  }, [drawBars]);

  const playTtsFallback = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(korean);
    utterance.lang = "ko-KR";
    utterance.onend = () => {
      setPlaying(false);
      setProgress(0);
      drawBars(new Float32Array(64).fill(0.08), false);
    };
    utterance.onerror = () => {
      setPlaying(false);
      setProgress(0);
      drawBars(new Float32Array(64).fill(0.08), false);
    };
    
    setPlaying(true);
    window.speechSynthesis.speak(utterance);
    animateTtsWave(korean.length * 280);
  }, [korean, animateTtsWave, drawBars]);

  // Main toggle (Play/Pause)
  const toggle = async () => {
    if (useTTS) {
      if (playing) {
        window.speechSynthesis.cancel();
        setPlaying(false);
      } else {
        playTtsFallback();
      }
      return;
    }

    if (!audioRef.current) {
      const audio = new Audio(audioSrc);
      audio.preload = "auto";
      audio.oncanplaythrough = () => setLoaded(true);
      audio.onerror = () => {
        // Safe fallback
        setAudioUnavailable(true);
        setUseTTS(true);
        playTtsFallback();
      };
      audio.onended = () => { 
        setPlaying(false); 
        setProgress(0); 
        drawBars(new Float32Array(64).fill(0.08), false); 
      };
      audioRef.current = audio;

      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        const source = ctx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(ctx.destination);
        audioCtxRef.current = ctx;
        analyserRef.current = analyser;
        sourceRef.current = source;
      } catch (err) {
        console.warn("Web Audio API not supported, using standard playback visualizer fallback");
      }
    }

    const audio = audioRef.current;
    if (audioCtxRef.current?.state === "suspended") {
      await audioCtxRef.current.resume().catch(() => {});
    }

    if (playing) {
      audio.pause();
      setPlaying(false);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      drawBars(new Float32Array(64).fill(0.08), false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
        animateWave();
      } catch (err) {
        console.warn("Audio file playback failed. Switching to TTS fallback.", err);
        setAudioUnavailable(true);
        setUseTTS(true);
        playTtsFallback();
      }
    }
  };

  // Replay function
  const replay = async () => {
    if (useTTS) {
      playTtsFallback();
      return;
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (audioCtxRef.current?.state === "suspended") {
        await audioCtxRef.current.resume().catch(() => {});
      }
      try {
        await audioRef.current.play();
        setPlaying(true);
        animateWave();
      } catch (err) {
        setAudioUnavailable(true);
        setUseTTS(true);
        playTtsFallback();
      }
    } else {
      toggle();
    }
  };

  // --- Voice Practice similarity match logic ---
  const startRecording = async () => {
    try {
      if (typeof window === "undefined" || !navigator.mediaDevices) {
        alert("Audio recording is not supported in this browser.");
        return;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      userStreamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setRecordingBlob(blob);
        const url = URL.createObjectURL(blob);
        setRecordingUrl(url);
        
        setTimeout(() => {
          calculateSimilarity(blob);
        }, 120);
      };
      
      if (userAudioRef.current) {
        userAudioRef.current.pause();
        userAudioRef.current = null;
      }
      setUserPlaying(false);
      setMatchScore(null);
      setRecordingUrl(null);
      setRecordingBlob(null);
      
      setIsRecording(true);
      mediaRecorder.start();
      startRecordingWaveform(stream);
    } catch (err) {
      console.error("Failed to start recording", err);
      alert("Microphone access is required to practice speaking.");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    
    if (userStreamRef.current) {
      userStreamRef.current.getTracks().forEach((track) => track.stop());
      userStreamRef.current = null;
    }
    
    if (recordingRafRef.current) {
      cancelAnimationFrame(recordingRafRef.current);
    }
  };

  const startRecordingWaveform = (stream: MediaStream) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);
      const buf = new Float32Array(analyser.fftSize);
      
      const drawFrame = () => {
        if (!isRecordingRef.current) return;
        analyser.getFloatTimeDomainData(buf);
        
        const canvas = userWaveCanvasRef.current;
        if (canvas) {
          const cCtx = canvas.getContext("2d");
          if (cCtx) {
            const W = canvas.offsetWidth || 200;
            const H = 24;
            canvas.width = W;
            canvas.height = H;
            cCtx.clearRect(0, 0, W, H);
            
            const barW = 2;
            const gap = 1.5;
            const total = barW + gap;
            const bars = Math.floor(W / total);
            
            for (let i = 0; i < bars; i++) {
              const idx = Math.floor(i / bars * buf.length);
              const amp = Math.min(1, Math.abs(buf[idx] || 0.05));
              const h = Math.max(2, amp * H * 2.5); 
              const y = (H - h) / 2;
              
              cCtx.fillStyle = "rgba(239, 68, 68, 0.85)";
              cCtx.beginPath();
              (cCtx as any).roundRect?.(i * total, y, barW, h, 1) ?? cCtx.rect(i * total, y, barW, h);
              cCtx.fill();
            }
          }
        }
        recordingRafRef.current = requestAnimationFrame(drawFrame);
      };
      recordingRafRef.current = requestAnimationFrame(drawFrame);
    } catch (err) {
      console.error("Failed to visualize recording", err);
    }
  };

  const calculateSimilarity = async (userBlob: Blob) => {
    try {
      const ctx = audioCtxRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      if (!audioCtxRef.current) audioCtxRef.current = ctx;

      const arrayBuffer = await userBlob.arrayBuffer();
      const userBuffer = await ctx.decodeAudioData(arrayBuffer);
      const userData = userBuffer.getChannelData(0);
      
      const BINS = 50;
      const userEnvelope = getRmsEnvelope(userData, BINS);

      drawStaticEnvelope(userWaveCanvasRef.current, userEnvelope, "rgba(239, 68, 68, 0.85)");

      let modelEnvelope: any = new Float32Array(BINS).fill(0.1);
      let matchPercentage = 0;

      const hasAudioFile = audioSrc && !useTTSRef.current && !audioUnavailable;
      if (hasAudioFile) {
        try {
          const response = await fetch(audioSrc);
          const modelArrayBuffer = await response.arrayBuffer();
          const modelBuffer = await ctx.decodeAudioData(modelArrayBuffer);
          const modelData = modelBuffer.getChannelData(0);
          modelEnvelope = getRmsEnvelope(modelData, BINS);
          
          drawStaticEnvelope(modelWaveCanvasRef.current, modelEnvelope, catColor);
          matchPercentage = compareEnvelopes(modelEnvelope, userEnvelope, modelBuffer.duration, userBuffer.duration);
        } catch (err) {
          matchPercentage = evaluateTtsPronunciation(userEnvelope, userBuffer.duration, korean);
          drawStaticEnvelope(modelWaveCanvasRef.current, new Float32Array(BINS).fill(0.08), catColor);
        }
      } else {
        matchPercentage = evaluateTtsPronunciation(userEnvelope, userBuffer.duration, korean);
        const refLen = korean ? korean.length : 8;
        for (let i = 0; i < BINS; i++) {
          const x = i / BINS;
          modelEnvelope[i] = Math.max(0.05, Math.sin(x * Math.PI) * 0.45 + Math.sin(x * refLen * 2) * 0.15);
        }
        drawStaticEnvelope(modelWaveCanvasRef.current, modelEnvelope, catColor);
      }

      setMatchScore(matchPercentage);
    } catch (err) {
      console.error("Error calculating similarity", err);
    }
  };

  const toggleUserPlayback = () => {
    if (!recordingUrl) return;
    
    if (!userAudioRef.current) {
      const audio = new Audio(recordingUrl);
      audio.onended = () => {
        setUserPlaying(false);
      };
      userAudioRef.current = audio;
    }
    
    const audio = userAudioRef.current;
    if (userPlaying) {
      audio.pause();
      setUserPlaying(false);
    } else {
      audio.play().then(() => {
        setUserPlaying(true);
      }).catch((err) => {
        console.error("Failed to play user recording", err);
      });
    }
  };

  return (
    <div className="border border-b-dim rounded-2xl overflow-hidden bg-s1">
      {/* Main phrase body */}
      <div className="px-4 py-4">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="flex-1">
            <p className="font-syne text-[18px] font-bold text-t100 leading-tight mb-1">{korean}</p>
            <p className="font-mono text-[9px] text-mint/55 tracking-wide">{pronunciation}</p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-b-mid flex items-center justify-center text-t300 hover:border-mint/30 hover:text-mint transition-all"
            aria-label={isExpanded ? "Collapse" : "Show breakdown"}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={cn("transition-transform", isExpanded && "rotate-180")}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <p className="font-mono text-[9.5px] text-t300 mb-3">{english}</p>

        {/* Audio control bar */}
        <div className="flex flex-col w-full border-t border-[rgba(255,255,255,0.04)] pt-3 mt-1">
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={toggle}
              aria-label={playing ? "Pause" : "Play pronunciation"}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all border"
              style={{
                background: playing ? catColor : `${catColor}14`,
                borderColor: `${catColor}35`,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                {playing
                  ? <><rect x="2.5" y="2" width="2" height="6" rx="0.5" fill={catColor === "#00e5b4" ? "#0a0a0b" : "#fff"}/><rect x="5.5" y="2" width="2" height="6" rx="0.5" fill={catColor === "#00e5b4" ? "#0a0a0b" : "#fff"}/></>
                  : <path d="M3.5 2l4 3-4 3V2z" fill={catColor}/>
                }
              </svg>
            </button>

            {/* Replay Button */}
            <button
              onClick={replay}
              aria-label="Replay pronunciation"
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all border border-b-mid hover:text-mint hover:border-mint/30 text-t300"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </button>

            {/* Waveform Canvas & Fallback tags */}
            <div className="flex-1 relative">
              <canvas ref={canvasRef} style={{ width: "100%", height: "32px", display: "block" }} />
              {playing && (
                <div className="absolute bottom-0 left-0 h-[2px] transition-all rounded-full"
                  style={{ width: `${progress * 100}%`, background: catColor }} />
              )}
              {useTTS && (
                <span className="absolute top-1 right-2 font-mono text-[7px] bg-white/10 text-t400 px-1 py-0.5 rounded leading-none">
                  TTS Fallback
                </span>
              )}
              {audioUnavailable && (
                <span className="absolute top-1 left-2 font-mono text-[7px] bg-red-500/15 text-red-400 border border-red-500/25 px-1 py-0.5 rounded leading-none">
                  Audio unavailable
                </span>
              )}
            </div>

            {/* Optional Voice Matcher Practice Toggle */}
            {enablePractice && (
              <button
                onClick={() => setShowPractice(!showPractice)}
                className={cn(
                  "font-mono text-[8px] tracking-wider uppercase px-2.5 py-1.5 rounded-lg border transition-all flex-shrink-0 ml-1",
                  showPractice
                    ? "border-mint/30 bg-mint/5 text-mint"
                    : "border-b-mid text-t400 hover:text-t200 hover:border-b-hi"
                )}
              >
                {showPractice ? "Close" : "Practice"}
              </button>
            )}
          </div>

          {/* Voice Matcher Practice Panel */}
          {enablePractice && showPractice && (
            <div className="w-full mt-3 p-3 bg-s2 border border-b-dim rounded-xl flex flex-col gap-3 animate-fade-up">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8.5px] text-t400 uppercase tracking-widest">Voice Matcher</span>
                {matchScore !== null && (
                  <span
                    className={cn(
                      "font-mono text-[9px] font-bold px-2 py-0.5 rounded-full border tracking-wide",
                      matchScore >= 85
                        ? "border-mint/30 bg-mint/5 text-mint"
                        : matchScore >= 70
                        ? "border-violet/30 bg-violet/5 text-violet"
                        : "border-t400/30 bg-white/5 text-t300"
                    )}
                  >
                    Match: {matchScore}%
                  </span>
                )}
              </div>

              {/* Match Score Feedback Description */}
              {matchScore !== null && (
                <div className="text-left font-mono text-[9.5px] text-t300 leading-normal bg-s1 px-2.5 py-2 rounded-lg border border-b-dim">
                  {matchScore >= 85 ? (
                    <p className="text-mint">Perfect! Your rhythm and pacing matches RM/V exceptionally well.</p>
                  ) : matchScore >= 70 ? (
                    <p className="text-violet">Very close! Try syncing your sentence duration and emotional emphasis slightly more.</p>
                  ) : (
                    <p className="text-t300">Keep practicing! Listen to the native audio, focus on the sentence length, and try again.</p>
                  )}
                </div>
              )}

              {/* Waveform visualization comparison */}
              <div className="flex flex-col gap-2 bg-s3/40 p-2.5 rounded-lg border border-b-dim">
                <div className="flex items-center gap-2">
                  <span className="w-12 font-mono text-[7px] text-t400 uppercase tracking-wider">Model:</span>
                  <div className="flex-1 h-6 relative bg-s1/30 rounded border border-b-dim">
                    <canvas ref={modelWaveCanvasRef} style={{ width: "100%", height: "24px" }} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 font-mono text-[7px] text-t400 uppercase tracking-wider">You:</span>
                  <div className="flex-1 h-6 relative bg-s1/30 rounded border border-b-dim">
                    <canvas ref={userWaveCanvasRef} style={{ width: "100%", height: "24px" }} />
                  </div>
                </div>
              </div>

              {/* Record Actions */}
              <div className="flex items-center justify-center gap-3 mt-1">
                {isRecording ? (
                  <button
                    onClick={stopRecording}
                    className="px-4 py-2 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 font-mono text-[9px] tracking-wider uppercase animate-pulse flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    Stop recording
                  </button>
                ) : (
                  <button
                    onClick={startRecording}
                    className="px-4 py-2 rounded-full bg-mint/10 border border-mint/30 text-mint font-mono text-[9px] tracking-wider uppercase hover:bg-mint/20 transition-all"
                  >
                    Start speaking
                  </button>
                )}

                {recordingUrl && !isRecording && (
                  <button
                    onClick={toggleUserPlayback}
                    className={cn(
                      "px-4 py-2 rounded-full border font-mono text-[9px] tracking-wider uppercase transition-all",
                      userPlaying
                        ? "bg-violet/10 border-violet/30 text-violet"
                        : "border-b-mid text-t300 hover:text-t100"
                    )}
                  >
                    {userPlaying ? "Pause response" : "Play response"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shadowing steps dropdown block */}
      {isExpanded && (
        <div className="border-t border-b-dim px-4 py-3 bg-s2 animate-fade-up">
          {tip && (
            <div className="flex gap-2 mb-3">
              <span className="font-mono text-[7px] tracking-wider uppercase text-mint/60 px-2 py-0.5 bg-mint/[0.08] border border-mint/20 rounded-full flex-shrink-0 mt-0.5">
                Why it works
              </span>
              <p className="font-mono text-[9px] text-t300 leading-[1.65]">{tip}</p>
            </div>
          )}
          {breakdownSteps && breakdownSteps.length > 0 && (
            <div>
              <p className="font-mono text-[7px] tracking-[0.18em] uppercase text-t400 mb-2">
                Practice steps
              </p>
              <div className="flex flex-col gap-1.5">
                {breakdownSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-b-mid flex items-center justify-center flex-shrink-0">
                      <span className="font-mono text-[7px] text-t400">{i + 1}</span>
                    </span>
                    <p className="font-syne text-[13px] font-bold text-t100">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
