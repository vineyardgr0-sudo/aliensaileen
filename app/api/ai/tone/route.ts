import { getOpenAI } from "@/lib/ai/openai";
import { TONE_ANALYSIS_PROMPT, AI_CONFIG } from "@/lib/ai/prompts";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text: string = body?.text ?? "";
    const targetRelationship: string | undefined = body?.targetRelationship;
    if (!text.trim()) return Response.json({ error: "No text provided" }, { status: 400 });

    const userPrompt = targetRelationship
      ? `Analyze this Korean text. The user intends to say this to: ${targetRelationship}\n\nText: "${text}"`
      : `Analyze this Korean text:\n\n"${text}"`;

    const openai = await getOpenAI();
    const response = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      temperature: AI_CONFIG.tone_temperature,
      max_tokens: AI_CONFIG.tone_max_tokens,
      messages: [
        { role: "system", content: TONE_ANALYSIS_PROMPT },
        { role: "user", content: userPrompt },
      ],
    });

    const analysis = response.choices[0]?.message?.content ?? "";
    return Response.json({ analysis });
  } catch (err) {
    console.error("[tone/route]", err);
    return Response.json({ error: "Tone analysis unavailable." }, { status: 500 });
  }
}
