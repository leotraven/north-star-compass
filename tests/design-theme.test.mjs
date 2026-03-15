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
