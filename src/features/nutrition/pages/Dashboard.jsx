import React, { useState } from 'react'
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Container
} from '@mui/material'
import { SoldiersTab } from '../components'
import PlansPage from './Plans'
import ReportsPage from './Reports'
import '../styles/nutrition.css'

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nutrition-tabpanel-${index}`}
      aria-labelledby={`nutrition-tab-${index}`}
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

function NutritionDashboard() {
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
            <Tab label="Plans" />
            <Tab label="Reports" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <SoldiersTab />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <PlansPage />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <ReportsPage />
        </TabPanel>
      </Paper>
    </Container>
  )
}

export default NutritionDashboard