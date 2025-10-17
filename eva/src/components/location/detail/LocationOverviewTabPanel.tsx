import {DescriptionOutlined, Directions, HomeRepairService, LocationOn} from "@mui/icons-material";
import {Box, Button, Divider, Grid, Paper, Typography, useTheme} from "@mui/material";
import {locationPropertyIconMap} from "../../PropertyMap.tsx";
import type {LocationView} from "../../../services/location.ts";
import {getDirectionsUrl, type UserLocation} from "../../../services/distance.ts";

interface LocationOverviewTabPanelProps {
    location: LocationView,
    userLocation: UserLocation | null
}

export function LocationOverviewTabPanel({location, userLocation}: Readonly<LocationOverviewTabPanelProps>) {
    const theme = useTheme();

    return (
        <Grid container spacing={4}>
            <Grid size={{xs: 12}}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center'}}>
                    <DescriptionOutlined color='primary' sx={{mr: 1}}/>
                    <Typography variant="h5">
                        About This Location
                    </Typography>
                </Box>
                <Divider sx={{mb: 3}}/>
                <Typography variant="body1" sx={{mb: 4, lineHeight: 1.8}}>
                    {location.description || 'No description available for this location.'}
                </Typography>

                <Box sx={{display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center'}}>
                    <LocationOn color='primary' sx={{mr: 1}}/>
                    <Typography variant="h5">
                        Address
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{mb: 3}}>
                    {location.address.addressLine}<br/>
                    {location.address.postalCode && `${location.address.postalCode}`}
                </Typography>

                <Box sx={{display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center'}}>
                    <HomeRepairService color='primary' sx={{mr: 1}}/>
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
            </Grid>
        </Grid>
    );
}