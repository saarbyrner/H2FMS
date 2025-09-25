import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper
} from '@mui/material'
import {
  CalendarMonthOutlined,
  ViewWeekOutlined,
  ViewModuleOutlined,
  TimelineOutlined,
  FilterListOutlined,
  AddOutlined,
  EditOutlined,
  DeleteOutlined,
  FitnessCenterOutlined,
  PeopleOutlined,
  AccessTimeOutlined
} from '@mui/icons-material'
import { PlayerAvatar } from '../../../components'
import soldiersData from '../../../data/soldiers.json'
import trainingPlansData from '../../../data/training_plans.json'

function PlansPage() {
  const [viewMode, setViewMode] = useState('month')
  const [selectedSoldier, setSelectedSoldier] = useState('all')
  const [selectedPlan, setSelectedPlan] = useState(null)

  // Get unique soldiers for filter
  const availableSoldiers = useMemo(() => {
    return soldiersData.map(soldier => ({
      value: soldier.id,
      label: `${soldier.firstname} ${soldier.lastname}`
    }))
  }, [])

  // Filter plans based on selected soldier
  const filteredPlans = useMemo(() => {
    if (selectedSoldier === 'all') {
      return trainingPlansData
    }
    return trainingPlansData.filter(plan => 
      plan.soldiers.includes(parseInt(selectedSoldier))
    )
  }, [selectedSoldier])

  // Group plans by view mode
  const groupedPlans = useMemo(() => {
    const groups = {}
    
    filteredPlans.forEach(plan => {
      const startDate = new Date(plan.start_date)
      let groupKey = ''
      
      switch (viewMode) {
        case 'week':
          const weekStart = new Date(startDate)
          weekStart.setDate(startDate.getDate() - startDate.getDay())
          groupKey = weekStart.toISOString().split('T')[0]
          break
        case 'month':
          groupKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`
          break
        case 'milestone':
          groupKey = plan.milestone || 'No milestone'
          break
        default:
          groupKey = 'All plans'
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = []
      }
      groups[groupKey].push(plan)
    })
    
    return groups
  }, [filteredPlans, viewMode])

  const getViewModeIcon = (mode) => {
    switch (mode) {
      case 'week': return <ViewWeekOutlined />
      case 'month': return <CalendarMonthOutlined />
      case 'milestone': return <TimelineOutlined />
      default: return <ViewModuleOutlined />
    }
  }

  const getPlanStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Upcoming': return 'default'
      case 'Completed': return 'default'
      case 'Paused': return 'warning'
      default: return 'default'
    }
  }

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
  }

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <Box>
      {/* Header with controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Training plans
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage soldier training plans with calendar and milestone tracking
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          sx={{ 
            textTransform: 'none',
            backgroundColor: 'var(--color-primary)',
            '&:hover': {
              backgroundColor: 'var(--color-primary-hover)'
            }
          }}
        >
          Create plan
        </Button>
      </Box>

      {/* Controls */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 2, 
          mb: 3, 
          border: '1px solid var(--color-border-primary)',
          borderRadius: 'var(--radius-md)'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small" variant="filled">
              <InputLabel>View mode</InputLabel>
              <Select
                value={viewMode}
                label="View mode"
                onChange={(e) => setViewMode(e.target.value)}
              >
                <MenuItem value="week">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ViewWeekOutlined sx={{ fontSize: 16 }} />
                    Week view
                  </Box>
                </MenuItem>
                <MenuItem value="month">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarMonthOutlined sx={{ fontSize: 16 }} />
                    Month view
                  </Box>
                </MenuItem>
                <MenuItem value="milestone">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TimelineOutlined sx={{ fontSize: 16 }} />
                    Milestone view
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small" variant="filled">
              <InputLabel>Filter by soldier</InputLabel>
              <Select
                value={selectedSoldier}
                label="Filter by soldier"
                onChange={(e) => setSelectedSoldier(e.target.value)}
              >
                <MenuItem value="all">All soldiers</MenuItem>
                {availableSoldiers.map(soldier => (
                  <MenuItem key={soldier.value} value={soldier.value}>
                    {soldier.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                label={`${filteredPlans.length} plans`}
                size="small"
                variant="filled"
                sx={{
                  backgroundColor: 'var(--color-background-secondary)',
                  color: 'var(--color-text-primary)'
                }}
              />
              <Chip 
                label={`${filteredPlans.filter(p => p.status === 'Active').length} active`}
                size="small"
                color="success"
                variant="filled"
              />
              <Chip 
                label={`${filteredPlans.filter(p => p.status === 'Upcoming').length} upcoming`}
                size="small"
                variant="filled"
                sx={{
                  backgroundColor: 'var(--color-background-secondary)',
                  color: 'var(--color-text-primary)'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Plans by view mode */}
      {Object.entries(groupedPlans).map(([groupKey, plans]) => (
        <Box key={groupKey} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            {viewMode === 'week' && new Date(groupKey).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
            {viewMode === 'month' && new Date(groupKey + '-01').toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long' 
            })}
            {viewMode === 'milestone' && groupKey}
            {viewMode === 'all' && 'All plans'}
            <Chip 
              label={`${plans.length} plan${plans.length !== 1 ? 's' : ''}`}
              size="small"
              variant="filled"
              sx={{ 
                ml: 2,
                backgroundColor: 'var(--color-background-secondary)',
                color: 'var(--color-text-primary)'
              }}
            />
          </Typography>

          <Grid container spacing={3}>
            {plans.map((plan) => (
              <Grid item xs={12} md={6} lg={4} key={plan.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    border: '1px solid var(--color-border-primary)',
                    '&:hover': {
                      borderColor: 'var(--color-primary)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, mb: 0.5 }}>
                          {plan.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {plan.description}
                        </Typography>
                      </Box>
                      <Chip 
                        label={plan.status}
                        color={getPlanStatusColor(plan.status)}
                        size="small"
                        variant="filled"
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        Duration
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {formatDateRange(plan.start_date, plan.end_date)}
                      </Typography>
                      {plan.status === 'Active' && (
                        <Typography variant="caption" color="text.secondary">
                          {getDaysRemaining(plan.end_date)} days remaining
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        Associated soldiers ({plan.soldiers.length})
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {plan.soldiers.slice(0, 3).map((soldierId) => {
                          const soldier = soldiersData.find(a => a.id === soldierId)
                          return soldier ? (
                            <Tooltip key={soldierId} title={`${soldier.firstname} ${soldier.lastname}`}>
                              <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                {soldier.firstname[0]}{soldier.lastname[0]}
                              </Avatar>
                            </Tooltip>
                          ) : null
                        })}
                        {plan.soldiers.length > 3 && (
                          <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'var(--color-text-secondary)' }}>
                            +{plan.soldiers.length - 3}
                          </Avatar>
                        )}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip 
                        icon={<FitnessCenterOutlined />}
                        label={plan.workout_count + ' workouts'}
                        size="small"
                        variant="filled"
                        sx={{
                          backgroundColor: 'var(--color-background-secondary)',
                          color: 'var(--color-text-primary)'
                        }}
                      />
                      <Chip 
                        icon={<AccessTimeOutlined />}
                        label={plan.duration}
                        size="small"
                        variant="filled"
                        sx={{
                          backgroundColor: 'var(--color-background-secondary)',
                          color: 'var(--color-text-primary)'
                        }}
                      />
                    </Box>

                    {plan.milestone && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                          Milestone
                        </Typography>
                        <Chip 
                          label={plan.milestone}
                          size="small"
                          sx={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--color-white)',
                            '&:hover': {
                              backgroundColor: 'var(--color-primary-hover)'
                            }
                          }}
                          variant="filled"
                        />
                      </Box>
                    )}
                  </CardContent>

                  <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<EditOutlined />}
                      sx={{ 
                        textTransform: 'none', 
                        flexGrow: 1,
                        backgroundColor: 'var(--color-secondary)',
                        color: 'var(--color-text-primary)',
                        '&:hover': {
                          backgroundColor: 'var(--color-secondary-hover)'
                        }
                      }}
                    >
                      Edit
                    </Button>
                    <Tooltip title="Delete plan">
                      <IconButton size="small" color="error">
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {Object.keys(groupedPlans).length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No training plans found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create a new training plan or adjust your filters
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default PlansPage
