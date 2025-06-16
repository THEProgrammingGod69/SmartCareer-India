/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Box, Button, Container, Grid, Paper, TextField, Typography, Divider, Chip, Avatar, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import { useAuth } from '../../contexts/AuthContext';

const DEFAULT_PROFILE_PIC = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; // fallback image

// Mock AI summary generator (replace with real service call)
const generateAISummary = async (resumeData) => {
  return `Experienced professional with a strong background in ${resumeData.skills.join(', ')}. Passionate about ${resumeData.targetRole} and committed to delivering results in dynamic environments.`;
};

const defaultResume = {
  name: 'Your Name',
  email: 'your.email@example.com',
  phone: '123-456-7890',
  targetRole: 'Data Scientist',
  summary: '',
  profileImage: null, // Custom profile image
  education: [
    { degree: 'B.Tech. in Computer Science', institution: 'ABC University', year: '2022' }
  ],
  experience: [
    { title: 'Intern', company: 'Tech Solutions', year: '2021', description: 'Worked on data analysis and visualization projects.' }
  ],
  skills: ['Python', 'Machine Learning', 'Data Analysis'],
  projects: [
    { name: 'Smart Career App', description: 'Built a React app for career planning.' }
  ]
};

const SmartResumeBuilder = () => {
  const [resume, setResume] = useState(defaultResume);
  const [loading, setLoading] = useState(false);
  const resumeRef = useRef();
  const fileInputRef = useRef();
  const { currentUser } = useAuth();

  const handleChange = (field, value) => {
    setResume(prev => ({ ...prev, [field]: value }));
  };

  const handleSummaryAI = async () => {
    setLoading(true);
    const summary = await generateAISummary(resume);
    setResume(prev => ({ ...prev, summary }));
    setLoading(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setResume(prev => ({ ...prev, profileImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handlePrint = useReactToPrint({ content: () => resumeRef.current });

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Smart Resume Builder
      </Typography>
      <Typography align="center" color="text.secondary" sx={{ mb: 4 }}>
        Build your professional resume with AI-powered suggestions. Edit, preview, and export your resume easily.
      </Typography>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="subtitle1" gutterBottom>Profile Photo</Typography>
            <Box sx={{ position: 'relative', mb: 2 }}>
              <Avatar
                src={resume.profileImage || currentUser?.photoURL || DEFAULT_PROFILE_PIC}
                alt="Profile"
                sx={{ width: 100, height: 100, mb: 1 }}
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <IconButton 
                color="primary" 
                aria-label="upload picture" 
                component="span" 
                onClick={triggerFileInput}
                sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: 'background.paper' }}
              >
                <PhotoCamera />
              </IconButton>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Click the camera icon to upload a custom profile photo
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Full Name" fullWidth value={resume.name} onChange={e => handleChange('name', e.target.value)} sx={{ mb: 2 }} />
            <TextField label="Email" fullWidth value={resume.email} onChange={e => handleChange('email', e.target.value)} sx={{ mb: 2 }} />
            <TextField label="Phone" fullWidth value={resume.phone} onChange={e => handleChange('phone', e.target.value)} sx={{ mb: 2 }} />
            <TextField label="Target Role" fullWidth value={resume.targetRole} onChange={e => handleChange('targetRole', e.target.value)} sx={{ mb: 2 }} />
            <TextField label="Skills (comma separated)" fullWidth value={resume.skills.join(', ')} onChange={e => handleChange('skills', e.target.value.split(',').map(s => s.trim()))} sx={{ mb: 2 }} />
            <Button variant="contained" onClick={handleSummaryAI} disabled={loading} sx={{ mt: 2 }}>
              {loading ? 'Generating...' : 'Generate AI Summary'}
            </Button>
            <TextField label="Professional Summary" fullWidth multiline minRows={3} value={resume.summary} onChange={e => handleChange('summary', e.target.value)} sx={{ mt: 2 }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Education</Typography>
            {resume.education.map((edu, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <TextField label="Degree" value={edu.degree} onChange={e => {
                  const updated = [...resume.education];
                  updated[i].degree = e.target.value;
                  handleChange('education', updated);
                }} sx={{ mr: 1 }} />
                <TextField label="Institution" value={edu.institution} onChange={e => {
                  const updated = [...resume.education];
                  updated[i].institution = e.target.value;
                  handleChange('education', updated);
                }} sx={{ mr: 1 }} />
                <TextField label="Year" value={edu.year} onChange={e => {
                  const updated = [...resume.education];
                  updated[i].year = e.target.value;
                  handleChange('education', updated);
                }} sx={{ width: 80 }} />
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Experience</Typography>
            {resume.experience.map((exp, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <TextField label="Title" value={exp.title} onChange={e => {
                  const updated = [...resume.experience];
                  updated[i].title = e.target.value;
                  handleChange('experience', updated);
                }} sx={{ mr: 1 }} />
                <TextField label="Company" value={exp.company} onChange={e => {
                  const updated = [...resume.experience];
                  updated[i].company = e.target.value;
                  handleChange('experience', updated);
                }} sx={{ mr: 1 }} />
                <TextField label="Year" value={exp.year} onChange={e => {
                  const updated = [...resume.experience];
                  updated[i].year = e.target.value;
                  handleChange('experience', updated);
                }} sx={{ width: 80 }} />
                <TextField label="Description" value={exp.description} onChange={e => {
                  const updated = [...resume.experience];
                  updated[i].description = e.target.value;
                  handleChange('experience', updated);
                }} sx={{ width: '100%', mt: 1 }} />
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Projects</Typography>
            {resume.projects.map((proj, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <TextField label="Project Name" value={proj.name} onChange={e => {
                  const updated = [...resume.projects];
                  updated[i].name = e.target.value;
                  handleChange('projects', updated);
                }} sx={{ mr: 1 }} />
                <TextField label="Description" value={proj.description} onChange={e => {
                  const updated = [...resume.projects];
                  updated[i].description = e.target.value;
                  handleChange('projects', updated);
                }} sx={{ width: '60%' }} />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Button variant="outlined" onClick={handlePrint}>
          Export as PDF
        </Button>
      </Box>
      <Paper ref={resumeRef} sx={{ p: 0, mb: 4, background: '#f9f9f9', color: '#222', borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
        <Grid container>
          {/* Left Sidebar */}
          <Grid item xs={12} sm={4} sx={{ background: '#183153', color: '#fff', p: 3, minHeight: 500 }}>
            {/* Profile Photo */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Avatar
                src={resume.profileImage || currentUser?.photoURL || DEFAULT_PROFILE_PIC}
                alt="Profile"
                sx={{ width: 90, height: 90, border: '3px solid #90caf9', mb: 1 }}
              />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', letterSpacing: 1, mb: 2, color: '#90caf9' }}>
              CONTACT
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <span style={{ marginRight: 8 }}>📧</span>
                <Typography variant="body2">{resume.email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <span style={{ marginRight: 8 }}>📞</span>
                <Typography variant="body2">{resume.phone}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <span style={{ marginRight: 8 }}>🎯</span>
                <Typography variant="body2">{resume.targetRole}</Typography>
              </Box>
            </Box>
            <Divider sx={{ bgcolor: '#90caf9', my: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', letterSpacing: 1, mb: 2, color: '#90caf9' }}>
              KEY SKILLS
            </Typography>
            <Box component="ul" sx={{ pl: 2, mb: 2 }}>
              {resume.skills.map((skill, i) => (
                <li key={i} style={{ color: '#fff', marginBottom: 4, fontSize: 15 }}>{skill}</li>
              ))}
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} sm={8} sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#183153', letterSpacing: 2, mb: 0 }}>
              {resume.name}
            </Typography>
            <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 500, mb: 2 }}>
              {resume.targetRole}
            </Typography>
            <Divider sx={{ mb: 2, bgcolor: '#1976d2' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1, letterSpacing: 1 }}>
              PROFESSIONAL SUMMARY
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {resume.summary}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1, letterSpacing: 1 }}>
              EXPERIENCE
            </Typography>
            {resume.experience.map((exp, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <Typography variant="body1" fontWeight="bold">
                  {exp.title} at {exp.company} ({exp.year})
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {exp.description}
                </Typography>
              </Box>
            ))}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1, mt: 2, letterSpacing: 1 }}>
              EDUCATION
            </Typography>
            {resume.education.map((edu, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <Typography variant="body1">
                  {edu.degree}, {edu.institution} ({edu.year})
                </Typography>
              </Box>
            ))}
            {resume.projects && resume.projects.length > 0 && (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1, mt: 2, letterSpacing: 1 }}>
                  PROJECTS
                </Typography>
                {resume.projects.map((proj, i) => (
                  <Box key={i} sx={{ mb: 1 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {proj.name}
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {proj.description}
                    </Typography>
                  </Box>
                ))}
              </>
            )}
            {resume.certifications && resume.certifications.length > 0 && (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1, mt: 2, letterSpacing: 1 }}>
                  CERTIFICATIONS
                </Typography>
                {resume.certifications.map((cert, i) => (
                  <Box key={i} sx={{ mb: 1 }}>
                    <Typography variant="body1">
                      {cert}
                    </Typography>
                  </Box>
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SmartResumeBuilder;
