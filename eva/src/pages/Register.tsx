import React, {useState} from 'react';
import {gql} from '@apollo/client';
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
import {Email, Lock, Person, PersonAdd, Phone, Visibility, VisibilityOff} from '@mui/icons-material';
import type {RegisterResult} from "../services/users.ts";

const REGISTER_MUTATION = gql`
    mutation Register($input: UserInput!) {
        register(input: $input) {
            token
            type
            user {
                id
                username
                email
                role
            }
        }
    }
`;

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [register, {loading}] = useMutation<RegisterResult, {input: typeof formData}>(REGISTER_MUTATION, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.register.token);
            navigate('/');
            window.location.reload();
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
                input: formData
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={formData.username}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <Person sx={{mr: 1, color: 'text.secondary'}}/>,
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <Email sx={{mr: 1, color: 'text.secondary'}}/>,
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <Lock sx={{mr: 1, color: 'text.secondary'}}/>,
                                endAdornment: (
                                    <Button
                                        onClick={handleClickShowPassword}
                                        sx={{minWidth: 'auto', p: 0.5}}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </Button>
                                ),
                            }}
                        />

                        <Grid container spacing={2} sx={{mt: 0}}>
                            <Grid size={{xs: 12, sm: 6}}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="given-name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={{xs: 12, sm: 6}}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            margin="normal"
                            fullWidth
                            id="phoneNumber"
                            label="Phone Number"
                            name="phoneNumber"
                            autoComplete="tel"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <Phone sx={{mr: 1, color: 'text.secondary'}}/>,
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