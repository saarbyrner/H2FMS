import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper
} from '@mui/material'
import {
  AssessmentOutlined,
  GroupOutlined,
  PersonOutlined
} from '@mui/icons-material'

function ReportsPage() {
  const [reportType, setReportType] = useState('squad')

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Nutrition Reports
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comprehensive nutrition performance reports for squads and individual soldiers
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AssessmentOutlined />}
          sx={{ textTransform: 'none' }}
        >
          Export Report
        </Button>
      </Box>

      {/* Controls */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2, 
          mb: 3, 
          border: '1px solid var(--color-border-primary)',
          borderRadius: 'var(--radius-md)'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                label="Report Type"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="squad">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GroupOutlined sx={{ fontSize: 16 }} />
                    Squad Reports
                  </Box>
                </MenuItem>
                <MenuItem value="individual">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonOutlined sx={{ fontSize: 16 }} />
                    Individual Reports
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Placeholder content */}
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          Nutrition Reports Coming Soon
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This section will contain detailed nutrition performance reports for squads and individual soldiers
        </Typography>
      </Box>
    </Box>
  )
}

export default ReportsPage