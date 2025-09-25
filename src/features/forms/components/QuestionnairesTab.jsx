import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem as MenuItemComponent,
  Pagination
} from '@mui/material'
import {
  SearchOutlined,
  AddOutlined,
  MoreVertOutlined,
  SettingsOutlined
} from '@mui/icons-material'

// Mock form templates data matching the design
const formTemplates = [
  {
    id: 1,
    template: 'Sleep Hygiene Index',
    description: '',
    version: 5,
    productArea: 'Medical',
    category: 'General',
    createdBy: 'Kitman Labs Suppor',
    lastUpdated: 'Sep 24, 2025',
    createdAt: 'Sep 24, 2025'
  },
  {
    id: 2,
    template: 'Military Mental Skills',
    description: '',
    version: 23,
    productArea: 'Medical',
    category: 'General',
    createdBy: 'Kitman Labs Suppor',
    lastUpdated: 'Sep 23, 2025',
    createdAt: 'Sep 23, 2025'
  },
  {
    id: 3,
    template: 'Daily Wellbeing Assessment',
    description: 'Daily check-in for soldier wellness and readiness',
    version: 3,
    productArea: 'Wellness',
    category: 'Assessment',
    createdBy: 'Dr. Sarah Mitchell',
    lastUpdated: 'Sep 22, 2025',
    createdAt: 'Sep 20, 2025'
  },
  {
    id: 4,
    template: 'Injury Recovery Progress',
    description: 'Track recovery progress and pain levels',
    version: 2,
    productArea: 'Medical',
    category: 'Recovery',
    createdBy: 'Dr. Sarah Mitchell',
    lastUpdated: 'Sep 21, 2025',
    createdAt: 'Sep 18, 2025'
  },
  {
    id: 5,
    template: 'Training Load Assessment',
    description: 'Evaluate training intensity and recovery needs',
    version: 4,
    productArea: 'Physical',
    category: 'Performance',
    createdBy: 'Dr. Sarah Mitchell',
    lastUpdated: 'Sep 20, 2025',
    createdAt: 'Sep 15, 2025'
  }
]

function QuestionnairesTab() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  const categories = ['All', 'General', 'Assessment', 'Recovery', 'Performance']

  const filteredTemplates = formTemplates.filter(template => {
    const matchesSearch = template.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleMenuOpen = (event, template) => {
    setAnchorEl(event.currentTarget)
    setSelectedTemplate(template)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedTemplate(null)
  }

  const handleAction = (action) => {
    console.log(`${action} template:`, selectedTemplate)
    handleMenuClose()
  }


  return (
    <Box>
      {/* Search and Filter Bar */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          placeholder="Search"
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
            minWidth: 250,
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
            Category
          </InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
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
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          sx={{
            backgroundColor: 'var(--color-primary)',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'var(--color-primary-dark)'
            }
          }}
        >
          Create form
        </Button>
        <IconButton size="small">
          <SettingsOutlined />
        </IconButton>
      </Box>

      {/* Form Templates Table */}
      <Paper 
        elevation={0}
        sx={{
          border: '1px solid var(--color-border-primary)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden'
        }}
      >
        <TableContainer>
          <Table size="small" sx={{ minWidth: 1600 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'var(--color-background-secondary)' }}>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 250,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Template
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 300,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 100,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Version
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 150,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Product Area
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 120,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 180,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Created By
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 140,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Last Updated
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 140,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Created At
                </TableCell>
                <TableCell 
                  align="right"
                  sx={{
                    fontFamily: 'var(--font-family-primary)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                    borderBottom: '1px solid var(--color-border-primary)',
                    minWidth: 80,
                    whiteSpace: 'nowrap'
                  }}
                >
                </TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
            {filteredTemplates.map((template) => (
              <TableRow key={template.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {template.template}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {template.description || '-'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {template.version}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {template.productArea}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {template.category}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {template.createdBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {template.lastUpdated}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {template.createdAt}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, template)}
                  >
                    <MoreVertOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Rows:
          </Typography>
          <Select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            size="small"
            sx={{ minWidth: 60 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </Box>
        <Pagination
          count={Math.ceil(filteredTemplates.length / rowsPerPage)}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          color="primary"
        />
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItemComponent onClick={() => handleAction('view')}>
          View
        </MenuItemComponent>
        <MenuItemComponent onClick={() => handleAction('edit')}>
          Edit
        </MenuItemComponent>
        <MenuItemComponent onClick={() => handleAction('duplicate')}>
          Duplicate
        </MenuItemComponent>
        <MenuItemComponent onClick={() => handleAction('delete')} sx={{ color: 'error.main' }}>
          Delete
        </MenuItemComponent>
      </Menu>
    </Box>
  )
}

export default QuestionnairesTab
