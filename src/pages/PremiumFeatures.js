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
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert,
  Snackbar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
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
import stripeService from '../services/stripeService';

const PremiumFeatures = () => {
  const { currentUser, userRoles, updatePremiumStatus, grantPremiumByEmail: authGrantPremiumByEmail } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [adminAccessDialogOpen, setAdminAccessDialogOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  
  // Get premium status from user roles
  const isPremium = userRoles.isPremium;
  
  // Fetch subscription plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const availablePlans = await stripeService.getSubscriptionPlans();
        setPlans(availablePlans);
        if (availablePlans.length > 0) {
          setSelectedPlan(availablePlans[0].id);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    
    fetchPlans();
  }, []);
  
  // Check for payment success in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
      // Payment was successful
      handlePaymentSuccess(sessionId);
      
      // Remove query params from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [handlePaymentSuccess]);

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
        title: 'Career Simulation',
        description: 'Experience a day in your chosen career.',
        icon: <Visibility color="primary" fontSize="large" />,
        path: '/premium/career-simulation',
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
          All premium features are currently available to all users while admin privileges are being configured.
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
      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upgrade to Premium</DialogTitle>
        <DialogContent>
          <DialogContentText paragraph>
            Choose a subscription plan to unlock all premium features and enhance your career journey.
          </DialogContentText>
          
          {plans.length > 0 ? (
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Available Plans</FormLabel>
              <RadioGroup
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
              >
                {plans.map((plan) => (
                  <FormControlLabel
                    key={plan.id}
                    value={plan.id}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1">
                          {plan.name} - ₹{plan.price/100}/{
                            plan.interval === 'month' ? 'month' : 'year'
                          }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {plan.description}
                          {plan.discount && ` (Save ${plan.discount})`}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<CreditCard />}
            onClick={handleCheckout}
            disabled={loading || !selectedPlan}
          >
            {loading ? <CircularProgress size={24} /> : 'Proceed to Payment'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Admin Access Dialog (hidden in UI but can be accessed via URL parameter) */}
      <Dialog open={adminAccessDialogOpen} onClose={() => setAdminAccessDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Grant Premium Access</DialogTitle>
        <DialogContent>
          <DialogContentText paragraph>
            Admin only: Grant premium access to a user by email address.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="User Email"
            type="email"
            fullWidth
            variant="outlined"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAdminAccessDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleGrantAccess}
            disabled={loading || !adminEmail}
          >
            Grant Access
          </Button>
        </DialogActions>
      </Dialog>
      
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
  
  // Handle checkout process
  async function handleCheckout() {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setLoading(true);
    try {
      // Initialize Stripe
      const stripe = await stripeService.initStripe();
      if (!stripe) {
        throw new Error('Failed to initialize payment system');
      }
      
      // Create checkout session
      const { sessionId, url } = await stripeService.createCheckoutSession(
        currentUser.uid,
        selectedPlan,
        currentUser.email
      );
      
      // Redirect to checkout URL (functional payment flow)
      window.location.href = url;
      
    } catch (error) {
      console.error('Checkout error:', error);
      setNotification({
        open: true,
        message: 'Payment processing failed. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
      setPaymentDialogOpen(false);
    }
  }
  
  // Simulate successful payment (for demo purposes)
  function simulateSuccessfulPayment() {
    // Get selected plan details
    const plan = plans.find(p => p.id === selectedPlan);
    
    // Calculate expiration date
    const now = new Date();
    const months = plan.interval === 'month' ? 1 : 12;
    const expirationDate = new Date(now.setMonth(now.getMonth() + months));
    
    // Update user's premium status
    updatePremiumStatus(true, {
      status: 'active',
      plan: plan.name,
      current_period_end: expirationDate,
      cancel_at_period_end: false,
    });
    
    // Show success notification
    setNotification({
      open: true,
      message: `Successfully upgraded to ${plan.name}! You now have access to all premium features.`,
      severity: 'success'
    });
  }
  
  // Handle successful payment from Stripe redirect
  async function handlePaymentSuccess(sessionId) {
    try {
      // In a real implementation, verify the session with Stripe
      // For our implementation, we'll process the payment success
      
      // Find the selected plan based on the session data
      // For simplicity, we'll check if plans are loaded
      let selectedPlan;
      if (plans.length > 0) {
        // Try to find the plan from the URL if available
        const urlParams = new URLSearchParams(window.location.search);
        const planId = urlParams.get('plan') || 'price_monthly';
        selectedPlan = plans.find(p => p.id === planId) || plans[0];
      } else {
        // Fallback to monthly plan if plans aren't loaded yet
        selectedPlan = { 
          name: 'Monthly Premium', 
          interval: 'month',
          price: 3999 // 39.99 rupees in paise
        };
      }
      
      // Calculate expiration date
      const now = new Date();
      const months = selectedPlan.interval === 'month' ? 1 : 12;
      const expirationDate = new Date(now.setMonth(now.getMonth() + months));
      
      // Update user's premium status
      await updatePremiumStatus(true, {
        status: 'active',
        plan: selectedPlan.name,
        current_period_end: expirationDate,
        cancel_at_period_end: false,
        price: selectedPlan.price,
        currency: 'INR'
      });
      
      // Show success notification
      setNotification({
        open: true,
        message: 'Payment successful! You now have access to all premium features.',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error processing payment success:', error);
      setNotification({
        open: true,
        message: 'There was an error processing your payment. Please contact support.',
        severity: 'error'
      });
    }
  }
  
  // Grant premium access to a user by email (admin only)
  async function grantPremiumByEmail(email) {
    if (!email) return { success: false, message: 'Email is required' };
    
    try {
      // Check if user has admin permissions
      if (!userRoles.isAdmin) {
        return { success: false, message: 'Insufficient permissions' };
      }
      
      // Call the AuthContext's grantPremiumByEmail function
      const result = await authGrantPremiumByEmail(email);
      return result;
    } catch (error) {
      console.error('Error in grantPremiumByEmail:', error);
      return { 
        success: false, 
        message: 'Failed to grant premium access: ' + error.message 
      };
    }
  }
  
  // Handle granting premium access (admin only)
  async function handleGrantAccess() {
    if (!adminEmail) return;
    
    setLoading(true);
    try {
      const result = await grantPremiumByEmail(adminEmail);
      
      setNotification({
        open: true,
        message: result.success ? result.message : result.message || 'Failed to grant access',
        severity: result.success ? 'success' : 'error'
      });
      
      if (result.success) {
        setAdminEmail('');
        setAdminAccessDialogOpen(false);
      }
    } catch (error) {
      console.error('Error granting access:', error);
      setNotification({
        open: true,
        message: 'Failed to grant premium access',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  }
};


export default PremiumFeatures;
