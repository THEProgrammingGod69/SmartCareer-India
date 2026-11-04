import React from 'react';
import { useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  Explore as ExploreIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
  ArrowForward as ArrowForwardIcon,
  AutoAwesome as SparkIcon,
  MenuBook as GuideIcon,
  Description as ResumeIcon,
  RecordVoiceOver as InterviewIcon,
} from '@mui/icons-material';
import { useLocalUser } from '../utils/localUser';
import { brand } from '../contexts/ThemeContext';

const IconTile = ({ children, size = 48 }) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: '14px',
      display: 'grid',
      placeItems: 'center',
      color: '#fff',
      backgroundImage: brand.gradient,
      boxShadow: '0 10px 24px -10px rgba(124, 92, 255, 0.9)',
      flexShrink: 0,
      '& svg': { fontSize: size * 0.5 },
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
      {/* Welcome hero */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '28px',
          p: { xs: 3, md: 5 },
          mb: 4,
          border: '1px solid',
          borderColor: 'divider',
          background: (t) =>
            `linear-gradient(135deg, ${alpha('#7C5CFF', t.palette.mode === 'dark' ? 0.35 : 0.14)} 0%, ${alpha('#22D3EE', t.palette.mode === 'dark' ? 0.16 : 0.1)} 100%)`,
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            right: -80,
            top: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.35), transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ position: 'relative', maxWidth: 680 }}>
          <Chip
            size="small"
            icon={<SparkIcon sx={{ fontSize: 16 }} />}
            label="Dashboard"
            sx={{ mb: 2, bgcolor: (t) => alpha(t.palette.background.paper, 0.5), '& .MuiChip-icon': { color: 'secondary.main' } }}
          />
          <Typography variant="h3" sx={{ fontSize: { xs: 30, md: 42 }, mb: 1.5 }}>
            Welcome, {currentUser?.displayName || 'User'}!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: { md: 18 }, mb: 3 }}>
            Your journey to the perfect career starts here. Explore our tools to discover and plan your career path.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button variant="contained" startIcon={<QuizIcon />} onClick={() => navigate('/career-quiz')}>
              Take Career Quiz
            </Button>
            <Button variant="outlined" startIcon={<PsychologyIcon />} onClick={() => navigate('/ai-coach')}>
              AI Career Coach
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Quick actions */}
      <Grid container spacing={3}>
        {dashboardCards.map((card) => (
          <Grid item key={card.title} xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { transform: 'translateY(-5px)' } }}>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <IconTile>{card.icon}</IconTile>
                <Typography variant="h6" component="h2" sx={{ mt: 2.5, mb: 1 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 3, pb: 3 }}>
                <Button fullWidth variant="outlined" endIcon={<ArrowForwardIcon />} onClick={card.action}>
                  {card.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Progress */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%', p: 3.5 }}>
            <Typography variant="h5" gutterBottom>
              Your Progress
            </Typography>
            <Box
              sx={{
                my: 3,
                mx: 'auto',
                width: 140,
                height: 140,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: (t) => `conic-gradient(${t.palette.primary.main} 0deg, ${alpha(t.palette.primary.main, 0.15)} 0deg)`,
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: 112,
                  height: 112,
                  borderRadius: '50%',
                  bgcolor: 'background.paper',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <QuizIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </Box>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ textAlign: 'center' }}>
              You haven't taken any career assessments yet. Start your journey by taking our career quiz!
            </Typography>
            <Button fullWidth variant="contained" startIcon={<QuizIcon />} onClick={() => navigate('/career-quiz')}>
              Take Career Quiz
            </Button>
          </Card>
        </Grid>

        {/* Resources */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%', p: 3.5 }}>
            <Typography variant="h5" gutterBottom>
              Recommended Resources
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
              Based on your profile, here are some resources that might interest you:
            </Typography>
            <Stack spacing={1.5}>
              {resources.map((r) => (
                <Box
                  key={r.title}
                  onClick={() => navigate(r.path)}
                  sx={{
                    p: 2,
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    transition: 'all .2s ease',
                    '&:hover': { borderColor: 'primary.main', bgcolor: (t) => alpha(t.palette.primary.main, 0.08) },
                  }}
                >
                  <IconTile size={42}>{r.icon}</IconTile>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {r.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {r.description}
                    </Typography>
                  </Box>
                  <Button size="small" endIcon={<ArrowForwardIcon />} sx={{ flexShrink: 0, display: { xs: 'none', sm: 'inline-flex' } }}>
                    Read More
                  </Button>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
