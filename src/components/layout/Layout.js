import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { styled, useTheme as useMuiTheme } from '@mui/material/styles';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  SpaceDashboard as DashboardIcon,
  Quiz as QuizIcon,
  Explore as ExploreIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
  Person as PersonIcon,
  WorkspacePremium as PremiumIcon,
  EmojiEvents as EmojiEventsIcon,
  RecordVoiceOver as InterviewIcon,
  Description as ResumeIcon,
  Insights as InsightsIcon,
  SwapHoriz as SwitchIcon,
  Balance as BalanceIcon,
  Route as RouteIcon,
  BatteryAlert as BurnoutIcon,
  School as SchoolIcon,
  AutoGraph as SkillIcon,
} from '@mui/icons-material';
import ThemeToggle from '../ThemeToggle';
import BrandLogo from '../BrandLogo';
import { brand } from '../../contexts/ThemeContext';

const drawerWidth = 272;

const navSections = [
  {
    title: 'Overview',
    items: [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
      { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    ],
  },
  {
    title: 'Discover',
    items: [
      { text: 'Career Quiz', icon: <QuizIcon />, path: '/career-quiz' },
      { text: 'Explore Careers', icon: <ExploreIcon />, path: '/explore-careers' },
      { text: 'Career Trends', icon: <TrendingUpIcon />, path: '/career-trends' },
    ],
  },
  {
    title: 'Grow with AI',
    items: [
      { text: 'AI Coach', icon: <PsychologyIcon />, path: '/ai-coach' },
      { text: 'Challenges', icon: <EmojiEventsIcon />, path: '/challenges' },
      { text: 'Learning Path', icon: <SchoolIcon />, path: '/learning-path' },
      { text: 'Skill Tracker', icon: <SkillIcon />, path: '/skill-tracker' },
    ],
  },
  {
    title: 'Premium Suite',
    items: [
      { text: 'Premium Features', icon: <PremiumIcon />, path: '/premium-features' },
      { text: 'Mock Interview', icon: <InterviewIcon />, path: '/premium/mock-interview' },
      { text: 'Smart Resume', icon: <ResumeIcon />, path: '/premium/smart-resume' },
      { text: 'Cognitive Fit', icon: <InsightsIcon />, path: '/premium/cognitive-fit' },
      { text: 'Career Switching', icon: <SwitchIcon />, path: '/premium/career-switching' },
      { text: 'Risk vs Reward', icon: <BalanceIcon />, path: '/premium/risk-vs-reward' },
      { text: 'Personalized Path', icon: <RouteIcon />, path: '/premium/personalized-career-path' },
      { text: 'Burnout Prediction', icon: <BurnoutIcon />, path: '/premium/burnout-prediction' },
    ],
  },
];

const allItems = navSections.flatMap((s) => s.items);

const pageTitleFor = (pathname) => {
  const match = allItems.find((i) => pathname === i.path);
  if (match) return match.text;
  if (pathname.startsWith('/career/')) return 'Career Details';
  if (pathname.startsWith('/quiz-results')) return 'Quiz Results';
  if (pathname.startsWith('/premium/')) return 'Premium Suite';
  return 'SmartCareer India';
};

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  minWidth: 0,
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: { padding: theme.spacing(2) },
}));

const Layout = () => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'), { noSsr: true });
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const open = isMobile ? mobileOpen : desktopOpen;
  const handleDrawerToggle = () => (isMobile ? setMobileOpen(!mobileOpen) : setDesktopOpen(!desktopOpen));

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ px: 2.5, height: 72, display: 'flex', alignItems: 'center' }}>
        <BrandLogo size={38} onClick={() => navigate('/')} />
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, pb: 2 }}>
        {navSections.map((section) => (
          <Box key={section.title} sx={{ mt: 2 }}>
            <Typography
              variant="overline"
              sx={{ px: 1.5, color: 'text.secondary', fontSize: 10.5, opacity: 0.8 }}
            >
              {section.title}
            </Typography>
            <List dense disablePadding>
              {section.items.map((item) => {
                const selected = pathname === item.path;
                return (
                  <ListItemButton
                    key={item.path}
                    selected={selected}
                    onClick={() => navigate(item.path)}
                    sx={{
                      my: 0.25,
                      py: 0.9,
                      position: 'relative',
                      '&.Mui-selected::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 8,
                        bottom: 8,
                        width: 3,
                        borderRadius: '3px',
                        backgroundImage: brand.gradient,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 38,
                        color: selected ? 'primary.main' : 'text.secondary',
                        '& svg': { fontSize: 20 },
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: selected ? 700 : 500,
                        color: selected ? 'text.primary' : 'text.secondary',
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: desktopOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
          ml: { md: desktopOpen ? `${drawerWidth}px` : 0 },
          transition: muiTheme.transitions.create(['margin', 'width']),
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 72 }, gap: 1.5 }}>
          <IconButton aria-label="toggle navigation" onClick={handleDrawerToggle} edge="start" sx={{ color: 'text.secondary' }}>
            <MenuIcon />
          </IconButton>
          {isMobile && <BrandLogo size={30} showText={false} onClick={() => navigate('/')} />}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' }, lineHeight: 1.2 }}>
              SmartCareer India
            </Typography>
            <Typography variant="h6" noWrap sx={{ fontSize: { xs: 16, md: 19 }, lineHeight: 1.3 }}>
              {pageTitleFor(pathname)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<QuizIcon />}
            onClick={() => navigate('/career-quiz')}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            Take the Career Quiz
          </Button>
          <ThemeToggle />
          <Avatar
            onClick={() => navigate('/profile')}
            sx={{
              width: 36,
              height: 36,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 700,
              backgroundImage: brand.gradient,
              color: '#fff',
            }}
          >
            <PersonIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isMobile || !desktopOpen ? 0 : drawerWidth,
          flexShrink: 0,
          transition: muiTheme.transitions.create('width'),
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>

      <Main>
        <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />
        <Box sx={{ animation: 'sc-fade-up .45s ease both' }} key={pathname}>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
};

export default Layout;
