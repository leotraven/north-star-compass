export const STRATEGY_KEY = "north-star-strategy";
export const GOALS_KEY = "north-star-goals";

/**
 * @param {Storage} [store]
 * @returns {{ vision: string, coreValues: string[] } | null}
 */
export function loadStrategy(store = localStorage) {
  const raw = store.getItem(STRATEGY_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * @param {{ vision: string, coreValues: string[] }} data
 * @param {Storage} [store]
 */
export function saveStrategy(data, store = localStorage) {
  store.setItem(STRATEGY_KEY, JSON.stringify(data));
}

/**
 * @param {Storage} [store]
 * @returns {Array<{ id: string, title: string, lifePillar: string, deadline: string }>}
 */
export function loadGoals(store = localStorage) {
  const raw = store.getItem(GOALS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * @param {Array<{ id: string, title: string, lifePillar: string, deadline: string }>} goals
 * @param {Storage} [store]
 */
export function saveGoals(goals, store = localStorage) {
  store.setItem(GOALS_KEY, JSON.stringify(goals));
}

/**
 * @param {{ title: string, lifePillar: string, deadline: string }} goal
 * @param {Storage} [store]
 */
export function addGoal(goal, store = localStorage) {
  const goals = loadGoals(store);
  goals.push({ ...goal, id: crypto.randomUUID() });
  saveGoals(goals, store);
}
