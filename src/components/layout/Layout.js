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
  SpaceDashboardOutlined as DashboardIcon,
  QuizOutlined as QuizIcon,
  ExploreOutlined as ExploreIcon,
  TrendingUp as TrendingUpIcon,
  PsychologyOutlined as PsychologyIcon,
  PersonOutline as PersonIcon,
  WorkspacePremiumOutlined as PremiumIcon,
  EmojiEventsOutlined as EmojiEventsIcon,
  RecordVoiceOverOutlined as InterviewIcon,
  DescriptionOutlined as ResumeIcon,
  InsightsOutlined as InsightsIcon,
  SwapHoriz as SwitchIcon,
  BalanceOutlined as BalanceIcon,
  RouteOutlined as RouteIcon,
  BatteryAlertOutlined as BurnoutIcon,
  SchoolOutlined as SchoolIcon,
  AutoGraphOutlined as SkillIcon,
} from '@mui/icons-material';
import ThemeToggle from '../ThemeToggle';
import BrandLogo from '../BrandLogo';

const drawerWidth = 260;

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
    title: 'Grow',
    items: [
      { text: 'AI Coach', icon: <PsychologyIcon />, path: '/ai-coach' },
      { text: 'Challenges', icon: <EmojiEventsIcon />, path: '/challenges' },
      { text: 'Learning Path', icon: <SchoolIcon />, path: '/learning-path' },
      { text: 'Skill Tracker', icon: <SkillIcon />, path: '/skill-tracker' },
    ],
  },
  {
    title: 'Premium',
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
  if (pathname.startsWith('/premium/')) return 'Premium';
  return 'SmartCareer India';
};

const sectionFor = (pathname) => {
  const section = navSections.find((s) => s.items.some((i) => i.path === pathname));
  return section ? section.title : 'App';
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
      <Box sx={{ px: 2.5, height: 64, display: 'flex', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
        <BrandLogo size={28} onClick={() => navigate('/')} />
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, pb: 2 }}>
        {navSections.map((section) => (
          <Box key={section.title} sx={{ mt: 2.25 }}>
            <Typography variant="overline" sx={{ px: 1.25, color: 'text.secondary', display: 'block', lineHeight: 2 }}>
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
                    sx={{ my: 0.25, py: 0.75, px: 1.25 }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 34,
                        color: selected ? 'primary.main' : 'text.secondary',
                        '& svg': { fontSize: 19 },
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: selected ? 600 : 500,
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

      <Box sx={{ px: 2.5, py: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Avatar sx={{ width: 30, height: 30 }}>
          <PersonIcon sx={{ fontSize: 18 }} />
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>Guest</Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>All features unlocked</Typography>
        </Box>
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
        <Toolbar sx={{ minHeight: { xs: 60, md: 64 }, gap: 1.5 }}>
          <IconButton aria-label="toggle navigation" onClick={handleDrawerToggle} edge="start" sx={{ color: 'text.secondary' }}>
            <MenuIcon />
          </IconButton>
          {isMobile && <BrandLogo size={26} showText={false} onClick={() => navigate('/')} />}
          <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ display: { xs: 'none', sm: 'block' }, color: 'text.secondary', fontSize: 14 }}>
              {sectionFor(pathname)}
            </Typography>
            <Typography sx={{ display: { xs: 'none', sm: 'block' }, color: 'text.secondary', opacity: 0.5, fontSize: 14 }}>/</Typography>
            <Typography noWrap sx={{ fontSize: 14.5, fontWeight: 600 }}>
              {pageTitleFor(pathname)}
            </Typography>
          </Box>
          <ThemeToggle />
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate('/career-quiz')}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            Take the Career Quiz
          </Button>
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
        <Toolbar sx={{ minHeight: { xs: 60, md: 64 } }} />
        <Box sx={{ animation: 'sc-fade .25s ease both' }} key={pathname}>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
};

export default Layout;
