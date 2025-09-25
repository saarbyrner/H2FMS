// Utility to convert nutrition week schedule into calendar events for an athlete.
// Each meal/activity/note becomes an event with specific coloring.
// We assume the provided nutrition.json week dates align with a known week reference year.
// For prototype we map day names (monday..sunday) to the ISO week starting 2025-01-27 (Mon 27 -> 2025-01-27 etc.)
// You can adjust baseDate if needed.

const DAY_OFFSETS = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};

// Colors for different nutrition related event types
const COLORS = {
  meal: { bg: '#1bbc9c', border: '#15a086', text: '#ffffff' },
  activity: { bg: '#3a8dee', border: '#0e478a', text: '#ffffff' },
  note: { bg: '#9b58b5', border: '#8f44ad', text: '#ffffff' },
};

// Short codes for meal titles
const MEAL_CODES = {
  'Breakfast': 'BF',
  'Breakfast Option 2': 'BF2',
  'AM Snack': 'AMS',
  'AM Snack Option 2': 'AMS2',
  'Lunch': 'LU',
  'Lunch Option 2': 'LU2',
  'PM Snack': 'PMS',
  'PM Snack Option 2': 'PMS2',
  'Pre Workout': 'PRE',
  'Post Workout Meal': 'POST',
  'Recovery': 'REC',
  'Dinner': 'DN',
  'Pre Bed Snack': 'PBS',
  'Post-Swim Snack': 'PSS',
};

// Helper to build ISO datetime
const buildDateTime = (baseMondayDate, dayKey, time) => {
  const date = new Date(baseMondayDate);
  date.setDate(date.getDate() + DAY_OFFSETS[dayKey]);
  if (time) {
    const [hh, mm] = time.split(':');
    date.setHours(parseInt(hh, 10), parseInt(mm, 10), 0, 0);
  }
  return date.toISOString();
};

// Derive end time for meals (default 15 mins) and activities (use provided endTime or +60m) and notes 5 mins
const deriveEnd = (startISO, item) => {
  const start = new Date(startISO);
  const end = new Date(start);
  if (item.type === 'activity') {
    if (item.endTime) {
      const [eh, em] = item.endTime.split(':');
      end.setHours(parseInt(eh, 10), parseInt(em, 10), 0, 0);
    } else {
      end.setMinutes(end.getMinutes() + 60);
    }
  } else if (item.type === 'meal') {
    end.setMinutes(end.getMinutes() + 15);
  } else {
    end.setMinutes(end.getMinutes() + 5);
  }
  return end.toISOString();
};

export const nutritionWeekToEvents = (nutritionData, options = {}) => {
  if (!nutritionData || !nutritionData.week) return [];
  const { athleteId = 9, baseMonday = '2025-01-27', weeks = 1 } = options; // weeks = how many sequential weeks to clone forward
  const baseMondayDate = new Date(`${baseMonday}T00:00:00Z`);

  const events = [];
  for (let w = 0; w < weeks; w++) {
    const weekOffsetDays = w * 7;
    Object.entries(nutritionData.week).forEach(([dayKey, dayData]) => {
      if (!DAY_OFFSETS.hasOwnProperty(dayKey)) return;

      const dailySummary = dayData.summary || {};
      const schedule = dayData.schedule || [];

      schedule.forEach((item, idx) => {
        const time = item.time || item.startTime || '08:00';
        // clone baseMondayDate and add week + day offset
        const date = new Date(baseMondayDate);
        date.setDate(date.getDate() + weekOffsetDays + DAY_OFFSETS[dayKey]);
        if (time) {
          const [hh, mm] = time.split(':');
          date.setHours(parseInt(hh, 10), parseInt(mm, 10), 0, 0);
        }
        const start = date.toISOString();
        const end = deriveEnd(start, item);
        const color = COLORS[item.type] || COLORS.note;

        const id = `ath-${athleteId}-nutri-w${w}-${dayKey}-${idx}`;
        const titleBase = item.title;
        let title = titleBase;
        if (item.type === 'meal' && item.nutrition) {
          const code = MEAL_CODES[titleBase] || titleBase.split(' ').map(w => w[0]).join('').toUpperCase();
          title = `${code} ${item.nutrition.calories}kcal`;
        }
        if (item.type === 'activity') {
          title = item.title; // keep as is
        }

        // Estimate percent of daily calories this meal represents if daily target known
        let mealPercentOfDaily = null;
        if (item.type === 'meal' && item.nutrition && dayData?.summary?.calories?.target) {
          mealPercentOfDaily = Math.round((item.nutrition.calories / dayData.summary.calories.target) * 100);
        }
        events.push({
          id,
          title,
          start,
          end,
          backgroundColor: color.bg,
          borderColor: color.border,
          textColor: color.text,
          extendedProps: {
            eventType: item.type === 'activity' ? 'TRAINING_SESSION' : 'NUTRITION',
            calendarCategory: 'Nutrition',
            squad: 'Company 1.2',
            athleteId,
            day: dayKey,
            weekIndex: w,
            originalTitle: titleBase,
            nutrition: item.nutrition || null,
            activity: item.type === 'activity' ? item.details || {} : null,
            note: item.type === 'note' ? item.details?.notes : null,
            fueling: item.details?.fueling || null,
            details: item.details || null,
            summary: dailySummary,
            mealPercentOfDaily,
            location: 'Nutrition',
            attendees: ['Sarah Brown'],
          },
        });
      });
    });
  }

  return events;
};

export default nutritionWeekToEvents;
