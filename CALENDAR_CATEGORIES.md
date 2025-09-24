# Calendar Categories (Sidebar Multi‑Select)

Calendar categories are now managed from the Filters sidebar ("Calendar Categories" accordion) instead of the header. You can multi‑select categories to overlay their events on top of the base calendar dataset.

## Categories
Nutrition · Sleep · Physical · Spiritual · Mental · Medical

## Behavior
* No categories selected → Only the base events from `calendar_events.json` are shown.
* One or more categories selected → Base events PLUS all events whose `extendedProps.calendarCategory` matches any selected category.
* Selecting/Deselecting is immediate; filters (Squads / Types / Location) then apply to the merged set.
* "Select all" / "Clear" actions are available inside the accordion section.

## Data Source
Dummy category events live in: `src/data/calendar_category_events.json`.

Each event follows the existing event schema, adding `extendedProps.calendarCategory` to identify its category. Example:
```json
{
  "id": "nutrition-1",
  "title": "Team Breakfast - High Protein",
  "start": "2025-09-02T07:30:00",
  "end": "2025-09-02T08:15:00",
  "backgroundColor": "#1bbc9c",
  "borderColor": "#15a086",
  "textColor": "#ffffff",
  "extendedProps": {
    "calendarCategory": "Nutrition",
    "eventType": "NUTRITION_SESSION",
    "squad": "International Squad",
    "location": "Dining Hall",
    "details": "Emphasis on lean proteins and complex carbs"
  }
}
```

## Implementation Notes
* State: `selectedCategories` in `src/pages/Calendar/index.jsx`.
* Effect merges base events with any selected category events (overlay model) and then rebuilds filter option sets each change.
* Sidebar component (`FiltersSidebar.jsx`) now accepts `selectedCategories`, `onCategoriesChange` and renders a checkbox list inside its own accordion.
* Header no longer contains category UI (layout simplified accordingly).

## Future Enhancements
1. Persist selections in localStorage/sessionStorage.
2. Per-category color legend or badges next to names (with consistent palette mapping).
3. Toggle to switch between overlay vs replacement mode.
4. Category grouping / search within the accordion (if list grows).
5. Lazy loading or API fetching per category.

## Styling
Colors were chosen from existing palette to minimize new design dependencies:
- Nutrition / Sleep / Physical / Spiritual / Mental / Medical reuse existing semantic colors (greens, blues, purples, reds, oranges) for quick differentiation.

Let me know if you would like any of the future enhancements implemented next.
