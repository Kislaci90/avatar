import React, { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider, createTheme, CssBaseline, PaletteMode } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
  if (mode === 'light') {
    return {
      palette: {
        mode: 'light',
        primary: {
          main: '#16a34a', // vivid green
          contrastText: '#fff',
        },
        secondary: {
          main: '#f3f4f6', // light gray
          contrastText: '#16a34a',
        },
        background: {
          default: '#f3f4f6',
          paper: '#fff',
        },
        error: {
          main: '#ef4444',
        },
        success: {
          main: '#16a34a',
        },
        warning: {
          main: '#f59e0b',
        },
        info: {
          main: '#60a5fa',
        },
        text: {
          primary: '#18181b',
          secondary: '#374151',
          disabled: '#9ca3af',
        },
        divider: '#e5e7eb',
      },
      typography: {
        fontFamily: 'Poppins, Inter, Roboto, Arial, sans-serif',
        h1: { fontWeight: 700, fontSize: '3.5rem', lineHeight: 1.15 },
        h2: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2 },
        h3: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.25 },
        h4: { fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.3 },
        h5: { fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.35 },
        h6: { fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.4 },
        button: { textTransform: 'none', fontWeight: 600, fontSize: '1rem' },
        body1: { fontSize: '1.1rem', fontWeight: 400 },
        body2: { fontSize: '1rem', fontWeight: 400 },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              fontWeight: 700,
              textTransform: 'none',
            },
            contained: {
              backgroundColor: '#16a34a',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#15803d',
                color: '#fff',
              },
            },
            outlined: {
              borderColor: '#16a34a',
              color: '#16a34a',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: '#16a34a',
                color: '#fff',
                borderColor: '#15803d',
              },
            },
            text: {
              color: '#16a34a',
              '&:hover': {
                backgroundColor: 'rgba(22,163,74,0.08)',
                color: '#15803d',
              },
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              fontWeight: 700,
              borderRadius: 6,
            },
            colorPrimary: {
              backgroundColor: '#16a34a',
              color: '#fff',
            },
            colorSecondary: {
              backgroundColor: '#f3f4f6',
              color: '#16a34a',
              border: '1px solid #16a34a',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: '#fff',
              color: '#18181b',
              borderRadius: 16,
              border: '2px solid #e5e7eb',
              boxShadow: '0 4px 24px 0 rgba(22,163,74,0.08)',
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              background: '#fff',
              color: '#16a34a',
              boxShadow: '0 2px 8px 0 rgba(22,163,74,0.12)',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: '#fff',
              color: '#18181b',
              borderRadius: 16,
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              color: '#18181b',
            },
            input: {
              color: '#18181b',
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: '#16a34a',
            },
          },
        },
        MuiSelect: {
          styleOverrides: {
            icon: {
              color: '#16a34a',
            },
          },
        },
        MuiCheckbox: {
          styleOverrides: {
            root: {
              color: '#16a34a',
            },
          },
        },
        MuiFormLabel: {
          styleOverrides: {
            root: {
              color: '#16a34a',
            },
          },
        },
        MuiLink: {
          styleOverrides: {
            root: {
              color: '#16a34a',
              fontWeight: 700,
            },
          },
        },
      },
    };
  }
  // dark theme (current)
  return {
    palette: {
      mode,
      primary: {
        main: '#16a34a', // vivid green
        contrastText: '#fff',
      },
      secondary: {
        main: '#18181b', // deep black
        contrastText: '#16a34a',
      },
      background: {
        default: '#18181b',
        paper: '#18181b',
      },
      error: {
        main: '#ef4444',
      },
      success: {
        main: '#16a34a',
      },
      warning: {
        main: '#f59e0b',
      },
      info: {
        main: '#60a5fa',
      },
      text: {
        primary: '#fff',
        secondary: '#d1fae5',
        disabled: '#9ca3af',
      },
      divider: '#23232a',
    },
    typography: {
      fontFamily: 'Poppins, Inter, Roboto, Arial, sans-serif',
      h1: { fontWeight: 700, fontSize: '3.5rem', lineHeight: 1.15 },
      h2: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2 },
      h3: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.25 },
      h4: { fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.3 },
      h5: { fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.35 },
      h6: { fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.4 },
      button: { textTransform: 'none', fontWeight: 600, fontSize: '1rem' },
      body1: { fontSize: '1.1rem', fontWeight: 400 },
      body2: { fontSize: '1rem', fontWeight: 400 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 700,
            textTransform: 'none',
          },
          contained: {
            backgroundColor: '#16a34a',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#15803d',
              color: '#fff',
            },
          },
          outlined: {
            borderColor: '#16a34a',
            color: '#16a34a',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#16a34a',
              color: '#fff',
              borderColor: '#15803d',
            },
          },
          text: {
            color: '#16a34a',
            '&:hover': {
              backgroundColor: 'rgba(22,163,74,0.08)',
              color: '#15803d',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            borderRadius: 6,
          },
          colorPrimary: {
            backgroundColor: '#16a34a',
            color: '#fff',
          },
          colorSecondary: {
            backgroundColor: '#18181b',
            color: '#16a34a',
            border: '1px solid #16a34a',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#18181b',
            color: '#fff',
            borderRadius: 16,
            border: '2px solid #23232a',
            boxShadow: '0 4px 24px 0 rgba(22,163,74,0.08)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: '#18181b',
            color: '#16a34a',
            boxShadow: '0 2px 8px 0 rgba(22,163,74,0.12)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#18181b',
            color: '#fff',
            borderRadius: 16,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: '#fff',
          },
          input: {
            color: '#fff',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: '#16a34a',
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: '#16a34a',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: '#16a34a',
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: '#16a34a',
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: '#16a34a',
            fontWeight: 700,
          },
        },
      },
    },
  };
};

interface ThemeModeContextType {
  mode: PaletteMode;
  toggleMode: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: 'light',
  toggleMode: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const toggleMode = () => setMode((prev: PaletteMode) => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}; 