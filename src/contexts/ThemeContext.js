import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

// Brand tokens shared by both modes
export const brand = {
  violet: '#7C5CFF',
  cyan: '#22D3EE',
  pink: '#F472B6',
  gradient: 'linear-gradient(135deg, #7C5CFF 0%, #22D3EE 100%)',
  gradientWarm: 'linear-gradient(135deg, #F472B6 0%, #7C5CFF 100%)',
  headingFont: '"Space Grotesk", "Inter", system-ui, sans-serif',
  bodyFont: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
};

const tokens = {
  dark: {
    bg: '#060912',
    paper: '#0C1222',
    surface: 'rgba(15, 22, 42, 0.72)',
    border: 'rgba(148, 163, 255, 0.14)',
    borderStrong: 'rgba(148, 163, 255, 0.28)',
    text: '#E7EAF6',
    textMuted: '#9AA4C2',
    primary: '#8B6CFF',
    secondary: '#22D3EE',
    glow1: 'rgba(124, 92, 255, 0.22)',
    glow2: 'rgba(34, 211, 238, 0.14)',
  },
  light: {
    bg: '#F4F6FC',
    paper: '#FFFFFF',
    surface: 'rgba(255, 255, 255, 0.82)',
    border: 'rgba(30, 41, 99, 0.10)',
    borderStrong: 'rgba(91, 61, 245, 0.30)',
    text: '#0B1020',
    textMuted: '#4A5578',
    primary: '#5B3DF5',
    secondary: '#0891B2',
    glow1: 'rgba(124, 92, 255, 0.12)',
    glow2: 'rgba(34, 211, 238, 0.10)',
  },
};

const buildTheme = (mode) => {
  const t = tokens[mode];
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: { main: t.primary, contrastText: '#FFFFFF' },
      secondary: { main: t.secondary, contrastText: isDark ? '#04121A' : '#FFFFFF' },
      success: { main: isDark ? '#34D399' : '#059669' },
      warning: { main: isDark ? '#FBBF24' : '#D97706' },
      error: { main: isDark ? '#F87171' : '#DC2626' },
      info: { main: isDark ? '#60A5FA' : '#2563EB' },
      background: { default: t.bg, paper: t.paper },
      text: { primary: t.text, secondary: t.textMuted },
      divider: t.border,
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: brand.bodyFont,
      h1: { fontFamily: brand.headingFont, fontWeight: 700, letterSpacing: '-0.03em' },
      h2: { fontFamily: brand.headingFont, fontWeight: 700, letterSpacing: '-0.03em' },
      h3: { fontFamily: brand.headingFont, fontWeight: 700, letterSpacing: '-0.02em' },
      h4: { fontFamily: brand.headingFont, fontWeight: 700, letterSpacing: '-0.02em' },
      h5: { fontFamily: brand.headingFont, fontWeight: 600, letterSpacing: '-0.01em' },
      h6: { fontFamily: brand.headingFont, fontWeight: 600, letterSpacing: '-0.01em' },
      subtitle1: { fontWeight: 500 },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
      overline: { fontWeight: 700, letterSpacing: '0.14em' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: t.bg,
            backgroundImage: `radial-gradient(1200px 600px at 10% -10%, ${t.glow1}, transparent 60%), radial-gradient(900px 500px at 100% 0%, ${t.glow2}, transparent 55%)`,
            backgroundAttachment: 'fixed',
            minHeight: '100vh',
          },
          '::selection': { background: alpha(t.primary, 0.35) },
          '*::-webkit-scrollbar': { width: 10, height: 10 },
          '*::-webkit-scrollbar-thumb': {
            background: alpha(t.primary, 0.35),
            borderRadius: 8,
            border: `2px solid ${t.bg}`,
          },
          '*::-webkit-scrollbar-track': { background: 'transparent' },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: t.surface,
            backdropFilter: 'blur(14px)',
            border: `1px solid ${t.border}`,
          },
          rounded: { borderRadius: 18 },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: 20,
            backgroundColor: t.surface,
            border: `1px solid ${t.border}`,
            boxShadow: isDark ? '0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.6)' : '0 12px 32px -20px rgba(30,41,99,0.25)',
            transition: 'transform .25s ease, border-color .25s ease, box-shadow .25s ease',
            '&:hover': {
              borderColor: t.borderStrong,
              boxShadow: isDark
                ? `0 0 0 1px ${alpha(t.primary, 0.25)}, 0 24px 48px -20px ${alpha(t.primary, 0.45)}`
                : `0 0 0 1px ${alpha(t.primary, 0.15)}, 0 24px 48px -24px ${alpha(t.primary, 0.35)}`,
            },
          },
        },
      },
      MuiCardActions: { styleOverrides: { root: { padding: 16, paddingTop: 0 } } },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 12, padding: '10px 18px', fontWeight: 600 },
          sizeLarge: { padding: '13px 26px', fontSize: '1rem' },
          sizeSmall: { padding: '6px 12px' },
          containedPrimary: {
            backgroundImage: brand.gradient,
            color: '#FFFFFF',
            boxShadow: `0 10px 30px -10px ${alpha('#7C5CFF', 0.7)}`,
            '&:hover': {
              backgroundImage: brand.gradient,
              filter: 'brightness(1.08)',
              boxShadow: `0 14px 36px -10px ${alpha('#7C5CFF', 0.85)}`,
            },
          },
          containedSecondary: {
            backgroundImage: brand.gradientWarm,
            color: '#FFFFFF',
            '&:hover': { backgroundImage: brand.gradientWarm, filter: 'brightness(1.08)' },
          },
          outlined: {
            borderColor: t.borderStrong,
            backgroundColor: alpha(t.primary, isDark ? 0.06 : 0.03),
            '&:hover': { borderColor: t.primary, backgroundColor: alpha(t.primary, 0.12) },
          },
        },
      },
      MuiIconButton: { styleOverrides: { root: { borderRadius: 12 } } },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 10, fontWeight: 600 },
          outlined: { borderColor: t.borderStrong },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.9)',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: t.border },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: t.borderStrong },
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: { height: 8, borderRadius: 8, backgroundColor: alpha(t.primary, 0.15) },
          bar: { borderRadius: 8, backgroundImage: brand.gradient },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: 'transparent' },
        styleOverrides: {
          root: {
            backgroundColor: isDark ? 'rgba(6, 9, 18, 0.65)' : 'rgba(244, 246, 252, 0.75)',
            backdropFilter: 'blur(16px)',
            border: 'none',
            borderBottom: `1px solid ${t.border}`,
            borderRadius: 0,
            color: t.text,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? 'rgba(8, 12, 24, 0.92)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(18px)',
            border: 'none',
            borderRight: `1px solid ${t.border}`,
            borderRadius: 0,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            '&.Mui-selected': {
              backgroundColor: alpha(t.primary, 0.16),
              '&:hover': { backgroundColor: alpha(t.primary, 0.22) },
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: { height: 3, borderRadius: 3, backgroundImage: brand.gradient },
        },
      },
      MuiTab: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } } },
      MuiTableCell: { styleOverrides: { root: { borderColor: t.border } } },
      MuiAccordion: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: 16,
            marginBottom: 8,
            '&:before': { display: 'none' },
            '&.Mui-expanded': { marginBottom: 8 },
          },
        },
      },
      MuiAlert: { styleOverrides: { root: { borderRadius: 14 } } },
      MuiDialog: { styleOverrides: { paper: { borderRadius: 22 } } },
      MuiMenu: { styleOverrides: { paper: { borderRadius: 14 } } },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDark ? '#141B33' : '#0B1020',
            border: `1px solid ${t.border}`,
            borderRadius: 10,
            fontSize: 12,
          },
        },
      },
      MuiDivider: { styleOverrides: { root: { borderColor: t.border } } },
      MuiStepIcon: {
        styleOverrides: {
          root: { '&.Mui-active, &.Mui-completed': { color: t.primary } },
        },
      },
    },
  });
};

const STORAGE_KEY = 'sc-theme';

export const ThemeProvider = ({ children }) => {
  // Dark, futuristic look is the default; remember the visitor's choice
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) !== 'light';
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, darkMode ? 'dark' : 'light');
    } catch (e) {
      // storage unavailable (private mode) - ignore
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((d) => !d);

  const theme = useMemo(() => buildTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
