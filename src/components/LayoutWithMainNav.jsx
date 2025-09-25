import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Select,
  CssBaseline
} from '@mui/material'
import { 
  Notifications
} from '@mui/icons-material'
import MainNavigation from './MainNavigation'
import '../styles/design-tokens.css'

// Mock current user data
const currentUser = {
  name: 'Dr. Sarah Mitchell',
  email: 'sarah.mitchell@example.com',
  role: 'Sports Medicine Director',
  avatar: '👩‍⚕️'
}

// Mock squad data
const availableSquads = [
  { id: 1, name: 'Battalion 1', short: 'B1' },
  { id: 2, name: 'Battalion 2', short: 'B2' },
  { id: 3, name: 'Battalion 3', short: 'B3' },
  { id: 4, name: 'Company 1', short: 'C1' },
  { id: 5, name: 'Company 1.2', short: 'C1.2' },
  { id: 6, name: 'Company 1.3', short: 'C1.3' },
  { id: 7, name: 'Company 2.1', short: 'C2.1' },
  { id: 8, name: 'Company 2.2', short: 'C2.2' },
  { id: 9, name: 'Company 2.3', short: 'C2.3' },
  { id: 10, name: 'Company 3.1', short: 'C3.1' },
  { id: 11, name: 'Company 3.2', short: 'C3.2' },
  { id: 12, name: 'Company 3.3', short: 'C3.3' }
]

// Page titles mapping
const pageTitles = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/medical': 'Medical',
  '/analysis': 'Analysis',
  '/soldier': 'Soldiers',
  '/physical': 'Physical',
  '/psychological': 'Psychological',
  '/questionnaires': 'Forms',
  '/planning': 'Calendar',
  '/nutrition': 'Nutrition',
  '/nutrition/create': 'Plan Builder',
  '/nutrition/templates': 'Templates',
  '/media': 'Media',
  '/activity': 'Activity log',
  '/settings': 'Settings',
  '/help': 'Help'
}

function MedinahLayoutWithMainNav({ children }) {
  const location = useLocation()
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [currentSquad, setCurrentSquad] = useState(availableSquads[0])
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)

  const getPageTitle = () => {
    return pageTitles[location.pathname] || 'Dashboard'
  }

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen)
  }

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const handleSquadChange = (event) => {
    const squad = availableSquads.find(s => s.id === event.target.value)
    setCurrentSquad(squad)
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', gap: 0, height: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Main Navigation */}
      <MainNavigation 
        isOpen={isNavOpen}
        onToggle={handleNavToggle}
        variant="permanent"
      />

      {/* Main Content Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Top App Bar */}
        <AppBar 
          position="sticky" 
          elevation={1}
          sx={{ 
            bgcolor: '#ffffff',
            color: '#333333',
            borderBottom: '1px solid #e0e0e0',
            boxShadow: 'none',
            minHeight: '50px'
          }}
        >
          <Toolbar sx={{ 
            justifyContent: 'space-between',
            minHeight: '50px !important',
            alignItems: 'center'
          }}>
            {/* Page Title */}
            <Typography 
              variant="h6" 
              component="h1"
              sx={{ 
                fontWeight: 600,
                fontSize: '16px',
                color: '#666666',
                textTransform: 'none'
              }}
            >
              {getPageTitle()}
            </Typography>

            {/* Right Side Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Squad Selector */}
              <Select
                value={currentSquad.id}
                onChange={handleSquadChange}
                displayEmpty
                size="small"
                sx={{ 
                  fontSize: '14px',
                  minWidth: 160,
                  backgroundColor: '#ffffff',
                  border: 'none',
                  boxShadow: 'none',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '& .MuiSelect-select': {
                    py: 1,
                    px: 2
                  }
                }}
              >
                {availableSquads.map(squad => (
                  <MenuItem key={squad.id} value={squad.id}>
                    {squad.name}
                  </MenuItem>
                ))}
              </Select>

              {/* Notifications */}
              <IconButton 
                sx={{ 
                  color: 'var(--color-text-secondary)',
                  '&:hover': { 
                    bgcolor: 'rgba(0, 0, 0, 0.04)' 
                  }
                }}
              >
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>

              {/* User Menu */}
              <Avatar 
                onClick={handleUserMenuOpen}
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: 'var(--color-primary)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'var(--color-primary-hover)'
                  }
                }}
              >
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </Avatar>

              {/* User Dropdown Menu */}
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleUserMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
                <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box 
          sx={{ 
            flex: 1, 
            overflow: 'auto',
            p: 0,
            bgcolor: 'var(--color-background-secondary)'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default MedinahLayoutWithMainNav