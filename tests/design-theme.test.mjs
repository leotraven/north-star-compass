import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

test("global.css defines electric blue as primary color (#06b6d4)", () => {
  const css = readFileSync(join(root, "src/styles/global.css"), "utf8");
  assert.ok(
    css.includes("#06b6d4"),
    "global.css should define electric blue (#06b6d4) as --color-primary"
  );
});

test("global.css uses primary color in background gradient (not orange)", () => {
  const css = readFileSync(join(root, "src/styles/global.css"), "utf8");
  assert.ok(
    css.includes("--color-primary"),
    "global.css gradient should reference --color-primary"
  );
  assert.ok(
    !css.includes("--color-orange-600") && !css.includes("orange-600"),
    "global.css gradient should not use orange-600 accent"
  );
});

test("Hero.astro has sticky navigation header", () => {
  const hero = readFileSync(join(root, "src/components/landing/Hero.astro"), "utf8");
  assert.ok(
    hero.includes("sticky") && hero.includes("top-0"),
    "Hero.astro should have a sticky top-0 navigation header"
  );
});

test("Hero.astro navigation header includes compass brand name", () => {
  const hero = readFileSync(join(root, "src/components/landing/Hero.astro"), "utf8");
  // Should appear outside the main h1 tagline, in the nav header context
  assert.ok(
    hero.includes("North Star Compass"),
    "Hero.astro nav header should include 'North Star Compass' branding"
  );
  // Nav header should also have a Compass icon (SVG or reference)
  assert.ok(
    hero.includes("compass") || hero.includes("Compass") || hero.includes("M12"),
    "Hero.astro nav header should include a compass icon"
  );
});

test("Hero.astro primary call-to-action uses primary color not orange", () => {
  const hero = readFileSync(join(root, "src/components/landing/Hero.astro"), "utf8");
  assert.ok(
    hero.includes("bg-primary"),
    "Hero.astro CTA button should use bg-primary (electric blue)"
  );
  assert.ok(
    !hero.includes("bg-orange-500"),
    "Hero.astro CTA button should not use bg-orange-500"
  );
});

test("Compass.astro check button uses primary color not orange", () => {
  const compass = readFileSync(join(root, "src/components/landing/Compass.astro"), "utf8");
  assert.ok(
    compass.includes("bg-primary"),
    "Compass.astro submit button should use bg-primary (electric blue)"
  );
  assert.ok(
    !compass.includes("bg-orange-500"),
    "Compass.astro submit button should not use bg-orange-500"
  );
});

test("Compass.astro inputs use primary color for focus state", () => {
  const compass = readFileSync(join(root, "src/components/landing/Compass.astro"), "utf8");
  assert.ok(
    compass.includes("focus:border-primary"),
    "Compass.astro textareas should use focus:border-primary (electric blue)"
  );
  assert.ok(
    !compass.includes("focus:border-orange-400"),
    "Compass.astro textareas should not use focus:border-orange-400"
  );
});

test("Compass.astro category labels use primary color not orange", () => {
  const compass = readFileSync(join(root, "src/components/landing/Compass.astro"), "utf8");
  assert.ok(
    !compass.includes("text-orange-400"),
    "Compass.astro category labels should not use text-orange-400"
  );
});

test("BaseLayout.astro body does not constrain width so header can span full width", () => {
  const layout = readFileSync(join(root, "src/layouts/BaseLayout.astro"), "utf8");
  assert.ok(
    !layout.includes("max-w-6xl"),
    "BaseLayout body should not have max-w-6xl; sections handle their own widths"
  );
});

// GoalCard personal usage tests
test("GoalCard does not show a progress bar", () => {
  const goalCard = readFileSync(join(root, "new-design/src/app/components/GoalCard.tsx"), "utf8");
  assert.ok(
    !goalCard.includes("<Progress"),
    "GoalCard should not render a <Progress> component"
  );
  assert.ok(
    !goalCard.includes("import { Progress }"),
    "GoalCard should not import Progress"
  );
});

test("GoalCard does not show progress percentage", () => {
  const goalCard = readFileSync(join(root, "new-design/src/app/components/GoalCard.tsx"), "utf8");
  assert.ok(
    !goalCard.includes("goal.progress"),
    "GoalCard should not reference goal.progress"
  );
});

test("GoalCard does not show 'On track' status", () => {
  const goalCard = readFileSync(join(root, "new-design/src/app/components/GoalCard.tsx"), "utf8");
  assert.ok(
    !goalCard.includes("On track"),
    "GoalCard should not display 'On track'"
  );
  assert.ok(
    !goalCard.includes("TrendingUp"),
    "GoalCard should not import TrendingUp (used for 'On track')"
  );
});

test("GoalCard does not show category badge", () => {
  const goalCard = readFileSync(join(root, "new-design/src/app/components/GoalCard.tsx"), "utf8");
  assert.ok(
    !goalCard.includes("goal.category"),
    "GoalCard should not reference goal.category"
  );
});

test("GoalCard Goal interface does not include progress or category fields", () => {
  const goalCard = readFileSync(join(root, "new-design/src/app/components/GoalCard.tsx"), "utf8");
  assert.ok(
    !goalCard.includes("progress:"),
    "GoalCard Goal interface should not have a progress field"
  );
  assert.ok(
    !goalCard.includes("category:"),
    "GoalCard Goal interface should not have a category field"
  );
});

test("Dashboard mock goals do not include progress or category", () => {
  const dashboard = readFileSync(join(root, "new-design/src/app/pages/Dashboard.tsx"), "utf8");
  assert.ok(
    !dashboard.includes("progress:"),
    "Dashboard mock goals should not have a progress field"
  );
  assert.ok(
    !dashboard.includes("category:"),
    "Dashboard mock goals should not have a category field"
  );
});

// Astro index.astro (running app) GoalCard tests
test("index.astro goal cards do not show progress bars", () => {
  const index = readFileSync(join(root, "src/pages/index.astro"), "utf8");
  assert.ok(
    !index.includes("Progress"),
    "index.astro should not render Progress text in goal cards"
  );
  assert.ok(
    !index.includes("bg-primary rounded-full"),
    "index.astro should not render inline progress bar divs"
  );
});

test("index.astro goal cards do not show 'On track'", () => {
  const index = readFileSync(join(root, "src/pages/index.astro"), "utf8");
  assert.ok(
    !index.includes("On track"),
    "index.astro should not display 'On track'"
  );
});

test("index.astro goal cards do not show category badges", () => {
  const index = readFileSync(join(root, "src/pages/index.astro"), "utf8");
  assert.ok(
    !index.includes("Financial") && !index.includes("Growth") && !index.includes("Operations"),
    "index.astro should not show corporate category badges"
  );
});

test("add-goal.astro does not have a category field", () => {
  const addGoal = readFileSync(join(root, "src/pages/add-goal.astro"), "utf8");
  assert.ok(
    !addGoal.includes("category"),
    "add-goal.astro should not have a category field"
  );
});

// Strategy page structure tests
test("strategy.astro shows Core Values before Vision", () => {
  const strategy = readFileSync(join(root, "src/pages/strategy.astro"), "utf8");
  const coreValuesPos = strategy.indexOf("Core Values");
  const visionPos = strategy.indexOf("Vision");
  assert.ok(coreValuesPos !== -1, "strategy.astro should have a Core Values section");
  assert.ok(visionPos !== -1, "strategy.astro should have a Vision section");
  assert.ok(
    coreValuesPos < visionPos,
    "Core Values should appear before Vision in strategy.astro"
  );
});

test("strategy.astro does not have a Mission section", () => {
  const strategy = readFileSync(join(root, "src/pages/strategy.astro"), "utf8");
  assert.ok(
    !strategy.includes(">Mission<") && !strategy.includes("Mission</"),
    "strategy.astro should not have a Mission heading"
  );
});

test("strategy.astro does not have a Purpose section", () => {
  const strategy = readFileSync(join(root, "src/pages/strategy.astro"), "utf8");
  assert.ok(
    !strategy.includes("Purpose"),
    "strategy.astro should not have a Purpose section"
  );
});

test("strategy.astro life pillars are Health, Career, Relationships", () => {
  const strategy = readFileSync(join(root, "src/pages/strategy.astro"), "utf8");
  assert.ok(strategy.includes("Health"), "strategy.astro should have a Health pillar");
  assert.ok(strategy.includes("Career"), "strategy.astro should have a Career pillar");
  assert.ok(strategy.includes("Relationships"), "strategy.astro should have a Relationships pillar");
});

test("strategy.astro does not have corporate pillar titles", () => {
  const strategy = readFileSync(join(root, "src/pages/strategy.astro"), "utf8");
  assert.ok(!strategy.includes("Revenue Growth"), "strategy.astro should not have Revenue Growth pillar");
  assert.ok(!strategy.includes("Team Excellence"), "strategy.astro should not have Team Excellence pillar");
  assert.ok(!strategy.includes("Product Innovation"), "strategy.astro should not have Product Innovation pillar");
});

test("strategy.astro has a Goals section", () => {
  const strategy = readFileSync(join(root, "src/pages/strategy.astro"), "utf8");
  assert.ok(
    strategy.includes("Goals"),
    "strategy.astro should have a Goals section"
  );
});

test("strategy.astro does not have Focus Areas section", () => {
  const strategy = readFileSync(join(root, "src/pages/strategy.astro"), "utf8");
  assert.ok(
    !strategy.includes("Focus Areas"),
    "strategy.astro should not have a Focus Areas section"
  );
});

// Strategy.tsx (new-design) structural tests
test("Strategy.tsx shows Core Values before Vision", () => {
  const strategy = readFileSync(join(root, "new-design/src/app/pages/Strategy.tsx"), "utf8");
  const coreValuesPos = strategy.indexOf("Core Values");
  const visionPos = strategy.indexOf("Vision");
  assert.ok(
    coreValuesPos < visionPos,
    "Core Values should appear before Vision in Strategy.tsx"
  );
});

test("Strategy.tsx does not have Mission or Purpose", () => {
  const strategy = readFileSync(join(root, "new-design/src/app/pages/Strategy.tsx"), "utf8");
  assert.ok(!strategy.includes("mission"), "Strategy.tsx should not reference mission");
  assert.ok(!strategy.includes("Mission"), "Strategy.tsx should not display Mission");
  assert.ok(!strategy.includes("Purpose"), "Strategy.tsx should not display Purpose");
});

test("Strategy.tsx life pillars are Health, Career, Relationships", () => {
  const strategy = readFileSync(join(root, "new-design/src/app/pages/Strategy.tsx"), "utf8");
  assert.ok(strategy.includes("Health"), "Strategy.tsx should have a Health pillar");
  assert.ok(strategy.includes("Career"), "Strategy.tsx should have a Career pillar");
  assert.ok(strategy.includes("Relationships"), "Strategy.tsx should have a Relationships pillar");
});

test("Strategy.tsx has a Goals section", () => {
  const strategy = readFileSync(join(root, "new-design/src/app/pages/Strategy.tsx"), "utf8");
  assert.ok(strategy.includes("Goals"), "Strategy.tsx should have a Goals section");
});
