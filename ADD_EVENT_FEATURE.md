# Add Event Feature Implementation

## Overview
This document describes the implementation of the "Add Event" functionality for the Injury Profiler Calendar prototype, based on the GitHub issue #1 requirements.

## Features Implemented

### 1. AddEventSidebar Component
- **Location**: `src/components/AddEventSidebar.jsx`
- **Purpose**: Sliding sidebar panel for creating new calendar events
- **Design**: Matches the design shown in the GitHub issue screenshot with proper MUI filled inputs

### 2. Form Fields
The sidebar includes all the fields specified in the issue with proper MUI filled variants:

#### Required Fields:
- **Event Type**: Dropdown with options (Training Session, Game, Meeting, Assessment, etc.)
- **Title**: Text input for event title
- **Date**: Date picker for event date
- **Start Time**: Time picker for event start time
- **Duration**: Number input for duration in minutes

#### Optional Fields:
- **Description**: Multi-line text area with 250 character limit
- **Timezone**: Dropdown (defaults to Europe/Dublin)
- **Repeats**: Dropdown for recurrence options
- **Location**: Text input with location search placeholder
- **Athletes**: Multi-select autocomplete with athlete data
- **Staff**: Multi-select autocomplete with staff data
- **Staff Visibility**: Radio buttons (All Staff, Only Selected Staff, Staff and Additional viewers)
- **Attachments**: File upload with drag & drop support

### 3. Integration
- **Calendar Page**: Updated to include the modal and handle event creation
- **Data Sources**: Uses existing athlete and staff JSON data
- **Event Creation**: New events are added to the calendar state and displayed immediately

### 4. Dependencies Added
- `@mui/x-date-pickers`: For date and time picker components
- `date-fns`: Date utility library for date picker adapter

## Usage

### Opening the Sidebar
Click the "Add" button in the calendar header to open the Add Event sidebar panel.

### Creating an Event
1. Select an event type from the dropdown
2. Enter a title (required)
3. Set the date and start time (required)
4. Set the duration in minutes (required)
5. Optionally fill in other fields
6. Click "Save" to create the event

### Event Display
New events appear immediately on the calendar with:
- Appropriate color coding based on event type
- All extended properties for detailed information
- Integration with existing event click handlers

## Technical Details

### Event Object Structure
```javascript
{
  id: "unique_id",
  title: "Event Title",
  start: "2025-01-15T10:00:00.000Z",
  end: "2025-01-15T11:00:00.000Z",
  backgroundColor: "#482831",
  borderColor: "#482831", 
  textColor: "#ffffff",
  url: "/planning_hub/events/unique_id",
  extendedProps: {
    eventType: "TRAINING_SESSION",
    description: "Event description",
    location: "Event location",
    duration: 60,
    timezone: "Europe/Dublin",
    repeats: "none",
    selectedAthletes: [...],
    selectedStaff: [...],
    staffVisibility: "all",
    attachments: [...],
    squad: "International Squad",
    coach: "Coach Name"
  }
}
```

### Event Type Colors
- Training Session: `#482831`
- Game: `#E62020`
- Meeting: `#036BC6`
- Assessment: `#01205D`
- Recovery Session: `#B134C1`
- Team Building: `#036BC6`
- Medical Check: `#E62020`
- Other: `#666666`

## Files Modified/Created

### New Files:
- `src/components/AddEventSidebar.jsx` - Main sidebar component with MUI filled inputs
- `ADD_EVENT_FEATURE.md` - This documentation

### Modified Files:
- `src/pages/Calendar/index.jsx` - Added sidebar integration
- `src/components/index.js` - Added component export
- `package.json` - Added new dependencies

## Future Enhancements

1. **Validation Improvements**: More sophisticated form validation
2. **Recurring Events**: Full implementation of recurring event logic
3. **File Upload**: Integration with file storage service
4. **Event Editing**: Edit existing events functionality
5. **Event Templates**: Pre-defined event templates
6. **Notifications**: Event creation notifications
7. **Conflict Detection**: Check for scheduling conflicts

## Testing

The implementation has been tested for:
- ✅ Component compilation (build successful)
- ✅ Form validation
- ✅ Event creation and display
- ✅ Modal open/close functionality
- ✅ Data integration with existing calendar

## Browser Compatibility

The modal uses modern React patterns and Material-UI components, compatible with:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
