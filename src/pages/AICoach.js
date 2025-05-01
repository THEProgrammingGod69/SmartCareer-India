import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Alert,
  Snackbar,
  Chip,
  Switch,
  FormControlLabel,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Send as SendIcon,
  Psychology as PsychologyIcon,
  Person as PersonIcon,
  Star as StarIcon,
  Info as InfoIcon,
  Upgrade as UpgradeIcon,
} from '@mui/icons-material';
import geminiService from '../services/geminiService';
import llamaService from '../services/llamaService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Sample predefined responses - in a real app, this would be handled by an actual AI service
const sampleResponses = {
  greeting: [
    "Hello! I'm your AI Career Coach. How can I help with your career journey today?",
    "Welcome to CareerSmart! I'm here to provide career guidance and advice. What would you like to know?",
  ],
  resume: [
    "For a standout resume, focus on quantifiable achievements rather than just listing responsibilities. Use action verbs and tailor your resume for each job application. Would you like specific tips for your industry?",
    "When creating your resume, highlight your relevant skills and experiences. Keep it concise (1-2 pages), use a clean format, and proofread carefully. Would you like me to suggest some resume templates?",
  ],
  interview: [
    "Prepare for interviews by researching the company, practicing common questions, and preparing examples that showcase your skills. Remember to also prepare questions to ask the interviewer. Would you like some common interview questions for practice?",
    "Interview success comes from preparation. Study the job description, practice your responses, and prepare stories that demonstrate your abilities. Also, dress professionally and arrive early. Would you like tips for virtual interviews?",
  ],
  skills: [
    "In today's job market, employers value both technical and soft skills. Technical skills like data analysis, programming, and digital marketing are in demand, while soft skills like communication, adaptability, and problem-solving are equally important. Which area would you like to develop?",
    "To stay competitive, consider developing skills in emerging technologies, data literacy, and digital collaboration. Don't forget about critical thinking, emotional intelligence, and creativity. Would you like suggestions for online courses?",
  ],
  career_change: [
    "Changing careers is a significant step. Start by identifying transferable skills, researching new industries, and possibly acquiring new qualifications. Networking and informational interviews can also provide valuable insights. What field are you considering moving into?",
    "When transitioning to a new career, highlight your transferable skills and demonstrate your passion for the new field. Consider starting with a transitional role that bridges your experience with your new interests. What's motivating your career change?",
  ],
  default: [
    "That's an interesting question. While I don't have specific information on that topic, I'd recommend researching industry reports, networking with professionals in your field, or consulting with a career counselor for more personalized advice.",
    "I appreciate your question. To give you the most accurate guidance, I'd suggest exploring professional associations in your field, industry publications, or specialized career resources that focus on your specific area of interest.",
  ],
};

const getAIResponse = (message) => {
  // In a real app, this would call an actual AI service
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return sampleResponses.greeting[Math.floor(Math.random() * sampleResponses.greeting.length)];
  } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
    return sampleResponses.resume[Math.floor(Math.random() * sampleResponses.resume.length)];
  } else if (lowerMessage.includes('interview')) {
    return sampleResponses.interview[Math.floor(Math.random() * sampleResponses.interview.length)];
  } else if (lowerMessage.includes('skill')) {
    return sampleResponses.skills[Math.floor(Math.random() * sampleResponses.skills.length)];
  } else if (lowerMessage.includes('change career') || lowerMessage.includes('switch job') || lowerMessage.includes('new field')) {
    return sampleResponses.career_change[Math.floor(Math.random() * sampleResponses.career_change.length)];
  } else {
    return sampleResponses.default[Math.floor(Math.random() * sampleResponses.default.length)];
  }
};

const AICoach = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useLlama, setUseLlama] = useState(true); // Default to Llama for premium users
  const [modelInfo, setModelInfo] = useState(null);
  const messagesEndRef = useRef(null);
  const { currentUser, userRoles } = useAuth();
  const navigate = useNavigate();
  
  // Check if user has premium access
  const isPremium = userRoles.isPremium;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Get model info
    if (isPremium) {
      setModelInfo(llamaService.getModelInfo());
    }
    
    // Add initial greeting message
    setTimeout(() => {
      const initialMessage = isPremium ?
        `Hello ${currentUser?.displayName || 'there'}! I'm your AI Career Coach powered by Llama 4 Maverick. How can I assist with your career journey today?` :
        sampleResponses.greeting[0];
        
      setMessages([{
        text: initialMessage,
        sender: 'ai',
        timestamp: new Date(),
        model: isPremium ? 'llama' : 'gemini'
      }]);
    }, 1000);
  }, [isPremium, currentUser]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      let response;
      let model = 'gemini';
      
      // Use Llama 4 for premium users who have selected it
      if (isPremium && useLlama) {
        // Get user profile data for personalized responses
        const userProfile = {
          displayName: currentUser?.displayName || '',
          email: currentUser?.email || '',
          // Add more profile data as needed
          skills: ['JavaScript', 'React', 'Node.js'], // Placeholder - would come from user profile
          interests: ['Web Development', 'Data Science'] // Placeholder - would come from user profile
        };
        
        // Get conversation history for context
        const conversationHistory = messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));
        
        response = await llamaService.generateResponse(input, conversationHistory, userProfile);
        model = 'llama';
      } else {
        // Use Gemini for non-premium users
        response = await geminiService.generateCareerAdvice(input);
      }
      
      const aiResponse = {
        text: response,
        sender: 'ai',
        timestamp: new Date(),
        model: model
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse = {
        text: 'I apologize, but I encountered an error. Please try again later.',
        sender: 'ai',
        timestamp: new Date(),
        model: isPremium && useLlama ? 'llama' : 'gemini'
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">
            AI Career Coach
            {isPremium && (
              <Tooltip title="Premium AI Model">
                <Chip 
                  icon={<StarIcon />} 
                  label="Llama 4 Maverick" 
                  color="primary" 
                  size="small" 
                  sx={{ ml: 2 }} 
                />
              </Tooltip>
            )}
          </Typography>
          
          {isPremium && modelInfo && (
            <FormControlLabel
              control={
                <Switch
                  checked={useLlama}
                  onChange={(e) => setUseLlama(e.target.checked)}
                  color="primary"
                />
              }
              label={useLlama ? "Using Llama 4 Maverick" : "Using Gemini"}
            />
          )}
          
          {!isPremium && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<UpgradeIcon />}
              onClick={() => navigate('/premium-features')}
            >
              Upgrade for Llama 4
            </Button>
          )}
        </Box>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Chat with our AI coach for personalized career advice, resume tips, and interview preparation.
          {isPremium && useLlama && (
            <Tooltip title="Llama 4 Maverick Features">
              <IconButton size="small" sx={{ ml: 1 }}>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        
        {isPremium && modelInfo && (
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Llama 4 Maverick Capabilities:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {modelInfo.capabilities.map((capability, index) => (
                <Chip key={index} label={capability} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        )}
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={3} 
            sx={{ 
              height: '70vh', 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6">
                Career Coach Chat
              </Typography>
            </Box>
            
            <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              {messages.map((message, index) => (
                <ListItem 
                  key={index} 
                  alignItems="flex-start"
                  sx={{
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                      alignItems: 'flex-start',
                      maxWidth: '80%',
                    }}
                  >
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: message.sender === 'user' ? 'secondary.main' : 'primary.main',
                          width: 32,
                          height: 32,
                        }}
                      >
                        {message.sender === 'user' ? 
                          <PersonIcon fontSize="small" /> : 
                          (message.model === 'llama' ? <StarIcon fontSize="small" /> : <PsychologyIcon fontSize="small" />)
                        }
                      </Avatar>
                    </ListItemAvatar>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        p: 2, 
                        bgcolor: message.sender === 'user' ? 'secondary.light' : 'grey.100',
                        borderRadius: 2,
                      }}
                    >
                      <ListItemText 
                        primary={message.text} 
                        secondary={new Date(message.timestamp).toLocaleTimeString()} 
                        primaryTypographyProps={{
                          color: message.sender === 'user' ? 'white' : 'text.primary',
                        }}
                        secondaryTypographyProps={{
                          color: message.sender === 'user' ? 'white' : 'text.secondary',
                          fontSize: '0.75rem',
                        }}
                      />
                    </Paper>
                  </Box>
                </ListItem>
              ))}
              {isTyping && (
                <ListItem alignItems="flex-start">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main',
                          width: 32,
                          height: 32,
                        }}
                      >
                        <PsychologyIcon fontSize="small" />
                      </Avatar>
                    </ListItemAvatar>
                    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress size={20} thickness={5} sx={{ mr: 1 }} />
                        <Typography variant="body2">Typing...</Typography>
                      </Box>
                    </Paper>
                  </Box>
                </ListItem>
              )}
              <div ref={messagesEndRef} />
            </List>
            
            <Divider />
            
            <Box sx={{ p: 2, display: 'flex' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                multiline
                maxRows={3}
                sx={{ mr: 1 }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                endIcon={<SendIcon />}
                onClick={handleSend}
                disabled={isTyping || input.trim() === ''}
              >
                Send
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Suggested Topics
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Try asking about:
              </Typography>
              <List dense>
                <ListItem button onClick={() => setInput('How can I improve my resume?')}>
                  <ListItemText primary="Resume tips" />
                </ListItem>
                <ListItem button onClick={() => setInput('What are the most in-demand skills right now?')}>
                  <ListItemText primary="In-demand skills" />
                </ListItem>
                <ListItem button onClick={() => setInput('How should I prepare for job interviews?')}>
                  <ListItemText primary="Interview preparation" />
                </ListItem>
                <ListItem button onClick={() => setInput('I want to change my career path. What should I consider?')}>
                  <ListItemText primary="Career transition advice" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About AI Coach
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Our AI Career Coach provides personalized guidance based on current industry trends and best practices. While it offers valuable insights, consider supplementing this advice with research and professional consultation for important career decisions.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AICoach;