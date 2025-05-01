import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
} from '@mui/icons-material';

// Sample career trends data - in a real app, this would come from an API
const sampleTrends = {
  emergingCareers: [
    {
      title: 'AI Ethics Specialist',
      growth: 'High',
      description: 'Professionals who ensure AI systems are developed and deployed ethically and responsibly.',
      averageSalary: '₹12,00,000 - ₹20,00,000',
      demandLevel: 'Emerging',
    },
    {
      title: 'Cybersecurity Analyst',
      growth: 'High',
      description: 'Experts who protect systems and networks from digital attacks and security breaches.',
      averageSalary: '₹8,00,000 - ₹25,00,000',
      demandLevel: 'Very High',
    },
    {
      title: 'Remote Work Coordinator',
      growth: 'Medium',
      description: 'Professionals who manage remote work policies, tools, and team coordination.',
      averageSalary: '₹6,00,000 - ₹12,00,000',
      demandLevel: 'Growing',
    },
    {
      title: 'Sustainability Manager',
      growth: 'Medium',
      description: 'Experts who develop and implement sustainable business practices and initiatives.',
      averageSalary: '₹8,00,000 - ₹18,00,000',
      demandLevel: 'Growing',
    },
  ],
  industryGrowth: [
    { industry: 'Information Technology', growthRate: 14.5, outlook: 'Positive' },
    { industry: 'Healthcare', growthRate: 12.8, outlook: 'Positive' },
    { industry: 'Renewable Energy', growthRate: 10.2, outlook: 'Positive' },
    { industry: 'E-commerce', growthRate: 15.7, outlook: 'Positive' },
    { industry: 'Education Technology', growthRate: 16.3, outlook: 'Positive' },
    { industry: 'Manufacturing', growthRate: 3.2, outlook: 'Stable' },
    { industry: 'Retail (Traditional)', growthRate: -2.5, outlook: 'Declining' },
    { industry: 'Hospitality', growthRate: 5.8, outlook: 'Recovering' },
  ],
  skillsInDemand: [
    { skill: 'Artificial Intelligence/Machine Learning', demandLevel: 'Very High', trend: 'Increasing' },
    { skill: 'Data Analysis', demandLevel: 'High', trend: 'Increasing' },
    { skill: 'Cloud Computing', demandLevel: 'High', trend: 'Increasing' },
    { skill: 'Digital Marketing', demandLevel: 'High', trend: 'Stable' },
    { skill: 'UX/UI Design', demandLevel: 'Medium', trend: 'Increasing' },
    { skill: 'Cybersecurity', demandLevel: 'Very High', trend: 'Increasing' },
    { skill: 'Project Management', demandLevel: 'Medium', trend: 'Stable' },
    { skill: 'Blockchain', demandLevel: 'Medium', trend: 'Increasing' },
  ],
  salaryTrends: [
    { role: 'Software Developer', avgSalaryRange: '₹6,00,000 - ₹20,00,000', yearlyGrowth: '8-10%' },
    { role: 'Data Scientist', avgSalaryRange: '₹8,00,000 - ₹25,00,000', yearlyGrowth: '12-15%' },
    { role: 'Digital Marketing Manager', avgSalaryRange: '₹7,00,000 - ₹18,00,000', yearlyGrowth: '7-9%' },
    { role: 'UX Designer', avgSalaryRange: '₹6,00,000 - ₹18,00,000', yearlyGrowth: '10-12%' },
    { role: 'Product Manager', avgSalaryRange: '₹12,00,000 - ₹30,00,000', yearlyGrowth: '10-14%' },
    { role: 'Cybersecurity Specialist', avgSalaryRange: '₹8,00,000 - ₹25,00,000', yearlyGrowth: '15-18%' },
  ],
};

const CareerTrends = () => {
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch data from an API
    const fetchTrends = async () => {
      try {
        // Simulate API call delay
        setTimeout(() => {
          setTrends(sampleTrends);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching trends:', error);
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  const getTrendIcon = (trend) => {
    if (trend === 'Increasing' || trend === 'Positive') {
      return <TrendingUpIcon color="success" />;
    } else if (trend === 'Declining' || trend === 'Negative') {
      return <TrendingDownIcon color="error" />;
    } else {
      return <TrendingFlatIcon color="action" />;
    }
  };

  const getGrowthColor = (growth) => {
    if (growth > 10) return 'success.main';
    if (growth > 5) return 'info.main';
    if (growth > 0) return 'text.primary';
    return 'error.main';
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Career Trends & Insights
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Stay updated with the latest career trends, salary insights, and job market demands in India.
        </Typography>
      </Paper>

      {/* Emerging Careers Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Emerging Careers in 2023
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          {trends.emergingCareers.map((career, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {career.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Chip 
                      label={`Growth: ${career.growth}`} 
                      color={career.growth === 'High' ? 'success' : 'primary'}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      label={career.demandLevel} 
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {career.description}
                  </Typography>
                  
                  <Typography variant="subtitle2">
                    Average Salary:
                  </Typography>
                  <Typography variant="body2" color="text.primary" gutterBottom>
                    {career.averageSalary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Industry Growth Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Industry Growth Rates
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="subtitle1">Industry</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Growth Rate</Typography></TableCell>
                <TableCell><Typography variant="subtitle1">Outlook</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trends.industryGrowth.map((industry, index) => (
                <TableRow key={index}>
                  <TableCell>{industry.industry}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography 
                        variant="body2" 
                        color={getGrowthColor(industry.growthRate)}
                        sx={{ mr: 1 }}
                      >
                        {industry.growthRate}%
                      </Typography>
                      {getTrendIcon(industry.outlook)}
                    </Box>
                  </TableCell>
                  <TableCell>{industry.outlook}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Skills in Demand Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Skills in High Demand
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="subtitle2">Skill</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2">Demand Level</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2">Trend</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trends.skillsInDemand.map((skill, index) => (
                    <TableRow key={index}>
                      <TableCell>{skill.skill}</TableCell>
                      <TableCell>{skill.demandLevel}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {skill.trend}
                          {getTrendIcon(skill.trend)}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Salary Trends
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="subtitle2">Role</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2">Salary Range</Typography></TableCell>
                    <TableCell><Typography variant="subtitle2">Yearly Growth</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trends.salaryTrends.map((salary, index) => (
                    <TableRow key={index}>
                      <TableCell>{salary.role}</TableCell>
                      <TableCell>{salary.avgSalaryRange}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {salary.yearlyGrowth}
                          <TrendingUpIcon color="success" sx={{ ml: 1, fontSize: 18 }} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CareerTrends;