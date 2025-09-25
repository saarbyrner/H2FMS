import React, { useState } from 'react'
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Container,
  Typography
} from '@mui/material'
import { SoldiersTab, NotesTab, TreatmentsTab } from '../components'
import '../styles/medical.css'

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`medical-tabpanel-${index}`}
      aria-labelledby={`medical-tab-${index}`}
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

function MedicalDashboard() {
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
            variant="scrollable"
            scrollButtons="auto"
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
            <Tab label="Team" />
            <Tab label="Notes" />
            <Tab label="Modifications" />
            <Tab label="Treatments" />
            <Tab label="Diagnostics" />
            <Tab label="Medical Flags" />
            <Tab label="Inactive Athletes" />
            <Tab label="Documents" />
            <Tab label="Daily Status Report" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <SoldiersTab />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <NotesTab />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Modifications Tab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This tab will contain medical modifications and adjustments
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <TreatmentsTab />
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Diagnostics Tab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This tab will contain diagnostic tests and results
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={5}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Medical Flags Tab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This tab will contain medical flags and alerts
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={6}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Inactive Athletes Tab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This tab will contain inactive athletes and their medical status
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={7}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Documents Tab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This tab will contain medical documents and files
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={8}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Daily Status Report Tab
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This tab will contain daily medical status reports
            </Typography>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  )
}

export default MedicalDashboard
