import {Directions, GpsFixed, Share, Map} from "@mui/icons-material";
import {Box, Button, Card, Grid, Typography} from "@mui/material";
import {calculateDistance, formatDistance, getDirectionsUrl, type UserLocation} from "../../../services/distance.ts";
import type {LocationView} from "../../../services/location.ts";
import {Divider} from "@mui/material";

interface LocationMapTabPanelProps {
    location: LocationView,
    userLocation: UserLocation | null
}

export function LocationMapTabPanel({location, userLocation}: Readonly<LocationMapTabPanelProps>) {
    return (
        <>
            <Typography variant="h5" sx={{mb: 3}}>
                Location Details
            </Typography>

            <Divider sx={{mb: 3}}/>

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
        </>
    );
}