import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#5a7539',
            contrastText: '#ffffff',
        },
        info: {
            main: '#477572',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#f9a825',
            contrastText: '#ffffff',
        },
        error: {
            main: '#740006',
            contrastText: '#ffffff',
        },
        success: {
            main: '#cdeda3',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#667157',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f9faef',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: `'Montserrat', sans-serif`,

        h1: {
            fontSize: '3rem',
            fontWeight: 700,
            color: '#5a7539',
        },
        h2: {
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#667157',
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#2f312a',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#2f312a',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '#2f312a',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
            color: '#2f312a',
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            color: '#2f312a',
        },
        subtitle2: {
            fontSize: '0.9rem',
            fontWeight: 400,
            color: '#2f312a',
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            color: '#2f312a',
        },
        body2: {
            fontSize: '0.9rem',
            fontWeight: 400,
            color: grey[700],
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            color: '#ffffff',
        },
        caption: {
            fontSize: '0.8rem',
            color: grey[600],
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    paddingLeft: 20,
                    paddingRight: 20,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    fontWeight: 500,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 16,
                    padding: 16,
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