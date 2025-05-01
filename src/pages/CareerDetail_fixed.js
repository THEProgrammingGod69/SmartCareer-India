import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { expandedCareers } from '../data/expandedCareers';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import {
  WorkOutline,
  School,
  TrendingUp,
  CheckCircleOutline,
  ArrowBack,
  Business,
  LocationOn,
} from '@mui/icons-material';

// Sample career data - in a real app, this would come from an API based on the ID
// Combined with expanded careers data for comprehensive information
const sampleCareers = [
  // Original detailed careers
  {
    id: 1,
    title: 'Data Scientist',
    category: 'Technology',
    description: 'Data scientists analyze and interpret complex data to help organizations make better decisions. They use advanced analytics, machine learning, and statistical methods to extract insights from large datasets.',
    skills: ['Statistical Analysis', 'Machine Learning', 'Python', 'SQL', 'Data Visualization', 'Big Data Technologies'],
    education: [
      'Bachelor\'s in Computer Science, Statistics, or related field',
      'Master\'s degree preferred',
      'Certifications in data science or machine learning',
    ],
    salary: '₹8,00,000 - ₹25,00,000 per year',
    growth: 'High demand with 35% growth projected over the next 5 years',
    topCompanies: ['Amazon', 'Microsoft', 'Google', 'IBM', 'Infosys', 'TCS', 'Wipro'],
    jobDescription: [
      'Collect, analyze, and interpret large datasets',
      'Build predictive models using machine learning techniques',
      'Create data visualizations to communicate findings',
      'Collaborate with cross-functional teams to implement data-driven solutions',
      'Stay updated with the latest advancements in data science',
    ],
    careerPath: [
      { position: 'Junior Data Analyst', experience: '0-2 years', salary: '₹4,00,000 - ₹8,00,000' },
      { position: 'Data Scientist', experience: '2-5 years', salary: '₹8,00,000 - ₹15,00,000' },
      { position: 'Senior Data Scientist', experience: '5-8 years', salary: '₹15,00,000 - ₹25,00,000' },
      { position: 'Lead Data Scientist', experience: '8+ years', salary: '₹25,00,000 - ₹40,00,000' },
    ],
    locations: ['Bangalore', 'Hyderabad', 'Mumbai', 'Pune', 'Delhi NCR', 'Chennai'],
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    category: 'Design',
    description: 'UX/UI designers create user-friendly interfaces and enhance user experience for websites and applications. They focus on creating intuitive, accessible, and visually appealing digital products.',
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing', 'Adobe Creative Suite', 'Figma'],
    education: [
      'Bachelor\'s in Design, HCI, or related field',
      'UX certification courses',
      'Portfolio of design projects',
    ],
    salary: '₹6,00,000 - ₹18,00,000 per year',
    growth: 'Growing field with 24% increase in job openings',
    topCompanies: ['Flipkart', 'Swiggy', 'Zomato', 'MakeMyTrip', 'Paytm', 'Microsoft', 'Google'],
    jobDescription: [
      'Conduct user research and usability testing',
      'Create wireframes, prototypes, and mockups',
      'Design intuitive and accessible user interfaces',
      'Collaborate with developers to implement designs',
      'Iterate designs based on user feedback',
    ],
    careerPath: [
      { position: 'Junior UX/UI Designer', experience: '0-2 years', salary: '₹4,00,000 - ₹7,00,000' },
      { position: 'UX/UI Designer', experience: '2-5 years', salary: '₹7,00,000 - ₹12,00,000' },
      { position: 'Senior UX/UI Designer', experience: '5-8 years', salary: '₹12,00,000 - ₹18,00,000' },
      { position: 'UX/UI Design Lead', experience: '8+ years', salary: '₹18,00,000 - ₹30,00,000' },
    ],
    locations: ['Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad'],
  },
  {
    id: 3,
    title: 'Digital Marketing Specialist',
    category: 'Marketing',
    description: 'Digital marketers plan and execute online marketing strategies to promote products and services. They leverage various digital channels to reach target audiences and drive business growth.',
    skills: ['SEO/SEM', 'Social Media Marketing', 'Content Creation', 'Analytics', 'Email Marketing', 'PPC Advertising'],
    education: [
      'Bachelor\'s in Marketing, Communications, or related field',
      'Digital Marketing certifications',
      'Google Ads and Analytics certifications',
    ],
    salary: '₹5,00,000 - ₹15,00,000 per year',
    growth: 'Steady growth with increasing digital adoption in India',
    topCompanies: ['Unilever', 'Coca-Cola', 'Myntra', 'Nykaa', 'Byju\'s', 'OYO', 'Zomato'],
    jobDescription: [
      'Develop and implement digital marketing strategies',
      'Manage social media campaigns and content',
      'Optimize websites for search engines',
      'Analyze campaign performance and metrics',
      'Stay updated with digital marketing trends',
    ],
    careerPath: [
      { position: 'Digital Marketing Executive', experience: '0-2 years', salary: '₹3,00,000 - ₹6,00,000' },
      { position: 'Digital Marketing Specialist', experience: '2-5 years', salary: '₹6,00,000 - ₹10,00,000' },
      { position: 'Digital Marketing Manager', experience: '5-8 years', salary: '₹10,00,000 - ₹15,00,000' },
      { position: 'Digital Marketing Head', experience: '8+ years', salary: '₹15,00,000 - ₹25,00,000' },
    ],
    locations: ['Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'],
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    category: 'Technology',
    description: 'Full Stack Developers build and maintain both front-end and back-end components of web applications. They have expertise in multiple programming languages and frameworks.',
    skills: ['JavaScript', 'React', 'Node.js', 'Database Management', 'HTML/CSS', 'API Development', 'Git'],
    education: [
      'Bachelor\'s in Computer Science or related field',
      'Coding bootcamp certifications',
      'Portfolio of web development projects',
    ],
    salary: '₹7,00,000 - ₹20,00,000 per year',
    growth: 'High demand with continuous growth in tech industry',
    topCompanies: ['Amazon', 'Flipkart', 'Microsoft', 'Google', 'Infosys', 'TCS', 'Wipro'],
    jobDescription: [
      'Develop and maintain web applications',
      'Write clean, efficient, and maintainable code',
      'Implement responsive design and ensure cross-browser compatibility',
      'Optimize applications for maximum speed and scalability',
      'Collaborate with cross-functional teams',
    ],
    careerPath: [
      { position: 'Junior Developer', experience: '0-2 years', salary: '₹4,00,000 - ₹7,00,000' },
      { position: 'Full Stack Developer', experience: '2-5 years', salary: '₹7,00,000 - ₹12,00,000' },
      { position: 'Senior Developer', experience: '5-8 years', salary: '₹12,00,000 - ₹20,00,000' },
      { position: 'Tech Lead', experience: '8+ years', salary: '₹20,00,000 - ₹35,00,000' },
    ],
    locations: ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Delhi NCR', 'Chennai'],
  },
  {
    id: 11,
    title: 'Accountant',
    category: 'Finance',
    description: 'Accountants manage financial records, prepare tax reports, and ensure compliance with financial regulations. They play a crucial role in the financial health and legal compliance of organizations.',
    skills: ['Financial Reporting', 'Tax Preparation', 'Auditing', 'Bookkeeping', 'Financial Software', 'Regulatory Compliance'],
    education: [
      'Bachelor\'s in Accounting, Commerce, or related field',
      'CA (Chartered Accountant) certification preferred',
      'Additional certifications in specialized areas of accounting',
    ],
    salary: '₹5,00,000 - ₹15,00,000 per year',
    growth: 'Steady demand with consistent growth in all sectors',
    topCompanies: ['Deloitte', 'EY', 'KPMG', 'PwC', 'Infosys', 'TCS', 'Reliance'],
    jobDescription: [
      'Prepare and examine financial records and statements',
      'Ensure compliance with financial regulations and tax laws',
      'Analyze financial operations and recommend best practices',
      'Prepare tax returns and ensure timely payment',
      'Provide financial advice to management',
    ],
    careerPath: [
      { position: 'Junior Accountant', experience: '0-2 years', salary: '₹3,00,000 - ₹5,00,000' },
      { position: 'Accountant', experience: '2-5 years', salary: '₹5,00,000 - ₹8,00,000' },
      { position: 'Senior Accountant', experience: '5-8 years', salary: '₹8,00,000 - ₹15,00,000' },
      { position: 'Finance Manager', experience: '8+ years', salary: '₹15,00,000 - ₹25,00,000' },
    ],
    locations: ['Mumbai', 'Delhi NCR', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'],
  },
  {
    id: 13,
    title: 'Acupressure Therapist',
    category: 'Healthcare',
    description: 'Acupressure Therapists apply pressure to specific points on the body to relieve pain, reduce stress, and promote overall wellness. This traditional healing method is based on the concept of life energy flowing through meridians in the body.',
    skills: ['Pressure Point Therapy', 'Anatomy Knowledge', 'Patient Care', 'Holistic Healing', 'Assessment Techniques', 'Therapeutic Communication'],
    education: [
      'Diploma or Certification in Acupressure Therapy',
      'Training in traditional Chinese medicine principles',
      'Anatomy and physiology knowledge',
    ],
    salary: '₹3,00,000 - ₹8,00,000 per year',
    growth: 'Growing interest in alternative medicine creating steady opportunities',
    topCompanies: ['VLCC', 'Himalaya Wellness', 'Apollo Hospitals', 'Wellness Forever', 'Independent Practices'],
    jobDescription: [
      'Assess patients\'s conditions and develop treatment plans',
      'Apply precise pressure to specific points on the body',
      'Educate clients about self-care techniques',
      'Maintain detailed treatment records',
      'Collaborate with other healthcare providers for holistic care',
    ],
    careerPath: [
      { position: 'Junior Acupressure Therapist', experience: '0-2 years', salary: '₹2,00,000 - ₹3,00,000' },
      { position: 'Acupressure Therapist', experience: '2-5 years', salary: '₹3,00,000 - ₹5,00,000' },
      { position: 'Senior Therapist', experience: '5-8 years', salary: '₹5,00,000 - ₹8,00,000' },
      { position: 'Therapy Center Owner', experience: '8+ years', salary: '₹8,00,000 - ₹15,00,000' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Kerala'],
  },
  {
    id: 14,
    title: 'Acupuncturist',
    category: 'Healthcare',
    description: 'Acupuncturists practice a traditional Chinese therapy that involves inserting thin needles into specific points on the body to balance energy flow, relieve pain, and promote healing. This ancient practice is increasingly recognized for its effectiveness in treating various conditions.',
    skills: ['Needle Techniques', 'Traditional Chinese Medicine', 'Patient Assessment', 'Holistic Care', 'Sterilization Procedures', 'Therapeutic Communication'],
    education: [
      'Degree or Diploma in Acupuncture or Traditional Chinese Medicine',
      'Clinical training and internship',
      'Certification from recognized acupuncture board',
    ],
    salary: '₹4,00,000 - ₹12,00,000 per year',
    growth: 'Growing acceptance in mainstream healthcare creating new opportunities',
    topCompanies: ['VLCC', 'Apollo Hospitals', 'Medanta', 'Fortis Healthcare', 'Independent Clinics'],
    jobDescription: [
      'Diagnose conditions using traditional Chinese medicine principles',
      'Develop and implement treatment plans using acupuncture',
      'Insert, manipulate, and remove acupuncture needles',
      'Educate patients about complementary therapies and self-care',
      'Maintain detailed patient records and progress notes',
    ],
    careerPath: [
      { position: 'Junior Acupuncturist', experience: '0-2 years', salary: '₹3,00,000 - ₹5,00,000' },
      { position: 'Acupuncturist', experience: '2-5 years', salary: '₹5,00,000 - ₹8,00,000' },
      { position: 'Senior Acupuncturist', experience: '5-8 years', salary: '₹8,00,000 - ₹12,00,000' },
      { position: 'Acupuncture Clinic Owner', experience: '8+ years', salary: '₹12,00,000 - ₹20,00,000' },
    ],
    locations: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Kerala', 'Goa'],
  },
  {
    id: 15,
    title: 'Adventure Sports Instructor',
    category: 'Sports & Recreation',
    description: 'Adventure Sports Instructors teach and guide participants in physically challenging outdoor activities like rock climbing, rafting, paragliding, and trekking. They ensure safety while providing an exciting and educational experience in natural environments.',
    skills: ['Safety Protocols', 'First Aid', 'Equipment Knowledge', 'Physical Fitness', 'Risk Management', 'Leadership'],
    education: [
      'Certification in Adventure Sports and Safety',
      'Specialized training in specific adventure sports',
      'First aid and rescue certification',
    ],
    salary: '₹3,00,000 - ₹10,00,000 per year',
    growth: 'Growing tourism industry creating increased demand for adventure experiences',
    topCompanies: ['Thrillophilia', 'MakeMyTrip Adventure', 'Snow Leopard Adventures', 'Nirvana Adventures', 'Trek The Himalayas'],
    jobDescription: [
      'Teach adventure sports techniques to participants of varying skill levels',
      'Ensure safety protocols are followed during all activities',
      'Maintain and inspect equipment for safety and functionality',
      'Lead groups in outdoor adventure experiences',
      'Respond to emergencies and provide first aid when necessary',
    ],
    careerPath: [
      { position: 'Assistant Instructor', experience: '0-2 years', salary: '₹2,00,000 - ₹4,00,000' },
      { position: 'Adventure Sports Instructor', experience: '2-5 years', salary: '₹4,00,000 - ₹7,00,000' },
      { position: 'Senior Instructor', experience: '5-8 years', salary: '₹7,00,000 - ₹10,00,000' },
      { position: 'Adventure Program Director', experience: '8+ years', salary: '₹10,00,000 - ₹15,00,000' },
    ],
    locations: ['Rishikesh', 'Manali', 'Goa', 'Bir Billing', 'Ladakh', 'Andaman Islands', 'Western Ghats'],
  },
  {
    id: 16,
    title: 'Adventure Tourism Guide',
    category: 'Tourism',
    description: 'Adventure Tourism Guides lead travelers on specialized trips focused on adventure activities in natural settings. They combine knowledge of local geography, culture, and adventure sports to create safe, memorable, and educational experiences for tourists.',
    skills: ['Navigation', 'Outdoor Survival', 'Group Management', 'Local Knowledge', 'Communication', 'Emergency Response'],
    education: [
      'Tourism Management Degree or Certification in Adventure Tourism',
      'Specialized training in relevant adventure activities',
      'First aid and wilderness survival certification',
    ],
    salary: '₹3,00,000 - ₹8,00,000 per year',
    growth: 'Expanding tourism sector with growing interest in experiential travel',
    topCompanies: ['MakeMyTrip', 'Thomas Cook', 'SOTC', 'Thrillophilia', 'Yatra', 'Local Tour Operators'],
    jobDescription: [
      'Plan and lead adventure tours in various natural settings',
      'Provide information about local culture, history, and environment',
      'Ensure safety of all participants during adventure activities',
      'Coordinate logistics including transportation, accommodation, and meals',
      'Respond to emergencies and changing conditions appropriately',
    ],
    careerPath: [
      { position: 'Assistant Guide', experience: '0-2 years', salary: '₹2,00,000 - ₹3,00,000' },
      { position: 'Adventure Tourism Guide', experience: '2-5 years', salary: '₹3,00,000 - ₹5,00,000' },
      { position: 'Senior Guide', experience: '5-8 years', salary: '₹5,00,000 - ₹8,00,000' },
      { position: 'Tour Director/Operator', experience: '8+ years', salary: '₹8,00,000 - ₹15,00,000' },
    ],
    locations: ['Himachal Pradesh', 'Uttarakhand', 'Rajasthan', 'Kerala', 'Goa', 'Ladakh', 'Northeast India'],
  },
  {
    id: 17,
    title: 'Advertising Executive',
    category: 'Marketing',
    description: 'Advertising Executives create and manage promotional campaigns to market products or services. They develop creative strategies, coordinate with clients, and oversee the production and placement of advertisements across various media channels.',
    skills: ['Creative Thinking', 'Campaign Management', 'Market Research', 'Client Relations', 'Media Planning', 'Copywriting'],
    education: [
      'Bachelor\'s in Advertising, Marketing, or Communications',
      'MBA with marketing specialization preferred for senior roles',
      'Digital marketing certifications valuable',
    ],
    salary: '₹5,00,000 - ₹15,00,000 per year',
    growth: 'Steady growth with increasing digital marketing budgets',
    topCompanies: ['Ogilvy', 'JWT', 'McCann', 'Dentsu', 'Lowe Lintas', 'Wieden+Kennedy', 'DDB Mudra'],
    jobDescription: [
      'Develop creative advertising concepts and campaigns',
      'Coordinate with clients to understand marketing objectives',
      'Collaborate with creative teams including copywriters and designers',
      'Manage campaign budgets and timelines',
      'Analyze campaign performance and prepare reports',
    ],
    careerPath: [
      { position: 'Junior Advertising Executive', experience: '0-2 years', salary: '₹3,00,000 - ₹5,00,000' },
      { position: 'Advertising Executive', experience: '2-5 years', salary: '₹5,00,000 - ₹8,00,000' },
      { position: 'Senior Advertising Executive', experience: '5-8 years', salary: '₹8,00,000 - ₹15,00,000' },
      { position: 'Advertising Manager/Director', experience: '8+ years', salary: '₹15,00,000 - ₹30,00,000' },
    ],
    locations: ['Mumbai', 'Delhi NCR', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune'],
  }
];

const CareerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, you would fetch data from an API based on the ID
    const fetchCareerDetail = async () => {
      try {
        // Simulate API call delay
        setTimeout(() => {
          // First check in sampleCareers, then in expandedCareers
          let foundCareer = sampleCareers.find(c => c.id === parseInt(id, 10));
          
          if (!foundCareer) {
            foundCareer = expandedCareers.find(c => c.id === parseInt(id, 10));
          }
          
          if (foundCareer) {
            setCareer(foundCareer);
          } else {
            setError('Career not found. Please try another selection.');
          }
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError('Failed to load career details. Please try again.');
        setLoading(false);
      }
    };

    fetchCareerDetail();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
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

  if (error) {
    return (
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Alert severity="warning" sx={{ mb: 3 }}>{error}</Alert>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<ArrowBack />}
            onClick={handleBack}
          >
            Go Back
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Button 
        startIcon={<ArrowBack />} 
        onClick={handleBack}
        sx={{ mt: 2, mb: 2 }}
      >
        Back to Careers
      </Button>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {career.title}
            </Typography>
            <Chip 
              label={career.category} 
              color="primary" 
              variant="outlined" 
              sx={{ mb: 2 }} 
            />
            <Typography variant="body1" paragraph>
              {career.description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Salary Range
                </Typography>
                <Typography variant="body1" color="primary.main">
                  {career.salary}
                </Typography>
              </CardContent>
            </Card>
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Growth Outlook
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="success" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {career.growth}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Key Skills
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {career.skills.map((skill) => (
                <Chip 
                  key={skill} 
                  label={skill} 
                  variant="outlined" 
                  icon={<CheckCircleOutline />}
                  sx={{ m: 0.5 }} 
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Education Requirements
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List dense>
              {Array.isArray(career.education) ? (
                career.education.map((edu, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <School color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={edu} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemIcon>
                    <School color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={career.education} />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Job Responsibilities
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {career.jobDescription.map((duty, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleOutline color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={duty} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Career Progression
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {career.careerPath.map((path, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {path.position}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Experience: {path.experience}
                      </Typography>
                      <Typography variant="body1" color="primary.main">
                        {path.salary}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Top Companies Hiring
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {career.topCompanies.map((company) => (
                <Chip 
                  key={company} 
                  label={company} 
                  icon={<Business />}
                  variant="outlined" 
                  sx={{ m: 0.5 }} 
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Top Locations
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {career.locations.map((location) => (
                <Chip 
                  key={location} 
                  label={location} 
                  icon={<LocationOn />}
                  variant="outlined" 
                  sx={{ m: 0.5 }} 
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CareerDetail;