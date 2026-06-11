import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#121212',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#FF6F00',
            light: '#FFB74D',
            dark: '#E65100',
            contrastText: '#ffffff',
        },
        info: {
            main: '#0288D1',
            light: '#81D4FA',
            dark: '#01579B',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#F57C00',
            light: '#FFB74D',
            dark: '#E65100',
            contrastText: '#ffffff',
        },
        error: {
            main: '#D32F2F',
            light: '#EF5350',
            dark: '#B71C1C',
            contrastText: '#ffffff',
        },
        success: {
            main: '#388E3C',
            light: '#66BB6A',
            dark: '#1B5E20',
            contrastText: '#ffffff',
        },
        background: {
            default: '#F5F5F5',
            paper: '#ffffff',
        },
        text: {
            primary: '#121212',
            secondary: '#555555',
        },
    },
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
        h1: { fontWeight: 800, textTransform: 'uppercase' },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        body1: { fontSize: '1rem', fontFamily: 'Inter, sans-serif' },
        body2: { fontSize: '0.9rem', color: '#555555' },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    fontWeight: 500,
                    textTransform: 'capitalize',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
                size: 'medium',
            },
        },
    },
});

export default theme;