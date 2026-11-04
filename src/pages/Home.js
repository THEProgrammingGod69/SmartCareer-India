import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Psychology as PsychologyIcon,
  ArrowForward as ArrowForwardIcon,
  FormatQuote as QuoteIcon,
  RecordVoiceOver as InterviewIcon,
  Description as ResumeIcon,
  Insights as InsightsIcon,
  SwapHoriz as SwitchIcon,
  Balance as BalanceIcon,
  BatteryAlert as BurnoutIcon,
  AutoAwesome as SparkIcon,
  Bolt as BoltIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import BrandLogo from '../components/BrandLogo';
import ThemeToggle from '../components/ThemeToggle';
import { brand } from '../contexts/ThemeContext';

const features = [
  {
    icon: <QuizIcon />,
    title: 'Career Discovery Quiz',
    description: 'Take our interactive quiz to discover careers that match your personality, skills, and interests.',
    path: '/career-quiz',
  },
  {
    icon: <TrendingUpIcon />,
    title: 'Career Trends',
    description: 'Stay updated with the latest career trends, salary insights, and job market demands in India.',
    path: '/career-trends',
  },
  {
    icon: <SchoolIcon />,
    title: 'Education Guidance',
    description: 'Get personalized recommendations for courses, colleges, and exams based on your career goals.',
    path: '/learning-path',
  },
  {
    icon: <PsychologyIcon />,
    title: 'AI Career Coach',
    description: 'Chat with our AI coach for personalized career advice, resume tips, and interview preparation.',
    path: '/ai-coach',
  },
];

const premiumTools = [
  { icon: <InterviewIcon />, title: 'Mock Interview', path: '/premium/mock-interview' },
  { icon: <ResumeIcon />, title: 'Smart Resume Builder', path: '/premium/smart-resume' },
  { icon: <InsightsIcon />, title: 'Cognitive Fit', path: '/premium/cognitive-fit' },
  { icon: <SwitchIcon />, title: 'Career Switching', path: '/premium/career-switching' },
  { icon: <BalanceIcon />, title: 'Risk vs Reward', path: '/premium/risk-vs-reward' },
  { icon: <BurnoutIcon />, title: 'Burnout Prediction', path: '/premium/burnout-prediction' },
];

const steps = [
  { title: 'Take the Career Quiz', description: 'Discover careers that match your personality, skills, and interests.' },
  { title: 'Explore your matches', description: 'Browse career options, their requirements, and growth prospects in India.' },
  { title: 'Grow with AI', description: 'Get personalized career advice, resume tips, and interview preparation from our AI coach.' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Engineering Student, Delhi',
    content: 'CareerSmart helped me discover my passion for UX design when I was confused between traditional engineering roles and creative fields.',
  },
  {
    name: 'Rahul Verma',
    role: 'Recent Graduate, Mumbai',
    content: 'The career trends section gave me insights into emerging fields in data science, which helped me choose the right certification courses.',
  },
  {
    name: 'Ananya Patel',
    role: 'High School Student, Bangalore',
    content: 'I was unsure about which stream to choose after 10th. The career quiz gave me clarity about my strengths and suitable career paths.',
  },
];

const sampleMatches = [
  { title: 'UX Designer', value: 94 },
  { title: 'Data Scientist', value: 88 },
  { title: 'Product Manager', value: 81 },
];

const GradientText = ({ children }) => (
  <Box
    component="span"
    sx={{
      backgroundImage: brand.gradient,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    }}
  >
    {children}
  </Box>
);

const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: { xs: 5, md: 7 } }}>
    <Chip
      label={eyebrow}
      size="small"
      sx={{
        mb: 2,
        bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
        color: 'primary.main',
        border: '1px solid',
        borderColor: (t) => alpha(t.palette.primary.main, 0.3),
      }}
    />
    <Typography variant="h3" sx={{ fontSize: { xs: 30, md: 44 }, mb: 1.5 }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, fontFamily: brand.bodyFont, fontSize: { xs: 16, md: 19 } }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

const IconTile = ({ children, size = 48 }) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: '14px',
      display: 'grid',
      placeItems: 'center',
      color: '#fff',
      backgroundImage: brand.gradient,
      boxShadow: '0 10px 24px -10px rgba(124, 92, 255, 0.9)',
      flexShrink: 0,
      '& svg': { fontSize: size * 0.5 },
    }}
  >
    {children}
  </Box>
);

const ProductPreview = () => (
  <Box sx={{ position: 'relative', animation: 'sc-float 7s ease-in-out infinite' }}>
    <Box
      sx={{
        position: 'absolute',
        inset: -2,
        borderRadius: '28px',
        backgroundImage: brand.gradient,
        opacity: 0.55,
        filter: 'blur(28px)',
      }}
    />
    <Card sx={{ position: 'relative', borderRadius: '24px', p: { xs: 2.5, md: 3.5 }, '&:hover': {} }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconTile size={40}>
            <SparkIcon />
          </IconTile>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              Your Career Matches
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Sample result
            </Typography>
          </Box>
        </Stack>
        <Chip size="small" icon={<BoltIcon />} label="AI" color="primary" variant="outlined" />
      </Stack>
      <Stack spacing={2.25}>
        {sampleMatches.map((m) => (
          <Box key={m.title}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {m.title}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                {m.value}%
              </Typography>
            </Stack>
            <LinearProgress variant="determinate" value={m.value} />
          </Box>
        ))}
      </Stack>
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: '14px',
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
          display: 'flex',
          gap: 1.5,
          alignItems: 'flex-start',
        }}
      >
        <PsychologyIcon sx={{ color: 'primary.main', mt: 0.25 }} />
        <Typography variant="body2" color="text.secondary">
          <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>
            AI Career Coach:{' '}
          </Box>
          personalized career advice, resume tips, and interview preparation.
        </Typography>
      </Box>
    </Card>
  </Box>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background grid + glow */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          height: 900,
          pointerEvents: 'none',
          backgroundImage: (t) =>
            `linear-gradient(${alpha(t.palette.primary.main, 0.08)} 1px, transparent 1px), linear-gradient(90deg, ${alpha(t.palette.primary.main, 0.08)} 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%)',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          width: 520,
          height: 520,
          top: -160,
          right: -120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.28), transparent 65%)',
          animation: 'sc-pulse 8s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Navbar */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backdropFilter: 'blur(16px)',
          bgcolor: (t) => alpha(t.palette.background.default, 0.6),
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', height: 72, gap: 2 }}>
          <BrandLogo size={36} onClick={() => navigate('/')} />
          <Stack direction="row" spacing={3.5} sx={{ ml: 5, display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
            {[
              ['Features', '#features'],
              ['How it works', '#how-it-works'],
              ['Premium', '#premium'],
              ['Success Stories', '#stories'],
            ].map(([label, href]) => (
              <Typography
                key={href}
                component="a"
                href={href}
                variant="body2"
                sx={{ color: 'text.secondary', textDecoration: 'none', fontWeight: 500, '&:hover': { color: 'text.primary' } }}
              >
                {label}
              </Typography>
            ))}
          </Stack>
          <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />
          <ThemeToggle />
          <Button
            variant="outlined"
            component={RouterLink}
            to="/dashboard"
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            Explore the App
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="/career-quiz"
            endIcon={<ArrowForwardIcon />}
            sx={{ whiteSpace: 'nowrap', px: { xs: 2, sm: 2.25 } }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Hero */}
      <Container maxWidth="lg" sx={{ position: 'relative', pt: { xs: 8, md: 12 }, pb: { xs: 10, md: 14 } }}>
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          <Grid item xs={12} md={7} sx={{ animation: 'sc-fade-up .7s ease both' }}>
            <Chip
              icon={<SparkIcon sx={{ fontSize: 16 }} />}
              label="AI-powered career guidance for India"
              sx={{
                mb: 3,
                bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
                color: 'text.primary',
                border: '1px solid',
                borderColor: (t) => alpha(t.palette.primary.main, 0.35),
                '& .MuiChip-icon': { color: 'secondary.main' },
              }}
            />
            <Typography
              component="h1"
              sx={{
                fontFamily: brand.headingFont,
                fontWeight: 700,
                letterSpacing: '-0.035em',
                lineHeight: 1.04,
                fontSize: { xs: 44, sm: 56, md: 68 },
                mb: 3,
              }}
            >
              Discover Your <GradientText>Ideal Career Path</GradientText>
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: { xs: 17, md: 20 }, lineHeight: 1.6, mb: 4.5, maxWidth: 560 }}
            >
              SmartCareer India helps students and professionals find their perfect career match through personalized assessments, data-driven insights, and AI-powered guidance.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" size="large" component={RouterLink} to="/career-quiz" endIcon={<ArrowForwardIcon />}>
                Take the Career Quiz
              </Button>
              <Button variant="outlined" size="large" component={RouterLink} to="/dashboard">
                Explore the App
              </Button>
            </Stack>
            <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', columnGap: 3, rowGap: 1 }}>
              {['Personalized assessments', 'Data-driven insights', 'AI-powered guidance'].map((label) => (
                <Stack key={label} direction="row" spacing={0.75} alignItems="center">
                  <CheckIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ animation: 'sc-fade-up .9s ease .15s both' }}>
            <ProductPreview />
          </Grid>
        </Grid>
      </Container>

      {/* Features */}
      <Container id="features" maxWidth="lg" sx={{ py: { xs: 8, md: 12 }, scrollMarginTop: 80 }}>
        <SectionHeading
          eyebrow="Features"
          title="Smart Career Planning"
          subtitle="Our comprehensive tools help you make informed career decisions"
        />
        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid item key={feature.title} xs={12} sm={6} md={3}>
              <Card
                onClick={() => navigate(feature.path)}
                sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-6px)' } }}
              >
                <CardContent sx={{ p: 3.5 }}>
                  <IconTile>{feature.icon}</IconTile>
                  <Typography variant="h6" sx={{ mt: 3, mb: 1.25 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How it works */}
      <Container id="how-it-works" maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, scrollMarginTop: 80 }}>
        <SectionHeading eyebrow="How it works" title="From confusion to clarity" />
        <Grid container spacing={3}>
          {steps.map((step, i) => (
            <Grid item key={step.title} xs={12} md={4}>
              <Card sx={{ height: '100%', p: 3.5 }}>
                <Typography
                  sx={{
                    fontFamily: brand.headingFont,
                    fontWeight: 700,
                    fontSize: 48,
                    lineHeight: 1,
                    mb: 2,
                    backgroundImage: brand.gradient,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  0{i + 1}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {step.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Premium suite */}
      <Container id="premium" maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, scrollMarginTop: 80 }}>
        <SectionHeading
          eyebrow="Premium Suite"
          title="Advanced tools for every career stage"
          subtitle="Interview practice, resume building, cognitive fit, career switching and more."
        />
        <Grid container spacing={2.5}>
          {premiumTools.map((tool) => (
            <Grid item key={tool.title} xs={12} sm={6} md={4}>
              <Card
                onClick={() => navigate(tool.path)}
                sx={{ cursor: 'pointer', p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}
              >
                <IconTile size={44}>{tool.icon}</IconTile>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, flexGrow: 1 }}>
                  {tool.title}
                </Typography>
                <ArrowForwardIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" component={RouterLink} to="/premium-features" endIcon={<ArrowForwardIcon />}>
            View all premium features
          </Button>
        </Box>
      </Container>

      {/* Testimonials */}
      <Container id="stories" maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, scrollMarginTop: 80 }}>
        <SectionHeading
          eyebrow="Success Stories"
          title="Success Stories"
          subtitle="Hear from students and professionals who found their career path"
        />
        <Grid container spacing={3}>
          {testimonials.map((t) => (
            <Grid item key={t.name} xs={12} md={4}>
              <Card sx={{ height: '100%', p: 3.5, display: 'flex', flexDirection: 'column' }}>
                <QuoteIcon sx={{ fontSize: 36, color: 'primary.main', opacity: 0.8, mb: 1.5 }} />
                <Typography variant="body1" sx={{ lineHeight: 1.75, flexGrow: 1, mb: 3 }}>
                  "{t.content}"
                </Typography>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar sx={{ backgroundImage: brand.gradient, color: '#fff', fontWeight: 700 }}>
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {t.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t.role}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '32px',
            p: { xs: 4, md: 7 },
            textAlign: 'center',
            backgroundImage: 'linear-gradient(135deg, #5B3DF5 0%, #7C5CFF 45%, #0EA5C6 100%)',
            color: '#fff',
            boxShadow: '0 40px 80px -40px rgba(124, 92, 255, 0.9)',
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, #000 20%, transparent 75%)',
            }}
          />
          <Box sx={{ position: 'relative' }}>
            <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 44 }, mb: 3, color: '#fff' }}>
              Ready to discover your ideal career path?
            </Typography>
            <Button
              size="large"
              component={RouterLink}
              to="/career-quiz"
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: '#fff',
                color: '#2A1B8F',
                px: 4,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              Get Started Now
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 5 }}>
        <Container
          maxWidth="lg"
          sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}
        >
          <BrandLogo size={30} />
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} SmartCareer India. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
