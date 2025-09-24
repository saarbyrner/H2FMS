import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box } from '@mui/material';
import FiltersSidebar from '../../components/FiltersSidebar';
import CalendarHeader from '../../components/CalendarHeader';
import Calendar from '../../components/Calendar';
import EventTooltip from '../../components/EventTooltip';
import AddEventSidebar from '../../components/AddEventSidebar';
import calendarEventsData from '../../data/calendar_events.json';
import calendarCategoryEvents from '../../data/calendar_category_events.json';
import athletesData from '../../data/athletes.json';
import staffData from '../../data/users_staff.json';
import nutritionData from '../../data/nutrition.json';
import { nutritionWeekToEvents } from '../../utils/nutritionToEvents';

const CalendarPage = () => {
  // Eventos base (todos) y eventos filtrados
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddEventSidebar, setShowAddEventSidebar] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, event: null, position: { x: 0, y: 0 }, anchorRect: null });
  const [currentDate, setCurrentDate] = useState(new Date('2025-09-01'));
  const [showAllDay, setShowAllDay] = useState(false); // collapsed by default
  const calendarRef = useRef(null);

  // Conteo de filtros activos para el header
  const [activeFilters, setActiveFilters] = useState({
    squads: 0,
    types: 0,
    attendees: 0,
    location: 0,
    games: 0,
  });

  // Estado de filtros seleccionados
  const [filters, setFilters] = useState({
    squads: [],
    types: [],
    locations: [],
  });

  // Multi-select calendar categories (empty => show base events only)
  const calendarCategories = ['Nutrition','Sleep','Physical','Spiritual','Mental','Medical'];
  const [selectedCategories, setSelectedCategories] = useState([]); // [] means base events only

  useEffect(() => {
    // Base events without urls
    const baseEvents = calendarEventsData.map(event => {
      const { url, ...rest } = event;
      return rest;
    });

    // Nutrition events for Sarah Brown (athlete id 9) using provided nutrition.json
    let nutritionEvents = [];
    try {
      nutritionEvents = nutritionWeekToEvents(nutritionData, { athleteId: 9, baseMonday: '2025-09-01', weeks: 4 });
    } catch (e) {
      console.warn('Failed to transform nutrition data', e);
    }

    // Category events already don't have url values; ensure shape consistency and attach category label via extendedProps.calendarCategory
    const catEvents = calendarCategoryEvents.map(ev => ({
      ...ev,
      extendedProps: {
        ...(ev.extendedProps || {}),
        calendarCategory: ev.extendedProps?.calendarCategory || 'Uncategorized'
      }
    }));

    // Always include nutrition events when Nutrition category selected; if no categories selected we can still include base + nutrition for athlete context
    let combined;
    const selectedSet = new Set(selectedCategories);
    if (!selectedCategories.length) {
      // Show all base + nutrition by default so user can immediately see athlete plan
      combined = [...baseEvents, ...nutritionEvents];
    } else {
      const selectedCatEvents = catEvents.filter(ev => selectedSet.has(ev.extendedProps?.calendarCategory));
      const includeNutrition = selectedSet.has('Nutrition') ? nutritionEvents : [];
      combined = [...baseEvents, ...selectedCatEvents, ...includeNutrition];
    }
    setAllEvents(combined);
    setEvents(combined);

    // Reset filters based on combined dataset
    const squads = Array.from(new Set(combined.map(ev => ev?.extendedProps?.squad).filter(Boolean))).sort();
    const types = Array.from(new Set(combined.map(ev => ev?.extendedProps?.eventType).filter(Boolean))).sort();
    const locations = Array.from(new Set(combined.map(ev => ev?.extendedProps?.location).filter(Boolean))).sort();
    setFilters({ squads, types, locations });
    setActiveFilters(prev => ({
      ...prev,
      squads: squads.length,
      types: types.length,
      location: locations.length,
    }));
  }, [selectedCategories]);

  // Opciones disponibles derivadas de todos los eventos
  const availableOptions = useMemo(() => {
    const squads = new Set();
    const types = new Set();
    const locations = new Set();
    allEvents.forEach(ev => {
      const squad = ev?.extendedProps?.squad;
      if (squad) squads.add(squad);
      const type = ev?.extendedProps?.eventType;
      if (type) types.add(type);
      const location = ev?.extendedProps?.location;
      if (location) locations.add(location);
    });
    return {
      squads: Array.from(squads).sort(),
      types: Array.from(types).sort(),
      locations: Array.from(locations).sort(),
    };
  }, [allEvents]);

  // Inicializar filtros cuando haya opciones
  useEffect(() => {
    if (availableOptions.squads.length && filters.squads.length === 0) {
      setFilters({
        squads: availableOptions.squads,
        types: availableOptions.types,
        locations: availableOptions.locations,
      });
      setActiveFilters(prev => ({
        ...prev,
        squads: availableOptions.squads.length,
        types: availableOptions.types.length,
        location: availableOptions.locations.length,
      }));
    }
  }, [availableOptions, filters.squads.length]);

  // Aplicar filtrado
  useEffect(() => {
    if (!allEvents.length) return;
    console.debug('[Calendar] Filtering events. Total before filter:', allEvents.length, 'Filters:', filters);
    const filtered = allEvents.filter(ev => {
      const squad = ev?.extendedProps?.squad;
      const type = ev?.extendedProps?.eventType;
      const location = ev?.extendedProps?.location;
      const squadOk = !filters.squads.length || !squad || filters.squads.includes(squad);
      const typeOk = !filters.types.length || !type || filters.types.includes(type);
      // Permit events without location; only restrict if location exists and filters list is non-empty
      const locationOk = !filters.locations.length || !location || filters.locations.includes(location);
      return squadOk && typeOk && locationOk;
    });
    console.debug('[Calendar] After filtering:', filtered.length);
    setEvents(filtered);
  }, [allEvents, filters]);

  const handleEventClick = (eventObj) => {
    console.log('Event clicked:', eventObj);

    const event = eventObj.event;
    const jsEvent = eventObj.jsEvent;

    // If the user holds Cmd/Ctrl and the event has a URL, open in a new tab
    if (event?.url && (jsEvent?.metaKey || jsEvent?.ctrlKey)) {
      window.open(event.url, '_blank', 'noopener,noreferrer');
      return false; // do not proceed with tooltip
    }

    // Prevent default navigation behavior for normal clicks
    if (jsEvent) {
      jsEvent.preventDefault();
      jsEvent.stopPropagation();
    }

    console.log('Event data:', event);
    console.log('Event URL:', event.url);

    // Prefer the calendar event element for positioning (more reliable than target which might be inner span)
    const eventEl = eventObj.el || jsEvent?.currentTarget || jsEvent?.target;
    const rect = eventEl.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = 320; // match minWidth in tooltip component
    const tooltipHeightEstimate = 260; // rough estimate; could be refined

    // Base position: centered horizontally over event, below it
    let x = rect.left + rect.width / 2 - tooltipWidth / 2;
    let y = rect.bottom + 8;

    // If not enough space below, place above
    if (y + tooltipHeightEstimate > viewportHeight - 12) {
      y = rect.top - tooltipHeightEstimate - 8;
    }

    // Horizontal bounds guard
    if (x < 8) x = 8;
    if (x + tooltipWidth > viewportWidth - 8) x = viewportWidth - tooltipWidth - 8;

    const position = { x, y };
    setTooltip({
      show: true,
      event,
      position,
      anchorRect: {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
      },
    });

    // Return false to prevent default behavior
    return false;
  };

  const handleViewChange = (viewInfo) => {
    console.log('View changed:', viewInfo);
    setCurrentView(viewInfo.view.type);
  };

  const handleAddEvent = () => {
    console.log('Add event clicked - opening sidebar');
    setShowAddEventSidebar(true);
  };

  const handleSaveEvent = (newEvent) => {
    console.log('Saving new event:', newEvent);
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setShowAddEventSidebar(false);
  };

  const handleCloseAddEventSidebar = () => {
    setShowAddEventSidebar(false);
  };

  const handleEditEvent = (eventData) => {
    console.log('Edit event:', eventData);
    // TODO: Open edit modal or navigate to edit page
    alert(`Edit event: ${eventData.title}`);
  };

  const handleDeleteEvent = (eventData) => {
    console.log('Delete event:', eventData);
    // TODO: Show confirmation dialog and delete event
    if (window.confirm(`Are you sure you want to delete "${eventData.title}"?`)) {
      // Remove event from state
      setEvents(prevEvents => prevEvents.filter(e => e.id !== eventData.id));
    }
  };

  const handleMoreDetails = (eventData) => {
    console.log('More details for event:', eventData);
    // TODO: Open details modal or navigate to details page
    alert(`More details for: ${eventData.title}\nSquad: ${eventData.extendedProps?.squad}\nLocation: ${eventData.extendedProps?.location}`);
  };

  const handleDuplicateEvent = (eventData) => {
    console.log('Duplicate event:', eventData);

    const addDays = (dateLike, days) => {
      if (!dateLike) return null;
      const d = typeof dateLike === 'string' ? new Date(dateLike) : new Date(dateLike);
      d.setDate(d.getDate() + days);
      return d.toISOString();
    };

    try {
      const newEvent = {
        id: `${eventData?.id || 'evt'}-copy-${Date.now()}`,
        title: eventData?.title || 'Untitled (copy)',
        start: eventData?.start ? addDays(eventData.start, 7) : (eventData?.startStr ? addDays(eventData.startStr, 7) : null),
        end: eventData?.end ? addDays(eventData.end, 7) : (eventData?.endStr ? addDays(eventData.endStr, 7) : null),
        allDay: eventData?.allDay ?? false,
        extendedProps: { ...(eventData?.extendedProps || {}) },
      };

      setEvents((prev) => [...prev, newEvent]);
      // Keep tooltip UX tidy
      handleCloseTooltip();
    } catch (e) {
      console.warn('Failed to duplicate event', e);
      handleCloseTooltip();
    }
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleNavigate = (direction) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      if (direction === 'prev') {
        calendarApi.prev();
      } else if (direction === 'next') {
        calendarApi.next();
      } else if (direction === 'today') {
        calendarApi.today();
      }
      // Update current date state when navigating
      setCurrentDate(calendarApi.getDate());
    }
  };

  const handleDateChange = (newDate) => {
    console.log('Date changed in Calendar page:', newDate);
    setCurrentDate(newDate);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      console.log('Navigating calendar to:', newDate);
      calendarApi.gotoDate(newDate);
    }
  };

  const handleCloseTooltip = () => {
    setTooltip({ show: false, event: null, position: { x: 0, y: 0 }, anchorRect: null });
  };

  // Calculate total active filter count
  const getTotalActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((total, count) => total + count, 0);
  };

  // Recibir filtros actualizados desde sidebar
  const handleFiltersChange = (updated) => {
    setFilters(updated);
    setActiveFilters(prev => ({
      ...prev,
      squads: updated.squads.length,
      types: updated.types.length,
      location: updated.locations.length,
    }));
  };

  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltip.show && !event.target.closest('.event-tooltip')) {
        handleCloseTooltip();
      }
    };

    if (tooltip.show) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [tooltip.show]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseTooltip();
      }
    };

    if (tooltip.show) {
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }
  }, [tooltip.show]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#ffffff',
        position: 'relative', // For tooltip positioning
      }}
    >
      {/* Calendar Header - Always at the top */}
      <CalendarHeader
        currentView={currentView}
        onViewChange={(view) => {
          // Allow header buttons to send string, or FullCalendar viewInfo object
            const viewType = typeof view === 'string' ? view : view?.view?.type;
            if (viewType) setCurrentView(viewType);
        }}
        showAllDay={showAllDay}
        onToggleAllDay={() => setShowAllDay((v) => !v)}
        onAddEvent={handleAddEvent}
        onToggleFilters={handleToggleFilters}
        showFilters={showFilters}
        onNavigate={handleNavigate}
        currentDate={currentDate}
        onDateChange={handleDateChange}
        activeFilterCount={getTotalActiveFilterCount()}
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
        calendarCategories={calendarCategories}
      />

      {/* Main Content Area */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0, // Important for flex children
        }}
      >
        {/* Left Sidebar */}
        {showFilters && (
          <Box sx={{ width: '340px', flexShrink: 0 }}>
            <FiltersSidebar
              onClose={() => setShowFilters(false)}
              selectedFilters={filters}
              availableOptions={availableOptions}
              onFiltersChange={handleFiltersChange}
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
            />
          </Box>
        )}

        {/* Right Content Area */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0, // Important for flex children
            overflow: 'hidden',
          }}
        >
          {/* Calendar Component */}
          <Box sx={{ 
            width: '100%',
            height: '100%',
            minHeight: '600px', // Set minimum height for calendar
          }}>
            <Calendar
              key={`calendar-${showFilters}`}
              ref={calendarRef}
              handleEventClick={handleEventClick}
              onViewChange={handleViewChange}
              selectedCalendarView={currentView}
              orgTimeZone="UTC"
              userLocale="en"
              events={events}
              initialDate={currentDate.toISOString().split('T')[0]}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
              onMoreDetails={handleMoreDetails}
              allDaySlot={showAllDay}
            />
          </Box>
        </Box>
      </Box>

      {/* Event Tooltip */}
      {tooltip.show && (
        <EventTooltip
          event={tooltip.event}
          position={tooltip.position}
          anchorRect={tooltip.anchorRect}
          onClose={handleCloseTooltip}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          onMoreDetails={handleMoreDetails}
          onDuplicate={handleDuplicateEvent}
        />
      )}

      {/* Add Event Sidebar */}
      {console.log('Sidebar state:', showAddEventSidebar)}
      <AddEventSidebar
        open={showAddEventSidebar}
        onClose={handleCloseAddEventSidebar}
        onSave={handleSaveEvent}
        athletes={athletesData}
        staff={staffData}
      />
    </Box>
  );
};

export default CalendarPage;
