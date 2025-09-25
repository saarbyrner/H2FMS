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
import medicalAssessmentsData from '../../../data/medical_assessments.json'

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
        (statusFilter === 'available' && soldier.availability_status === 'Available') ||
        (statusFilter === 'limited' && (soldier.availability_status === 'Limited' || soldier.availability_status === 'Injured')) ||
        (statusFilter === 'unavailable' && soldier.availability_status === 'Unavailable')
      
      const matchesSquad = squadFilter === 'all' || soldier.squad_name === squadFilter
      
      return matchesSearch && matchesStatus && matchesSquad
    })
  }, [searchTerm, statusFilter, squadFilter])

  // Get medical assessment data for soldier
  const getMedicalAssessment = (soldierId) => {
    return medicalAssessmentsData.find(assessment => assessment.soldier_id === soldierId) || {
      availability_status: 'Unknown',
      open_injury_illness: 'None',
      latest_note: 'No medical records',
      allergies: 'None',
      last_medical_review: null
    }
  }

  // Get status color based on availability
  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'success'
      case 'Limited': return 'warning'
      case 'Injured': return 'warning'
      case 'Unavailable': return 'error'
      default: return 'default'
    }
  }

  // Get injury color based on injury status
  const getInjuryColor = (injury) => {
    if (injury === 'None') return 'success'
    return 'error'
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
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="limited">Limited/Injured</MenuItem>
            <MenuItem value="unavailable">Unavailable</MenuItem>
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
                  Availability Status
                </TableCell>
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
                  Open Injury/Illness
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 200,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Latest Note
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
                  Allergies
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
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSoldiers.map((soldier) => {
                const assessment = getMedicalAssessment(soldier.id)
                const statusColor = getStatusColor(assessment.availability_status)
                const injuryColor = getInjuryColor(assessment.open_injury_illness)
                
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
                      <Chip 
                        label={assessment.availability_status}
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
                      <Chip 
                        label={assessment.open_injury_illness}
                        color={injuryColor}
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
                        title={assessment.latest_note}
                      >
                        {assessment.latest_note}
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
                      <Typography 
                        variant="body2" 
                        sx={{
                          fontFamily: 'var(--font-family-primary)',
                          fontSize: 'var(--font-size-sm)',
                          color: assessment.allergies === 'None' ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                          fontWeight: assessment.allergies === 'None' ? 'normal' : 'var(--font-weight-medium)'
                        }}
                      >
                        {assessment.allergies}
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
                      {soldier.squad_name}
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
