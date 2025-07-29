import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';
import {
    Alert,
    Avatar,
    Box,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    Container,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Tab,
    Tabs,
    Typography,
    useTheme
} from '@mui/material';
import {
    Close,
    Email,
    Lightbulb,
    LocalParking,
    LocationOn,
    MeetingRoom,
    NavigateBefore,
    NavigateNext,
    Shower,
    SportsSoccer
} from '@mui/icons-material';

const GET_PITCH = gql`
    query GetPitch($id: ID!) {
        pitch(id: $id) {
            id
            name
            description
            pricePerHour
            pitchType
            surfaceType
            capacity
            hasLighting
            imageUrls
            owner {
                id
                username
                email
            }
            location {
                address
                postalCode
                hasParking
                hasShowers
                hasChangingRooms
            }
        }
    }
`;

const PitchDetail: React.FC = () => {
    const theme = useTheme();
    const {id} = useParams<{ id: string }>();
    const {loading, error, data} = useQuery(GET_PITCH, {variables: {id}});
    const [selectedImage, setSelectedImage] = useState(0);
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    const getFallbackImage = (pitchType: string) => {
        const images = {
            'FULL_SIZE': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80&auto=format',
            'HALF_SIZE': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80&auto=format',
            'FIVE_A_SIDE': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80&auto=format',
            'SEVEN_A_SIDE': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80&auto=format',
            'INDOOR': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80&auto=format',
            'OUTDOOR': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80&auto=format'
        };
        return images[pitchType as keyof typeof images] || images['FULL_SIZE'];
    };

    if (loading) return (
        <Box sx={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress size={60}/>
        </Box>
    );

    if (error) return (
        <Container maxWidth="md" sx={{py: 8}}>
            <Alert severity="error" sx={{fontSize: '1.1rem', py: 2}}>
                {error.message}
            </Alert>
        </Container>
    );

    if (!data?.pitch) return (
        <Container maxWidth="md" sx={{py: 8}}>
            <Alert severity="info" sx={{fontSize: '1.1rem', py: 2}}>
                Pitch not found
            </Alert>
        </Container>
    );

    const pitch = data.pitch;
    const images = pitch.imageUrls && pitch.imageUrls.length > 0 ? pitch.imageUrls : [getFallbackImage(pitch.pitchType)];

    const handleImageChange = (direction: 'next' | 'prev') => {
        if (direction === 'next') {
            setSelectedImage((prev) => (prev + 1) % images.length);
        } else {
            setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    const features = [
        {icon: <Lightbulb/>, label: 'Lighting', available: pitch.hasLighting},
        {icon: <LocalParking/>, label: 'Parking', available: pitch.location?.hasParking},
        {icon: <Shower/>, label: 'Showers', available: pitch.location?.hasShowers},
        {icon: <MeetingRoom/>, label: 'Changing Rooms', available: pitch.location?.hasChangingRooms},
    ].filter(feature => feature.available);

    return (
        <Box sx={{minHeight: '100vh', bgcolor: 'background.default', py: 6}}>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Paper elevation={0}
                       sx={{borderRadius: 4, overflow: 'hidden', mb: 6, border: `1px solid ${theme.palette.divider}`}}>
                    {/* Main Image */}
                    <Box sx={{position: 'relative', height: {xs: 300, md: 500}}}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image={images[selectedImage]}
                            alt={pitch.name}
                            sx={{objectFit: 'cover'}}
                        />

                        {/* Image Navigation */}
                        {images.length > 1 && (
                            <>
                                <IconButton
                                    onClick={() => handleImageChange('prev')}
                                    sx={{
                                        position: 'absolute',
                                        left: 16,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                                        '&:hover': {bgcolor: 'rgba(255, 255, 255, 1)'}
                                    }}
                                >
                                    <NavigateBefore/>
                                </IconButton>
                                <IconButton
                                    onClick={() => handleImageChange('next')}
                                    sx={{
                                        position: 'absolute',
                                        right: 16,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                                        '&:hover': {bgcolor: 'rgba(255, 255, 255, 1)'}
                                    }}
                                >
                                    <NavigateNext/>
                                </IconButton>

                                {/* Image Counter */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: 16,
                                        right: 16,
                                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                                        color: 'white',
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {selectedImage + 1} / {images.length}
                                </Box>
                            </>
                        )}

                        {/* Price Badge */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 24,
                                right: 24,
                                bgcolor: theme.palette.primary.main,
                                color: 'white',
                                px: 3,
                                py: 1.5,
                                borderRadius: 3,
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                boxShadow: `0 8px 24px ${theme.palette.primary.main}4d`
                            }}
                        >
                            £{pitch.pricePerHour}/hour
                        </Box>
                    </Box>

                    {/* Content Section */}
                    <CardContent sx={{p: {xs: 3, md: 6}}}>
                        <Grid container spacing={6}>
                            {/* Main Content */}
                            <Grid item xs={12} md={8}>
                                <Box sx={{mb: 4}}>
                                    <Typography variant="h3" fontWeight={800} color="text.primary"
                                                sx={{mb: 2, lineHeight: 1.2}}>
                                        {pitch.name}
                                    </Typography>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 3}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                            <LocationOn sx={{color: theme.palette.primary.main}}/>
                                            <Typography variant="h6" color="text.secondary">
                                                {pitch.location?.address}
                                            </Typography>
                                        </Box>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                            <SportsSoccer sx={{color: theme.palette.primary.main}}/>
                                            <Typography variant="h6" color="text.secondary">
                                                {pitch.pitchType?.replace('_', ' ')}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Typography variant="body1"
                                                sx={{color: 'text.secondary', lineHeight: 1.8, fontSize: '1.1rem'}}>
                                        {pitch.description}
                                    </Typography>
                                </Box>

                                {/* Tabs */}
                                <Box sx={{borderBottom: 1, borderColor: theme.palette.divider, mb: 4}}>
                                    <Tabs
                                        value={activeTab}
                                        onChange={(e, newValue) => setActiveTab(newValue)}
                                        sx={{
                                            '& .MuiTab-root': {
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                color: 'text.secondary',
                                                '&.Mui-selected': {
                                                    color: theme.palette.primary.main
                                                }
                                            }
                                        }}
                                    >
                                        <Tab label="Details"/>
                                        <Tab label="Location"/>
                                        <Tab label="Owner"/>
                                    </Tabs>
                                </Box>

                                {/* Tab Content */}
                                {activeTab === 0 && (
                                    <Box>
                                        <Typography variant="h5" fontWeight={700} sx={{mb: 3, color: 'text.primary'}}>
                                            Pitch Details
                                        </Typography>
                                        <Grid container spacing={3} sx={{mb: 4}}>
                                            <Grid item xs={12} sm={6}>
                                                <Paper elevation={0} sx={{
                                                    p: 3,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    borderRadius: 3
                                                }}>
                                                    <Typography variant="h6" fontWeight={600}
                                                                sx={{mb: 2, color: 'text.primary'}}>
                                                        Surface Type
                                                    </Typography>
                                                    <Chip
                                                        label={pitch.surfaceType?.replace('_', ' ')}
                                                        sx={{
                                                            bgcolor: theme.palette.warning.main,
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '1rem',
                                                            py: 1
                                                        }}
                                                    />
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Paper elevation={0} sx={{
                                                    p: 3,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    borderRadius: 3
                                                }}>
                                                    <Typography variant="h6" fontWeight={600}
                                                                sx={{mb: 2, color: 'text.primary'}}>
                                                        Capacity
                                                    </Typography>
                                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                        <Box sx={{
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: '50%',
                                                            bgcolor: theme.palette.primary.main,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: 'white',
                                                            fontWeight: 700
                                                        }}>
                                                            {pitch.capacity}
                                                        </Box>
                                                        <Typography variant="body1" fontWeight={600}
                                                                    color="text.primary">
                                                            Players
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        </Grid>

                                        <Typography variant="h5" fontWeight={700} sx={{mb: 3, color: 'text.primary'}}>
                                            Facilities
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {features.map((feature, index) => (
                                                <Grid item xs={6} sm={4} md={3} key={index}>
                                                    <Paper elevation={0} sx={{
                                                        p: 3,
                                                        border: `1px solid ${theme.palette.divider}`,
                                                        borderRadius: 3,
                                                        textAlign: 'center',
                                                        transition: 'all 0.2s',
                                                        '&:hover': {
                                                            borderColor: theme.palette.primary.main,
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                                                        }
                                                    }}>
                                                        <Box sx={{color: theme.palette.primary.main, mb: 1}}>
                                                            {feature.icon}
                                                        </Box>
                                                        <Typography variant="body2" fontWeight={600}
                                                                    color="text.primary">
                                                            {feature.label}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                )}

                                {activeTab === 1 && (
                                    <Box>
                                        <Typography variant="h5" fontWeight={700} sx={{mb: 3, color: 'text.primary'}}>
                                            Location
                                        </Typography>
                                        <Paper elevation={0} sx={{
                                            p: 4,
                                            border: `1px solid ${theme.palette.divider}`,
                                            borderRadius: 3
                                        }}>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 3}}>
                                                <LocationOn sx={{color: theme.palette.primary.main, fontSize: 28}}/>
                                                <Typography variant="h6" fontWeight={600} color="text.primary">
                                                    Address
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1"
                                                        sx={{color: 'text.secondary', lineHeight: 1.8, mb: 2}}>
                                                {pitch.location?.address}
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{color: 'text.secondary', lineHeight: 1.8, mb: 1}}>
                                                {pitch.location?.city}
                                            </Typography>
                                            {pitch.location?.postalCode && (
                                                <Typography variant="body1"
                                                            sx={{color: 'text.secondary', lineHeight: 1.8, mb: 1}}>
                                                    {pitch.location?.postalCode}
                                                </Typography>
                                            )}
                                            {pitch.location?.country && (
                                                <Typography variant="body1"
                                                            sx={{color: 'text.secondary', lineHeight: 1.8}}>
                                                    {pitch.location?.country}
                                                </Typography>
                                            )}
                                        </Paper>
                                    </Box>
                                )}

                                {activeTab === 2 && (
                                    <Box>
                                        <Typography variant="h5" fontWeight={700} sx={{mb: 3, color: 'text.primary'}}>
                                            Owner Information
                                        </Typography>
                                        <Paper elevation={0} sx={{
                                            p: 4,
                                            border: `1px solid ${theme.palette.divider}`,
                                            borderRadius: 3
                                        }}>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 3, mb: 3}}>
                                                <Avatar
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        bgcolor: theme.palette.primary.main,
                                                        color: 'white',
                                                        fontWeight: 700,
                                                        fontSize: '2rem'
                                                    }}
                                                >
                                                    {pitch.owner.username[0].toUpperCase()}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="h5" fontWeight={700} color="text.primary">
                                                        {pitch.owner.username}
                                                    </Typography>
                                                    <Typography variant="body1" color="text.secondary">
                                                        Pitch Owner
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                                                <Email sx={{color: theme.palette.primary.main}}/>
                                                <Typography variant="body1" color="text.primary">
                                                    {pitch.owner.email}
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Box>
                                )}
                            </Grid>

                            {/* Sidebar */}
                            <Grid item xs={12} md={4}>
                                <Box sx={{position: 'sticky', top: 24}}>
                                    <Paper elevation={0}
                                           sx={{p: 4, border: `1px solid ${theme.palette.divider}`, borderRadius: 3}}>
                                        <Typography variant="h5" fontWeight={700} sx={{mb: 3, color: 'text.primary'}}>
                                            Quick Info
                                        </Typography>
                                        <List dense>
                                            <ListItem sx={{px: 0}}>
                                                <ListItemIcon sx={{minWidth: 40}}>
                                                    <SportsSoccer sx={{color: theme.palette.primary.main}}/>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={pitch.pitchType?.replace('_', ' ')}
                                                    primaryTypographyProps={{color: 'text.primary', fontWeight: 500}}
                                                />
                                            </ListItem>
                                            <ListItem sx={{px: 0}}>
                                                <ListItemIcon sx={{minWidth: 40}}>
                                                    <LocationOn sx={{color: theme.palette.primary.main}}/>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={pitch.location?.city}
                                                    primaryTypographyProps={{color: 'text.primary', fontWeight: 500}}
                                                />
                                            </ListItem>
                                            {pitch.capacity && (
                                                <ListItem sx={{px: 0}}>
                                                    <ListItemIcon sx={{minWidth: 40}}>
                                                        <Box sx={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: '50%',
                                                            bgcolor: theme.palette.primary.main,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: 'white',
                                                            fontSize: '0.7rem',
                                                            fontWeight: 700
                                                        }}>
                                                            {pitch.capacity}
                                                        </Box>
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={`${pitch.capacity} players`}
                                                        primaryTypographyProps={{
                                                            color: 'text.primary',
                                                            fontWeight: 500
                                                        }}
                                                    />
                                                </ListItem>
                                            )}
                                        </List>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Paper>
            </Container>

            {/* Image Gallery Dialog */}
            <Dialog
                open={imageDialogOpen}
                onClose={() => setImageDialogOpen(false)}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent sx={{p: 0, position: 'relative'}}>
                    <IconButton
                        onClick={() => setImageDialogOpen(false)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            zIndex: 1,
                            '&:hover': {bgcolor: 'rgba(0, 0, 0, 0.7)'}
                        }}
                    >
                        <Close/>
                    </IconButton>
                    <CardMedia
                        component="img"
                        image={images[selectedImage]}
                        alt={pitch.name}
                        sx={{width: '100%', height: 'auto'}}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default PitchDetail; 