import React, { useState, useEffect, useMemo } from 'react';
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
const FiltersSidebar = ({ onClose, selectedFilters, availableOptions, onFiltersChange }) => {
  // Accordion states
  const [squadsExpanded, setSquadsExpanded] = useState(true);
  const [typesExpanded, setTypesExpanded] = useState(true);
  const [attendeesExpanded, setAttendeesExpanded] = useState(true);
  const [locationExpanded, setLocationExpanded] = useState(true);
  const [gamesExpanded, setGamesExpanded] = useState(true);
  // Estado local de búsqueda
  const [squadSearch, setSquadSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  // Derivar listas filtradas por búsqueda
  const filteredSquads = useMemo(() => availableOptions.squads.filter(s => matchSearch(s, squadSearch)), [availableOptions.squads, squadSearch]);
  const filteredTypes = useMemo(() => availableOptions.types.filter(t => matchSearch(t, typeSearch)), [availableOptions.types, typeSearch]);
  const filteredLocations = useMemo(() => availableOptions.locations.filter(l => matchSearch(l, locationSearch)), [availableOptions.locations, locationSearch]);

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
  <div className="form-section" style={{ margin: 0, boxShadow: 'none', borderRadius: 0, border: 'none' }}>
      <div
        className="form-section-header"
        onClick={onToggle}
        style={{
          background: '#fff',
          cursor: 'pointer',
          padding: 'var(--spacing-md) var(--spacing-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className="sidebar-title" style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
            {title}
          </span>
          {count > 0 && (
            <div className="filter-badge">
              {count}
            </div>
          )}
        </div>
        {expanded ? <ExpandLessOutlined className="sidebar-close" /> : <ExpandMoreOutlined className="sidebar-close" />}
      </div>
      
      {expanded && (
        <div>
          <div className="form-section-content" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', margin: 0 }}>
            {showSearch && (
            <div style={{ position: 'relative', marginBottom: 'var(--spacing-md)' }}>
              <SearchOutlined 
                style={{ 
                  position: 'absolute', 
                  left: 'var(--spacing-sm)', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--icon-size-medium)'
                }} 
              />
              <input
                type="text"
                className="form-input"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{ paddingLeft: 'calc(var(--spacing-sm) + var(--icon-size-medium) + var(--spacing-sm))' }}
              />
            </div>
            )}

            {onSelectAll && onClearAll && (
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
              <button
                type="button"
                onClick={onSelectAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontSize: 'var(--font-size-xs)',
                  cursor: 'pointer',
                  fontWeight: 'var(--font-weight-medium)',
                  textDecoration: 'underline'
                }}
              >
                Select all
              </button>
              <span style={{ color: 'var(--color-text-disabled)', fontSize: 'var(--font-size-xs)' }}>|</span>
              <button
                type="button"
                onClick={onClearAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontSize: 'var(--font-size-xs)',
                  cursor: 'pointer',
                  fontWeight: 'var(--font-weight-medium)',
                  textDecoration: 'underline'
                }}
              >
                Clear
              </button>
            </div>
            )}

            {children}
          </div>
          {/* Divider only at the bottom of each expanded accordion */}
          <div style={{ borderBottom: '1px solid var(--color-border-primary)', height: 0 }} />
        </div>
      )}
    </div>
  );

  const CheckboxList = ({ items, selected, onChange }) => (
    <div>
      {items.map(item => (
        <div key={item} className="form-checkbox">
          <input
            type="checkbox"
            id={`checkbox-${item}`}
            checked={selected.includes(item)}
            onChange={() => onChange(item)}
          />
          <label htmlFor={`checkbox-${item}`}>{item}</label>
        </div>
      ))}
      {!items.length && (
        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>No results</div>
      )}
    </div>
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
    <div
      style={{
        width: '340px',
        backgroundColor: 'var(--color-background-primary)',
        borderRight: '1px solid var(--color-border-primary)',
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">Filters</h2>
        <CloseOutlined className="sidebar-close" onClick={onClose} />
      </div>

      <div style={{ padding: 0 }}>
        {/* Squads Section */}
        <FilterSection
          title="Squads"
          count={selectedFilters.squads.length}
          expanded={squadsExpanded}
          onToggle={() => setSquadsExpanded(!squadsExpanded)}
          onSelectAll={() => setAll('squads', availableOptions.squads)}
          onClearAll={() => clearAll('squads')}
          searchValue={squadSearch}
          onSearchChange={setSquadSearch}
        >
          <CheckboxList
            items={filteredSquads}
            selected={selectedFilters.squads}
            onChange={(value) => handleToggle('squads', value)}
          />
        </FilterSection>

        {/* Types Section */}
        <FilterSection
          title="Types"
          count={selectedFilters.types.length}
          expanded={typesExpanded}
          onToggle={() => setTypesExpanded(!typesExpanded)}
          onSelectAll={() => setAll('types', availableOptions.types)}
          onClearAll={() => clearAll('types')}
          searchValue={typeSearch}
          onSearchChange={setTypeSearch}
        >
          <CheckboxList
            items={filteredTypes}
            selected={selectedFilters.types}
            onChange={(value) => handleToggle('types', value)}
          />
        </FilterSection>

        {/* Attendees Section */}
        {/* Placeholder de Attendees (sin implementación de datos reales aún) */}
        <FilterSection
          title="Attendees"
          count={0}
          expanded={attendeesExpanded}
          onToggle={() => setAttendeesExpanded(!attendeesExpanded)}
          showSearch={false}
        >
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            (Próximamente)
          </div>
        </FilterSection>

        {/* Location Section */}
        <FilterSection
          title="Location"
          count={selectedFilters.locations.length}
          expanded={locationExpanded}
          onToggle={() => setLocationExpanded(!locationExpanded)}
          onSelectAll={() => setAll('locations', availableOptions.locations)}
          onClearAll={() => clearAll('locations')}
          searchValue={locationSearch}
          onSearchChange={setLocationSearch}
        >
          <CheckboxList
            items={filteredLocations}
            selected={selectedFilters.locations}
            onChange={(value) => handleToggle('locations', value)}
          />
        </FilterSection>

        {/* Games Section */}
        <FilterSection
          title="Games"
          count={0}
          expanded={gamesExpanded}
          onToggle={() => setGamesExpanded(!gamesExpanded)}
          showSearch={false}
        >
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
            (Pendiente de definición de modelo de datos de competiciones)
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

export default FiltersSidebar;