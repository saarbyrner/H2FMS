import React, { useState, useRef, forwardRef, useEffect } from 'react';
import FullCalendarComponent from './FullCalendarComponent';
import { calendarStyles } from './styles';

const Calendar = forwardRef(({
  handleEventClick,
  onViewChange,
  selectedCalendarView,
  events = [],
  orgTimeZone = 'UTC',
  userLocale = 'en',
  initialDate,
  ...restProps
}, ref) => {
  const [currentCalendarView, setCurrentCalendarView] = useState(
    selectedCalendarView || 'dayGridMonth'
  );
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(false);
  const forwardedRef = ref || useRef(null);

  const handleViewChange = (viewInfo) => {
    setCurrentCalendarView(viewInfo.view.type);
    if (onViewChange) {
      onViewChange(viewInfo);
    }
  };

  // Sync external selectedCalendarView changes (e.g. header Month/Week toggle)
  useEffect(() => {
    if (!selectedCalendarView) return;
    if (selectedCalendarView === currentCalendarView) return;
    const api = forwardedRef?.current?.getApi?.();
    try {
      if (api) {
        api.changeView(selectedCalendarView);
        setCurrentCalendarView(selectedCalendarView);
      }
    } catch (e) {
      console.warn('Failed to change calendar view', selectedCalendarView, e);
    }
  }, [selectedCalendarView, currentCalendarView, forwardedRef]);

  const handleEventClickInternal = (eventObj) => {
    // Prefer FullCalendar event object shape
    const ev = eventObj?.event;
    try {
      const ext = ev?.extendedProps || {};
      const category = ext.calendarCategory;
      // When a Nutrition event is clicked, deep-link to Athlete Nutrition Daily Plan
      if (category === 'Nutrition') {
        const athleteId = ext.athleteId || ext.playerId || ext.userId;
        // Derive ISO date (YYYY-MM-DD) from event start
        const startISO = ev?.startStr || ev?.start?.toISOString?.() || '';
        const dateISO = startISO ? startISO.slice(0, 10) : '';
        if (athleteId && dateISO) {
          // Use location navigation to avoid requiring react-router here
          const target = `/soldiers/${athleteId}/nutrition?date=${dateISO}`;
          try {
            window.history.pushState({}, '', target);
            // Dispatch a popstate event so routers listening to history changes can react
            window.dispatchEvent(new PopStateEvent('popstate'));
          } catch (e) {
            // Fallback: hard navigation
            window.location.href = target;
          }
          return; // Stop propagation to external handler for Nutrition events
        }
      }
    } catch (e) {
      // Non-fatal: continue to external handler
      // console.debug('Nutrition deep-link handling failed', e);
    }

    if (handleEventClick) {
      handleEventClick(eventObj);
    }
  };

  const setCalendarLoading = (isLoading) => {
    // Handle loading state if needed
    console.log('Calendar loading:', isLoading);
  };

  const onDatesRender = (datesRenderInfo) => {
    // Handle date range changes if needed
    console.log('Dates rendered:', datesRenderInfo);
  };

  // ResizeObserver to keep FullCalendar column widths in sync when layout changes
  const containerRef = useRef(null);

  useEffect(() => {
    if (!forwardedRef?.current) return;
    const calendarApi = forwardedRef.current.getApi?.();
    if (!calendarApi) return;

    // Debounce with rAF to prevent rapid consecutive calls
    let frameId = null;
    const handleResize = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        try {
          calendarApi.updateSize();
        } catch (e) {
          // Silent fail – updateSize can throw if calendar unmounted mid-cycle
          // console.debug('FullCalendar resize skipped', e);
        }
      });
    };

    // Prefer ResizeObserver for container width changes (e.g., nav collapse)
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);

    // Fallback: also listen to window resize
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [forwardedRef]);

  return (
    <div ref={containerRef} style={calendarStyles.pageContainer}>
      <div style={calendarStyles.calendarWrapper}>
        <FullCalendarComponent
          onViewDidMount={handleViewChange}
          forwardedRef={forwardedRef}
          handleEventClick={handleEventClickInternal}
          currentCalendarView={currentCalendarView}
          events={events}
          orgTimeZone={orgTimeZone}
          userLocale={userLocale}
          setCalendarLoading={setCalendarLoading}
          onDatesRender={onDatesRender}
          initialDate={initialDate}
          allDaySlot={restProps.allDaySlot}
          {...restProps}
        />
      </div>
    </div>
  );
});

export default Calendar;
