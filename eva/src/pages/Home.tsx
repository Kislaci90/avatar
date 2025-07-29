import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    useTheme
} from '@mui/material';
import {
    AccessTime,
    ArrowForward,
    AttachMoney,
    Email,
    EventAvailable,
    Language,
    LocalParking,
    LocationOn,
    MeetingRoom,
    People,
    Phone,
    Shower,
    SportsSoccer,
    Star,
    VerifiedUser
} from '@mui/icons-material';
import {Link as RouterLink} from 'react-router-dom';

const Home: React.FC = () => {
    const theme = useTheme();

    const features = [
        {
            icon: <LocationOn/>,
            title: "Prime Locations",
            description: "Find pitches in the best locations across the city with easy access and parking."
        },
        {
            icon: <LocalParking/>,
            title: "Free Parking",
            description: "Most locations offer free parking for your convenience."
        },
        {
            icon: <Shower/>,
            title: "Shower Facilities",
            description: "Clean shower and changing room facilities available at most locations."
        },
        {
            icon: <MeetingRoom/>,
            title: "Changing Rooms",
            description: "Professional changing rooms with lockers for your belongings."
        },
        {
            icon: <AccessTime/>,
            title: "24/7 Availability",
            description: "Book pitches at any time, day or night, with flexible scheduling."
        },
        {
            icon: <AttachMoney/>,
            title: "Competitive Pricing",
            description: "Get the best value with transparent pricing and no hidden fees."
        }
    ];

    const stats = [
        {number: "500+", label: "Active Pitches", icon: <SportsSoccer/>},
        {number: "50+", label: "Cities Covered", icon: <LocationOn/>},
        {number: "10K+", label: "Happy Players", icon: <People/>},
        {number: "99%", label: "Satisfaction Rate", icon: <Star/>}
    ];

    const testimonials = [
        {
            name: "Alex Johnson",
            role: "Amateur League Player",
            avatar: "AJ",
            content: "Found the perfect pitch for our weekly games. The booking process was smooth and the facilities were excellent!",
            rating: 5
        },
        {
            name: "Sarah Chen",
            role: "Team Captain",
            avatar: "SC",
            content: "Great variety of pitches and locations. The app makes it so easy to find and book exactly what we need.",
            rating: 5
        },
        {
            name: "Mike Rodriguez",
            role: "Football Coach",
            avatar: "MR",
            content: "Professional facilities at reasonable prices. Perfect for training sessions and matches.",
            rating: 5
        }
    ];

    const pitchTypes = [
        {name: "5-a-Side", description: "Perfect for small groups and quick games", color: theme.palette.primary.main},
        {name: "7-a-Side", description: "Ideal for medium-sized teams", color: theme.palette.secondary.main},
        {
            name: "11-a-Side",
            description: "Full-size pitches for competitive matches",
            color: theme.palette.success.main
        },
        {name: "Indoor", description: "Weather-proof indoor facilities", color: theme.palette.warning.main}
    ];

    return (
        <Box sx={{minHeight: '100vh', bgcolor: 'background.default'}}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
                    py: 12,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
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
                                Find Your Perfect
                                <Box component="span" sx={{color: 'success.main', display: 'block'}}>
                                    Football Pitch
                                </Box>
                            </Typography>
                            <Typography
                                variant="h5"
                                color="text.secondary"
                                mb={4}
                                sx={{lineHeight: 1.6, fontWeight: 400}}
                            >
                                Discover and book the best football pitches in your area. From 5-a-side to full-size
                                pitches,
                                we have everything you need for the beautiful game. Join thousands of players who trust
                                us
                                for their football needs.
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
                                    Browse Pitches
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
                                    Find Locations
                                </Button>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 3}}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <VerifiedUser color="success"/>
                                    <Typography variant="body2" color="text.secondary">
                                        Verified Pitches
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                                            Ready to Play?
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" mb={3}>
                                            Join thousands of players who have already discovered their perfect pitch
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
                                            Get Started Free
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
                        Trusted by Players Everywhere
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Join our growing community of football enthusiasts
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    {stats.map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
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
                            Why Choose Our Platform?
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Everything you need for the perfect football experience
                        </Typography>
                    </Box>
                    <Grid container spacing={4}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
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
                        Pitch Types Available
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        From casual games to competitive matches
                    </Typography>
                </Box>
                <Grid container spacing={4}>
                    {pitchTypes.map((type, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
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
                    <Box textAlign="center" mb={6}>
                        <Typography variant="h3" fontWeight={700} gutterBottom>
                            What Our Users Say
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Real feedback from real players
                        </Typography>
                    </Box>
                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card
                                    elevation={3}
                                    sx={{
                                        height: '100%',
                                        borderRadius: 3,
                                        p: 4,
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 6
                                        }
                                    }}
                                >
                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 3}}>
                                        <Avatar
                                            sx={{
                                                bgcolor: 'primary.main',
                                                width: 56,
                                                height: 56,
                                                mr: 2,
                                                fontSize: '1.5rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            {testimonial.avatar}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" fontWeight={600}>
                                                {testimonial.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {testimonial.role}
                                            </Typography>
                                            <Box sx={{display: 'flex', mt: 1}}>
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star key={i} sx={{color: 'warning.main', fontSize: 16}}/>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Typography variant="body1" sx={{lineHeight: 1.6, fontStyle: 'italic'}}>
                                        "{testimonial.content}"
                                    </Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
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
                        Ready to Start Playing?
                    </Typography>
                    <Typography variant="h6" sx={{mb: 4, opacity: 0.9}}>
                        Join thousands of players and discover your perfect football pitch today
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
                            Browse All Pitches
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
                            Create Account
                        </Button>
                    </Box>
                </Paper>
            </Container>

            {/* Footer Info */}
            <Box sx={{bgcolor: 'background.paper', py: 4, borderTop: `1px solid ${theme.palette.divider}`}}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                About Eva Football
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.6}}>
                                We're dedicated to connecting football players with the best pitches and facilities.
                                Our platform makes it easy to find, book, and enjoy the beautiful game.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Quick Links
                            </Typography>
                            <List dense>
                                <ListItem sx={{px: 0}}>
                                    <ListItemIcon sx={{minWidth: 32}}>
                                        <SportsSoccer fontSize="small"/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Button
                                                component={RouterLink}
                                                to="/pitches"
                                                sx={{p: 0, textTransform: 'none', color: 'inherit'}}
                                            >
                                                Find Pitches
                                            </Button>
                                        }
                                    />
                                </ListItem>
                                <ListItem sx={{px: 0}}>
                                    <ListItemIcon sx={{minWidth: 32}}>
                                        <LocationOn fontSize="small"/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Button
                                                component={RouterLink}
                                                to="/locations"
                                                sx={{p: 0, textTransform: 'none', color: 'inherit'}}
                                            >
                                                Browse Locations
                                            </Button>
                                        }
                                    />
                                </ListItem>
                                <ListItem sx={{px: 0}}>
                                    <ListItemIcon sx={{minWidth: 32}}>
                                        <EventAvailable fontSize="small"/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Button
                                                component={RouterLink}
                                                to="/register"
                                                sx={{p: 0, textTransform: 'none', color: 'inherit'}}
                                            >
                                                Join Now
                                            </Button>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Contact & Support
                            </Typography>
                            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <Email fontSize="small" color="action"/>
                                    <Typography variant="body2" color="text.secondary">
                                        support@evafootball.com
                                    </Typography>
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <Phone fontSize="small" color="action"/>
                                    <Typography variant="body2" color="text.secondary">
                                        +1 (555) 123-4567
                                    </Typography>
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <Language fontSize="small" color="action"/>
                                    <Typography variant="body2" color="text.secondary">
                                        www.evafootball.com
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default Home; 