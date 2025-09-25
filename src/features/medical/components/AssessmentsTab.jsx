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
  LinearProgress
} from '@mui/material'
import {
  SearchOutlined,
  AssessmentOutlined,
  HealthAndSafetyOutlined,
  PsychologyOutlined
} from '@mui/icons-material'

function AssessmentsTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [assessmentTypeFilter, setAssessmentTypeFilter] = useState('all')

  // Mock assessment data
  const assessments = [
    {
      id: 1,
      soldierName: 'Marcus Johnson',
      assessmentType: 'Physical Fitness',
      date: '2024-01-15',
      score: 85,
      maxScore: 100,
      status: 'Completed',
      assessor: 'Dr. Sarah Williams',
      notes: 'Excellent physical condition. All metrics within normal range.'
    },
    {
      id: 2,
      soldierName: 'David Chen',
      assessmentType: 'Mental Health',
      date: '2024-01-14',
      score: 72,
      maxScore: 100,
      status: 'Completed',
      assessor: 'Dr. Michael Brown',
      notes: 'Good mental health status. Minor stress indicators noted.'
    },
    {
      id: 3,
      soldierName: 'Alex Rodriguez',
      assessmentType: 'Nutritional',
      date: '2024-01-13',
      score: 90,
      maxScore: 100,
      status: 'Completed',
      assessor: 'Nutritionist Jennifer Lee',
      notes: 'Excellent nutritional status. All biomarkers optimal.'
    },
    {
      id: 4,
      soldierName: 'James Wilson',
      assessmentType: 'Cognitive',
      date: '2024-01-12',
      score: 78,
      maxScore: 100,
      status: 'Completed',
      assessor: 'Dr. Robert Davis',
      notes: 'Good cognitive function. Slight improvement from baseline.'
    },
    {
      id: 5,
      soldierName: 'Michael Brown',
      assessmentType: 'Physical Fitness',
      date: '2024-01-11',
      score: 65,
      maxScore: 100,
      status: 'In Progress',
      assessor: 'Dr. Sarah Williams',
      notes: 'Assessment in progress. Initial results show room for improvement.'
    },
    {
      id: 6,
      soldierName: 'Robert Davis',
      assessmentType: 'Mental Health',
      date: '2024-01-10',
      score: 88,
      maxScore: 100,
      status: 'Completed',
      assessor: 'Dr. Michael Brown',
      notes: 'Excellent mental health. No concerns identified.'
    }
  ]

  const getAssessmentIcon = (type) => {
    switch (type) {
      case 'Physical Fitness': return <HealthAndSafetyOutlined />
      case 'Mental Health': return <PsychologyOutlined />
      case 'Nutritional': return <AssessmentOutlined />
      case 'Cognitive': return <AssessmentOutlined />
      default: return <AssessmentOutlined />
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    return 'error'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success'
      case 'In Progress': return 'warning'
      case 'Pending': return 'default'
      default: return 'default'
    }
  }

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = 
      assessment.soldierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.assessmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.assessor.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = assessmentTypeFilter === 'all' || assessment.assessmentType === assessmentTypeFilter
    
    return matchesSearch && matchesType
  })

  return (
    <Box>
      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          variant="filled"
          size="small"
          placeholder="Search assessments..."
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
            Assessment Type
          </InputLabel>
          <Select
            value={assessmentTypeFilter}
            label="Assessment Type"
            onChange={(e) => setAssessmentTypeFilter(e.target.value)}
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
            <MenuItem value="Physical Fitness">Physical Fitness</MenuItem>
            <MenuItem value="Mental Health">Mental Health</MenuItem>
            <MenuItem value="Nutritional">Nutritional</MenuItem>
            <MenuItem value="Cognitive">Cognitive</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Assessments Table */}
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
                  Assessment Type
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
                  Score
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
                  Date
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
                    minWidth: 150
                  }}
                >
                  Assessor
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAssessments.map((assessment) => (
                <TableRow 
                  key={assessment.id} 
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getAssessmentIcon(assessment.assessmentType)}
                      {assessment.soldierName}
                    </Box>
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
                    {assessment.assessmentType}
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
                    <Box sx={{ minWidth: 100 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {assessment.score}/{assessment.maxScore}
                        </Typography>
                        <Chip 
                          label={`${Math.round((assessment.score / assessment.maxScore) * 100)}%`}
                          color={getScoreColor(assessment.score)}
                          size="small"
                          variant="filled"
                        />
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(assessment.score / assessment.maxScore) * 100}
                        color={getScoreColor(assessment.score)}
                        sx={{ height: 4, borderRadius: 2 }}
                      />
                    </Box>
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
                    {new Date(assessment.date).toLocaleDateString()}
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
                      label={assessment.status}
                      color={getStatusColor(assessment.status)}
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
                    {assessment.assessor}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {filteredAssessments.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No assessments found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default AssessmentsTab
