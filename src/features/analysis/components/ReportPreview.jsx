import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Typography,
  Chip,
  Avatar,
  Grid
} from '@mui/material'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { useNavigate } from 'react-router-dom'

// Sample data for different report types
const sampleData = {
  medical: [
    { name: 'Jan', injuries: 12, assessments: 45, healthy: 180 },
    { name: 'Feb', injuries: 8, assessments: 52, healthy: 185 },
    { name: 'Mar', injuries: 15, assessments: 48, healthy: 182 },
    { name: 'Apr', injuries: 6, assessments: 55, healthy: 188 },
    { name: 'May', injuries: 8, assessments: 24, healthy: 180 }
  ],
  physical: [
    { name: 'Week 1', sessions: 39, avgRPE: 7.2, attendance: 95 },
    { name: 'Week 2', sessions: 40, avgRPE: 7.8, attendance: 92 },
    { name: 'Week 3', sessions: 38, avgRPE: 6.9, attendance: 88 },
    { name: 'Week 4', sessions: 39, avgRPE: 8.1, attendance: 96 }
  ],
  nutrition: [
    { name: 'Protein', value: 85, color: '#3B4960' },
    { name: 'Carbs', value: 78, color: '#388e3c' },
    { name: 'Fats', value: 92, color: '#f57c00' },
    { name: 'Hydration', value: 88, color: '#7b1fa2' }
  ],
  psychological: [
    { name: 'Stress', value: 72, color: '#d32f2f' },
    { name: 'Motivation', value: 85, color: '#388e3c' },
    { name: 'Confidence', value: 78, color: '#3B4960' },
    { name: 'Team Cohesion', value: 91, color: '#7b1fa2' }
  ],
  calendar: [
    { name: 'Training', events: 45, color: '#3B4960' },
    { name: 'Medical', events: 12, color: '#d32f2f' },
    { name: 'Nutrition', events: 8, color: '#388e3c' },
    { name: 'Psychological', events: 6, color: '#f57c00' },
    { name: 'Games', events: 4, color: '#7b1fa2' }
  ],
  assessments: [
    { name: 'Jan', completed: 45, pending: 8, total: 53 },
    { name: 'Feb', completed: 52, pending: 5, total: 57 },
    { name: 'Mar', completed: 48, pending: 12, total: 60 },
    { name: 'Apr', completed: 55, pending: 3, total: 58 }
  ],
  leadership: [
    { name: 'May', entries: 100, graduates: 93, attrition: 5.1 },
    { name: 'Jun', entries: 98, graduates: 95, attrition: 4.8 },
    { name: 'Jul', entries: 102, graduates: 91, attrition: 6.2 },
    { name: 'Aug', entries: 99, graduates: 94, attrition: 5.5 }
  ]
}

function ReportPreview({ report }) {
  const navigate = useNavigate()
  const IconComponent = report.icon

  const handleCardClick = () => {
    navigate(report.path)
  }

  const renderChart = () => {
    const data = sampleData[report.chartType] || sampleData.medical

    switch (report.chartType) {
      case 'medical':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="injuries" 
                stackId="1" 
                stroke="#d32f2f" 
                fill="#ffebee" 
              />
              <Area 
                type="monotone" 
                dataKey="assessments" 
                stackId="1" 
                stroke="#3B4960" 
                fill="#e3f2fd" 
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      case 'physical':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="sessions" fill="#7b1fa2" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'nutrition':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )

      case 'psychological':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={data} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#f57c00" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )

      case 'calendar':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={15}
                outerRadius={45}
                paddingAngle={2}
                dataKey="events"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )

      case 'assessments':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#388e3c" 
                strokeWidth={2}
                dot={{ fill: '#388e3c', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="pending" 
                stroke="#f57c00" 
                strokeWidth={2}
                dot={{ fill: '#f57c00', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case 'leadership':
        return (
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="entries" fill="#3B4960" radius={[2, 2, 0, 0]} />
              <Bar dataKey="graduates" fill="#388e3c" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )

      default:
        return (
          <Box sx={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Chart Preview
            </Typography>
          </Box>
        )
    }
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-primary)',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          borderColor: 'var(--color-primary)'
        }
      }}
    >
      <CardActionArea
        onClick={handleCardClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          p: 0
        }}
      >
        <CardContent sx={{ flex: 1, p: 2, pb: 0 }}>
          {/* Header with Icon and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: report.color,
                color: report.iconColor,
                width: 32,
                height: 32,
                mr: 1.5
              }}
            >
              <IconComponent sx={{ fontSize: 18 }} />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.2
                }}
              >
                {report.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.75rem'
                }}
              >
                {report.lastUpdated}
              </Typography>
            </Box>
          </Box>

          {/* Chart Preview */}
          <Box sx={{ mb: 2, height: 120 }}>
            {renderChart()}
          </Box>
        </CardContent>

        {/* Bottom Section with Light Grey Background - Full Width */}
        <Box sx={{ 
          backgroundColor: '#f5f5f5', 
          p: 1.5,
          borderBottomLeftRadius: 'var(--radius-lg)',
          borderBottomRightRadius: 'var(--radius-lg)'
        }}>
          {/* Key Metrics */}
          <Grid container spacing={1} sx={{ mb: 1 }}>
            {report.keyMetrics.map((metric, index) => (
              <Grid item xs={4} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      fontSize: '0.9rem'
                    }}
                  >
                    {metric.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.7rem'
                    }}
                  >
                    {metric.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {report.tags.slice(0, 2).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  fontSize: '0.7rem',
                  height: 18,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  color: 'var(--color-text-secondary)',
                  '& .MuiChip-label': {
                    px: 0.5
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default ReportPreview
