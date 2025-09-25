import React, { useState, useRef } from 'react';
import { Box, Typography, IconButton, Popover, Menu, MenuItem } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LicenseInfo } from '@mui/x-license-pro';

// TODO: Set MUI X License Key with correct key
// LicenseInfo.setLicenseKey('YOUR_ACTUAL_MUI_X_LICENSE_KEY_HERE');
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
  // all-day toggle now handled inside calendar grid
}) => {
  const [selectedDate, setSelectedDate] = useState(currentDate || new Date('2025-09-29'));
  const [datePickerAnchor, setDatePickerAnchor] = useState(null);
  const [viewAnchor, setViewAnchor] = useState(null);

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
        justifyContent: 'space-between',
        padding: '12px 24px',
        backgroundColor: '#ffffff',
        minHeight: '64px'
      }}
    >
      {/* Left Section - Filters + Nav */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Show/Hide Filters Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="secondary"
            onClick={onToggleFilters}
          >
            <FilterList sx={{ fontSize: '18px', marginRight: '8px' }} />
            Filters
          </Button>
        </Box>

        {/* Navigation Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="secondary"
            onClick={() => onNavigate && onNavigate('today')}
          >
            Today
          </Button>

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
        </Box>
      </Box>

      {/* Center Section - Date Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          sx={{
            color: '#333333',
            fontSize: '20px',
            fontWeight: 600,
            textAlign: 'center',
            whiteSpace: 'nowrap'
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

      {/* Right Section - View & Add */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box>
          <Button
            variant="secondary"
            onClick={(e) => setViewAnchor(e.currentTarget)}
          >
            {currentView === 'dayGridMonth' ? 'Month' : 'Week'}
            <ArrowDropDown sx={{ fontSize: '16px', marginLeft: '8px' }} />
          </Button>
          <Menu
            anchorEl={viewAnchor}
            open={Boolean(viewAnchor)}
            onClose={() => setViewAnchor(null)}
          >
            <MenuItem
              selected={currentView === 'dayGridMonth'}
              onClick={() => { onViewChange && onViewChange('dayGridMonth'); setViewAnchor(null); }}
            >
              Month
            </MenuItem>
            <MenuItem
              selected={currentView === 'timeGridWeek'}
              onClick={() => { onViewChange && onViewChange('timeGridWeek'); setViewAnchor(null); }}
            >
              Week
            </MenuItem>
          </Menu>
        </Box>

        <Button
          variant="primary"
          onClick={onAddEvent}
        >
          Add
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
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-family-primary)',
                textTransform: 'none',
                '&:hover': {
                  color: '#3B4960',
                },
              },
              '& .MuiPickersYear-yearButton': {
                cursor: 'pointer',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-family-primary)',
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
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-family-primary)',
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
                fontFamily: 'var(--font-family-primary)',
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
