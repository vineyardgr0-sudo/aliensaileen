import { getOpenAI } from "@/lib/ai/openai";
import { SCENARIOS, AILEEN_SYSTEM_PROMPT, AI_CONFIG } from "@/lib/ai/prompts";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages, scenarioId } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }
    const scenario = SCENARIOS.find((s) => s.id === scenarioId);
    const systemPrompt = scenario
      ? AILEEN_SYSTEM_PROMPT + "\n\n" + scenario.systemAddendum
      : AILEEN_SYSTEM_PROMPT;

    const openai = await getOpenAI();
    const response = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      temperature: AI_CONFIG.temperature,
      max_tokens: AI_CONFIG.max_tokens,
      stream: true,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (e) { controller.error(e); }
        finally { controller.close(); }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
    });
  } catch (err) {
    console.error("[chat/route]", err);
    return Response.json({ error: "AI unavailable." }, { status: 500 });
  }
}
