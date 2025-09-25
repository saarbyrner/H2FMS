import React from 'react';
import { Card, CardHeader, CardContent, Typography, LinearProgress, Button, Stack } from '@mui/material';

export default function HydrationCard({ goalLitres=4, logged=1.2, onQuickLog }) {
  const pct = Math.min(100, Math.round((logged/goalLitres)*100));
  return (
    <Card variant="outlined" sx={{ height:'100%' }}>
      <CardHeader titleTypographyProps={{ variant:'subtitle2' }} title="Hydration" subheader={`${goalLitres} L goal`} />
      <CardContent>
        <Typography variant="caption" color="text.secondary">Logged {logged.toFixed(1)} L</Typography>
        <LinearProgress variant="determinate" value={pct} sx={{ mt:1, mb:2, height:8, borderRadius:1 }} />
        <Stack direction="row" spacing={1}>
          {[0.25,0.5,0.75,1].map(v => <Button key={v} size="small" variant="outlined" onClick={()=>onQuickLog && onQuickLog(v)}>{v}L</Button>)}
        </Stack>
      </CardContent>
    </Card>
  );
}
