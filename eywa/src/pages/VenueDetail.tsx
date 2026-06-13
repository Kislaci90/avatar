import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useQuery} from "@apollo/client/react";
import {useTranslation} from 'react-i18next';
import {
    Alert,
    Box, Button,
    CircularProgress,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import {Email, Favorite, LocationOn, SportsSoccer, Terrain} from '@mui/icons-material';
import {getSurfaceTypeColor} from "../services/venues.ts";
import {locationPropertyIconMap, pitchPropertyIconMap} from "../components/PropertyMap.tsx";
import PitchSvg from "../components/PitchSvg.tsx";
import theme from "../theme/theme.ts";
import {graphql} from "../generated";
import {GetVenueDocument} from "../generated/graphql.ts";

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
    const { t } = useTranslation();
    const {id} = useParams<{ id: string }>();
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
        <Box sx={{minHeight: '100vh'}}>
            <Box
                sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backgroundImage: `url('/location_stock.png')`,
                    height: '400px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid size={{xs: 12, md: 8}}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 6}}>
                            <Typography variant="h4" component="h1">
                                {venue.name}
                            </Typography>
                            <Favorite color="secondary"></Favorite>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                mt: 6,
                                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                                pt: 2,
                            }}
                        >
                            <Typography variant="h5" component="h2">
                                Overview
                            </Typography>
                        </Box>

                        <Grid container spacing={2}>
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

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                mt: 6,
                                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                                pt: 2,
                            }}
                        >
                            <Typography variant="h5" component="h2">
                                {t('locations.description')}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', justifyContent: 'left', mt: 2}}>
                            <Typography variant="body1" component="p">
                                {venue.description}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                mt: 6,
                                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                                pt: 2,
                            }}
                        >
                            <Typography variant="h5" component="h2">
                                {t('pitches.properties')}
                            </Typography>
                        </Box>

                        <Grid container spacing={2} sx={{mt: 0.5}}>
                            {venue.properties.map((property) => (
                                <ListItem key={property}>
                                    <ListItemIcon>
                                        {pitchPropertyIconMap[property]}
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
                                        {locationPropertyIconMap[amenity]}
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
                                    border: (theme) => `1px solid ${theme.palette.divider}`,
                                    borderRadius: 2,
                                }}
                            >
                                <Typography variant="h6" sx={{mb: 2}}>
                                    {t('pitches.details')}
                                </Typography>
                                <PitchSvg backgroundColor={getSurfaceTypeColor(venue.surfaceType || '')}/>
                                <Box sx={{mt: 2, display: 'flex', flexDirection: 'column', gap: 1}}>
                                    <Typography variant="body2" color="text.secondary">
                                        {venue.location.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {venue.location.address.city}{venue.location.address.postalCode ? `, ${venue.location.address.postalCode}` : ''}
                                    </Typography>
                                    <Typography
                                        component={Link}
                                        to={`/locations/${venue.location.id}`}
                                        sx={{fontWeight: 600, textDecoration: 'none'}}
                                    >
                                        View location
                                    </Typography>
                                    <Button fullWidth variant="contained" size="large">Send</Button>
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