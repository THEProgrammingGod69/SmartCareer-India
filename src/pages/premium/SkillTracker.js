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
  Rating,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';
import {
  TrackChanges,
  Add,
  Delete,
  Edit,
  Check,
  TrendingUp,
  School,
  Work,
  Timeline,
  ArrowForward,
  BarChart,
  Star,
  StarBorder,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const SkillTracker = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', category: '', proficiency: 1, goal: 5, notes: '' });
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Mock data - in a real app, this would come from a database
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSkills([
        { id: 1, name: 'JavaScript', category: 'Technical', proficiency: 3, goal: 5, lastUpdated: '2023-05-15', notes: 'Working on advanced concepts like closures and promises' },
        { id: 2, name: 'React', category: 'Technical', proficiency: 4, goal: 5, lastUpdated: '2023-05-10', notes: 'Need to learn more about hooks and context' },
        { id: 3, name: 'Project Management', category: 'Soft Skills', proficiency: 2, goal: 4, lastUpdated: '2023-04-28', notes: 'Taking an online course on Agile methodologies' },
        { id: 4, name: 'Data Analysis', category: 'Technical', proficiency: 1, goal: 3, lastUpdated: '2023-05-05', notes: 'Just started learning Python for data analysis' },
        { id: 5, name: 'Public Speaking', category: 'Soft Skills', proficiency: 3, goal: 4, lastUpdated: '2023-05-01', notes: 'Practicing with Toastmasters club' },
      ]);
      setLoading(false);
    }, 1500);
  }, []);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };
  
  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setNewSkill({ name: '', category: '', proficiency: 1, goal: 5, notes: '' });
  };
  
  const handleAddSkill = () => {
    if (!newSkill.name || !newSkill.category) {
      setError('Please fill in all required fields');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newId = Math.max(...skills.map(skill => skill.id), 0) + 1;
      const skillToAdd = {
        ...newSkill,
        id: newId,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      
      setSkills([...skills, skillToAdd]);
      setSuccess('Skill added successfully!');
      setLoading(false);
      handleAddDialogClose();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    }, 1000);
  };
  
  const handleUpdateProficiency = (id, newValue) => {
    setSkills(skills.map(skill => {
      if (skill.id === id) {
        return {
          ...skill,
          proficiency: newValue,
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }
      return skill;
    }));
  };
  
  const handleDeleteSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
    setSuccess('Skill removed successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccess(''), 3000);
  };
  
  const getProgressColor = (proficiency, goal) => {
    const ratio = proficiency / goal;
    if (ratio < 0.3) return 'error';
    if (ratio < 0.7) return 'warning';
    return 'success';
  };
  
  const filterSkillsByCategory = (category) => {
    if (activeTab === 0) return skills;
    return skills.filter(skill => {
      if (activeTab === 1) return skill.category === 'Technical';
      if (activeTab === 2) return skill.category === 'Soft Skills';
      return true;
    });
  };
  
  const skillCategories = [
    { value: 'Technical', label: 'Technical Skills' },
    { value: 'Soft Skills', label: 'Soft Skills' },
    { value: 'Domain Knowledge', label: 'Domain Knowledge' },
    { value: 'Tools & Software', label: 'Tools & Software' },
    { value: 'Languages', label: 'Languages' },
  ];
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            <TrackChanges color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
            Skill Development Tracker
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddDialogOpen}
          >
            Add New Skill
          </Button>
        </Box>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Track your progress in developing critical career skills, set goals, and monitor your growth over time.
        </Typography>
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}
      </Paper>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="skill categories tabs"
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Skills" />
          <Tab label="Technical Skills" />
          <Tab label="Soft Skills" />
        </Tabs>
        
        {loading && skills.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Loading your skills...
            </Typography>
          </Box>
        ) : (
          <>
            {filterSkillsByCategory().length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No skills found in this category. Add a new skill to get started.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Add />}
                  sx={{ mt: 2 }}
                  onClick={handleAddDialogOpen}
                >
                  Add Skill
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {filterSkillsByCategory().map((skill) => (
                  <Grid item xs={12} sm={6} md={4} key={skill.id}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="h6" component="h2" gutterBottom>
                            {skill.name}
                          </Typography>
                          <Chip
                            label={skill.category}
                            size="small"
                            color={skill.category === 'Technical' ? 'primary' : 'secondary'}
                            variant="outlined"
                          />
                        </Box>
                        
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Current Proficiency:
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Rating
                              value={skill.proficiency}
                              onChange={(event, newValue) => {
                                handleUpdateProficiency(skill.id, newValue);
                              }}
                              precision={1}
                              max={5}
                              emptyIcon={<StarBorder fontSize="inherit" />}
                            />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              {skill.proficiency}/5
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Goal: {skill.goal}/5
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={(skill.proficiency / skill.goal) * 100}
                            color={getProgressColor(skill.proficiency, skill.goal)}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                        
                        {skill.notes && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Notes:
                            </Typography>
                            <Typography variant="body2">
                              {skill.notes}
                            </Typography>
                          </Box>
                        )}
                        
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" color="text.secondary">
                            Last updated: {skill.lastUpdated}
                          </Typography>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteSkill(skill.id)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Paper>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          <BarChart color="primary" sx={{ mr: 1, verticalAlign: 'middle' }} />
          Skill Development Insights
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Track your progress over time and identify areas for improvement.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Skill Distribution
                </Typography>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Skill distribution chart will appear here
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Progress Over Time
                </Typography>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Progress chart will appear here
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Add Skill Dialog */}
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Add a new skill to track your progress and set development goals.
          </DialogContentText>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            autoFocus
            margin="dense"
            label="Skill Name"
            fullWidth
            variant="outlined"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            required
            sx={{ mb: 2 }}
          />
          
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              label="Category"
              required
            >
              {skillCategories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Current Proficiency (1-5)
            </Typography>
            <Rating
              value={newSkill.proficiency}
              onChange={(event, newValue) => {
                setNewSkill({ ...newSkill, proficiency: newValue });
              }}
              precision={1}
              max={5}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Goal Proficiency (1-5)
            </Typography>
            <Rating
              value={newSkill.goal}
              onChange={(event, newValue) => {
                setNewSkill({ ...newSkill, goal: newValue });
              }}
              precision={1}
              max={5}
            />
          </Box>
          
          <TextField
            margin="dense"
            label="Notes"
            fullWidth
            variant="outlined"
            value={newSkill.notes}
            onChange={(e) => setNewSkill({ ...newSkill, notes: e.target.value })}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleAddSkill} variant="contained" color="primary">
            Add Skill
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SkillTracker;