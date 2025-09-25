import React from 'react'
import {
  Container,
  Grid,
  Box,
  Button,
  Stack
} from '@mui/material'
import {
  LocalHospitalOutlined,
  FitnessCenterOutlined,
  RestaurantOutlined,
  PsychologyOutlined,
  CalendarMonthOutlined,
  AssessmentOutlined,
  TrendingUpOutlined,
  PeopleOutlined,
  DownloadOutlined,
  ShareOutlined,
  FilterListOutlined,
  AddOutlined
} from '@mui/icons-material'
import ReportPreview from '../components/ReportPreview'

// Report card data configuration with chart types and preview data
const reportCards = [
  {
    id: 'medical-reports',
    title: 'medical health report',
    description: 'Injury tracking and health analytics',
    icon: LocalHospitalOutlined,
    color: 'var(--color-background-secondary)',
    iconColor: 'var(--color-primary)',
    path: '/medical',
    chartType: 'medical',
    lastUpdated: '2h ago',
    keyMetrics: [
      { label: 'injuries', value: '8' },
      { label: 'assessments', value: '24' },
      { label: 'healthy', value: '180' }
    ],
    tags: ['health', 'injuries', 'assessments']
  },
  {
    id: 'physical-reports',
    title: 'training performance',
    description: 'Workout analytics and session data',
    icon: FitnessCenterOutlined,
    color: 'var(--color-background-secondary)',
    iconColor: 'var(--color-secondary)',
    path: '/physical',
    chartType: 'physical',
    lastUpdated: '1h ago',
    keyMetrics: [
      { label: 'sessions', value: '156' },
      { label: 'Avg RPE', value: '7.2' },
      { label: 'attendance', value: '95%' }
    ],
    tags: ['training', 'performance', 'workouts']
  },
  {
    id: 'nutrition-reports',
    title: 'nutrition analysis',
    description: 'Dietary performance and meal tracking',
    icon: RestaurantOutlined,
    color: 'var(--color-background-secondary)',
    iconColor: 'var(--color-success)',
    path: '/nutrition',
    chartType: 'nutrition',
    lastUpdated: '30m ago',
    keyMetrics: [
      { label: 'protein', value: '85%' },
      { label: 'carbs', value: '78%' },
      { label: 'hydration', value: '88%' }
    ],
    tags: ['nutrition', 'meals', 'health']
  },
  {
    id: 'psychological-reports',
    title: 'Mental health report',
    description: 'Psychological evaluations and wellbeing',
    icon: PsychologyOutlined,
    color: 'var(--color-background-secondary)',
    iconColor: 'var(--color-warning)',
    path: '/psychological',
    chartType: 'psychological',
    lastUpdated: '4h ago',
    keyMetrics: [
      { label: 'stress', value: '72%' },
      { label: 'motivation', value: '85%' },
      { label: 'confidence', value: '78%' }
    ],
    tags: ['Mental health', 'wellbeing', 'evaluations']
  },
  {
    id: 'calendar-reports',
    title: 'Event analytics',
    description: 'Schedule analysis and event tracking',
    icon: CalendarMonthOutlined,
    color: 'var(--color-background-secondary)',
    iconColor: 'var(--color-error)',
    path: '/planning',
    chartType: 'calendar',
    lastUpdated: '15m ago',
    keyMetrics: [
      { label: 'training', value: '45' },
      { label: 'medical', value: '12' },
      { label: 'games', value: '4' }
    ],
    tags: ['events', 'scheduling', 'planning']
  },
  {
    id: 'assessment-reports',
    title: 'Assessment summary',
    description: 'Comprehensive evaluation analytics',
    icon: AssessmentOutlined,
    color: 'var(--color-background-secondary)',
    iconColor: 'var(--color-success)',
    path: '/questionnaires',
    chartType: 'assessments',
    lastUpdated: '2h ago',
    keyMetrics: [
      { label: 'completed', value: '267' },
      { label: 'pending', value: '28' },
      { label: 'success', value: '89%' }
    ],
    tags: ['assessments', 'analytics', 'reports']
  },
  {
    id: 'soldier-reports',
    title: 'Soldier performance',
    description: 'Individual progress and team analytics',
    icon: PeopleOutlined,
    color: 'var(--color-background-secondary)',
    iconColor: 'var(--color-info)',
    path: '/soldier',
    chartType: 'physical',
    lastUpdated: '1h ago',
    keyMetrics: [
      { label: 'active', value: '142' },
      { label: 'squads', value: '8' },
      { label: 'Avg score', value: '82%' }
    ],
    tags: ['profiles', 'performance', 'teams']
  },
  {
    id: 'trend-reports',
    title: 'performance trends',
    description: 'Predictive analytics and trend analysis',
    icon: TrendingUpOutlined,
    color: 'var(--color-background-secondary)',
    iconColor: 'var(--color-primary)',
    path: '/analysis',
    chartType: 'assessments',
    lastUpdated: '6h ago',
    keyMetrics: [
      { label: 'trends', value: '23' },
      { label: 'predictions', value: '12' },
      { label: 'accuracy', value: '94%' }
    ],
    tags: ['trends', 'predictions', 'analytics']
  }
]


function AnalysisDashboard() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'flex-start', 
        mb: 4 
      }}>
        {/* Action Buttons */}
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={<FilterListOutlined />}
            sx={{ 
              textTransform: 'none',
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-text-primary)',
              '&:hover': {
                backgroundColor: 'var(--color-secondary-hover)'
              }
            }}
          >
            Filter
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadOutlined />}
            sx={{ 
              textTransform: 'none',
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-text-primary)',
              '&:hover': {
                backgroundColor: 'var(--color-secondary-hover)'
              }
            }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<ShareOutlined />}
            sx={{ 
              textTransform: 'none',
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-text-primary)',
              '&:hover': {
                backgroundColor: 'var(--color-secondary-hover)'
              }
            }}
          >
            Share
          </Button>
          <Button
            variant="contained"
            startIcon={<AddOutlined />}
            sx={{ 
              textTransform: 'none',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-white)',
              '&:hover': {
                backgroundColor: 'var(--color-primary-hover)'
              }
            }}
          >
            Add Report
          </Button>
        </Stack>
      </Box>

      {/* reports Grid */}
      <Grid container spacing={3}>
        {reportCards.map((report) => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={report.id}>
            <ReportPreview report={report} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default AnalysisDashboard
