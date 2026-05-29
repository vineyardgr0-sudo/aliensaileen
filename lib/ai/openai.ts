// Fix E: lazy-loaded so openai is NOT bundled into every server build
// Only loads when the AI route is actually called
let clientPromise: Promise<import("openai").default> | null = null;

export async function getOpenAI() {
  if (!clientPromise) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set in environment variables.");
    }
    clientPromise = import("openai").then(
      ({ default: OpenAI }) => new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    );
  }
  return clientPromise;
}
