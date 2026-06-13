import React, {useState} from 'react';
import {useMutation} from "@apollo/client/react";
import {Link, useNavigate} from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import {Email, Lock, PersonAdd, Visibility, VisibilityOff} from '@mui/icons-material';
import type {RegisterUserInput} from "../services/users.ts";
import {graphql} from "../generated";
import {RegisterDocument} from "../generated/graphql.ts";

graphql(`
    mutation Register($registerUserInput: RegisterUserInput!) {
        register(registerUserInput: $registerUserInput) {
            success
            message
            loginResponse {
                token
                expiresIn
            }
        }
    }
`);

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [registerUserInput, setRegisterUserInput] = useState<RegisterUserInput>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    })
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');

    const [register, {loading}] = useMutation(RegisterDocument, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.register.loginResponse.token);
            navigate('/');
            globalThis.location.reload();
        },
        onError: (error) => {
            setError(error.message);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        register({
            variables: {
                registerUserInput: registerUserInput
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterUserInput({
            ...registerUserInput,
            [e.target.name]: e.target.value
        });

        if (e.target.name === 'password') {
            validatePassword(e.target.value);
        }

        if (e.target.name === 'email') {
            validateEmail(e.target.value);
        }

        if (e.target.name === 'firstName') {
            validateFirstName(e.target.value);
        }

        if (e.target.name === 'lastName') {
            validateLastName(e.target.value);
        }
    };

    const validatePassword = (password: string) => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError('Password must contain at least one uppercase letter');
            return false;
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError('Password must contain at least one lowercase letter');
            return false;
        }
        if (!/\d/.test(password)) {
            setPasswordError('Password must contain at least one number');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validateFirstName = (firstName: string) => {
        if (!firstName) {
            setFirstNameError('Please enter first name');
            return false
        }
        setFirstNameError('')
        return true
    }

    const validateLastName = (lastName: string) => {
        if (!lastName) {
            setLastNameError('Please enter last name');
            return false
        }
        setLastNameError('')
        return true
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            borderRadius: '50%',
                            width: 56,
                            height: 56,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                        }}
                    >
                        <PersonAdd sx={{color: 'white', fontSize: 28}}/>
                    </Box>

                    <Typography component="h1" variant="h5" sx={{mb: 3}}>
                        Create your account
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{width: '100%', mb: 2}}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{width: '100%'}}>
                        <Grid container spacing={2} sx={{mt: 0}}>
                            <Grid size={{xs: 12, sm: 6}}>
                                <TextField
                                    error={!!firstNameError}
                                    helperText={firstNameError}
                                    margin="normal"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="given-name"
                                    value={registerUserInput.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={{xs: 12, sm: 6}}>
                                <TextField
                                    error={!!lastNameError}
                                    helperText={lastNameError}
                                    margin="normal"
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={registerUserInput.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            error={!!emailError}
                            helperText={emailError}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            type="email"
                            value={registerUserInput.email}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: <Email sx={{mr: 1, color: 'text.secondary'}}/>
                                }
                            }}
                        />

                        <TextField
                            error={!!passwordError}
                            helperText={passwordError}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="new-password"
                            value={registerUserInput.password}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: <Lock sx={{mr: 1, color: 'text.secondary'}}/>,
                                    endAdornment: (
                                        <Button
                                            onClick={handleClickShowPassword}
                                            sx={{minWidth: 'auto', p: 0.5}}
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </Button>
                                    )
                                }
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit"/>
                            ) : (
                                'Create Account'
                            )}
                        </Button>

                        <Divider sx={{my: 2}}>
                            <Typography variant="body2" color="text.secondary">
                                OR
                            </Typography>
                        </Divider>

                        <Box sx={{textAlign: 'center'}}>
                            <Typography variant="body2" color="text.secondary">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    style={{
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                    }}
                                >
                                    Sign in here
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Register; 