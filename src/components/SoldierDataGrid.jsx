import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { 
  SearchOutlined
} from '@mui/icons-material';
import soldiersData from '../data/soldiers.json';
import psychologicalData from '../data/psychological_soldiers.json';
import physicalData from '../data/physical_assessments.json';
import nutritionData from '../data/nutrition.json';
import medicalData from '../data/injuries_medical.json';
import wellbeingData from '../data/questionnaires_wellbeing.json';
import { PlayerAvatar } from './index';
import '../styles/design-tokens.css';

// Mock squad data - same as in physical dashboard
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
];

function SoldierDataGrid({ data = soldiersData, showToolbar = true, onBulkAction }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [squadFilter, setSquadFilter] = useState('all');

  // Filter soldiers based on search and filters
  const filteredData = useMemo(() => {
    return data.filter(soldier => {
      const matchesSearch = 
        soldier.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        soldier.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        soldier.alias?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'available' && soldier.availability_status === 'Available') ||
        (statusFilter === 'injured' && soldier.availability_status === 'Injured')
      
      const matchesSquad = squadFilter === 'all' || soldier.squad_name === squadFilter
      
      return matchesSearch && matchesStatus && matchesSquad
    })
  }, [data, searchTerm, statusFilter, squadFilter]);

  // Data lookup functions
  const getPsychologicalData = (soldierId) => {
    return psychologicalData.find(p => p.soldier_id === soldierId);
  };

  const getPhysicalData = (soldierId) => {
    return physicalData.find(p => p.soldier_id === soldierId);
  };

  const getMedicalData = (soldierId) => {
    return medicalData.find(m => m.soldier_id === soldierId || m.athlete_id === soldierId);
  };

  const getWellbeingData = (soldierId) => {
    return wellbeingData.find(w => w.soldier_id === soldierId);
  };

  const getNutritionData = (soldierId) => {
    // Mock nutrition data since the structure is different
    return {
      calories_consumed: 2500,
      calories_target: 2800,
      protein_consumed: 120
    };
  };

  const renderCellValue = (soldier, column) => {
    const value = soldier[column.id];
    
    switch (column.id) {
      case 'availability_status':
        return (
          <Chip
            label={value}
            size="small"
            color={
              value === 'Available' ? 'success' :
              value === 'Injured' ? 'error' :
              'default'
            }
            variant="outlined"
          />
        );
      case 'psychological_summary':
        const psychData = getPsychologicalData(soldier.id);
        if (!psychData) return <Chip label="No Data" size="small" color="default" variant="outlined" />;
        return (
          <Chip 
            label={`${psychData.mental_health_score}/10`} 
            size="small" 
            color={psychData.mental_health_score >= 7 ? 'success' : psychData.mental_health_score >= 5 ? 'warning' : 'error'}
            variant="outlined"
          />
        );
      case 'physical_summary':
        const physicalData = getPhysicalData(soldier.id);
        if (!physicalData) return <Chip label="No Data" size="small" color="default" variant="outlined" />;
        return (
          <Chip 
            label={`${physicalData.overall_score}/100`} 
            size="small" 
            color={physicalData.overall_score >= 80 ? 'success' : physicalData.overall_score >= 60 ? 'warning' : 'error'}
            variant="outlined"
          />
        );
      case 'nutritional_summary':
        const nutritionData = getNutritionData(soldier.id);
        const calPercent = Math.round((nutritionData.calories_consumed / nutritionData.calories_target) * 100);
        return (
          <Chip 
            label={`${calPercent}%`} 
            size="small" 
            color={calPercent >= 90 && calPercent <= 110 ? 'success' : calPercent >= 80 ? 'warning' : 'error'}
            variant="outlined"
          />
        );
      case 'sleep_summary':
        const wellbeingData = getWellbeingData(soldier.id);
        if (!wellbeingData) return <Chip label="No Data" size="small" color="default" variant="outlined" />;
        const sleepResponse = wellbeingData.responses?.find(r => r.variable === 'sleep_quality');
        const sleepScore = sleepResponse?.response || 0;
        return (
          <Chip 
            label={`${sleepScore}/10`} 
            size="small" 
            color={sleepScore >= 7 ? 'success' : sleepScore >= 5 ? 'warning' : 'error'}
            variant="outlined"
          />
        );
      case 'medical_summary':
        const medicalData = getMedicalData(soldier.id);
        if (!medicalData) {
          return (
            <Chip 
              label="Healthy" 
              size="small" 
              color="success" 
              variant="outlined"
            />
          );
        }
        return (
          <Chip 
            label={medicalData.status} 
            size="small" 
            color={medicalData.status === 'Recovering' ? 'warning' : medicalData.status === 'Injured' ? 'error' : 'success'}
            variant="outlined"
          />
        );
      case 'performance_score':
        return value ? `${value}%` : '-';
      case 'training_load':
        return value ? value.toFixed(1) : '-';
      case 'last_assessment':
        return value ? new Date(value).toLocaleDateString() : '-';
      default:
        return value || '-';
    }
  };

  return (
    <Box>
      {showToolbar && (
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
      )}

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
          <Table size="small" sx={{ minWidth: 1600 }}>
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
                    minWidth: 120,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Psychological
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
                  Physical
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
                  Nutritional
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
                  Sleep
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
                  Medical
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 110,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Performance
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 130,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Training Load
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
              {filteredData.map((soldier) => {
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
                      {renderCellValue(soldier, { id: 'availability_status' })}
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
                      {renderCellValue(soldier, { id: 'psychological_summary' })}
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
                      {renderCellValue(soldier, { id: 'physical_summary' })}
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
                      {renderCellValue(soldier, { id: 'nutritional_summary' })}
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
                      {renderCellValue(soldier, { id: 'sleep_summary' })}
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
                      {renderCellValue(soldier, { id: 'medical_summary' })}
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
                      {renderCellValue(soldier, { id: 'performance_score' })}
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
                      {renderCellValue(soldier, { id: 'training_load' })}
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
                      {renderCellValue(soldier, { id: 'last_assessment' })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredData.length === 0 && (
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
  );
}

SoldierDataGrid.propTypes = {
  data: PropTypes.array,
  showToolbar: PropTypes.bool,
  onBulkAction: PropTypes.func,
};

export default SoldierDataGrid;