import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const PageHeader = ({ title, description }) => {
  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Box sx={{ py: 2, borderBottom: '1px solid', borderColor: 'divider', pb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontSize: { xs: 26, md: 32 }, mb: 0.75 }}>
          {title}
        </Typography>
        {description && (
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 680 }}>
            {description}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default PageHeader;
