import {LocationOn, SportsSoccer} from "@mui/icons-material";
import {Box, CardMedia, Chip} from "@mui/material";
import {LocationDistance} from "../LocationDistance.tsx";
import type {LocationView} from "../../../services/location.ts";
import {getLargeGoogleMap, type UserLocation} from "../../../services/distance.ts";

interface LocationDetailHeaderProps {
    location: LocationView,
    userLocation: UserLocation | null
}

export function LocationDetailHeader({location, userLocation}: Readonly<LocationDetailHeaderProps>) {
    return (
        <Box sx={{position: 'relative'}}>
            <CardMedia
                component="img"
                height="300"
                image={getLargeGoogleMap(location)}
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
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap'}}>
                    <Chip
                        label={location.address.addressLine}
                        color="primary"
                        sx={{fontWeight: 600}}
                        icon={<LocationOn/>}
                    />
                    <Chip
                        label={`${location.pitches?.length || 0} Pitches`}
                        color="primary"
                        sx={{fontWeight: 600}}
                        icon={<SportsSoccer/>}
                    />
                    {userLocation && location.geom.x && location.geom.y && (
                        <LocationDistance userLocation={userLocation} geom={location.geom}/>
                    )}
                </Box>
            </Box>
        </Box>
    );
}