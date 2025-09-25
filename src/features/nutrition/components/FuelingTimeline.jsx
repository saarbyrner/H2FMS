import React from 'react';
import { Box, Chip, Typography, Stack } from '@mui/material';

// Prototype component – displays fuel windows (pre/during/post) with basic styling
export default function FuelingTimeline({ windows = [] }) {
  return (
    <Box sx={{ p:2, border:'1px solid var(--color-border-primary, #e0e0e0)', borderRadius:2 }}>
      <Typography variant="subtitle2" sx={{ mb:1 }}>Fueling Timeline</Typography>
      <Stack spacing={1}>
        {windows.map(w => (
          <Box key={w.phase} sx={{ display:'flex', alignItems:'center', gap:1 }}>
            <Chip size="small" label={w.phase.toUpperCase()} color={w.phase==='pre'?'primary': w.phase==='during'?'success':'secondary'} />
            <Typography variant="caption" sx={{ flex:1 }}>
              {new Date(w.startISO).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit'})} – {new Date(w.endISO).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit'})}
            </Typography>
            {w.cho_g_per_h && <Typography variant="caption">CHO {w.cho_g_per_h} g/h</Typography>}
            {w.protein_g && <Typography variant="caption">Protein {w.protein_g} g</Typography>}
          </Box>
        ))}
        {!windows.length && <Typography variant="caption" color="text.secondary">No windows</Typography>}
      </Stack>
    </Box>
  );
}
