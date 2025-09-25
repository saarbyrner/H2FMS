import React from 'react';
import { Box, Typography, Checkbox, FormControlLabel, Grid } from '@mui/material';
import soldiersData from '../../../data/soldiers.json';

export default function SoldierPicker({ selected, onChange }) {
  const toggle = (id) => {
    if (selected.includes(id)) onChange(selected.filter(a => a!==id));
    else onChange([...selected, id]);
  };
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb:1 }}>Select Soldiers</Typography>
      <Grid container spacing={1}>
        {soldiersData.slice(0,12).map(a => (
          <Grid item xs={6} md={4} key={a.id}>
            <FormControlLabel control={<Checkbox size="small" checked={selected.includes(a.id)} onChange={()=>toggle(a.id)} />} label={<Typography variant="caption">{a.first_name} {a.last_name}</Typography>} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
