import React, { useState } from 'react'
import { Box, Typography, Paper, Alert, Snackbar } from '@mui/material'
import { SoldierDataGrid } from '../components'
import soldiersData from '../data/soldiers.json'
import '../styles/design-tokens.css'

/**
 * Soldiers page with comprehensive DataGrid
 * Displays all soldiers with premium features like filtering, grouping, and export
 */
function Soldiers() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' })

  const handleBulkAction = (action, selectedRows) => {
    const selectedSoldiers = soldiersData.filter(soldier => selectedRows.includes(soldier.id))
    const count = selectedSoldiers.length
    
    let message = ''
    let severity = 'info'
    
    switch (action) {
      case 'view':
        message = `Viewing ${count} selected soldier${count > 1 ? 's' : ''}`
        break
      case 'email':
        message = `Sending email to ${count} soldier${count > 1 ? 's' : ''}`
        severity = 'success'
        break
      case 'group':
        message = `Creating group from ${count} soldier${count > 1 ? 's' : ''}`
        severity = 'success'
        break
      case 'export':
        message = `Exporting ${count} soldier${count > 1 ? 's' : ''} to spreadsheet`
        severity = 'success'
        break
      case 'assessment':
        message = `Scheduling assessment for ${count} soldier${count > 1 ? 's' : ''}`
        severity = 'success'
        break
      case 'remove':
        message = `Removing ${count} soldier${count > 1 ? 's' : ''} from system`
        severity = 'warning'
        break
      default:
        message = `Unknown action: ${action}`
        severity = 'error'
    }
    
    setSnackbar({ open: true, message, severity })
  }

  return (
    <Box sx={{ p: 3 }}>
      <SoldierDataGrid 
        data={soldiersData}
        height={700}
        showToolbar={true}
        onBulkAction={handleBulkAction}
      />
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Soldiers