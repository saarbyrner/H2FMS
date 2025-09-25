import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import H2FWordmarkLogo from '/assets/logos/teams/h2fms/icon-app-itunes-1024x1024 wordmark.png'
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  LocalHospitalOutlined,
  AnalyticsOutlined,
  PeopleOutlined,
  FitnessCenterOutlined,
  AssignmentOutlined,
  CalendarMonthOutlined,
  HistoryOutlined,
  SettingsOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
  RestaurantOutlined,
  PsychologyOutlined
} from '@mui/icons-material'
import '../styles/design-tokens.css'

// Navigation items configuration
const navigationItems = [
  { 
    id: 'soldiers', 
    label: 'Soldiers', 
    icon: PeopleOutlined, 
    path: '/soldier',
    section: 'main'
  },
  { 
    id: 'divider-1', 
    label: '', 
    icon: null, 
    path: '',
    section: 'divider'
  },
  { 
    id: 'physical', 
    label: 'Physical', 
    icon: FitnessCenterOutlined, 
    path: '/physical',
    section: 'main'
  },
  { 
    id: 'medical', 
    label: 'Medical', 
    icon: LocalHospitalOutlined, 
    path: '/medical',
    section: 'main'
  },
  { 
    id: 'nutrition', 
    label: 'Nutrition', 
    icon: RestaurantOutlined,
    path: '/nutrition',
    section: 'main'
  },
  { 
    id: 'psychological', 
    label: 'Psychological', 
    icon: PsychologyOutlined,
    path: '/psychological',
    section: 'main'
  },
  { 
    id: 'divider-2', 
    label: '', 
    icon: null, 
    path: '',
    section: 'divider'
  },
  { 
    id: 'analysis', 
    label: 'Analysis', 
    icon: AnalyticsOutlined, 
    path: '/analysis',
    section: 'main'
  },
  { 
    id: 'calendar', 
    label: 'Calendar', 
    icon: CalendarMonthOutlined, 
    path: '/planning',
    section: 'main'
  },
  { 
    id: 'forms', 
    label: 'Forms', 
    icon: AssignmentOutlined, 
    path: '/questionnaires',
    section: 'main'
  }
]

const bottomItems = [
  { 
    id: 'settings', 
    label: 'Settings', 
    icon: SettingsOutlined, 
    path: '/settings'
  }
]

const DRAWER_WIDTH = 240
const DRAWER_WIDTH_COLLAPSED = 60

function MainNavigation({ 
  isOpen = true, 
  onToggle, 
  variant = 'permanent',
  ...props 
}) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleItemClick = (path) => {
    navigate(path)
  }

  const renderNavItem = (item, isCollapsed = false) => {
    // Handle divider items
    if (item.section === 'divider') {
      return (
        <ListItem 
          key={item.id} 
          disablePadding 
          sx={{ display: 'block' }}
        >
          <Box
            sx={{
              height: 1.5,
              backgroundColor: 'rgba(33, 33, 33, 0.9)',
              mx: 2,
              my: 1
            }}
          />
        </ListItem>
      )
    }

    const isActive = location.pathname === item.path
    const IconComponent = item.icon

    return (
      <ListItem 
        key={item.id} 
        disablePadding 
        sx={{ display: 'block' }}
      >
        <Tooltip 
          title={isCollapsed ? item.label : ''} 
          placement="right"
          disableHoverListener={!isCollapsed}
        >
          <ListItemButton
            onClick={() => handleItemClick(item.path)}
            sx={{
              height: 40,
              justifyContent: isCollapsed ? 'center' : 'initial',
              pl: 2,
              py: 0.5,
              ml: 1, mr: 0,
              mb: 0.25,
              position: 'relative',
              backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
              color: '#ffffff',
              '&::before': isActive ? {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '3px',
                backgroundColor: '#FFCC02',
                borderRadius: '0 2px 2px 0'
              } : {},
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? 0 : 2,
                justifyContent: 'center',
                color: 'inherit'
              }}
            >
              <IconComponent sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              sx={{ 
                opacity: isCollapsed ? 0 : 1,
                '& .MuiTypography-root': {
                  fontSize: '14px',
                  fontWeight: 400,
                  textTransform: 'none'
                }
              }} 
            />
          </ListItemButton>
        </Tooltip>
      </ListItem>
    )
  }

  const drawerContent = (
    <Box
      sx={{
        width: isOpen ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
        height: '100vh',
        background: 'linear-gradient(180deg, #000000 0%, #111111 40%, #000000 70%, #161616 90%, #181818 100%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header with Logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isOpen ? 'flex-start' : 'center',
          p: 2,
          minHeight: 32
        }}
      >
        <Box
          sx={{
            width: isOpen ? 'auto' : 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={H2FWordmarkLogo}
            alt="H2F Wordmark Logo"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </Box>
      </Box>

      {/* Main Navigation Items */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ py: 0.5 }}>
          {navigationItems.map((item) => renderNavItem(item, !isOpen))}
        </List>
      </Box>

      {/* Bottom Items */}
      <Box>
        <List sx={{ py: 0.5 }}>
          {bottomItems.map((item) => renderNavItem(item, !isOpen))}
        </List>
        
        {/* Collapse/Expand Button - Only at bottom, left aligned */}
        <Box sx={{ p: 1, textAlign: 'left', pl: 2 }}>
          <IconButton
            onClick={onToggle}
            sx={{ 
              color: '#9ca3af',
              '&:hover': { color: '#ffffff' },
              p: 0.5
            }}
          >
            {isOpen ? <ChevronLeftOutlined /> : <ChevronRightOutlined />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  )

  return (
    <Drawer
      variant={variant}
      open={isOpen}
      onClose={onToggle}
      sx={{
        width: isOpen ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
        flexShrink: 0,
        mr: 0,
        '& .MuiDrawer-paper': {
          marginRight: 0,

          width: isOpen ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
          boxSizing: 'border-box',
          border: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          transition: 'none'
        }
      }}
      {...props}
    >
      {drawerContent}
    </Drawer>
  )
}

MainNavigation.propTypes = {
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  variant: PropTypes.oneOf(['permanent', 'persistent', 'temporary'])
}

export default MainNavigation