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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  Psychology,
  Check,
  Info,
  TrendingUp,
  Warning,
  School,
  Work,
  Star,
  Help,
  Refresh,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { analyzeCognitiveFit } from '../../utils/premiumCareerFeatures';

const CognitiveFit = () => {
  const { currentUser, userRoles } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cognitiveProfile, setCognitiveProfile] = useState(null);
  const [careerMatches, setCareerMatches] = useState([]);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState('');
  
  // Cognitive traits with descriptions
  const cognitiveTraits = {
    attentionSpan: {
      name: 'Attention Span',
      description: 'Ability to focus on tasks for extended periods without distraction',
      icon: <Psychology />
    },
    decisionSpeed: {
      name: 'Decision Speed',
      description: 'How quickly you can make decisions when presented with information',
      icon: <TrendingUp />
    },
    emotionalReactivity: {
      name: 'Emotional Reactivity',
      description: 'How strongly you respond to emotional stimuli in your environment',
      icon: <Warning />
    },
    analyticalThinking: {
      name: 'Analytical Thinking',
      description: 'Ability to break down complex problems into components and analyze them logically',
      icon: <School />
    },
    creativeThinking: {
      name: 'Creative Thinking',
      description: 'Ability to generate novel ideas and solutions to problems',
      icon: <Star />
    },
    stressResilience: {
      name: 'Stress Resilience',
      description: 'Ability to maintain performance under pressure and recover from setbacks',
      icon: <TrendingUp />
    },
    socialProcessing: {
      name: 'Social Processing',
      description: 'Ability to understand social cues and navigate interpersonal interactions',
      icon: <Work />
    }
  };

  // Load or generate cognitive profile
  useEffect(() => {
    const loadCognitiveProfile = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch the user's cognitive profile from a database
        // For now, we'll generate a sample profile
        
        // Simulate API call delay
        setTimeout(() => {
          // Generate sample cognitive profile
          // In a real app, this would come from cognitive assessments
          const sampleProfile = {
            attentionSpan: 0.7,
            decisionSpeed: 0.6,
            emotionalReactivity: 0.4,
            analyticalThinking: 0.8,
            creativeThinking: 0.6,
            stressResilience: 0.7,
            socialProcessing: 0.5
          };
          
          setCognitiveProfile(sampleProfile);
          
          // Get career matches based on cognitive profile
          const matches = analyzeCognitiveFit(sampleProfile);
          setCareerMatches(matches.slice(0, 10)); // Top 10 matches
          
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error loading cognitive profile:', error);
        setLoading(false);
      }
    };

    loadCognitiveProfile();
  }, []);

  // Handle trait info dialog
  const handleOpenInfoDialog = (trait) => {
    setSelectedTrait(trait);
    setInfoDialogOpen(true);
  };

  // Handle profile update
  const handleTraitChange = (trait, value) => {
    setCognitiveProfile({
      ...cognitiveProfile,
      [trait]: value
    });
  };

  // Update career matches when profile changes
  useEffect(() => {
    if (cognitiveProfile) {
      const matches = analyzeCognitiveFit(cognitiveProfile);
      setCareerMatches(matches.slice(0, 10)); // Top 10 matches
    }
  }, [cognitiveProfile]);

  // Format percentage
  const formatPercentage = (value) => `${Math.round(value * 100)}%`;

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 8 }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h5" sx={{ mt: 4 }}>
            Analyzing your cognitive profile...
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            We're matching your cognitive traits with career requirements.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cognitive Career Fit Analysis
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Discover how your cognitive traits align with different career paths.
          This analysis helps you find careers that match your natural thinking style.
        </Typography>
        <Chip 
          color="primary" 
          icon={<Check />} 
          label="Premium Feature" 
          sx={{ mb: 2 }}
        />
      </Paper>

      <Grid container spacing={4}>
        {/* Cognitive Profile */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Your Cognitive Profile
              </Typography>
              <Button 
                startIcon={<Refresh />}
                size="small"
                onClick={() => navigate('/career-quiz')}
              >
                Take Assessment
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              This profile is based on your cognitive assessment results. Adjust the sliders to see how different cognitive traits affect career matches.
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            {cognitiveProfile && (
              <List>
                {Object.entries(cognitiveProfile).map(([trait, value]) => (
                  <ListItem key={trait} sx={{ py: 2 }}>
                    <ListItemIcon>
                      {cognitiveTraits[trait]?.icon || <Psychology />}
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {cognitiveTraits[trait]?.name || trait}
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenInfoDialog(trait)}
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
                            onChange={(e, newValue) => handleTraitChange(trait, newValue)}
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

        {/* Career Matches */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Career Cognitive Fit
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              These careers align well with your cognitive profile. The match percentage indicates how well your cognitive traits match the typical requirements of each career.
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            {careerMatches.length > 0 ? (
              <Grid container spacing={2}>
                {careerMatches.map((career, index) => (
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
                                Cognitive Strengths:
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {career.cognitiveStrengths && career.cognitiveStrengths.map((strength, i) => (
                                  <Chip 
                                    key={i} 
                                    label={strength} 
                                    size="small" 
                                    color="success" 
                                    variant="outlined"
                                  />
                                ))}
                                {(!career.cognitiveStrengths || career.cognitiveStrengths.length === 0) && (
                                  <Typography variant="body2" color="text.secondary">
                                    No significant cognitive strengths identified.
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                            
                            {career.cognitiveGaps && career.cognitiveGaps.length > 0 && (
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                  Areas for Development:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                  {career.cognitiveGaps.map((gap, i) => (
                                    <Chip 
                                      key={i} 
                                      label={gap} 
                                      size="small" 
                                      color="warning" 
                                      variant="outlined"
                                    />
                                  ))}
                                </Box>
                              </Box>
                            )}
                            
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
                            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
                              <CircularProgress 
                                variant="determinate" 
                                value={career.cognitiveFitScore} 
                                size={80} 
                                thickness={4} 
                                color={career.cognitiveFitScore > 80 ? 'success' : career.cognitiveFitScore > 60 ? 'primary' : 'warning'}
                              />
                              <Box
                                sx={{
                                  top: 0,
                                  left: 0,
                                  bottom: 0,
                                  right: 0,
                                  position: 'absolute',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Typography variant="h6" component="div">
                                  {career.cognitiveFitScore}%
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="subtitle2" align="center">
                              Cognitive Fit
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Alert severity="info">
                No career matches found. Try adjusting your cognitive profile.
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Trait Info Dialog */}
      <Dialog
        open={infoDialogOpen}
        onClose={() => setInfoDialogOpen(false)}
        aria-labelledby="trait-dialog-title"
      >
        <DialogTitle id="trait-dialog-title">
          {cognitiveTraits[selectedTrait]?.name || selectedTrait}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {cognitiveTraits[selectedTrait]?.description || 'No description available.'}
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Careers that value this trait:
            </Typography>
            <List dense>
              {selectedTrait === 'analyticalThinking' && (
                <>
                  <ListItem>
                    <ListItemIcon><Work fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Data Scientist" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Work fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Financial Analyst" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Work fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Software Engineer" />
                  </ListItem>
                </>
              )}
              {selectedTrait === 'creativeThinking' && (
                <>
                  <ListItem>
                    <ListItemIcon><Work fontSize="small" /></ListItemIcon>
                    <ListItemText primary="UX/UI Designer" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Work fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Marketing Specialist" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Work fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Content Creator" />
                  </ListItem>
                </>
              )}
              {selectedTrait === 'socialProcessing' && (
                <>
                  <ListItem>
                    <ListItemIcon><Work fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Sales Manager" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Work fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Human Resources" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Work fontSize="small" /></ListItemIcon>
                    <ListItemText primary="Public Relations" />
                  </ListItem>
                </>
              )}
              {(selectedTrait !== 'analyticalThinking' && selectedTrait !== 'creativeThinking' && selectedTrait !== 'socialProcessing') && (
                <ListItem>
                  <ListItemText primary="Information not available" />
                </ListItem>
              )}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CognitiveFit;