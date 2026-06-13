import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

// ── Pronunciation evaluation via OpenAI Whisper ───────────────────
// POST /api/ai/pronunciation
// Body: FormData { audio: File, target: string (original Korean text) }
// Returns: { transcript, score, feedback }

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OPENAI_API_KEY not set" }, { status: 500 });
    }

    const formData = await req.formData();
    const audioFile = formData.get("audio") as File | null;
    const target    = formData.get("target") as string | null;

    if (!audioFile || !target) {
      return NextResponse.json({ error: "Missing audio or target" }, { status: 400 });
    }

    // ── Send to Whisper ───────────────────────────────────────────
    const whisperForm = new FormData();
    whisperForm.append("file", audioFile, "recording.webm");
    whisperForm.append("model", "whisper-1");
    whisperForm.append("language", "ko");  // force Korean
    whisperForm.append("response_format", "json");

    const whisperRes = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: whisperForm,
    });

    if (!whisperRes.ok) {
      const err = await whisperRes.text();
      console.error("Whisper error:", err);
      return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
    }

    const { text: transcript } = await whisperRes.json() as { text: string };

    // ── Compare transcript to target ──────────────────────────────
    const score = computeScore(normalize(transcript), normalize(target));
    const feedback = scoreFeedback(score);

    return NextResponse.json({ transcript, score, feedback });

  } catch (err) {
    console.error("Pronunciation API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// ── Scoring ───────────────────────────────────────────────────────

// Remove spaces, punctuation, and normalize Unicode (NFC)
function normalize(text: string): string {
  return text
    .normalize("NFC")
    .replace(/[^\uAC00-\uD7A3\u3130-\u318F\u1100-\u11FF\uA960-\uA97F\uD7B0-\uD7FF]/g, "")
    .trim();
}

// Character-level similarity using Levenshtein distance
function computeScore(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 100;

  const m = a.length;
  const n = b.length;

  // Build DP table
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  const editDistance = dp[m][n];
  const maxLen = Math.max(m, n);
  const similarity = (maxLen - editDistance) / maxLen;
  return Math.round(similarity * 100);
}

// Score → user-facing feedback
function scoreFeedback(score: number): {
  label: string;
  emoji: string;
  message: string;
} {
  if (score >= 85) {
    return {
      label: "완벽해요",
      emoji: "✓",
      message: "Aileen과 거의 동일하게 들렸습니다.",
    };
  }
  if (score >= 60) {
    return {
      label: "잘 됐어요",
      emoji: "◎",
      message: "대부분 정확합니다. 한 번 더 해보세요.",
    };
  }
  if (score >= 35) {
    return {
      label: "다시 해봐요",
      emoji: "△",
      message: "Aileen 발음을 다시 듣고 천천히 따라해 보세요.",
    };
  }
  return {
    label: "처음부터",
    emoji: "↺",
    message: "Aileen 발음을 먼저 여러 번 들어보세요.",
  };
}
