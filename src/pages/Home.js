import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import { Avatar, Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import {
  QuizOutlined as QuizIcon,
  TrendingUp as TrendingUpIcon,
  SchoolOutlined as SchoolIcon,
  PsychologyOutlined as PsychologyIcon,
  ArrowForward as ArrowForwardIcon,
  NorthEast as NorthEastIcon,
  RecordVoiceOverOutlined as InterviewIcon,
  DescriptionOutlined as ResumeIcon,
  InsightsOutlined as InsightsIcon,
  SwapHoriz as SwitchIcon,
  BalanceOutlined as BalanceIcon,
  BatteryAlertOutlined as BurnoutIcon,
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

const stats = [
  { value: '240+', label: 'Careers mapped' },
  { value: '50', label: 'Career categories' },
  { value: '7-part', label: 'Career assessment' },
  { value: '13', label: 'Premium tools' },
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
  { title: 'Plan with the AI Coach', description: 'Get personalized career advice, resume tips, and interview preparation.' },
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

const footerLinks = [
  {
    title: 'Product',
    links: [
      ['Career Quiz', '/career-quiz'],
      ['Explore Careers', '/explore-careers'],
      ['Career Trends', '/career-trends'],
      ['AI Coach', '/ai-coach'],
    ],
  },
  {
    title: 'Premium',
    links: [
      ['Mock Interview', '/premium/mock-interview'],
      ['Smart Resume', '/premium/smart-resume'],
      ['Cognitive Fit', '/premium/cognitive-fit'],
      ['All features', '/premium-features'],
    ],
  },
];

const Mono = ({ children, sx }) => (
  <Typography component="span" sx={{ fontFamily: brand.monoFont, fontSize: 12.5, letterSpacing: '0.02em', color: 'text.secondary', ...sx }}>
    {children}
  </Typography>
);

const SectionHeading = ({ index, label, title, subtitle }) => (
  <Box sx={{ mb: { xs: 4, md: 6 }, maxWidth: 760 }}>
    <Mono sx={{ display: 'block', mb: 1.5 }}>
      <Box component="span" sx={{ color: 'primary.main' }}>
        {index}
      </Box>{' '}
      / {label}
    </Mono>
    <Typography variant="h3" sx={{ fontSize: { xs: 30, md: 40 }, mb: subtitle ? 1.5 : 0 }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography color="text.secondary" sx={{ fontSize: { xs: 16, md: 18 }, lineHeight: 1.6 }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

const IconTile = ({ children, size = 40 }) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: '10px',
      display: 'grid',
      placeItems: 'center',
      color: 'primary.main',
      bgcolor: (t) => alpha(t.palette.primary.main, t.palette.mode === 'dark' ? 0.14 : 0.08),
      flexShrink: 0,
      '& svg': { fontSize: size * 0.52 },
    }}
  >
    {children}
  </Box>
);

const ProductShot = () => (
  <Box
    sx={{
      borderRadius: '16px',
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      p: { xs: 0.75, md: 1.25 },
      boxShadow: (t) =>
        t.palette.mode === 'dark'
          ? '0 30px 80px -40px rgba(0,0,0,0.8)'
          : '0 1px 2px rgba(23,22,15,0.04), 0 30px 80px -40px rgba(23,22,15,0.35)',
    }}
  >
    <Box sx={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
      <Box
        sx={{
          height: 34,
          px: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          bgcolor: (t) => (t.palette.mode === 'dark' ? '#1B1A16' : '#F0EDE5'),
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack direction="row" spacing={0.75}>
          {[0, 1, 2].map((i) => (
            <Box key={i} sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: 'divider' }} />
          ))}
        </Stack>
        <Box
          sx={{
            mx: 'auto',
            px: 1.5,
            py: 0.25,
            borderRadius: '6px',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Mono sx={{ fontSize: 11.5 }}>smartcareer-india.pages.dev/dashboard</Mono>
        </Box>
        <Box sx={{ width: 39 }} />
      </Box>
      <Box
        component="img"
        src={`${process.env.PUBLIC_URL}/images/app-dashboard.jpg`}
        alt="SmartCareer India dashboard"
        sx={{ display: 'block', width: '100%', height: 'auto' }}
      />
    </Box>
  </Box>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Navbar */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: (t) => alpha(t.palette.background.default, 0.86),
          backdropFilter: 'saturate(180%) blur(8px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', height: 64, gap: 1.5 }}>
          <BrandLogo size={28} onClick={() => navigate('/')} />
          <Stack direction="row" spacing={3.5} sx={{ ml: 6, display: { xs: 'none', md: 'flex' } }}>
            {[
              ['Features', '#features'],
              ['How it works', '#how-it-works'],
              ['Premium', '#premium'],
              ['Stories', '#stories'],
            ].map(([label, href]) => (
              <Typography
                key={href}
                component="a"
                href={href}
                sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: 14, fontWeight: 500, '&:hover': { color: 'text.primary' } }}
              >
                {label}
              </Typography>
            ))}
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <ThemeToggle />
          <Button variant="text" component={RouterLink} to="/dashboard" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            Explore the App
          </Button>
          <Button variant="contained" component={RouterLink} to="/career-quiz" sx={{ whiteSpace: 'nowrap' }}>
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Hero */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: (t) => `radial-gradient(${alpha(t.palette.text.primary, t.palette.mode === 'dark' ? 0.14 : 0.12)} 1px, transparent 1px)`,
            backgroundSize: '22px 22px',
            maskImage: 'linear-gradient(to bottom, #000 0%, #000 40%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 40%, transparent 80%)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', pt: { xs: 8, md: 13 }, pb: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 0.6,
              mb: 3.5,
              borderRadius: '999px',
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', flexShrink: 0 }} />
            <Mono sx={{ color: 'text.primary', fontSize: { xs: 11, sm: 12.5 } }}>Career planning for students &amp; professionals in India</Mono>
          </Box>
          <Typography
            component="h1"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.045em',
              lineHeight: 1.02,
              fontSize: { xs: 42, sm: 60, md: 76 },
              maxWidth: 900,
              mx: 'auto',
              mb: 3,
            }}
          >
            Discover Your Ideal{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              Career Path
            </Box>
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: { xs: 17, md: 20 }, lineHeight: 1.6, maxWidth: 660, mx: 'auto', mb: 4.5 }}>
            SmartCareer India helps students and professionals find their perfect career match through personalized assessments, data-driven insights, and AI-powered guidance.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="center">
            <Button variant="contained" size="large" component={RouterLink} to="/career-quiz" endIcon={<ArrowForwardIcon />}>
              Take the Career Quiz
            </Button>
            <Button variant="outlined" size="large" component={RouterLink} to="/dashboard">
              Explore the App
            </Button>
          </Stack>
          <Mono sx={{ display: 'block', mt: 2.5 }}>Free · No sign-up required</Mono>
        </Container>

        <Container maxWidth="lg" sx={{ position: 'relative', pb: { xs: 6, md: 10 } }}>
          <ProductShot />
        </Container>
      </Box>

      {/* Stats */}
      <Box sx={{ borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container>
            {stats.map((s, i) => (
              <Grid
                item
                key={s.label}
                xs={6}
                md={3}
                sx={(t) => ({
                  py: { xs: 3, md: 4 },
                  px: { xs: 2, md: 3 },
                  borderLeft: { md: i === 0 ? 'none' : `1px solid ${t.palette.divider}` },
                })}
              >
                <Typography sx={{ fontSize: { xs: 30, md: 38 }, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                  {s.value}
                </Typography>
                <Mono>{s.label}</Mono>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Container id="features" maxWidth="lg" sx={{ py: { xs: 9, md: 13 }, scrollMarginTop: 72 }}>
        <SectionHeading
          index="01"
          label="Features"
          title="Smart Career Planning"
          subtitle="Our comprehensive tools help you make informed career decisions"
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '14px',
            overflow: 'hidden',
            bgcolor: 'background.paper',
          }}
        >
          {features.map((feature, i) => (
            <Box
              key={feature.title}
              onClick={() => navigate(feature.path)}
              sx={(t) => ({
                p: 3.5,
                cursor: 'pointer',
                borderLeft: {
                  xs: 'none',
                  sm: i % 2 === 1 ? `1px solid ${t.palette.divider}` : 'none',
                  md: i === 0 ? 'none' : `1px solid ${t.palette.divider}`,
                },
                borderTop: {
                  xs: i === 0 ? 'none' : `1px solid ${t.palette.divider}`,
                  sm: i < 2 ? 'none' : `1px solid ${t.palette.divider}`,
                  md: 'none',
                },
                transition: 'background-color .15s ease',
                '&:hover': { bgcolor: 'action.hover' },
                '&:hover .sc-arrow': { color: 'text.primary', transform: 'translate(2px, -2px)' },
              })}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 5 }}>
                <IconTile>{feature.icon}</IconTile>
                <NorthEastIcon className="sc-arrow" sx={{ fontSize: 18, color: 'text.secondary', transition: 'all .15s ease' }} />
              </Stack>
              <Typography variant="h6" sx={{ fontSize: 17, mb: 1 }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* How it works */}
      <Box id="how-it-works" sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider', scrollMarginTop: 72 }}>
        <Container maxWidth="lg" sx={{ py: { xs: 9, md: 12 } }}>
          <SectionHeading index="02" label="How it works" title="Three steps to clarity" />
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {steps.map((step, i) => (
              <Grid item key={step.title} xs={12} md={4}>
                <Box sx={{ borderTop: '2px solid', borderColor: i === 0 ? 'primary.main' : 'text.primary', pt: 2.5 }}>
                  <Mono sx={{ display: 'block', mb: 1.5 }}>Step {i + 1}</Mono>
                  <Typography variant="h6" sx={{ fontSize: 19, mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.65 }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Premium suite */}
      <Container id="premium" maxWidth="lg" sx={{ py: { xs: 9, md: 13 }, scrollMarginTop: 72 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          <Grid item xs={12} md={5}>
            <SectionHeading
              index="03"
              label="Premium"
              title="Advanced tools for every career stage"
              subtitle="Interview practice, resume building, cognitive fit, career switching and more."
            />
            <Button variant="outlined" component={RouterLink} to="/premium-features" endIcon={<ArrowForwardIcon />}>
              View all premium features
            </Button>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '14px', bgcolor: 'background.paper', overflow: 'hidden' }}>
              {premiumTools.map((tool, i) => (
                <Box
                  key={tool.title}
                  onClick={() => navigate(tool.path)}
                  sx={{
                    px: 2.5,
                    py: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    borderTop: i === 0 ? 'none' : '1px solid',
                    borderColor: 'divider',
                    transition: 'background-color .15s ease',
                    '&:hover': { bgcolor: 'action.hover' },
                    '&:hover .sc-arrow': { color: 'text.primary', transform: 'translateX(3px)' },
                  }}
                >
                  <IconTile size={36}>{tool.icon}</IconTile>
                  <Typography sx={{ fontWeight: 600, flexGrow: 1 }}>{tool.title}</Typography>
                  <ArrowForwardIcon className="sc-arrow" sx={{ fontSize: 18, color: 'text.secondary', transition: 'all .15s ease' }} />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box id="stories" sx={{ bgcolor: 'background.paper', borderTop: '1px solid', borderBottom: '1px solid', borderColor: 'divider', scrollMarginTop: 72 }}>
        <Container maxWidth="lg" sx={{ py: { xs: 9, md: 12 } }}>
          <SectionHeading
            index="04"
            label="Success Stories"
            title="Success Stories"
            subtitle="Hear from students and professionals who found their career path"
          />
          <Grid container spacing={2}>
            {testimonials.map((t) => (
              <Grid item key={t.name} xs={12} md={4}>
                <Card sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
                  <Typography sx={{ lineHeight: 1.7, flexGrow: 1, mb: 3, fontSize: 15.5 }}>"{t.content}"</Typography>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ width: 36, height: 36, fontSize: 13, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                      {t.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{t.name}</Typography>
                      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>{t.role}</Typography>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Container maxWidth="lg" sx={{ py: { xs: 9, md: 12 } }}>
        <Box
          sx={{
            borderRadius: '18px',
            p: { xs: 4, md: 7 },
            bgcolor: 'text.primary',
            color: 'background.paper',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: (t) => `radial-gradient(${alpha(t.palette.background.paper, 0.14)} 1px, transparent 1px)`,
              backgroundSize: '22px 22px',
              maskImage: 'linear-gradient(to left, #000, transparent 70%)',
              WebkitMaskImage: 'linear-gradient(to left, #000, transparent 70%)',
            }}
          />
          <Typography sx={{ position: 'relative', fontSize: { xs: 28, md: 40 }, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.1, maxWidth: 560 }}>
            Ready to discover your ideal career path?
          </Typography>
          <Button
            size="large"
            component={RouterLink}
            to="/career-quiz"
            endIcon={<ArrowForwardIcon />}
            sx={{
              position: 'relative',
              bgcolor: 'primary.main',
              color: '#fff',
              px: 3.5,
              flexShrink: 0,
              '&:hover': { bgcolor: 'primary.dark', color: '#fff' },
            }}
          >
            Get Started Now
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 7, pb: 5 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <BrandLogo size={26} />
              <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 360, fontSize: 14, lineHeight: 1.6 }}>
                Personalized assessments, data-driven insights, and AI-powered guidance for students and professionals in India.
              </Typography>
            </Grid>
            {footerLinks.map((col) => (
              <Grid item key={col.title} xs={6} md={3}>
                <Mono sx={{ display: 'block', mb: 1.5 }}>{col.title}</Mono>
                <Stack spacing={1}>
                  {col.links.map(([label, path]) => (
                    <Typography
                      key={path}
                      component={RouterLink}
                      to={path}
                      sx={{ color: 'text.primary', textDecoration: 'none', fontSize: 14, '&:hover': { color: 'primary.main' } }}
                    >
                      {label}
                    </Typography>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
              © {new Date().getFullYear()} SmartCareer India. All rights reserved.
            </Typography>
            <Mono>Made in India</Mono>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
