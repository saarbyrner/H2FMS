import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  SearchOutlined as SearchIcon,
  PsychologyOutlined as PsychologyIcon,
  WarningOutlined as WarningIcon,
  CheckCircleOutlined as CheckCircleIcon,
  ScheduleOutlined as ScheduleIcon
} from '@mui/icons-material';
import { PlayerAvatar } from '../../../components';
import psychologicalSoldiers from '../../../data/psychological_soldiers.json';
import '../../../styles/design-tokens.css';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High': return 'error';
    case 'Medium': return 'warning';
    case 'Low': return 'success';
    default: return 'default';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Active': return 'success';
    case 'Inactive': return 'default';
    default: return 'default';
  }
};

const getScoreColor = (score) => {
  if (score >= 8) return 'success';
  if (score >= 6) return 'warning';
  return 'error';
};

export default function SoldiersTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [squadFilter, setSquadFilter] = useState('All');

  const filteredSoldiers = psychologicalSoldiers.filter(soldier => {
    const matchesSearch = soldier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         soldier.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || soldier.priority === priorityFilter;
    const matchesSquad = squadFilter === 'All' || soldier.squad === squadFilter;
    
    return matchesSearch && matchesPriority && matchesSquad;
  });

  const uniqueSquads = [...new Set(psychologicalSoldiers.map(soldier => soldier.squad))];

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
                <SearchIcon sx={{ fontSize: 'var(--icon-size-small)' }} />
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
            Priority
          </InputLabel>
          <Select
            value={priorityFilter}
            label="Priority"
            onChange={(e) => setPriorityFilter(e.target.value)}
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
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
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
            <MenuItem value="All">All</MenuItem>
            {uniqueSquads.map(squad => (
              <MenuItem key={squad} value={squad}>{squad}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Soldiers Table */}
      <Paper 
        elevation={0}
        sx={{
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-primary)',
          overflow: 'hidden'
        }}
      >
        <TableContainer>
          <Table size="small" sx={{ minWidth: 1250 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'var(--color-background-secondary)' }}>
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
                    minWidth: 140,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Psychologist
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
                  Priority
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
                  Mental Health Score
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
                  Stress Level
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
                  Confidence
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
                  Last Session
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 90,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Sessions
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
                  Next Session
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
                  Key Concerns
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSoldiers.map((soldier) => (
                <TableRow key={soldier.id} hover>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PlayerAvatar 
                        playerId={soldier.soldier_id}
                        playerName={soldier.name}
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
                          {soldier.name}
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
                      borderBottom: '1px solid var(--color-border-secondary)'
                    }}
                  >
                    {soldier.squad}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)'
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-family-primary)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      {soldier.psychologist}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)'
                    }}
                  >
                    <Chip
                      label={soldier.priority}
                      color={getPriorityColor(soldier.priority)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)'
                    }}
                  >
                    <Chip
                      label={soldier.mental_health_score.toFixed(1)}
                      color={getScoreColor(soldier.mental_health_score)}
                      size="small"
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: getScoreColor(soldier.stress_level) === 'error' ? 'var(--color-error)' :
                                         getScoreColor(soldier.stress_level) === 'warning' ? 'var(--color-warning)' : 'var(--color-success)'
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-family-primary)',
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-text-primary)'
                        }}
                      >
                        {soldier.stress_level}/10
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: getScoreColor(soldier.confidence_level) === 'error' ? 'var(--color-error)' :
                                         getScoreColor(soldier.confidence_level) === 'warning' ? 'var(--color-warning)' : 'var(--color-success)'
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-family-primary)',
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-text-primary)'
                        }}
                      >
                        {soldier.confidence_level}/10
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-secondary)',
                      borderBottom: '1px solid var(--color-border-secondary)'
                    }}
                  >
                    {new Date(soldier.last_session).toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)'
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'var(--font-family-primary)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      {soldier.total_sessions}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ScheduleIcon sx={{ fontSize: 'var(--icon-size-small)', color: 'var(--color-primary)' }} />
                      <Typography
                        sx={{
                          fontFamily: 'var(--font-family-primary)',
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-text-primary)'
                        }}
                      >
                        {new Date(soldier.next_session).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-primary)',
                      borderBottom: '1px solid var(--color-border-secondary)'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {soldier.key_concerns.slice(0, 2).map((concern, index) => (
                        <Chip
                          key={index}
                          label={concern}
                          size="small"
                          variant="outlined"
                          color="default"
                        />
                      ))}
                      {soldier.key_concerns.length > 2 && (
                        <Chip
                          label={`+${soldier.key_concerns.length - 2}`}
                          size="small"
                          variant="outlined"
                          color="default"
                        />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </Box>
  );
}