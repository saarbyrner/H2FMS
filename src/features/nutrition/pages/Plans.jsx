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
  RestaurantOutlined,
  PeopleOutlined,
  AccessTimeOutlined,
  LocalDiningOutlined
} from '@mui/icons-material'
import { PlayerAvatar } from '../../../components'
import soldiersData from '../../../data/soldiers.json'

// Mock nutrition plans data
const nutritionPlansData = [
  {
    id: 1,
    name: 'High Performance Nutrition Plan',
    description: 'Optimized nutrition plan for peak athletic performance',
    status: 'Active',
    start_date: '2024-01-01',
    end_date: '2024-03-31',
    duration: '3 months',
    meal_count: 5,
    daily_calories: 3000,
    protein_target: 200,
    carb_target: 400,
    fat_target: 100,
    soldiers: [1, 2, 3, 4, 5],
    milestone: 'Pre-season preparation',
    compliance_rate: 92
  },
  {
    id: 2,
    name: 'Recovery Nutrition Protocol',
    description: 'Specialized nutrition plan for post-injury recovery',
    status: 'Active',
    start_date: '2024-01-15',
    end_date: '2024-02-15',
    duration: '1 month',
    meal_count: 6,
    daily_calories: 2500,
    protein_target: 180,
    carb_target: 300,
    fat_target: 80,
    soldiers: [6, 7, 8],
    milestone: 'Injury recovery',
    compliance_rate: 88
  },
  {
    id: 3,
    name: 'Weight Management Plan',
    description: 'Balanced nutrition plan for weight optimization',
    status: 'Upcoming',
    start_date: '2024-02-01',
    end_date: '2024-04-30',
    duration: '3 months',
    meal_count: 4,
    daily_calories: 2200,
    protein_target: 160,
    carb_target: 250,
    fat_target: 70,
    soldiers: [9, 10, 11, 12],
    milestone: 'Weight optimization',
    compliance_rate: 0
  },
  {
    id: 4,
    name: 'Endurance Training Fuel',
    description: 'High-carb nutrition plan for endurance training',
    status: 'Completed',
    start_date: '2023-10-01',
    end_date: '2023-12-31',
    duration: '3 months',
    meal_count: 5,
    daily_calories: 3500,
    protein_target: 220,
    carb_target: 500,
    fat_target: 120,
    soldiers: [13, 14, 15],
    milestone: 'Endurance phase',
    compliance_rate: 95
  }
]

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
      return nutritionPlansData
    }
    return nutritionPlansData.filter(plan => 
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
      case 'Upcoming': return 'info'
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
            Nutrition plans
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage soldier nutrition plans with macro tracking and compliance monitoring
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          sx={{ textTransform: 'none' }}
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
            <FormControl fullWidth size="small">
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
            <FormControl fullWidth size="small">
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
                variant="outlined"
              />
              <Chip 
                label={`${filteredPlans.filter(p => p.status === 'Active').length} active`}
                size="small"
                color="success"
                variant="outlined"
              />
              <Chip 
                label={`${filteredPlans.filter(p => p.status === 'Upcoming').length} upcoming`}
                size="small"
                color="info"
                variant="outlined"
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
              sx={{ ml: 2 }}
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
                        variant="outlined"
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

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        Daily targets
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                        <Chip 
                          icon={<RestaurantOutlined />}
                          label={`${plan.daily_calories} cal`}
                          size="small"
                          variant="outlined"
                        />
                        <Chip 
                          label={`${plan.protein_target}g protein`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip 
                          label={`${plan.carb_target}g carbs`}
                          size="small"
                          variant="outlined"
                        />
                        <Chip 
                          label={`${plan.fat_target}g fat`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Chip 
                        icon={<LocalDiningOutlined />}
                        label={plan.meal_count + ' meals/day'}
                        size="small"
                        variant="outlined"
                      />
                      <Chip 
                        icon={<AccessTimeOutlined />}
                        label={plan.duration}
                        size="small"
                        variant="outlined"
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
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                    )}

                    {plan.compliance_rate > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                          Compliance rate
                        </Typography>
                        <Chip 
                          label={`${plan.compliance_rate}%`}
                          size="small"
                          color={plan.compliance_rate >= 90 ? 'success' : plan.compliance_rate >= 70 ? 'warning' : 'error'}
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
            No nutrition plans found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create a new nutrition plan or adjust your filters
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default PlansPage
