import { test } from "node:test";
import assert from "node:assert/strict";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

const apiKey = process.env.OPENROUTER_API_KEY;
const configuredModel = process.env.OPENROUTER_MODEL || "openai/gpt-4o";

// Use a pinned free model for the round-trip test so it doesn't depend on
// the user's OPENROUTER_MODEL being correct.
const TEST_MODEL = "openrouter/free";

test("OPENROUTER_API_KEY is set", () => {
  assert.ok(apiKey, "OPENROUTER_API_KEY must be defined in .env");
});

test("OpenRouter API key is accepted (models endpoint)", async () => {
  const res = await fetch("https://openrouter.ai/api/v1/models", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  assert.equal(res.status, 200, `Expected 200 but got ${res.status}`);
  const json = await res.json();
  assert.ok(Array.isArray(json.data) && json.data.length > 0, "Expected a non-empty models list");
});

test("OPENROUTER_MODEL exists in available models", async () => {
  const res = await fetch("https://openrouter.ai/api/v1/models", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  const json = await res.json();
  const ids = json.data.map((m) => m.id);
  assert.ok(
    ids.includes(configuredModel),
    `Model "${configuredModel}" not found in OpenRouter's model list. Check your OPENROUTER_MODEL value.`,
  );
});

test("generateText round-trip (connection smoke test)", async () => {
  const openrouter = createOpenRouter({ apiKey });

  const { text } = await generateText({
    model: openrouter(TEST_MODEL),
    prompt: 'Reply with the single word "ok".',
    maxTokens: 10,
  });

  assert.ok(typeof text === "string" && text.trim().length > 0, "Expected a non-empty text response");
});
