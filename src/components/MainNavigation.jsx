import React, { useState, useEffect } from 'react'
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
  PsychologyOutlined,
  FolderOutlined
} from '@mui/icons-material'
import '../styles/design-tokens.css'

// Icon mapping for navigation items
const iconMap = {
  soldiers: PeopleOutlined,
  physical: FitnessCenterOutlined,
  medical: LocalHospitalOutlined,
  nutrition: RestaurantOutlined,
  psychological: PsychologyOutlined,
  analysis: AnalyticsOutlined,
  calendar: CalendarMonthOutlined,
  forms: AssignmentOutlined,
  media: FolderOutlined
}

// Path mapping for navigation items
const pathMap = {
  soldiers: '/soldier',
  physical: '/physical',
  medical: '/medical',
  nutrition: '/nutrition',
  psychological: '/psychological',
  analysis: '/analysis',
  calendar: '/planning',
  forms: '/questionnaires',
  media: '/media'
}

// Default navigation configuration
const defaultNavConfig = {
  sections: {
    primary: {
      name: 'Primary',
      items: {
        soldiers: { label: 'Soldiers', visible: true }
      }
    },
    secondary: {
      name: 'Secondary',
      items: {
        physical: { label: 'Physical', visible: true },
        medical: { label: 'Medical', visible: true },
        nutrition: { label: 'Nutrition', visible: true },
        psychological: { label: 'Psychological', visible: true }
      }
    },
    tertiary: {
      name: 'Tertiary',
      items: {
        analysis: { label: 'Analysis', visible: true },
        calendar: { label: 'Calendar', visible: true },
        forms: { label: 'Forms', visible: true },
        media: { label: 'Media', visible: true }
      }
    }
  }
}

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
  const [navConfig, setNavConfig] = useState(defaultNavConfig)

  // Load configuration from localStorage on mount with migration
  useEffect(() => {
    const savedConfig = localStorage.getItem('navConfig')
    const configVersion = localStorage.getItem('navConfigVersion')
    const currentVersion = '2.0' // Increment this when structure changes
    
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig)
      
      // Migration: Update old structure to new Primary/Secondary/Tertiary structure
      if (parsedConfig.sections?.main || parsedConfig.sections?.soldiers || configVersion !== currentVersion) {
        const migratedConfig = {
          sections: {
            primary: {
              name: 'Primary',
              items: {}
            },
            secondary: {
              name: 'Secondary', 
              items: {}
            },
            tertiary: {
              name: 'Tertiary',
              items: {}
            }
          }
        }
        
        // Migrate items from any existing structure
        const allItems = {}
        
        // Collect all items from all possible sections (old and new)
        Object.values(parsedConfig.sections || {}).forEach(section => {
          if (section.items) {
            Object.assign(allItems, section.items)
          }
        })
        
        // Ensure we have all default items, even if they weren't in the old config
        const defaultItems = {
          soldiers: { label: 'Soldiers', visible: true },
          physical: { label: 'Physical', visible: true },
          medical: { label: 'Medical', visible: true },
          nutrition: { label: 'Nutrition', visible: true },
          psychological: { label: 'Psychological', visible: true },
          analysis: { label: 'Analysis', visible: true },
          calendar: { label: 'Calendar', visible: true },
          forms: { label: 'Forms', visible: true },
          media: { label: 'Media', visible: true }
        }
        
        // Merge existing items with defaults (existing items take precedence)
        Object.keys(defaultItems).forEach(key => {
          if (!allItems[key]) {
            allItems[key] = defaultItems[key]
          }
        })
        
        // Distribute items to new sections based on default structure
        const primaryItems = ['soldiers']
        const secondaryItems = ['physical', 'medical', 'nutrition', 'psychological']
        const tertiaryItems = ['analysis', 'calendar', 'forms', 'media']
        
        primaryItems.forEach(key => {
          if (allItems[key]) {
            migratedConfig.sections.primary.items[key] = allItems[key]
          }
        })
        
        secondaryItems.forEach(key => {
          if (allItems[key]) {
            migratedConfig.sections.secondary.items[key] = allItems[key]
          }
        })
        
        tertiaryItems.forEach(key => {
          if (allItems[key]) {
            migratedConfig.sections.tertiary.items[key] = allItems[key]
          }
        })
        
        setNavConfig(migratedConfig)
        localStorage.setItem('navConfig', JSON.stringify(migratedConfig))
        localStorage.setItem('navConfigVersion', currentVersion)
      } else {
        setNavConfig(parsedConfig)
      }
    }
  }, [])

  // Listen for custom navigation config changes
  useEffect(() => {
    const handleNavConfigChange = () => {
      const savedConfig = localStorage.getItem('navConfig')
      if (savedConfig) {
        setNavConfig(JSON.parse(savedConfig))
      }
    }

    // Listen for both storage events (cross-tab) and custom events (same-tab)
    window.addEventListener('storage', handleNavConfigChange)
    window.addEventListener('navConfigChanged', handleNavConfigChange)
    
    return () => {
      window.removeEventListener('storage', handleNavConfigChange)
      window.removeEventListener('navConfigChanged', handleNavConfigChange)
    }
  }, [])

  const handleItemClick = (path) => {
    navigate(path)
  }

  const renderNavItem = (itemId, item, isCollapsed = false) => {
    const isActive = location.pathname === pathMap[itemId]
    const IconComponent = iconMap[itemId]

    return (
      <ListItem 
        key={itemId} 
        disablePadding 
        sx={{ display: 'block' }}
      >
        <Tooltip 
          title={isCollapsed ? item.label : ''} 
          placement="right"
          disableHoverListener={!isCollapsed}
        >
          <ListItemButton
            onClick={() => handleItemClick(pathMap[itemId])}
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

  const renderDivider = (key) => (
    <ListItem 
      key={key} 
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
          {Object.entries(navConfig.sections).map(([sectionKey, section], sectionIndex) => {
            const visibleItems = Object.entries(section.items).filter(([_, item]) => item.visible)
            
            if (visibleItems.length === 0) return null

            return (
              <React.Fragment key={sectionKey}>
                {sectionIndex > 0 && renderDivider(`divider-${sectionIndex}`)}
                {visibleItems.map(([itemId, item]) => renderNavItem(itemId, item, !isOpen))}
              </React.Fragment>
            )
          })}
        </List>
      </Box>

      {/* Bottom Items */}
      <Box>
        <List sx={{ py: 0.5 }}>
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.path
            const IconComponent = item.icon

            return (
              <ListItem 
                key={item.id} 
                disablePadding 
                sx={{ display: 'block' }}
              >
                <Tooltip 
                  title={!isOpen ? item.label : ''} 
                  placement="right"
                  disableHoverListener={isOpen}
                >
                  <ListItemButton
                    onClick={() => handleItemClick(item.path)}
                    sx={{
                      height: 40,
                      justifyContent: !isOpen ? 'center' : 'initial',
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
                        mr: !isOpen ? 0 : 2,
                        justifyContent: 'center',
                        color: 'inherit'
                      }}
                    >
                      <IconComponent sx={{ fontSize: 20 }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label}
                      sx={{ 
                        opacity: !isOpen ? 0 : 1,
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
          })}
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