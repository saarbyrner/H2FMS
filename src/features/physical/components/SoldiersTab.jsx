import React, { useState, useMemo } from 'react'
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
  Stack
} from '@mui/material'
import {
  SearchOutlined
} from '@mui/icons-material'
import { PlayerAvatar } from '../../../components'
import soldiersData from '../../../data/soldiers.json'
import physicalAssessmentsData from '../../../data/physical_assessments.json'

// Mock squad data - same as in LayoutWithMainNav
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

function SoldiersTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [squadFilter, setSquadFilter] = useState('all')

  // Filter soldiers based on search and filters
  const filteredSoldiers = useMemo(() => {
    return soldiersData.filter(soldier => {
      const matchesSearch = 
        soldier.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        soldier.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        soldier.alias.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'healthy' && soldier.injury_status === 'Healthy') ||
        (statusFilter === 'injured' && soldier.injury_status !== 'Healthy')
      
      const matchesSquad = squadFilter === 'all' || soldier.squad_name === squadFilter
      
      return matchesSearch && matchesStatus && matchesSquad
    })
  }, [searchTerm, statusFilter, squadFilter])

  // Get physical assessment data for soldier
  const getPhysicalAssessment = (soldierId) => {
    return physicalAssessmentsData.find(assessment => assessment.soldier_id === soldierId) || {
      strength_score: 0,
      speed_score: 0,
      endurance_score: 0,
      flexibility_score: 0,
      last_assessment: null,
      overall_score: 0
    }
  }

  // Get status color based on score
  const getStatusColor = (score) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    return 'error'
  }

  // Get status text based on score
  const getStatusText = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    return 'Needs improvement'
  }

  return (
    <Box>
      {/* Filters */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          variant="filled"
          size="small"
          placeholder="Search soldiers..."
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
            <MenuItem value="healthy">Healthy</MenuItem>
            <MenuItem value="injured">Injured</MenuItem>
          </Select>
        </FormControl>

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
            Squad
          </InputLabel>
          <Select
            value={squadFilter}
            label="Squad"
            onChange={(e) => setSquadFilter(e.target.value)}
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
            {availableSquads.map(squad => (
              <MenuItem key={squad.id} value={squad.name}>
                {squad.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Soldiers Table */}
      <Paper 
        elevation={0}
        sx={{
          border: '1px solid var(--color-border-primary)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden'
        }}
      >
        <TableContainer>
          <Table size="small" sx={{ minWidth: 1400 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'var(--color-background-secondary)' }}>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 150,
                    whiteSpace: 'nowrap'
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
                    minWidth: 120,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Squad
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 100,
                    whiteSpace: 'nowrap'
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
                    minWidth: 100,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Strength
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 100,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Speed
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 100,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Endurance
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 100,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Flexibility
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 120,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Overall Score
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 140,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Last Assessment
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSoldiers.map((soldier) => {
                const assessment = getPhysicalAssessment(soldier.id)
                const statusColor = getStatusColor(assessment.overall_score)
                const statusText = getStatusText(assessment.overall_score)
                
                return (
                  <TableRow 
                    key={soldier.id} 
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <PlayerAvatar 
                          playerId={soldier.id}
                          playerName={`${soldier.firstname} ${soldier.lastname}`}
                          size="small"
                        />
                        <Box>
                          <Typography 
                            variant="body2" 
                            sx={{
                              fontFamily: 'var(--font-family-primary)',
                              fontSize: 'var(--font-size-sm)',
                              fontWeight: 'var(--font-weight-medium)',
                              color: 'var(--color-text-primary)'
                            }}
                          >
                            {soldier.firstname} {soldier.lastname}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{
                              fontFamily: 'var(--font-family-primary)',
                              fontSize: 'var(--font-size-xs)',
                              color: 'var(--color-text-secondary)'
                            }}
                          >
                            Age {soldier.age}
                          </Typography>
                        </Box>
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
                      {soldier.squad_name}
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
                        label={statusText}
                        color={statusColor}
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
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {assessment.strength_score}
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
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {assessment.speed_score}
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
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {assessment.endurance_score}
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
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {assessment.flexibility_score}
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
                        label={assessment.overall_score}
                        color={statusColor}
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
                      {assessment.last_assessment ? 
                        new Date(assessment.last_assessment).toLocaleDateString() : 
                        'Not assessed'
                      }
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredSoldiers.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No soldiers found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search criteria or filters
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default SoldiersTab