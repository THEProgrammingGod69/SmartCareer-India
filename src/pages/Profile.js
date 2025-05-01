import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Alert,
  Snackbar,
  Chip,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Upload as UploadIcon,
  Description as ResumeIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  // Sample user profile data - in a real app, this would come from a database
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    phone: '',
    education: '',
    location: '',
    languages: '',
    website: '',
    bio: '',
    skills: [],
    interests: [],
    quizResults: [],
    savedCareers: [],
    resume: null,
  });
  
  // For tab navigation
  const [activeTab, setActiveTab] = useState(0);
  
  // For resume upload
  const [resumeFile, setResumeFile] = useState(null);
  const fileInputRef = useRef(null);
  
  // For skill management
  const [newSkill, setNewSkill] = useState('');
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  
  // For interest management
  const [newInterest, setNewInterest] = useState('');
  const [interestDialogOpen, setInterestDialogOpen] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch user profile data from a database
    const fetchUserProfile = async () => {
      try {
        // Simulate API call delay
        setTimeout(() => {
          // Check if we have saved quiz results
          const savedResults = JSON.parse(localStorage.getItem('savedQuizResults') || '{}');
          const userQuizResults = currentUser?.uid && savedResults[currentUser.uid] ? 
            [{
              date: savedResults[currentUser.uid].date,
              topMatch: savedResults[currentUser.uid].results[0]?.title || 'Unknown',
              matchPercentage: savedResults[currentUser.uid].results[0]?.matchPercentage || 0
            }] : 
            [{ date: '2023-05-15', topMatch: 'Data Scientist', matchPercentage: 92 }];
          
          // Sample data - in a real app, this would come from a database
          setProfile({
            displayName: currentUser?.displayName || 'User Name',
            email: currentUser?.email || 'user@example.com',
            phone: '+91 9876543210',
            education: 'Bachelor of Technology, Computer Science',
            location: 'Bangalore, India',
            languages: 'English, Hindi',
            website: 'https://myportfolio.com',
            bio: 'Passionate about technology and innovation. Looking for opportunities in software development and data science.',
            skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Data Analysis'],
            interests: ['Web Development', 'Machine Learning', 'UI/UX Design'],
            quizResults: userQuizResults,
            savedCareers: [
              { id: 1, title: 'Data Scientist', category: 'Technology' },
              { id: 2, title: 'UX/UI Designer', category: 'Design' },
            ],
            resume: null,
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      // In a real app, you would upload this file to storage
      // For now, just store the file name
      setProfile({
        ...profile,
        resume: file.name
      });
      setNotification({
        open: true,
        message: 'Resume uploaded successfully!',
        severity: 'success',
      });
    }
  };
  
  const triggerResumeUpload = () => {
    fileInputRef.current.click();
  };
  
  const handleDeleteResume = () => {
    setResumeFile(null);
    setProfile({
      ...profile,
      resume: null
    });
    setNotification({
      open: true,
      message: 'Resume deleted successfully!',
      severity: 'info',
    });
  };
  
  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill('');
      setSkillDialogOpen(false);
    }
  };
  
  const handleRemoveSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove)
    });
  };
  
  const handleAddInterest = () => {
    if (newInterest.trim() !== '' && !profile.interests.includes(newInterest.trim())) {
      setProfile({
        ...profile,
        interests: [...profile.interests, newInterest.trim()]
      });
      setNewInterest('');
      setInterestDialogOpen(false);
    }
  };
  
  const handleRemoveInterest = (interestToRemove) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter(interest => interest !== interestToRemove)
    });
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveProfile = () => {
    // In a real app, you would save the updated profile to a database
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      setEditMode(false);
      setNotification({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success',
      });
    }, 1000);
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage your personal information and view your career journey.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 16px',
                bgcolor: 'primary.main',
                fontSize: '3rem',
              }}
            >
              {profile.displayName.charAt(0)}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {profile.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {profile.email}
            </Typography>
            {!editMode && (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEditToggle}
                fullWidth
              >
                Edit Profile
              </Button>
            )}
          </Paper>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">
                  Skills
                </Typography>
                {editMode && (
                  <Tooltip title="Add Skill">
                    <IconButton size="small" onClick={() => setSkillDialogOpen(true)}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {profile.skills.map((skill, index) => (
                  <Chip 
                    key={index} 
                    label={skill} 
                    size="small" 
                    sx={{ m: 0.5 }} 
                    onDelete={editMode ? () => handleRemoveSkill(skill) : undefined}
                  />
                ))}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">
                  Interests
                </Typography>
                {editMode && (
                  <Tooltip title="Add Interest">
                    <IconButton size="small" onClick={() => setInterestDialogOpen(true)}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {profile.interests.map((interest, index) => (
                  <Chip 
                    key={index} 
                    label={interest} 
                    size="small" 
                    variant="outlined" 
                    sx={{ m: 0.5 }} 
                    onDelete={editMode ? () => handleRemoveInterest(interest) : undefined}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
          
          {/* Resume Upload Card */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resume
              </Typography>
              
              {profile.resume ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ResumeIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {profile.resume}
                    </Typography>
                  </Box>
                  {editMode && (
                    <IconButton size="small" color="error" onClick={handleDeleteResume}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    No resume uploaded yet.
                  </Typography>
                  {editMode && (
                    <Button
                      variant="outlined"
                      startIcon={<UploadIcon />}
                      size="small"
                      onClick={triggerResumeUpload}
                    >
                      Upload Resume
                    </Button>
                  )}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleResumeUpload}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">
                Personal Information
              </Typography>
              {editMode && (
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveProfile}
                    sx={{ mr: 1 }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleEditToggle}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Basic Info" />
              <Tab label="Additional Info" />
            </Tabs>
            
            {activeTab === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="displayName"
                    value={profile.displayName}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <PersonIcon color="action" sx={{ mr: 1 }} />,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <PhoneIcon color="action" sx={{ mr: 1 }} />,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Education"
                    name="education"
                    value={profile.education}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <SchoolIcon color="action" sx={{ mr: 1 }} />,
                    }}
                  />
                </Grid>
              </Grid>
            )}
            
            {activeTab === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={profile.location}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <LocationIcon color="action" sx={{ mr: 1 }} />,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Languages"
                    name="languages"
                    value={profile.languages}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <LanguageIcon color="action" sx={{ mr: 1 }} />,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Website/Portfolio"
                    name="website"
                    value={profile.website}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: <LinkIcon color="action" sx={{ mr: 1 }} />,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    multiline
                    rows={4}
                    InputProps={{
                      startAdornment: <PersonIcon color="action" sx={{ mr: 1, alignSelf: 'flex-start', mt: 1 }} />,
                    }}
                  />
                </Grid>
              </Grid>
            )}
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Career Quiz Results
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {profile.quizResults.length > 0 ? (
              <List>
                {profile.quizResults.map((result, index) => (
                  <ListItem key={index} divider={index < profile.quizResults.length - 1}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {result.matchPercentage}%
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={result.topMatch}
                      secondary={`Taken on ${new Date(result.date).toLocaleDateString()}`}
                    />
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => navigate('/quiz-results')}
                    >
                      View Details
                    </Button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Alert severity="info">
                You haven't taken any career quizzes yet. Take a quiz to discover careers that match your personality and skills.
              </Alert>
            )}

            <Box sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate('/career-quiz')}
              >
                Take Career Quiz
              </Button>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Saved Careers
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {profile.savedCareers.length > 0 ? (
              <List>
                {profile.savedCareers.map((career, index) => (
                  <ListItem key={index} divider={index < profile.savedCareers.length - 1}>
                    <ListItemIcon>
                      <WorkIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={career.title}
                      secondary={career.category}
                    />
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => navigate('/career-details')}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Alert severity="info">
                You haven't saved any careers yet. Explore careers to save them.
              </Alert>
            )}
          </Paper>

          <Snackbar
            open={notification.open}
            autoHideDuration={6000}
            onClose={handleCloseNotification}
          >
            <Alert onClose={handleCloseNotification} severity={notification.severity}>
              {notification.message}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;