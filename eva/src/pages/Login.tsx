import React, {useState} from 'react';
import {gql} from '@apollo/client';
import {useMutation} from '@apollo/client/react';
import {Link, useNavigate} from 'react-router-dom';
import {Alert, Box, Button, CircularProgress, Container, Divider, Paper, TextField, Typography} from '@mui/material';
import {LockOutlined, Person, Visibility, VisibilityOff} from '@mui/icons-material';
import type {LoginResult} from "../services/users.ts";

const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            expiresIn
        }
    }
`;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [login, {loading}] = useMutation<LoginResult>(LOGIN_MUTATION, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.login.token);
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
        login({
            variables: {
                username: formData.username,
                password: formData.password
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
        <Container component="main" maxWidth="xs">
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
                        <LockOutlined sx={{color: 'white', fontSize: 28}}/>
                    </Box>

                    <Typography component="h1" variant="h5" sx={{mb: 3}}>
                        Sign in to your account
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
                            slotProps={{
                                input: {
                                    startAdornment: <Person sx={{mr: 1, color: 'text.secondary'}}/>,
                                }
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
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <Button
                                            onClick={handleClickShowPassword}
                                            sx={{minWidth: 'auto', p: 0.5}}
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </Button>
                                    ),
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
                                'Sign In'
                            )}
                        </Button>

                        <Divider sx={{my: 2}}>
                            <Typography variant="body2" color="text.secondary">
                                OR
                            </Typography>
                        </Divider>

                        <Box sx={{textAlign: 'center'}}>
                            <Typography variant="body2" color="text.secondary">
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    style={{
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                    }}
                                >
                                    Sign up here
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login; 