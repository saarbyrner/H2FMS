# InjuryProfiler Calendar Prototype

A pixel-perfect replica of the injuryprofiler.com/calendar interface built with React and FullCalendar, using mock data from the Design Prototyping Kit.

## Overview

This project recreates the exact look, feel, and functionality of the original injuryprofiler.com calendar interface. It includes:

- **Pixel-perfect UI matching** the original design system
- **FullCalendar integration** with custom styling
- **Mock data integration** from training sessions and games
- **Event categorization** (Training Sessions, Games, Meetings, etc.)
- **Multiple view modes** (Month, Week, Day, List)
- **Interactive event handling** with click events

## Features

### Calendar Views
- **Month View**: Grid layout showing all events for the month
- **Week View**: Detailed weekly schedule with time slots
- **Day View**: Single day detailed view
- **List View**: Chronological list of events

### Event Types
- **Training Sessions**: Strength training, cardio, technical skills, recovery sessions
- **Games/Matches**: League games, cup matches, friendly matches
- **Meetings**: Team meetings, coaching sessions
- **Custom Events**: Any other scheduled activities

### Event Details
Each event includes:
- **Time and duration**
- **Location and venue**
- **Coach/Staff information**
- **Squad/Team details**
- **Attendance tracking**
- **Session notes and objectives**
- **Weather and surface conditions**

## Technical Stack

- **React 18** - Frontend framework
- **FullCalendar 6** - Calendar component library
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling for pixel-perfect match
- **JSON** - Mock data from Design Prototyping Kit

## Project Structure

```
src/
├── components/
│   └── Calendar/
│       ├── constants.js          # Calendar constants and enums
│       ├── styles.js            # Styling configuration
│       ├── helpers.js           # Event rendering helpers
│       ├── FullCalendarComponent.jsx  # Main calendar component
│       └── index.jsx            # Calendar wrapper component
├── pages/
│   └── Calendar/
│       └── index.jsx            # Calendar page component
├── utils/
│   └── calendarDataTransform.js # Data transformation utilities
├── data/                        # Mock data files
│   ├── training_sessions.json
│   ├── games_matches.json
│   └── ...
└── styles/
    └── calendar.css            # Custom calendar styling
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd injuryprofiler-calendar-prototype
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173/planning` to view the calendar

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run lint:css` - Run Stylelint
- `npm run lint:css:fix` - Fix Stylelint errors

## Usage

### Navigation
- Use the navigation buttons (Previous/Next) to change months
- Click "Today" to return to current date
- Switch between views using the view buttons (Month/Week/Day/List)

### Events
- **Click events** to view details in browser console
- **Training sessions** appear in blue
- **Games/Matches** appear in red
- **Other events** use color-coded system

### Data
The calendar uses mock data from:
- `src/data/training_sessions.json` - Training session data
- `src/data/games_matches.json` - Game and match data

## Customization

### Adding New Event Types
1. Update `CALENDAR_EVENT_TYPES` in `src/components/Calendar/constants.js`
2. Add color scheme in `src/utils/calendarDataTransform.js`
3. Create transformation function for new event type

### Styling
- Main styles: `src/styles/calendar.css`
- Component styles: `src/components/Calendar/styles.js`
- Colors: `src/components/Calendar/constants.js`

### Data Format
Events follow FullCalendar format with extended properties:
```javascript
{
  id: "unique-id",
  title: "Event Title",
  start: "2024-01-15T10:00:00Z",
  end: "2024-01-15T11:30:00Z",
  backgroundColor: "#3a8dee",
  borderColor: "#0e478a",
  textColor: "#ffffff",
  extendedProps: {
    type: "TRAINING_SESSION",
    squad: { id: 1, name: "First Team" },
    location: "Training Field 1",
    coach: "John Smith",
    // ... other properties
  }
}
```

## Design System

The calendar uses the exact color palette and styling from the original Kitman design system:

### Colors
- **Primary Blue**: #3a8dee
- **Primary Dark Blue**: #0e478a
- **Accent Blue**: #082e5a
- **Text Dark**: #3f4448
- **Background**: #ffffff
- **Border**: #e8eaed

### Typography
- **Headers**: 500 weight, #3f4448 color
- **Event Text**: 600 weight, white color
- **Time Text**: 400 weight, 11px size

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes maintaining pixel-perfect accuracy
4. Test across different browsers
5. Submit a pull request

## License

This project is for prototyping purposes and maintains the same licensing as the original Design Prototyping Kit.

## Notes

- This is a prototype using mock data
- No backend integration is included
- Event clicks log to console for demonstration
- All styling matches the original injuryprofiler.com calendar exactly

## Filtros del Calendario (Nuevo)

Se ha implementado un sidebar de filtros funcional que permite filtrar los eventos mostrados en el calendario por:

- Squads (equipos / grupos)
- Types (tipo de evento: TRAINING_SESSION, TEST_SESSION, etc.)
- Locations (ubicación del evento)

El sistema deriva automáticamente las opciones disponibles a partir de los eventos cargados (`calendar_events.json`). Todas las opciones empiezan seleccionadas para no ocultar información de inicio.

### Arquitectura de Filtrado

1. El estado fuente de la verdad de eventos está en `CalendarPage` (`allEvents`).
2. El estado de filtros seleccionados también vive en `CalendarPage` (`filters`).
3. `FiltersSidebar` recibe:
   - `availableOptions`: opciones derivadas (memo) de todos los eventos.
   - `selectedFilters`: el estado actual.
   - `onFiltersChange`: callback que actualiza el estado en el contenedor.
4. Cada cambio recalcula la lista filtrada (`events`) que se pasa al componente `Calendar`.

### Extender Filtros

Para añadir un nuevo filtro (por ejemplo, coach):

1. Derivar opciones en el memo `availableOptions` (añadir `coaches: new Set()` y poblarlo).
2. Incluir `coaches: []` en el estado `filters` inicial y en la inicialización.
3. Añadir lógica de inicialización en el `useEffect` que copia todas las opciones al cargar.
4. Extender el `useEffect` de filtrado para aplicar la nueva condición.
5. Añadir una nueva `FilterSection` en `FiltersSidebar` siguiendo el patrón de Squads / Types.

### Próximas Mejoras Sugeridas

- Persistir selección de filtros en `localStorage` o query params.
- Añadir contador global por categoría directo en el header (ya soportado con lengths).
- Filtro de rango de fechas independiente (pre-filtrando eventos antes de pasar a FullCalendar).
- Búsqueda global de eventos (por título / coach / ubicación).
- Soporte para multi-select de atletas y staff cuando se disponga de datos reales.
- Accesibilidad: mejorar navegación por teclado y roles ARIA en el sidebar.

---