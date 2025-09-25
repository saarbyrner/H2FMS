import React, { useState } from 'react'
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
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import {
  SearchOutlined,
  AddOutlined,
  MedicationOutlined,
  LocalHospitalOutlined,
  HealingOutlined
} from '@mui/icons-material'

function TreatmentsTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [openDialog, setOpenDialog] = useState(false)

  // Mock treatments data
  const treatments = [
    {
      id: 1,
      soldierName: 'Marcus Johnson',
      treatmentType: 'Physical Therapy',
      description: 'Knee rehabilitation exercises',
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      status: 'Active',
      provider: 'Dr. Sarah Williams',
      frequency: '3x per week',
      progress: 65
    },
    {
      id: 2,
      soldierName: 'David Chen',
      treatmentType: 'Medication',
      description: 'Anti-inflammatory medication for knee strain',
      startDate: '2024-01-14',
      endDate: '2024-01-28',
      status: 'Active',
      provider: 'Dr. Michael Brown',
      frequency: 'Daily',
      progress: 30
    },
    {
      id: 3,
      soldierName: 'Alex Rodriguez',
      treatmentType: 'Rest Protocol',
      description: 'Complete rest for ankle sprain recovery',
      startDate: '2024-01-10',
      endDate: '2024-01-24',
      status: 'Completed',
      provider: 'Dr. Sarah Williams',
      frequency: 'Continuous',
      progress: 100
    },
    {
      id: 4,
      soldierName: 'James Wilson',
      treatmentType: 'Concussion Protocol',
      description: 'Gradual return to activity protocol',
      startDate: '2024-01-12',
      endDate: '2024-02-12',
      status: 'Active',
      provider: 'Dr. Robert Davis',
      frequency: 'Daily monitoring',
      progress: 45
    },
    {
      id: 5,
      soldierName: 'Michael Brown',
      treatmentType: 'Allergy Management',
      description: 'Epinephrine auto-injector training and management',
      startDate: '2024-01-11',
      endDate: 'Ongoing',
      status: 'Active',
      provider: 'Dr. Robert Davis',
      frequency: 'As needed',
      progress: 80
    }
  ]

  const getTreatmentIcon = (type) => {
    switch (type) {
      case 'Physical Therapy': return <HealingOutlined />
      case 'Medication': return <MedicationOutlined />
      case 'Rest Protocol': return <LocalHospitalOutlined />
      case 'Concussion Protocol': return <LocalHospitalOutlined />
      case 'Allergy Management': return <MedicationOutlined />
      default: return <LocalHospitalOutlined />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'warning'
      case 'Completed': return 'success'
      case 'Cancelled': return 'error'
      case 'Pending': return 'default'
      default: return 'default'
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success'
    if (progress >= 50) return 'warning'
    return 'error'
  }

  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = 
      treatment.soldierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.treatmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || treatment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <Box>
      {/* Header with Add Button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: 'var(--font-family-primary)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)'
          }}
        >
          Treatment Plans
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          onClick={() => setOpenDialog(true)}
          sx={{
            fontFamily: 'var(--font-family-primary)',
            fontWeight: 'var(--font-weight-medium)',
            backgroundColor: 'var(--color-primary)',
            '&:hover': {
              backgroundColor: 'var(--color-primary-dark)'
            }
          }}
        >
          Add Treatment
        </Button>
      </Box>

      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          variant="filled"
          size="small"
          placeholder="Search treatments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined sx={{ fontSize: 'var(--icon-size-small)' }} />
              </InputAdornment>
            ),
          }}
          sx={{ 
            minWidth: 250,
            '& .MuiFilledInput-root': {
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-sm)',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--radius-sm)',
              '&:hover': {
                backgroundColor: 'var(--color-background-tertiary)'
              },
              '&.Mui-focused': {
                backgroundColor: 'var(--color-background-primary)',
                boxShadow: '0 0 0 2px var(--color-border-focus)'
              }
            },
            '& .MuiInputBase-input': {
              color: 'var(--color-text-primary)',
              '&::placeholder': {
                color: 'var(--color-text-secondary)',
                opacity: 1
              }
            }
          }}
        />
        
        <FormControl variant="filled" size="small" sx={{ minWidth: 120 }}>
          <InputLabel
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)',
              '&.Mui-focused': {
                color: 'var(--color-primary)'
              }
            }}
          >
            Status
          </InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-sm)',
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--radius-sm)',
              '&:hover': {
                backgroundColor: 'var(--color-background-tertiary)'
              },
              '&.Mui-focused': {
                backgroundColor: 'var(--color-background-primary)',
                boxShadow: '0 0 0 2px var(--color-border-focus)'
              }
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Treatments Table */}
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
                  Treatment Type
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 200
                  }}
                >
                  Description
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
                  Duration
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
                    minWidth: 100
                  }}
                >
                  Progress
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
                  Provider
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTreatments.map((treatment) => (
                <TableRow 
                  key={treatment.id} 
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
                    {treatment.soldierName}
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getTreatmentIcon(treatment.treatmentType)}
                      {treatment.treatmentType}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)',
                      height: 64,
                      py: 1,
                      maxWidth: 200
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{
                        fontFamily: 'var(--font-family-primary)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-primary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                      title={treatment.description}
                    >
                      {treatment.description}
                    </Typography>
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
                    <Typography variant="body2">
                      {new Date(treatment.startDate).toLocaleDateString()} - {treatment.endDate}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {treatment.frequency}
                    </Typography>
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
                      label={treatment.status}
                      color={getStatusColor(treatment.status)}
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
                    <Chip 
                      label={`${treatment.progress}%`}
                      color={getProgressColor(treatment.progress)}
                      size="small"
                      variant="filled"
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
                    {treatment.provider}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {filteredTreatments.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No treatments found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Box>
      )}

      {/* Add Treatment Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontFamily: 'var(--font-family-primary)' }}>
            Add New Treatment
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Treatment form will be implemented here
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>Add Treatment</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TreatmentsTab
