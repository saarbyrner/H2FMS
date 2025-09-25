import React, { useLayoutEffect, useRef, useState } from 'react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import { Close, Edit, Delete, MoreVert, ContentCopy, Refresh } from '@mui/icons-material';

const EventTooltip = ({ 
  event, 
  position, 
  anchorRect,
  onClose, 
  onEdit, 
  onDelete, 
  onMoreDetails,
  onDuplicate 
}) => {
  if (!event) return null;

  const tooltipRef = useRef(null);
  const [adjustedPos, setAdjustedPos] = useState(position);

  useLayoutEffect(() => {
    const el = tooltipRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let { x, y } = position; // starting values passed in

    // If going off right/left adjust horizontally
    if (x + rect.width + 8 > vw) x = vw - rect.width - 8;
    if (x < 8) x = 8;

    // Attempt vertical flip if overflow bottom
    if (y + rect.height + 8 > vh && anchorRect) {
      const flippedY = anchorRect.top - rect.height - 8; // place above anchor
      if (flippedY >= 8) {
        y = flippedY;
      } else {
        // Clamp inside viewport if still overflowing
        y = Math.max(8, vh - rect.height - 8);
      }
    }

    // If originally above and now off top, push down
    if (y < 8) y = 8;

    // Nudge if overlapping fixed nav bars (if any) - simple heuristic could be added later

    setAdjustedPos({ x, y });
  }, [position, anchorRect, event]);

  // Close on Escape key
  useLayoutEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Prevent scroll bleed when wheel over tooltip if needed

  const { title, start, end, extendedProps, backgroundColor, borderColor } = event;

  const squareBg = backgroundColor || extendedProps?.backgroundColor || '#666';
  const squareBorder = borderColor || extendedProps?.borderColor || squareBg;
  const needsBorderContrast = squareBg === '#ffffff' || squareBg === '#fff';
  
  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-GB', options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getEventTypeDisplay = (eventType) => {
    switch (eventType) {
      case 'TRAINING_SESSION':
        return 'Training Session';
      case 'TEST_SESSION':
        return 'Test Session';
      case 'RECURRING_EVENT':
        return 'Recurring Event';
      case 'SERIES_EVENT':
        return 'Series Event';
      default:
        return eventType || 'Event';
    }
  };

  const getRecurrenceInfo = (event) => {
    // For now, we'll show a placeholder. In a real app, this would come from the event data
    if (extendedProps?.eventType === 'RECURRING_EVENT') {
      return 'Every Tuesday';
    }
    return null;
  };

  const startDate = formatDateTime(start);
  const startTime = formatTime(start);
  const endTime = formatTime(end);
  const timeRange = `${startTime} - ${endTime}`;
  const recurrenceInfo = getRecurrenceInfo(event);

  const nutrition = extendedProps?.nutrition;
  const fueling = extendedProps?.fueling || extendedProps?.activity?.fueling;
  const activityDetails = extendedProps?.activity;
  const dailySummary = extendedProps?.summary;

  const pct = (consumed, target) => {
    if (!consumed || !target) return null;
    return Math.round((consumed / target) * 100);
  };

  return (
    <Box
      ref={tooltipRef}
      className="event-tooltip"
      sx={{
        position: 'fixed',
        left: adjustedPos.x,
        top: adjustedPos.y,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        minWidth: '320px',
        maxWidth: '400px',
        padding: '16px',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      {/* Header with icon, title and duplicate button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Color square matching event color */}
          <Box
            sx={{
              width: '12px',
              height: '12px',
              backgroundColor: squareBg,
              border: needsBorderContrast ? '1px solid #ccc' : `1px solid ${squareBorder}`,
              borderRadius: '2px',
              boxSizing: 'border-box'
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333', fontSize: '16px' }}>
            {title}
          </Typography>
        </Box>
        <Button
          size="small"
          onClick={onDuplicate}
          sx={{ 
            color: '#666',
            fontSize: '12px',
            textTransform: 'none',
            minWidth: 'auto',
            padding: '4px 8px',
            '&:hover': { backgroundColor: '#f5f5f5' }
          }}
        >
          Duplicate
        </Button>
      </Box>

      {/* Date and time */}
      <Typography variant="body2" sx={{ color: '#666', mb: 1, fontSize: '14px' }}>
        {startDate}
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', mb: 2, fontSize: '14px' }}>
        {timeRange}
      </Typography>

      {/* Event type */}
      <Typography variant="body2" sx={{ color: '#333', mb: 1, fontSize: '14px', fontWeight: 500 }}>
        {getEventTypeDisplay(extendedProps?.eventType)}
      </Typography>

      {/* Squad */}
      {extendedProps?.squad && (
        <Typography variant="body2" sx={{ color: '#333', mb: 1, fontSize: '14px' }}>
          {extendedProps.squad}
        </Typography>
      )}

      {/* Recurrence info with icon */}
      {recurrenceInfo && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Refresh 
            sx={{ 
              fontSize: '16px', 
              color: '#666',
              transform: 'rotate(45deg)' // Rotate to create circular arrow effect
            }} 
          />
          <Typography variant="body2" sx={{ color: '#666', fontSize: '14px' }}>
            {recurrenceInfo}
          </Typography>
        </Box>
      )}

      {/* Generic or dynamic description */}
      {extendedProps?.eventType !== 'NUTRITION' && (
        <Typography variant="body2" sx={{ color: '#666', mb: 2, fontSize: '14px' }}>
          Event description.
        </Typography>
      )}

      {/* Nutrition Macros */}
      {nutrition && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontSize: '13px', fontWeight: 600, mb: 1 }}>
            Meal Nutrition
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <ChipLike label={`Calories: ${nutrition.calories} kcal`} />
            <ChipLike label={`Carbs: ${nutrition.carbs} g`} />
            <ChipLike label={`Protein: ${nutrition.protein} g`} />
            <ChipLike label={`Fat: ${nutrition.fat} g`} />
            {extendedProps?.mealPercentOfDaily != null && (
              <ChipLike label={`~${extendedProps.mealPercentOfDaily}% daily kcal`} />
            )}
          </Box>
        </Box>
      )}

      {/* Fueling / Activity */}
      {(fueling || activityDetails?.notes) && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontSize: '13px', fontWeight: 600, mb: 1 }}>
            Activity / Fueling
          </Typography>
          {fueling && (
            <Typography variant="body2" sx={{ fontSize: '13px', color: '#444', mb: 0.5 }}>
              Fueling: {fueling}
            </Typography>
          )}
          {activityDetails?.notes && (
            <Typography variant="body2" sx={{ fontSize: '13px', color: '#444' }}>
              {activityDetails.notes}
            </Typography>
          )}
        </Box>
      )}

      {/* Daily Summary (only show once per day event selection) */}
      {dailySummary && nutrition && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontSize: '13px', fontWeight: 600, mb: 1 }}>
            Daily Totals (So Far)
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '12px', color: '#555' }}>
            Calories: {dailySummary.calories?.consumed}/{dailySummary.calories?.target} {dailySummary.calories?.unit} {pct(dailySummary.calories?.consumed, dailySummary.calories?.target) ? `(${pct(dailySummary.calories?.consumed, dailySummary.calories?.target)}%)` : ''}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '12px', color: '#555' }}>
            Carbs: {dailySummary.carbs?.consumed}/{dailySummary.carbs?.target} {dailySummary.carbs?.unit} {pct(dailySummary.carbs?.consumed, dailySummary.carbs?.target) ? `(${pct(dailySummary.carbs?.consumed, dailySummary.carbs?.target)}%)` : ''}
          </Typography>
            <Typography variant="body2" sx={{ fontSize: '12px', color: '#555' }}>
            Protein: {dailySummary.protein?.consumed}/{dailySummary.protein?.target} {dailySummary.protein?.unit} {pct(dailySummary.protein?.consumed, dailySummary.protein?.target) ? `(${pct(dailySummary.protein?.consumed, dailySummary.protein?.target)}%)` : ''}
          </Typography>
            <Typography variant="body2" sx={{ fontSize: '12px', color: '#555' }}>
            Fat: {dailySummary.fat?.consumed}/{dailySummary.fat?.target} {dailySummary.fat?.unit} {pct(dailySummary.fat?.consumed, dailySummary.fat?.target) ? `(${pct(dailySummary.fat?.consumed, dailySummary.fat?.target)}%)` : ''}
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Action buttons */}
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
        <Button
          size="small"
          onClick={onDelete}
          sx={{ 
            color: '#d32f2f',
            fontSize: '12px',
            textTransform: 'none',
            minWidth: 'auto',
            padding: '4px 8px',
            '&:hover': { backgroundColor: '#ffebee' }
          }}
        >
          Delete
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            onClick={onEdit}
            sx={{ 
              color: '#333',
              fontSize: '12px',
              textTransform: 'none',
              minWidth: 'auto',
              padding: '4px 8px',
              '&:hover': { backgroundColor: '#f5f5f5' }
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            onClick={onMoreDetails}
            variant="contained"
            sx={{ 
              backgroundColor: '#3B4960',
              color: '#ffffff',
              fontSize: '12px',
              textTransform: 'none',
              minWidth: 'auto',
              padding: '4px 12px',
              '&:hover': { backgroundColor: '#2f3a4d' }
            }}
          >
            More details
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EventTooltip;

// Lightweight chip-like component inline (avoids extra dependency)
const ChipLike = ({ label }) => (
  <span style={{
    display: 'inline-block',
    background: '#f5f5f5',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: 500,
    color: '#333'
  }}>{label}</span>
);
