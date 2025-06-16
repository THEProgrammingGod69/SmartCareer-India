/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  Chip,
  Slider,
  Rating,
  LinearProgress,
  Tooltip,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  Assessment,
  Check,
  Info,
  TrendingUp,
  Warning,
  AccessTime,
  Work,
  LocationOn,
  AttachMoney,
  Balance,
  Refresh,
  Psychology,
  DirectionsRun,
  FitnessCenter,
  Nightlife,
  Home,
  People,
  Commute,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { predictBurnoutAndLifestyle } from '../../utils/premiumCareerFeatures';

const BurnoutPrediction = () => {
  const { currentUser, userRoles } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState(null);
  const [careerPredictions, setCareerPredictions] = useState([]);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [selectedFactor, setSelectedFactor] = useState('');
  
  // Lifestyle factors with descriptions
  const lifestyleFactors = {
    workLifeBalance: {
      name: 'Work-Life Balance Importance',
      description: 'How important is maintaining a healthy balance between work and personal life?',
      icon: <Balance />
    },
    stressThreshold: {
      name: 'Stress Threshold',
      description: 'How well do you handle workplace stress and pressure?',
      icon: <Psychology />
    },
    workloadPreference: {
      name: 'Workload Preference',
      description: 'Do you prefer consistent workloads or can handle variable/unpredictable workloads?',
      icon: <TrendingUp />
    },
    socialInteraction: {
      name: 'Social Interaction',
      description: 'How much social interaction do you prefer in your work environment?',
      icon: <People />
    },
    locationFlexibility: {
      name: 'Location Flexibility',
      description: 'How important is the ability to work remotely or have flexible location options?',
      icon: <LocationOn />
    },
    travelWillingness: {
      name: 'Travel Willingness',
      description: 'How willing are you to travel for work?',
      icon: <Commute />
    },
    workHoursPreference: {
      name: 'Work Hours Preference',
      description: 'Do you prefer standard 9-5 hours or are you flexible with work timing?',
      icon: <AccessTime />
    },
    physicalActivityLevel: {
      name: 'Physical Activity Level',
      description: 'How much physical activity do you prefer in your daily work?',
      icon: <FitnessCenter />
    },
    learningPreference: {
      name: 'Continuous Learning',
      description: 'How important is continuous learning and skill development in your career?',
      icon: <TrendingUp />
    }
  };

  // Load or generate user preferences
  useEffect(() => {
    const loadUserPreferences = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch the user's preferences from a database
        // For now, we'll generate a sample profile
        
        // Simulate API call delay
        setTimeout(() => {
          // Generate sample user preferences
          const samplePreferences = {
            workLifeBalance: 0.8,
            stressThreshold: 0.6,
            workloadPreference: 0.7,
            socialInteraction: 0.5,
            locationFlexibility: 0.9,
            travelWillingness: 0.3,
            workHoursPreference: 0.7,
            physicalActivityLevel: 0.4,
            learningPreference: 0.8
          };
          
          setUserPreferences(samplePreferences);
          
          // Get career predictions based on user preferences
          const predictions = predictBurnoutAndLifestyle(samplePreferences);
          setCareerPredictions(predictions.slice(0, 10)); // Top 10 predictions
          
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error loading user preferences:', error);
        setLoading(false);
      }
    };

    loadUserPreferences();
  }, []);

  // Handle factor info dialog
  const handleOpenInfoDialog = (factor) => {
    setSelectedFactor(factor);
    setInfoDialogOpen(true);
  };

  // Handle preference update
  const handlePreferenceChange = (factor, value) => {
    setUserPreferences({
      ...userPreferences,
      [factor]: value
    });
  };

  // Update career predictions when preferences change
  useEffect(() => {
    if (userPreferences) {
      const predictions = predictBurnoutAndLifestyle(userPreferences);
      setCareerPredictions(predictions.slice(0, 10)); // Top 10 predictions
    }
  }, [userPreferences]);

  // Format percentage
  const formatPercentage = (value) => `${Math.round(value * 100)}%`;

  // Get color based on burnout risk
  const getBurnoutRiskColor = (risk) => {
    if (risk < 0.3) return 'success';
    if (risk < 0.6) return 'warning';
    return 'error';
  };

  // Get color based on lifestyle compatibility
  const getLifestyleCompatColor = (compat) => {
    if (compat > 0.7) return 'success';
    if (compat > 0.4) return 'primary';
    return 'warning';
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 8 }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h5" sx={{ mt: 4 }}>
            Analyzing lifestyle compatibility...
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            We're predicting burnout risks and lifestyle compatibility for different careers.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Burnout & Lifestyle Prediction
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Predict potential burnout risks and lifestyle compatibility with different careers.
          This analysis helps you find careers that align with your lifestyle preferences and values.
        </Typography>
        <Chip 
          color="primary" 
          icon={<Check />} 
          label="Premium Feature" 
          sx={{ mb: 2 }}
        />
      </Paper>

      <Grid container spacing={4}>
        {/* Lifestyle Preferences */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Your Lifestyle Preferences
              </Typography>
              <Button 
                startIcon={<Refresh />}
                size="small"
                onClick={() => navigate('/profile')}
              >
                Update Profile
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Adjust these preferences to see how different lifestyle factors affect career compatibility and burnout risk.
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            {userPreferences && (
              <List>
                {Object.entries(userPreferences).map(([factor, value]) => (
                  <ListItem key={factor} sx={{ py: 2 }}>
                    <ListItemIcon>
                      {lifestyleFactors[factor]?.icon || <Assessment />}
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {lifestyleFactors[factor]?.name || factor}
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenInfoDialog(factor)}
                            sx={{ ml: 1 }}
                          >
                            <Info fontSize="small" />
                          </IconButton>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ width: '100%', mt: 1 }}>
                          <Slider
                            value={value}
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={(e, newValue) => handlePreferenceChange(factor, newValue)}
                            valueLabelDisplay="auto"
                            valueLabelFormat={formatPercentage}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>

        {/* Career Predictions */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Career Lifestyle Compatibility
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              These predictions show how well different careers align with your lifestyle preferences and their potential burnout risk.
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            {careerPredictions.length > 0 ? (
              <Grid container spacing={2}>
                {careerPredictions.map((career, index) => (
                  <Grid item xs={12} key={index}>
                    <Card variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={8}>
                            <Typography variant="h6" gutterBottom>
                              {career.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {career.description}
                            </Typography>
                            
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" gutterBottom>
                                Lifestyle Factors:
                              </Typography>
                              <Grid container spacing={1}>
                                <Grid item xs={6}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <AccessTime fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2">
                                      Work Hours: {career.workHours || 'Standard'}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={6}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2">
                                      Remote Work: {career.remoteWorkPotential ? 'High' : 'Limited'}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={6}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <TrendingUp fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2">
                                      Learning Curve: {career.learningCurve || 'Moderate'}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={6}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <People fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                    <Typography variant="body2">
                                      Team Size: {career.teamSize || 'Medium'}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            </Box>
                            
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" gutterBottom>
                                Burnout Risk Factors:
                              </Typography>
                              {career.burnoutFactors && career.burnoutFactors.length > 0 ? (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                  {career.burnoutFactors.map((factor, i) => (
                                    <Chip 
                                      key={i} 
                                      label={factor} 
                                      size="small" 
                                      color="warning" 
                                      variant="outlined"
                                    />
                                  ))}
                                </Box>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  No significant burnout factors identified.
                                </Typography>
                              )}
                            </Box>
                            
                            <Button 
                              variant="outlined" 
                              size="small"
                              onClick={() => navigate(`/career/${career.id}`)}
                              sx={{ mt: 1 }}
                            >
                              View Career Details
                            </Button>
                          </Grid>
                          
                          <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ width: '100%', mb: 3 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Lifestyle Compatibility</Typography>
                                <Typography variant="body2" fontWeight="bold">
                                  {Math.round(career.lifestyleCompatibility * 100)}%
                                </Typography>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={career.lifestyleCompatibility * 100} 
                                color={getLifestyleCompatColor(career.lifestyleCompatibility)}
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </Box>
                            
                            <Box sx={{ width: '100%' }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">Burnout Risk</Typography>
                                <Typography variant="body2" fontWeight="bold">
                                  {Math.round(career.burnoutRisk * 100)}%
                                </Typography>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={career.burnoutRisk * 100} 
                                color={getBurnoutRiskColor(career.burnoutRisk)}
                                sx={{ height: 8, borderRadius: 4 }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Alert severity="info">
                No career predictions found. Try adjusting your lifestyle preferences.
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Factor Info Dialog */}
      <Dialog
        open={infoDialogOpen}
        onClose={() => setInfoDialogOpen(false)}
        aria-labelledby="factor-dialog-title"
      >
        <DialogTitle id="factor-dialog-title">
          {lifestyleFactors[selectedFactor]?.name || selectedFactor}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {lifestyleFactors[selectedFactor]?.description || 'No description available.'}
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              How this affects burnout risk:
            </Typography>
            <DialogContentText>
              {selectedFactor === 'workLifeBalance' && 
                'Prioritizing work-life balance can significantly reduce burnout risk. Careers with poor boundaries between work and personal life often lead to higher burnout rates.'}
              {selectedFactor === 'stressThreshold' && 
                'Your ability to handle stress directly impacts burnout risk. High-stress careers require strong coping mechanisms and resilience.'}
              {selectedFactor === 'workloadPreference' && 
                'Unpredictable or consistently heavy workloads can lead to burnout if they don\'t match your capacity and preferences.'}
              {selectedFactor === 'socialInteraction' && 
                'Mismatches between your social needs and job requirements can cause stress. Introverts may burn out in highly social roles, while extroverts may struggle in isolated positions.'}
              {(selectedFactor !== 'workLifeBalance' && selectedFactor !== 'stressThreshold' && selectedFactor !== 'workloadPreference' && selectedFactor !== 'socialInteraction') && 
                'This factor contributes to your overall lifestyle compatibility with different careers.'}
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BurnoutPrediction;
