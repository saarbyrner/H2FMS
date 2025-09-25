import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, CardActions, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const templates = [
  { id:'field-ex', name:'Field Exercise Day', rules:['RPE>8 → +15% CHO next 24h','<6h Turnaround → +10% Protein'] },
  { id:'strength', name:'Strength Cycle', rules:['Heavy Lower +250 kcal','AM+PM Split → +20% CHO'] },
  { id:'recovery', name:'Recovery Focus', rules:['<6.5h Sleep → -5% CHO','Soft Tissue Session → +20g Collagen'] }
];

export default function Templates() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p:3 }}>
      <Typography variant="h6" sx={{ mb:2 }}>Nutrition Templates (Prototype)</Typography>
      <Grid container spacing={2}>
        {templates.map(t => (
          <Grid item xs={12} md={4} key={t.id}>
            <Card variant="outlined" sx={{ height:'100%', display:'flex', flexDirection:'column' }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>{t.name}</Typography>
                <Stack spacing={0.5}>
                  {t.rules.map(r => <Chip key={r} size="small" variant="outlined" label={r} />)}
                </Stack>
              </CardContent>
              <CardActions sx={{ mt:'auto' }}>
                <Button 
                  size="small" 
                  onClick={()=>navigate('/nutrition/create')}
                  sx={{
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-text-primary)',
                    '&:hover': {
                      backgroundColor: 'var(--color-secondary-hover)'
                    }
                  }}
                >
                  Use Template
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
