import React from 'react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import { Close, Edit, Delete, MoreVert, ContentCopy, Refresh } from '@mui/icons-material';

const EventTooltip = ({ 
  event, 
  position, 
  onClose, 
  onEdit, 
  onDelete, 
  onMoreDetails,
  onDuplicate 
}) => {
  if (!event) return null;

  const { title, start, end, extendedProps } = event;
  
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

  return (
    <Box
      className="event-tooltip"
      sx={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        minWidth: '320px',
        maxWidth: '400px',
        padding: '16px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header with icon, title and duplicate button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Small dark brown square icon */}
          <Box
            sx={{
              width: '12px',
              height: '12px',
              backgroundColor: '#8B4513', // Dark brown color
              borderRadius: '2px',
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

      {/* Description */}
      <Typography variant="body2" sx={{ color: '#666', mb: 2, fontSize: '14px' }}>
        Event description.
      </Typography>

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
              backgroundColor: '#1976d2',
              color: '#ffffff',
              fontSize: '12px',
              textTransform: 'none',
              minWidth: 'auto',
              padding: '4px 12px',
              '&:hover': { backgroundColor: '#1565c0' }
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
