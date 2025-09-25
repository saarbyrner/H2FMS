// Mock API layer for Nutrition prototype (NO real backend calls)
// Provides in-memory generation + publication of daily nutrition plans.

// Lightweight id generator (avoids extra dependency for prototype)
const uuid = () => 'id-' + Math.random().toString(36).slice(2,11) + Date.now().toString(36);

// In-memory stores (clears on refresh)
const generatedPlans = new Map(); // key: soldierId|dateISO -> plan
const publishedPlans = new Map(); // same key
const publishedNutritionEvents = []; // calendar events created on publish

// Utility to format date & times
const setTime = (dateISO, time) => new Date(`${dateISO}T${time}:00.000Z`).toISOString();

// Hard coded macro baseline for demo
const BASE_MACROS = { kcal: 3200, carbs_g: 480, protein_g: 160, fat_g: 90 };

// Dummy soldier readiness mapping
const readinessCycle = ['High', 'Moderate', 'Low'];

/** Generate a deterministic but slightly varied plan */
export async function generatePlan({ soldierIds = [9], dateISO = new Date().toISOString().split('T')[0], goal = 'Performance', sport = 'Field Sport' } = {}) {
  const plans = soldierIds.map((soldierId, idx) => {
    const readiness = readinessCycle[idx % readinessCycle.length];
    const energyForecast = ['Balanced', 'Deficit', 'Surplus'][idx % 3];
    const factor = 1 + (goal === 'Energy Deficit' ? -0.1 : goal === 'Mass Gain' ? 0.1 : 0);
    const targets = {
      kcal: Math.round(BASE_MACROS.kcal * factor),
      carbs_g: Math.round(BASE_MACROS.carbs_g * factor),
      protein_g: Math.round(BASE_MACROS.protein_g * factor),
      fat_g: Math.round(BASE_MACROS.fat_g * factor)
    };
    const meals = [
      { name: 'Breakfast', carb_code: 'medium', time: '08:00' },
      { name: 'Snack', carb_code: 'low', time: '10:30' },
      { name: 'Lunch', carb_code: 'high', time: '13:00' },
      { name: 'Snack', carb_code: 'medium', time: '15:30' },
      { name: 'Dinner', carb_code: 'high', time: '19:00' }
    ].map((m, i) => ({
      id: uuid(),
      name: m.name,
      carb_code: m.carb_code,
      target: {
        kcal: Math.round(targets.kcal / 5 + (i === 2 ? 120 : 0)),
        carbs_g: Math.round(targets.carbs_g / 5 + (m.carb_code === 'high' ? 30 : 0)),
        protein_g: Math.round(targets.protein_g / 5),
        fat_g: Math.round(targets.fat_g / 5)
      },
      items: [
        `${m.name} Item A`,
        `${m.name} Item B`,
        m.name === 'Dinner' ? 'Extra Recovery Shake' : 'Fruit Portion'
      ],
      time: m.time
    }));
    const plan = {
      soldierId,
      dateISO,
      readiness,
      energyForecast,
      targets,
      hydration_l: 4,
      fuelWindows: [
        { phase: 'pre', startISO: setTime(dateISO, '06:30'), endISO: setTime(dateISO, '07:30'), cho_g_per_h: 60 },
        { phase: 'during', startISO: setTime(dateISO, '14:00'), endISO: setTime(dateISO, '15:30'), cho_g_per_h: 45 },
        { phase: 'post', startISO: setTime(dateISO, '15:30'), endISO: setTime(dateISO, '17:00'), protein_g: 25 }
      ],
      meals,
      accepted: false,
      published: false,
      goal,
      sport
    };
    generatedPlans.set(`${soldierId}|${dateISO}`, plan);
    return plan;
  });
  return plans;
}

export async function regeneratePlan(key, adjustPct = 0) {
  const existing = generatedPlans.get(key);
  if (!existing) return null;
  if (adjustPct) {
    const factor = 1 + adjustPct / 100;
    existing.targets = Object.fromEntries(Object.entries(existing.targets).map(([k,v]) => [k, Math.round(v * factor)]));
    existing.meals = existing.meals.map(meal => ({
      ...meal,
      target: Object.fromEntries(Object.entries(meal.target).map(([k,v]) => [k, Math.round(v * factor)]))
    }));
  }
  existing.accepted = false;
  existing.published = false;
  return existing;
}

export async function acceptPlan(key) {
  const plan = generatedPlans.get(key);
  if (plan) plan.accepted = true;
  return plan;
}

export async function publishPlan(key) {
  const plan = generatedPlans.get(key);
  if (!plan) return null;
  plan.published = true;
  publishedPlans.set(key, plan);

  // Create calendar meal events (very simplified)
  plan.meals.forEach(meal => {
    const start = setTime(plan.dateISO, meal.time || '08:00');
    const end = new Date(new Date(start).getTime() + 45*60000).toISOString();
    publishedNutritionEvents.push({
      id: `nut-${plan.soldierId}-${meal.name}-${plan.dateISO}`,
      title: `${meal.name}`,
      start,
      end,
      backgroundColor: '#1bbc9c',
      borderColor: '#15a086',
      textColor: '#ffffff',
      extendedProps: {
        calendarCategory: 'Nutrition',
        soldierId: plan.soldierId,
        mealPercentOfDaily: Math.round((meal.target.kcal / plan.targets.kcal) * 100)
      }
    });
  });

  return plan;
}

export function getGeneratedPlan(key) { return generatedPlans.get(key); }
export function getPublishedNutritionEvents() { return [...publishedNutritionEvents]; }
