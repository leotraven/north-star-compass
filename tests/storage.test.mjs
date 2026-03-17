import { test } from "node:test";
import assert from "node:assert/strict";
import {
  loadStrategy,
  saveStrategy,
  loadGoals,
  saveGoals,
  addGoal,
  STRATEGY_KEY,
  GOALS_KEY,
} from "../src/lib/storage.mjs";

function createStore() {
  const data = new Map();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: (key) => data.delete(key),
    clear: () => data.clear(),
  };
}

// ── loadStrategy ──────────────────────────────────────────────────────────────

test("loadStrategy returns null when nothing is stored", () => {
  const store = createStore();
  assert.strictEqual(loadStrategy(store), null);
});

test("loadStrategy returns the saved strategy object", () => {
  const store = createStore();
  const strategy = { vision: "Live fully", coreValues: ["Integrity", "Growth"] };
  saveStrategy(strategy, store);
  assert.deepEqual(loadStrategy(store), strategy);
});

test("loadStrategy returns null for corrupt JSON", () => {
  const store = createStore();
  store.setItem(STRATEGY_KEY, "not-json{{{");
  assert.strictEqual(loadStrategy(store), null);
});

// ── saveStrategy ──────────────────────────────────────────────────────────────

test("saveStrategy stores data under STRATEGY_KEY", () => {
  const store = createStore();
  saveStrategy({ vision: "Test vision", coreValues: [] }, store);
  const raw = store.getItem(STRATEGY_KEY);
  assert.ok(raw !== null, "STRATEGY_KEY must be set after saveStrategy");
  assert.ok(raw.includes("Test vision"), "saved JSON must include the vision");
});

test("saveStrategy overwrites a previous save", () => {
  const store = createStore();
  saveStrategy({ vision: "Old vision", coreValues: [] }, store);
  saveStrategy({ vision: "New vision", coreValues: ["Courage"] }, store);
  assert.strictEqual(loadStrategy(store).vision, "New vision");
});

// ── loadGoals ─────────────────────────────────────────────────────────────────

test("loadGoals returns empty array when nothing is stored", () => {
  const store = createStore();
  assert.deepEqual(loadGoals(store), []);
});

test("loadGoals returns the saved goals array", () => {
  const store = createStore();
  const goals = [{ id: "1", title: "Run a marathon", lifePillar: "Health", deadline: "2026-12-31" }];
  saveGoals(goals, store);
  assert.deepEqual(loadGoals(store), goals);
});

test("loadGoals returns empty array for corrupt JSON", () => {
  const store = createStore();
  store.setItem(GOALS_KEY, "bad[json");
  assert.deepEqual(loadGoals(store), []);
});

// ── saveGoals ─────────────────────────────────────────────────────────────────

test("saveGoals stores data under GOALS_KEY", () => {
  const store = createStore();
  saveGoals([{ id: "1", title: "Goal one", lifePillar: "Career", deadline: "2026-01-01" }], store);
  const raw = store.getItem(GOALS_KEY);
  assert.ok(raw !== null, "GOALS_KEY must be set after saveGoals");
  assert.ok(raw.includes("Goal one"), "saved JSON must include the goal title");
});

test("saveGoals overwrites existing goals", () => {
  const store = createStore();
  saveGoals([{ id: "1", title: "Old goal", lifePillar: "Health", deadline: "2026-01-01" }], store);
  saveGoals([{ id: "2", title: "New goal", lifePillar: "Career", deadline: "2026-06-01" }], store);
  const goals = loadGoals(store);
  assert.strictEqual(goals.length, 1);
  assert.strictEqual(goals[0].title, "New goal");
});

// ── addGoal ───────────────────────────────────────────────────────────────────

test("addGoal adds a goal to an empty list", () => {
  const store = createStore();
  addGoal({ title: "Learn piano", lifePillar: "Personal Growth", deadline: "2026-06-01" }, store);
  const goals = loadGoals(store);
  assert.strictEqual(goals.length, 1);
  assert.strictEqual(goals[0].title, "Learn piano");
  assert.strictEqual(typeof goals[0].id, "string", "added goal must have a string id");
});

test("addGoal appends to existing goals without overwriting", () => {
  const store = createStore();
  addGoal({ title: "First goal", lifePillar: "Health", deadline: "2026-01-01" }, store);
  addGoal({ title: "Second goal", lifePillar: "Career", deadline: "2026-06-01" }, store);
  const goals = loadGoals(store);
  assert.strictEqual(goals.length, 2);
  assert.strictEqual(goals[0].title, "First goal");
  assert.strictEqual(goals[1].title, "Second goal");
});

test("addGoal assigns unique ids to each goal", () => {
  const store = createStore();
  addGoal({ title: "Goal A", lifePillar: "Health", deadline: "2026-01-01" }, store);
  addGoal({ title: "Goal B", lifePillar: "Health", deadline: "2026-02-01" }, store);
  const [a, b] = loadGoals(store);
  assert.notStrictEqual(a.id, b.id, "each goal must have a unique id");
});
