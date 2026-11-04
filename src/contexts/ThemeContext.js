import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

// Brand tokens. One warm accent (saffron) on cream/ink neutrals.
export const brand = {
  accent: '#D9480F',
  accentDark: '#FF7A3D',
  bodyFont: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  headingFont: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  monoFont: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
};

export const tokens = {
  light: {
    bg: '#F7F5EF',
    paper: '#FFFFFF',
    subtle: '#F0EDE5',
    border: '#E5E0D4',
    borderStrong: '#CFC8B8',
    text: '#17160F',
    textMuted: '#6B675C',
    primary: '#D9480F',
    primaryDark: '#B13A0B',
    secondary: '#0F766E',
  },
  dark: {
    bg: '#0D0D0B',
    paper: '#151512',
    subtle: '#1B1A16',
    border: '#2A2823',
    borderStrong: '#3D3A32',
    text: '#F3F0E8',
    textMuted: '#A39E92',
    primary: '#FF7A3D',
    primaryDark: '#FF9A68',
    secondary: '#2DD4BF',
  },
};

const buildTheme = (mode) => {
  const t = tokens[mode];
  const isDark = mode === 'dark';

  const softChip = (color) => ({
    backgroundColor: alpha(color, isDark ? 0.18 : 0.1),
    color: isDark ? color : color,
    border: `1px solid ${alpha(color, isDark ? 0.35 : 0.22)}`,
  });

  return createTheme({
    palette: {
      mode,
      primary: { main: t.primary, dark: t.primaryDark, contrastText: '#FFFFFF' },
      secondary: { main: t.secondary, contrastText: '#FFFFFF' },
      success: { main: isDark ? '#4ADE80' : '#15803D' },
      warning: { main: isDark ? '#FBBF24' : '#B45309' },
      error: { main: isDark ? '#F87171' : '#B91C1C' },
      info: { main: isDark ? '#60A5FA' : '#1D4ED8' },
      background: { default: t.bg, paper: t.paper },
      text: { primary: t.text, secondary: t.textMuted },
      divider: t.border,
      action: {
        hover: alpha(t.text, 0.04),
        selected: alpha(t.text, 0.07),
      },
    },
    shape: { borderRadius: 10 },
    // Soft, consistent shadows: hairline for surfaces, gentle lift for menus/popovers
    shadows: [
      'none',
      ...Array(5).fill(isDark ? 'none' : '0 1px 2px rgba(23, 22, 15, 0.05)'),
      ...Array(19).fill(isDark ? '0 12px 32px -8px rgba(0, 0, 0, 0.7)' : '0 12px 32px -8px rgba(23, 22, 15, 0.18)'),
    ],
    typography: {
      fontFamily: brand.bodyFont,
      h1: { fontWeight: 700, letterSpacing: '-0.04em' },
      h2: { fontWeight: 700, letterSpacing: '-0.035em' },
      h3: { fontWeight: 700, letterSpacing: '-0.03em' },
      h4: { fontWeight: 700, letterSpacing: '-0.025em' },
      h5: { fontWeight: 650, letterSpacing: '-0.02em' },
      h6: { fontWeight: 650, letterSpacing: '-0.015em' },
      subtitle1: { fontWeight: 500 },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: '-0.005em' },
      overline: { fontFamily: brand.monoFont, fontWeight: 500, letterSpacing: '0.08em', fontSize: 11.5 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { backgroundColor: t.bg },
          '::selection': { background: alpha(t.primary, 0.22) },
          '*::-webkit-scrollbar': { width: 10, height: 10 },
          '*::-webkit-scrollbar-thumb': { background: t.borderStrong, borderRadius: 8, border: `2px solid ${t.bg}` },
          '*::-webkit-scrollbar-track': { background: 'transparent' },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: { backgroundImage: 'none', backgroundColor: t.paper, border: `1px solid ${t.border}` },
          rounded: { borderRadius: 14 },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            borderRadius: 14,
            backgroundColor: t.paper,
            border: `1px solid ${t.border}`,
            boxShadow: isDark ? 'none' : '0 1px 2px rgba(23, 22, 15, 0.04)',
            transition: 'border-color .15s ease, box-shadow .15s ease',
            '&:hover': { borderColor: t.borderStrong },
          },
        },
      },
      MuiCardActions: { styleOverrides: { root: { padding: 16, paddingTop: 0 } } },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 9, padding: '9px 16px', fontWeight: 600, boxShadow: 'none' },
          sizeLarge: { padding: '12px 22px', fontSize: '0.975rem' },
          sizeSmall: { padding: '5px 11px' },
          containedPrimary: {
            backgroundColor: t.text,
            color: t.paper,
            '&:hover': { backgroundColor: isDark ? '#FFFFFF' : '#000000' },
            '&.Mui-disabled': { backgroundColor: alpha(t.text, 0.12), color: alpha(t.text, 0.4) },
          },
          containedSecondary: {
            backgroundColor: t.primary,
            color: '#FFFFFF',
            '&:hover': { backgroundColor: t.primaryDark },
          },
          outlined: {
            borderColor: t.border,
            backgroundColor: t.paper,
            color: t.text,
            '&:hover': { borderColor: t.borderStrong, backgroundColor: t.subtle },
          },
          text: { color: t.text, '&:hover': { backgroundColor: alpha(t.text, 0.05) } },
        },
      },
      MuiIconButton: { styleOverrides: { root: { borderRadius: 9 } } },
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            borderRadius: 7,
            fontWeight: 600,
            ...(ownerState.variant !== 'outlined' && ownerState.color && ownerState.color !== 'default' && softChip(
              {
                primary: t.primary,
                secondary: t.secondary,
                success: isDark ? '#4ADE80' : '#15803D',
                warning: isDark ? '#FBBF24' : '#B45309',
                error: isDark ? '#F87171' : '#B91C1C',
                info: isDark ? '#60A5FA' : '#1D4ED8',
              }[ownerState.color] || t.primary
            )),
          }),
          outlined: { borderColor: t.border },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 9,
            backgroundColor: t.paper,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: t.border },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: t.borderStrong },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: t.text, borderWidth: 1.5 },
          },
        },
      },
      MuiInputLabel: { styleOverrides: { root: { '&.Mui-focused': { color: t.text } } } },
      MuiLinearProgress: {
        styleOverrides: {
          root: { height: 6, borderRadius: 6, backgroundColor: alpha(t.text, 0.08) },
          bar: { borderRadius: 6, backgroundColor: t.primary },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: 'transparent' },
        styleOverrides: {
          root: {
            backgroundColor: alpha(t.bg, 0.86),
            backdropFilter: 'saturate(180%) blur(8px)',
            border: 'none',
            borderBottom: `1px solid ${t.border}`,
            borderRadius: 0,
            color: t.text,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: { backgroundColor: t.bg, border: 'none', borderRight: `1px solid ${t.border}`, borderRadius: 0 },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&:hover': { backgroundColor: alpha(t.text, 0.045) },
            '&.Mui-selected': {
              backgroundColor: t.paper,
              boxShadow: `inset 0 0 0 1px ${t.border}`,
              '&:hover': { backgroundColor: t.paper },
            },
          },
        },
      },
      MuiTabs: { styleOverrides: { indicator: { height: 2, backgroundColor: t.text } } },
      MuiTab: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600, color: t.textMuted, '&.Mui-selected': { color: t.text } },
        },
      },
      MuiTableCell: { styleOverrides: { root: { borderColor: t.border } } },
      MuiAccordion: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: { borderRadius: 12, marginBottom: 8, '&:before': { display: 'none' }, '&.Mui-expanded': { marginBottom: 8 } },
        },
      },
      MuiAlert: { styleOverrides: { root: { borderRadius: 10 } } },
      MuiDialog: { styleOverrides: { paper: { borderRadius: 16 } } },
      MuiMenu: { styleOverrides: { paper: { borderRadius: 10 } } },
      MuiAvatar: { styleOverrides: { root: { backgroundColor: t.subtle, color: t.text, fontWeight: 600 } } },
      MuiTooltip: {
        styleOverrides: {
          tooltip: { backgroundColor: t.text, color: t.paper, borderRadius: 6, fontSize: 12, fontWeight: 500 },
        },
      },
      MuiDivider: { styleOverrides: { root: { borderColor: t.border } } },
      MuiStepIcon: {
        styleOverrides: { root: { '&.Mui-active': { color: t.text }, '&.Mui-completed': { color: t.primary } } },
      },
    },
  });
};

const STORAGE_KEY = 'sc-theme-v2';

export const ThemeProvider = ({ children }) => {
  // Light (cream) is the default; remember the visitor's choice
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'dark';
    } catch (e) {
      return false;
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
