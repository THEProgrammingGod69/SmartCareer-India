/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  LinearProgress,
  Card,
  CardContent,
  Grid,
  Alert,
  Fade,
  Grow,
  Zoom,
  Slider,
  Chip,
  Avatar,
  useTheme,
  Rating,
  Tooltip,
  IconButton,
  Divider,
  Stack,
  Switch,
  CircularProgress,
} from '@mui/material';
import { 
  ArrowForward, 
  ArrowBack, 
  Psychology, 
  Construction, 
  Interests, 
  Work,
  School,
  Code,
  Business,
  HealthAndSafety,
  Nature,
  Lightbulb,
  Info,
  Star,
  LocationOn,
  AttachMoney,
  TrendingUp,
  Devices,
  Brush,
  Science,
  Engineering,
  LocalHospital,
  AccountBalance,
  Gavel,
  Agriculture,
  Apartment,
  EmojiObjects, // Icon for Psychographics
  AccessTime, // Icon for timing
  AccountBalanceWallet, // Icon for Values
  RocketLaunch, // Icon for Aspirations
} from '@mui/icons-material';

// Enhanced quiz questions with more personalized options for accurate career matching
const quizSections = [
  {
    title: 'Personality Traits',
    icon: <Psychology color="primary" fontSize="large" />,
    description: 'These questions help us understand your personality type and work preferences.',
    questions: [
      {
        id: 'p1',
        text: 'I prefer working with people rather than working alone.',
        tooltip: 'This helps determine if you\'re more suited for team-based or independent roles.',
        options: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' },
        ],
      },
      {
        id: 'p2',
        text: 'I enjoy solving complex problems and puzzles.',
        tooltip: 'This indicates your aptitude for analytical and problem-solving roles.',
        options: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' },
        ],
      },
      {
        id: 'p3',
        text: 'I prefer structured tasks with clear instructions over open-ended creative work.',
        tooltip: 'This helps determine if you prefer process-oriented or creative roles.',
        options: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' },
        ],
      },
      {
        id: 'p4',
        text: 'I am comfortable taking risks and trying new approaches.',
        tooltip: 'This indicates your suitability for entrepreneurial or innovative roles.',
        options: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' },
        ],
      },
      {
        id: 'p5',
        text: 'I prefer to lead rather than follow in group situations.',
        tooltip: 'This helps identify your leadership potential and management aptitude.',
        options: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' },
        ],
      },
      {
        id: 'p6',
        text: 'I enjoy helping and mentoring others.',
        tooltip: 'This indicates your aptitude for teaching, coaching, or supportive roles.',
        options: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' },
        ],
      },
      {
        id: 'p7',
        text: 'I prefer to plan ahead rather than improvise.',
        tooltip: 'This helps determine if you\'re more suited for planning or adaptive roles.',
        options: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' },
        ],
      },
    ],
  },
  {
    title: 'General Skills Assessment',
    icon: <Construction color="primary" fontSize="large" />,
    description: 'Let us know about your general skills and abilities.',
    questions: [
      {
        id: 's1',
        text: 'I am good at analyzing data and identifying patterns.',
        tooltip: 'Important for data analysis, research, and strategic roles.',
        options: [
          { value: 1, label: 'Not at all skilled' },
          { value: 2, label: 'Slightly skilled' },
          { value: 3, label: 'Moderately skilled' },
          { value: 4, label: 'Very skilled' },
          { value: 5, label: 'Extremely skilled' },
        ],
      },
      {
        id: 's2',
        text: 'I can communicate complex ideas clearly to others.',
        tooltip: 'Essential for teaching, management, and client-facing roles.',
        options: [
          { value: 1, label: 'Not at all skilled' },
          { value: 2, label: 'Slightly skilled' },
          { value: 3, label: 'Moderately skilled' },
          { value: 4, label: 'Very skilled' },
          { value: 5, label: 'Extremely skilled' },
        ],
      },
      {
        id: 's3',
        text: 'I am skilled at designing or creating things.',
        tooltip: 'Important for design, engineering, and creative roles.',
        options: [
          { value: 1, label: 'Not at all skilled' },
          { value: 2, label: 'Slightly skilled' },
          { value: 3, label: 'Moderately skilled' },
          { value: 4, label: 'Very skilled' },
          { value: 5, label: 'Extremely skilled' },
        ],
      },
      {
        id: 's4',
        text: 'I am good at managing projects and coordinating tasks.',
        tooltip: 'Essential for project management and leadership roles.',
        options: [
          { value: 1, label: 'Not at all skilled' },
          { value: 2, label: 'Slightly skilled' },
          { value: 3, label: 'Moderately skilled' },
          { value: 4, label: 'Very skilled' },
          { value: 5, label: 'Extremely skilled' },
        ],
      },
      {
        id: 's5',
        text: 'I am skilled at persuading others and negotiating.',
        tooltip: 'Important for sales, management, and business development roles.',
        options: [
          { value: 1, label: 'Not at all skilled' },
          { value: 2, label: 'Slightly skilled' },
          { value: 3, label: 'Moderately skilled' },
          { value: 4, label: 'Very skilled' },
          { value: 5, label: 'Extremely skilled' },
        ],
      },
    ],
  },
  {
    title: 'Technical Skills',
    icon: <Code color="primary" fontSize="large" />,
    description: 'Tell us about your technical abilities and proficiency with specific tools.',
    questions: [
      {
        id: 't1',
        text: 'I am skilled at programming or software development.',
        tooltip: 'Important for software engineering, web development, and IT roles.',
        options: [
          { value: 1, label: 'Not at all skilled' },
          { value: 2, label: 'Slightly skilled' },
          { value: 3, label: 'Moderately skilled' },
          { value: 4, label: 'Very skilled' },
          { value: 5, label: 'Extremely skilled' },
        ],
      },
      {
        id: 't2',
        text: 'I am proficient with data analysis tools and techniques.',
        tooltip: 'Essential for data science, business analysis, and research roles.',
        options: [
          { value: 1, label: 'Not at all skilled' },
          { value: 2, label: 'Slightly skilled' },
          { value: 3, label: 'Moderately skilled' },
          { value: 4, label: 'Very skilled' },
          { value: 5, label: 'Extremely skilled' },
        ],
      },
      {
        id: 't3',
        text: 'I am skilled at graphic design or digital content creation.',
        tooltip: 'Important for design, marketing, and media roles.',
        options: [
          { value: 1, label: 'Not at all skilled' },
          { value: 2, label: 'Slightly skilled' },
          { value: 3, label: 'Moderately skilled' },
          { value: 4, label: 'Very skilled' },
          { value: 5, label: 'Extremely skilled' },
        ],
      },
      {
        id: 't4',
        text: 'I am good at troubleshooting technical problems.',
        tooltip: 'Essential for IT support, engineering, and technical roles.',
        options: [
          { value: 1, label: 'Not at all skilled' },
          { value: 2, label: 'Slightly skilled' },
          { value: 3, label: 'Moderately skilled' },
          { value: 4, label: 'Very skilled' },
          { value: 5, label: 'Extremely skilled' },
        ],
      },
      {
        id: 't5',
        text: 'I am skilled at financial analysis and working with numbers.',
        tooltip: 'Important for finance, accounting, and analytical roles.',
        options: [
          { value: 1, label: 'Not at all skilled' },
          { value: 2, label: 'Slightly skilled' },
          { value: 3, label: 'Moderately skilled' },
          { value: 4, label: 'Very skilled' },
          { value: 5, label: 'Extremely skilled' },
        ],
      },
    ],
  },
  {
    title: 'Industry Interests',
    icon: <Business color="primary" fontSize="large" />,
    description: 'Tell us which industries and sectors interest you the most.',
    questions: [
      {
        id: 'i1',
        text: 'I am interested in technology and computing.',
        tooltip: 'Includes software development, IT, cybersecurity, and digital innovation.',
        icon: <Devices fontSize="small" />,
        options: [
          { value: 1, label: 'Not at all interested' },
          { value: 2, label: 'Slightly interested' },
          { value: 3, label: 'Moderately interested' },
          { value: 4, label: 'Very interested' },
          { value: 5, label: 'Extremely interested' },
        ],
      },
      {
        id: 'i2',
        text: 'I enjoy creative arts, design, or media.',
        tooltip: 'Includes graphic design, UX/UI, content creation, and entertainment.',
        icon: <Brush fontSize="small" />,
        options: [
          { value: 1, label: 'Not at all interested' },
          { value: 2, label: 'Slightly interested' },
          { value: 3, label: 'Moderately interested' },
          { value: 4, label: 'Very interested' },
          { value: 5, label: 'Extremely interested' },
        ],
      },
      {
        id: 'i3',
        text: 'I am interested in business, finance, or entrepreneurship.',
        tooltip: 'Includes management, investment, marketing, and starting businesses.',
        icon: <AttachMoney fontSize="small" />,
        options: [
          { value: 1, label: 'Not at all interested' },
          { value: 2, label: 'Slightly interested' },
          { value: 3, label: 'Moderately interested' },
          { value: 4, label: 'Very interested' },
          { value: 5, label: 'Extremely interested' },
        ],
      },
      {
        id: 'i4',
        text: 'I am interested in healthcare, medicine, or helping others.',
        tooltip: 'Includes medical professions, healthcare administration, and social services.',
        icon: <LocalHospital fontSize="small" />,
        options: [
          { value: 1, label: 'Not at all interested' },
          { value: 2, label: 'Slightly interested' },
          { value: 3, label: 'Moderately interested' },
          { value: 4, label: 'Very interested' },
          { value: 5, label: 'Extremely interested' },
        ],
      },
      {
        id: 'i5',
        text: 'I enjoy working with environmental issues or sustainability.',
        tooltip: 'Includes renewable energy, conservation, and environmental management.',
        icon: <Nature fontSize="small" />,
        options: [
          { value: 1, label: 'Not at all interested' },
          { value: 2, label: 'Slightly interested' },
          { value: 3, label: 'Moderately interested' },
          { value: 4, label: 'Very interested' },
          { value: 5, label: 'Extremely interested' },
        ],
      },
      {
        id: 'i6',
        text: 'I am interested in education, research, or academia.',
        tooltip: 'Includes teaching, scientific research, and educational administration.',
        icon: <School fontSize="small" />,
        options: [
          { value: 1, label: 'Not at all interested' },
          { value: 2, label: 'Slightly interested' },
          { value: 3, label: 'Moderately interested' },
          { value: 4, label: 'Very interested' },
          { value: 5, label: 'Extremely interested' },
        ],
      },
      {
        id: 'i7',
        text: 'I am interested in engineering, manufacturing, or construction.',
        tooltip: 'Includes civil engineering, mechanical design, and industrial production.',
        icon: <Engineering fontSize="small" />,
        options: [
          { value: 1, label: 'Not at all interested' },
          { value: 2, label: 'Slightly interested' },
          { value: 3, label: 'Moderately interested' },
          { value: 4, label: 'Very interested' },
          { value: 5, label: 'Extremely interested' },
        ],
      },
    ],
  },
  {
    title: 'Work Environment',
    icon: <Work color="primary" fontSize="large" />,
    description: 'Tell us about your preferred work environment and conditions.',
    questions: [
      {
        id: 'w1',
        text: 'I prefer working in a fast-paced, dynamic environment.',
        tooltip: 'This helps determine if you thrive in high-energy or more steady-paced settings.',
        options: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' },
        ],
      },
      {
        id: 'w2',
        text: 'I value work-life balance over career advancement.',
        tooltip: 'This helps match you with careers that align with your lifestyle priorities.',
        options: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' },
        ],
      },
      {
        id: 'w3',
        text: 'I prefer jobs that involve travel or changing locations.',
        tooltip: 'This indicates your preference for mobile or location-stable careers.',
        options: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' },
        ],
      },
      {
        id: 'w4',
        text: 'I prefer working in a team environment rather than independently.',
        tooltip: 'This helps match you with collaborative or autonomous work settings.',
        options: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' },
        ],
      },
      {
        id: 'w5',
        text: 'I am comfortable with high-pressure situations and tight deadlines.',
        tooltip: 'This indicates your suitability for deadline-driven or more measured-pace roles.',
        options: [
          { value: 1, label: 'Strongly Disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly Agree' },
        ],
      },
    ],
  },
  {
    title: 'Career Priorities',
    icon: <Star color="primary" fontSize="large" />,
    description: 'Tell us what factors are most important to you in your career.',
    questions: [
      {
        id: 'c1',
        text: 'How important is salary and compensation in your career choice?',
        tooltip: 'This helps match you with careers that align with your financial priorities.',
        type: 'slider',
        min: 1,
        max: 5,
        step: 1,
        marks: [
          { value: 1, label: 'Not important' },
          { value: 2, label: 'Slightly important' },
          { value: 3, label: 'Moderately important' },
          { value: 4, label: 'Very important' },
          { value: 5, label: 'Extremely important' },
        ],
      },
      {
        id: 'c2',
        text: 'How important is job security and stability in your career choice?',
        tooltip: 'This helps match you with careers that offer your desired level of stability.',
        type: 'slider',
        min: 1,
        max: 5,
        step: 1,
        marks: [
          { value: 1, label: 'Not important' },
          { value: 2, label: 'Slightly important' },
          { value: 3, label: 'Moderately important' },
          { value: 4, label: 'Very important' },
          { value: 5, label: 'Extremely important' },
        ],
      },
      {
        id: 'c3',
        text: 'How important is career growth and advancement opportunity?',
        tooltip: 'This helps match you with careers that offer your desired growth potential.',
        type: 'slider',
        min: 1,
        max: 5,
        step: 1,
        marks: [
          { value: 1, label: 'Not important' },
          { value: 2, label: 'Slightly important' },
          { value: 3, label: 'Moderately important' },
          { value: 4, label: 'Very important' },
          { value: 5, label: 'Extremely important' },
        ],
      },
      {
        id: 'c4',
        text: 'How important is making a positive social impact through your work?',
        tooltip: 'This helps match you with careers that align with your values and desire for meaningful work.',
        type: 'slider',
        min: 1,
        max: 5,
        step: 1,
        marks: [
          { value: 1, label: 'Not important' },
          { value: 2, label: 'Slightly important' },
          { value: 3, label: 'Moderately important' },
          { value: 4, label: 'Very important' },
          { value: 5, label: 'Extremely important' },
        ],
      },
    ],
  },
  {
    title: 'Education & Location',
    icon: <School color="primary" fontSize="large" />,
    description: 'Tell us about your educational background and location preferences.',
    questions: [
      {
        id: 'e1',
        text: 'What is your highest level of education (completed or in progress)?',
        tooltip: 'This helps match you with careers that align with your educational qualifications.',
        type: 'single-select',
        options: [
          { value: 1, label: 'High School' },
          { value: 2, label: 'Diploma/Certificate' },
          { value: 3, label: 'Bachelor\'s Degree' },
          { value: 4, label: 'Master\'s Degree' },
          { value: 5, label: 'Doctorate/PhD' },
        ],
      },
      {
        id: 'e2',
        text: 'Are you willing to pursue additional education for the right career?',
        tooltip: 'This helps determine if careers requiring further education should be considered.',
        options: [
          { value: 1, label: 'Definitely not' },
          { value: 2, label: 'Probably not' },
          { value: 3, label: 'Might consider it' },
          { value: 4, label: 'Probably yes' },
          { value: 5, label: 'Definitely yes' },
        ],
      },
      {
        id: 'e3',
        text: 'Do you prefer working in urban centers or are you open to other locations?',
        tooltip: 'This helps match you with careers available in your preferred locations.',
        options: [
          { value: 1, label: 'Strongly prefer urban centers' },
          { value: 2, label: 'Somewhat prefer urban centers' },
          { value: 3, label: 'No strong preference' },
          { value: 4, label: 'Somewhat prefer suburban/rural areas' },
          { value: 5, label: 'Strongly prefer suburban/rural areas' },
        ],
      },
    ],
  },
];

// Helper function to flatten questions
const getAllQuestions = () => quizSections.flatMap(section => section.questions);

const CareerQuiz = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [animateQuestion, setAnimateQuestion] = useState(true);

  const currentSection = quizSections[activeStep];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestionsInSection = currentSection?.questions.length || 0;
  
  // Reset animation when question changes
  useEffect(() => {
    setAnimateQuestion(false);
    const timer = setTimeout(() => setAnimateQuestion(true), 50);
    return () => clearTimeout(timer);
  }, [currentQuestionIndex, activeStep]);
  
  const handleAnswerChange = (event, newValue) => {
    // Handle both standard events and slider direct values
    const value = event?.target?.value !== undefined ? event.target.value : newValue;
    setAnswers({
      ...answers,
      [currentQuestion.id]: parseInt(value, 10),
    });
  };
  
  const getQuestionIcon = () => {
    if (currentQuestion.icon) {
      return currentQuestion.icon;
    }
    
    // Default icons based on section
    switch(activeStep) {
      case 0: return <Psychology color="primary" />;
      case 1: return <Construction color="primary" />;
      case 2: return <Code color="primary" />;
      case 3: return <Business color="primary" />;
      case 4: return <Work color="primary" />;
      case 5: return <Star color="primary" />;
      case 6: return <School color="primary" />;
      default: return <Lightbulb color="primary" />;
    }
  };
  
  const renderQuestionInput = () => {
    if (!currentQuestion) return null;
    
    if (currentQuestion.type === 'slider') {
      return (
        <Box sx={{ px: 2, py: 4 }}>
          <Slider
            value={answers[currentQuestion.id] || 3}
            onChange={handleAnswerChange}
            step={currentQuestion.step || 1}
            min={currentQuestion.min || 1}
            max={currentQuestion.max || 5}
            marks={currentQuestion.marks}
            valueLabelDisplay="auto"
            sx={{ 
              '& .MuiSlider-markLabel': { 
                fontSize: '0.75rem',
                [theme.breakpoints.down('sm')]: {
                  display: 'none'
                }
              } 
            }}
          />
        </Box>
      );
    }
    
    if (currentQuestion.type === 'single-select') {
      return (
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            name={`question-${currentQuestion.id}`}
            value={answers[currentQuestion.id] || ''}
            onChange={handleAnswerChange}
          >
            <Grid container spacing={1}>
              {currentQuestion.options.map((option) => (
                <Grid item xs={12} key={option.value}>
                  <Paper 
                    elevation={answers[currentQuestion.id] === option.value ? 3 : 1}
                    sx={{
                      p: 2, 
                      borderLeft: answers[currentQuestion.id] === option.value ? 
                        `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
                      transition: 'all 0.3s ease',
                      borderRadius: 2,
                      backdropFilter: 'blur(8px)',
                      background: answers[currentQuestion.id] === option.value ? 
                        'rgba(58, 134, 255, 0.1)' : 'rgba(31, 41, 55, 0.5)',
                      boxShadow: answers[currentQuestion.id] === option.value ? 
                        '0 0 15px rgba(58, 134, 255, 0.3)' : 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(58, 134, 255, 0.08)',
                        transform: 'translateX(5px)',
                        boxShadow: '0 0 10px rgba(58, 134, 255, 0.2)'
                      }
                    }}
                  >
                    <FormControlLabel
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                      sx={{ width: '100%' }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      );
    }
    
    // Default radio buttons for regular questions
    return (
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          name={`question-${currentQuestion.id}`}
          value={answers[currentQuestion.id] || ''}
          onChange={handleAnswerChange}
        >
          <Grid container spacing={1}>
            {currentQuestion.options.map((option) => (
              <Grid item xs={12} key={option.value}>
                <Paper 
                  elevation={answers[currentQuestion.id] === option.value ? 3 : 1}
                  sx={{
                    p: 1, 
                    borderLeft: answers[currentQuestion.id] === option.value ? 
                      `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    sx={{ width: '100%' }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestionsInSection - 1) {
      // Move to next question in current section
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (activeStep < quizSections.length - 1) {
      // Move to next section
      setActiveStep(activeStep + 1);
      setCurrentQuestionIndex(0);
    } else {
      // Quiz completed
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      // Move to previous question in current section
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (activeStep > 0) {
      // Move to previous section
      setActiveStep(activeStep - 1);
      setCurrentQuestionIndex(quizSections[activeStep - 1].questions.length - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Store answers in localStorage for the results page to use
    // The career matching algorithm will process these answers
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    
    // Simulate API processing delay
    setTimeout(() => {
      navigate('/quiz-results');
    }, 1500);
  };

  const isQuestionAnswered = currentQuestion && answers[currentQuestion.id] !== undefined;
  const isLastQuestion = activeStep === quizSections.length - 1 && currentQuestionIndex === totalQuestionsInSection - 1;

  // Calculate progress percentage
  const totalQuestions = quizSections.reduce((total, section) => total + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <Container maxWidth="md">
      <Fade in={true} timeout={800}>
        <Paper elevation={3} sx={{ 
          p: 4, 
          mt: 4, 
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(31, 41, 55, 0.7)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.3)',
            transform: 'translateY(-5px)'
          }
        }}>
          <Typography variant="h4" align="center" gutterBottom sx={{
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.5px',
            textShadow: '0 0 20px rgba(58, 134, 255, 0.3)',
            mb: 2,
          }}>
            Career Discovery Quiz
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" paragraph>
            Answer these questions to help us find the best career matches for you.
          </Typography>

          {/* Progress indicator */}
          <Box sx={{ mb: 4 }}>
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ 
                height: 10, 
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  borderRadius: 10,
                  transition: 'transform 0.8s ease',
                  boxShadow: '0 0 10px rgba(58, 134, 255, 0.5)'
                }
              }} 
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary">
                {Math.round(progressPercentage)}%
              </Typography>
            </Box>
          </Box>

          {/* Section stepper */}
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {quizSections.map((section, index) => (
              <Step key={index}>
                <StepLabel 
                  StepIconProps={{
                    icon: section.icon || <Lightbulb />
                  }}
                >
                  {section.title}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {isSubmitting ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Zoom in={true}>
                <Box>
                  <CircularProgress size={60} thickness={4} />
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Analyzing your responses...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We're finding the best career matches based on your personality, skills, and interests.
                  </Typography>
                </Box>
              </Zoom>
            </Box>
          ) : (
            <>
              {/* Section title and description */}
              <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 56, height: 56 }}>
                    {currentSection.icon || <Lightbulb />}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {currentSection.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {currentSection.description}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              {/* Current question */}
              <Grow in={animateQuestion} timeout={500}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    mb: 4, 
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip 
                        label={`Question ${currentQuestionIndex + 1} of ${totalQuestionsInSection}`}
                        color="primary" 
                        variant="outlined"
                      />
                      {currentQuestion?.tooltip && (
                        <Tooltip 
                          title={currentQuestion.tooltip}
                          open={showTooltip}
                          onOpen={() => setShowTooltip(true)}
                          onClose={() => setShowTooltip(false)}
                          placement="top"
                          arrow
                        >
                          <IconButton 
                            size="small" 
                            onClick={() => setShowTooltip(!showTooltip)}
                            color="primary"
                          >
                            <Info fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box sx={{ mr: 2 }}>
                        {getQuestionIcon()}
                      </Box>
                      <Typography variant="h6">
                        {currentQuestion?.text}
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ mb: 3 }} />
                    
                    {renderQuestionInput()}
                  </CardContent>
                </Card>
              </Grow>

              {/* Navigation buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                  disabled={activeStep === 0 && currentQuestionIndex === 0}
                  sx={{ 
                    borderRadius: 28,
                    px: 3,
                    py: 1,
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                    '&:hover:not(:disabled)': {
                      transform: 'translateX(-5px)',
                      borderWidth: '2px',
                      boxShadow: '0 0 15px rgba(58, 134, 255, 0.4)'
                    }
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={isLastQuestion ? null : <ArrowForward />}
                  disabled={!isQuestionAnswered}
                  sx={{ 
                    borderRadius: 28,
                    px: 3,
                    py: 1,
                    background: 'linear-gradient(90deg, #3a86ff 0%, #8b5cf6 100%)',
                    boxShadow: '0 0 15px rgba(58, 134, 255, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover:not(:disabled)': {
                      transform: 'translateX(5px)',
                      boxShadow: '0 0 20px rgba(58, 134, 255, 0.5)',
                      background: 'linear-gradient(90deg, #3a86ff 30%, #8b5cf6 100%)'
                    }
                  }}
                >
                  {isLastQuestion ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Fade>
    </Container>
  );
};

export default CareerQuiz;
