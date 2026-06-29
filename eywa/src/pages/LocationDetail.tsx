import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from "@apollo/client/react";
import {useTranslation} from 'react-i18next';
import {
    Alert,
    Box,
    CircularProgress,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import theme from "../theme/theme.ts";
import {Email, Favorite, Home, LocationOn, Person, Phone, SportsSoccer} from "@mui/icons-material";
import {getLocationAmenityIcon} from "../components/PropertyMap.tsx";
import {LocationDetailVenueCard} from "../components/location/detail/LocationDetailVenueCard.tsx";
import {LocationDetailSendMessage} from "../components/location/detail/LocationDetailSendMessage.tsx";
import {graphql} from "../generated";
import {GetLocationDocument} from "../generated/graphql.ts";
import type {VenueView} from "../generated/graphql-schema.ts";

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
        <Container maxWidth="lg">
            <Box sx={{
                pb: 1,
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundImage: `url('/location_stock.png')`,
                objectFit: "fill",
                border: `1px solid ${theme.palette.divider}`,
                height: "400px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
            </Box>
            <Grid container spacing={2}>
                <Grid size={{xs: 6, md: 8}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 6}}>
                        <Typography variant="h4" component="h1">
                            {location.name}
                        </Typography>
                        <Favorite color="secondary"></Favorite>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        mt: 6,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        pt: 2
                    }}>
                        <Typography variant="h5" component="h1">
                            Overview
                        </Typography>
                    </Box>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid size={{xs: 6, md: 4}}>
                                <List>
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
                            <Grid size={{xs: 6, md: 4}}>
                                <List>
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

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        mt: 6,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        pt: 2
                    }}>
                        <Typography variant="h5" component="h1">
                            {t('locations.description')}
                        </Typography>
                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'left', mt: 2}}>
                        <Typography variant="body1" component="p">
                            {location.description}
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        mt: 6,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        pt: 2
                    }}>
                        <Typography variant="h5" component="h1">
                            {t('locations.properties')}
                        </Typography>
                    </Box>
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
                <Grid size={{xs: 6, md: 4}}>
                    <LocationDetailSendMessage/>
                </Grid>
            </Grid>
            {location.venues.length > 0 && (
                <Typography variant="h5" component="h1" sx={{pt: 5, display: 'flex', justifyContent: 'left'}}>
                    Venues
                </Typography>
            )}
            {location.venues.map((venue: VenueView) => (
                <Box sx={{my: 3}} key={venue.id}>
                    <LocationDetailVenueCard venue={venue}/>
                </Box>))}

        </Container>
    );
};

export default LocationDetail;
