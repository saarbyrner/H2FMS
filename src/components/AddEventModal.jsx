import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
  Autocomplete,
  FormControlLabel,
  RadioGroup,
  Radio,
  IconButton,
  Divider,
  Paper,
  Grid,
  InputAdornment,
} from '@mui/material';
import {
  Close,
  AttachFile,
  Person,
  Group,
  AccessTime,
  LocationOn,
  CalendarToday,
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AddEventModal = ({ open, onClose, onSave, athletes = [], staff = [] }) => {
  const [formData, setFormData] = useState({
    eventType: '',
    title: '',
    description: '',
    date: new Date(),
    startTime: new Date(),
    duration: 60,
    timezone: 'Europe/Dublin',
    repeats: 'none',
    location: '',
    selectedAthletes: [],
    selectedStaff: [],
    staffVisibility: 'all',
    attachments: [],
  });

  const [errors, setErrors] = useState({});

  const eventTypes = [
    'Training Session',
    'Game',
    'Meeting',
    'Assessment',
    'Recovery Session',
    'Team Building',
    'Medical Check',
    'Other',
  ];

  const repeatOptions = [
    { value: 'none', label: "Doesn't repeat" },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  const staffVisibilityOptions = [
    { value: 'all', label: 'All Staff' },
    { value: 'selected', label: 'Only Selected Staff' },
    { value: 'additional', label: 'Staff and Additional viewers' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.eventType) newErrors.eventType = 'Event type is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.startTime) newErrors.startTime = 'Start time is required';
    if (formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Create event object
      const newEvent = {
        id: Date.now().toString(),
        title: formData.title,
        start: formData.startTime.toISOString(),
        end: new Date(formData.startTime.getTime() + formData.duration * 60000).toISOString(),
        backgroundColor: getEventTypeColor(formData.eventType),
        borderColor: getEventTypeColor(formData.eventType),
        textColor: '#ffffff',
        url: `/planning_hub/events/${Date.now()}`,
        extendedProps: {
          eventType: formData.eventType.toUpperCase().replace(' ', '_'),
          description: formData.description,
          location: formData.location,
          duration: formData.duration,
          timezone: formData.timezone,
          repeats: formData.repeats,
          selectedAthletes: formData.selectedAthletes,
          selectedStaff: formData.selectedStaff,
          staffVisibility: formData.staffVisibility,
          attachments: formData.attachments,
          squad: formData.selectedAthletes.length > 0 ? 
            formData.selectedAthletes[0].squad_name || 'International Squad' : 
            'International Squad',
          coach: formData.selectedStaff.length > 0 ? 
            `${formData.selectedStaff[0].firstname} ${formData.selectedStaff[0].lastname}` : 
            'TBD',
        },
      };
      
      onSave(newEvent);
      onClose();
      
      // Reset form
      setFormData({
        eventType: '',
        title: '',
        description: '',
        date: new Date(),
        startTime: new Date(),
        duration: 60,
        timezone: 'Europe/Dublin',
        repeats: 'none',
        location: '',
        selectedAthletes: [],
        selectedStaff: [],
        staffVisibility: 'all',
        attachments: [],
      });
    }
  };

  const getEventTypeColor = (eventType) => {
    const colors = {
      'Training Session': '#482831',
      'Game': '#E62020',
      'Meeting': '#036BC6',
      'Assessment': '#01205D',
      'Recovery Session': '#B134C1',
      'Team Building': '#036BC6',
      'Medical Check': '#E62020',
      'Other': '#666666',
    };
    return colors[eventType] || '#666666';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            minHeight: '600px',
          },
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '24px 24px 16px 24px',
          borderBottom: '1px solid #e8eaed',
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1c1c1c' }}>
            New Event
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ padding: '24px' }}>
          <Grid container spacing={3}>
            {/* Event Type */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.eventType}>
                <InputLabel>Event Type</InputLabel>
                <Select
                  value={formData.eventType}
                  onChange={(e) => handleInputChange('eventType', e.target.value)}
                  label="Event Type"
                >
                  {eventTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.eventType && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors.eventType}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                helperText={`${formData.description.length}/250 characters remaining`}
                inputProps={{ maxLength: 250 }}
              />
            </Grid>

            {/* Date and Time */}
            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Date"
                value={formData.date}
                onChange={(newValue) => handleInputChange('date', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.date}
                    helperText={errors.date}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarToday fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DateTimePicker
                label="Start Time"
                value={formData.startTime}
                onChange={(newValue) => handleInputChange('startTime', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors.startTime}
                    helperText={errors.startTime}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccessTime fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {/* Duration and Timezone */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration"
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                error={!!errors.duration}
                helperText={errors.duration || 'minutes'}
                InputProps={{
                  endAdornment: <InputAdornment position="end">mins</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={formData.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  label="Timezone"
                >
                  <MenuItem value="Europe/Dublin">Europe/Dublin</MenuItem>
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="America/New_York">America/New_York</MenuItem>
                  <MenuItem value="Europe/London">Europe/London</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Repeats */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Repeats</InputLabel>
                <Select
                  value={formData.repeats}
                  onChange={(e) => handleInputChange('repeats', e.target.value)}
                  label="Repeats"
                >
                  {repeatOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Search locations..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Athletes */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={athletes}
                getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                value={formData.selectedAthletes}
                onChange={(event, newValue) => handleInputChange('selectedAthletes', newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option.id}
                      label={`${option.firstname} ${option.lastname}`}
                      {...getTagProps({ index })}
                      icon={<Person />}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Athletes"
                    placeholder="Select athletes..."
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Group fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {/* Staff */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={staff}
                getOptionLabel={(option) => `${option.firstname} ${option.lastname} (${option.role})`}
                value={formData.selectedStaff}
                onChange={(event, newValue) => handleInputChange('selectedStaff', newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option.id}
                      label={`${option.firstname} ${option.lastname}`}
                      {...getTagProps({ index })}
                      icon={<Person />}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Staff"
                    placeholder="Select staff..."
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Group fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {/* Staff Visibility */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Staff visibility
              </Typography>
              <RadioGroup
                value={formData.staffVisibility}
                onChange={(e) => handleInputChange('staffVisibility', e.target.value)}
              >
                {staffVisibilityOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio size="small" />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </Grid>

            {/* Attachments */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Attach
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  textAlign: 'center',
                  border: '2px dashed #e8eaed',
                  backgroundColor: '#fafafa',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <AttachFile sx={{ fontSize: 32, color: '#666', mb: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  Drag & Drop your files or browse
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Powered by PQINA
                </Typography>
              </Paper>
              <input
                id="file-upload"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              
              {/* Display uploaded files */}
              {formData.attachments.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  {formData.attachments.map((file, index) => (
                    <Chip
                      key={index}
                      label={file.name}
                      onDelete={() => removeAttachment(index)}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>

        <Divider />

        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button onClick={onClose} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              backgroundColor: '#3a8dee',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#0e478a',
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AddEventModal;
