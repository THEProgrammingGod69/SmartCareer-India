import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';

const features = [
  {
    icon: <QuizIcon fontSize="large" color="primary" />,
    title: 'Career Discovery Quiz',
    description: 'Take our interactive quiz to discover careers that match your personality, skills, and interests.'
  },
  {
    icon: <TrendingUpIcon fontSize="large" color="primary" />,
    title: 'Career Trends',
    description: 'Stay updated with the latest career trends, salary insights, and job market demands in India.'
  },
  {
    icon: <SchoolIcon fontSize="large" color="primary" />,
    title: 'Education Guidance',
    description: 'Get personalized recommendations for courses, colleges, and exams based on your career goals.'
  },
  {
    icon: <PsychologyIcon fontSize="large" color="primary" />,
    title: 'AI Career Coach',
    description: 'Chat with our AI coach for personalized career advice, resume tips, and interview preparation.'
  }
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Engineering Student, Delhi',
    content: 'CareerSmart helped me discover my passion for UX design when I was confused between traditional engineering roles and creative fields.'
  },
  {
    name: 'Rahul Verma',
    role: 'Recent Graduate, Mumbai',
    content: 'The career trends section gave me insights into emerging fields in data science, which helped me choose the right certification courses.'
  },
  {
    name: 'Ananya Patel',
    role: 'High School Student, Bangalore',
    content: 'I was unsure about which stream to choose after 10th. The career quiz gave me clarity about my strengths and suitable career paths.'
  }
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      {/* Hero Section */}
      <Paper 
        sx={{
          position: 'relative',
          backgroundColor: 'rgba(25, 118, 210, 0.9)',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: { xs: 3, md: 6 } }}>
                <Typography component="h1" variant="h2" color="inherit" gutterBottom>
                  Discover Your Ideal Career Path
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  CareerSmart India helps students and professionals find their perfect career match through personalized assessments, data-driven insights, and AI-powered guidance.
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ mt: 4 }}
                >
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    component={RouterLink}
                    to="/register"
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="inherit" 
                    size="large"
                    component={RouterLink}
                    to="/login"
                  >
                    Login
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography variant="h3" align="center" gutterBottom>
          Smart Career Planning
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Our comprehensive tools help you make informed career decisions
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  },
                }}
                elevation={2}
              >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" align="center">
                    {feature.title}
                  </Typography>
                  <Typography align="center">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            Success Stories
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            Hear from students and professionals who found their career path
          </Typography>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item key={index} xs={12} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                      "{testimonial.content}"
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" align={isMobile ? 'center' : 'left'}>
                Ready to discover your ideal career path?
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: isMobile ? 'center' : 'right' }}>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                component={RouterLink}
                to="/register"
                sx={{ px: 4, py: 1.5 }}
              >
                Get Started Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} CareerSmart India. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;