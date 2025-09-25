import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Chip,
  Card,
  CardContent,
  Avatar,
  Divider
} from '@mui/material'
import {
  AddOutlined,
  SearchOutlined,
  NoteOutlined,
  PersonOutlined
} from '@mui/icons-material'

function NotesTab() {
  const [newNote, setNewNote] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock notes data
  const notes = [
    {
      id: 1,
      soldierName: 'Marcus Johnson',
      note: 'Regular checkup completed. All vitals normal. Blood pressure 120/80, heart rate 65 bpm. No concerns identified.',
      author: 'Dr. Sarah Williams',
      date: '2024-01-15',
      type: 'General',
      priority: 'Normal'
    },
    {
      id: 2,
      soldierName: 'David Chen',
      note: 'Knee strain from training. Recommend rest and physical therapy. Follow-up in 2 weeks. Patient advised to avoid high-impact activities.',
      author: 'Dr. Michael Brown',
      date: '2024-01-14',
      type: 'Injury',
      priority: 'High'
    },
    {
      id: 3,
      soldierName: 'Alex Rodriguez',
      note: 'Annual physical examination completed successfully. All systems functioning normally. Cleared for all training activities.',
      author: 'Dr. Sarah Williams',
      date: '2024-01-13',
      type: 'Physical',
      priority: 'Normal'
    },
    {
      id: 4,
      soldierName: 'James Wilson',
      note: 'Follow-up for concussion protocol. Patient showing good progress. Cleared for light duty. Continue monitoring symptoms.',
      author: 'Dr. Robert Davis',
      date: '2024-01-12',
      type: 'Follow-up',
      priority: 'Medium'
    },
    {
      id: 5,
      soldierName: 'Michael Brown',
      note: 'Emergency visit for severe allergic reaction. Treated with epinephrine. Recommend allergy testing and carrying EpiPen.',
      author: 'Dr. Robert Davis',
      date: '2024-01-11',
      type: 'Emergency',
      priority: 'High'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error'
      case 'Medium': return 'warning'
      case 'Normal': return 'success'
      default: return 'default'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'Emergency': return 'error'
      case 'Injury': return 'warning'
      case 'Follow-up': return 'info'
      case 'Physical': return 'success'
      case 'General': return 'default'
      default: return 'default'
    }
  }

  const filteredNotes = notes.filter(note =>
    note.soldierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would add the note to the database
      console.log('Adding note:', newNote)
      setNewNote('')
    }
  }

  return (
    <Box>
      {/* Add New Note Section */}
      <Paper 
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          border: '1px solid var(--color-border-primary)',
          borderRadius: 'var(--radius-md)'
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            fontFamily: 'var(--font-family-primary)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)'
          }}
        >
          Add New Note
        </Typography>
        <Stack spacing={2}>
          <TextField
            multiline
            rows={3}
            placeholder="Enter medical note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            variant="filled"
            sx={{
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<AddOutlined />}
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              sx={{
                fontFamily: 'var(--font-family-primary)',
                fontWeight: 'var(--font-weight-medium)',
                backgroundColor: 'var(--color-primary)',
                '&:hover': {
                  backgroundColor: 'var(--color-primary-dark)'
                }
              }}
            >
              Add Note
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* Search */}
      <TextField
        variant="filled"
        size="small"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <SearchOutlined sx={{ fontSize: 'var(--icon-size-small)', mr: 1, color: 'var(--color-text-secondary)' }} />
          ),
        }}
        sx={{ 
          mb: 3,
          minWidth: 300,
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

      {/* Notes List */}
      <Stack spacing={2}>
        {filteredNotes.map((note) => (
          <Card 
            key={note.id}
            elevation={0}
            sx={{
              border: '1px solid var(--color-border-primary)',
              borderRadius: 'var(--radius-md)',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: 'var(--color-primary)', width: 40, height: 40 }}>
                  <NoteOutlined />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <PersonOutlined sx={{ fontSize: 'var(--icon-size-small)', color: 'var(--color-text-secondary)' }} />
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontFamily: 'var(--font-family-primary)',
                        fontWeight: 'var(--font-weight-medium)',
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      {note.soldierName}
                    </Typography>
                    <Chip 
                      label={note.type}
                      color={getTypeColor(note.type)}
                      size="small"
                      variant="outlined"
                    />
                    <Chip 
                      label={note.priority}
                      color={getPriorityColor(note.priority)}
                      size="small"
                      variant="filled"
                    />
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontFamily: 'var(--font-family-primary)',
                      color: 'var(--color-text-secondary)',
                      mb: 1
                    }}
                  >
                    {note.author} • {new Date(note.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography 
                variant="body2" 
                sx={{ 
                  fontFamily: 'var(--font-family-primary)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.6
                }}
              >
                {note.note}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {filteredNotes.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No notes found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default NotesTab
