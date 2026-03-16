import React from 'react';
import {Box, Button, Card, CardContent, Container, Grid, Paper, Typography, useTheme} from '@mui/material';
import {
    ArrowForward,
    LocalParking,
    LocationCity,
    LocationOn,
    People,
    Shower,
    SportsSoccer,
    VerifiedUser
} from '@mui/icons-material';
import {Link as RouterLink} from 'react-router-dom';
import {gql} from "@apollo/client";
import {useQuery} from "@apollo/client/react";
import {useTranslation} from 'react-i18next';
import type {HomeStatResult} from "../services/home.ts";

const GET_HOME_STAT = gql`
    query GetHomeStat {
        getHomeStat {
            totalPitches
            totalLocations
            totalCities
            totalUsers
        }
    }
`

const Home: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation();

    const {data} = useQuery<HomeStatResult>(GET_HOME_STAT);

    let homeStat = {
        totalPitches: 0,
        totalLocations: 0,
        totalCities: 0,
        totalUsers: 0,
    };

    if (data?.getHomeStat) {
        homeStat = data?.getHomeStat;
    }

    const features = [
        {
            icon: <LocationOn/>,
            title: t('home.primeLocations'),
            description: t('home.primeLocationsDesc')
        },
        {
            icon: <LocalParking/>,
            title: t('home.freeParking'),
            description: t('home.freeParkingDesc')
        },
        {
            icon: <Shower/>,
            title: t('home.showerFacilities'),
            description: t('home.showerFacilitiesDesc')
        }
    ];

    const stats = [
        {number: homeStat.totalPitches, label: t('home.activePitches'), icon: <SportsSoccer/>},
        {number: homeStat.totalLocations, label: t('navigation.locations'), icon: <LocationOn/>},
        {number: homeStat.totalCities, label: t('home.citiesCovered'), icon: <LocationCity/>},
        {number: homeStat.totalUsers, label: t('home.happyPlayers'), icon: <People/>},
    ];

    const pitchTypes = [
        {name: t('home.fiveASide'), description: t('home.fiveASideDesc'), color: theme.palette.primary.main},
        {name: t('home.sevenASide'), description: t('home.sevenASideDesc'), color: theme.palette.secondary.main},
        {
            name: t('home.elevenASide'),
            description: t('home.elevenASideDesc'),
            color: theme.palette.success.main
        },
        {name: t('home.indoor'), description: t('home.indoorDesc'), color: theme.palette.warning.main}
    ];

    return (
        <Box sx={{minHeight: '100vh'}}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}15 100%)`,
                    py: 12,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{xs:12, md:6}}>
                            <Typography
                                variant="h2"
                                fontWeight={800}
                                color="primary.main"
                                gutterBottom
                                sx={{
                                    fontSize: {xs: '2.5rem', md: '3.5rem'},
                                    lineHeight: 1.2
                                }}
                            >
                                {t('home.findYourPerfect')}
                                <Box component="span" sx={{color: 'secondary.main', display: 'block'}}>
                                    {t('home.footballPitch')}
                                </Box>
                            </Typography>
                            <Typography
                                variant="h5"
                                color="text.secondary"
                                mb={4}
                                sx={{lineHeight: 1.6, fontWeight: 400}}
                            >
                                {t('home.description')}
                            </Typography>
                            <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4}}>
                                <Button
                                    component={RouterLink}
                                    to="/pitches"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    endIcon={<ArrowForward/>}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        borderRadius: 2
                                    }}
                                >
                                    {t('home.browsePitches')}
                                </Button>
                                <Button
                                    component={RouterLink}
                                    to="/locations"
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        borderRadius: 2
                                    }}
                                >
                                    {t('home.findLocations')}
                                </Button>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 3}}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <VerifiedUser color="secondary"/>
                                    <Typography variant="body2" color="text.secondary">
                                        {t('home.verifiedPitches')}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={{xs:12, md:6}}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <Paper
                                    elevation={8}
                                    sx={{
                                        p: 4,
                                        borderRadius: 4,
                                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                                        border: `1px solid ${theme.palette.divider}`,
                                        maxWidth: 400
                                    }}
                                >
                                    <Box sx={{textAlign: 'center', mb: 3}}>
                                        <SportsSoccer sx={{fontSize: 64, color: 'primary.main', mb: 2}}/>
                                        <Typography variant="h4" fontWeight={700} gutterBottom>
                                            {t('home.readyToPlay')}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" mb={3}>
                                            {t('home.readyToPlayDesc')}
                                        </Typography>
                                        <Button
                                            component={RouterLink}
                                            to="/register"
                                            variant="contained"
                                            color="secondary"
                                            size="large"
                                            fullWidth
                                            sx={{
                                                py: 1.5,
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                borderRadius: 2
                                            }}
                                        >
                                            {t('home.getStartedFree')}
                                        </Button>
                                    </Box>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Statistics Section */}
            <Container maxWidth="lg" sx={{py: 8}}>
                <Box textAlign="center" mb={6}>
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                        {t('home.trustedByPlayers')}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {t('home.joinCommunity')}
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    {stats.map((stat, index) => (
                        <Grid size={{xs:6, md:3}} key={index}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 4,
                                    textAlign: 'center',
                                    borderRadius: 3,
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: 4
                                    }
                                }}
                            >
                                <Box sx={{color: 'primary.main', mb: 2}}>
                                    {stat.icon}
                                </Box>
                                <Typography variant="h3" fontWeight={800} color="primary.main" gutterBottom>
                                    {stat.number}
                                </Typography>
                                <Typography variant="h6" color="text.secondary">
                                    {stat.label}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Features Section */}
            <Box sx={{bgcolor: 'background.paper', py: 8}}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={6}>
                        <Typography variant="h3" fontWeight={700} gutterBottom>
                            {t('home.whyChoose')}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            {t('home.everythingYouNeed')}
                        </Typography>
                    </Box>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid size={{xs:12, sm:6, md:4}} key={index}>
                                <Card
                                    elevation={2}
                                    sx={{
                                        height: '100%',
                                        borderRadius: 3,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 6
                                        }
                                    }}
                                >
                                    <CardContent sx={{p: 4, textAlign: 'center'}}>
                                        <Box sx={{color: 'primary.main', mb: 2}}>
                                            {React.cloneElement(feature.icon, {sx: {fontSize: 48}})}
                                        </Box>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{lineHeight: 1.6}}>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Pitch Types Section */}
            <Container maxWidth="lg" sx={{py: 8}}>
                <Box textAlign="center" mb={6}>
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                        {t('home.pitchTypes')}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {t('home.fromCasualToCompetitive')}
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    {pitchTypes.map((type, index) => (
                        <Grid size={{xs:12, sm:6, md:3}} key={index}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 4,
                                    textAlign: 'center',
                                    borderRadius: 3,
                                    border: `2px solid ${type.color}20`,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        borderColor: type.color,
                                        boxShadow: 4
                                    }
                                }}
                            >
                                <Box sx={{color: type.color, mb: 2}}>
                                    <SportsSoccer sx={{fontSize: 48}}/>
                                </Box>
                                <Typography variant="h5" fontWeight={600} gutterBottom>
                                    {type.name}
                                </Typography>
                                <Typography color="text.secondary">
                                    {type.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Testimonials Section */}
            <Box sx={{bgcolor: 'background.paper', py: 8}}>
                <Container maxWidth="lg">
                </Container>
            </Box>

            {/* CTA Section */}
            <Container maxWidth="lg" sx={{py: 8}}>
                <Paper
                    elevation={4}
                    sx={{
                        p: 6,
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        color: 'white',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                        {t('home.readyToStart')}
                    </Typography>
                    <Typography variant="h6" sx={{mb: 4, opacity: 0.9}}>
                        {t('home.readyToStartDesc')}
                    </Typography>
                    <Box sx={{display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap'}}>
                        <Button
                            component={RouterLink}
                            to="/pitches"
                            variant="contained"
                            color="secondary"
                            size="large"
                            endIcon={<ArrowForward/>}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 2
                            }}
                        >
                            {t('home.browseAllPitches')}
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/register"
                            variant="outlined"
                            color="inherit"
                            size="large"
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                borderColor: 'white',
                                '&:hover': {
                                    borderColor: 'white',
                                    bgcolor: 'rgba(255,255,255,0.1)'
                                }
                            }}
                        >
                            {t('home.createAccount')}
                        </Button>
                    </Box>
                </Paper>
            </Container>

            {/* Footer Info */}

        </Box>
    );
};

export default Home; 