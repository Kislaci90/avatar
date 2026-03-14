import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#121212',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#FF6D00',
            contrastText: '#000000',
        },
        info: {
            main: '#2979FF',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#FFA726',
            contrastText: '#000000',
        },
        error: {
            main: '#E53935',
            contrastText: '#ffffff',
        },
        success: {
            main: '#00C853',
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