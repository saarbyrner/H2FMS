import React, { useMemo, useState } from 'react';
import { Box, Typography, Grid, Paper, Stack, Button, TextField, Chip } from '@mui/material';
import { useSearchParams, useParams } from 'react-router-dom';
import FuelingTimeline from '../components/FuelingTimeline';
import MacroTargetsSummary from '../components/MacroTargetsSummary';
import MealCard from '../components/MealCard';
import HydrationCard from '../components/HydrationCard';
import { getGeneratedPlan } from '../api';

export default function SoldierDailyPlan() {
  const { soldierId } = useParams();
  const [params, setParams] = useSearchParams();
  const date = params.get('date') || new Date().toISOString().split('T')[0];
  const key = `${soldierId}|${date}`;
  const plan = getGeneratedPlan(key); // If not generated in this session will be undefined
  const [hydrationLogged, setHydrationLogged] = useState(1.25);

  const readinessColor = { High:'success', Moderate:'warning', Low:'error' }[plan?.readiness] || 'default';

  const consumed = useMemo(()=>({
    kcal: plan? Math.round(plan.targets.kcal * 0.45):0,
    carbs_g: plan? Math.round(plan.targets.carbs_g * 0.4):0,
    protein_g: plan? Math.round(plan.targets.protein_g * 0.5):0,
    fat_g: plan? Math.round(plan.targets.fat_g * 0.35):0
  }), [plan]);

  return (
    <Box sx={{ p:3 }}>
      <Stack direction={{ xs:'column', md:'row' }} justifyContent="space-between" sx={{ mb:2 }} spacing={2}>
        <Typography variant="h6">Soldier Daily Plan – #{soldierId}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField size="small" type="date" value={date} onChange={e=>setParams({ date:e.target.value })} />
          {plan && <Chip size="small" color={readinessColor} label={`Readiness: ${plan.readiness}`} />}
          {plan && <Chip size="small" variant="outlined" label={`Energy: ${plan.energyForecast}`} />}
        </Stack>
      </Stack>
      {!plan && <Typography variant="caption" color="text.secondary">No generated plan in memory – create one via Plan Builder.</Typography>}
      {plan && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <FuelingTimeline windows={plan.fuelWindows} />
              <MacroTargetsSummary targets={plan.targets} consumed={consumed} />
              <HydrationCard goalLitres={plan.hydration_l} logged={hydrationLogged} onQuickLog={(v)=>setHydrationLogged(val=>val+v)} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {plan.meals.map(meal => (
                <Grid item xs={12} sm={6} key={meal.id}>
                  <MealCard meal={meal} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
