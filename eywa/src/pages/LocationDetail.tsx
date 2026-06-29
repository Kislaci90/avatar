import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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
    Typography,
} from '@mui/material';
import {ArrowBack, Email, Favorite, Home, LocationOn, Person, Phone, SportsSoccer} from "@mui/icons-material";
import theme from "../theme/theme.ts";
import {LocationDetailVenueCard} from "../components/location/detail/LocationDetailVenueCard.tsx";
import {graphql} from "../generated";
import {GetLocationDocument} from "../generated/graphql.ts";
import type {VenueView} from "../generated/graphql-schema.ts";
import {SectionHeader} from "../components/SectionHeader.tsx";
import {getLocationAmenityIcon} from "../components/PropertyMap.tsx";

graphql(`
    query GetLocation($id: Int!) {
        getLocation(id: $id) {
            id
            name
            description
            website
            address {
                addressLine
                postalCode
                city
            }
            contact {
                contactName
                email
                phoneNumber
            }
            geom {
                x
                y
            }
            amenities
            venues {
                id
                name
                surfaceType
                description
                venueType
                properties
                location {
                    id
                    name
                    description
                    website
                    contact {
                        contactName
                        email
                        phoneNumber
                    }
                    address {
                        addressLine
                        postalCode
                        city
                    }
                    geom {
                        x
                        y
                    }
                    amenities
                }
            }
        }
    }
`);

const LocationDetail: React.FC = () => {
    const {t} = useTranslation();
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const numericId = id ? Number.parseInt(id, 10) : 0;

    const {loading, error, data} = useQuery(GetLocationDocument, {
        variables: {id: numericId},
        skip: !numericId,
    });

    if (loading) {
        return (
            <Box>
                <CircularProgress size={60}/>
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{py: 4}}>
                <Alert severity="error" sx={{mb: 4}}>
                    {error.message}
                </Alert>
            </Container>
        );
    }

    if (!data?.getLocation) {
        return (
            <Container maxWidth="lg" sx={{py: 4}}>
                <Alert severity="warning">
                    {t('errors.notFound')}
                </Alert>
            </Container>
        );
    }

    const location = data.getLocation;

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
                        {location.name}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 400,
                            fontSize: {xs: '0.95rem', md: '1.1rem'},
                            opacity: 0.9
                        }}
                    >
                        {location.address.city} • {location.address.postalCode}
                    </Typography>
                </Box>
            </Box>

            <Container maxWidth="lg" sx={{py: 6}}>
                <Grid container spacing={4}>
                    <Grid size={{xs: 12, md: 8}}>
                        <SectionHeader translateKey={'common.overview'}/>

                        <Box>
                            <Grid container spacing={3}>
                                <Grid size={{xs: 12, md: 6}}>
                                    <List sx={{
                                        bgcolor: `${theme.palette.primary.main}08`,
                                        borderRadius: 2,
                                        p: 2
                                    }}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Person color="primary"/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={location.contact.contactName}
                                                secondary={t('locations.contactName')}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Email color="primary"/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={location.contact.email}
                                                secondary={t('locations.email')}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Phone color="primary"/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={location.contact.phoneNumber}
                                                secondary={t('locations.phoneNumber')}
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid size={{xs: 12, md: 6}}>
                                    <List sx={{
                                        bgcolor: `${theme.palette.secondary.main}08`,
                                        borderRadius: 2,
                                        p: 2
                                    }}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <LocationOn color="primary"/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={location.address.addressLine}
                                                secondary="Address"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Home color="primary"/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={location.website}
                                                secondary="Website"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <SportsSoccer color="primary"/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={location.venues.length}
                                                secondary={t('locations.pitches')}
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </Box>

                        <SectionHeader translateKey={'locations.description'}/>

                        <Box sx={{display: 'flex', justifyContent: 'left', mt: 2}}>
                            <Typography variant="body1" component="p" sx={{lineHeight: 1.8, color: 'text.secondary'}}>
                                {location.description}
                            </Typography>
                        </Box>

                        <SectionHeader translateKey={'locations.properties'}/>
                        <Box>
                            <List dense>
                                {location.amenities.map((amenity) => (
                                    <ListItem key={amenity}>
                                        <ListItemIcon>
                                            {getLocationAmenityIcon(amenity)}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={amenity}
                                            secondary="Description for property"
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>

                    <Grid size={{xs: 12, md: 4}}>
                        {/*<LocationDetailSendMessage/>*/}
                    </Grid>
                </Grid>

                {location.venues.length > 0 && (
                    <Box sx={{mt: 8}}>
                        <Box sx={{
                            mb: 4,
                            pb: 3,
                            borderBottom: `2px solid ${theme.palette.primary.main}`,
                        }}>
                            <Typography variant="h5" component="h2" sx={{fontWeight: 600}}>
                                {t('venues.title')} ({location.venues.length})
                            </Typography>
                        </Box>
                        <Grid container spacing={3}>
                            {location.venues.map((venue: VenueView) => (
                                <Grid size={{xs: 6}} key={venue.id}>
                                    <LocationDetailVenueCard venue={venue}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default LocationDetail;
