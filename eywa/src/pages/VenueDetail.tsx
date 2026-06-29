import React from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useQuery} from "@apollo/client/react";
import {useTranslation} from 'react-i18next';
import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import {ArrowBack, Email, Favorite, LocationOn, SportsSoccer, Terrain} from '@mui/icons-material';
import {getSurfaceTypeColor} from "../services/venues.ts";
import {locationAmenityIconMap, venuePropertyIconMap} from "../components/PropertyMap.tsx";
import PitchSvg from "../components/PitchSvg.tsx";
import theme from "../theme/theme.ts";
import {graphql} from "../generated";
import {GetVenueDocument} from "../generated/graphql.ts";
import {SectionHeader} from "../components/SectionHeader.tsx";

graphql(`
    query GetVenue($id: Int!) {
        getVenue(id: $id) {
            id
            name
            description
            venueType
            surfaceType
            properties
            location {
                id
                name
                address {
                    addressLine
                    city
                    postalCode
                }
                contact {
                    contactName
                    email
                }
                amenities
            }
        }
    }
`);

const VenueDetail: React.FC = () => {
    const {t} = useTranslation();
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const numericId = id ? Number.parseInt(id, 10) : 0;
    const {loading, error, data} = useQuery(GetVenueDocument, {variables: {id: numericId}, skip: !numericId});

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

    if (!data?.getVenue) return (
        <Container maxWidth="md" sx={{py: 8}}>
            <Alert severity="info" sx={{fontSize: '1.1rem', py: 2}}>
                {t('errors.notFound')}
            </Alert>
        </Container>
    );

    const venue = data.getVenue;

    return (
        <Box>
            {/* Enhanced Hero Section */}
            <Box sx={{
                position: 'relative',
                height: '500px',
                backgroundImage: `url('/location_stock.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)`,
                    zIndex: 1,
                }
            }}>
                {/* Back Button */}
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                        zIndex: 2,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,1)',
                        }
                    }}
                    onClick={() => navigate(-1)}
                >
                    <ArrowBack color="primary"/>
                </IconButton>

                {/* Favorite Button */}
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        zIndex: 2,
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,1)',
                        }
                    }}
                >
                    <Favorite color="secondary"/>
                </IconButton>

                {/* Title and Subtitle Overlay */}
                <Box sx={{
                    position: 'absolute',
                    bottom: 40,
                    left: 0,
                    right: 0,
                    zIndex: 2,
                    color: 'white',
                    px: 4,
                }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            mb: 1,
                            fontSize: {xs: '1.8rem', sm: '2.5rem', md: '3rem'},
                            letterSpacing: '-0.5px'
                        }}
                    >
                        {venue.name}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 400,
                            fontSize: {xs: '0.95rem', md: '1.1rem'},
                            opacity: 0.9
                        }}
                    >
                        {venue.venueType} • {venue.surfaceType}
                    </Typography>
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{py: 6}}>
                <Grid container spacing={4}>
                    <Grid size={{xs: 12, md: 8}}>
                        {/* Overview Section */}
                        <SectionHeader translateKey={'common.overview'}/>

                        <Grid container spacing={2} sx={{mb: 4}}>
                            <Grid size={{xs: 12, sm: 6}}>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <SportsSoccer color="primary"/>
                                        </ListItemIcon>
                                        <ListItemText primary={venue.venueType} secondary="Type"/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Terrain color="primary"/>
                                        </ListItemIcon>
                                        <ListItemText primary={venue.surfaceType} secondary="Surface type"/>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid size={{xs: 12, sm: 6}}>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationOn color="primary"/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={venue.location.address.addressLine}
                                            secondary={t('locations.address')}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Email color="primary"/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={venue.location.contact.email}
                                            secondary={t('locations.email')}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>

                        <SectionHeader translateKey={'common.description'}/>
                        <Box sx={{display: 'flex', justifyContent: 'left', mb: 6}}>
                            <Typography variant="body1" component="p" sx={{lineHeight: 1.8, color: 'text.secondary'}}>
                                {venue.description}
                            </Typography>
                        </Box>

                        <SectionHeader translateKey={'venues.properties'}/>

                        <Grid container spacing={2} sx={{mt: 0.5}}>
                            {venue.properties.map((property) => (
                                <ListItem key={property}>
                                    <ListItemIcon>
                                        {venuePropertyIconMap[property]}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={property}
                                        secondary="Description for property"
                                    />
                                </ListItem>
                            ))}
                            {venue.location.amenities.map((amenity) => (
                                <ListItem key={amenity}>
                                    <ListItemIcon>
                                        {locationAmenityIconMap[amenity]}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={amenity}
                                        secondary="Description for property"
                                    />
                                </ListItem>
                            ))}
                        </Grid>
                    </Grid>

                    <Grid size={{xs: 12, md: 4}}>
                        <Box sx={{position: 'sticky', top: 24, mt: {xs: 2, md: 6}}}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: 2,
                                    backgroundColor: `${getSurfaceTypeColor(venue.surfaceType || '')}06`,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <Typography variant="h6" sx={{mb: 2, fontWeight: 700, letterSpacing: '-0.3px'}}>
                                    {t('venues.details')}
                                </Typography>
                                <PitchSvg backgroundColor={getSurfaceTypeColor(venue.surfaceType || '')}/>
                                <Box sx={{mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5}}>
                                    <Typography variant="body2" sx={{fontWeight: 600}}>
                                        {venue.location.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {venue.location.address.city}{venue.location.address.postalCode ? `, ${venue.location.address.postalCode}` : ''}
                                    </Typography>
                                    <Typography
                                        component={Link}
                                        to={`/locations/${venue.location.id}`}
                                        sx={{
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            color: `${theme.palette.primary.main}`,
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                                opacity: 0.8
                                            }
                                        }}
                                    >
                                        {t('venues.viewLocation')}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default VenueDetail;