import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Typography, Chip, IconButton, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItemButton, Checkbox, ListItemText } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddIcon from '@mui/icons-material/Add';

// Basic MealCard – interactions are local only (prototype)
export default function MealCard({ meal, onAdjust, onRegenerate }) {
  const [eaten, setEaten] = useState(false);
  const [swapOpen, setSwapOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggle = (item) => setSelected(prev => prev.includes(item) ? prev.filter(i=>i!==item) : [...prev, item]);

  const carbColorMap = { low:'default', medium:'warning', high:'success' };

  return (
    <Card variant="outlined" sx={{ height:'100%', display:'flex', flexDirection:'column' }}>
      <CardHeader
        titleTypographyProps={{ variant:'subtitle2' }}
        title={meal.name}
        action={<Chip size="small" color={carbColorMap[meal.carb_code]} label={meal.carb_code.toUpperCase()} />}
        subheader={<Typography variant="caption">{meal.target.kcal} kcal • C {meal.target.carbs_g} • P {meal.target.protein_g} • F {meal.target.fat_g}</Typography>}
      />
      <CardContent sx={{ pt:0, flex:1 }}>
        <Stack spacing={0.5}>
          {meal.items.map(it => <Typography key={it} variant="caption">• {it}</Typography>)}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent:'space-between' }}>
        <Stack direction="row" spacing={1}>
          <IconButton size="small" onClick={()=>setSwapOpen(true)} title="Swap items"><SwapHorizIcon fontSize="inherit" /></IconButton>
          <IconButton size="small" onClick={()=>onRegenerate && onRegenerate(meal)} title="Regenerate meal"><RefreshIcon fontSize="inherit" /></IconButton>
        </Stack>
        <Button size="small" startIcon={eaten? <CheckIcon/>:<AddIcon/>} onClick={()=>setEaten(!eaten)} color={eaten? 'success':'primary'}>{eaten?'Eaten':'Mark eaten'}</Button>
      </CardActions>
      <Dialog open={swapOpen} onClose={()=>setSwapOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Swap items (dummy)</DialogTitle>
        <DialogContent dividers>
          <List dense>
            {['Greek Yogurt','Oats','Banana','Protein Shake','Rice','Chicken','Avocado','Veg Mix'].map(i => (
              <ListItemButton key={i} onClick={()=>toggle(i)}>
                <Checkbox size="small" checked={selected.includes(i)} />
                <ListItemText primaryTypographyProps={{ variant:'body2' }} primary={i} />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setSwapOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={()=>{
            // Replace first item(s) for demo only
            // eslint-disable-next-line no-param-reassign
            meal.items = selected.slice(0, meal.items.length);
            setSwapOpen(false);
          }}>Apply</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
