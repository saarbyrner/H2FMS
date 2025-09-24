// Calendar helper functions matching the original injuryprofiler.com implementation
import { CALENDAR_EVENT_TYPES, CALENDAR_VIEW_OPTIONS } from './constants';
import { getEventTextStyles } from './styles';

export const getEventContent = (
  currentCalendarView,
  { borderColor, backgroundColor, textColor, timeText, event }
) => {
  const { title: eventTitle, url, extendedProps, id } = event;
  const eventRenderText = `${eventTitle} ${timeText}`;
  const eventTextStyles = getEventTextStyles({
    borderColor,
    backgroundColor,
    textColor,
  });

  const displayCompleteCheckBox = false; // Simplified for prototype

  const displayCheckBox = () => {
    if (extendedProps?.eventCollectionComplete) {
      return '✓'; // Simple checkmark for prototype
    }
    return '☐'; // Simple checkbox outline for prototype
  };

  switch (currentCalendarView) {
    case CALENDAR_VIEW_OPTIONS.dayGridMonth: {
      const nutritionCals = extendedProps?.nutrition?.calories;
      const mealPct = extendedProps?.mealPercentOfDaily;
      return (
        <div style={eventTextStyles[CALENDAR_VIEW_OPTIONS.dayGridMonth]}>
          {displayCompleteCheckBox && displayCheckBox()}
          {eventTitle} {timeText}
          {nutritionCals ? '' : ''}
          {mealPct != null ? ` (${mealPct}%)` : ''}
        </div>
      );
    }
    case CALENDAR_VIEW_OPTIONS.listWeek: {
      const nutritionCals = extendedProps?.nutrition?.calories;
      const mealPct = extendedProps?.mealPercentOfDaily;
      return (
        <div style={eventTextStyles[CALENDAR_VIEW_OPTIONS.listWeek]}>
          {eventTitle} {timeText}
          {nutritionCals ? '' : ''}
          {mealPct != null ? ` (${mealPct}%)` : ''}
        </div>
      );
    }
    default: {
      const { calendarHeader, title, time, ...rest } = eventTextStyles.default;
      return (
        <div style={rest}>
          <div style={calendarHeader}>
            {displayCompleteCheckBox && displayCheckBox()}
            <p style={title}>{eventTitle}</p>
          </div>
          <p style={time}>{timeText}</p>
          {extendedProps?.nutrition?.calories && (
            <p style={time}>{extendedProps.nutrition.calories} kcal</p>
          )}
          {!!id && (
            <p style={time}>{extendedProps?.squad?.name}</p>
          )}
        </div>
      );
    }
  }
};

export const sortEvents = (firstEvent, secondEvent) => {
  const isFirstEventGame = firstEvent.type === CALENDAR_EVENT_TYPES.GAME;
  const isSecondEventGame = secondEvent.type === CALENDAR_EVENT_TYPES.GAME;

  // games should come before other type of events
  // the earliest on top
  if (
    isFirstEventGame &&
    isSecondEventGame &&
    firstEvent.start < secondEvent.start
  ) {
    return -1;
  }
  if (
    isFirstEventGame &&
    isSecondEventGame &&
    firstEvent.start > secondEvent.start
  ) {
    return 1;
  }
  if (isFirstEventGame && !isSecondEventGame) {
    return -1;
  }
  // rest of events are handled in the second parameter of the eventOrder prop
  return 0;
};
