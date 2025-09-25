import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  InputAdornment, 
  FormControlLabel, 
  Checkbox, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  IconButton,
  Chip,
  Autocomplete
} from '@mui/material';
import { ExpandMoreOutlined, ExpandLessOutlined, SearchOutlined, CloseOutlined } from '@mui/icons-material';
import MedinahButton from './Button';
import '../styles/design-tokens.css';

// Utilidad para filtrar por búsqueda simple (case-insensitive)
const matchSearch = (label, term) => label.toLowerCase().includes(term.toLowerCase());

/**
 * Sidebar de Filtros
 * Props:
 *  - onClose: cerrar sidebar
 *  - selectedFilters: { squads:[], types:[], locations:[] }
 *  - availableOptions: { squads:[], types:[], locations:[] }
 *  - onFiltersChange: (filtrosActualizados) => void
 */
const FiltersSidebar = ({ 
  onClose, 
  selectedFilters, 
  availableOptions, 
  onFiltersChange
}) => {
  // Accordion states
  const [typesExpanded, setTypesExpanded] = useState(false);
  const [squadsExpanded, setSquadsExpanded] = useState(false);
  const [attendeesExpanded, setAttendeesExpanded] = useState(false);
  const [locationExpanded, setLocationExpanded] = useState(false);
  // Use types directly from availableOptions (already unified by parent component)
  const unifiedTypes = availableOptions.types;

  // Helpers de modificación
  const toggleInArray = (arr, value) => arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
  const setAll = (key, values) => onFiltersChange({ ...selectedFilters, [key]: values.slice() });
  const clearAll = (key) => onFiltersChange({ ...selectedFilters, [key]: [] });
  const handleToggle = (key, value) => onFiltersChange({ ...selectedFilters, [key]: toggleInArray(selectedFilters[key], value) });

  const FilterSection = ({ 
    title, 
    count,
    expanded, 
    onToggle, 
    children, 
    onSelectAll,
    onClearAll,
    showSearch = true,
    searchValue = '',
    onSearchChange = () => {}
  }) => (
    <Accordion 
      expanded={expanded} 
      onChange={onToggle}
      sx={{
        boxShadow: 'none',
        border: 'none',
        '&:before': { display: 'none' },
        '&.Mui-expanded': { margin: 0 }
      }}
    >
      <AccordionSummary
        expandIcon={expanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        sx={{
          minHeight: '48px',
          '& .MuiAccordionSummary-content': {
            margin: '8px 0',
            alignItems: 'center'
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: 'var(--color-text-secondary)'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-text-primary)'
            }}
          >
            {title}
          </Typography>
          {count > 0 && (
            <Chip 
              label={count} 
              size="small" 
              sx={{ 
                height: '18px',
                fontSize: 'var(--font-size-xs)',
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-white)'
              }} 
            />
          )}
        </Box>
      </AccordionSummary>
      
      <AccordionDetails sx={{ padding: '0 16px 16px 16px' }}>
        {showSearch && (
          <TextField
            variant="filled"
            size="small"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined sx={{ fontSize: 'var(--icon-size-small)', color: 'var(--color-text-muted)' }} />
                </InputAdornment>
              ),
            }}
            sx={{ 
              width: '100%',
              mb: 2,
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
        )}

        {onSelectAll && onClearAll && (
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <MedinahButton 
              variant="secondary" 
              size="small" 
              onClick={onSelectAll}
              sx={{ flex: 1, fontSize: 'var(--font-size-xs)' }}
            >
              Select all
            </MedinahButton>
            <MedinahButton 
              variant="secondary" 
              size="small" 
              onClick={onClearAll}
              sx={{ flex: 1, fontSize: 'var(--font-size-xs)' }}
            >
              Clear
            </MedinahButton>
          </Box>
        )}

        {children}
      </AccordionDetails>
    </Accordion>
  );

  const CheckboxList = ({ items, selected, onChange }) => (
    <Box>
      {items.map(item => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={selected.includes(item)}
              onChange={() => onChange(item)}
              size="small"
              sx={{
                color: 'var(--color-text-secondary)',
                '&.Mui-checked': {
                  color: 'var(--color-primary)'
                }
              }}
            />
          }
          label={
            <Typography 
              variant="body2" 
              sx={{ 
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)'
              }}
            >
              {item}
            </Typography>
          }
          sx={{ 
            margin: 0,
            marginBottom: 0.5,
            '& .MuiFormControlLabel-label': {
              marginLeft: 1
            }
          }}
        />
      ))}
      {!items.length && (
        <Typography 
          variant="caption" 
          sx={{ 
            fontSize: 'var(--font-size-xs)', 
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-family-primary)'
          }}
        >
          No results
        </Typography>
      )}
    </Box>
  );

  const AutocompleteFilterSection = ({ 
    title, 
    count,
    expanded, 
    onToggle, 
    items = [],
    selected = [],
    onChange,
    onSelectAll,
    onClearAll
  }) => (
    <Accordion 
      expanded={expanded} 
      onChange={onToggle}
      sx={{ 
        boxShadow: 'none',
        '&:before': { display: 'none' },
        '&.Mui-expanded': { margin: 0 }
      }}
    >
      <AccordionSummary
        expandIcon={expanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
        sx={{
          backgroundColor: '#fff',
          padding: expanded ? '0 var(--spacing-md)' : 'var(--spacing-sm) var(--spacing-md)',
          minHeight: 'auto',
          '& .MuiAccordionSummary-content': {
            margin: 0,
            alignItems: 'center',
            justifyContent: 'space-between'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              fontSize: 'var(--font-size-sm)', 
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'var(--font-family-primary)',
              color: 'var(--color-text-primary)'
            }}
          >
            {title}
          </Typography>
          {count > 0 && (
            <Box
              sx={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                borderRadius: '50%',
                minWidth: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                marginLeft: 1
              }}
            >
              {count}
            </Box>
          )}
        </Box>
      </AccordionSummary>
      
      <AccordionDetails sx={{ padding: '0 var(--spacing-md)' }}>
        {onSelectAll && onClearAll && (
          <Box sx={{ display: 'flex', gap: 1, marginBottom: 1 }}>
            <Typography
              variant="caption"
              onClick={onSelectAll}
              sx={{
                color: 'var(--color-primary)',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Select all
            </Typography>
            <Typography sx={{ color: 'var(--color-text-disabled)', fontSize: 'var(--font-size-xs)' }}>|</Typography>
            <Typography
              variant="caption"
              onClick={onClearAll}
              sx={{
                color: 'var(--color-primary)',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: 'var(--font-family-primary)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)'
              }}
            >
              Clear
            </Typography>
          </Box>
        )}

        <Autocomplete
          multiple
          options={items}
          value={selected}
          onChange={(event, newValue) => onChange(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="filled"
                label={option}
                size="small"
                {...getTagProps({ index })}
                key={option}
                sx={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--font-size-xs)',
                  '& .MuiChip-deleteIcon': {
                    color: 'white',
                  },
                }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              placeholder={`Select ${title.toLowerCase()}...`}
              size="small"
              sx={{
                '& .MuiFilledInput-root': {
                  backgroundColor: 'var(--color-background-secondary)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-family-primary)',
                  minHeight: '48px',
                  '&:hover': {
                    backgroundColor: 'var(--color-background-secondary)',
                  },
                  '&.Mui-focused': {
                    backgroundColor: 'var(--color-background-secondary)',
                  },
                },
                '& .MuiFilledInput-input': {
                  padding: '16px 12px 16px 12px',
                  fontSize: 'var(--font-size-sm)',
                  minHeight: '48px',
                },
              }}
            />
          )}
          sx={{
            '& .MuiAutocomplete-root': {
              minHeight: '48px',
            },
            '& .MuiAutocomplete-inputRoot': {
              minHeight: '48px',
            },
            '& .MuiAutocomplete-popupIndicator': {
              color: 'var(--color-text-secondary)',
            },
            '& .MuiAutocomplete-clearIndicator': {
              color: 'var(--color-text-secondary)',
            },
          }}
        />
      </AccordionDetails>
    </Accordion>
  );

  const SelectField = ({ label, value, onChange, placeholder, options = [] }) => (
    <div style={{ marginBottom: 'var(--spacing-md)' }}>
      <label className="form-label">{label}</label>
      <select
        className="form-input"
        value={value}
        onChange={onChange}
        style={{ width: '100%' }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Box
      sx={{
        width: '340px',
        backgroundColor: 'var(--color-background-primary)',
        borderRight: '1px solid var(--color-border-primary)',
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--spacing-md) var(--spacing-lg)',
          borderBottom: '1px solid var(--color-border-primary)',
          backgroundColor: 'var(--color-background-primary)',
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: 'var(--font-family-primary)',
            fontSize: 'var(--font-size-base)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)'
          }}
        >
          Filters
        </Typography>
        <IconButton 
          onClick={onClose}
          size="small"
          sx={{ 
            color: 'var(--color-text-secondary)',
            '&:hover': { color: 'var(--color-text-primary)' }
          }}
        >
          <CloseOutlined />
        </IconButton>
      </Box>

      <Box sx={{ padding: 0 }}>
        {/* Types Section - Now at the top */}
        <AutocompleteFilterSection
          title="Types"
          count={selectedFilters.types.length}
          expanded={typesExpanded}
          onToggle={() => setTypesExpanded(!typesExpanded)}
          items={unifiedTypes}
          selected={selectedFilters.types}
          onChange={(newValue) => onFiltersChange({ ...selectedFilters, types: newValue })}
          onSelectAll={() => setAll('types', unifiedTypes)}
          onClearAll={() => clearAll('types')}
        />

        {/* Squads Section */}
        <AutocompleteFilterSection
          title="Squads"
          count={selectedFilters.squads.length}
          expanded={squadsExpanded}
          onToggle={() => setSquadsExpanded(!squadsExpanded)}
          items={availableOptions.squads}
          selected={selectedFilters.squads}
          onChange={(newValue) => onFiltersChange({ ...selectedFilters, squads: newValue })}
          onSelectAll={() => setAll('squads', availableOptions.squads)}
          onClearAll={() => clearAll('squads')}
        />


        {/* Attendees Section */}
        <AutocompleteFilterSection
          title="Attendees"
          count={selectedFilters.attendees.length}
          expanded={attendeesExpanded}
          onToggle={() => setAttendeesExpanded(!attendeesExpanded)}
          items={availableOptions.attendees}
          selected={selectedFilters.attendees}
          onChange={(newValue) => onFiltersChange({ ...selectedFilters, attendees: newValue })}
          onSelectAll={() => setAll('attendees', availableOptions.attendees)}
          onClearAll={() => clearAll('attendees')}
        />

        {/* Location Section */}
        <AutocompleteFilterSection
          title="Location"
          count={selectedFilters.locations.length}
          expanded={locationExpanded}
          onToggle={() => setLocationExpanded(!locationExpanded)}
          items={availableOptions.locations}
          selected={selectedFilters.locations}
          onChange={(newValue) => onFiltersChange({ ...selectedFilters, locations: newValue })}
          onSelectAll={() => setAll('locations', availableOptions.locations)}
          onClearAll={() => clearAll('locations')}
        />

      </Box>
    </Box>
  );
};

export default FiltersSidebar;