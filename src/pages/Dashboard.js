import React from 'react';
import { useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { Box, Container, Grid, Typography, Card, Button, Stack } from '@mui/material';
import {
  QuizOutlined as QuizIcon,
  ExploreOutlined as ExploreIcon,
  TrendingUp as TrendingUpIcon,
  PsychologyOutlined as PsychologyIcon,
  ArrowForward as ArrowForwardIcon,
  MenuBookOutlined as GuideIcon,
  DescriptionOutlined as ResumeIcon,
  RecordVoiceOverOutlined as InterviewIcon,
  NorthEast as NorthEastIcon,
} from '@mui/icons-material';
import { useLocalUser } from '../utils/localUser';
import { brand } from '../contexts/ThemeContext';

const IconTile = ({ children, size = 40 }) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: '10px',
      display: 'grid',
      placeItems: 'center',
      color: 'primary.main',
      bgcolor: (t) => alpha(t.palette.primary.main, t.palette.mode === 'dark' ? 0.14 : 0.08),
      flexShrink: 0,
      '& svg': { fontSize: size * 0.52 },
    }}
  >
    {children}
  </Box>
);

const Dashboard = () => {
  const { currentUser } = useLocalUser();
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: 'Take Career Quiz',
      description: 'Discover careers that match your personality, skills, and interests through our interactive assessment.',
      icon: <QuizIcon />,
      action: () => navigate('/career-quiz'),
      buttonText: 'Start Quiz',
    },
    {
      title: 'Explore Careers',
      description: 'Browse through various career options, their requirements, and growth prospects in India.',
      icon: <ExploreIcon />,
      action: () => navigate('/explore-careers'),
      buttonText: 'Explore Now',
    },
    {
      title: 'Career Trends',
      description: 'Stay updated with the latest career trends, salary insights, and job market demands.',
      icon: <TrendingUpIcon />,
      action: () => navigate('/career-trends'),
      buttonText: 'View Trends',
    },
    {
      title: 'AI Career Coach',
      description: 'Get personalized career advice, resume tips, and interview preparation from our AI coach.',
      icon: <PsychologyIcon />,
      action: () => navigate('/ai-coach'),
      buttonText: 'Chat Now',
    },
  ];

  const resources = [
    {
      title: 'Career Planning Guide',
      description: 'A comprehensive guide to planning your career path effectively.',
      icon: <GuideIcon />,
      path: '/learning-path',
    },
    {
      title: 'Resume Building Tips',
      description: 'Learn how to create a standout resume that gets noticed by recruiters.',
      icon: <ResumeIcon />,
      path: '/premium/smart-resume',
    },
    {
      title: 'Interview Preparation',
      description: 'Ace your interviews with these preparation strategies and tips.',
      icon: <InterviewIcon />,
      path: '/premium/mock-interview',
    },
  ];

  return (
    <Container maxWidth="lg" disableGutters>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'flex-end' }}
        justifyContent="space-between"
        spacing={2.5}
        sx={{ pb: 3.5, mb: 3.5, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Box sx={{ maxWidth: 640 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            Dashboard
          </Typography>
          <Typography variant="h4" sx={{ fontSize: { xs: 28, md: 34 }, mb: 1 }}>
            Welcome, {currentUser?.displayName || 'User'}!
          </Typography>
          <Typography color="text.secondary">
            Your journey to the perfect career starts here. Explore our tools to discover and plan your career path.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.25}>
          <Button variant="outlined" onClick={() => navigate('/ai-coach')}>
            AI Career Coach
          </Button>
          <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={() => navigate('/career-quiz')}>
            Take Career Quiz
          </Button>
        </Stack>
      </Stack>

      {/* Quick actions */}
      <Grid container spacing={2}>
        {dashboardCards.map((card, i) => (
          <Grid item key={card.title} xs={12} sm={6} md={3}>
            <Card
              onClick={card.action}
              sx={{ height: '100%', p: 2.5, cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <IconTile>{card.icon}</IconTile>
                <Typography sx={{ fontFamily: brand.monoFont, fontSize: 12, color: 'text.secondary' }}>
                  0{i + 1}
                </Typography>
              </Stack>
              <Typography variant="h6" component="h2" sx={{ mt: 2.5, mb: 0.75, fontSize: 17 }}>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, flexGrow: 1 }}>
                {card.description}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 2.5, fontWeight: 600, fontSize: 14 }}>
                <span>{card.buttonText}</span>
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 0.5 }}>
        {/* Progress */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%', p: 3 }}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Your Progress
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              You haven't taken any career assessments yet. Start your journey by taking our career quiz!
            </Typography>
            <Stack spacing={1.25} sx={{ mb: 3 }}>
              {['Career Quiz', 'Explore Careers', 'AI Career Coach'].map((step, i) => (
                <Stack key={step} direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      border: '1.5px solid',
                      borderColor: i === 0 ? 'primary.main' : 'divider',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 11,
                      fontFamily: brand.monoFont,
                      color: i === 0 ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: i === 0 ? 600 : 500, color: i === 0 ? 'text.primary' : 'text.secondary' }}>
                    {step}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Button fullWidth variant="contained" onClick={() => navigate('/career-quiz')}>
              Take Career Quiz
            </Button>
          </Card>
        </Grid>

        {/* Resources */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%', p: 3 }}>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              Recommended Resources
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Based on your profile, here are some resources that might interest you:
            </Typography>
            <Box>
              {resources.map((r, i) => (
                <Box
                  key={r.title}
                  onClick={() => navigate(r.path)}
                  sx={{
                    py: 1.75,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    borderTop: i === 0 ? 'none' : '1px solid',
                    borderColor: 'divider',
                    '&:hover .sc-arrow': { color: 'text.primary', transform: 'translate(2px, -2px)' },
                  }}
                >
                  <IconTile size={36}>{r.icon}</IconTile>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {r.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {r.description}
                    </Typography>
                  </Box>
                  <NorthEastIcon className="sc-arrow" sx={{ fontSize: 18, color: 'text.secondary', transition: 'all .15s ease' }} />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
