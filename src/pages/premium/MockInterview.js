/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
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
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  Send,
  Check,
  Close,
  ArrowForward,
  ArrowBack,
  Person,
  QuestionAnswer,
  Assessment,
  Feedback,
  Chat,
  Timer,
  PlayArrow,
  Pause,
  Stop,
  Save,
  Refresh,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const MockInterview = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('mid');
  const [interviewType, setInterviewType] = useState('behavioral');
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);
  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  
  const jobTitleOptions = [
    'Software Engineer',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'Marketing Manager',
    'Sales Representative',
    'Financial Analyst',
    'Project Manager',
    'Business Analyst',
    'Human Resources Specialist',
  ];
  
  const industryOptions = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Media & Entertainment',
    'Consulting',
    'Energy',
    'Transportation',
  ];
  
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerRunning]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleStartInterview = () => {
    if (!jobTitle || !industry || !experienceLevel || !interviewType) {
      setError('Please fill in all required fields');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate API call to get interview questions
    setTimeout(() => {
      const generatedQuestions = generateInterviewQuestions(interviewType, jobTitle, experienceLevel);
      setQuestions(generatedQuestions);
      setCurrentQuestion(generatedQuestions[0]);
      setInterviewStarted(true);
      setTimerRunning(true);
      setLoading(false);
    }, 2000);
  };
  
  const handleNextQuestion = () => {
    const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
    if (currentIndex < questions.length - 1) {
      setCurrentQuestion(questions[currentIndex + 1]);
    } else {
      // End of interview
      setTimerRunning(false);
      setInterviewComplete(true);
      generateFeedback();
    }
  };
  
  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handleToggleMic = () => {
    setMicActive(!micActive);
  };
  
  const handleToggleCamera = () => {
    setCameraActive(!cameraActive);
  };
  
  const generateFeedback = () => {
    // Simulate API call to generate feedback
    setLoading(true);
    setTimeout(() => {
      const generatedFeedback = {
        overallScore: 85,
        strengths: [
          'Clear communication of technical concepts',
          'Good examples of past experiences',
          'Structured answers using the STAR method',
        ],
        areasForImprovement: [
          'Could provide more specific metrics in examples',
          'Some answers could be more concise',
          'Consider adding more context about team dynamics',
        ],
        questionFeedback: questions.map(q => ({
          questionId: q.id,
          question: q.text,
          feedback: 'Your answer demonstrated good understanding of the concept. Consider adding more specific examples to strengthen your response.',
          score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        })),
      };
      
      setFeedback(generatedFeedback);
      setLoading(false);
    }, 3000);
  };
  
  const generateInterviewQuestions = (type, job, level) => {
    // This would normally be an API call to a backend service
    // For now, we'll generate mock questions based on the parameters
    
    const behavioralQuestions = [
      { id: 'b1', text: 'Tell me about a time when you faced a challenging situation at work and how you resolved it.' },
      { id: 'b2', text: 'Describe a situation where you had to work with a difficult team member. How did you handle it?' },
      { id: 'b3', text: 'Give an example of a goal you set for yourself and how you achieved it.' },
      { id: 'b4', text: 'Tell me about a time when you had to adapt to a significant change at work.' },
      { id: 'b5', text: 'Describe a situation where you had to make a difficult decision with limited information.' },
    ];
    
    const technicalQuestions = {
      'Software Engineer': [
        { id: 't1', text: 'Explain the difference between inheritance and composition in object-oriented programming.' },
        { id: 't2', text: 'How would you optimize a slow-performing database query?' },
        { id: 't3', text: 'Describe your approach to testing and debugging code.' },
        { id: 't4', text: 'Explain how you would design a scalable web application architecture.' },
        { id: 't5', text: 'How do you stay updated with the latest technologies and programming practices?' },
      ],
      'Data Scientist': [
        { id: 't1', text: 'Explain the difference between supervised and unsupervised learning.' },
        { id: 't2', text: 'How would you handle missing data in a dataset?' },
        { id: 't3', text: 'Describe a complex data analysis project you worked on and the insights you derived.' },
        { id: 't4', text: 'How would you explain a complex machine learning model to non-technical stakeholders?' },
        { id: 't5', text: 'What metrics would you use to evaluate the performance of a classification model?' },
      ],
      'Product Manager': [
        { id: 't1', text: 'How do you prioritize features in a product roadmap?' },
        { id: 't2', text: 'Describe how you would validate a new product idea.' },
        { id: 't3', text: 'How do you balance user needs with business objectives?' },
        { id: 't4', text: 'Explain your approach to gathering and incorporating user feedback.' },
        { id: 't5', text: 'How do you measure the success of a product feature after launch?' },
      ],
    };
    
    if (type === 'behavioral') {
      return behavioralQuestions;
    } else if (type === 'technical') {
      return technicalQuestions[job] || technicalQuestions['Software Engineer'];
    } else {
      // Mixed interview
      const technical = technicalQuestions[job] || technicalQuestions['Software Engineer'];
      return [...behavioralQuestions.slice(0, 3), ...technical.slice(0, 2)];
    }
  };
  
  const steps = [
    {
      label: 'Interview Setup',
      description: 'Configure your mock interview settings',
    },
    {
      label: 'Interview Session',
      description: 'Answer questions and receive real-time feedback',
    },
    {
      label: 'Review & Feedback',
      description: 'Get detailed feedback and improvement suggestions',
    },
  ];
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <QuestionAnswer color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
          AI Mock Interview
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Practice your interview skills with our AI-powered mock interview system. Receive instant feedback and improve your performance.
        </Typography>
        <Divider sx={{ my: 2 }} />
        
        <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 4 }}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {activeStep === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Configure Your Interview
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  value={jobTitle}
                  onChange={(event, newValue) => setJobTitle(newValue)}
                  options={jobTitleOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Job Title"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  value={industry}
                  onChange={(event, newValue) => setIndustry(newValue)}
                  options={industryOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Industry"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Experience Level</InputLabel>
                  <Select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    label="Experience Level"
                  >
                    <MenuItem value="entry">Entry Level (0-2 years)</MenuItem>
                    <MenuItem value="mid">Mid Level (3-5 years)</MenuItem>
                    <MenuItem value="senior">Senior Level (6+ years)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Interview Type</InputLabel>
                  <Select
                    value={interviewType}
                    onChange={(e) => setInterviewType(e.target.value)}
                    label="Interview Type"
                  >
                    <MenuItem value="behavioral">Behavioral Interview</MenuItem>
                    <MenuItem value="technical">Technical Interview</MenuItem>
                    <MenuItem value="mixed">Mixed (Behavioral & Technical)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStartInterview}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <ArrowForward />}
              >
                Start Interview
              </Button>
            </Box>
          </Box>
        )}
        
        {activeStep === 1 && interviewStarted && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Interview in Progress
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Chip
                  icon={<Timer />}
                  label={`Time: ${formatTime(timer)}`}
                  color="primary"
                  variant="outlined"
                  sx={{ mr: 1 }}
                />
                <IconButton
                  color={micActive ? 'primary' : 'default'}
                  onClick={handleToggleMic}
                  sx={{ mr: 1 }}
                >
                  {micActive ? <Mic /> : <MicOff />}
                </IconButton>
                <IconButton
                  color={cameraActive ? 'primary' : 'default'}
                  onClick={handleToggleCamera}
                >
                  {cameraActive ? <Videocam /> : <VideocamOff />}
                </IconButton>
              </Box>
            </Box>
            
            <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Question {questions.findIndex(q => q.id === currentQuestion.id) + 1} of {questions.length}
                  </Typography>
                  <Typography variant="h6">
                    {currentQuestion.text}
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                placeholder="Type your answer here..."
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  disabled={!answers[currentQuestion.id]}
                  onClick={() => handleAnswerChange(currentQuestion.id, '')}
                >
                  Clear Answer
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForward />}
                  onClick={handleNextQuestion}
                  disabled={!answers[currentQuestion.id]}
                >
                  {questions.findIndex(q => q.id === currentQuestion.id) === questions.length - 1 ? 'Finish Interview' : 'Next Question'}
                </Button>
              </Box>
            </Paper>
            
            <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Tips:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Structure your answers using the STAR method (Situation, Task, Action, Result)
                <br />
                • Provide specific examples from your experience
                <br />
                • Keep your answers concise and focused
                <br />
                • Take a moment to think before answering
              </Typography>
            </Box>
          </Box>
        )}
        
        {activeStep === 1 && interviewComplete && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h6" gutterBottom>
              Interview Complete!
            </Typography>
            <Typography variant="body1" paragraph>
              You've completed all the questions. Let's review your performance.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveStep(2)}
              startIcon={<Assessment />}
            >
              View Feedback
            </Button>
          </Box>
        )}
        
        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Interview Feedback
            </Typography>
            
            {loading ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Analyzing your interview responses...
                </Typography>
              </Box>
            ) : feedback ? (
              <>
                <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex', mr: 3 }}>
                      <CircularProgress
                        variant="determinate"
                        value={feedback.overallScore}
                        size={80}
                        thickness={4}
                        color="primary"
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
                        <Typography variant="h6" component="div" color="text.primary">
                          {feedback.overallScore}%
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Overall Performance
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Based on your answers to {questions.length} questions
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        <Check color="success" sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Strengths
                      </Typography>
                      <List dense>
                        {feedback.strengths.map((strength, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Check color="success" />
                            </ListItemIcon>
                            <ListItemText primary={strength} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        <ArrowForward color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Areas for Improvement
                      </Typography>
                      <List dense>
                        {feedback.areasForImprovement.map((area, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <ArrowForward color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={area} />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                </Paper>
                
                <Typography variant="h6" gutterBottom>
                  Question-by-Question Feedback
                </Typography>
                
                {feedback.questionFeedback.map((qf, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Question {index + 1}: {qf.question}
                      </Typography>
                      <Chip
                        label={`${qf.score}%`}
                        color={qf.score >= 80 ? 'success' : qf.score >= 60 ? 'warning' : 'error'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" paragraph>
                      <strong>Your Answer:</strong> {answers[qf.questionId] || 'No answer provided'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Feedback:</strong> {qf.feedback}
                    </Typography>
                  </Paper>
                ))}
                
                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={() => {
                      setActiveStep(0);
                      setInterviewStarted(false);
                      setInterviewComplete(false);
                      setQuestions([]);
                      setCurrentQuestion(null);
                      setAnswers({});
                      setFeedback(null);
                      setTimer(0);
                      setTimerRunning(false);
                    }}
                  >
                    Start New Interview
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Save />}
                  >
                    Save Feedback
                  </Button>
                </Box>
              </>
            ) : null}
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default MockInterview;