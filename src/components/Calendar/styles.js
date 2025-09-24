// Calendar styles matching the original injuryprofiler.com implementation exactly
import { COLORS } from './constants';

const commonEventTextStyles = {
  borderRadius: '3px',
  width: '100%',
};

const eventTextOverflowStyles = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  display: 'flex',
  justifyContent: 'space-between',
};

export const getEventTextStyles = ({
  backgroundColor,
  borderColor,
  textColor,
}) => ({
  dayGridMonth: {
    backgroundColor,
    border: `1px solid ${borderColor}`,
    color: textColor,
    ...eventTextOverflowStyles,
    ...commonEventTextStyles,
    justifyContent: 'start',
    alignItems: 'center',
  },
  listWeek: {
    borderColor,
    color: textColor,
    ...eventTextOverflowStyles,
    ...commonEventTextStyles,
  },
  default: {
    borderColor,
    color: textColor,
    ...commonEventTextStyles,
    title: {
      fontWeight: 600,
      fontSize: '12px',
      margin: 0,
    },
    calendarHeader: {
      display: 'flex',
      alignItems: 'center',
    },
    time: {
      fontWeight: 400,
      fontSize: '11px',
      margin: 0,
    },
  },
});

export const calendarStyles = {
      pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#ffffff',
        height: '100%',
        minHeight: '600px',
      },
  filterButtonContainer: {
    paddingLeft: '1rem',
  },
  calendarWrapper: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  calendar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    '.fc-daygrid-event': {
      div: {
        color: COLORS.p06,
        backgroundColor: 'var(--fc-event-bg-color)',
        borderColor: 'var(--fc-event-border-color)',
      },
    },
    '.fc-media-screen': {
      width: '100%',
    },
    '.fc-daygrid-day-number': {
      color: '#4A90E2', // Light blue color for day numbers
      fontWeight: 'normal',
      position: 'absolute',
      top: '4px',
      right: '8px',
      fontSize: '14px',
    },
    '.fc-daygrid-day': {
      backgroundColor: 'transparent',
      position: 'relative',
    },
        '.fc-day-today': {
          backgroundColor: 'rgba(15, 40, 255, 0.1)', // Highlight today with theme color
        },
        '.fc-daygrid-more-link': {
          color: '#4A90E2',
          fontSize: '12px',
          fontWeight: 500,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
            color: '#357ABD',
          },
        },
    '.fc-event-main': {
      overflow: 'hidden',
      backgroundColor: 'transparent',
    },
    '.fc-daygrid-event': {
      margin: '1px 0',
      borderRadius: '3px',
      fontSize: '12px',
      fontWeight: '600',
      padding: '2px 4px',
    },
    '.fc-daygrid-event-harness': {
      margin: '1px 0',
    },
    '.fc-list-event': {
      '&:hover': {
        td: {
          backgroundColor: 'var(--fc-page-bg-color) !important',
        },
        a: {
          textDecoration: 'none !important',
        },
      },
      a: {
        color: COLORS.s18,
        fontWeight: 600,
        margin: '0px',
      },
      '.fc-list-event-time': {
        fontWeight: 400,
      },
      '.fc-list-event-title': {
        backgroundColor: 'white',
      },
    },
    '.fc-list-day': {
      th: {
        borderBottom: '0px',
      },
      '.fc-list-day-cushion': {
        backgroundColor: 'var(--fc-page-bg-color)',
      },
      a: {
        fontWeight: 400,
      },
    },
    '.fc-col-header-cell': {
      a: {
        color: '#333333', // Dark text for day headers
        fontWeight: 500,
      },
    },
      '.fc': {
        background: '#ffffff', // White background
      '.fc-scrollgrid': {
        borderTop: '0px',
        borderLeft: '0px',
        border: '0px', // No border
        '.fc-scrollgrid-sync-table': {
          borderLeft: '1px solid #e0e0e0',
        },
        th: {
          borderRightWidth: '0px',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#ffffff',
        },
        td: {
          borderRight: '1px solid #e0e0e0',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#ffffff',
        },
      },
      '.fc-col-header-cell': {
        borderRight: '0px',
        borderLeft: '0px',
      },
      '.fc-list-empty': {
        background: '#1C2226',
      },
      '.fc-toolbar': {
        '&.fc-header-toolbar': {
          margin: '15px 0',
          color: '#ffffff', // White text for toolbar
        },
        '.fc-toolbar-title': {
          color: '#ffffff', // White text for month/year title
          fontSize: '1.5rem',
          fontWeight: 'bold',
        },
      },
      '.fc-prev-button, .fc-next-button': {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: '#0F28FF', // Theme primary color
        fontSize: '14px',
        fontWeight: 600,
        height: '36px',
        margin: '0',
        padding: '0',
        width: '45px',
        '&:active': {
          background: '#0F28FF',
          borderColor: '#0F28FF',
          color: '#ffffff',
        },
        '.fc-icon': {
          fontFamily: "'kitman' !important",
        },
        '&.fc-prev-button': {
          '.fc-icon': {
            '&:before': {
              content: "'\\e913'",
            },
          },
        },
        '&.fc-next-button': {
          '.fc-icon': {
            '&:before': {
              content: "'\\e904'",
            },
          },
        },
      },
      [`
      .fc-dayGridMonth-button,
      .fc-timeGridWeek-button,
      .fc-timeGridDay-button,
      .fc-listWeek-button,
      .fc-today-button
      `]: {
        background: '#0F28FF', // Theme primary color
        borderColor: '#0F28FF',
        borderRadius: '0.25em !important',
        color: '#ffffff',
        height: '36px',
        margin: '0 10.5px',
        padding: '0 15px',
        [`
        &:hover,
        &:focus
        `]: {
          background: '#0e478a',
          borderColor: '#0e478a',
          color: '#ffffff',
          cursor: 'pointer',
        },
        '&.fc-button-active': {
          background: '#0e478a',
          borderColor: '#0e478a',
          color: '#ffffff',
        },
        [`
        &.fc-button-active,
        &:active,
        &:active
        `]: {
          '&:focus': {
            background: '#0e478a',
            borderColor: `#0e478a !important`,
            color: '#ffffff',
          },
        },
        [`
        &.disabled,
        &[disabled]
        `]: {
          background: '#333333',
          borderColor: '#333333',
          color: '#666666',
          cursor: 'default',
          opacity: 1,
        },
      },
      '.fc-timegrid-slot': {
        height: '2.4em',
        borderBottom: '0 !important',
      },
      '.fc-time-grid': {
        '.fc-slats': {
          td: {
            height: '2.4em',
          },
        },
      },
      '.fc-event': {
        fontWeight: 600,
        lineHeight: 1.3,
      },
      '.fc-day-header': {
        borderWidth: '0',
      },
      '.fc-head-container': {
        borderWidth: '0',
      },
      '.fc-axis': {
        '&.fc-widget-header': {
          borderWidth: '0',
        },
      },
      '.fc-listWeek-view': {
        td: {
          border: '0',
        },
        '.fc-list-heading': {
          borderTop: `1px solid ${COLORS.neutral_300}`,
          '&:first-of-type': {
            borderTop: '0',
          },
          '.fc-widget-header': {
            background: 'none',
            borderColor: 'transparent',
            padding: '15px',
          },
          '.fc-list-heading-main': {
            display: 'inline-block',
            fontWeight: 'normal',
            paddingRight: '5px',
            textTransform: 'uppercase',
            '&:after': {
              content: "','",
            },
          },
          '.fc-list-heading-alt': {
            display: 'inline-block',
            cssFloat: 'left',
            fontWeight: 'normal',
            textTransform: 'uppercase',
          },
        },
        '.fc-list-item': {
          display: 'block',
          padding: '10px 15px 10px 30px',
          position: 'relative',
          '&:hover': {
            td: {
              background: 'none',
            },
          },
          '.fc-list-item-time': {
            display: 'inline-block',
            overflow: 'hidden',
            padding: '0 15px',
            width: 'auto',
          },
          '.fc-list-item-marker': {
            display: 'inline-block',
            left: '15px',
            overflow: 'hidden',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'auto',
          },
          '.fc-list-item-title': {
            display: 'inline-block',
            overflow: 'hidden',
            width: 'auto',
            a: {
              color: COLORS.s18,
              fontWeight: 600,
              '&:hover': {
                color: COLORS.s18,
                textDecoration: 'none',
              },
            },
          },
        },
      },
    },
    '.calendar__columnHeaderDay': {
      display: 'block',
      fontSize: '12px',
      fontWeight: 'normal',
      marginBottom: '5px',
      color: COLORS.s18,
    },
    '.calendar__columnHeaderDate': {
      display: 'block',
      fontSize: '20px',
      fontWeight: 'normal',
      marginBottom: '15px',
      color: COLORS.s18,
    },
  },
};
