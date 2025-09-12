import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {gql} from '@apollo/client';
import {useQuery} from "@apollo/client/react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Grid,
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
    ArrowBack,
    ContactPhone,
    DescriptionOutlined,
    Directions,
    Email,
    GpsFixed, HomeRepairService,
    Info,
    Language,
    LocationOn,
    Map,
    Phone,
    Share,
    SportsSoccer,
} from '@mui/icons-material';
import type {GetLocationResult} from "../services/location.ts";
import {calculateDistance, formatDistance, getDirectionsUrl, type UserLocation} from "../services/distance.ts";
import {LocationDistance} from "../components/location/LocationDistance.tsx";
import {locationPropertyIconMap} from "../components/PropertyMap.tsx";
import {getPitchTypeColor, getSurfaceTypeColor} from "../services/pitches.ts";

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
            }
        }
    }
`;

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: Readonly<TabPanelProps>) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`location-tabpanel-${index}`}
            aria-labelledby={`location-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const LocationDetail: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const theme = useTheme();
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
                    <Box sx={{position: 'relative'}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="/football_pitch.jpg"
                            alt={location.name}
                            sx={{objectFit: 'cover'}}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                                p: 3,
                                color: 'white'
                            }}
                        >
                            <Typography variant="h1" sx={{color: 'white'}}>
                                {location.name}
                            </Typography>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap'}}>
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                    <LocationOn/>
                                    <Typography variant="h6" sx={{color: 'white'}}>
                                        {location.address.addressLine}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={`${location.pitches?.length || 0} Pitches`}
                                    color="primary"
                                    sx={{fontWeight: 600}}
                                />
                                {userLocation && location.geom.x && location.geom.y && (
                                    <LocationDistance userLocation={userLocation} geom={location.geom}/>
                                )}
                            </Box>
                        </Box>
                    </Box>
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

                    {/* Overview Tab */}
                    <TabPanel value={tabValue} index={0}>
                        <Grid container spacing={4}>
                            <Grid size={{xs: 12}}>
                                <Box sx={{display: 'flex', alignItems: 'center', mb:1, justifyContent: 'center'}}>
                                    <DescriptionOutlined color='primary' sx={{mr:1}}/>
                                    <Typography variant="h5">
                                        About This Location
                                    </Typography>
                                </Box>
                                <Divider sx={{mb:3}} />
                                <Typography variant="body1" sx={{mb: 4, lineHeight: 1.8}}>
                                    {location.description || 'No description available for this location.'}
                                </Typography>

                                <Box sx={{display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center'}}>
                                    <LocationOn color='primary' sx={{mr:1}}/>
                                    <Typography variant="h5">
                                        Address
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{mb: 3}}>
                                    {location.address.addressLine}<br/>
                                    {location.address.postalCode && `${location.address.postalCode}`}
                                </Typography>

                                <Box sx={{display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center'}}>
                                    <HomeRepairService color='primary' sx={{mr:1}}/>
                                    <Typography variant="h5">
                                        Facilities & Amenities
                                    </Typography>
                                </Box>

                                <Grid container spacing={2} sx={{mb: 3}}>
                                    {location.properties.map((property) => (
                                        <Grid size={{xs: 12, sm: 4, md: 3}} key={property}>
                                            <Paper elevation={0} sx={{
                                                p: 3,
                                                border: `1px solid ${theme.palette.divider}`,
                                                borderRadius: 3,
                                                textAlign: 'center',
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    borderColor: theme.palette.primary.main
                                                }
                                            }}>
                                                {locationPropertyIconMap[property] || null}
                                                <Typography variant="body2" fontWeight={600}
                                                            color="primary">
                                                    {property}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>

                            <Grid size={{xs: 12}}>
                                <Card elevation={2} sx={{borderRadius: 3, p: 3}}>
                                    <Typography variant="h6" fontWeight={600} sx={{mb: 2}}>
                                        Quick Info
                                    </Typography>
                                    <List dense>
                                        <ListItem>
                                            <ListItemIcon>
                                                <SportsSoccer sx={{color: theme.palette.primary.main}}/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Total Pitches"
                                                secondary={location.pitches?.length || 0}
                                            />
                                        </ListItem>
                                        {userLocation && location.geom.x && location.geom.y && (
                                            <ListItem>
                                                <ListItemIcon>
                                                    <GpsFixed sx={{color: theme.palette.info.main}}/>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Distance"
                                                    secondary={formatDistance(calculateDistance(
                                                        userLocation.latitude,
                                                        userLocation.longitude,
                                                        parseInt(location.geom.x),
                                                        parseInt(location.geom.y)
                                                    ))}
                                                />
                                            </ListItem>
                                        )}
                                    </List>

                                    {/* Directions Button */}
                                    <Box sx={{mt: 2}}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            startIcon={<Directions/>}
                                            href={getDirectionsUrl(location)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                borderRadius: 2,
                                                py: 1.5,
                                                fontWeight: 600
                                            }}
                                        >
                                            {userLocation ? 'Get Directions' : 'Open in Maps'}
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </TabPanel>

                    {/* Pitches Tab */}
                    <TabPanel value={tabValue} index={1}>
                        <Typography variant="h5" sx={{mb: 3}}>
                            Available Pitches ({location.pitches?.length || 0})
                        </Typography>

                        {location.pitches && location.pitches.length > 0 ? (
                            <Grid container spacing={3}>
                                {location.pitches.map((pitch: any) => (
                                    <Grid size={{xs: 6}} key={pitch.id}>
                                        <Card
                                            elevation={2}
                                            sx={{
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: 2
                                                }
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image="/football_pitch.jpg"
                                                alt={pitch.name}
                                                sx={{objectFit: 'cover'}}
                                            />
                                            <CardContent sx={{p: 3}}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    mb: 2
                                                }}>
                                                    <Typography variant="h6" fontWeight={700} sx={{flex: 1}}>
                                                        {pitch.name}
                                                    </Typography>
                                                    <Typography variant="h6" fontWeight={700} color="primary.main">
                                                        £{pitch.pricePerHour}/hr
                                                    </Typography>
                                                </Box>

                                                <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                                                    Description about the pitch goes here. This is a placeholder text.
                                                </Typography>

                                                <Box sx={{display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap'}}>
                                                    <Chip
                                                        label={pitch.pitchType?.replace('_', ' ')}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: getPitchTypeColor(pitch.pitchType),
                                                            color: 'white',
                                                            fontWeight: 600
                                                        }}
                                                    />
                                                    <Chip
                                                        label={pitch.surfaceType?.replace('_', ' ')}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: getSurfaceTypeColor(pitch.surfaceType),
                                                            color: 'white',
                                                            fontWeight: 600
                                                        }}
                                                    />
                                                    {pitch.hasLighting && (
                                                        <Chip
                                                            label="Lighting"
                                                            size="small"
                                                            sx={{
                                                                bgcolor: theme.palette.warning.main,
                                                                color: 'white',
                                                                fontWeight: 600
                                                            }}
                                                        />
                                                    )}
                                                </Box>

                                                <Box sx={{display: 'flex', gap: 2}}>
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        onClick={() => navigate(`/pitches/${pitch.id}`)}
                                                        sx={{
                                                            fontWeight: 600,
                                                            borderRadius: 2,
                                                            py: 1.5
                                                        }}
                                                    >
                                                        View Details
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Alert severity="info">
                                No pitches available at this location.
                            </Alert>
                        )}
                    </TabPanel>

                    {/* Contact Tab */}
                    <TabPanel value={tabValue} index={2}>
                        <Grid container spacing={4}>
                            <Grid size={{xs: 12}}>
                                <Typography variant="h5">
                                    Contact Information
                                </Typography>

                                <List>
                                    <ListItem sx={{px: 0}}>
                                        <ListItemIcon>
                                            <Phone sx={{color: theme.palette.primary.main}}/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Phone"
                                            secondary={
                                                <Button
                                                    href={`tel:${location.contact.phoneNumber}`}
                                                    sx={{p: 0, textTransform: 'none', color: 'inherit'}}
                                                >
                                                    {location.contact.phoneNumber}
                                                </Button>
                                            }
                                        />
                                    </ListItem>

                                    <ListItem sx={{px: 0}}>
                                        <ListItemIcon>
                                            <Email sx={{color: theme.palette.primary.main}}/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Email"
                                            secondary={
                                                <Button
                                                    href={`mailto:${location.contact.email}`}
                                                    sx={{p: 0, textTransform: 'none', color: 'inherit'}}
                                                >
                                                    {location.contact.email}
                                                </Button>
                                            }
                                        />
                                    </ListItem>

                                    <ListItem sx={{px: 0}}>
                                        <ListItemIcon>
                                            <Language sx={{color: theme.palette.primary.main}}/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Website"
                                            secondary={
                                                <Button
                                                    href={location.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    sx={{p: 0, textTransform: 'none', color: 'inherit'}}
                                                >
                                                    {location.website}
                                                </Button>
                                            }
                                        />
                                    </ListItem>
                                </List>
                            </Grid>

                            <Grid size={{xs: 12}}>
                                <Typography variant="h5" sx={{mb: 2}}>
                                    Location Owner
                                </Typography>

                                <Card elevation={2} sx={{borderRadius: 3, p: 3}}>
                                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                                        <Avatar sx={{mr: 2, bgcolor: theme.palette.primary.main}}>
                                            {location.contact.contactName.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" fontWeight={600}>
                                                {location.contact.contactName}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {location.contact.email && (
                                        <Button
                                            variant="outlined"
                                            startIcon={<Email/>}
                                            href={`mailto:${location.contact.email}`}
                                            fullWidth
                                            sx={{mb: 1}}
                                        >
                                            Contact Owner
                                        </Button>
                                    )}
                                </Card>
                            </Grid>
                        </Grid>
                    </TabPanel>

                    {/* Location Tab */}
                    <TabPanel value={tabValue} index={3}>
                        <Typography variant="h5" sx={{mb: 3}}>
                            Location Details
                        </Typography>

                        <Grid container spacing={4}>
                            <Grid size={{xs: 12}}>
                                <Card elevation={2} sx={{borderRadius: 3, p: 3}}>
                                    <Typography variant="h5" sx={{mb: 2}}>
                                        Address
                                    </Typography>
                                    <Typography variant="body1" sx={{mb: 3}}>
                                        {location.address.addressLine}<br/>
                                        {location.address.postalCode && `${location.address.postalCode}`}
                                    </Typography>

                                    {/* Distance Information */}
                                    {userLocation && location.geom.x && location.geom.y && (
                                        <Box sx={{mb: 3, p: 2, bgcolor: 'info.light', borderRadius: 2}}>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                                                <GpsFixed sx={{color: 'white'}}/>
                                                <Typography variant="body2" fontWeight={600} color="white">
                                                    Distance from your location
                                                </Typography>
                                            </Box>
                                            <Typography variant="h6" fontWeight={700} color="white">
                                                {formatDistance(calculateDistance(
                                                    userLocation.latitude,
                                                    userLocation.longitude,
                                                    parseInt(location.geom.x),
                                                    parseInt(location.geom.y)
                                                ))}
                                            </Typography>
                                        </Box>
                                    )}
                                </Card>
                            </Grid>

                            <Grid size={{xs: 12}}>
                                <Card elevation={2} sx={{borderRadius: 3, p: 3}}>
                                    <Typography variant="h6" sx={{mb: 2}}>
                                        Get Directions
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                                        {userLocation ?
                                            'Get directions from your current location to this football facility.' :
                                            'Enable location access to get directions from your current location.'
                                        }
                                    </Typography>

                                    <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap'}}>
                                        <Button
                                            variant="contained"
                                            startIcon={<Directions/>}
                                            href={getDirectionsUrl(location)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{flex: 1, minWidth: 200}}
                                        >
                                            {userLocation ? 'Get Directions' : 'Open in Maps'}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Share/>}
                                            onClick={() => {
                                                if (navigator.share) {
                                                    navigator.share({
                                                        title: location.name,
                                                        text: `Check out ${location.name} at ${location.address}`,
                                                        url: window.location.href
                                                    });
                                                } else {
                                                    navigator.clipboard.writeText(window.location.href);
                                                }
                                            }}
                                            sx={{flex: 1, minWidth: 200}}
                                        >
                                            Share Location
                                        </Button>
                                    </Box>

                                    {!userLocation && (
                                        <Box sx={{mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 2}}>
                                            <Typography variant="body2" color="info.dark">
                                                💡 Enable location access to see distance and get directions from your
                                                current location.
                                            </Typography>
                                        </Box>
                                    )}
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Enhanced Map Section */}
                        <Box sx={{mt: 4}}>
                            <Card elevation={2} sx={{borderRadius: 3, overflow: 'hidden'}}>
                                <Box sx={{p: 3, borderBottom: 1, borderColor: 'divider'}}>
                                    <Typography variant="h6">
                                        Location Map
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {location.geom.x && location.geom.y ?
                                            'Interactive map showing the exact location of this football facility.' :
                                            'Map will be available once coordinates are added.'
                                        }
                                    </Typography>
                                </Box>

                                {location.geom.x && location.geom.y ? (
                                    <Box sx={{height: 400, position: 'relative'}}>
                                        <iframe
                                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.geom.x},${location.geom.y}`}
                                            width="100%"
                                            height="100%"
                                            style={{border: 0}}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </Box>
                                ) : (
                                    <Box sx={{
                                        height: 400,
                                        bgcolor: 'grey.100',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Box sx={{textAlign: 'center'}}>
                                            <Map sx={{fontSize: 60, color: 'grey.400', mb: 2}}/>
                                            <Typography variant="h6" color="text.secondary" sx={{mb: 1}}>
                                                Map Not Available
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Coordinates need to be added to display the map.
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Card>
                        </Box>
                    </TabPanel>
                </Paper>
            </Container>
        </Box>
    );
};

export default LocationDetail; 