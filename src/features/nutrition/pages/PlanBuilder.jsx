import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Typography, Stack, TextField, Paper, Divider, Alert } from '@mui/material';
import SoldierPicker from '../components/SoldierPicker';
import FuelingTimeline from '../components/FuelingTimeline';
import MacroTargetsSummary from '../components/MacroTargetsSummary';
import MealCard from '../components/MealCard';
import { generatePlan, acceptPlan, publishPlan, regeneratePlan, getGeneratedPlan } from '../api';
import { useNavigate } from 'react-router-dom';

const steps = ['Select', 'Sessions', 'Generate', 'Publish'];

export default function PlanBuilder() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [soldiers, setSoldiers] = useState([9]);
  const [sport, setSport] = useState('Field Sport');
  const [goal, setGoal] = useState('Performance');
  const [dateISO, setDateISO] = useState(new Date().toISOString().split('T')[0]);
  const [plans, setPlans] = useState([]);
  const [selectedPlanKey, setSelectedPlanKey] = useState(null); // single soldier focus for preview
  const [message, setMessage] = useState(null);

  const key = (soldierId) => `${soldierId}|${dateISO}`;

  const handleGenerate = async () => {
    const result = await generatePlan({ soldierIds: soldiers, dateISO, goal, sport });
    setPlans(result);
    setSelectedPlanKey(key(result[0].soldierId));
  };

  const plan = plans.find(p => key(p.soldierId) === selectedPlanKey);

  const adjust = async (delta) => {
    if (!plan) return;
    await regeneratePlan(selectedPlanKey, delta);
    setPlans(plans.map(p => p.soldierId === plan.soldierId ? getGeneratedPlan(selectedPlanKey) : p));
  };

  const accept = async () => {
    await acceptPlan(selectedPlanKey);
    setPlans(plans.map(p => p.soldierId === plan.soldierId ? { ...p, accepted:true } : p));
    setMessage('Plan accepted');
  };

  const publish = async () => {
    await publishPlan(selectedPlanKey);
    setPlans(plans.map(p => p.soldierId === plan.soldierId ? { ...p, published:true } : p));
    setMessage('Plan published & calendar events created');
  };

  const canNext = () => {
    if (active === 0) return soldiers.length>0;
    if (active === 2) return plans.length>0;
    return true;
  };

  return (
    <Box sx={{ p:3 }}>
      <Typography variant="h6" sx={{ mb:2 }}>Nutrition Plan Builder (Prototype)</Typography>
      <Stepper activeStep={active} sx={{ mb:3 }} size="small">
        {steps.map(s => <Step key={s}><StepLabel>{s}</StepLabel></Step>)}
      </Stepper>
      {message && <Alert severity="info" sx={{ mb:2 }} onClose={()=>setMessage(null)}>{message}</Alert>}
      {active === 0 && (
        <Stack spacing={3}>
          <SoldierPicker selected={soldiers} onChange={setSoldiers} />
          <Stack direction={{ xs:'column', sm:'row' }} spacing={2}>
            <TextField size="small" label="Sport" value={sport} onChange={e=>setSport(e.target.value)} />
            <TextField size="small" label="Goal" value={goal} onChange={e=>setGoal(e.target.value)} />
            <TextField size="small" type="date" label="Date" InputLabelProps={{ shrink:true }} value={dateISO} onChange={e=>setDateISO(e.target.value)} />
          </Stack>
        </Stack>
      )}
      {active === 1 && (
        <Paper variant="outlined" sx={{ p:2 }}>
          <Typography variant="subtitle2" gutterBottom>Training Sessions (Step 2)</Typography>
          <Typography variant="caption" color="text.secondary">Manual session entry/import intentionally omitted – assume sessions drive fueling windows.</Typography>
        </Paper>
      )}
      {active === 2 && (
        <Box>
          <Button variant="contained" onClick={handleGenerate} sx={{ mb:2 }}>Generate Plan (Mock AI)</Button>
          <Stack direction="row" spacing={1} sx={{ mb:2, flexWrap:'wrap' }}>
            {plans.map(p => <Button key={p.soldierId} size="small" variant={selectedPlanKey===key(p.soldierId)?'contained':'outlined'} onClick={()=>setSelectedPlanKey(key(p.soldierId))}>Soldier {p.soldierId}</Button>)}
          </Stack>
          {plan && (
            <Stack spacing={2}>
              <FuelingTimeline windows={plan.fuelWindows} />
              <MacroTargetsSummary targets={plan.targets} />
              <Divider />
              <Typography variant="subtitle2">Meals</Typography>
              <Stack direction={{ xs:'column', md:'row' }} spacing={2} useFlexGap flexWrap="wrap">
                {plan.meals.map(m => <MealCard key={m.id} meal={m} onRegenerate={()=>{ /* no-op in prototype */ }} />)}
              </Stack>
              <Stack direction="row" spacing={1}>
                <Button onClick={()=>adjust(-10)} variant="outlined" size="small">Adjust -10%</Button>
                <Button onClick={()=>adjust(10)} variant="outlined" size="small">Adjust +10%</Button>
                <Button onClick={()=>handleGenerate()} variant="outlined" size="small">Regenerate</Button>
                <Button onClick={accept} disabled={plan.accepted} variant="contained" size="small">{plan.accepted? 'Accepted':'Accept Plan'}</Button>
              </Stack>
            </Stack>
          )}
        </Box>
      )}
      {active === 3 && (
        <Box>
          {!plan && <Typography variant="caption" color="text.secondary">No plan selected.</Typography>}
          {plan && (
            <Stack spacing={2}>
              <Typography variant="subtitle2">Publish Plan</Typography>
              <Typography variant="caption" color="text.secondary">Publishing will create mock calendar events (one per meal) with calendarCategory: 'Nutrition'.</Typography>
              <Button variant="contained" onClick={publish} disabled={!plan.accepted || plan.published}>{plan.published? 'Published':'Publish Plan'}</Button>
              <Button size="small" onClick={()=>navigate(`/soldiers/${plan.soldierId}/nutrition?date=${plan.dateISO}`)}>View Soldier Daily Plan</Button>
            </Stack>
          )}
        </Box>
      )}
      <Divider sx={{ my:3 }} />
      <Stack direction="row" spacing={2}>
        <Button disabled={active===0} onClick={()=>setActive(a=>a-1)}>Back</Button>
        <Button disabled={active===steps.length-1 || !canNext()} variant="contained" onClick={()=>setActive(a=>a+1)}>Next</Button>
      </Stack>
    </Box>
  );
}
