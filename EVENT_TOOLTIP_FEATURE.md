# Event Tooltip Feature

## Overview
This feature implements an event tooltip that appears when clicking on calendar events, displaying detailed event information and action buttons.

## Implementation Details

### Components Added
- **EventTooltip.jsx**: A new component that displays event details in a popup tooltip
- Updated **Calendar/index.jsx**: Added tooltip state management and event click handling

### Features
- **Event Information Display**: Shows event title, date/time, event type, squad, and description
- **Action Buttons**: Delete, Edit, and More details buttons
- **Smart Positioning**: Tooltip positions itself below the clicked event with viewport bounds checking
- **Click Outside to Close**: Tooltip closes when clicking outside of it
- **Responsive Design**: Adapts to different screen sizes

### Event Data Structure
The tooltip displays information from the event's `extendedProps`:
- `eventType`: TRAINING_SESSION, TEST_SESSION, RECURRING_EVENT, SERIES_EVENT
- `squad`: Team/squad information
- `location`: Event location
- `coach`: Coach information

### Usage
1. Click on any calendar event
2. Tooltip appears with event details
3. Use action buttons to interact with the event
4. Click outside or use the close button to dismiss

### Styling
- Clean, modern design matching the application's design system
- Proper shadows and borders for visual hierarchy
- Responsive button styling with hover effects
- Consistent typography and spacing

## GitHub Issue Resolution
This implementation addresses [Issue #2](https://github.com/saarbyrner/injuryprofiler-calendar-prototype/issues/2) by providing the event tooltip functionality shown in the provided screenshot.
