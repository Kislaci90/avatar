import React, {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {gql} from '@apollo/client';
import {useMutation, useQuery} from "@apollo/client/react";
import { useTranslation } from 'react-i18next';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import {Add, Delete} from '@mui/icons-material';
import type {GetLocationResult, PitchView} from "../services/location.ts";
import {DELETE_LOCATION} from "../services/location.ts";
import theme from "../theme/theme.ts";
import {Email, Favorite, Home, LocationOn, Person, Phone, SportsSoccer} from "@mui/icons-material";
import {locationPropertyIconMap} from "../components/PropertyMap.tsx";
import {LocationDetailPitchCard} from "../components/location/detail/LocationDetailPitchCard.tsx";
import {LocationDetailSendMessage} from "../components/location/detail/LocationDetailSendMessage.tsx";
import PitchFormDialog from "../components/pitch/PitchFormDialog.tsx";

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
    const { t } = useTranslation();
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const numericId = id ? parseInt(id, 10) : null;

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [addPitchOpen, setAddPitchOpen] = useState(false);

    const {loading, error, data, refetch} = useQuery<GetLocationResult>(GET_LOCATION_DETAIL, {
        variables: {id: numericId},
    });

    const [deleteLocation, {loading: deleteLoading}] = useMutation(DELETE_LOCATION, {
        onCompleted: () => {
            navigate('/locations');
        },
        onError: (e) => console.error(e.message),
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
                    {t('errors.notFound')}
                </Alert>
            </Container>
        );
    }

    const location = data.getLocation;

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
                            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                                <Favorite color="secondary"/>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={deleteLoading ? <CircularProgress size={16}/> : <Delete/>}
                                    onClick={() => setDeleteConfirmOpen(true)}
                                    disabled={deleteLoading}
                                >
                                    Delete
                                </Button>
                            </Box>
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
                                                primary={location.pitches.length}
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
                <Box sx={{mt: 3, mb: 6}}>
                    <Button
                        variant="contained"
                        startIcon={<Add/>}
                        onClick={() => setAddPitchOpen(true)}
                    >
                        Add Pitch
                    </Button>
                </Box>

            </Container>

            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
                <DialogTitle>Delete Location</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete "{location.name}"? This will also delete all associated pitches. This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => deleteLocation({variables: {id: numericId}})}
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? <CircularProgress size={20}/> : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>

            <PitchFormDialog
                open={addPitchOpen}
                onClose={() => setAddPitchOpen(false)}
                onSuccess={() => refetch()}
                locationId={numericId!}
            />
        </Box>
    );
};

export default LocationDetail; 