import type { APIRoute } from "astro";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const DEBUG = import.meta.env.LOG_LEVEL === "debug";
const log = (...args: unknown[]) => { if (DEBUG) console.log("[evaluate]", ...args); };

const LEGACY_SYSTEM_PROMPT = `You are an expert strategic advisor. Evaluate whether the user's immediate action aligns with their long-term strategy. Be objective, slightly ruthless, and highly analytical. Format your response strictly as:

**Alignment Score:** <number 1-10>
**Verdict:** <one sentence>
**Why:** <brief explanation>
**Strategic Alternative:** <concrete alternative if needed>

Use exactly these labels with the ** markdown bold syntax. No numbered lists, no other formatting.`;

const STRUCTURED_SYSTEM_PROMPT =
  "You are a strategic alignment advisor. Evaluate whether the given action aligns with the user's personal strategy. Be objective and concise.";

const ALIGNMENT_SCHEMA = {
  type: "object",
  properties: {
    vision: {
      type: "object",
      description: "How well the action aligns with the stated vision",
      properties: {
        score: { type: "number", description: "Alignment score from 1 to 10" },
        explanation: { type: "string", description: "One concise sentence explaining the score" },
      },
      required: ["score", "explanation"],
      additionalProperties: false,
    },
    coreValues: {
      type: "object",
      description: "How well the action aligns with the core values",
      properties: {
        score: { type: "number", description: "Alignment score from 1 to 10" },
        explanation: { type: "string", description: "One concise sentence explaining the score" },
      },
      required: ["score", "explanation"],
      additionalProperties: false,
    },
    goals: {
      type: "array",
      description: "Per-goal alignment scores",
      items: {
        type: "object",
        properties: {
          title: { type: "string", description: "The goal title" },
          score: { type: "number", description: "Alignment score from 1 to 10" },
          explanation: { type: "string", description: "One concise sentence explaining the score" },
        },
        required: ["title", "score", "explanation"],
        additionalProperties: false,
      },
    },
  },
  required: ["vision", "coreValues", "goals"],
  additionalProperties: false,
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { strategy, vision, coreValues, goals, action } = body;
    log("request received", { action: action?.slice(0, 40) });

    const isStructured = vision !== undefined || coreValues !== undefined || goals !== undefined;

    if (isStructured) {
      if (!action) {
        return new Response(JSON.stringify({ error: "action is required." }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const apiKey = import.meta.env.OPENROUTER_API_KEY;
      if (!apiKey) throw new Error("Missing OPENROUTER_API_KEY environment variable");

      const model = import.meta.env.OPENROUTER_MODEL || "openai/gpt-4o";
      log("using model (structured)", model);

      const visionText = vision || "Not set";
      const coreValuesText = Array.isArray(coreValues) && coreValues.length
        ? coreValues.join(", ")
        : "None specified";
      const goalsText = Array.isArray(goals) && goals.length
        ? goals.map((g: { title: string }) => `- ${g.title}`).join("\n")
        : "None specified";

      const userContent = `Vision: ${visionText}\nCore Values: ${coreValuesText}\nGoals:\n${goalsText}\n\nAction to evaluate: ${action}`;

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: STRUCTURED_SYSTEM_PROMPT },
            { role: "user", content: userContent },
          ],
          temperature: 0.2,
          max_tokens: 768,
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "alignment_result",
              strict: true,
              schema: ALIGNMENT_SCHEMA,
            },
          },
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        log("OpenRouter error", errBody);
        throw new Error((errBody as any)?.error?.message ?? `OpenRouter HTTP ${res.status}`);
      }

      const completion = await res.json() as {
        choices: Array<{ message: { content: string } }>;
      };
      const content = completion.choices[0]?.message?.content ?? "";

      let parsed: unknown;
      try {
        parsed = JSON.parse(content);
      } catch {
        log("JSON parse failure, raw:", content);
        return new Response(JSON.stringify({ error: "Model returned invalid JSON.", raw: content }), {
          status: 502,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify(parsed), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Legacy format: { strategy, action }
    if (!strategy || !action) {
      return new Response(JSON.stringify({ error: "Both strategy and action are required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = import.meta.env.OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("Missing OPENROUTER_API_KEY environment variable");

    const openrouter = createOpenRouter({ apiKey });
    const model = import.meta.env.OPENROUTER_MODEL || "openai/gpt-4o";
    log("using model (legacy)", model);

    const { text, usage } = await generateText({
      model: openrouter(model),
      system: LEGACY_SYSTEM_PROMPT,
      prompt: `Long-Term Strategy:\n${strategy}\n\nImmediate Action:\n${action}`,
      temperature: 0.7,
      maxTokens: 512,
    });

    log("response received (legacy)", { length: text.length, usage });

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
