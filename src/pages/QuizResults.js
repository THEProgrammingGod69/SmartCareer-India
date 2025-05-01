import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  WorkOutline,
  School,
  TrendingUp,
  CheckCircleOutline,
  ArrowForward,
  Refresh,
  Save as SaveIcon,
} from '@mui/icons-material';

import { sampleCareers } from './ExploreCareer_fixed';
import { calculateCareerMatches, saveQuizResults } from '../utils/careerMatchingAlgorithm';
import { useAuth } from '../contexts/AuthContext';

// Use the advanced career matching algorithm instead of random matching
const calculateMatches = (answers) => {
  return calculateCareerMatches(answers);
};

const QuizResults = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [careerMatches, setCareerMatches] = useState([]);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Fetch results based on stored quiz answers
    const fetchResults = async () => {
      try {
        // Simulate API call delay
        setTimeout(() => {
          const quizAnswers = localStorage.getItem('quizAnswers');
          
          if (!quizAnswers) {
            setError('No quiz data found. Please take the career quiz first.');
            setLoading(false);
            return;
          }
          
          const parsedAnswers = JSON.parse(quizAnswers);
          const matches = calculateMatches(parsedAnswers);
          setCareerMatches(matches);
          
          // Check if results are already saved
          const savedResults = localStorage.getItem('savedQuizResults');
          if (savedResults && currentUser) {
            const parsedResults = JSON.parse(savedResults);
            if (parsedResults[currentUser.uid]) {
              setSaved(true);
            }
          }
          
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error loading quiz results:', error);
        setError('Failed to load your results. Please try again.');
        setLoading(false);
      }
    };

    fetchResults();
  }, [currentUser]);

  const handleRetakeQuiz = () => {
    navigate('/career-quiz');
  };

  const handleExploreCareer = (careerId) => {
    navigate(`/career/${careerId}`);
  };
  
  const handleSaveResults = () => {
    if (currentUser && careerMatches.length > 0) {
      saveQuizResults(careerMatches, currentUser.uid);
      setSaved(true);
    } else if (!currentUser) {
      navigate('/login', { state: { from: '/quiz-results', message: 'Please log in to save your results' } });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 8 }}>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="h5" sx={{ mt: 4 }}>
            Analyzing your career matches...
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            We're finding the best career options based on your personality, skills, and interests.
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Alert severity="warning" sx={{ mb: 3 }}>{error}</Alert>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Refresh />}
            onClick={handleRetakeQuiz}
          >
            Take Career Quiz
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Career Matches
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" paragraph>
          Based on your responses, we've identified these career paths that align with your personality, skills, and interests.
        </Typography>

        <Box sx={{ my: 4 }}>
          {careerMatches.map((career, index) => (
            <Card key={career.id} variant="outlined" sx={{ mb: 3, border: index === 0 ? '2px solid #1976d2' : '' }}>
              {index === 0 && (
                <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 1, px: 2 }}>
                  <Typography variant="subtitle2">Top Match</Typography>
                </Box>
              )}
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h5" gutterBottom>
                      {career.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      {career.description}
                    </Typography>
                    
                    <Typography variant="subtitle1" gutterBottom>
                      Key Skills:
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      {career.skills.map((skill) => (
                        <Chip 
                          key={skill} 
                          label={skill} 
                          size="small" 
                          sx={{ mr: 1, mb: 1 }} 
                        />
                      ))}
                    </Box>
                    
                    <Typography variant="subtitle1" gutterBottom>
                      Education Requirements:
                    </Typography>
                    <List dense>
                      {Array.isArray(career.education) ? (
                        career.education.map((edu, i) => (
                          <ListItem key={i} sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <School fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={edu} />
                          </ListItem>
                        ))
                      ) : (
                        <ListItem sx={{ py: 0 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <School fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={career.education} />
                        </ListItem>
                      )}
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      bgcolor: 'background.paper',
                      p: 2,
                      borderRadius: 1,
                    }}>
                      <Typography variant="h6" gutterBottom>
                        Match Score
                      </Typography>
                      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                        <CircularProgress 
                          variant="determinate" 
                          value={career.matchPercentage} 
                          size={80} 
                          thickness={4} 
                          color="success" 
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
                          <Typography variant="h6" component="div" color="text.secondary">
                            {career.matchPercentage}%
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Divider sx={{ width: '100%', my: 2 }} />
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Salary Range:
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {career.salary}
                      </Typography>
                      
                      <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
                        Growth Outlook:
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {career.growth}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  endIcon={<ArrowForward />}
                  onClick={() => handleExploreCareer(career.id)}
                >
                  Explore This Career
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button 
            variant="outlined" 
            startIcon={<Refresh />}
            onClick={handleRetakeQuiz}
          >
            Retake Quiz
          </Button>
          
          <Box>
            {!saved && currentUser && (
              <Button 
                variant="outlined" 
                color="secondary"
                startIcon={<SaveIcon />}
                onClick={handleSaveResults}
                sx={{ mr: 2 }}
              >
                Save Results
              </Button>
            )}
            <Button 
              variant="contained" 
              endIcon={<ArrowForward />}
              onClick={() => navigate('/explore-careers')}
            >
              Explore All Careers
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default QuizResults;