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

test("add-goal.astro does not have a description field", () => {
  const src = readFileSync(join(pages, "add-goal.astro"), "utf8");
  assert.ok(
    !src.includes("Description") && !src.includes('name="description"'),
    "add-goal page should not have a description field"
  );
});

test("add-goal.astro has a life pillar select field", () => {
  const src = readFileSync(join(pages, "add-goal.astro"), "utf8");
  assert.ok(
    src.includes("Life Pillar") && src.includes('name="lifePillar"'),
    "add-goal page must have a life pillar field to categorize goals"
  );
});

test("add-goal.astro has life pillar info button and popup content", () => {
  const src = readFileSync(join(pages, "add-goal.astro"), "utf8");
  assert.ok(
    src.includes("life-pillars-info-btn") && src.includes("life-pillars-popup"),
    "add-goal page must have an info button that opens life pillar guidance"
  );
  assert.ok(
    src.includes("Core values") || src.includes("core values"),
    "life pillar popup should explain how pillars differ from core values"
  );
  assert.ok(
    !src.includes("Key Areas"),
    "life pillar popup should not contain key areas"
  );
});

test("add-goal.astro includes expanded life pillar options", () => {
  const src = readFileSync(join(pages, "add-goal.astro"), "utf8");
  assert.ok(src.includes("Health"), "add-goal should include Health pillar option");
  assert.ok(src.includes("Career"), "add-goal should include Career pillar option");
  assert.ok(src.includes("Relationships"), "add-goal should include Relationships pillar option");
  assert.ok(src.includes("Finance"), "add-goal should include Finance pillar option");
  assert.ok(src.includes("Personal Growth"), "add-goal should include Personal Growth pillar option");
});

test("add-goal.astro does not have target metric and current value fields", () => {
  const src = readFileSync(join(pages, "add-goal.astro"), "utf8");
  assert.ok(
    !src.includes("Target Metric") && !src.includes("Current Value"),
    "add-goal page should not have target metric or current value fields"
  );
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

test("strategy.astro includes a choose vision button", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes("Choose Vision"),
    "strategy page must include a 'Choose Vision' button"
  );
});

test("strategy.astro includes an edit vision button for later updates", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes("Edit Vision"),
    "strategy page must include an 'Edit Vision' button for later edits"
  );
});

test("strategy.astro vision editor uses the current default vision text", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes('id="vision-input"') && src.includes("Healthy, fulfilled, and free"),
    "vision editor should be initialized with the existing default vision text"
  );
});

test("strategy.astro selected vision area is hidden before choosing vision", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes('id="selected-vision"') && src.includes("hidden"),
    "selected vision should be hidden until user chooses a vision"
  );
});

test("strategy.astro does not include a life pillars section", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(!src.includes("Life Pillars"), "strategy page should not include a Life Pillars section");
});

test("strategy.astro Check Action Alignment card uses border-border matching Core Values style", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  const alignIdx = src.indexOf("<!-- Strategy Alignment");
  const afterAlign = src.slice(alignIdx, alignIdx + 80);
  assert.ok(
    afterAlign.includes("border-border"),
    "Check Action Alignment card should use border-border like Core Values, not border-primary/20"
  );
});

test("strategy.astro Check Action Alignment header uses h3 matching Core Values style", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes('<h3 class="font-semibold">Check Action Alignment</h3>'),
    "Check Action Alignment header should use the same plain h3 font-semibold as Core Values"
  );
});

test("strategy.astro Check Action Alignment has an inline textarea", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes('id="strategy-action"'),
    "strategy page must have an inline textarea with id strategy-action for action input"
  );
});

test("strategy.astro Check Action Alignment has an inline Analyze button", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes('id="strategy-analyze-btn"'),
    "strategy page must have an inline analyze button with id strategy-analyze-btn"
  );
});

test("strategy.astro Check Action Alignment calls /api/evaluate inline", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes("/api/evaluate"),
    "strategy page must call /api/evaluate inline for action compatibility check"
  );
});

test("strategy.astro Vision card uses border-border matching Core Values style", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  const visionIdx = src.indexOf("<!-- Vision -->");
  const afterVision = src.slice(visionIdx, visionIdx + 80);
  assert.ok(
    afterVision.includes("border-border"),
    "Vision card container should use border-border like Core Values, not border-primary/20"
  );
});

test("strategy.astro Vision header matches Core Values plain h3 style", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes('<h3 class="font-semibold">Vision</h3>'),
    "Vision header should use the same plain h3 font-semibold style as Core Values"
  );
});

test("strategy.astro Goals section is wrapped in a card matching Core Values style", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  const goalsIdx = src.indexOf("<!-- Goals -->");
  const afterGoals = src.slice(goalsIdx, goalsIdx + 100);
  assert.ok(
    afterGoals.includes("rounded-xl border border-border bg-card"),
    "Goals section should be wrapped in a card with the same style as Core Values"
  );
});

test("strategy.astro Goals header uses h3 matching Core Values style", () => {
  const src = readFileSync(join(pages, "strategy.astro"), "utf8");
  assert.ok(
    src.includes('<h3 class="font-semibold">Goals</h3>'),
    "Goals header should use the same plain h3 font-semibold style as Core Values"
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
