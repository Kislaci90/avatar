import React from 'react';
import {useParams} from 'react-router-dom';
import {gql} from '@apollo/client';
import {useQuery} from "@apollo/client/react";
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
import type {GetLocationResult, PitchView} from "../services/location.ts";
import theme from "../theme/theme.ts";
import {Email, Favorite, Home, LocationOn, Person, Phone, SportsSoccer} from "@mui/icons-material";
import {locationPropertyIconMap} from "../components/PropertyMap.tsx";
import {LocationDetailPitchCard} from "../components/location/detail/LocationDetailPitchCard.tsx";
import {LocationDetailSendMessage} from "../components/location/detail/LocationDetailSendMessage.tsx";

const GET_LOCATION_DETAIL = gql`
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
            properties
            pitches {
                id
                name
                surfaceType
                description
                pitchType
                properties
                location {
                    name
                    address {
                        addressLine
                        postalCode
                        city
                    }
                    properties
                }
            }
        }
    }
`;

const LocationDetail: React.FC = () => {
    const {id} = useParams<{ id: string }>();

    const numericId = id ? parseInt(id, 10) : null;

    const {loading, error, data} = useQuery<GetLocationResult>(GET_LOCATION_DETAIL, {
        variables: {id: numericId},
    });

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
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
                    Location not found.
                </Alert>
            </Container>
        );
    }

    let location = data.getLocation;

    return (
        <Box sx={{minHeight: '100vh'}}>
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
            <Container maxWidth="lg">
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
                                                <Person/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={location.contact.contactName}
                                                secondary="Contact Name"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Email/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={location.contact.email}
                                                secondary="Contact Email"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Phone/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={location.contact.phoneNumber}
                                                secondary="Contact Phonenumber"
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid size={{xs: 6, md: 4}}>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <LocationOn/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={location.address.addressLine}
                                                secondary="Address"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Home/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={location.website}
                                                secondary="Website"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <SportsSoccer/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={location.pitches.length}
                                                secondary="No. Pitches"
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
                                Description
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
                                Facilities & Amenities
                            </Typography>
                        </Box>
                        <Box>
                            <List dense>
                                {location.properties.map((property) => (
                                    <ListItem key={property}>
                                        <ListItemIcon>
                                            {locationPropertyIconMap[property]}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={property}
                                            secondary="Description for property"
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                    <Grid size={{xs: 6, md: 4}}>
                        <LocationDetailSendMessage />
                    </Grid>
                </Grid>
                {location.pitches.length > 0 && (
                    <Typography variant="h5" component="h1" sx={{pt: 5}}>
                        Pitches
                    </Typography>
                )}
                {location.pitches.map((pitch: PitchView) => (
                    <Box sx={{my: 3}} key={pitch.id}>
                        <LocationDetailPitchCard pitch={pitch} />
                    </Box>))}

            </Container>
        </Box>
    );
};

export default LocationDetail; 