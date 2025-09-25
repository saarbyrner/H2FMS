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
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import {
  SearchOutlined,
  ExpandMoreOutlined,
  MedicalServicesOutlined,
  LocalHospitalOutlined,
  MedicationOutlined
} from '@mui/icons-material'

function MedicalRecordsTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [recordTypeFilter, setRecordTypeFilter] = useState('all')

  // Mock medical records data
  const medicalRecords = [
    {
      id: 1,
      soldierName: 'Marcus Johnson',
      recordType: 'Physical Exam',
      date: '2024-01-15',
      provider: 'Dr. Sarah Williams',
      status: 'Completed',
      notes: 'Annual physical examination completed. All vitals normal. Blood pressure 120/80, heart rate 65 bpm.',
      attachments: ['lab_results.pdf', 'xray_chest.jpg']
    },
    {
      id: 2,
      soldierName: 'David Chen',
      recordType: 'Injury Assessment',
      date: '2024-01-14',
      provider: 'Dr. Michael Brown',
      status: 'Active',
      notes: 'Knee strain from training. Recommend rest and physical therapy. Follow-up in 2 weeks.',
      attachments: ['mri_knee.pdf']
    },
    {
      id: 3,
      soldierName: 'Alex Rodriguez',
      recordType: 'Vaccination',
      date: '2024-01-13',
      provider: 'Nurse Jennifer Lee',
      status: 'Completed',
      notes: 'Annual flu vaccination administered. No adverse reactions observed.',
      attachments: ['vaccination_record.pdf']
    },
    {
      id: 4,
      soldierName: 'James Wilson',
      recordType: 'Follow-up',
      date: '2024-01-12',
      provider: 'Dr. Sarah Williams',
      status: 'Completed',
      notes: 'Follow-up for concussion protocol. Patient showing good progress. Cleared for light duty.',
      attachments: ['neurological_assessment.pdf']
    },
    {
      id: 5,
      soldierName: 'Michael Brown',
      recordType: 'Emergency Visit',
      date: '2024-01-11',
      provider: 'Dr. Robert Davis',
      status: 'Active',
      notes: 'Emergency visit for severe allergic reaction. Treated with epinephrine. Recommend allergy testing.',
      attachments: ['emergency_report.pdf', 'allergy_test_results.pdf']
    }
  ]

  const getRecordTypeIcon = (type) => {
    switch (type) {
      case 'Physical Exam': return <MedicalServicesOutlined />
      case 'Injury Assessment': return <LocalHospitalOutlined />
      case 'Vaccination': return <MedicationOutlined />
      case 'Follow-up': return <MedicalServicesOutlined />
      case 'Emergency Visit': return <LocalHospitalOutlined />
      default: return <MedicalServicesOutlined />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success'
      case 'Active': return 'warning'
      case 'Pending': return 'default'
      default: return 'default'
    }
  }

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = 
      record.soldierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.recordType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.provider.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = recordTypeFilter === 'all' || record.recordType === recordTypeFilter
    
    return matchesSearch && matchesType
  })

  return (
    <Box>
      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          variant="filled"
          size="small"
          placeholder="Search records..."
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
        
        <FormControl variant="filled" size="small" sx={{ minWidth: 150 }}>
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
            Record Type
          </InputLabel>
          <Select
            value={recordTypeFilter}
            label="Record Type"
            onChange={(e) => setRecordTypeFilter(e.target.value)}
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
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="Physical Exam">Physical Exam</MenuItem>
            <MenuItem value="Injury Assessment">Injury Assessment</MenuItem>
            <MenuItem value="Vaccination">Vaccination</MenuItem>
            <MenuItem value="Follow-up">Follow-up</MenuItem>
            <MenuItem value="Emergency Visit">Emergency Visit</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Medical Records List */}
      <Stack spacing={2}>
        {filteredRecords.map((record) => (
          <Paper 
            key={record.id}
            elevation={0}
            sx={{
              border: '1px solid var(--color-border-primary)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden'
            }}
          >
            <Accordion sx={{ boxShadow: 'none' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreOutlined />}
                sx={{
                  backgroundColor: 'var(--color-background-secondary)',
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    gap: 2
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                  {getRecordTypeIcon(record.recordType)}
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontFamily: 'var(--font-family-primary)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      {record.soldierName} - {record.recordType}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'var(--font-family-primary)',
                        color: 'var(--color-text-secondary)'
                      }}
                    >
                      {record.provider} • {new Date(record.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Chip 
                    label={record.status}
                    color={getStatusColor(record.status)}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: 'var(--color-background-primary)' }}>
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontFamily: 'var(--font-family-primary)',
                      color: 'var(--color-text-primary)',
                      mb: 1
                    }}
                  >
                    <strong>Notes:</strong>
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontFamily: 'var(--font-family-primary)',
                      color: 'var(--color-text-primary)',
                      mb: 2
                    }}
                  >
                    {record.notes}
                  </Typography>
                  
                  {record.attachments && record.attachments.length > 0 && (
                    <>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontFamily: 'var(--font-family-primary)',
                          color: 'var(--color-text-primary)',
                          mb: 1
                        }}
                      >
                        <strong>Attachments:</strong>
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {record.attachments.map((attachment, index) => (
                          <Chip
                            key={index}
                            label={attachment}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontFamily: 'var(--font-family-primary)',
                              fontSize: 'var(--font-size-xs)'
                            }}
                          />
                        ))}
                      </Stack>
                    </>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Paper>
        ))}
      </Stack>

      {filteredRecords.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No medical records found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default MedicalRecordsTab
