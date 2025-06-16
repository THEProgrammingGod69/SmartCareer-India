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
  CardMedia,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  Chip,
  LinearProgress,
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Avatar,
} from '@mui/material';
import {
  Sync,
  Check,
  EmojiEvents,
  Star,
  Assignment,
  Code,
  Create,
  Business,
  Description,
  Lock,
  LockOpen,
  ArrowUpward,
  Visibility,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { careerChallenges } from '../../utils/careerChallengesData';
import { getUserChallengesData, submitChallenge, getNextChallengeMessage } from '../../services/careerChallengesService';

const CareerChallenges = () => {
  const { currentUser, userRoles } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userPoints, setUserPoints] = useState(0);
  const [userBadges, setUserBadges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  const [submissionText, setSubmissionText] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [nextStepMessage, setNextStepMessage] = useState('');
  
  // User data - in a real app, this would come from a database
  const userData = {
    name: currentUser?.displayName || "User",
    career_interest: "Software Engineering",
    is_premium: userRoles.isPremium
  };

  // Load user data and challenges
  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        // Get user challenges data from Firebase
        const userChallengesData = await getUserChallengesData(currentUser.uid);
        
        // Update state with user data
        setUserPoints(userChallengesData.points || 0);
        setUserBadges(userChallengesData.badges || []);
        
        // Get completed challenges
        const completedIds = userChallengesData.completedChallenges || [];
        const completedTitles = careerChallenges
          .filter(challenge => completedIds.includes(challenge.id))
          .map(challenge => challenge.title);
        setCompletedChallenges(completedTitles);
        
        // Get next step message
        const message = await getNextChallengeMessage(
          currentUser.uid,
          userData.name,
          userData.career_interest
        );
        setNextStepMessage(message);
      } catch (error) {
        console.error('Error loading user data:', error);
        setNotification({
          open: true,
          message: 'Failed to load your challenge data. Please try again.',
          severity: 'error'
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [currentUser, userData.name, userData.career_interest]);

  // Handle challenge selection
  const handleChallengeSelect = (challenge) => {
    setSelectedChallenge(challenge);
  };

  // Handle challenge submission
  const handleSubmitChallenge = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (!submissionText.trim()) {
      setNotification({
        open: true,
        message: 'Please provide a submission for the challenge',
        severity: 'error'
      });
      return;
    }
    
    try {
      // Submit challenge to Firebase
      const result = await submitChallenge(
        currentUser.uid,
        selectedChallenge.id,
        submissionText
      );
      
      if (result.success) {
        // Update local state
        setCompletedChallenges([...completedChallenges, selectedChallenge.title]);
        setUserPoints(result.totalPoints);
        
        // Check if user earned a new badge
        if (result.badge && !userBadges.includes(result.badge)) {
          setUserBadges([...userBadges, result.badge]);
        }
        
        // Update next step message
        const message = await getNextChallengeMessage(
          currentUser.uid,
          userData.name,
          userData.career_interest
        );
        setNextStepMessage(message);
        
        setNotification({
          open: true,
          message: result.message,
          severity: 'success'
        });
      } else {
        setNotification({
          open: true,
          message: result.message,
          severity: 'warning'
        });
      }
    } catch (error) {
      console.error('Error submitting challenge:', error);
      setNotification({
        open: true,
        message: 'Failed to submit your challenge. Please try again.',
        severity: 'error'
      });
    } finally {
      setSubmissionDialogOpen(false);
      setSubmissionText('');
    }
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // All available challenges
  const allChallenges = [
    {
      title: 'Write a Tech Blog',
      description: 'Write a 500-word blog post about a recent technology trend in software engineering.',
      points: 50,
      badge: 'Rising Blogger',
      difficulty: 'Medium',
      estimatedTime: '2-3 hours',
      category: 'Content Creation',
      icon: <Create color="primary" fontSize="large" />,
      isPremium: false,
    },
    {
      title: 'Create a Business Pitch',
      description: 'Develop a 5-minute pitch for a software product that solves a real-world problem.',
      points: 70,
      badge: 'Pitch Master',
      difficulty: 'Hard',
      estimatedTime: '4-5 hours',
      category: 'Business Skills',
      icon: <Business color="primary" fontSize="large" />,
      isPremium: false,
    },
    {
      title: 'Build a Portfolio Page',
      description: 'Create a simple portfolio webpage showcasing your projects and skills.',
      points: 80,
      badge: 'Web Developer',
      difficulty: 'Medium',
      estimatedTime: '5-6 hours',
      category: 'Technical Skills',
      icon: <Code color="primary" fontSize="large" />,
      isPremium: false,
    },
    {
      title: 'Design a Product Manager Resume',
      description: 'Create a tailored resume for a product manager role in a tech company.',
      points: 60,
      badge: 'Resume Expert',
      difficulty: 'Medium',
      estimatedTime: '3-4 hours',
      category: 'Career Development',
      icon: <Description color="primary" fontSize="large" />,
      isPremium: false,
    },
    {
      title: 'Industry Challenge: API Integration',
      description: 'Complete a real-world API integration challenge provided by our industry partners.',
      points: 100,
      badge: 'API Specialist',
      difficulty: 'Hard',
      estimatedTime: '8-10 hours',
      category: 'Technical Skills',
      icon: <Code color="primary" fontSize="large" />,
      isPremium: true,
      partner: 'TechCorp India',
    },
    {
      title: 'Industry Challenge: UX Research',
      description: 'Conduct a UX research study for a real product and provide actionable insights.',
      points: 120,
      badge: 'UX Researcher',
      difficulty: 'Hard',
      estimatedTime: '10-12 hours',
      category: 'Design Skills',
      icon: <Visibility color="primary" fontSize="large" />,
      isPremium: true,
      partner: 'DesignHub',
    },
  ];

  // Filter challenges based on completion status
  const recommendedChallenges = allChallenges
    .filter(challenge => !completedChallenges.includes(challenge.title))
    .slice(0, 3);

  // Calculate progress percentage
  const progressPercentage = (completedChallenges.length / allChallenges.length) * 100;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Gamified Career Challenges
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Complete interactive, goal-oriented tasks to build your skills and advance your career in {userData.career_interest}.
        </Typography>
        <Chip 
          color="primary" 
          icon={<Check />} 
          label="Premium Feature" 
          sx={{ mb: 2 }}
        />
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
                  Recommended Challenges
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/all-challenges')}
                >
                  View All
                </Button>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                {recommendedChallenges.map((challenge, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        position: 'relative',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-5px)' },
                      }}
                      variant="outlined"
                    >
                      {challenge.isPremium && !userData.is_premium && (
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            width: '100%', 
                            height: '100%', 
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1,
                            borderRadius: 1,
                          }}
                        >
                          <Lock sx={{ color: 'white', fontSize: 40, mb: 1 }} />
                          <Typography variant="body1" color="white" align="center" sx={{ px: 2 }}>
                            Premium Challenge
                          </Typography>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ mt: 2 }}
                            onClick={() => navigate('/premium-features')}
                          >
                            Upgrade
                          </Button>
                        </Box>
                      )}
                      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                        {challenge.icon}
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h2" gutterBottom align="center">
                          {challenge.title}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                          <Chip 
                            size="small" 
                            label={`${challenge.points} points`} 
                            color="primary" 
                            variant="outlined"
                            icon={<Star fontSize="small" />}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {challenge.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Difficulty: {challenge.difficulty}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ~{challenge.estimatedTime}
                          </Typography>
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          fullWidth 
                          variant="contained" 
                          color="primary"
                          disabled={challenge.isPremium && !userData.is_premium}
                          onClick={() => {
                            handleChallengeSelect(challenge);
                            setSubmissionDialogOpen(true);
                          }}
                        >
                          Start Challenge
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
            
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                All Challenges
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={2}>
                {allChallenges.map((challenge, index) => (
                  <Grid item xs={12} key={index}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        display: 'flex',
                        opacity: completedChallenges.includes(challenge.title) ? 0.7 : 1,
                      }}
                    >
                      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 80 }}>
                        {challenge.icon}
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography component="h5" variant="h6">
                              {challenge.title}
                              {completedChallenges.includes(challenge.title) && (
                                <Check color="success" sx={{ ml: 1 }} />
                              )}
                            </Typography>
                            <Box>
                              <Chip 
                                size="small" 
                                label={`${challenge.points} pts`} 
                                color="primary" 
                                variant="outlined"
                                icon={<Star fontSize="small" />}
                                sx={{ mr: 1 }}
                              />
                              {challenge.isPremium && (
                                <Chip 
                                  size="small" 
                                  label="Premium" 
                                  color="secondary" 
                                  icon={userData.is_premium ? <LockOpen fontSize="small" /> : <Lock fontSize="small" />}
                                />
                              )}
                            </Box>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {challenge.description}
                          </Typography>
                          <Box sx={{ display: 'flex', mt: 1 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                              Category: {challenge.category}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                              Difficulty: {challenge.difficulty}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Time: {challenge.estimatedTime}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <Button 
                          variant="contained" 
                          color={completedChallenges.includes(challenge.title) ? "success" : "primary"}
                          size="small"
                          disabled={(challenge.isPremium && !userData.is_premium) || completedChallenges.includes(challenge.title)}
                          onClick={() => {
                            if (!completedChallenges.includes(challenge.title)) {
                              handleChallengeSelect(challenge);
                              setSubmissionDialogOpen(true);
                            }
                          }}
                        >
                          {completedChallenges.includes(challenge.title) ? "Completed" : "Start"}
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* User Progress */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Your Progress
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2">
                    Challenges Completed
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {completedChallenges.length}/{allChallenges.length}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progressPercentage} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" gutterBottom>
                  Total Points: <strong>{userPoints}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Next level at 200 points
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(userPoints / 200) * 100} 
                  sx={{ height: 6, borderRadius: 3, mt: 1 }}
                />
              </Box>
              
              <Typography variant="body1" gutterBottom>
                Badges Earned:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {userBadges.map((badge, index) => (
                  <Chip 
                    key={index}
                    label={badge}
                    color="primary"
                    variant="outlined"
                    icon={<EmojiEvents fontSize="small" />}
                  />
                ))}
              </Box>
            </Paper>
            
            {/* Next Steps */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Next Steps
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  {nextStepMessage || `Keep up the good work, ${userData.name}!`}
                </Typography>
              </Alert>
              
              <Typography variant="body2" paragraph>
                Completing challenges helps you:
              </Typography>
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Check color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Build practical skills for your career" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Check color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Create portfolio pieces to show employers" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Check color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Earn badges to showcase your achievements" />
                </ListItem>
                {userData.is_premium && (
                  <ListItem>
                    <ListItemIcon>
                      <Check color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Get feedback from industry professionals" />
                  </ListItem>
                )}
              </List>
              
              {!userData.is_premium && (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  startIcon={<LockOpen />}
                  onClick={() => navigate('/premium-features')}
                  sx={{ mt: 2 }}
                >
                  Unlock Premium Challenges
                </Button>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}
      
      {/* Challenge Submission Dialog */}
      <Dialog open={submissionDialogOpen} onClose={() => setSubmissionDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedChallenge?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText paragraph>
            {selectedChallenge?.description}
          </DialogContentText>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Challenge Details:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Points: <strong>{selectedChallenge?.points}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Badge: <strong>{selectedChallenge?.badge}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Difficulty: <strong>{selectedChallenge?.difficulty}</strong>
                </Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="body2" color="text.secondary">
                  Time: <strong>{selectedChallenge?.estimatedTime}</strong>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle2" gutterBottom>
            Your Submission:
          </Typography>
          <TextField
            autoFocus
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            placeholder="Enter your submission here..."
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            You can also upload files or links to your work if applicable.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmissionDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSubmitChallenge}
          >
            Submit Challenge
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Notification */}
      <Alert
        severity={notification.severity}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 9999,
          display: notification.open ? 'flex' : 'none',
          boxShadow: 3,
        }}
        onClose={handleCloseNotification}
      >
        {notification.message}
      </Alert>
    </Container>
  );
};

export default CareerChallenges;
