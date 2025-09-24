import React from 'react';
import { Button, Select, MenuItem, Avatar, Box, Typography, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward, Today, Notifications } from '@mui/icons-material';

const TopNavigation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        minHeight: '64px',
      }}
    >
      {/* Left Section - Logo and Breadcrumbs */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {/* K Logo */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#0F28FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
        >
          K
        </Box>

        {/* Breadcrumbs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              color: '#0F28FF',
              fontWeight: 600,
              fontSize: '16px',
            }}
          >
            Calendar
          </Typography>
          <Typography
            sx={{
              color: '#666666',
              fontWeight: 400,
              fontSize: '16px',
            }}
          >
            Player list >>
          </Typography>
        </Box>
      </Box>

      {/* Center Section - Navigation Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{
            minWidth: 'auto',
            padding: '8px',
            color: '#0F28FF',
            '&:hover': {
              backgroundColor: 'rgba(15, 40, 255, 0.1)',
            },
          }}
        >
          <ArrowBack />
        </Button>
        
        <Button
          sx={{
            minWidth: 'auto',
            padding: '8px',
            color: '#0F28FF',
            '&:hover': {
              backgroundColor: 'rgba(15, 40, 255, 0.1)',
            },
          }}
        >
          <ArrowForward />
        </Button>

        <Button
          sx={{
            backgroundColor: '#0F28FF',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#0e478a',
            },
          }}
          startIcon={<Today />}
        >
          Today
        </Button>
      </Box>

      {/* Right Section - Club/Squad Selectors and User */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* First Team Dropdown */}
        <Select
          value="first-team"
          sx={{
            color: '#333333',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0F28FF',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0F28FF',
            },
            '& .MuiSvgIcon-root': {
              color: '#333333',
            },
          }}
        >
          <MenuItem value="first-team">First Team</MenuItem>
        </Select>

        {/* Notifications */}
        <IconButton
          sx={{
            position: 'relative',
            color: '#333333',
            '&:hover': {
              backgroundColor: 'rgba(15, 40, 255, 0.1)',
            },
          }}
        >
          <Notifications />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: '#e62020',
              color: 'white',
              borderRadius: '50%',
              width: 16,
              height: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 'bold',
            }}
          >
            3
          </Box>
        </IconButton>

        {/* DSM */}
        <Typography
          sx={{
            color: '#333333',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          DSM
        </Typography>

        {/* Kitman Rugby Club Dropdown */}
        <Button
          sx={{
            backgroundColor: '#e62020',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#c41e3a',
            },
          }}
        >
          Kitman Rugby Club ▼
        </Button>

        {/* International Squad Dropdown */}
        <Button
          sx={{
            backgroundColor: '#ffffff',
            color: '#333333',
            border: '1px solid #e0e0e0',
            padding: '8px 16px',
            borderRadius: '4px',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          International Squad ▼
        </Button>

        {/* User Avatar */}
        <Avatar
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#0F28FF',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          SB
        </Avatar>
      </Box>
    </Box>
  );
};

export default TopNavigation;
