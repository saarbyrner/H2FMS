import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Chip,
  Card,
  CardContent,
  Avatar,
  Divider,
  LinearProgress,
  Grid,
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import {
  SearchOutlined as SearchIcon,
  PsychologyOutlined as PsychologyIcon,
  PersonOutlined as PersonIcon,
  AssessmentOutlined as AssessmentIcon,
  TrendingUpOutlined as TrendingUpIcon,
  TrendingDownOutlined as TrendingDownIcon,
  CheckCircleOutlined as CheckCircleIcon,
  ScheduleOutlined as ScheduleIcon,
  WarningOutlined as WarningIcon
} from '@mui/icons-material';
import psychologicalEvaluations from '../../../data/psychological_evaluations.json';
import '../../../styles/design-tokens.css';

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed': return 'success';
    case 'In Progress': return 'warning';
    case 'Pending': return 'default';
    default: return 'default';
  }
};

const getScoreColor = (score) => {
  if (score >= 8) return 'success';
  if (score >= 6) return 'warning';
  return 'error';
};

const getScoreIcon = (score) => {
  if (score >= 7) return <TrendingUpIcon />;
  return <TrendingDownIcon />;
};

export default function EvaluationsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [evaluationTypeFilter, setEvaluationTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [psychologistFilter, setPsychologistFilter] = useState('All');

  const filteredEvaluations = psychologicalEvaluations.filter(evaluation => {
    const matchesSearch = evaluation.athlete_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.evaluation_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = evaluationTypeFilter === 'All' || evaluation.evaluation_type === evaluationTypeFilter;
    const matchesStatus = statusFilter === 'All' || evaluation.status === statusFilter;
    const matchesPsychologist = psychologistFilter === 'All' || evaluation.psychologist_name === psychologistFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesPsychologist;
  });

  const uniqueTypes = [...new Set(psychologicalEvaluations.map(evaluation => evaluation.evaluation_type))];
  const uniquePsychologists = [...new Set(psychologicalEvaluations.map(evaluation => evaluation.psychologist_name))];

  const renderScoreBar = (label, score, maxScore = 10) => {
    const percentage = (score / maxScore) * 100;
    return (
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography 
            variant="caption" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-secondary)'
            }}
          >
            {label}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-text-primary)'
            }}
          >
            {score.toFixed(1)}/{maxScore}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={percentage}
          color={getScoreColor(score)}
          sx={{ 
            height: 6, 
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-background-secondary)',
            '& .MuiLinearProgress-bar': {
              borderRadius: 'var(--radius-sm)'
            }
          }}
        />
      </Box>
    );
  };

  return (
    <Box>
      {/* Filters */}
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2, 
          mb: 3,
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-primary)',
          backgroundColor: 'var(--color-background-primary)'
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            variant="filled"
            size="small"
            placeholder="Search evaluations, soldiers, or content..."
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
              minWidth: 300, 
              flex: 1,
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
          
          <FormControl variant="filled" size="small" sx={{ minWidth: 180 }}>
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
              Evaluation type
            </InputLabel>
            <Select
              value={evaluationTypeFilter}
              label="Evaluation type"
              onChange={(e) => setEvaluationTypeFilter(e.target.value)}
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
              <MenuItem value="All">All types</MenuItem>
              {uniqueTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
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
              <MenuItem value="All">All status</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="In Progress">In progress</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>

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
              Psychologist
            </InputLabel>
            <Select
              value={psychologistFilter}
              label="Psychologist"
              onChange={(e) => setPsychologistFilter(e.target.value)}
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
              <MenuItem value="All">All psychologists</MenuItem>
              {uniquePsychologists.map(psychologist => (
                <MenuItem key={psychologist} value={psychologist}>{psychologist}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      {/* Evaluations Grid */}
      <Grid container spacing={3}>
        {filteredEvaluations.map((evaluation) => (
          <Grid item xs={12} md={6} lg={4} key={evaluation.id}>
            <Card 
              variant="outlined" 
              sx={{ 
                height: '100%', 
                '&:hover': { 
                  boxShadow: 'var(--shadow-md)',
                  transition: 'var(--transition-fast)'
                },
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-primary)',
                backgroundColor: 'var(--color-background-primary)'
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'var(--color-primary)',
                        width: 40,
                        height: 40
                      }}
                    >
                      <AssessmentIcon sx={{ fontSize: 'var(--icon-size-medium)' }} />
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        noWrap
                        sx={{
                          fontFamily: 'var(--font-family-primary)',
                          fontSize: 'var(--font-size-lg)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: 'var(--color-text-primary)',
                          textTransform: 'none'
                        }}
                      >
                        {evaluation.athlete_name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{
                          fontFamily: 'var(--font-family-primary)',
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-text-secondary)'
                        }}
                      >
                        {evaluation.psychologist_name}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={evaluation.status}
                    color={getStatusColor(evaluation.status)}
                    size="small"
                    icon={evaluation.status === 'Completed' ? <CheckCircleIcon sx={{ fontSize: 'var(--icon-size-small)' }} /> : <ScheduleIcon sx={{ fontSize: 'var(--icon-size-small)' }} />}
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  />
                </Box>

                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    mb: 1,
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-primary)',
                    textTransform: 'none'
                  }}
                >
                  {evaluation.evaluation_type}
                </Typography>

                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 2,
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-primary)',
                    lineHeight: 'var(--line-height-normal)'
                  }}
                >
                  {evaluation.summary}
                </Typography>

                <Divider sx={{ my: 2, borderColor: 'var(--color-border-secondary)' }} />

                {/* Overall Score */}
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography 
                      variant="subtitle2"
                      sx={{
                        fontFamily: 'var(--font-family-primary)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      Overall score
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getScoreIcon(evaluation.overall_score)}
                      <Chip
                        label={evaluation.overall_score.toFixed(1)}
                        color={getScoreColor(evaluation.overall_score)}
                        size="small"
                        sx={{
                          fontFamily: 'var(--font-family-primary)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      />
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(evaluation.overall_score / 10) * 100}
                    color={getScoreColor(evaluation.overall_score)}
                    sx={{ 
                      height: 8, 
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-background-secondary)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 'var(--radius-sm)'
                      }
                    }}
                  />
                </Box>

                {/* Individual Scores */}
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: 1,
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    Detailed scores
                  </Typography>
                  {Object.entries(evaluation.scores).slice(0, 3).map(([key, score]) => (
                    <Box key={key} sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography 
                          variant="caption" 
                          sx={{
                            fontFamily: 'var(--font-family-primary)',
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-text-secondary)',
                            textTransform: 'capitalize'
                          }}
                        >
                          {key.replace(/_/g, ' ')}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{
                            fontFamily: 'var(--font-family-primary)',
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--color-text-primary)'
                          }}
                        >
                          {score.toFixed(1)}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(score / 10) * 100}
                        color={getScoreColor(score)}
                        sx={{ 
                          height: 4, 
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--color-background-secondary)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 'var(--radius-sm)'
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2, borderColor: 'var(--color-border-secondary)' }} />

                {/* Recommendations */}
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: 1,
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    Key recommendations
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {evaluation.recommendations.slice(0, 2).map((rec, index) => (
                      <Chip
                        key={index}
                        label={rec}
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{
                          fontFamily: 'var(--font-family-primary)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          borderRadius: 'var(--radius-sm)',
                          borderColor: 'var(--color-primary)',
                          color: 'var(--color-primary)'
                        }}
                      />
                    ))}
                    {evaluation.recommendations.length > 2 && (
                      <Chip
                        label={`+${evaluation.recommendations.length - 2} more`}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontFamily: 'var(--font-family-primary)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 'var(--font-weight-medium)',
                          borderRadius: 'var(--radius-sm)',
                          borderColor: 'var(--color-border-primary)',
                          color: 'var(--color-text-secondary)'
                        }}
                      />
                    )}
                  </Stack>
                </Box>

                {/* Dates */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography 
                    variant="caption" 
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    Evaluated: {new Date(evaluation.evaluation_date).toLocaleDateString()}
                  </Typography>
                  {evaluation.next_evaluation && (
                    <Tooltip title="Next evaluation">
                      <Badge color="info" variant="dot">
                        <ScheduleIcon sx={{ fontSize: 'var(--icon-size-small)', color: 'var(--color-text-secondary)' }} />
                      </Badge>
                    </Tooltip>
                  )}
                </Box>
                {evaluation.next_evaluation && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      mt: 0.5, 
                      display: 'block',
                      fontFamily: 'var(--font-family-primary)',
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    Next: {new Date(evaluation.next_evaluation).toLocaleDateString()}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredEvaluations.length === 0 && (
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-primary)',
            backgroundColor: 'var(--color-background-primary)'
          }}
        >
          <AssessmentIcon sx={{ fontSize: 48, color: 'var(--color-text-secondary)', mb: 2 }} />
          <Typography 
            variant="h6" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text-secondary)',
              mb: 1
            }}
          >
            No evaluations found
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)'
            }}
          >
            Try adjusting your search criteria or filters
          </Typography>
        </Paper>
      )}

      {/* Summary Stats */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            minWidth: 120,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-primary)',
            backgroundColor: 'var(--color-background-primary)'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-primary)'
            }}
          >
            {filteredEvaluations.length}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)'
            }}
          >
            Total evaluations
          </Typography>
        </Paper>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            minWidth: 120,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-primary)',
            backgroundColor: 'var(--color-background-primary)'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-success)'
            }}
          >
            {filteredEvaluations.filter(evaluation => evaluation.status === 'Completed').length}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)'
            }}
          >
            Completed
          </Typography>
        </Paper>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            minWidth: 120,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-primary)',
            backgroundColor: 'var(--color-background-primary)'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-warning)'
            }}
          >
            {filteredEvaluations.filter(evaluation => evaluation.status === 'In Progress').length}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)'
            }}
          >
            In progress
          </Typography>
        </Paper>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            minWidth: 120,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-primary)',
            backgroundColor: 'var(--color-background-primary)'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-error)'
            }}
          >
            {filteredEvaluations.filter(evaluation => evaluation.overall_score < 6).length}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)'
            }}
          >
            Needs attention
          </Typography>
        </Paper>
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 2, 
            minWidth: 120,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-primary)',
            backgroundColor: 'var(--color-background-primary)'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-success)'
            }}
          >
            {filteredEvaluations.filter(evaluation => evaluation.overall_score >= 8).length}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-secondary)'
            }}
          >
            Excellent
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}