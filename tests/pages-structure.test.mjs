import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const pages = join(root, "src/pages");

// ── global.css ────────────────────────────────────────────────────────────────

test("global.css defines --background dark theme variable", () => {
  const css = readFileSync(join(root, "src/styles/global.css"), "utf8");
  assert.ok(css.includes("--background"), "global.css must define --background CSS variable");
});

test("global.css defines --card dark theme variable", () => {
  const css = readFileSync(join(root, "src/styles/global.css"), "utf8");
  assert.ok(css.includes("--card"), "global.css must define --card CSS variable");
});

test("global.css defines --muted-foreground variable", () => {
  const css = readFileSync(join(root, "src/styles/global.css"), "utf8");
  assert.ok(css.includes("--muted-foreground"), "global.css must define --muted-foreground");
});

// ── Dashboard (index.astro) ───────────────────────────────────────────────────

test("index.astro exists", () => {
  assert.ok(existsSync(join(pages, "index.astro")), "src/pages/index.astro must exist");
});

test("index.astro has a 'Your Goals' section heading", () => {
  const src = readFileSync(join(pages, "index.astro"), "utf8");
  assert.ok(src.includes("Your Goals"), "Dashboard must have a 'Your Goals' section");
});

test("index.astro has 'Action Compatibility Check' quick-check card", () => {
  const src = readFileSync(join(pages, "index.astro"), "utf8");
  assert.ok(
    src.includes("Action Compatibility Check"),
    "Dashboard must include the Action Compatibility Check card"
  );
});

test("index.astro links to /add-goal", () => {
  const src = readFileSync(join(pages, "index.astro"), "utf8");
  assert.ok(src.includes("/add-goal"), "Dashboard must link to /add-goal");
});

test("index.astro links to /check-action", () => {
  const src = readFileSync(join(pages, "index.astro"), "utf8");
  assert.ok(src.includes("/check-action"), "Dashboard must link to /check-action");
});

test("index.astro links to /strategy or /create-strategy", () => {
  const src = readFileSync(join(pages, "index.astro"), "utf8");
  assert.ok(
    src.includes("/strategy") || src.includes("/create-strategy"),
    "Dashboard must link to /strategy or /create-strategy"
  );
});

test("index.astro shows North Star Compass branding", () => {
  const src = readFileSync(join(pages, "index.astro"), "utf8");
  assert.ok(src.includes("North Star Compass"), "Dashboard must show 'North Star Compass' brand name");
});

// ── Add Goal page ─────────────────────────────────────────────────────────────

test("add-goal.astro exists", () => {
  assert.ok(existsSync(join(pages, "add-goal.astro")), "src/pages/add-goal.astro must exist");
});

test("add-goal.astro has a form with a goal title field", () => {
  const src = readFileSync(join(pages, "add-goal.astro"), "utf8");
  assert.ok(src.includes("Goal Title"), "add-goal page must have a 'Goal Title' field");
});

test("add-goal.astro has a description field", () => {
  const src = readFileSync(join(pages, "add-goal.astro"), "utf8");
  assert.ok(src.includes("description") || src.includes("Description"), "add-goal page must have a description field");
});

test("add-goal.astro has a category select field", () => {
  const src = readFileSync(join(pages, "add-goal.astro"), "utf8");
  assert.ok(src.includes("Category") || src.includes("category"), "add-goal page must have a category field");
});

test("add-goal.astro has a deadline field", () => {
  const src = readFileSync(join(pages, "add-goal.astro"), "utf8");
  assert.ok(src.includes("Deadline") || src.includes("deadline"), "add-goal page must have a deadline field");
});

test("add-goal.astro has a back-link to /", () => {
  const src = readFileSync(join(pages, "add-goal.astro"), "utf8");
  assert.ok(src.includes('href="/"'), "add-goal page must have a back-link to /");
});

// ── Check Action page ─────────────────────────────────────────────────────────

test("check-action.astro exists", () => {
  assert.ok(existsSync(join(pages, "check-action.astro")), "src/pages/check-action.astro must exist");
});

test("check-action.astro has an action/decision textarea", () => {
  const src = readFileSync(join(pages, "check-action.astro"), "utf8");
  assert.ok(src.includes("<textarea"), "check-action page must include a textarea");
});

test("check-action.astro has an Analyze button", () => {
  const src = readFileSync(join(pages, "check-action.astro"), "utf8");
  assert.ok(
    src.includes("Analyze") || src.includes("analyze"),
    "check-action page must have an Analyze button"
  );
});

test("check-action.astro has a back-link to /", () => {
  const src = readFileSync(join(pages, "check-action.astro"), "utf8");
  assert.ok(src.includes('href="/"'), "check-action page must have a back-link to /");
});

test("check-action.astro calls the /api/evaluate endpoint", () => {
  const src = readFileSync(join(pages, "check-action.astro"), "utf8");
  assert.ok(src.includes("/api/evaluate"), "check-action page must reference /api/evaluate");
});

// ── Strategy page ─────────────────────────────────────────────────────────────

test("strategy.astro exists", () => {
  assert.ok(existsSync(join(pages, "strategy.astro")), "src/pages/strategy.astro must exist");
});

test("strategy.astro has a Vision section", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(src.includes("Vision"), "strategy page must have a Vision section");
});

test("strategy.astro has a Mission section", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(src.includes("Mission"), "strategy page must have a Mission section");
});

test("strategy.astro has a Core Values section", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(src.includes("Core Values"), "strategy page must have a Core Values section");
});

test("strategy.astro has a Strategic Pillars section", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(src.includes("Strategic Pillars"), "strategy page must have a Strategic Pillars section");
});

test("strategy.astro has a back-link to /", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(src.includes('href="/"'), "strategy page must have a back-link to /");
});

test("strategy.astro does not include a page-level Edit Strategy button", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    !src.includes("Edit Strategy"),
    "strategy page should not include a generic 'Edit Strategy' button"
  );
});

test("strategy.astro includes a choose core values button", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes("Choose Core Values"),
    "strategy page must include a 'Choose Core Values' button"
  );
});

test("strategy.astro indicates max 3 core values can be selected", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes("Select up to 3") || src.includes("Max 3"),
    "strategy page must indicate that at most 3 core values can be selected"
  );
});

test("strategy.astro has a dedicated edit button for selected core values", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes("Edit Core Values"),
    "strategy page must include an 'Edit Core Values' button for selected values"
  );
});

test("strategy.astro selected core values area is hidden before selection", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes('id="selected-core-values"') && src.includes("hidden"),
    "selected core values should be hidden until user has chosen values"
  );
});

// ── Create Strategy page ──────────────────────────────────────────────────────

test("create-strategy.astro exists", () => {
  assert.ok(existsSync(join(pages, "create-strategy.astro")), "src/pages/create-strategy.astro must exist");
});

test("create-strategy.astro has a Vision field", () => {
  const src = readFileSync(join(pages, "create-strategy.astro"), "utf8");
  assert.ok(src.includes("Vision") || src.includes("vision"), "create-strategy page must have a Vision field");
});

test("create-strategy.astro has a Mission field", () => {
  const src = readFileSync(join(pages, "create-strategy.astro"), "utf8");
  assert.ok(src.includes("Mission") || src.includes("mission"), "create-strategy page must have a Mission field");
});

test("create-strategy.astro has Core Values fields", () => {
  const src = readFileSync(join(pages, "create-strategy.astro"), "utf8");
  assert.ok(
    src.includes("Core Values") || src.includes("core-value") || src.includes("coreValues"),
    "create-strategy page must have Core Values fields"
  );
});

test("create-strategy.astro has a back-link to /", () => {
  const src = readFileSync(join(pages, "create-strategy.astro"), "utf8");
  assert.ok(src.includes('href="/"'), "create-strategy page must have a back-link to /");
});
