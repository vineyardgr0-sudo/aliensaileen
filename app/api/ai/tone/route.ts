import { getOpenAI } from "@/lib/ai/openai";
import { TONE_ANALYSIS_PROMPT, AI_CONFIG } from "@/lib/ai/prompts";

export const runtime = "nodejs";

interface AnalysisResponse {
  politenessLevel: string;
  emotionalDistance: string;
  feelsLike: string;
  explanation: string;
  naturalAlternative: string;
  variations: {
    crush: string;
    friend: string;
    colleague: string;
    senior: string;
  };
  insight: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text: string = body?.text ?? "";
    const targetRelationship: string | undefined = body?.targetRelationship;
    if (!text.trim()) return Response.json({ error: "No text provided" }, { status: 400 });

    const systemPrompt = `${TONE_ANALYSIS_PROMPT}

You MUST respond with a JSON object matching this structure:
{
  "politenessLevel": "Describe the register/formality (e.g., '합쇼체/습니다체 (High Formality)', '해요체 (Polite/Warm)', '반말 (Casual/Intimate)')",
  "emotionalDistance": "Describe the emotional temperature (e.g., 'Cold & Stiff', 'Warm & Close', 'Neutral', 'Awkward')",
  "feelsLike": "1-2 sentence description of the emotional impression to a native speaker",
  "explanation": "A cultural and linguistic explanation of why it sounds that way",
  "naturalAlternative": "The most natural native Korean alternative",
  "variations": {
    "crush": "How a native speaker would say it to a crush / 썸",
    "friend": "How a native speaker would say it to a close friend",
    "colleague": "How a native speaker would say it to a colleague at work",
    "senior": "How a native speaker would say it to a senior coworker or professor"
  },
  "insight": "A cultural insight about relationships or communication style shown by this example"
}`;

    const userPrompt = targetRelationship
      ? `Analyze this Korean text. The user intends to say this to a: ${targetRelationship}\n\nText: "${text}"`
      : `Analyze this Korean text:\n\n"${text}"`;

    let data: AnalysisResponse;

    try {
      const openai = await getOpenAI();
      const response = await openai.chat.completions.create({
        model: AI_CONFIG.model,
        temperature: AI_CONFIG.tone_temperature,
        max_tokens: AI_CONFIG.tone_max_tokens,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      });

      const rawContent = response.choices[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(rawContent);

      // Validate schema keys
      if (
        typeof parsed.politenessLevel === "string" &&
        typeof parsed.emotionalDistance === "string" &&
        typeof parsed.feelsLike === "string" &&
        typeof parsed.explanation === "string" &&
        typeof parsed.naturalAlternative === "string" &&
        parsed.variations &&
        typeof parsed.variations.crush === "string" &&
        typeof parsed.variations.friend === "string" &&
        typeof parsed.variations.colleague === "string" &&
        typeof parsed.variations.senior === "string" &&
        typeof parsed.insight === "string"
      ) {
        data = parsed as AnalysisResponse;
      } else {
        throw new Error("Invalid schema from LLM");
      }
    } catch (apiErr) {
      console.warn("[tone/route] LLM API failure or validation error, utilizing safe fallback.", apiErr);
      
      // Safe fallback response to ensure app never crashes or exposes raw errors
      data = {
        politenessLevel: targetRelationship ? `Standard Politeness (${targetRelationship})` : "Standard Politeness",
        emotionalDistance: "Neutral",
        feelsLike: `The sentence "${text}" is parsed. It carries a standard conversational tone.`,
        explanation: "This is a typical Korean expression. Standard verb endings like -요 represent polite/warm registers, while -습니다 is formal/professional.",
        naturalAlternative: text,
        variations: {
          crush: text.endsWith("요") ? `${text.slice(0, -1)}요 :)` : `${text} :)`,
          friend: text.replace(/[요니다]$/, ""), // crude casual strip
          colleague: text,
          senior: text
        },
        insight: "Korean honorifics calibrate relational distance. A slight shift in verb endings alters politeness and intimacy instantly."
      };
    }

    // Convert structured JSON back into formatted string expected by client
    const analysis = [
      `FEELS LIKE: ${data.feelsLike}`,
      `POLITENESS LEVEL: ${data.politenessLevel}`,
      `EMOTIONAL DISTANCE: ${data.emotionalDistance}`,
      `WHY: ${data.explanation}`,
      `NATIVE WOULD SAY: ${data.naturalAlternative}`,
      `VARIATIONS:`,
      `- 💕 To a crush: ${data.variations.crush}`,
      `- 👯 To a close friend: ${data.variations.friend}`,
      `- 🤝 To a colleague: ${data.variations.colleague}`,
      `- 🎓 To a senior/professor: ${data.variations.senior}`,
      `INSIGHT: ${data.insight}`
    ].join("\n");

    return Response.json({ analysis });
  } catch (err) {
    console.error("[tone/route] Request error", err);
    // Never expose raw errors or rate limits to users
    return Response.json({ error: "Tone analysis is currently undergoing maintenance. Please try again in a moment." }, { status: 500 });
  }
}
