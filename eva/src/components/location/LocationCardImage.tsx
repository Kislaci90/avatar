import {Box, CardMedia, Typography, useTheme} from "@mui/material";
import type {LocationView} from "../../services/location.ts";
import {getMediumGoogleMap} from "../../services/distance.ts";


interface LocationCardImageProps {
    location: LocationView
}

export function LocationCardImage({location}: Readonly<LocationCardImageProps>) {
    const theme = useTheme()

    return (
        <Box sx={{position: 'relative', overflow: 'hidden', height: 200}}>
            <CardMedia
                component="img"
                height="200"
                image={getMediumGoogleMap(location)}
                alt={location.name}
                className="card-image"
                sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />
            <Box
                className="card-overlay"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}dd 0%, ${theme.palette.primary.main}bb 100%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
                <Typography variant="h6" fontWeight={700} sx={{color: 'white'}}>
                    View Details
                </Typography>
            </Box>

            {/* Pitch Count Badge */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    fontWeight: 700,
                    fontSize: '1rem',
                    boxShadow: `0 4px 12px ${theme.palette.secondary.main}4d`,
                }}
            >
                {location.pitches?.length || 0} pitches
            </Box>
        </Box>
    );
}