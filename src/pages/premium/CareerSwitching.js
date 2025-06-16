/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  Autocomplete,
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
  SwapHoriz,
  Check,
  Info,
  TrendingUp,
  School,
  Work,
  Timeline,
  ArrowForward,
  CompareArrows,
  BarChart,
  Lightbulb,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { allCareers } from '../../utils/premiumCareerFeatures';

// Utility functions for career switching calculations
const calculateSkillGaps = (currentCareer, targetCareer) => {
  const currentSkills = new Set(currentCareer.skills || []);
  const targetSkills = new Set(targetCareer.skills || []);
  
  const gaps = [];
  targetSkills.forEach(skill => {
    if (!currentSkills.has(skill)) {
      gaps.push(skill);
    }
  });
  
  return gaps;
};

const estimateTransitionTime = (currentCareer, targetCareer) => {
  const skillGaps = calculateSkillGaps(currentCareer, targetCareer);
  const baseTime = 6; // Base time in months
  const timePerSkill = 2; // Additional months per skill gap
  
  const estimatedMonths = baseTime + (skillGaps.length * timePerSkill);
  return {
    min: Math.max(3, estimatedMonths - 3),
    max: estimatedMonths + 3
  };
};

const generateTransitionSteps = (currentCareer, targetCareer) => {
  const skillGaps = calculateSkillGaps(currentCareer, targetCareer);
  const steps = [];

  // Step 1: Initial Assessment
  steps.push({
    title: 'Initial Assessment',
    description: 'Evaluate your current skills and identify gaps',
    duration: '2-4 weeks',
    status: 'not_started'
  });

  // Step 2: Skill Development
  if (skillGaps.length > 0) {
    steps.push({
      title: 'Skill Development',
      description: `Focus on acquiring key skills: ${skillGaps.join(', ')}`,
      duration: `${skillGaps.length * 2}-${skillGaps.length * 3} months`,
      status: 'not_started'
    });
  }

  // Step 3: Certification/Education
  if (targetCareer.education && targetCareer.education.length > 0) {
    steps.push({
      title: 'Required Certifications',
      description: `Obtain necessary certifications: ${targetCareer.education.join(', ')}`,
      duration: '3-6 months',
      status: 'not_started'
    });
  }

  // Step 4: Networking
  steps.push({
    title: 'Industry Networking',
    description: 'Build connections in your target industry',
    duration: 'Ongoing',
    status: 'not_started'
  });

  // Step 5: Experience Building
  steps.push({
    title: 'Practical Experience',
    description: 'Gain practical experience through projects or internships',
    duration: '3-6 months',
    status: 'not_started'
  });

  return steps;
};

const recommendResources = (currentCareer, targetCareer) => {
  const skillGaps = calculateSkillGaps(currentCareer, targetCareer);
  const resources = [];

  // Online Courses
  resources.push({
    type: 'Courses',
    items: [
      'Relevant Coursera specializations',
      'Industry-specific certifications',
      'Professional development workshops'
    ]
  });

  // Books and Materials
  resources.push({
    type: 'Learning Materials',
    items: [
      'Industry standard textbooks',
      'Professional journals',
      'Online tutorials and documentation'
    ]
  });

  // Networking
  resources.push({
    type: 'Networking',
    items: [
      'Professional associations',
      'Industry conferences',
      'LinkedIn groups and connections'
    ]
  });

  return resources;
};

const calculateSalaryDifference = (currentSalary, targetSalary) => {
  // Convert salary strings to numbers
  const extractNumber = (salary) => {
    if (!salary) return 0;
    const matches = salary.match(/\d+,\d+/g);
    if (!matches) return 0;
    return parseInt(matches[0].replace(',', ''), 10) * 1000;
  };

  const current = extractNumber(currentSalary);
  const target = extractNumber(targetSalary);
  
  return {
    difference: target - current,
    percentage: current ? ((target - current) / current) * 100 : 0
  };
};

const calculateTransitionRisk = (currentCareer, targetCareer) => {
  let riskScore = 0;
  
  // Factor 1: Skill gap size
  const skillGaps = calculateSkillGaps(currentCareer, targetCareer);
  riskScore += (skillGaps.length * 0.2); // 0.2 points per skill gap

  // Factor 2: Industry difference
  if (currentCareer.industry !== targetCareer.industry) {
    riskScore += 1;
  }

  // Factor 3: Education requirements
  const targetEducation = targetCareer.education || [];
  if (targetEducation.some(edu => edu.includes('Master') || edu.includes('PhD'))) {
    riskScore += 1;
  }

  // Normalize score to 0-1 range
  return Math.min(Math.max(riskScore / 5, 0), 1);
};

const CareerSwitching = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [currentCareer, setCurrentCareer] = useState(null);
  const [targetCareer, setTargetCareer] = useState(null);
  const [switchingPlan, setSwitchingPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Effect to load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Any initial data loading logic
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('Failed to load initial data. Please try again.');
      }
    };

    loadInitialData();
  }, []);

  // Generate switching plan when both careers are selected
  const generateSwitchingPlan = useCallback((current, target) => {
    setLoading(true);
    setError(null);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Create switching plan based on career differences
        const plan = {
          skillGaps: calculateSkillGaps(current, target),
          timeEstimate: estimateTransitionTime(current, target),
          steps: generateTransitionSteps(current, target),
          resources: recommendResources(current, target),
          salary: {
            current: current.salary || "Not specified",
            target: target.salary || "Not specified",
            difference: calculateSalaryDifference(current.salary, target.salary)
          },
          riskLevel: calculateTransitionRisk(current, target)
        };
        
        setSwitchingPlan(plan);
      } catch (err) {
        console.error('Error generating switching plan:', err);
        setError('Failed to generate career switching plan. Please try again.');
        setSwitchingPlan(null);
      } finally {
        setLoading(false);
      }
    }, 1500);
  }, []);

  // Effect to generate plan when careers are selected
  useEffect(() => {
    if (currentCareer && targetCareer) {
      generateSwitchingPlan(currentCareer, targetCareer);
    } else {
      setSwitchingPlan(null);
    }
  }, [currentCareer, targetCareer, generateSwitchingPlan]);

  // Generate education recommendations
  const generateEducationRecommendations = (targetCareer, skillGaps) => {
    // Sample education recommendations based on target career
    const recommendations = [];
    
    if (targetCareer === 'Data Scientist') {
      recommendations.push(
        { type: 'Course', name: 'Data Science Specialization', provider: 'Coursera', duration: '6 months', cost: '₹15,000' },
        { type: 'Certification', name: 'TensorFlow Developer Certificate', provider: 'Google', duration: '3 months', cost: '₹10,000' },
        { type: 'Bootcamp', name: 'Data Science Bootcamp', provider: 'Upgrad', duration: '6 months', cost: '₹2,50,000' }
      );
    } else if (targetCareer === 'UX/UI Designer') {
      recommendations.push(
        { type: 'Course', name: 'UI/UX Design Specialization', provider: 'Coursera', duration: '6 months', cost: '₹15,000' },
        { type: 'Certification', name: 'Adobe XD Certification', provider: 'Adobe', duration: '2 months', cost: '₹8,000' },
        { type: 'Bootcamp', name: 'UX Design Bootcamp', provider: 'DesignX', duration: '4 months', cost: '₹1,80,000' }
      );
    } else if (targetCareer === 'Full Stack Developer') {
      recommendations.push(
        { type: 'Course', name: 'Full Stack Web Development', provider: 'Udemy', duration: '6 months', cost: '₹12,000' },
        { type: 'Certification', name: 'AWS Developer Associate', provider: 'Amazon', duration: '3 months', cost: '₹15,000' },
        { type: 'Bootcamp', name: 'MERN Stack Bootcamp', provider: 'Coding Ninjas', duration: '5 months', cost: '₹2,00,000' }
      );
    } else {
      // Generic recommendations based on skill gaps
      skillGaps.forEach(skill => {
        recommendations.push(
          { type: 'Course', name: `${skill} Fundamentals`, provider: 'Udemy', duration: '2 months', cost: '₹5,000' }
        );
      });
      
      if (skillGaps.length > 0) {
        recommendations.push(
          { type: 'Certification', name: `Professional ${targetCareer} Certification`, provider: 'Industry Association', duration: '3 months', cost: '₹20,000' }
        );
      }
    }
    
    return recommendations;
  };

  // Generate transition timeline
  const generateTransitionTimeline = (currentCareer, targetCareer, skillGapsCount) => {
    // Base timeline steps
    const timeline = [
      { title: 'Self-Assessment', description: 'Evaluate your current skills, interests, and career goals', duration: '2-4 weeks' },
      { title: 'Research Target Career', description: 'Learn about day-to-day responsibilities, required skills, and industry trends', duration: '2-4 weeks' },
      { title: 'Develop Learning Plan', description: 'Create a structured plan to acquire necessary skills and knowledge', duration: '1-2 weeks' }
    ];
    
    // Add skill acquisition phase based on skill gaps
    if (skillGapsCount > 0) {
      const duration = skillGapsCount <= 2 ? '3-6 months' : '6-12 months';
      timeline.push({
        title: 'Skill Acquisition',
        description: 'Complete courses, certifications, and projects to build required skills',
        duration: duration
      });
    }
    
    // Add networking phase
    timeline.push({
      title: 'Networking & Mentorship',
      description: 'Connect with professionals in your target field and seek mentorship',
      duration: '1-3 months (ongoing)'
    });
    
    // Add experience building phase
    timeline.push({
      title: 'Build Experience',
      description: 'Take on projects, freelance work, or volunteer opportunities in your target field',
      duration: '3-6 months'
    });
    
    // Add job search phase
    timeline.push({
      title: 'Job Search & Transition',
      description: 'Update resume, prepare for interviews, and apply for positions in your target field',
      duration: '2-4 months'
    });
    
    // Calculate total transition time (rough estimate)
    let minMonths = 0;
    let maxMonths = 0;
    
    timeline.forEach(step => {
      const duration = step.duration;
      if (duration.includes('weeks')) {
        const [min, max] = duration.split('-').map(n => parseInt(n));
        minMonths += min / 4; // Convert weeks to months
        maxMonths += max / 4;
      } else if (duration.includes('months')) {
        const [min, max] = duration.split('-').map(n => parseInt(n));
        minMonths += min;
        maxMonths += max;
      }
    });
    
    // Round to nearest whole number
    minMonths = Math.round(minMonths);
    maxMonths = Math.round(maxMonths);
    
    return {
      steps: timeline,
      totalDuration: `${minMonths}-${maxMonths} months`
    };
  };

  // Calculate compatibility score between current and target career
  const calculateCompatibilityScore = (currentSkills, targetSkills, userSkills) => {
    // Count transferable skills
    const transferableCount = currentSkills.filter(skill => 
      targetSkills.includes(skill) || userSkills.includes(skill)
    ).length;
    
    // Calculate score as percentage of target skills covered
    const score = (transferableCount / targetSkills.length) * 100;
    
    // Round to nearest whole number
    return Math.round(score);
  };

  // Handle info dialog
  const handleOpenInfoDialog = (title, content) => {
    setInfoDialogContent({ title, content });
    setInfoDialogOpen(true);
  };

  if (loading && !switchingPlan) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 8 }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h5" sx={{ mt: 4 }}>
            Loading career switching tools...
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            We're preparing personalized career transition resources for you.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Career Switching Engine
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Explore how to transition to a new career with personalized roadmaps.
          Get insights on transferable skills, education needs, and timeline estimates.
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
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Select Careers to Compare
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Choose your current career and the career you want to transition to.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <Autocomplete
                  value={currentCareer}
                  onChange={(event, newValue) => setCurrentCareer(newValue)}
                  options={availableCareers}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="Your Current Career" 
                      variant="outlined" 
                      fullWidth 
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <SwapHoriz sx={{ fontSize: 40, color: 'primary.main' }} />
              </Grid>
              <Grid item xs={12} md={5}>
                <Autocomplete
                  value={targetCareer}
                  onChange={(event, newValue) => setTargetCareer(newValue)}
                  options={availableCareers}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      label="Target Career" 
                      variant="outlined" 
                      fullWidth 
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Switching Plan */}
        {switchingPlan && (
          <>
            {/* Compatibility Overview */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Transition Overview
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Compatibility Score
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                          <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
                            <CircularProgress 
                              variant="determinate" 
                              value={switchingPlan.compatibilityScore} 
                              size={60} 
                              thickness={5} 
                              color={switchingPlan.compatibilityScore > 70 ? 'success' : switchingPlan.compatibilityScore > 40 ? 'primary' : 'warning'}
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
                              <Typography variant="body2" component="div" fontWeight="bold">
                                {switchingPlan.compatibilityScore}%
                              </Typography>
                            </Box>
                          </Box>
                          <Box>
                            <Typography variant="body2">
                              {switchingPlan.compatibilityScore > 70 ? 'High Compatibility' : 
                               switchingPlan.compatibilityScore > 40 ? 'Moderate Compatibility' : 
                               'Challenging Transition'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Based on skill overlap
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Estimated Timeline
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                          <Timeline color="primary" sx={{ mr: 2 }} />
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {switchingPlan.transitionTimeline.totalDuration}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Total transition time
                            </Typography>
                          </Box>
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenInfoDialog('Timeline Details', 'This timeline is an estimate based on the skill gaps between careers and typical learning paths. Your actual timeline may vary based on your learning pace, prior experience, and time commitment.')}
                            sx={{ ml: 1 }}
                          >
                            <Info fontSize="small" />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Salary Comparison
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                          <BarChart color="primary" sx={{ mr: 2 }} />
                          <Box>
                            <Typography variant="body2">
                              Current: {switchingPlan.salary.current}
                            </Typography>
                            <Typography variant="body2">
                              Target: {switchingPlan.salary.target}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Skills Analysis */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Skills Analysis
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Transferable Skills
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpenInfoDialog('Transferable Skills', 'These are skills you already have that are valuable in your target career. They provide a foundation for your career transition.')}
                      sx={{ ml: 1 }}
                    >
                      <Info fontSize="small" />
                    </IconButton>
                  </Typography>
                  {switchingPlan.transferableSkills.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {switchingPlan.transferableSkills.map((skill, index) => (
                        <Chip 
                          key={index} 
                          label={skill} 
                          color="success" 
                          size="small" 
                          icon={<Check />}
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No directly transferable skills identified. Don't worry - many soft skills and experiences are still valuable.
                    </Typography>
                  )}
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Skills to Develop
                    <IconButton 
                      size="small" 
                      onClick={() => handleOpenInfoDialog('Skills to Develop', 'These are skills you need to acquire for your target career. Focus your learning efforts on these areas.')}
                      sx={{ ml: 1 }}
                    >
                      <Info fontSize="small" />
                    </IconButton>
                  </Typography>
                  {switchingPlan.skillGaps.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {switchingPlan.skillGaps.map((skill, index) => (
                        <Chip 
                          key={index} 
                          label={skill} 
                          color="primary" 
                          size="small" 
                          icon={<Add />}
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      You already have most of the skills needed for this career transition!
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>

            {/* Education Recommendations */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Education & Training
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                {switchingPlan.educationRecommendations.length > 0 ? (
                  <List>
                    {switchingPlan.educationRecommendations.map((rec, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon>
                          <School color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={rec.name}
                          secondary={
                            <>
                              <Typography variant="body2" component="span">
                                {rec.type} • {rec.provider} • {rec.duration}
                              </Typography>
                              <br />
                              <Typography variant="body2" component="span" color="text.secondary">
                                Estimated cost: {rec.cost}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No specific education recommendations needed for this transition.
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Transition Timeline */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Transition Roadmap
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Follow this step-by-step plan to transition from {switchingPlan.currentCareer} to {switchingPlan.targetCareer}.
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Stepper orientation="vertical">
                  {switchingPlan.transitionTimeline.steps.map((step, index) => (
                    <Step key={index} active={true}>
                      <StepLabel>
                        <Typography variant="subtitle1">{step.title}</Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2">{step.description}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Estimated duration: {step.duration}
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                
                <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Lightbulb sx={{ color: 'primary.main', mr: 2, mt: 0.5 }} />
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Pro Tip
                      </Typography>
                      <Typography variant="body2">
                        Consider taking on side projects or volunteer work in your target field while still in your current role. This helps you build experience and test if the new career is right for you before making a full transition.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
      
      {/* Info Dialog */}
      <Dialog
        open={infoDialogOpen}
        onClose={() => setInfoDialogOpen(false)}
        aria-labelledby="info-dialog-title"
      >
        <DialogTitle id="info-dialog-title">
          {infoDialogContent.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {infoDialogContent.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInfoDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CareerSwitching;
