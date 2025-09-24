import React, { useState, useRef } from 'react';
import { Box, Typography, IconButton, Badge, Popover } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Add, ArrowDropDown, ChevronLeft, ChevronRight, FilterList } from '@mui/icons-material';
import Button from './Button';

const CalendarHeader = ({ 
  currentView, 
  onViewChange, 
  onAddEvent, 
  onToggleFilters, 
  showFilters, 
  onNavigate,
  currentDate,
  onDateChange,
  activeFilterCount = 0
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate || new Date('2025-09-01'));
  const [datePickerAnchor, setDatePickerAnchor] = useState(null);

  const handleDateClick = (event) => {
    setDatePickerAnchor(event.currentTarget);
  };

  const handleDatePickerClose = () => {
    setDatePickerAnchor(null);
  };

  const handleDateChange = (newDate) => {
    console.log('Date changed in CalendarHeader:', newDate);
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange(newDate);
    }
    handleDatePickerClose();
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#ffffff',
        minHeight: '64px',
        position: 'relative',
      }}
    >
      {/* Left Section - Filters and Navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        {/* Show/Hide Filters Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Badge
            badgeContent={activeFilterCount}
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: 'var(--color-text-secondary)',
                color: 'white',
                fontSize: '10px',
                minWidth: '16px',
                height: '16px',
                borderRadius: '8px',
                right: '6px',
                top: '6px',
              },
            }}
          >
            <Button
              variant="secondary"
              onClick={onToggleFilters}
            >
              <FilterList sx={{ fontSize: '18px', marginRight: '8px' }} />
              Show filters
            </Button>
          </Badge>
        </Box>

        {/* Navigation Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={() => onNavigate && onNavigate('prev')}
            sx={{
              color: '#666666',
              padding: '8px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          
          <IconButton
            onClick={() => onNavigate && onNavigate('next')}
            sx={{
              color: '#666666',
              padding: '8px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ChevronRight />
          </IconButton>

          <Button
            variant="secondary"
            onClick={() => onNavigate && onNavigate('today')}
          >
            Today
          </Button>
        </Box>
      </Box>

      {/* Center Section - Date Title with Arrow Button - Absolutely positioned */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography
          sx={{
            color: '#333333',
            fontSize: '20px',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          {formatMonthYear(selectedDate)}
        </Typography>
        <IconButton
          onClick={handleDateClick}
          size="small"
          sx={{
            color: '#666666',
            padding: '2px',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          <ArrowDropDown />
        </IconButton>
      </Box>

      {/* Right Section - Month and Add Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
        <Button
          variant="secondary"
        >
          Month
          <ArrowDropDown sx={{ fontSize: '16px', marginLeft: '8px' }} />
        </Button>

        <Button
          variant="primary"
          onClick={onAddEvent}
        >
          <Add sx={{ fontSize: '16px', marginRight: '8px' }} />
          Add
          <ArrowDropDown sx={{ fontSize: '16px', marginLeft: '8px' }} />
        </Button>
      </Box>

      {/* Date Picker Popover */}
      <Popover
        open={Boolean(datePickerAnchor)}
        anchorEl={datePickerAnchor}
        onClose={handleDatePickerClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPopover-paper': {
            padding: 0,
            overflow: 'visible',
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            value={selectedDate}
            onChange={handleDateChange}
            views={['year', 'month']}
            openTo="month"
            displayStaticWrapperAs="desktop"
            slotProps={{
              actionBar: {
                actions: ['today', 'accept'],
              },
            }}
            sx={{
              '& .MuiPickersCalendarHeader-root': {
                paddingLeft: 2,
                paddingRight: 2,
              },
              '& .MuiPickersCalendarHeader-label': {
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                color: '#333333',
                fontFamily: 'Open Sans, sans-serif',
                textTransform: 'none',
                '&:hover': {
                  color: '#3B4960',
                },
              },
              '& .MuiPickersYear-yearButton': {
                cursor: 'pointer',
                color: '#333333',
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#f2f3f5',
                  color: '#3B4960',
                },
                '&.Mui-selected': {
                  backgroundColor: '#3B4960',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#2f3a4d',
                  },
                },
              },
              '& .MuiPickersMonth-monthButton': {
                cursor: 'pointer',
                color: '#333333',
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#f2f3f5',
                  color: '#3B4960',
                },
                '&.Mui-selected': {
                  backgroundColor: '#3B4960',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#2f3a4d',
                  },
                },
              },
              '& .MuiPickersActionBar-root': {
                padding: '16px',
                borderTop: '1px solid #e0e0e0',
              },
              '& .MuiButton-root': {
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                '&.MuiButton-textPrimary': {
                  color: '#3B4960',
                  '&:hover': {
                    backgroundColor: '#f2f3f5',
                  },
                },
                '&.MuiButton-containedPrimary': {
                  backgroundColor: '#3B4960',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#2f3a4d',
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      </Popover>
    </Box>
  );
};

export default CalendarHeader;
