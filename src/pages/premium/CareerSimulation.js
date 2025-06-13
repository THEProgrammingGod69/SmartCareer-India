import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  CircularProgress,
  Alert,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  Visibility,
  Check,
  PlayArrow,
  ArrowBack,
  ArrowForward,
  AccessTime,
  Psychology,
  School,
  Work,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getCareerSimulation } from '../../utils/premiumCareerFeatures';
import dataS from './dataS.mp4';
import uxDesigner from './uxDesigner.mp4';
import fullStack from './fullStack.mp4';
import cyberSecurity from './CyberSecurity.webm';
import productManager from './productManager.mp4';
import financialAnalyst from './FinancialAnalyst.mp4';

import dataSAudio from './DataS.m4a';
import uiDesignerAudio from './UIDesigner.m4a';
import fullStackAudio from './FullStackDev.m4a';
import cyberSecAudio from './CyberSec.m4a';
import productManagerAudio from './ProductManager.m4a';
import financialAnalystAudio from './FinancialAnalyst.m4a';

const CareerSimulation = () => {
  const { currentUser, userRoles } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeSimulation, setActiveSimulation] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  
  // Sample careers with simulations available
  const availableCareers = [
    'Data Scientist',
    'UX/UI Designer',
    'Full Stack Developer',
    'Cybersecurity Analyst',
    'Product Manager',
    'Financial Analyst'
  ];

  // Load simulation data when career is selected
  useEffect(() => {
    if (selectedCareer) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const simulation = getCareerSimulation(selectedCareer);
        setActiveSimulation(simulation);
        setLoading(false);
      }, 1000);
    }
  }, [selectedCareer]);

  // Handle career selection
  const handleCareerSelect = (career) => {
    setSelectedCareer(career);
    setActiveStep(0);
    setSimulationStarted(false);
    setSimulationComplete(false);
  };

  // Handle simulation start
  const handleStartSimulation = () => {
    setSimulationStarted(true);
    setActiveStep(0);
  };

  // Handle step navigation
  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      const nextStep = prevActiveStep + 1;
      if (nextStep >= activeSimulation.scenarios.length) {
        setSimulationComplete(true);
      }
      return nextStep;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handle simulation reset
  const handleReset = () => {
    setActiveStep(0);
    setSimulationComplete(false);
  };

  // Handle VR mode dialog
  const handleOpenVRDialog = () => {
    if (['Data Scientist', 'UX/UI Designer', 'Full Stack Developer', 'Cybersecurity Analyst', 'Product Manager', 'Financial Analyst'].includes(selectedCareer)) {
      setVideoDialogOpen(true);
    } else {
      setDialogOpen(true);
    }
  };

  const getAudioSource = () => {
    switch(selectedCareer) {
      case 'Data Scientist': return dataSAudio;
      case 'UX/UI Designer': return uiDesignerAudio;
      case 'Full Stack Developer': return fullStackAudio;
      case 'Cybersecurity Analyst': return cyberSecAudio;
      case 'Product Manager': return productManagerAudio;
      case 'Financial Analyst': return financialAnalystAudio;
      default: return '';
    }
  };

  const handleVideoTimeUpdate = () => {
    if (audioRef.current && videoRef.current) {
      audioRef.current.currentTime = videoRef.current.currentTime;
    }
  };

  const handleVideoPlay = () => {
    if (audioRef.current) audioRef.current.play();
  };

  const handleVideoPause = () => {
    if (audioRef.current) audioRef.current.pause();
  };

  const handleVideoSeeked = () => {
    if (audioRef.current && videoRef.current) {
      audioRef.current.currentTime = videoRef.current.currentTime;
      if (!videoRef.current.paused) {
        audioRef.current.play();
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Career Simulation (AR/VR)
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Experience a day in your dream career with our immersive AR/VR simulations.
          Get a realistic preview of daily tasks, challenges, and work environment.
        </Typography>
        <Chip 
          color="primary" 
          icon={<Check />} 
          label="Premium Feature" 
          sx={{ mb: 2 }}
        />
      </Paper>

      <Grid container spacing={4}>
        {/* Career Selection */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Available Career Simulations
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {availableCareers.map((career) => (
                <ListItem 
                  button 
                  key={career}
                  selected={selectedCareer === career}
                  onClick={() => handleCareerSelect(career)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    <Work color={selectedCareer === career ? 'primary' : 'inherit'} />
                  </ListItemIcon>
                  <ListItemText primary={career} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Simulation Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            {!selectedCareer ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Visibility sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Select a career to start simulation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose from the available careers to experience a day in that role
                </Typography>
              </Box>
            ) : loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <CircularProgress />
              </Box>
            ) : activeSimulation ? (
              <Box>
                <Typography variant="h5" gutterBottom>
                  {selectedCareer} Simulation
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12} sm={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                          Simulation Type
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {activeSimulation.simulationType === 'immersive' ? 'VR Immersive' : 
                           activeSimulation.simulationType === 'augmented' ? 'AR Augmented' : 
                           'Mixed Reality'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                          Duration
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                          <AccessTime fontSize="small" sx={{ mr: 1 }} />
                          {activeSimulation.duration}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                          Skills Highlighted
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          {activeSimulation.skills.map((skill) => (
                            <Chip 
                              key={skill} 
                              label={skill} 
                              size="small" 
                              sx={{ mr: 0.5, mb: 0.5 }} 
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                
                <Typography variant="body1" paragraph>
                  {activeSimulation.description}
                </Typography>
                
                {!simulationStarted ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<PlayArrow />}
                      onClick={handleStartSimulation}
                    >
                      Start Simulation
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      startIcon={<Visibility />}
                      onClick={handleOpenVRDialog}
                      sx={{ ml: 2 }}
                    >
                      VR Mode
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                      A Day as a {selectedCareer}
                    </Typography>
                    
                    <Stepper activeStep={activeStep} orientation="vertical">
                      {activeSimulation.scenarios.map((scenario, index) => (
                        <Step key={index}>
                          <StepLabel>{scenario}</StepLabel>
                          <StepContent>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {getScenarioDescription(selectedCareer, index)}
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                              <div>
                                <Button
                                  variant="contained"
                                  onClick={handleNext}
                                  sx={{ mt: 1, mr: 1 }}
                                >
                                  {index === activeSimulation.scenarios.length - 1 ? 'Finish' : 'Continue'}
                                </Button>
                                <Button
                                  disabled={index === 0}
                                  onClick={handleBack}
                                  sx={{ mt: 1, mr: 1 }}
                                >
                                  Back
                                </Button>
                              </div>
                            </Box>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                    
                    {simulationComplete && (
                      <Paper square elevation={0} sx={{ p: 3, mt: 3, bgcolor: 'success.light' }}>
                        <Typography variant="h6" gutterBottom>
                          Simulation Complete!
                        </Typography>
                        <Typography paragraph>
                          You've experienced a day in the life of a {selectedCareer}. 
                          What did you think about this career?
                        </Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                          Restart Simulation
                        </Button>
                        <Button 
                          variant="contained" 
                          onClick={() => navigate('/premium-features')} 
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Explore More Features
                        </Button>
                      </Paper>
                    )}
                  </Box>
                )}
              </Box>
            ) : (
              <Alert severity="error">
                Simulation data not available for {selectedCareer}.
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* VR Mode Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="vr-dialog-title"
      >
        <DialogTitle id="vr-dialog-title">
          VR Mode Requirements
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To experience this career in full VR mode, you'll need:
          </DialogContentText>
          <List>
            <ListItem>
              <ListItemIcon><Check /></ListItemIcon>
              <ListItemText primary="A compatible VR headset (Oculus Quest, HTC Vive, etc.)" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Check /></ListItemIcon>
              <ListItemText primary="CareerSmart VR app installed on your device" />
            </ListItem>
            <ListItem>
              <ListItemIcon><Check /></ListItemIcon>
              <ListItemText primary="Stable internet connection" />
            </ListItem>
          </List>
          <DialogContentText sx={{ mt: 2 }}>
            Don't have VR equipment? You can still experience our simulation in desktop mode.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>
            Continue in Desktop Mode
          </Button>
        </DialogActions>
      </Dialog>

      {/* Video Dialog for Data Scientist */}
      <Dialog
        fullScreen
        open={videoDialogOpen}
        onClose={() => setVideoDialogOpen(false)}
      >
        <DialogContent sx={{ p: 0, bgcolor: 'black', height: '100vh' }}>
          <Box sx={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Button
              onClick={() => {
                setVideoDialogOpen(false);
                if (audioRef.current) audioRef.current.pause();
              }}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.5)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
              }}
            >
              Close
            </Button>
            <video
              ref={videoRef}
              autoPlay
              controls
              playsInline
              preload="auto"
              controlsList="nodownload"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              src={
                selectedCareer === 'Data Scientist' ? dataS :
                selectedCareer === 'UX/UI Designer' ? uxDesigner :
                selectedCareer === 'Full Stack Developer' ? fullStack :
                selectedCareer === 'Cybersecurity Analyst' ? cyberSecurity :
                selectedCareer === 'Product Manager' ? productManager :
                selectedCareer === 'Financial Analyst' ? financialAnalyst :
                ''
              }
              onTimeUpdate={handleVideoTimeUpdate}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onSeeked={handleVideoSeeked}
            >
              Your browser does not support the video tag.
            </video>
            <audio
              ref={audioRef}
              src={getAudioSource()}
              preload="auto"
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

// Helper function to get scenario descriptions
const getScenarioDescription = (career, index) => {
  const scenarios = {
    'Data Scientist': [
      "You join your team's morning standup meeting where you discuss ongoing projects, challenges, and priorities for the day. Your team is working on a predictive model for customer churn, and you're responsible for feature engineering.",
      "You spend time cleaning a large dataset, handling missing values, and transforming variables. You use Python with pandas and scikit-learn to prepare the data for modeling. You visualize patterns and correlations to better understand the data.",
      "After preparing the data, you build several machine learning models (Random Forest, Gradient Boosting, and Neural Networks) to predict customer churn. You evaluate each model's performance using cross-validation and select the best performing one.",
      "You prepare a presentation of your findings for the marketing team. You create visualizations that explain the key factors influencing customer churn and how the predictive model can help reduce it. You answer technical questions and explain complex concepts in simple terms."
    ],
    'UX/UI Designer': [
      "You conduct a user research session with 5 participants to gather insights about a new feature. You ask open-ended questions and observe how users interact with the prototype, taking notes on pain points and suggestions.",
      "Based on the research insights, you create wireframes for a new feature using Figma. You focus on user flow, information architecture, and interaction patterns, ensuring the design is intuitive and meets user needs.",
      "You present your wireframes to stakeholders and conduct a usability testing session. You observe how users navigate through the prototype, identify any confusion points, and collect feedback for improvements.",
      "You participate in a design review meeting with the product team. You present your final designs, explain your design decisions, and collaborate with developers to ensure feasibility and proper implementation."
    ],
    'Full Stack Developer': [
      "You collaborate with the team to plan the architecture of a new web application. You discuss database schema, API endpoints, and frontend components. You decide to use React for the frontend and Node.js with Express for the backend.",
      "You work on implementing the frontend components using React and Material-UI. You create reusable components, set up routing, and implement state management using Redux. You ensure the UI is responsive and accessible.",
      "You develop the backend API using Node.js and Express. You create endpoints for user authentication, data retrieval, and data manipulation. You implement validation, error handling, and connect to a MongoDB database.",
      "You participate in a code review session with your team. You receive feedback on your code, discuss potential improvements, and fix any bugs or issues. You also review code from other team members and provide constructive feedback."
    ],
    'Cybersecurity Analyst': [
      "You start your day by monitoring security dashboards and alerts. You check for any unusual activities or potential threats in the network. You prioritize alerts based on severity and potential impact.",
      "You notice suspicious login attempts from an unusual location. You investigate the activity by analyzing logs, checking IP addresses, and examining user behavior patterns. You determine it's a potential brute force attack.",
      "You respond to the incident by blocking the suspicious IP addresses, resetting affected account passwords, and implementing additional authentication measures. You document the incident and your response actions.",
      "You conduct a security assessment of a new application before deployment. You perform vulnerability scanning, code review, and penetration testing to identify potential security risks. You provide recommendations to address the findings."
    ],
    'Product Manager': [
      "You lead a product roadmap planning session with stakeholders. You discuss business goals, market trends, and customer needs. You prioritize features and initiatives for the next quarter based on strategic objectives.",
      "You facilitate a feature prioritization meeting with the development team. You present user stories, discuss technical feasibility, and estimate effort. You use a prioritization framework to decide which features to include in the next sprint.",
      "You coordinate with cross-functional teams (design, development, marketing) to ensure alignment on product goals and timelines. You address dependencies, resolve conflicts, and ensure everyone has the information they need.",
      "You prepare for a product launch by finalizing marketing materials, coordinating with sales teams, and ensuring all technical components are ready. You create a launch checklist and conduct a final review with stakeholders."
    ],
    'Financial Analyst': [
      "You begin your day by analyzing market trends and news that might impact your investment portfolio. You review financial reports, economic indicators, and industry news to identify potential opportunities or risks.",
      "You build a financial model to evaluate a potential investment opportunity. You gather data, make assumptions, and project future cash flows. You calculate key metrics like NPV, IRR, and payback period to assess the investment's viability.",
      "You prepare a presentation for the investment committee. You summarize your analysis, highlight key findings, and make recommendations. You anticipate questions and prepare supporting data to defend your position.",
      "You meet with a client to discuss their investment portfolio performance. You explain market conditions, portfolio returns, and your strategy going forward. You address their concerns and adjust the investment approach based on their feedback."
    ]
  };
  
  return scenarios[career]?.[index] || "Experience this scenario in the simulation.";
};

export default CareerSimulation;