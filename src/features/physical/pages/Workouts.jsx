import React, { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar
} from '@mui/material'
import {
  AddOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayArrowOutlined,
  FitnessCenterOutlined,
  TimerOutlined,
  PeopleOutlined,
  AssignmentOutlined
} from '@mui/icons-material'
import { PlayerAvatar } from '../../../components'
import soldiersData from '../../../data/soldiers.json'
import workoutsData from '../../../data/workouts.json'

function WorkoutsPage() {
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    description: '',
    duration: '',
    difficulty: '',
    category: '',
    exercises: []
  })

  const handleCreateWorkout = () => {
    setIsCreateDialogOpen(true)
    setNewWorkout({
      name: '',
      description: '',
      duration: '',
      difficulty: '',
      category: '',
      exercises: []
    })
  }

  const handleEditWorkout = (workout) => {
    setSelectedWorkout(workout)
    setNewWorkout(workout)
    setIsEditDialogOpen(true)
  }

  const handleSaveWorkout = () => {
    // In a real app, this would save to the backend
    console.log('Saving workout:', newWorkout)
    setIsCreateDialogOpen(false)
    setIsEditDialogOpen(false)
    setNewWorkout({
      name: '',
      description: '',
      duration: '',
      difficulty: '',
      category: '',
      exercises: []
    })
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'success'
      case 'Intermediate': return 'warning'
      case 'Advanced': return 'error'
      default: return 'default'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Strength': return <FitnessCenterOutlined />
      case 'Cardio': return <TimerOutlined />
      case 'Flexibility': return <AssignmentOutlined />
      default: return <FitnessCenterOutlined />
    }
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Workout plans
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create and manage workout plans for soldiers
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          onClick={handleCreateWorkout}
          sx={{ 
            textTransform: 'none',
            backgroundColor: 'var(--color-primary)',
            '&:hover': {
              backgroundColor: 'var(--color-primary-hover)'
            }
          }}
        >
          Create workout
        </Button>
      </Box>

      {/* Workouts Grid */}
      <Grid container spacing={3}>
        {workoutsData.map((workout) => (
          <Grid item xs={12} sm={6} md={4} key={workout.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--color-border-primary)',
                '&:hover': {
                  borderColor: 'var(--color-primary)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'var(--color-primary)', mr: 2 }}>
                    {getCategoryIcon(workout.category)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                      {workout.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {workout.category} • {workout.duration}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ mb: 2, color: 'var(--color-text-secondary)' }}>
                  {workout.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    label={workout.difficulty}
                    color={getDifficultyColor(workout.difficulty)}
                    size="small"
                    variant="outlined"
                  />
                  <Chip 
                    label={`${workout.exercises.length} exercises`}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                {/* Associated Soldiers */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    Associated soldiers ({workout.soldiers.length})
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {workout.soldiers.slice(0, 3).map((soldierId) => {
                      const soldier = soldiersData.find(a => a.id === soldierId)
                      return soldier ? (
                        <Tooltip key={soldierId} title={`${soldier.firstname} ${soldier.lastname}`}>
                          <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                            {soldier.firstname[0]}{soldier.lastname[0]}
                          </Avatar>
                        </Tooltip>
                      ) : null
                    })}
                    {workout.soldiers.length > 3 && (
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'var(--color-text-secondary)' }}>
                        +{workout.soldiers.length - 3}
                      </Avatar>
                    )}
                  </Box>
                </Box>
              </CardContent>

              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="small"
                  startIcon={<PlayArrowOutlined />}
                  sx={{ 
                    textTransform: 'none',
                    backgroundColor: 'var(--color-primary)',
                    '&:hover': {
                      backgroundColor: 'var(--color-primary-hover)'
                    }
                  }}
                >
                  Start
                </Button>
                <Button
                  size="small"
                  startIcon={<EditOutlined />}
                  onClick={() => handleEditWorkout(workout)}
                  sx={{ 
                    textTransform: 'none',
                    backgroundColor: 'var(--color-primary)',
                    '&:hover': {
                      backgroundColor: 'var(--color-primary-hover)'
                    }
                  }}
                >
                  Edit
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Tooltip title="Delete workout">
                  <IconButton size="small" color="error">
                    <DeleteOutlined />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Workout Dialog */}
      <Dialog 
        open={isCreateDialogOpen || isEditDialogOpen} 
        onClose={() => {
          setIsCreateDialogOpen(false)
          setIsEditDialogOpen(false)
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isCreateDialogOpen ? 'Create new workout' : 'Edit workout'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
            {/* Workout Name */}
            <TextField
              variant="filled"
              label="Workout name"
              placeholder="Name saved workout(s)"
              value={newWorkout.name}
              onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
              fullWidth
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
            
            {/* Description */}
            <TextField
              variant="filled"
              label="Description (optional)"
              placeholder="Description of saved program"
              value={newWorkout.description}
              onChange={(e) => setNewWorkout({ ...newWorkout, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
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

            {/* Duration and Difficulty */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                variant="filled"
                label="Duration"
                placeholder="e.g., 60 minutes"
                value={newWorkout.duration}
                onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
                sx={{ 
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
              
              <FormControl variant="filled" sx={{ flex: 1 }}>
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
                  Difficulty
                </InputLabel>
                <Select
                  value={newWorkout.difficulty}
                  label="Difficulty"
                  onChange={(e) => setNewWorkout({ ...newWorkout, difficulty: e.target.value })}
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
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Category */}
            <FormControl variant="filled" fullWidth>
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
                value={newWorkout.category}
                label="Category"
                onChange={(e) => setNewWorkout({ ...newWorkout, category: e.target.value })}
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
                <MenuItem value="Strength">Strength</MenuItem>
                <MenuItem value="Cardio">Cardio</MenuItem>
                <MenuItem value="Flexibility">Flexibility</MenuItem>
                <MenuItem value="Mixed">Mixed</MenuItem>
              </Select>
            </FormControl>

            {/* Associated Soldiers */}
            <FormControl variant="filled" fullWidth>
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
                Associated soldiers
              </InputLabel>
              <Select
                multiple
                value={newWorkout.soldiers || []}
                label="Associated soldiers"
                onChange={(e) => setNewWorkout({ ...newWorkout, soldiers: e.target.value })}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((soldierId) => {
                      const soldier = soldiersData.find(a => a.id === soldierId)
                      return soldier ? (
                        <Chip 
                          key={soldierId} 
                          label={`${soldier.firstname} ${soldier.lastname}`}
                          size="small"
                        />
                      ) : null
                    })}
                  </Box>
                )}
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
                {soldiersData.map((soldier) => (
                  <MenuItem key={soldier.id} value={soldier.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PlayerAvatar 
                        playerId={soldier.id}
                        playerName={`${soldier.firstname} ${soldier.lastname}`}
                        size="small"
                      />
                      <Box>
                        <Typography variant="body2">
                          {soldier.firstname} {soldier.lastname}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {soldier.position} • {soldier.squad_name}
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              setIsCreateDialogOpen(false)
              setIsEditDialogOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveWorkout}
            sx={{ 
              textTransform: 'none',
              backgroundColor: 'var(--color-primary)',
              '&:hover': {
                backgroundColor: 'var(--color-primary-hover)'
              }
            }}
          >
            {isCreateDialogOpen ? 'Create workout' : 'Save changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default WorkoutsPage
