import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {gql} from '@apollo/client';
import {useQuery} from "@apollo/client/react";
import {Alert, Box, Button, CircularProgress, Container, Paper, Tab, Tabs,} from '@mui/material';
import {ArrowBack, ContactPhone, Info, Map, SportsSoccer,} from '@mui/icons-material';
import type {GetLocationResult} from "../services/location.ts";
import {type UserLocation} from "../services/distance.ts";
import {TabPanel} from "../components/TabPanel.tsx";
import {LocationOverviewTabPanel} from "../components/location/detail/LocationOverviewTabPanel.tsx";
import {LocationPitchesTabPanel} from "../components/location/detail/LocationPitchesTabPanel.tsx";
import {LocationContactTabPanel} from "../components/location/detail/LocationContactTabPanel.tsx";
import {LocationMapTabPanel} from "../components/location/detail/LocationMapTabPanel.tsx";
import {LocationDetailHeader} from "../components/location/detail/LocationDetailHeader.tsx";

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
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

    const numericId = id ? parseInt(id, 10) : null;

    const {loading, error, data} = useQuery<GetLocationResult>(GET_LOCATION_DETAIL, {
        variables: {id: numericId},
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.log('Location permission denied or error:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                }
            );
        }
    }, []);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

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

    const location = data.getLocation;

    return (
        <Box sx={{bgcolor: 'background.default', minHeight: '100vh', py: 4}}>
            <Container maxWidth="lg">
                {/* Back Button */}
                <Button
                    startIcon={<ArrowBack/>}
                    onClick={() => navigate(-1)}
                    sx={{mb: 3}}
                >
                    Back to Search
                </Button>

                {/* Header Section */}
                <Paper elevation={3} sx={{borderRadius: 3, overflow: 'hidden', mb: 4}}>
                    <LocationDetailHeader location={location} userLocation={userLocation}/>
                </Paper>

                {/* Tabs */}
                <Paper elevation={2} sx={{borderRadius: 3, mb: 4}}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            borderBottom: 1,
                            borderColor: 'divider',
                            '& .MuiTab-root': {
                                fontWeight: 600,
                                fontSize: '1rem',
                                py: 2
                            }
                        }}
                    >
                        <Tab icon={<Info/>} label="Overview"/>
                        <Tab icon={<SportsSoccer/>} label="Pitches"/>
                        <Tab icon={<ContactPhone/>} label="Contact"/>
                        <Tab icon={<Map/>} label="Location"/>
                    </Tabs>

                    <TabPanel value={tabValue} index={0}>
                        <LocationOverviewTabPanel location={location} userLocation={userLocation}/>
                    </TabPanel>

                    {/* Pitches Tab */}
                    <TabPanel value={tabValue} index={1}>
                        <LocationPitchesTabPanel location={location}/>
                    </TabPanel>

                    {/* Contact Tab */}
                    <TabPanel value={tabValue} index={2}>
                        <LocationContactTabPanel location={location}/>
                    </TabPanel>

                    {/* Location Tab */}
                    <TabPanel value={tabValue} index={3}>
                        <LocationMapTabPanel location={location} userLocation={userLocation}/>
                    </TabPanel>
                </Paper>
            </Container>
        </Box>
    );
};

export default LocationDetail; 