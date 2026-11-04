import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled, createTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Quiz as QuizIcon,
  Explore as ExploreIcon,
  TrendingUp as TrendingUpIcon,
  Psychology as PsychologyIcon,
  Person as PersonIcon,
  Star as StarIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../ThemeToggle';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  }),
);

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Layout = () => {
  const { darkMode } = useTheme();
  const theme = darkMode ? createTheme({
    palette: {
      mode: 'dark',
    },
  }) : createTheme({
    palette: {
      mode: 'light',
    },
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!isMobile);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Career Quiz', icon: <QuizIcon />, path: '/career-quiz' },
    { text: 'Explore Careers', icon: <ExploreIcon />, path: '/explore-careers' },
    { text: 'Career Trends', icon: <TrendingUpIcon />, path: '/career-trends' },
    { text: 'AI Coach', icon: <PsychologyIcon />, path: '/ai-coach' },
    { text: 'Premium Features', icon: <StarIcon />, path: '/premium-features' },
    { text: 'Challenges', icon: <EmojiEventsIcon />, path: '/challenges' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            CareerSmart India
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBarStyled>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
      >
        <DrawerHeader>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            Menu
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default Layout;