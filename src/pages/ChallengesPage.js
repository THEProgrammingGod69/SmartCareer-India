import React from 'react';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import CareerChallenges from '../components/CareerChallenges';
import { Container, Typography, Box } from '@mui/material';
import PageHeader from '../components/PageHeader';

const ChallengesPage = () => {
  return (
    <ChallengesProvider>
      <Box sx={{ py: 4 }}>
        <PageHeader 
          title="Career Challenges" 
          description="Complete challenges to build your skills and advance your career journey."
        />
        <CareerChallenges />
      </Box>
    </ChallengesProvider>
  );
};

export default ChallengesPage;