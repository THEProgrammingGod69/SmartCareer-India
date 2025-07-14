/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Chip,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Star,
  Check,
  Psychology,
  School,
  Work,
  Assessment,
  Visibility,
  TrendingUp,
  Build,
  People,
  Sync,
  SupportAgent,
  Description,
  Explore,
  TrackChanges,
  SwapHoriz,
  Info,
  CreditCard,
  Lock,
  LockOpen,
  Chat,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// Payment service removed

const PremiumFeatures = () => {
  const { updatePremiumStatus } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  // Auto-grant premium access
  useEffect(() => {
    // Grant premium access automatically to all users
    updatePremiumStatus(true, {
      status: 'active',
      plan: 'Premium',
      current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      cancel_at_period_end: false,
    });
    
    // Set notification that premium is enabled
    setNotification({
      open: true,
      message: 'Premium features are now accessible!',
      severity: 'success'
    });
  }, [updatePremiumStatus]);

  // No need for payment success check - removed

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Premium feature categories
  const featureCategories = [
    { value: 0, label: 'AI Career Tools' },
    { value: 1, label: 'Advanced Analysis' },
    { value: 2, label: 'Planning & Progress' }
  ];
  
  // Premium features data
  const premiumFeatures = [
    [
      {
        title: 'AI Career Coach',
        description: 'Get personalized career guidance from our AI coach.',
        icon: <Chat color="primary" fontSize="large" />,
        path: '/ai-coach',
      },
      {
        title: 'Ask a Professional',
        description: 'Connect with industry professionals for advice.',
        icon: <SupportAgent color="primary" fontSize="large" />,
        path: '/premium/ask-professional',
      },
      {
        title: 'Smart Resume Builder',
        description: 'Create professional resumes with AI assistance.',
        icon: <Description color="primary" fontSize="large" />,
        path: '/premium/smart-resume',
      },
      {
        title: 'Personalized Career Path',
        description: 'Get a customized career path based on your skills and interests.',
        icon: <Explore color="primary" fontSize="large" />,
        path: '/premium/personalized-career-path',
      },
      {
        title: 'Career Switching Guide',
        description: 'Get guidance on switching to a new career path.',
        icon: <SwapHoriz color="primary" fontSize="large" />,
        path: '/premium/career-switching',
      },
    ],
    [
      {
        title: 'Risk vs. Reward Analysis',
        description: 'Evaluate and compare career paths based on risks and potential rewards.',
        icon: <Assessment color="primary" fontSize="large" />,
        path: '/premium/risk-vs-reward-analyzer',
      },
      {
        title: 'Cognitive Fit Analysis',
        description: 'Analyze how well your cognitive skills match different careers.',
        icon: <Psychology color="primary" fontSize="large" />,
        path: '/premium/cognitive-fit',
      },
      {
        title: 'Burnout & Lifestyle Prediction',
        description: 'Predict burnout risk and lifestyle compatibility for different careers.',
        icon: <TrendingUp color="primary" fontSize="large" />,
        path: '/premium/burnout-prediction',
      },
      {
        title: 'Career Impact Analysis',
        description: 'Analyze the future impact and sustainability of different career paths.',
        icon: <AnalyticsIcon color="primary" fontSize="large" />,
        path: '/premium/career-impact',
      },
    ],
    [
      {
        title: 'Learning Path Generator',
        description: 'Get personalized learning paths to achieve your career goals.',
        icon: <School color="primary" fontSize="large" />,
        path: '/learning-path',
      },
      {
        title: 'Skill Development Tracker',
        description: 'Track your progress in developing critical career skills.',
        icon: <TrackChanges color="primary" fontSize="large" />,
        path: '/skill-tracker',
      },
      {
        title: 'Gamified Career Challenges',
        description: 'Complete fun challenges to develop career skills and earn rewards.',
        icon: <Build color="primary" fontSize="large" />,
        path: '/premium/career-challenges',
      },
      {
        title: 'Mock Interview Practice',
        description: 'Practice with AI-powered mock interviews and get feedback.',
        icon: <Chat color="primary" fontSize="large" />,
        path: '/premium/mock-interview',
      },
      
    ],
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Premium Features
        </Typography>
        <Chip 
          color="primary" 
          label="Premium Access Enabled" 
          icon={<Check />} 
          sx={{ mb: 2 }}
        />
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          All premium features are now available for your use.
        </Typography>
      </Paper>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant="scrollable"
              scrollButtons="auto"
              aria-label="premium features tabs"
              sx={{ mb: 3 }}
            >
              {featureCategories.map((category) => (
                <Tab key={category.value} label={category.label} value={category.value} />
              ))}
            </Tabs>
            
            <Grid container spacing={3}>
              {premiumFeatures[activeTab].map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'translateY(-5px)' },
                    }}
                    variant="outlined"
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', mb: 2, justifyContent: 'center' }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" component="h2" gutterBottom align="center">
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {feature.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        fullWidth 
                        variant="contained" 
                        color="primary"
                        onClick={() => navigate(feature.path)}
                      >
                        Access Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Premium Membership Benefits
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <Check color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Unlimited Access to All Premium Features" 
                  secondary="Explore all advanced career tools without restrictions"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Check color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Advanced AI Career Coach" 
                  secondary="Get personalized guidance from our advanced AI models"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Check color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Career Simulation & Forecasting" 
                  secondary="Experience careers in AR/VR and predict future trends"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Check color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Priority Support" 
                  secondary="Get faster responses to your career questions"
                />
              </ListItem>
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                startIcon={<LockOpen />}
                onClick={() => navigate('/profile')}
              >
                View Profile
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {/* Payment dialogs removed */}
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity} onClose={() => setNotification({ ...notification, open: false })}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
  
  // Payment-related functions removed
};


export default PremiumFeatures;
