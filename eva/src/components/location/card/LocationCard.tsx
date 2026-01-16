import {Card, useTheme} from "@mui/material";
import {LocationCardContent} from "./LocationCardContent.tsx";
import type {LocationView} from "../../../services/location.ts";
import {LocationCardImage} from "./LocationCardImage.tsx";
import {LocationCardButtons} from "./LocationCardButtons.tsx";
import type {UserLocation} from "../../../services/distance.ts";

interface LocationCardProps {
    location: LocationView,
    userLocation: UserLocation | null
}

export function LocationCard({location, userLocation}: Readonly<LocationCardProps>) {
    const theme = useTheme()

    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: `2px solid ${theme.palette.divider}`,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&:hover': {
                    borderColor: theme.palette.primary.main,
                    '& .card-image': {
                        transform: 'scale(1.05)',
                    }
                }
            }}
        >
            <LocationCardImage location={location} userLocation={userLocation}/>

            <LocationCardContent location={location}/>

            <LocationCardButtons location={location}/>

        </Card>
    );
}