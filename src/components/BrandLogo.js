import React from 'react';
import { Box, Typography } from '@mui/material';
import { AutoAwesome as SparkIcon } from '@mui/icons-material';
import { brand } from '../contexts/ThemeContext';

const BrandLogo = ({ size = 36, showText = true, onClick }) => (
  <Box
    onClick={onClick}
    sx={{ display: 'flex', alignItems: 'center', gap: 1.25, cursor: onClick ? 'pointer' : 'default', userSelect: 'none' }}
  >
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '30%',
        backgroundImage: brand.gradient,
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 8px 24px -8px rgba(124, 92, 255, 0.8)',
        flexShrink: 0,
      }}
    >
      <SparkIcon sx={{ color: '#fff', fontSize: size * 0.55 }} />
    </Box>
    {showText && (
      <Box sx={{ lineHeight: 1 }}>
        <Typography
          component="span"
          sx={{ fontFamily: brand.headingFont, fontWeight: 700, fontSize: size * 0.5, letterSpacing: '-0.02em', display: 'block', lineHeight: 1.1 }}
        >
          SmartCareer
        </Typography>
        <Typography
          component="span"
          sx={{
            fontSize: size * 0.28,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            backgroundImage: brand.gradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'block',
          }}
        >
          India
        </Typography>
      </Box>
    )}
  </Box>
);

export default BrandLogo;
