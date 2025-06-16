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

// Add new quiz sections constant
const quizSections = [
  {
    title: "Attention Span",
    icon: "⏱️",
    description: "Evaluate your ability to focus and maintain concentration",
    questions: [
      {
        id: 1,
        text: "How long can you typically focus on a single task without getting distracted?",
        answers: [
          "Less than 15 minutes - I need frequent breaks and variety",
          "15-30 minutes - I work better with short, focused bursts",
          "30-60 minutes - I can maintain focus for moderate periods",
          "1-3 hours - I can sustain concentration for extended periods",
          "3+ hours - I can work intensively for very long periods"
        ]
      },
      {
        id: 2,
        text: "When working on a task, how often do you find your mind wandering?",
        answers: [
          "Very often - I struggle to keep my mind on track",
          "Often - I need to refocus frequently",
          "Sometimes - My mind wanders occasionally",
          "Rarely - I can usually maintain my focus",
          "Never - I am always focused on the task at hand"
        ]
      },
      {
        id: 3,
        text: "How do you feel about multitasking?",
        answers: [
          "I love it - I can handle multiple tasks at once with ease",
          "I prefer it - It keeps things interesting and dynamic",
          "I'm okay with it - I can multitask if needed",
          "I don't like it - I prefer to focus on one thing at a time",
          "I avoid it - Multitasking confuses and overwhelms me"
        ]
      },
      {
        id: 4,
        text: "How do you handle distractions when working on something important?",
        answers: [
          "I get easily distracted and find it hard to concentrate",
          "I try to ignore distractions, but it's challenging",
          "I can ignore most distractions and stay focused",
          "I rarely get distracted and can concentrate well",
          "I am never distracted and maintain perfect focus"
        ]
      },
      {
        id: 5,
        text: "How important is a quiet environment for your concentration?",
        answers: [
          "Not important at all - I can concentrate anywhere",
          "Slightly important - I can focus with some background noise",
          "Moderately important - I prefer a quiet space but can adapt",
          "Very important - I need a quiet environment to concentrate",
          "Crucially important - I can only concentrate in complete silence"
        ]
      }
    ]
  },
  {
    title: "Decision Speed",
    icon: "⚡",
    description: "Assess your decision-making process and speed",
    questions: [
      {
        id: 1,
        text: "When faced with a decision, what's your typical approach?",
        answers: [
          "I decide quickly based on gut instinct",
          "I make decisions fairly quickly after brief consideration",
          "I take moderate time to weigh key factors",
          "I need substantial time to analyze all options thoroughly",
          "I prefer to delay decisions until I've considered every angle"
        ]
      },
      {
        id: 2,
        text: "How do you feel when you have to make a decision quickly?",
        answers: [
          "I feel excited and energized by the challenge",
          "I feel focused and clear-headed",
          "I feel a bit stressed but can handle it",
          "I feel overwhelmed and anxious",
          "I avoid situations where I have to decide quickly"
        ]
      },
      {
        id: 3,
        text: "Do you often regret your decisions?",
        answers: [
          "Never - I'm always confident in my decisions",
          "Rarely - I usually make good decisions",
          "Sometimes - I occasionally doubt my choices",
          "Often - I frequently regret my decisions",
          "Always - I have a hard time making decisions I feel good about"
        ]
      },
      {
        id: 4,
        text: "How important is it for you to gather all possible information before deciding?",
        answers: [
          "Not important - I prefer to decide quickly",
          "Slightly important - I like to have some information, but not too much",
          "Moderately important - I need a fair amount of information",
          "Very important - I must have all relevant information before deciding",
          "Crucially important - I can't decide without exhaustive information"
        ]
      },
      {
        id: 5,
        text: "How do you handle situations where you have to decide between multiple good options?",
        answers: [
          "I choose the one that appeals to me the most",
          "I pick randomly to save time",
          "I analyze the pros and cons of each option",
          "I seek advice from others before deciding",
          "I avoid making a decision and hope the problem resolves itself"
        ]
      }
    ]
  },
  {
    title: "Emotional Reactivity",
    icon: "🌊",
    description: "Understand how you react to emotional situations",
    questions: [
      {
        id: 1,
        text: "How do you typically react when receiving unexpected bad news?",
        answers: [
          "I stay calm and composed, no matter the news",
          "I feel upset but manage to control my emotions",
          "I get very emotional and may cry or shout",
          "I need time alone to process the news",
          "I react impulsively and may say or do regrettable things"
        ]
      },
      {
        id: 2,
        text: "How do you feel in highly emotional situations, like weddings or funerals?",
        answers: [
          "I feel comfortable and know how to behave",
          "I feel a bit out of place but manage",
          "I get overwhelmed by the emotions in the air",
          "I try to avoid such situations as much as possible",
          "I have a panic or anxiety attack in such situations"
        ]
      },
      {
        id: 3,
        text: "How do you handle it when someone criticizes you or your work?",
        answers: [
          "I take it as constructive feedback and improve",
          "I feel bad but try not to show it",
          "I get defensive and argue back",
          "I ignore the criticism and move on",
          "I dwell on it for a long time and feel upset"
        ]
      },
      {
        id: 4,
        text: "How important is it for you to be liked and accepted by others?",
        answers: [
          "Not important at all - I value honesty over popularity",
          "Slightly important - I appreciate being liked, but it's not crucial",
          "Moderately important - I want people to like me, but it's not a priority",
          "Very important - I feel anxious if I'm not accepted by others",
          "Crucially important - I need others' approval to feel good about myself"
        ]
      },
      {
        id: 5,
        text: "How do you react when someone you care about is upset or in trouble?",
        answers: [
          "I stay calm and help them find a solution",
          "I feel sad and try to comfort them",
          "I get anxious and don't know how to help",
          "I avoid them, not knowing what to say or do",
          "I panic and may overreact emotionally"
        ]
      }
    ]
  },
  {
    title: "Analytical Thinking",
    icon: "🧠",
    description: "Assess your problem-solving and analytical skills",
    questions: [
      {
        id: 1,
        text: "When faced with a complex problem, what's your first step?",
        answers: [
          "I try to solve it intuitively without overthinking",
          "I break it down into smaller parts and analyze each one",
          "I look for patterns or similarities with problems I've solved before",
          "I gather all relevant data and facts before proceeding",
          "I consult with others to get different perspectives"
        ]
      },
      {
        id: 2,
        text: "How comfortable are you with mathematical or statistical concepts?",
        answers: [
          "Very comfortable - I enjoy working with numbers and data",
          "Somewhat comfortable - I can handle basic math and stats",
          "Neutral - I don't mind math, but it's not my favorite",
          "Somewhat uncomfortable - I prefer not to use math if possible",
          "Very uncomfortable - I struggle with math and stats concepts"
        ]
      },
      {
        id: 3,
        text: "How do you approach learning a new, complex topic or skill?",
        answers: [
          "I dive right in and figure it out as I go",
          "I read or research a bit before starting",
          "I prefer step-by-step instructions or guidance",
          "I get overwhelmed and avoid trying to learn it",
          "I ask an expert to teach me or explain it"
        ]
      },
      {
        id: 4,
        text: "How do you handle situations where you have to analyze a lot of information quickly?",
        answers: [
          "I thrive under pressure and can analyze quickly",
          "I can analyze quickly, but I prefer not to be rushed",
          "I need time to analyze information thoroughly",
          "I get stressed and may make mistakes if rushed",
          "I avoid situations where I have to analyze quickly"
        ]
      },
      {
        id: 5,
        text: "How important is it for you to understand the underlying principles or reasons behind things?",
        answers: [
          "Not important - I just need to know how to do it",
          "Slightly important - I like to understand the basics",
          "Moderately important - I need to understand most things",
          "Very important - I must understand the reasons behind actions or rules",
          "Crucially important - I can't accept things without knowing the underlying principles"
        ]
      }
    ]
  },
  {
    title: "Creative Thinking",
    icon: "💡",
    description: "Evaluate your creativity and ability to think outside the box",
    questions: [
      {
        id: 1,
        text: "How do you typically come up with new ideas or solutions?",
        answers: [
          "I rely on tried-and-true methods that work for me",
          "I brainstorm and write down all ideas, even if they seem silly",
          "I think about the problem from different angles",
          "I combine ideas from different sources or fields",
          "I wait for inspiration to strike, then act on it"
        ]
      },
      {
        id: 2,
        text: "How comfortable are you with taking risks or trying new things?",
        answers: [
          "Very comfortable - I love exploring new ideas and possibilities",
          "Somewhat comfortable - I'm open to new experiences",
          "Neutral - I don't mind trying new things, but I prefer the familiar",
          "Somewhat uncomfortable - I hesitate to try new things",
          "Very uncomfortable - I avoid risks and stick to what I know"
        ]
      },
      {
        id: 3,
        text: "How do you react to creative blocks or challenges?",
        answers: [
          "I push through and try harder to be creative",
          "I take a break and come back with a fresh perspective",
          "I seek inspiration from others or from nature",
          "I get frustrated and give up easily",
          "I don't experience creative blocks - I'm always full of ideas"
        ]
      },
      {
        id: 4,
        text: "How important is it for you to express your creativity in your work or daily life?",
        answers: [
          "Not important - I prefer to keep my creativity separate from work",
          "Slightly important - I like to express my creativity occasionally",
          "Moderately important - I need to express my creativity from time to time",
          "Very important - I must be able to express my creativity regularly",
          "Crucially important - My creativity is a core part of who I am, and it must be expressed"
        ]
      },
      {
        id: 5,
        text: "How do you feel about collaborating with others on creative projects?",
        answers: [
          "I love it - collaboration often sparks new ideas",
          "I like it - working with others can enhance creativity",
          "I'm neutral - collaboration is okay, but I can work solo too",
          "I prefer working alone - it allows for more personal expression",
          "I avoid it - I find it hard to be creative with others around"
        ]
      }
    ]
  },
  {
    title: "Stress Resilience",
    icon: "🧘",
    description: "Assess how you handle stress and pressure",
    questions: [
      {
        id: 1,
        text: "How do you typically react when faced with a stressful situation?",
        answers: [
          "I thrive under stress and perform even better",
          "I handle stress well and stay focused on solutions",
          "I get stressed, but I can manage it",
          "I feel overwhelmed and struggle to cope",
          "I panic and may shut down or react emotionally"
        ]
      },
      {
        id: 2,
        text: "How important is it for you to maintain a work-life balance?",
        answers: [
          "Not important - I often work long hours and weekends",
          "Slightly important - I try to maintain balance, but work is a priority",
          "Moderately important - I value my time off, but work can be demanding",
          "Very important - I make a conscious effort to maintain balance",
          "Crucially important - I refuse to let work interfere with my personal life"
        ]
      },
      {
        id: 3,
        text: "How do you handle it when plans or situations change unexpectedly?",
        answers: [
          "I adapt quickly and find new solutions",
          "I take it in stride and adjust my plans accordingly",
          "I get stressed and frustrated by the changes",
          "I resist the changes and try to stick to the original plan",
          "I panic and feel overwhelmed by the unexpected changes"
        ]
      },
      {
        id: 4,
        text: "How important is it for you to have a stable and predictable routine?",
        answers: [
          "Not important - I thrive on variety and spontaneity",
          "Slightly important - I like some routine, but I can be flexible",
          "Moderately important - I need a reasonable amount of stability",
          "Very important - I prefer a stable routine to feel secure",
          "Crucially important - I can't function well without a predictable routine"
        ]
      },
      {
        id: 5,
        text: "How do you react when you achieve a significant goal or milestone?",
        answers: [
          "I celebrate and reward myself immediately",
          "I feel satisfied but quickly move on to the next goal",
          "I take time to reflect on the achievement",
          "I downplay the achievement and focus on future challenges",
          "I feel anxious about maintaining the success and avoiding failure"
        ]
      }
    ]
  },
  {
    title: "Social Processing",
    icon: "🗣️",
    description: "Evaluate your social skills and emotional intelligence",
    questions: [
      {
        id: 1,
        text: "How do you typically react in large social gatherings or parties?",
        answers: [
          "I love it - I thrive on social interaction and energy",
          "I like it - I enjoy meeting new people and chatting",
          "I'm neutral - I can take it or leave it",
          "I don't like it - I prefer smaller, more intimate settings",
          "I avoid it - I find large gatherings overwhelming"
        ]
      },
      {
        id: 2,
        text: "How comfortable are you with expressing your emotions to others?",
        answers: [
          "Very comfortable - I'm open and expressive with my emotions",
          "Somewhat comfortable - I can express my emotions when needed",
          "Neutral - I don't mind expressing emotions, but I don't do it often",
          "Somewhat uncomfortable - I hesitate to express my emotions",
          "Very uncomfortable - I avoid expressing my emotions at all costs"
        ]
      },
      {
        id: 3,
        text: "How do you handle it when someone you care about is upset or in distress?",
        answers: [
          "I stay calm and help them find a solution",
          "I feel sad and try to comfort them",
          "I get anxious and don't know how to help",
          "I avoid them, not knowing what to say or do",
          "I panic and may overreact emotionally"
        ]
      },
      {
        id: 4,
        text: "How important is it for you to be liked and accepted by others?",
        answers: [
          "Not important at all - I value honesty over popularity",
          "Slightly important - I appreciate being liked, but it's not crucial",
          "Moderately important - I want people to like me, but it's not a priority",
          "Very important - I feel anxious if I'm not accepted by others",
          "Crucially important - I need others' approval to feel good about myself"
        ]
      },
      {
        id: 5,
        text: "How do you react when someone criticizes you or your work?",
        answers: [
          "I take it as constructive feedback and improve",
          "I feel bad but try not to show it",
          "I get defensive and argue back",
          "I ignore the criticism and move on",
          "I dwell on it for a long time and feel upset"
        ]
      }
    ]
  }
];

const CognitiveFit = () => {
  const { currentUser, userRoles } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cognitiveProfile, setCognitiveProfile] = useState(null);
  const [careerMatches, setCareerMatches] = useState([]);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [selectedTrait, setSelectedTrait] = useState('');
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  
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

  // Add quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});

  // Add trait mapping for answers
  const evaluateAnswers = () => {
    const traitScores = {
      attentionSpan: 0,
      decisionSpeed: 0,
      emotionalReactivity: 0,
      analyticalThinking: 0,
      creativeThinking: 0,
      stressResilience: 0,
      socialProcessing: 0
    };

    // Enhanced trait mapping with more precise weights
    const sectionTraitMapping = {
      0: { // Attention Span
        primary: { trait: 'attentionSpan', weights: [0.95, 0.85, 0.75, 0.85, 0.8] },
        secondary: { trait: 'analyticalThinking', weights: [0.4, 0.45, 0.35, 0.4, 0.3] }
      },
      1: { // Decision Speed
        primary: { trait: 'decisionSpeed', weights: [0.9, 0.85, 0.8, 0.85, 0.8] },
        secondary: { trait: 'stressResilience', weights: [0.5, 0.4, 0.45, 0.35, 0.4] }
      },
      2: { // Emotional Reactivity
        primary: { trait: 'emotionalReactivity', weights: [0.9, 0.8, 0.8, 0.7, 0.8] },
        secondary: { trait: 'socialProcessing', weights: [0.4, 0.4, 0.3, 0.4, 0.3] }
      },
      3: { // Analytical Thinking
        primary: { trait: 'analyticalThinking', weights: [0.9, 0.8, 0.8, 0.8, 0.7] },
        secondary: { trait: 'decisionSpeed', weights: [0.3, 0.3, 0.4, 0.4, 0.3] }
      },
      4: { // Creative Thinking
        primary: { trait: 'creativeThinking', weights: [0.9, 0.8, 0.7, 0.8, 0.8] },
        secondary: { trait: 'emotionalReactivity', weights: [0.3, 0.4, 0.3, 0.3, 0.4] }
      },
      5: { // Stress Resilience
        primary: { trait: 'stressResilience', weights: [0.9, 0.7, 0.8, 0.8, 0.8] },
        secondary: { trait: 'decisionSpeed', weights: [0.4, 0.3, 0.4, 0.3, 0.3] }
      },
      6: { // Social Processing
        primary: { trait: 'socialProcessing', weights: [0.9, 0.8, 0.8, 0.7, 0.8] },
        secondary: { trait: 'emotionalReactivity', weights: [0.4, 0.3, 0.4, 0.3, 0.4] }
      }
    };

    // Calculate weighted scores
    Object.entries(answers).forEach(([key, answer]) => {
      const [section, questionNum] = key.split('-').map(Number);
      const sectionMap = sectionTraitMapping[section];
      const questionIndex = questionNum - 1;
      
      // Get answer index and calculate base score
      const answerIndex = quizSections[section].questions[questionIndex].answers.indexOf(answer);
      const baseScore = (4 - answerIndex) / 4;

      // Apply weighted scores to primary and secondary traits
      const primaryWeight = sectionMap.primary.weights[questionIndex];
      const secondaryWeight = sectionMap.secondary.weights[questionIndex];
      
      traitScores[sectionMap.primary.trait] += baseScore * primaryWeight;
      traitScores[sectionMap.secondary.trait] += baseScore * secondaryWeight;
    });

    // Normalize and adjust scores
    const maxScores = {};
    Object.entries(sectionTraitMapping).forEach(([section, mapping]) => {
      const primaryTrait = mapping.primary.trait;
      const secondaryTrait = mapping.secondary.trait;
      
      maxScores[primaryTrait] = (maxScores[primaryTrait] || 0) + 
        mapping.primary.weights.reduce((a, b) => a + b, 0);
      maxScores[secondaryTrait] = (maxScores[secondaryTrait] || 0) + 
        mapping.secondary.weights.reduce((a, b) => a + b, 0);
    });

    // Normalize each trait score by its maximum possible score
    Object.keys(traitScores).forEach(trait => {
      traitScores[trait] = Math.min(traitScores[trait] / maxScores[trait], 1);
    });

    return traitScores;
  };

  // Modify handleAnswer to only track answers without updating profile
  const handleAnswer = (questionId, answer) => {
    if (!timerActive) {
      setTimerActive(true);
    }
    setAnswers(prev => ({
      ...prev,
      [`${currentSection}-${currentQuestion + 1}`]: answer
    }));
    
    // Only move to next question/section
    if (currentQuestion < quizSections[currentSection].questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (currentSection < quizSections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setCurrentQuestion(0);
    }
  };

  // Add submit handler with final evaluation
  const handleQuizSubmit = () => {
    setTimerActive(false);
    const finalScores = evaluateAnswers();
    setCognitiveProfile(finalScores);
    // You might want to save the completion time
    console.log(`Quiz completed in ${formatTime(timer)}`);
  };

  // Format time function
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Add timer effect
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer(seconds => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Modify QuizContent component to show section and question numbers
  const QuizContent = () => (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip 
            label={`Section ${currentSection + 1}/${quizSections.length}`}
            color="primary"
            variant="outlined"
          />
          <Typography variant="h5">
            {quizSections[currentSection].title}
          </Typography>
        </Box>
        <Chip
          label={formatTime(timer)}
          color="secondary"
          variant="outlined"
          sx={{ fontFamily: 'monospace' }}
        />
      </Box>

      <Typography variant="body1" color="text.secondary" gutterBottom>
        {quizSections[currentSection].description}
      </Typography>
      
      {quizSections[currentSection].questions.map((question, idx) => (
        <Paper 
          key={idx} 
          sx={{ 
            p: 3, 
            mb: 2, 
            display: idx === currentQuestion ? 'block' : 'none',
            position: 'relative'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Chip 
              label={`Question ${currentQuestion + 1}`} // Simplified question number display
              color="primary"
              size="small"
              sx={{ mt: 0.5 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                {question.text}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {question.answers.map((answer, ansIdx) => (
                  <Button
                    key={ansIdx}
                    variant="outlined"
                    onClick={() => handleAnswer(question.id, answer)}
                    sx={{ 
                      justifyContent: 'flex-start', 
                      py: 2,
                      pl: 2,
                      position: 'relative'
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        position: 'absolute',
                        left: '8px',
                        color: 'text.secondary',
                        fontSize: '0.8rem'
                      }}
                    >
                      {String.fromCharCode(65 + ansIdx)}.
                    </Typography>
                    <Box sx={{ pl: 3 }}>{answer}</Box>
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );

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
                            
                            {career.cognitiveStrengths && career.cognitiveStrengths.length > 0 && (
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                  Cognitive Strengths:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                  {career.cognitiveStrengths.map((strength, i) => (
                                    <Chip 
                                      key={i} 
                                      label={strength} 
                                      size="small" 
                                      color="success" 
                                      variant="outlined"
                                    />
                                  ))}
                                </Box>
                              </Box>
                            )}
                            
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

      {/* Quiz Section */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Cognitive Assessment Quiz
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Answer the following questions to help us understand your cognitive preferences and abilities.
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <QuizContent />
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleQuizSubmit}
            disabled={currentSection < quizSections.length - 1 || currentQuestion < quizSections[currentSection].questions.length - 1}
          >
            Submit Quiz
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CognitiveFit;
