import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const PageHeader = ({ title, description }) => {
  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            {description}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default PageHeader;