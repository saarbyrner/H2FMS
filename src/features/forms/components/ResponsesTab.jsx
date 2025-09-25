import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import {
  SearchOutlined,
  MoreVertOutlined,
  VisibilityOutlined,
  DownloadOutlined,
  FilterListOutlined
} from '@mui/icons-material'
import questionnairesData from '../../../data/questionnaires_wellbeing.json'

function ResponsesTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedResponse, setSelectedResponse] = useState(null)

  const statuses = ['All', 'Completed', 'In Progress', 'Pending']

  const filteredResponses = questionnairesData.filter(response => {
    const matchesSearch = response.athlete_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         response.questionnaire_type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'All' || response.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleMenuOpen = (event, response) => {
    setAnchorEl(event.currentTarget)
    setSelectedResponse(response)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedResponse(null)
  }

  const handleAction = (action) => {
    console.log(`${action} response:`, selectedResponse)
    handleMenuClose()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success'
      case 'In Progress':
        return 'warning'
      case 'Pending':
        return 'default'
      default:
        return 'default'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 8) return 'success'
    if (score >= 6) return 'warning'
    return 'error'
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Responses
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View and manage questionnaire responses from soldiers
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Search responses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="filled"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined sx={{ fontSize: 'var(--icon-size-small)' }} />
              </InputAdornment>
            ),
          }}
          sx={{ 
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
        <Button
          variant="outlined"
          startIcon={<FilterListOutlined />}
          sx={{ minWidth: 120 }}
        >
          {selectedStatus}
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadOutlined />}
        >
          Export
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'success.main' }}>
                {filteredResponses.filter(r => r.status === 'Completed').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
                {filteredResponses.filter(r => r.status === 'In Progress').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {filteredResponses.filter(r => r.status === 'Pending').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                {filteredResponses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Responses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Responses Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 'var(--radius-lg)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Soldier</TableCell>
              <TableCell>Questionnaire</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Flags</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResponses.map((response) => (
              <TableRow key={response.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {response.athlete_name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {response.athlete_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {response.soldier_id}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {response.questionnaire_type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(response.questionnaire_date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(response.completion_time).toLocaleTimeString()}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={response.status}
                    color={getStatusColor(response.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={response.overall_score}
                    color={getScoreColor(response.overall_score)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  {response.wellness_flags.length > 0 ? (
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      {response.wellness_flags.slice(0, 2).map((flag, index) => (
                        <Chip
                          key={index}
                          label={flag}
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                      ))}
                      {response.wellness_flags.length > 2 && (
                        <Chip
                          label={`+${response.wellness_flags.length - 2}`}
                          size="small"
                          color="default"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      None
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, response)}
                  >
                    <MoreVertOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction('view')}>
          <VisibilityOutlined sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => handleAction('export')}>
          <DownloadOutlined sx={{ mr: 1 }} />
          Export Response
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ResponsesTab
