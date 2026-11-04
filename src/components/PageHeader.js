import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { brand } from '../contexts/ThemeContext';

const PageHeader = ({ title, description }) => {
  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontSize: { xs: 30, md: 42 },
            backgroundImage: brand.gradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block',
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography variant="subtitle1" color="text.secondary" paragraph sx={{ maxWidth: 680, mx: 'auto' }}>
            {description}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default PageHeader;
