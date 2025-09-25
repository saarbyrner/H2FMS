// Nutrition prototype types defined via JSDoc for a JS codebase.
// This project is currently JavaScript-only; in a TS setup you would rename to types.ts.
// All data here is MOCK / PROTOTYPE ONLY – no persistence.

/** @typedef {{ kcal:number; carbs_g:number; protein_g:number; fat_g:number }} MacroTargets */

/**
 * @typedef {Object} FuelWindow
 * @property {'pre'|'during'|'post'} phase
 * @property {string} startISO
 * @property {string} endISO
 * @property {number=} cho_g_per_h
 * @property {number=} protein_g
 */

/**
 * @typedef {Object} Meal
 * @property {string} id
 * @property {'Breakfast'|'Lunch'|'Dinner'|'Snack'} name
 * @property {'low'|'medium'|'high'} carb_code
 * @property {MacroTargets} target
 * @property {string[]} items
 */

/**
 * @typedef {Object} DailyNutritionPlan
 * @property {number} soldierId
 * @property {string} dateISO
 * @property {'Low'|'Moderate'|'High'=} readiness
 * @property {'Deficit'|'Balanced'|'Surplus'=} energyForecast
 * @property {MacroTargets} targets
 * @property {number} hydration_l
 * @property {FuelWindow[]} fuelWindows
 * @property {Meal[]} meals
 * @property {boolean=} accepted
 * @property {boolean=} published
 */

// Example helpers (not exhaustive)
export const createEmptyMacroTargets = () => ({ kcal: 0, carbs_g: 0, protein_g: 0, fat_g: 0 });
