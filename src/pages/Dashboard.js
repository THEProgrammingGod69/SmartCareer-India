import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  Explore as ExploreIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const dashboardCards = [
    {
      title: 'Take Career Quiz',
      description: 'Discover careers that match your personality, skills, and interests through our interactive assessment.',
      icon: <QuizIcon fontSize="large" color="primary" />,
      action: () => navigate('/career-quiz'),
      buttonText: 'Start Quiz',
    },
    {
      title: 'Explore Careers',
      description: 'Browse through various career options, their requirements, and growth prospects in India.',
      icon: <ExploreIcon fontSize="large" color="primary" />,
      action: () => navigate('/explore-careers'),
      buttonText: 'Explore Now',
    },
    {
      title: 'Career Trends',
      description: 'Stay updated with the latest career trends, salary insights, and job market demands.',
      icon: <TrendingUpIcon fontSize="large" color="primary" />,
      action: () => navigate('/career-trends'),
      buttonText: 'View Trends',
    },
    {
      title: 'AI Career Coach',
      description: 'Get personalized career advice, resume tips, and interview preparation from our AI coach.',
      icon: <PsychologyIcon fontSize="large" color="primary" />,
      action: () => navigate('/ai-coach'),
      buttonText: 'Chat Now',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {currentUser?.displayName || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your journey to the perfect career starts here. Explore our tools to discover and plan your career path.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {dashboardCards.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {card.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  fullWidth 
                  variant="contained" 
                  onClick={card.action}
                >
                  {card.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper elevation={1} sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Your Progress
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary" paragraph>
          You haven't taken any career assessments yet. Start your journey by taking our career quiz!
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<QuizIcon />}
          onClick={() => navigate('/career-quiz')}
        >
          Take Career Quiz
        </Button>
      </Paper>

      <Paper elevation={1} sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Recommended Resources
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" paragraph>
          Based on your profile, here are some resources that might interest you:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Career Planning Guide</Typography>
                <Typography variant="body2" color="text.secondary">
                  A comprehensive guide to planning your career path effectively.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Read More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Resume Building Tips</Typography>
                <Typography variant="body2" color="text.secondary">
                  Learn how to create a standout resume that gets noticed by recruiters.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Read More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Interview Preparation</Typography>
                <Typography variant="body2" color="text.secondary">
                  Ace your interviews with these preparation strategies and tips.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Read More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;