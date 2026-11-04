import React from 'react';
import { Box, Typography } from '@mui/material';

// Simple geometric mark: an ink square with a saffron "north star" dot.
const BrandLogo = ({ size = 32, showText = true, onClick }) => (
  <Box
    onClick={onClick}
    sx={{ display: 'flex', alignItems: 'center', gap: 1.25, cursor: onClick ? 'pointer' : 'default', userSelect: 'none' }}
  >
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: `${Math.round(size * 0.28)}px`,
        bgcolor: 'text.primary',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 24 24"
        sx={{ position: 'absolute', inset: '22%', width: '56%', height: '56%', color: 'background.paper' }}
      >
        <path d="M4 17 L10 11 L14 15 L20 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="7" r="2.6" fill="#E8590C" />
      </Box>
    </Box>
    {showText && (
      <Typography
        component="span"
        sx={{ fontWeight: 700, fontSize: size * 0.52, letterSpacing: '-0.03em', lineHeight: 1, whiteSpace: 'nowrap' }}
      >
        SmartCareer
        <Box component="span" sx={{ color: 'text.secondary', fontWeight: 500, ml: 0.6 }}>
          India
        </Box>
      </Typography>
    )}
  </Box>
);

export default BrandLogo;
