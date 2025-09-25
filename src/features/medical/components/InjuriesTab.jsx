import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack
} from '@mui/material'

function InjuriesTab() {
  // Mock injury data
  const injuries = [
    {
      id: 1,
      soldierName: 'Marcus Johnson',
      injuryType: 'Knee Strain',
      severity: 'Moderate',
      dateReported: '2024-01-14',
      status: 'Active',
      estimatedRecovery: '2-3 weeks'
    },
    {
      id: 2,
      soldierName: 'David Chen',
      injuryType: 'Concussion',
      severity: 'Severe',
      dateReported: '2024-01-12',
      status: 'Active',
      estimatedRecovery: '4-6 weeks'
    },
    {
      id: 3,
      soldierName: 'Alex Rodriguez',
      injuryType: 'Ankle Sprain',
      severity: 'Mild',
      dateReported: '2024-01-10',
      status: 'Recovering',
      estimatedRecovery: '1-2 weeks'
    },
    {
      id: 4,
      soldierName: 'James Wilson',
      injuryType: 'Shoulder Impingement',
      severity: 'Moderate',
      dateReported: '2024-01-07',
      status: 'Active',
      estimatedRecovery: '3-4 weeks'
    },
    {
      id: 5,
      soldierName: 'Michael Brown',
      injuryType: 'Fractured Wrist',
      severity: 'Severe',
      dateReported: '2024-01-05',
      status: 'Active',
      estimatedRecovery: '6-8 weeks'
    },
    {
      id: 6,
      soldierName: 'Robert Davis',
      injuryType: 'Back Strain',
      severity: 'Mild',
      dateReported: '2024-01-03',
      status: 'Recovering',
      estimatedRecovery: '1-2 weeks'
    }
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Mild': return 'success'
      case 'Moderate': return 'warning'
      case 'Severe': return 'error'
      default: return 'default'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'error'
      case 'Recovering': return 'warning'
      case 'Resolved': return 'success'
      default: return 'default'
    }
  }

  return (
    <Box>
      {/* Summary Cards */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Paper 
          elevation={0}
          sx={{
            p: 2,
            flex: 1,
            border: '1px solid var(--color-border-primary)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <Typography variant="h6" sx={{ color: 'var(--color-error)', fontWeight: 'bold' }}>
            {injuries.filter(i => i.status === 'Active').length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Active Injuries
          </Typography>
        </Paper>
        <Paper 
          elevation={0}
          sx={{
            p: 2,
            flex: 1,
            border: '1px solid var(--color-border-primary)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <Typography variant="h6" sx={{ color: 'var(--color-warning)', fontWeight: 'bold' }}>
            {injuries.filter(i => i.status === 'Recovering').length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Recovering
          </Typography>
        </Paper>
        <Paper 
          elevation={0}
          sx={{
            p: 2,
            flex: 1,
            border: '1px solid var(--color-border-primary)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <Typography variant="h6" sx={{ color: 'var(--color-success)', fontWeight: 'bold' }}>
            {injuries.filter(i => i.status === 'Resolved').length}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Resolved
          </Typography>
        </Paper>
      </Stack>

      {/* Injuries Table */}
      <Paper 
        elevation={0}
        sx={{
          border: '1px solid var(--color-border-primary)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden'
        }}
      >
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'var(--color-background-secondary)' }}>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 150
                  }}
                >
                  Soldier
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 150
                  }}
                >
                  Injury Type
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 100
                  }}
                >
                  Severity
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 120
                  }}
                >
                  Date Reported
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 100
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 120
                  }}
                >
                  Est. Recovery
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {injuries.map((injury) => (
                <TableRow 
                  key={injury.id} 
                  hover
                  sx={{
                    height: 64,
                    '&:hover': {
                      backgroundColor: 'var(--color-background-secondary)'
                    }
                  }}
                >
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)',
                      height: 64,
                      py: 1
                    }}
                  >
                    {injury.soldierName}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)',
                      height: 64,
                      py: 1
                    }}
                  >
                    {injury.injuryType}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)',
                      height: 64,
                      py: 1
                    }}
                  >
                    <Chip 
                      label={injury.severity}
                      color={getSeverityColor(injury.severity)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)',
                      height: 64,
                      py: 1
                    }}
                  >
                    {new Date(injury.dateReported).toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)',
                      height: 64,
                      py: 1
                    }}
                  >
                    <Chip 
                      label={injury.status}
                      color={getStatusColor(injury.status)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)',
                      height: 64,
                      py: 1
                    }}
                  >
                    {injury.estimatedRecovery}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default InjuriesTab
