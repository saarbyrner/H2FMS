import React from 'react'
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import {
  MoreVertOutlined,
  TrendingDownOutlined,
  TrendingUpOutlined
} from '@mui/icons-material'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart
} from 'recharts'

// Sample data for the performance graphs
const performanceData = [
  { month: 'May', attrition: 95, recycles: 80, onTimeRate: 95, competencies: 90, disciplineIssues: 80, misconductNumbers: 85, complaints: 75, injuryCount: 80, illnessCount: 90, physicalFitness: 85, mtiPerformance: 85 },
  { month: 'Jun', attrition: 100, recycles: 95, onTimeRate: 100, competencies: 100, disciplineIssues: 85, misconductNumbers: 100, complaints: 90, injuryCount: 95, illnessCount: 30, physicalFitness: 90, mtiPerformance: 90 },
  { month: 'Jul', attrition: 90, recycles: 75, onTimeRate: 90, competencies: 95, disciplineIssues: 80, misconductNumbers: 40, complaints: 80, injuryCount: 75, illnessCount: 100, physicalFitness: 85, mtiPerformance: 40 },
  { month: 'Aug', attrition: 95, recycles: 80, onTimeRate: 95, competencies: 100, disciplineIssues: 85, misconductNumbers: 90, complaints: 75, injuryCount: 100, illnessCount: 95, physicalFitness: 90, mtiPerformance: 100 },
  { month: 'Oct', attrition: 80, recycles: 70, onTimeRate: 40, competencies: 90, disciplineIssues: 75, misconductNumbers: 85, complaints: 70, injuryCount: 80, illnessCount: 100, physicalFitness: 80, mtiPerformance: 80 },
  { month: 'Nov', attrition: 70, recycles: 75, onTimeRate: 90, competencies: 70, disciplineIssues: 80, misconductNumbers: 70, complaints: 75, injuryCount: 100, illnessCount: 70, physicalFitness: 85, mtiPerformance: 90 }
]

// Annual averages for each metric
const annualAverages = {
  attrition: [95, 100, 90, 95, 80, 70],
  recycles: [80, 95, 75, 80, 70, 75],
  onTimeRate: [95, 100, 90, 95, 40, 90],
  competencies: [90, 100, 95, 100, 90, 70],
  disciplineIssues: [80, 85, 80, 85, 75, 80],
  misconductNumbers: [85, 100, 40, 90, 85, 70],
  complaints: [75, 90, 80, 75, 70, 75],
  injuryCount: [80, 95, 75, 100, 80, 100],
  illnessCount: [90, 30, 100, 95, 100, 70],
  physicalFitness: [85, 90, 85, 90, 80, 85],
  mtiPerformance: [85, 90, 40, 100, 80, 90]
}

// Key metrics data
const keyMetrics = [
  { label: 'Entries', value: '100%', change: '-18%', period: 'Last 10 years', trend: 'down' },
  { label: 'Risk Rate', value: '4%', change: '-2%', period: '3yr average', trend: 'down' },
  { label: 'Recycle Rate', value: '2.5%', change: '-2%', period: '3yr average', trend: 'down' },
  { label: 'Vulnerable Rate', value: '10%', change: '-2%', period: '3yr average', trend: 'down' },
  { label: 'Attrition', value: '5.1%', change: '-2%', period: '3yr average', trend: 'down' },
  { label: 'Graduates', value: '93%', change: '-2%', period: '3yr average', trend: 'down' }
]

// Chart configurations
const chartConfigs = [
  { dataKey: 'attrition', title: 'Attrition', color: '#3B4960' },
  { dataKey: 'recycles', title: 'Recycles', color: '#3B4960' },
  { dataKey: 'onTimeRate', title: 'On-Time Rate', color: '#3B4960' },
  { dataKey: 'competencies', title: 'Competencies', color: '#3B4960' },
  { dataKey: 'disciplineIssues', title: 'Discipline Issues', color: '#3B4960' },
  { dataKey: 'misconductNumbers', title: 'Misconduct Numbers', color: '#3B4960' },
  { dataKey: 'misconductNumbers', title: 'Misconduct Numbers', color: '#3B4960' },
  { dataKey: 'complaints', title: 'Complaints', color: '#3B4960' },
  { dataKey: 'injuryCount', title: 'Injury Count', color: '#3B4960' },
  { dataKey: 'illnessCount', title: 'Illness Count', color: '#3B4960' },
  { dataKey: 'physicalFitness', title: 'Physical Fitness', color: '#3B4960' },
  { dataKey: 'mtiPerformance', title: 'MTI Performance', color: '#3B4960' }
]

function PerformanceChart({ dataKey, title, color }) {
  const data = performanceData.map((item, index) => ({
    ...item,
    annualAverage: annualAverages[dataKey][index]
  }))

  return (
    <Card sx={{ height: '100%', borderRadius: 'var(--radius-lg)' }}>
      <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {title}
        </Typography>
        <Box sx={{ flex: 1, minHeight: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                axisLine={{ stroke: 'var(--color-border-primary)' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
                axisLine={{ stroke: 'var(--color-border-primary)' }}
                label={{ value: 'Count', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'var(--color-text-secondary)' } }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-background-primary)',
                  border: '1px solid var(--color-border-primary)',
                  borderRadius: 'var(--radius-md)'
                }}
              />
              <Bar dataKey={dataKey} fill={color} radius={[2, 2, 0, 0]} />
              <Line 
                type="monotone" 
                dataKey="annualAverage" 
                stroke="#d32f2f" 
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

function KeyMetricCard({ metric }) {
  const TrendIcon = metric.trend === 'down' ? TrendingDownOutlined : TrendingUpOutlined
  const trendColor = metric.trend === 'down' ? '#d32f2f' : '#388e3c'

  return (
    <Card sx={{ 
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--color-border-primary)',
      height: '100%'
    }}>
      <CardContent sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          color: 'var(--color-text-primary)',
          mb: 1
        }}>
          {metric.value}
        </Typography>
        <Typography variant="body2" sx={{ 
          color: 'var(--color-text-secondary)',
          mb: 2,
          fontSize: '0.9rem'
        }}>
          {metric.label}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
          <TrendIcon sx={{ color: trendColor, fontSize: 16 }} />
          <Typography variant="caption" sx={{ 
            color: trendColor,
            fontWeight: 600,
            fontSize: '0.8rem'
          }}>
            {metric.change} {metric.period}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

function LeadershipBoard() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          color: 'var(--color-text-primary)',
          mb: 1
        }}>
          Leadership Board
        </Typography>
      </Box>

      {/* Key Metrics Summary */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          color: 'var(--color-text-primary)',
          mb: 2
        }}>
          This month
        </Typography>
        <Grid container spacing={2}>
          {keyMetrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <KeyMetricCard metric={metric} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Key Metrics Over Time Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ 
          backgroundColor: '#1e3a8a', 
          color: 'white', 
          p: 2, 
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Key metrics over time
          </Typography>
          <Box sx={{ 
            width: 24, 
            height: 24, 
            backgroundColor: 'white', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1e3a8a',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            K
          </Box>
        </Box>
        <Box sx={{ 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          p: 1.5, 
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            All cohorts
          </Typography>
          <IconButton 
            size="small" 
            onClick={handleClick}
            sx={{ color: 'white' }}
          >
            <MoreVertOutlined />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Export Data</MenuItem>
            <MenuItem onClick={handleClose}>Filter Cohorts</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Performance Graphs Grid */}
      <Grid container spacing={2}>
        {chartConfigs.map((config, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <PerformanceChart 
              dataKey={config.dataKey} 
              title={config.title} 
              color={config.color} 
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default LeadershipBoard
