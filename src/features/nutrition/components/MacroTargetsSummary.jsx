import React from 'react';
import { Box, Typography, LinearProgress, Stack } from '@mui/material';

export default function MacroTargetsSummary({ targets, consumed = { kcal:0, carbs_g:0, protein_g:0, fat_g:0 } }) {
  if (!targets) return null;
  const keys = [ ['kcal','Calories'], ['carbs_g','Carbs'], ['protein_g','Protein'], ['fat_g','Fat'] ];
  return (
    <Box sx={{ p:2, border:'1px solid var(--color-border-primary, #e0e0e0)', borderRadius:2 }}>
      <Typography variant="subtitle2" sx={{ mb:1 }}>Daily Macro Targets</Typography>
      <Stack spacing={1}>
        {keys.map(([k,label]) => {
          const pct = Math.min(100, Math.round((consumed[k] / targets[k]) * 100));
          return (
            <Box key={k}>
              <Box sx={{ display:'flex', justifyContent:'space-between' }}>
                <Typography variant="caption">{label}</Typography>
                <Typography variant="caption">{consumed[k] || 0}/{targets[k]} {k==='kcal'? 'kcal':'g'}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={pct} sx={{ height:6, borderRadius:1 }} />
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
