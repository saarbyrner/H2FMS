import React, { useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Container
} from '@mui/material'
import { SoldiersTab } from '../components'
import WorkoutsPage from './Workouts'
import PlansPage from './Plans'
import '../styles/physical.css'

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`physical-tabpanel-${index}`}
      aria-labelledby={`physical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

function PhysicalDashboard() {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>

      <Paper 
        elevation={0}
        sx={{
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border-primary)',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                minHeight: 48,
                color: 'var(--color-text-secondary)',
                '&.Mui-selected': {
                  color: 'var(--color-primary)'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'var(--color-primary)',
                height: 3
              }
            }}
          >
            <Tab label="Soldiers" />
            <Tab label="Workouts" />
            <Tab label="Plans" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <SoldiersTab />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <WorkoutsPage />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <PlansPage />
        </TabPanel>
      </Paper>
    </Container>
  )
}

export default PhysicalDashboard
