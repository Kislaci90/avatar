import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useMutation} from '@apollo/client/react';
import {Box, Button, CircularProgress, Container, Paper, Typography} from '@mui/material';
import {CheckCircle, Error} from '@mui/icons-material';
import {gql} from "@apollo/client";

const VERIFY_EMAIL_MUTATION = gql`
    mutation VerifyEmail($token: String!) {
        verifyEmail(token: $token)
    }
`;

const VerifyEmail: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your email...');

    const [verifyEmail] = useMutation(VERIFY_EMAIL_MUTATION, {
        onCompleted: () => {
            setStatus('success');
            setMessage('Email verified successfully! Redirecting to home...');
            setTimeout(() => navigate('/'), 3000);
        },
        onError: (error) => {
            setStatus('error');
            setMessage(error.message || 'Verification failed. Token may be expired.');
        }
    });

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setStatus('error');
            setMessage('No verification token provided');
            return;
        }

        verifyEmail({variables: {token}});
    }, [searchParams, verifyEmail]);

    return (
        <Container component="main" maxWidth="sm">
            <Box sx={{
                mt: 8,
                mb: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Paper sx={{
                    p: 4,
                    textAlign: 'center',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {status === 'loading' && <CircularProgress/>}
                    {status === 'success' && <CheckCircle sx={{fontSize: 64, color: 'success.main', mb: 2}}/>}
                    {status === 'error' && <Error sx={{fontSize: 64, color: 'error.main', mb: 2}}/>}

                    <Typography variant="h5" sx={{mt: 2, mb: 2}}>
                        {message}
                    </Typography>

                    {status === 'error' && (
                        <Button
                            variant="contained"
                            onClick={() => navigate('/register')}
                            sx={{mt: 2}}
                        >
                            Back to Register
                        </Button>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default VerifyEmail;

