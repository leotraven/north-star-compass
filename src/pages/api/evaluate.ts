import type { APIRoute } from "astro";
import { AzureOpenAI } from "openai";

const SYSTEM_PROMPT = `You are an expert strategic advisor. Evaluate whether the user's immediate action aligns with their long-term strategy. Be objective, slightly ruthless, and highly analytical. Format your response strictly with:
1. Alignment Score (1-10)
2. The Verdict (One sentence)
3. The 'Why' (Brief explanation)
4. Strategic Alternative (If needed)`;

function getClient(): AzureOpenAI {
  const endpoint = import.meta.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = import.meta.env.AZURE_OPENAI_API_KEY;
  const apiVersion = import.meta.env.AZURE_OPENAI_API_VERSION || "2024-10-21";

  if (!endpoint || !apiKey) {
    throw new Error("Missing AZURE_OPENAI_ENDPOINT or AZURE_OPENAI_API_KEY environment variables");
  }

  return new AzureOpenAI({ endpoint, apiKey, apiVersion });
}

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

    const client = getClient();
    const deployment = import.meta.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4o";

    const completion = await client.chat.completions.create({
      model: deployment,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Long-Term Strategy:\n${strategy}\n\nImmediate Action:\n${action}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const result = completion.choices[0]?.message?.content ?? "No response from model.";

    return new Response(JSON.stringify({ result }), {
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
