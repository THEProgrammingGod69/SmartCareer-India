/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useChallenges } from '../contexts/ChallengesContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  CircularProgress,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Tabs,
  Tab,
  Divider,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  WorkOutline as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Brush as BrushIcon,
  Business as BusinessIcon,
  Security as SecurityIcon,
  Equalizer as AnalyticsIcon,
  Campaign as MarketingIcon,
} from '@mui/icons-material';

const CareerChallenges = () => {
  const { currentUser } = useAuth();
  const {
    userProgress,
    completedChallenges,
    recommendedChallenges,
    leaderboard,
    loading,
    error,
    submitChallenge,
    getChallengesByCareerInterest,
    getMotivationalMessage,
    refreshUserData,
  } = useChallenges();

  const [tabValue, setTabValue] = useState(0);
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  const [submission, setSubmission] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState('');
  const [careerFilter, setCareerFilter] = useState('All');
  const [motivationalMessage, setMotivationalMessage] = useState('');

  // Get a motivational message on component mount
  useEffect(() => {
    setMotivationalMessage(getMotivationalMessage());
  }, [getMotivationalMessage]);

  // Load challenges based on selected tab
  useEffect(() => {
    const loadChallenges = async () => {
      try {
        let challengesList = [];

        if (tabValue === 0) {
          // Recommended challenges
          challengesList = recommendedChallenges;
        } else if (tabValue === 1) {
          // All challenges by career interest
          challengesList = await getChallengesByCareerInterest(careerFilter !== 'All' ? careerFilter : null);
        } else if (tabValue === 2) {
          // Completed challenges
          challengesList = completedChallenges;
        }

        setChallenges(challengesList);
      } catch (err) {
        console.error('Error loading challenges:', err);
      }
    };

    loadChallenges();
  }, [tabValue, careerFilter, recommendedChallenges, completedChallenges, getChallengesByCareerInterest]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCareerFilterChange = (career) => {
    setCareerFilter(career);
  };

  const handleChallengeSelect = (challenge) => {
    setSelectedChallenge(challenge);
    setSubmissionDialogOpen(true);
    setSubmission('');
    setSubmissionError('');
    setSubmissionSuccess('');
  };

  const handleSubmissionClose = () => {
    setSubmissionDialogOpen(false);
    setSelectedChallenge(null);
  };

  const handleSubmissionChange = (e) => {
    setSubmission(e.target.value);
  };

  const handleSubmitChallenge = async () => {
    if (!selectedChallenge) return;

    setSubmissionLoading(true);
    setSubmissionError('');
    setSubmissionSuccess('');

    try {
      const result = await submitChallenge(selectedChallenge.id, submission);

      if (result.success) {
        setSubmissionSuccess(`Challenge submitted successfully! You earned ${result.points} points and the "${result.badge}" badge.`);
        setSubmission('');
        // Refresh data after a short delay
        setTimeout(() => {
          refreshUserData();
          setSubmissionDialogOpen(false);
          setSelectedChallenge(null);
          // Get a new motivational message
          setMotivationalMessage(getMotivationalMessage());
        }, 3000);
      } else {
        setSubmissionError(result.message || 'Failed to submit challenge. Please try again.');
      }
    } catch (err) {
      setSubmissionError(err.message || 'An error occurred while submitting the challenge.');
    } finally {
      setSubmissionLoading(false);
    }
  };

  // Get icon for career path
  const getCareerIcon = (careerPath) => {
    switch (careerPath) {
      case 'Software Development':
        return <CodeIcon />;
      case 'Data Science':
        return <AnalyticsIcon />;
      case 'UX/UI Design':
        return <BrushIcon />;
      case 'Product Management':
        return <BusinessIcon />;
      case 'Cybersecurity':
        return <SecurityIcon />;
      case 'Digital Marketing':
        return <MarketingIcon />;
      case 'Business Analysis':
        return <BusinessIcon />;
      default:
        return <WorkIcon />;
    }
  };

  // Get color for difficulty
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Hard':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading && !challenges.length) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading challenges...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header with user progress */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom color="white">
              Career Challenges
            </Typography>
            <Typography variant="subtitle1" paragraph color="white">
              Complete challenges to earn points, badges, and build your career skills.
            </Typography>
            <Typography variant="body1" color="white" sx={{ fontStyle: 'italic', mb: 2 }}>
              "{motivationalMessage}"
            </Typography>
          </Grid>
          {currentUser && userProgress && (
            <Grid item xs={12} md={4}>
              <Paper elevation={6} sx={{ p: 2, borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Your Progress
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">{userProgress.level}</Typography>
                    <Typography variant="body2">Level</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">{userProgress.totalPoints}</Typography>
                    <Typography variant="body2">Points</Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4">{userProgress.completedChallenges}</Typography>
                    <Typography variant="body2">Completed</Typography>
                  </Grid>
                </Grid>
                {userProgress.badges && userProgress.badges.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>Recent Badges:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {userProgress.badges.slice(0, 3).map((badge, index) => (
                        <Chip 
                          key={index} 
                          icon={<StarIcon />} 
                          label={badge} 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                        />
                      ))}
                      {userProgress.badges.length > 3 && (
                        <Chip 
                          label={`+${userProgress.badges.length - 3} more`} 
                          size="small" 
                          variant="outlined" 
                        />
                      )}
                    </Box>
                  </Box>
                )}
              </Paper>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* Tabs for different challenge views */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="challenge tabs"
          variant="fullWidth"
        >
          <Tab label="Recommended" icon={<StarIcon />} iconPosition="start" />
          <Tab label="All Challenges" icon={<AssignmentIcon />} iconPosition="start" />
          <Tab label="Completed" icon={<CheckCircleIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Career path filter (only for All Challenges tab) */}
      {tabValue === 1 && (
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Button 
            variant={careerFilter === 'All' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => handleCareerFilterChange('All')}
            sx={{ mb: 1 }}
          >
            All
          </Button>
          <Button 
            variant={careerFilter === 'Software Development' ? 'contained' : 'outlined'}
            size="small"
            startIcon={<CodeIcon />}
            onClick={() => handleCareerFilterChange('Software Development')}
            sx={{ mb: 1 }}
          >
            Software Development
          </Button>
          <Button 
            variant={careerFilter === 'Data Science' ? 'contained' : 'outlined'}
            size="small"
            startIcon={<AnalyticsIcon />}
            onClick={() => handleCareerFilterChange('Data Science')}
            sx={{ mb: 1 }}
          >
            Data Science
          </Button>
          <Button 
            variant={careerFilter === 'UX/UI Design' ? 'contained' : 'outlined'}
            size="small"
            startIcon={<BrushIcon />}
            onClick={() => handleCareerFilterChange('UX/UI Design')}
            sx={{ mb: 1 }}
          >
            UX/UI Design
          </Button>
          <Button 
            variant={careerFilter === 'Product Management' ? 'contained' : 'outlined'}
            size="small"
            startIcon={<BusinessIcon />}
            onClick={() => handleCareerFilterChange('Product Management')}
            sx={{ mb: 1 }}
          >
            Product Management
          </Button>
          <Button 
            variant={careerFilter === 'Cybersecurity' ? 'contained' : 'outlined'}
            size="small"
            startIcon={<SecurityIcon />}
            onClick={() => handleCareerFilterChange('Cybersecurity')}
            sx={{ mb: 1 }}
          >
            Cybersecurity
          </Button>
          <Button 
            variant={careerFilter === 'Digital Marketing' ? 'contained' : 'outlined'}
            size="small"
            startIcon={<MarketingIcon />}
            onClick={() => handleCareerFilterChange('Digital Marketing')}
            sx={{ mb: 1 }}
          >
            Digital Marketing
          </Button>
          <Button 
            variant={careerFilter === 'Business Analysis' ? 'contained' : 'outlined'}
            size="small"
            startIcon={<BusinessIcon />}
            onClick={() => handleCareerFilterChange('Business Analysis')}
            sx={{ mb: 1 }}
          >
            Business Analysis
          </Button>
          <Button 
            variant={careerFilter === 'General' ? 'contained' : 'outlined'}
            size="small"
            startIcon={<WorkIcon />}
            onClick={() => handleCareerFilterChange('General')}
            sx={{ mb: 1 }}
          >
            General
          </Button>
        </Box>
      )}

      {/* Challenge cards */}
      {challenges.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="textSecondary">
            {tabValue === 2 ? 'You haven\'t completed any challenges yet.' : 'No challenges available.'}
          </Typography>
          {tabValue === 2 && (
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2 }}
              onClick={() => setTabValue(0)}
            >
              View Recommended Challenges
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {challenges.map((challenge) => (
            <Grid item xs={12} sm={6} md={4} key={challenge.id}>
              <Card 
                elevation={3} 
                sx={{
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {challenge.title}
                    </Typography>
                    <Avatar 
                      sx={{ 
                        bgcolor: challenge.isPremium ? 'secondary.main' : 'primary.main',
                        width: 32, 
                        height: 32,
                      }}
                    >
                      {getCareerIcon(challenge.careerPath)}
                    </Avatar>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {challenge.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                    <Chip 
                      label={challenge.difficulty} 
                      size="small" 
                      color={getDifficultyColor(challenge.difficulty)} 
                      variant="outlined"
                    />
                    <Chip 
                      label={`${challenge.points} pts`} 
                      size="small" 
                      icon={<StarIcon fontSize="small" />}
                      variant="outlined"
                    />
                    <Chip 
                      label={challenge.estimatedTime} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                  
                  {challenge.skills && challenge.skills.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" gutterBottom>Skills:</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {challenge.skills.slice(0, 3).map((skill, index) => (
                          <Chip key={index} label={skill} size="small" variant="outlined" />
                        ))}
                        {challenge.skills.length > 3 && (
                          <Chip label={`+${challenge.skills.length - 3}`} size="small" variant="outlined" />
                        )}
                      </Box>
                    </Box>
                  )}
                  
                  {challenge.badge && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <TrophyIcon color="warning" fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        Badge: {challenge.badge}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                
                <CardActions>
                  {tabValue === 2 ? (
                    <Button 
                      size="small" 
                      startIcon={<CheckCircleIcon />}
                      disabled
                      fullWidth
                    >
                      Completed
                    </Button>
                  ) : (
                    <Button 
                      size="small" 
                      variant="contained" 
                      color="primary"
                      onClick={() => handleChallengeSelect(challenge)}
                      fullWidth
                      disabled={!currentUser}
                    >
                      Start Challenge
                    </Button>
                  )}
                </CardActions>
                
                {challenge.isPremium && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10, 
                      bgcolor: 'secondary.main', 
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    PREMIUM
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Leaderboard section */}
      {leaderboard && leaderboard.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Leaderboard
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Paper elevation={3} sx={{ p: 2 }}>
            <List>
              {leaderboard.map((user, index) => (
                <ListItem key={user.userId} divider={index < leaderboard.length - 1}>
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Typography 
                          sx={{ 
                            bgcolor: index < 3 ? 'warning.main' : 'primary.main', 
                            color: 'white',
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                          }}
                        >
                          {index + 1}
                        </Typography>
                      }
                    >
                      <Avatar sx={{ bgcolor: index < 3 ? 'warning.main' : 'primary.main' }}>
                        {user.displayName.charAt(0).toUpperCase()}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.displayName}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary">
                          Level {user.level} • {user.totalPoints} points
                        </Typography>
                        <br />
                        {user.completedChallenges} challenges completed
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}

      {/* Challenge submission dialog */}
      <Dialog
        open={submissionDialogOpen}
        onClose={handleSubmissionClose}
        fullWidth
        maxWidth="md"
      >
        {selectedChallenge && (
          <React.Fragment>
            <DialogTitle>
              {selectedChallenge.title}
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" paragraph>
                {selectedChallenge.description}
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Challenge Details:</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Difficulty:</strong> {selectedChallenge.difficulty}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Points:</strong> {selectedChallenge.points}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Estimated Time:</strong> {selectedChallenge.estimatedTime}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2">
                      <strong>Category:</strong> {selectedChallenge.category}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Career Path:</strong> {selectedChallenge.careerPath}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Badge:</strong> {selectedChallenge.badge}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              
              {selectedChallenge.skills && selectedChallenge.skills.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>Skills You'll Develop:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedChallenge.skills.map((skill, index) => (
                      <Chip key={index} label={skill} />
                    ))}
                  </Box>
                </Box>
              )}
              
              {selectedChallenge.resources && selectedChallenge.resources.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>Helpful Resources:</Typography>
                  <List dense>
                    {selectedChallenge.resources.map((resource, index) => (
                      <ListItem key={index}>
                        <ListItemText 
                          primary={
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              {resource.title}
                            </a>
                          } 
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
              
              <Typography variant="subtitle2" gutterBottom>Your Submission:</Typography>
              <TextField
                label="Enter your submission"
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                value={submission}
                onChange={handleSubmissionChange}
                placeholder={`Enter your submission for this challenge. For ${selectedChallenge.submissionType === 'link' ? 'links' : selectedChallenge.submissionType === 'github' ? 'GitHub repositories' : 'text submissions'}, please provide the complete URL.`}
                disabled={submissionLoading}
              />
              
              {submissionError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {submissionError}
                </Alert>
              )}
              
              {submissionSuccess && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {submissionSuccess}
                </Alert>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSubmissionClose} disabled={submissionLoading}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitChallenge} 
                variant="contained" 
                color="primary"
                disabled={!submission.trim() || submissionLoading}
              >
                {submissionLoading ? 'Submitting...' : 'Submit Challenge'}
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </Container>
  );
};

export default CareerChallenges;
