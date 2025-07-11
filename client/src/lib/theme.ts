import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1', // Indigo
      light: '#a5b4fc',
      dark: '#4338ca',
      contrastText: '#fff',
    },
    secondary: {
      main: '#3b82f6', // Blue
      light: '#93c5fd',
      dark: '#1e40af',
      contrastText: '#fff',
    },
    background: {
      default: '#f6f8fa',
      paper: '#fff',
    },
    text: {
      primary: '#222',
      secondary: '#64748b',
      disabled: '#cbd5e1',
    },
    divider: '#e5e7eb',
    success: { main: '#10b981' },
    warning: { main: '#f59e0b' },
    error: { main: '#ef4444' },
    info: { main: '#0ea5e9' },
    grey: {
      100: '#f3f6fa',
      200: '#e5e7eb',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'Segoe UI',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      color: '#222',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      color: '#222',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
      color: '#222',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.2rem',
      color: '#222',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#222',
    },
    h6: {
      fontWeight: 600,
      fontSize: '0.95rem',
      color: '#222',
    },
    body1: {
      fontSize: '1rem',
      color: '#222',
    },
    body2: {
      fontSize: '0.95rem',
      color: '#64748b',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      borderRadius: 8,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 16px rgba(30, 41, 59, 0.06), 0 1.5px 4px rgba(30, 41, 59, 0.03)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          background: '#f3f6fa',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          background: '#f3f6fa',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;