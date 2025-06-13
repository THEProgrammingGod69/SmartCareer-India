import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Slider,
  Rating,
  Alert,
  LinearProgress,
  Divider,
  Button,
  Stack,
} from '@mui/material';
import {
  TrendingUp,
  Warning,
  AttachMoney,
  Timer,
  Psychology,
  Work,
  Check,
  Chat,
  SupportAgent,
  Assessment,
  Visibility,
  School,
  TrackChanges,
  Description,
  SwapHoriz,
  Announcement,
  Balance,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { sampleCareers } from '../ExploreCareer_fixed';

const riskFactors = {
  marketDemand: {
    name: 'Market Demand',
    description: 'Current and projected job market demand',
    icon: <TrendingUp />
  },
  jobSecurity: {
    name: 'Job Security',
    description: 'Stability and long-term prospects',
    icon: <Work />
  },
  competitionLevel: {
    name: 'Competition Level',
    description: 'Level of competition in the field',
    icon: <Psychology />
  },
  entryBarrier: {
    name: 'Entry Barrier',
    description: 'Required education, certifications, and experience',
    icon: <Timer />
  },
  financialInvestment: {
    name: 'Financial Investment',
    description: 'Required investment in education and training',
    icon: <AttachMoney />
  }
};

const rewardFactors = {
  salary: {
    name: 'Salary Potential',
    description: 'Expected salary range and growth',
    icon: <AttachMoney />
  },
  growth: {
    name: 'Career Growth',
    description: 'Opportunities for advancement',
    icon: <TrendingUp />
  },
  workLife: {
    name: 'Work-Life Balance',
    description: 'Balance between work and personal life',
    icon: <Psychology />
  },
  satisfaction: {
    name: 'Job Satisfaction',
    description: 'Personal fulfillment and satisfaction',
    icon: <Work />
  },
  impact: {
    name: 'Social Impact',
    description: 'Potential to make a positive impact',
    icon: <Psychology />
  }
};

const calculateRiskScore = (career, weights = {}) => {
  let score = 0;
  let totalWeight = 0;
  
  // Market demand (inverse relationship)
  const demandWeight = weights.marketDemand || 1;
  if (career.growth === 'High') score += 1 * demandWeight;
  else if (career.growth === 'Medium') score += 2 * demandWeight;
  else score += 3 * demandWeight;
  totalWeight += demandWeight;
  
  // Required education
  const eduWeight = weights.entryBarrier || 1;
  if (career.education.includes('Master') || career.education.includes('PhD')) score += 2 * eduWeight;
  if (career.education.includes('certification')) score += 1 * eduWeight;
  totalWeight += eduWeight;
  
  // Competition level based on popularity
  const compWeight = weights.competitionLevel || 1;
  const popularCareers = ['Software Engineer', 'Data Scientist', 'Product Manager'];
  if (popularCareers.includes(career.title)) score += 2 * compWeight;
  totalWeight += compWeight;
  
  // Industry volatility
  const volatilityWeight = weights.jobSecurity || 1;
  const volatileIndustries = ['Cryptocurrency', 'Startup', 'Gaming'];
  if (career.industry && volatileIndustries.includes(career.industry)) score += 2 * volatilityWeight;
  totalWeight += volatilityWeight;
  
  return Math.min(5, Math.max(1, (score / totalWeight)));
};

const calculateRewardScore = (career, weights = {}) => {
  let score = 0;
  let totalWeight = 0;
  
  // Salary potential
  const salaryWeight = weights.salary || 1;
  const salaryRange = career.salary.match(/\d+,\d+,\d+/g);
  if (salaryRange) {
    const maxSalary = parseInt(salaryRange[salaryRange.length - 1].replace(/,/g, ''));
    if (maxSalary > 2000000) score += 3 * salaryWeight;
    else if (maxSalary > 1000000) score += 2 * salaryWeight;
    else score += 1 * salaryWeight;
  }
  totalWeight += salaryWeight;
  
  // Growth opportunities
  const growthWeight = weights.growth || 1;
  if (career.growth === 'High') score += 2 * growthWeight;
  else if (career.growth === 'Medium') score += 1 * growthWeight;
  totalWeight += growthWeight;
  
  // Work-life balance (based on average working hours if available)
  const wlbWeight = weights.workLife || 1;
  if (career.workingHours) {
    if (career.workingHours <= 40) score += 2 * wlbWeight;
    else if (career.workingHours <= 50) score += 1 * wlbWeight;
  }
  totalWeight += wlbWeight;
  
  return Math.min(5, Math.max(1, (score / totalWeight)));
};

const RiskvsReward = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [careerAnalysis, setCareerAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weights, setWeights] = useState({
    risk: {
      marketDemand: 1,
      jobSecurity: 1,
      competitionLevel: 1,
      entryBarrier: 1,
      financialInvestment: 1
    },
    reward: {
      salary: 1,
      growth: 1,
      workLife: 1,
      satisfaction: 1,
      impact: 1
    }
  });
  const [selectedFactors, setSelectedFactors] = useState({
    risk: Object.keys(riskFactors),
    reward: Object.keys(rewardFactors)
  });

  const premiumFeatures = [
    {
      category: "AI Career Tools",
      features: [
        { title: "AI Career Coach", icon: <Chat />, path: "/ai-coach" },
        { title: "Ask Professional", icon: <SupportAgent />, path: "/premium/ask-professional" },
      ]
    },
    {
      category: "Advanced Analysis",
      features: [
        { title: "Risk vs Reward", icon: <Assessment />, path: "/premium/risk-vs-reward", active: true },
        { title: "Career Simulation", icon: <Visibility />, path: "/premium/career-simulation" },
        { title: "Cognitive Fit", icon: <Psychology />, path: "/premium/cognitive-fit" },
        { title: "Burnout Prediction", icon: <Balance />, path: "/premium/burnout-prediction" },
      ]
    },
    {
      category: "Career Development",
      features: [
        { title: "Smart Resume Builder", icon: <Description />, path: "/premium/smart-resume-builder" },
        { title: "Career Switching", icon: <SwapHoriz />, path: "/premium/career-switching" },
        { title: "Career Challenges", icon: <Announcement />, path: "/premium/career-challenges" },
      ]
    },
    {
      category: "Learning & Progress",
      features: [
        { title: "Learning Path", icon: <School />, path: "/learning-path" },
        { title: "Skill Tracker", icon: <TrackChanges />, path: "/skill-tracker" },
      ]
    },
  ];

  useEffect(() => {
    const analyzeRiskReward = () => {
      const analysis = sampleCareers.map(career => ({
        ...career,
        riskScore: calculateRiskScore(career, weights.risk),
        rewardScore: calculateRewardScore(career, weights.reward),
        riskFactors: {
          marketDemand: career.growth === 'High' ? 2 : career.growth === 'Medium' ? 3 : 4,
          jobSecurity: career.growth === 'High' ? 4 : 3,
          competitionLevel: career.popularity || 3,
          entryBarrier: career.education.includes('Master') ? 4 : 3,
          financialInvestment: career.education.includes('Master') ? 4 : 2
        },
        rewardFactors: {
          salary: calculateRewardScore(career, { salary: 1 }),
          growth: career.growth === 'High' ? 5 : career.growth === 'Medium' ? 3 : 2,
          workLife: career.workingHours ? (career.workingHours <= 40 ? 5 : 3) : 3,
          satisfaction: career.satisfaction || 4,
          impact: career.impact || 4
        }
      }));
      
      setCareerAnalysis(analysis.sort((a, b) => b.rewardScore - a.riskScore));
      setLoading(false);
    };

    analyzeRiskReward();
  }, [weights]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 8 }}>
          <LinearProgress sx={{ width: '200px', mb: 3 }} />
          <Typography variant="h5">
            Analyzing career risks and rewards...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Premium Features Navigation
          </Typography>
          {premiumFeatures.map((category, idx) => (
            <Box key={idx} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
                {category.category}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {category.features.map((feature, featureIdx) => (
                  <Button
                    key={featureIdx}
                    variant={feature.active ? "contained" : "outlined"}
                    size="small"
                    startIcon={feature.icon}
                    onClick={() => navigate(feature.path)}
                    sx={{ mb: 1 }}
                  >
                    {feature.title}
                  </Button>
                ))}
              </Stack>
            </Box>
          ))}
        </Box>
        
        <Divider sx={{ my: 3 }} />

        <Typography variant="h4" component="h1" gutterBottom>
          Risk vs. Reward Analysis
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Evaluate and compare the risks and potential rewards of different career paths.
        </Typography>
        <Chip 
          color="primary" 
          icon={<Check />} 
          label="Premium Feature" 
          sx={{ mb: 2 }}
        />
      </Paper>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Customize Factor Weights
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Adjust the importance of different factors based on your preferences
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Risk Factors
            </Typography>
            {Object.entries(riskFactors).map(([key, { name, description }]) => (
              <Box key={key} sx={{ mb: 2 }}>
                <Typography variant="body2">
                  {name}
                  <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                    ({description})
                  </Typography>
                </Typography>
                <Slider
                  value={weights.risk[key]}
                  min={0}
                  max={2}
                  step={0.1}
                  marks={[
                    { value: 0, label: 'Less Important' },
                    { value: 1, label: 'Default' },
                    { value: 2, label: 'More Important' }
                  ]}
                  onChange={(e, newValue) => {
                    setWeights(prev => ({
                      ...prev,
                      risk: { ...prev.risk, [key]: newValue }
                    }));
                  }}
                />
              </Box>
            ))}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Reward Factors
            </Typography>
            {Object.entries(rewardFactors).map(([key, { name, description }]) => (
              <Box key={key} sx={{ mb: 2 }}>
                <Typography variant="body2">
                  {name}
                  <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                    ({description})
                  </Typography>
                </Typography>
                <Slider
                  value={weights.reward[key]}
                  min={0}
                  max={2}
                  step={0.1}
                  marks={[
                    { value: 0, label: 'Less Important' },
                    { value: 1, label: 'Default' },
                    { value: 2, label: 'More Important' }
                  ]}
                  onChange={(e, newValue) => {
                    setWeights(prev => ({
                      ...prev,
                      reward: { ...prev.reward, [key]: newValue }
                    }));
                  }}
                />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {careerAnalysis.map((career) => (
          <Grid item xs={12} key={career.title}>
            <Card>
              <CardContent>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {career.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {career.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Chip 
                      icon={<Warning />} 
                      label={`Risk Level: ${career.riskScore.toFixed(1)}/5`}
                      color={career.riskScore > 3 ? "error" : "default"}
                    />
                    <Chip 
                      icon={<TrendingUp />} 
                      label={`Reward Potential: ${career.rewardScore.toFixed(1)}/5`}
                      color={career.rewardScore > 3 ? "success" : "default"}
                    />
                    <Chip 
                      icon={<AttachMoney />} 
                      label={career.salary}
                    />
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Risk Factors
                    </Typography>
                    {Object.entries(riskFactors).map(([key, { name, description }]) => (
                      <Box key={key} sx={{ mb: 2 }}>
                        <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{name}</span>
                          <Typography component="span" color="text.secondary">
                            {career.riskFactors[key]}/5
                          </Typography>
                        </Typography>
                        <Rating
                          value={career.riskFactors[key]}
                          readOnly
                          max={5}
                        />
                      </Box>
                    ))}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Reward Factors
                    </Typography>
                    {Object.entries(rewardFactors).map(([key, { name, description }]) => (
                      <Box key={key} sx={{ mb: 2 }}>
                        <Typography variant="body2" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{name}</span>
                          <Typography component="span" color="text.secondary">
                            {career.rewardFactors[key]}/5
                          </Typography>
                        </Typography>
                        <Rating
                          value={career.rewardFactors[key]}
                          readOnly
                          max={5}
                        />
                      </Box>
                    ))}
                  </Grid>
                </Grid>

                {career.riskScore > 3 && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    This career path involves higher risks. Consider careful planning and preparation.
                    {career.riskFactors.marketDemand > 3 && " Market demand is challenging."}
                    {career.riskFactors.competitionLevel > 3 && " Competition is intense."}
                    {career.riskFactors.entryBarrier > 3 && " Entry requirements are significant."}
                  </Alert>
                )}

                {career.rewardScore > 4 && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    This career offers excellent reward potential with proper preparation and execution.
                    {career.rewardFactors.salary > 4 && " Salary potential is high."}
                    {career.rewardFactors.growth > 4 && " Growth opportunities are abundant."}
                    {career.rewardFactors.impact > 4 && " Potential for social impact is significant."}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RiskvsReward;