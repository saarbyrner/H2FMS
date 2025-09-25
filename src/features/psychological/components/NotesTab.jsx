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
  IconButton,
  Tooltip,
  Badge
} from '@mui/material';
import {
  SearchOutlined as SearchIcon,
  PsychologyOutlined as PsychologyIcon,
  PersonOutlined as PersonIcon,
  ScheduleOutlined as ScheduleIcon,
  FlagOutlined as FlagIcon,
  FilterListOutlined as FilterIcon,
  ExpandMoreOutlined as ExpandMoreIcon,
  ExpandLessOutlined as ExpandLessIcon
} from '@mui/icons-material';
import psychologicalNotes from '../../../data/psychological_notes.json';
import '../../../styles/design-tokens.css';

const getCategoryColor = (category) => {
  const colors = {
    'Performance Anxiety': 'error',
    'Team Dynamics': 'warning',
    'Injury Recovery': 'info',
    'Goal Setting': 'success',
    'Sleep & Recovery': 'secondary',
    'Pressure Management': 'error',
    'Confidence Building': 'warning',
    'Focus & Concentration': 'primary'
  };
  return colors[category] || 'default';
};

const getMoodColor = (rating) => {
  if (rating >= 8) return 'success';
  if (rating >= 6) return 'warning';
  return 'error';
};

export default function NotesTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [psychologistFilter, setPsychologistFilter] = useState('All');
  const [expandedNotes, setExpandedNotes] = useState(new Set());

  const filteredNotes = psychologicalNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.soldier_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || note.category === categoryFilter;
    const matchesPsychologist = psychologistFilter === 'All' || note.psychologist_name === psychologistFilter;
    
    return matchesSearch && matchesCategory && matchesPsychologist;
  });

  const uniqueCategories = [...new Set(psychologicalNotes.map(note => note.category))];
  const uniquePsychologists = [...new Set(psychologicalNotes.map(note => note.psychologist_name))];

  const toggleExpanded = (noteId) => {
    const newExpanded = new Set(expandedNotes);
    if (newExpanded.has(noteId)) {
      newExpanded.delete(noteId);
    } else {
      newExpanded.add(noteId);
    }
    setExpandedNotes(newExpanded);
  };

  const isExpanded = (noteId) => expandedNotes.has(noteId);

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
            placeholder="Search notes, soldiers, or content..."
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
              Category
            </InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
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
              <MenuItem value="All">All categories</MenuItem>
              {uniqueCategories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
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

      {/* Notes Stream */}
      <Stack spacing={1}>
        {filteredNotes.map((note) => (
          <Card 
            key={note.id} 
            variant="outlined" 
            sx={{ 
              '&:hover': { 
                boxShadow: 'var(--shadow-md)',
                transition: 'var(--transition-fast)'
              },
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-primary)',
              backgroundColor: 'var(--color-background-primary)'
            }}
          >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'var(--color-primary)',
                      width: 40,
                      height: 40
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 'var(--icon-size-medium)' }} />
                  </Avatar>
                  <Box>
                    <Typography 
                      variant="h6" 
                      component="h3"
                      sx={{
                        fontFamily: 'var(--font-family-primary)',
                        fontSize: 'var(--font-size-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--color-text-primary)',
                        textTransform: 'none'
                      }}
                    >
                      {note.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        fontFamily: 'var(--font-family-primary)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)'
                      }}
                    >
                      {note.soldier_name} • {note.psychologist_name} • {new Date(note.date).toLocaleDateString()} at {note.time}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={note.category}
                    color={getCategoryColor(note.category)}
                    variant="outlined"
                    size="small"
                    icon={<FlagIcon />}
                  />
                  <Chip
                    label={`Mood: ${note.mood_rating}/10`}
                    color={getMoodColor(note.mood_rating)}
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={`Stress: ${note.stress_level}/10`}
                    color={getMoodColor(10 - note.stress_level)}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </Box>

            </CardContent>
          </Card>
        ))}
      </Stack>

      {filteredNotes.length === 0 && (
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
          <PsychologyIcon sx={{ fontSize: 48, color: 'var(--color-text-secondary)', mb: 2 }} />
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
            No notes found
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

    </Box>
  );
}