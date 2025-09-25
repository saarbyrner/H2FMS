import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import FiltersSidebar from '../../components/FiltersSidebar';
import CalendarHeader from '../../components/CalendarHeader';
import Calendar from '../../components/Calendar';
import EventTooltip from '../../components/EventTooltip';
import AddEventSidebar from '../../components/AddEventSidebar';
import calendarEventsData from '../../data/calendar_events.json';
import calendarCategoryEvents from '../../data/calendar_category_events.json';
import newCalendarData from '../../data/calendar.json';
import soldiersData from '../../data/soldiers.json';
import staffData from '../../data/users_staff.json';
import nutritionData from '../../data/nutrition.json';
import { nutritionWeekToEvents } from '../../utils/nutritionToEvents';
// Nutrition prototype dynamic events
import { getPublishedNutritionEvents } from '../../features/nutrition/api';

const CalendarPage = () => {
  // Simplified state management - single source of truth
  const [allEvents, setAllEvents] = useState([]);
  const [currentView, setCurrentView] = useState('dayGridMonth');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddEventSidebar, setShowAddEventSidebar] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, event: null, position: { x: 0, y: 0 }, anchorRect: null });
  const [currentDate, setCurrentDate] = useState(new Date('2025-09-29'));
  const calendarRef = useRef(null);

  // Consolidated filter state
  const [filters, setFilters] = useState({
    squads: [],
    types: [],
    locations: [],
    attendees: [],
  });

  // Calendar categories are now handled through unified types in the filters

  // Load and combine all events (base + nutrition + categories)
  useEffect(() => {
    const loadEvents = () => {
      try {
        // Base events without urls
        const baseEvents = calendarEventsData.map(event => {
          const { url, ...rest } = event;
          return rest;
        });

        // Nutrition events
        let nutritionEvents = [];
        try {
          nutritionEvents = nutritionWeekToEvents(nutritionData, { 
            athleteId: 9, 
            baseMonday: '2025-09-29', 
            weeks: 1 
          });
        } catch (e) {
          console.warn('Failed to transform nutrition data', e);
        }

        // Add published nutrition events
        const published = getPublishedNutritionEvents();
        nutritionEvents = [...nutritionEvents, ...published];

        // Category events
        const catEvents = calendarCategoryEvents.map(ev => ({
          ...ev,
          extendedProps: {
            ...(ev.extendedProps || {}),
            calendarCategory: ev.extendedProps?.calendarCategory || 'Uncategorized'
          }
        }));

        // New calendar data (your comprehensive dataset)
        const newEvents = newCalendarData.map(event => ({
          ...event,
          extendedProps: {
            ...(event.extendedProps || {}),
            calendarCategory: event.extendedProps?.calendarCategory || 'Uncategorized'
          }
        }));

        // Combine all events - categories are now handled through unified types filtering
        const combined = [...baseEvents, ...nutritionEvents, ...catEvents, ...newEvents];

        setAllEvents(combined);
      } catch (error) {
        console.error('Error loading events:', error);
        setAllEvents([]);
      }
    };

    loadEvents();
  }, []);

  // Memoized available filter options
  const availableOptions = useMemo(() => {
    const squads = new Set();
    const types = new Set();
    const locations = new Set();
    const attendees = new Set();

    allEvents.forEach(ev => {
      const squad = ev?.extendedProps?.squad;
      if (squad) squads.add(squad);
      
      const type = ev?.extendedProps?.eventType;
      if (type) types.add(type);
      
      const location = ev?.extendedProps?.location;
      if (location) locations.add(location);
      
      const eventAttendees = ev?.extendedProps?.attendees || [];
      eventAttendees.forEach(attendee => attendees.add(attendee));
    });

    return {
      squads: Array.from(squads).sort(),
      types: Array.from(types).sort(),
      locations: Array.from(locations).sort(),
      attendees: Array.from(attendees).sort(),
    };
  }, [allEvents]);

  // Create unified types list (same logic as in FiltersSidebar)
  const unifiedTypes = useMemo(() => {
    const typeMap = {
      'Physical': ['PHYSICAL_STRENGTH', 'PHYSICAL_SPEED', 'PHYSICAL_CONDITIONING', 'PHYSICAL_PREHAB', 'PHYSICAL_PRIMER'],
      'Medical': ['MEDICAL_SCREENING', 'MEDICAL_REHAB', 'MEDICAL_TREATMENT', 'MEDICAL_CONSULT', 'MEDICAL_SUPPORT', 'MEDICAL_RTP', 'MEDICAL_ILLNESS', 'MEDICAL_RECOVERY', 'MEDICAL_MONITORING'],
      'Nutrition': ['NUTRITION', 'NUTRITION_SESSION', 'NUTRITION_BRIEFING'],
      'Psychological': ['MENTAL_SKILLS', 'MENTAL_TEAM', 'SPIRITUAL_MINDFULNESS', 'SPIRITUAL_TEAM_CULTURE', 'PSYCHOLOGICAL_SESSION', 'PSYCHOLOGICAL_GROUP', 'PSYCHOLOGICAL_DEBRIEF', 'PSYCHOLOGICAL_WORKSHOP', 'PSYCHOLOGICAL_MINDFUL'],
      'Sleep': ['SLEEP_EDUCATION', 'SLEEP_SESSION', 'SLEEP_TRACK', 'SLEEP_NAP'],
      'Appointments': ['TEST_SESSION', 'RECURRING_EVENT', 'SERIES_EVENT', 'APPOINTMENT_ADMIN', 'APPOINTMENT_MEDIA', 'APPOINTMENT_HEALTH', 'APPOINTMENT_COMMUNITY', 'APPOINTMENT_PARENT', 'APPOINTMENT_KIT'],
      'Training': ['TRAINING_SESSION', 'TRAINING_TACTICAL', 'TRAINING_TECHNICAL', 'TRAINING_SETPIECES', 'TRAINING_ACTIVATION', 'TRAINING_MATCH', 'TRAINING_RECOVERY']
    };

    // Get all available event types from the data
    const availableEventTypes = new Set(availableOptions.types);
    
    // Create the unified list, only including types that exist in the data
    const unified = [];
    Object.entries(typeMap).forEach(([displayName, eventTypes]) => {
      const matchingTypes = eventTypes.filter(type => availableEventTypes.has(type));
      if (matchingTypes.length > 0) {
        unified.push(displayName);
      }
    });

    // Add any remaining event types that don't fit into categories
    const categorizedTypes = new Set(Object.values(typeMap).flat());
    const remainingTypes = availableOptions.types.filter(type => !categorizedTypes.has(type));
    unified.push(...remainingTypes);

    return unified;
  }, [availableOptions.types]);

  // Initialize filters with all available options
  useEffect(() => {
    if (availableOptions.squads.length > 0 && filters.squads.length === 0) {
      setFilters({
        squads: availableOptions.squads,
        types: unifiedTypes, // Use unified types instead of raw event types
        locations: availableOptions.locations,
        attendees: availableOptions.attendees,
      });
    }
  }, [availableOptions, unifiedTypes, filters.squads.length]);

  // Memoized filtered events
  const filteredEvents = useMemo(() => {
    if (!allEvents.length) return [];

    console.debug('[Calendar] Filtering events. Total before filter:', allEvents.length, 'Filters:', filters);
    
    // Create mapping from display names to actual event types
    const typeMap = {
      'Physical': ['PHYSICAL_STRENGTH', 'PHYSICAL_SPEED', 'PHYSICAL_CONDITIONING', 'PHYSICAL_PREHAB', 'PHYSICAL_PRIMER'],
      'Medical': ['MEDICAL_SCREENING', 'MEDICAL_REHAB', 'MEDICAL_TREATMENT', 'MEDICAL_CONSULT', 'MEDICAL_SUPPORT', 'MEDICAL_RTP', 'MEDICAL_ILLNESS', 'MEDICAL_RECOVERY', 'MEDICAL_MONITORING'],
      'Nutrition': ['NUTRITION', 'NUTRITION_SESSION', 'NUTRITION_BRIEFING'],
      'Psychological': ['MENTAL_SKILLS', 'MENTAL_TEAM', 'SPIRITUAL_MINDFULNESS', 'SPIRITUAL_TEAM_CULTURE', 'PSYCHOLOGICAL_SESSION', 'PSYCHOLOGICAL_GROUP', 'PSYCHOLOGICAL_DEBRIEF', 'PSYCHOLOGICAL_WORKSHOP', 'PSYCHOLOGICAL_MINDFUL'],
      'Sleep': ['SLEEP_EDUCATION', 'SLEEP_SESSION', 'SLEEP_TRACK', 'SLEEP_NAP'],
      'Appointments': ['TEST_SESSION', 'RECURRING_EVENT', 'SERIES_EVENT', 'APPOINTMENT_ADMIN', 'APPOINTMENT_MEDIA', 'APPOINTMENT_HEALTH', 'APPOINTMENT_COMMUNITY', 'APPOINTMENT_PARENT', 'APPOINTMENT_KIT'],
      'Training': ['TRAINING_SESSION', 'TRAINING_TACTICAL', 'TRAINING_TECHNICAL', 'TRAINING_SETPIECES', 'TRAINING_ACTIVATION', 'TRAINING_MATCH', 'TRAINING_RECOVERY']
    };

    // Convert selected display types to actual event types
    const selectedEventTypes = new Set();
    filters.types.forEach(displayType => {
      if (typeMap[displayType]) {
        typeMap[displayType].forEach(eventType => selectedEventTypes.add(eventType));
      } else {
        // Handle any remaining types that don't fit into categories
        selectedEventTypes.add(displayType);
      }
    });
    
    const filtered = allEvents.filter(ev => {
      const squad = ev?.extendedProps?.squad;
      const type = ev?.extendedProps?.eventType;
      const location = ev?.extendedProps?.location;
      const attendees = ev?.extendedProps?.attendees || [];
      
      const squadOk = !filters.squads.length || !squad || filters.squads.includes(squad);
      const typeOk = !filters.types.length || !type || selectedEventTypes.has(type);
      const locationOk = !filters.locations.length || !location || filters.locations.includes(location);
      const attendeesOk = !filters.attendees.length || !attendees.length || 
        filters.attendees.some(selectedAttendee => attendees.includes(selectedAttendee));
      
      return squadOk && typeOk && locationOk && attendeesOk;
    });
    
    console.debug('[Calendar] After filtering:', filtered.length);
    return filtered;
  }, [allEvents, filters]);


  const navigate = useNavigate();

  // Event handlers with useCallback for performance
  const handleEventClick = useCallback((eventObj) => {
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

    // If Nutrition category event -> navigate directly to athlete daily plan (bypass tooltip)
    if (event?.extendedProps?.calendarCategory === 'Nutrition' && event?.extendedProps?.athleteId) {
      const dateStr = event.startStr?.split('T')[0];
      navigate(`/soldiers/${event.extendedProps.soldierId}/nutrition?date=${dateStr}`);
      return false;
    }

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
  }, [navigate]);

  const handleViewChange = useCallback((viewInfo) => {
    console.log('View changed:', viewInfo);
    setCurrentView(viewInfo.view.type);
  }, []);

  const handleAddEvent = useCallback(() => {
    console.log('Add event clicked - opening sidebar');
    setShowAddEventSidebar(true);
  }, []);

  // FIXED: Add events to allEvents (source of truth) instead of just events
  const handleSaveEvent = useCallback((newEvent) => {
    console.log('Saving new event:', newEvent);
    
    // Add to allEvents (source of truth) - this ensures events persist through filter changes
    setAllEvents(prevAllEvents => [...prevAllEvents, newEvent]);
    
    // Close sidebar
    setShowAddEventSidebar(false);
  }, []);

  const handleCloseAddEventSidebar = useCallback(() => {
    setShowAddEventSidebar(false);
  }, []);

  const handleEditEvent = useCallback((eventData) => {
    console.log('Edit event:', eventData);
    // TODO: Implement edit functionality
    alert(`Edit event: ${eventData.title}`);
  }, []);

  // FIXED: Delete from allEvents (source of truth) instead of just events
  const handleDeleteEvent = useCallback((eventData) => {
    console.log('Delete event:', eventData);
    if (window.confirm(`Are you sure you want to delete "${eventData.title}"?`)) {
      // Remove from allEvents (source of truth)
      setAllEvents(prevAllEvents => prevAllEvents.filter(e => e.id !== eventData.id));
    }
  }, []);

  const handleMoreDetails = useCallback((eventData) => {
    console.log('More details for event:', eventData);
    // TODO: Implement more details functionality
    alert(`More details for: ${eventData.title}\nSquad: ${eventData.extendedProps?.squad}\nLocation: ${eventData.extendedProps?.location}`);
  }, []);

  const handleDuplicateEvent = useCallback((eventData) => {
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
        backgroundColor: eventData?.backgroundColor || '#666666',
        borderColor: eventData?.borderColor || '#666666',
        textColor: eventData?.textColor || '#ffffff',
        extendedProps: { ...(eventData?.extendedProps || {}) },
      };

      // Add to allEvents (source of truth)
      setAllEvents(prevAllEvents => [...prevAllEvents, newEvent]);
      handleCloseTooltip();
    } catch (e) {
      console.warn('Failed to duplicate event', e);
      handleCloseTooltip();
    }
  }, []);

  const handleToggleFilters = useCallback(() => {
    setShowFilters(!showFilters);
  }, [showFilters]);

  const handleNavigate = useCallback((direction) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      if (direction === 'prev') {
        calendarApi.prev();
      } else if (direction === 'next') {
        calendarApi.next();
      } else if (direction === 'today') {
        calendarApi.today();
      }
      setCurrentDate(calendarApi.getDate());
    }
  }, []);

  const handleDateChange = useCallback((newDate) => {
    console.log('Date changed in Calendar page:', newDate);
    setCurrentDate(newDate);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      console.log('Navigating calendar to:', newDate);
      calendarApi.gotoDate(newDate);
    }
  }, []);

  const handleCloseTooltip = useCallback(() => {
    setTooltip({ show: false, event: null, position: { x: 0, y: 0 }, anchorRect: null });
  }, []);

  const handleFiltersChange = useCallback((updated) => {
    setFilters(updated);
  }, []);

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
  }, [tooltip.show, handleCloseTooltip]);

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
  }, [tooltip.show, handleCloseTooltip]);

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
        onAddEvent={handleAddEvent}
        onToggleFilters={handleToggleFilters}
        showFilters={showFilters}
        onNavigate={handleNavigate}
        currentDate={currentDate}
        onDateChange={handleDateChange}
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
              availableOptions={{...availableOptions, types: unifiedTypes}}
              onFiltersChange={handleFiltersChange}
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
              events={filteredEvents}
              initialDate={currentDate.toISOString().split('T')[0]}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
              onMoreDetails={handleMoreDetails}
              allDaySlot={false}
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
      <AddEventSidebar
        open={showAddEventSidebar}
        onClose={handleCloseAddEventSidebar}
        onSave={handleSaveEvent}
        soldiers={soldiersData}
        staff={staffData}
      />
    </Box>
  );
};

export default CalendarPage;
