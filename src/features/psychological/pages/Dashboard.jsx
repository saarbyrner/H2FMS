import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Container
} from '@mui/material';
import SoldiersTab from '../components/SoldiersTab';
import NotesTab from '../components/NotesTab';
import EvaluationsTab from '../components/EvaluationsTab';
import '../../../styles/design-tokens.css';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`psychological-tabpanel-${index}`}
      aria-labelledby={`psychological-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function PsychologicalDashboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Tabs */}
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
            value={tabValue}
            onChange={handleTabChange}
            aria-label="psychological tabs"
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
            <Tab label="Soldiers" id="psychological-tab-0" aria-controls="psychological-tabpanel-0" />
            <Tab label="Notes" id="psychological-tab-1" aria-controls="psychological-tabpanel-1" />
            <Tab label="Evaluations" id="psychological-tab-2" aria-controls="psychological-tabpanel-2" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <SoldiersTab />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <NotesTab />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <EvaluationsTab />
        </TabPanel>
      </Paper>
    </Container>
  );
}
