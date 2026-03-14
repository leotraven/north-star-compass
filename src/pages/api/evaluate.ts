import type { APIRoute } from "astro";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const SYSTEM_PROMPT = `You are an expert strategic advisor. Evaluate whether the user's immediate action aligns with their long-term strategy. Be objective, slightly ruthless, and highly analytical. Format your response strictly with:
1. Alignment Score (1-10)
2. The Verdict (One sentence)
3. The 'Why' (Brief explanation)
4. Strategic Alternative (If needed)`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { strategy, action } = body;

    if (!strategy || !action) {
      return new Response(JSON.stringify({ error: "Both strategy and action are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = import.meta.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("Missing OPENROUTER_API_KEY environment variable");
    }

    const openrouter = createOpenRouter({ apiKey });

    const model = import.meta.env.OPENROUTER_MODEL || "openai/gpt-4o";

    const { text } = await generateText({
      model: openrouter(model),
      system: SYSTEM_PROMPT,
      prompt: `Long-Term Strategy:\n${strategy}\n\nImmediate Action:\n${action}`,
      temperature: 0.7,
      maxTokens: 512,
    });

    return new Response(JSON.stringify({ result: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Evaluation error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
