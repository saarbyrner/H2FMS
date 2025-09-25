import React, { useState, useEffect } from 'react'
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Divider,
  Alert,
  Snackbar,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper
} from '@mui/material'
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  EditOutlined,
  SaveOutlined,
  DragIndicatorOutlined
} from '@mui/icons-material'

// Default navigation configuration
const defaultNavConfig = {
  sections: {
    primary: {
      name: 'Primary',
      items: {
        soldiers: { label: 'Soldiers', visible: true }
      }
    },
    secondary: {
      name: 'Secondary',
      items: {
        physical: { label: 'Physical', visible: true },
        medical: { label: 'Medical', visible: true },
        nutrition: { label: 'Nutrition', visible: true },
        psychological: { label: 'Psychological', visible: true }
      }
    },
    tertiary: {
      name: 'Tertiary',
      items: {
        analysis: { label: 'Analysis', visible: true },
        calendar: { label: 'Calendar', visible: true },
        forms: { label: 'Forms', visible: true },
        media: { label: 'Media', visible: true }
      }
    }
  }
}

function SettingsDashboard() {
  const [navConfig, setNavConfig] = useState(defaultNavConfig)
  const [editingItem, setEditingItem] = useState(null)
  const [tempItemName, setTempItemName] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)

  // Load configuration from localStorage on mount with migration
  useEffect(() => {
    const savedConfig = localStorage.getItem('navConfig')
    const configVersion = localStorage.getItem('navConfigVersion')
    const currentVersion = '2.0' // Increment this when structure changes
    
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig)
      
      // Migration: Update old structure to new Primary/Secondary/Tertiary structure
      if (parsedConfig.sections?.main || parsedConfig.sections?.soldiers || configVersion !== currentVersion) {
        const migratedConfig = {
          sections: {
            primary: {
              name: 'Primary',
              items: {}
            },
            secondary: {
              name: 'Secondary', 
              items: {}
            },
            tertiary: {
              name: 'Tertiary',
              items: {}
            }
          }
        }
        
        // Migrate items from any existing structure
        const allItems = {}
        
        // Collect all items from all possible sections (old and new)
        Object.values(parsedConfig.sections || {}).forEach(section => {
          if (section.items) {
            Object.assign(allItems, section.items)
          }
        })
        
        // Ensure we have all default items, even if they weren't in the old config
        const defaultItems = {
          soldiers: { label: 'Soldiers', visible: true },
          physical: { label: 'Physical', visible: true },
          medical: { label: 'Medical', visible: true },
          nutrition: { label: 'Nutrition', visible: true },
          psychological: { label: 'Psychological', visible: true },
          analysis: { label: 'Analysis', visible: true },
          calendar: { label: 'Calendar', visible: true },
          forms: { label: 'Forms', visible: true },
          media: { label: 'Media', visible: true }
        }
        
        // Merge existing items with defaults (existing items take precedence)
        Object.keys(defaultItems).forEach(key => {
          if (!allItems[key]) {
            allItems[key] = defaultItems[key]
          }
        })
        
        // Distribute items to new sections based on default structure
        const primaryItems = ['soldiers']
        const secondaryItems = ['physical', 'medical', 'nutrition', 'psychological']
        const tertiaryItems = ['analysis', 'calendar', 'forms', 'media']
        
        primaryItems.forEach(key => {
          if (allItems[key]) {
            migratedConfig.sections.primary.items[key] = allItems[key]
          }
        })
        
        secondaryItems.forEach(key => {
          if (allItems[key]) {
            migratedConfig.sections.secondary.items[key] = allItems[key]
          }
        })
        
        tertiaryItems.forEach(key => {
          if (allItems[key]) {
            migratedConfig.sections.tertiary.items[key] = allItems[key]
          }
        })
        
        setNavConfig(migratedConfig)
        localStorage.setItem('navConfig', JSON.stringify(migratedConfig))
        localStorage.setItem('navConfigVersion', currentVersion)
        window.dispatchEvent(new CustomEvent('navConfigChanged'))
      } else {
        setNavConfig(parsedConfig)
      }
    }
  }, [])


  const saveConfigAndNotify = (newConfig) => {
    setNavConfig(newConfig)
    localStorage.setItem('navConfig', JSON.stringify(newConfig))
    // Dispatch custom event to notify navigation component
    window.dispatchEvent(new CustomEvent('navConfigChanged'))
  }

  const handleToggleVisibility = (sectionKey, itemKey) => {
    const newConfig = {
      ...navConfig,
      sections: {
        ...navConfig.sections,
        [sectionKey]: {
          ...navConfig.sections[sectionKey],
          items: {
            ...navConfig.sections[sectionKey].items,
            [itemKey]: {
              ...navConfig.sections[sectionKey].items[itemKey],
              visible: !navConfig.sections[sectionKey].items[itemKey].visible
            }
          }
        }
      }
    }
    saveConfigAndNotify(newConfig)
  }


  const handleStartEditItem = (sectionKey, itemKey) => {
    setEditingItem(`${sectionKey}-${itemKey}`)
    setTempItemName(navConfig.sections[sectionKey].items[itemKey].label)
  }

  const handleSaveItemName = (sectionKey, itemKey) => {
    const newConfig = {
      ...navConfig,
      sections: {
        ...navConfig.sections,
        [sectionKey]: {
          ...navConfig.sections[sectionKey],
          items: {
            ...navConfig.sections[sectionKey].items,
            [itemKey]: {
              ...navConfig.sections[sectionKey].items[itemKey],
              label: tempItemName
            }
          }
        }
      }
    }
    saveConfigAndNotify(newConfig)
    setEditingItem(null)
    setTempItemName('')
    setShowSuccess(true)
  }

  const handleCancelEditItem = () => {
    setEditingItem(null)
    setTempItemName('')
  }

  const handleResetToDefaults = () => {
    saveConfigAndNotify(defaultNavConfig)
    setShowSuccess(true)
  }


  const handleDragStart = (e, sectionKey, itemKey) => {
    setDraggedItem({ sectionKey, itemKey })
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.outerHTML)
    e.target.style.opacity = '0.5'
  }

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1'
    setDraggedItem(null)
    setDragOverItem(null)
  }

  const handleDragOver = (e, sectionKey, itemKey) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'move'
    setDragOverItem({ sectionKey, itemKey })
  }

  const handleDragLeave = (e) => {
    // Only clear if we're actually leaving the item (not just moving to a child)
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverItem(null)
    }
  }

  const handleDrop = (e, targetSectionKey, targetItemKey) => {
    e.preventDefault()
    
    if (!draggedItem) return
    
    const { sectionKey: sourceSectionKey, itemKey: sourceItemKey } = draggedItem
    
    // Don't drop on itself
    if (sourceItemKey === targetItemKey && sourceSectionKey === targetSectionKey) {
      setDraggedItem(null)
      setDragOverItem(null)
      return
    }
    
    const sourceSection = navConfig.sections[sourceSectionKey]
    const targetSection = navConfig.sections[targetSectionKey]
    
    // If moving within the same section, just reorder
    if (sourceSectionKey === targetSectionKey) {
      const items = Object.entries(sourceSection.items)
      const sourceIndex = items.findIndex(([key]) => key === sourceItemKey)
      const targetIndex = items.findIndex(([key]) => key === targetItemKey)
      
      const newItems = [...items]
      const [movedItem] = newItems.splice(sourceIndex, 1)
      newItems.splice(targetIndex, 0, movedItem)
      
      const newConfig = {
        ...navConfig,
        sections: {
          ...navConfig.sections,
          [sourceSectionKey]: {
            ...sourceSection,
            items: Object.fromEntries(newItems)
          }
        }
      }
      
      saveConfigAndNotify(newConfig)
    } else {
      // Moving between sections
      const sourceItems = Object.entries(sourceSection.items)
      const targetItems = Object.entries(targetSection.items)
      
      // Find the item to move
      const movedItem = sourceItems.find(([key]) => key === sourceItemKey)
      if (!movedItem) return
      
      // Find target position
      const targetIndex = targetItems.findIndex(([key]) => key === targetItemKey)
      
      // Remove from source section
      const newSourceItems = sourceItems.filter(([key]) => key !== sourceItemKey)
      
      // Add to target section at the specified position
      const newTargetItems = [...targetItems]
      newTargetItems.splice(targetIndex, 0, movedItem)
      
      const newConfig = {
        ...navConfig,
        sections: {
          ...navConfig.sections,
          [sourceSectionKey]: {
            ...sourceSection,
            items: Object.fromEntries(newSourceItems)
          },
          [targetSectionKey]: {
            ...targetSection,
            items: Object.fromEntries(newTargetItems)
          }
        }
      }
      
      saveConfigAndNotify(newConfig)
    }
    
    setDraggedItem(null)
    setDragOverItem(null)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure navigation visibility and customize your experience
        </Typography>
      </Box>

      {/* Navigation Settings */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h2">
              Navigation Settings
            </Typography>
            <Stack direction="row" spacing={1} sx={{ ml: 'auto' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleResetToDefaults}
              >
                Reset to Defaults
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  localStorage.removeItem('navConfig')
                  localStorage.removeItem('navConfigVersion')
                  window.location.reload()
                }}
                color="warning"
              >
                Force Reset
              </Button>
            </Stack>
          </Box>

          {Object.entries(navConfig.sections).map(([sectionKey, section]) => (
            <Box key={sectionKey} sx={{ mb: 4 }}>
              {/* Section Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ flex: 1 }}>
                  {section.name}
                </Typography>
              </Box>

              {/* Navigation Items */}
              <Paper 
                variant="outlined" 
                sx={{ 
                  mt: 2,
                  minHeight: Object.keys(section.items).length === 0 ? 100 : 'auto',
                  backgroundColor: draggedItem && draggedItem.sectionKey !== sectionKey 
                    ? 'rgba(25, 118, 210, 0.02)' 
                    : 'transparent',
                  border: draggedItem && draggedItem.sectionKey !== sectionKey 
                    ? '2px dashed rgba(25, 118, 210, 0.3)' 
                    : '1px solid rgba(0, 0, 0, 0.12)',
                  transition: 'all 0.2s ease'
                }}
                onDragOver={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  e.dataTransfer.dropEffect = 'move'
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  
                  if (!draggedItem) return
                  
                  const { sectionKey: sourceSectionKey, itemKey: sourceItemKey } = draggedItem
                  
                  // Don't drop on the same section if it's empty
                  if (sourceSectionKey === sectionKey) {
                    setDraggedItem(null)
                    setDragOverItem(null)
                    return
                  }
                  
                  const sourceSection = navConfig.sections[sourceSectionKey]
                  const targetSection = navConfig.sections[sectionKey]
                  
                  // Find the item to move
                  const sourceItems = Object.entries(sourceSection.items)
                  const movedItem = sourceItems.find(([key]) => key === sourceItemKey)
                  if (!movedItem) return
                  
                  // Remove from source section
                  const newSourceItems = sourceItems.filter(([key]) => key !== sourceItemKey)
                  
                  // Add to target section (at the end since it's empty or we're dropping on the container)
                  const targetItems = Object.entries(targetSection.items)
                  const newTargetItems = [...targetItems, movedItem]
                  
                  const newConfig = {
                    ...navConfig,
                    sections: {
                      ...navConfig.sections,
                      [sourceSectionKey]: {
                        ...sourceSection,
                        items: Object.fromEntries(newSourceItems)
                      },
                      [sectionKey]: {
                        ...targetSection,
                        items: Object.fromEntries(newTargetItems)
                      }
                    }
                  }
                  
                  saveConfigAndNotify(newConfig)
                  setDraggedItem(null)
                  setDragOverItem(null)
                }}
              >
                <List sx={{ p: 0 }}>
                  {Object.keys(section.items).length === 0 ? (
                    <ListItem sx={{ 
                      minHeight: 100, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'text.secondary',
                      fontStyle: 'italic'
                    }}>
                      <Typography variant="body2">
                        {draggedItem && draggedItem.sectionKey !== sectionKey 
                          ? 'Drop here to move item to this section' 
                          : 'No items in this section'}
                      </Typography>
                    </ListItem>
                  ) : (
                    Object.entries(section.items).map(([itemKey, item], index) => (
                    <ListItem
                      key={itemKey}
                      draggable
                      onDragStart={(e) => handleDragStart(e, sectionKey, itemKey)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOver(e, sectionKey, itemKey)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, sectionKey, itemKey)}
                      sx={{
                        opacity: item.visible ? 1 : 0.6,
                        transition: 'all 0.2s ease',
                        borderBottom: index < Object.entries(section.items).length - 1 ? '1px solid rgba(0, 0, 0, 0.12)' : 'none',
                        backgroundColor: dragOverItem?.sectionKey === sectionKey && dragOverItem?.itemKey === itemKey 
                          ? 'rgba(25, 118, 210, 0.08)' 
                          : draggedItem?.sectionKey !== sectionKey && dragOverItem?.sectionKey === sectionKey
                          ? 'rgba(25, 118, 210, 0.04)'
                          : 'transparent',
                        cursor: 'move',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)'
                        }
                      }}
                    >
                      {/* Drag Handle */}
                      <Box
                        sx={{ 
                          mr: 1,
                          cursor: 'grab',
                          display: 'flex',
                          alignItems: 'center',
                          color: 'text.secondary',
                          '&:active': { cursor: 'grabbing' },
                          '&:hover': { color: 'text.primary' }
                        }}
                      >
                        <DragIndicatorOutlined fontSize="small" />
                      </Box>

                      {/* Item Info */}
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {editingItem === `${sectionKey}-${itemKey}` ? (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                                <TextField
                                  value={tempItemName}
                                  onChange={(e) => setTempItemName(e.target.value)}
                                  size="small"
                                  variant="outlined"
                                  sx={{ flex: 1 }}
                                />
                                <Button
                                  size="small"
                                  startIcon={<SaveOutlined />}
                                  onClick={() => handleSaveItemName(sectionKey, itemKey)}
                                  variant="contained"
                                >
                                  Save
                                </Button>
                                <Button
                                  size="small"
                                  onClick={handleCancelEditItem}
                                  variant="outlined"
                                >
                                  Cancel
                                </Button>
                              </Box>
                            ) : (
                              <>
                                <Typography variant="body1" fontWeight="medium">
                                  {item.label}
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                                    px: 1, 
                                    py: 0.25, 
                                    borderRadius: 1,
                                    fontSize: '0.7rem'
                                  }}
                                >
                                  #{index + 1}
                                </Typography>
                                <IconButton
                                  size="small"
                                  onClick={() => handleStartEditItem(sectionKey, itemKey)}
                                  sx={{ ml: 1, p: 0.5 }}
                                >
                                  <EditOutlined fontSize="small" />
                                </IconButton>
                              </>
                            )}
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {item.visible ? 'Visible in navigation' : 'Hidden from navigation'}
                          </Typography>
                        }
                      />

                      {/* Controls */}
                      <ListItemSecondaryAction>
                        {/* Visibility Toggle */}
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={item.visible}
                              onChange={() => handleToggleVisibility(sectionKey, itemKey)}
                              icon={<VisibilityOffOutlined />}
                              checkedIcon={<VisibilityOutlined />}
                              sx={{ 
                                '&.Mui-checked': { 
                                  color: 'var(--color-primary)' 
                                } 
                              }}
                            />
                          }
                          label=""
                          sx={{ m: 0 }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    ))
                  )}
                </List>
              </Paper>

              {sectionKey !== Object.keys(navConfig.sections)[Object.keys(navConfig.sections).length - 1] && (
                <Divider sx={{ mt: 3 }} />
              )}
            </Box>
          ))}

        </CardContent>
      </Card>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        message="Settings saved successfully!"
      />
    </Container>
  )
}

export default SettingsDashboard
