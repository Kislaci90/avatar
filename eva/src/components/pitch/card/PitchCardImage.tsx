import {Box, CardMedia, Chip, useTheme} from "@mui/material";
import {Favorite, LocationOn} from "@mui/icons-material";
import type {PitchView} from "../../../services/location.ts";
import {LocationDistance} from "../../location/LocationDistance.tsx";
import {type UserLocation} from "../../../services/distance.ts";


interface PitchCardImageProps {
    pitch: PitchView,
    userLocation: UserLocation | null
}

export function PitchCardImage({pitch, userLocation}: Readonly<PitchCardImageProps>) {
    const theme = useTheme()

    return (
        <Box sx={{position: 'relative', overflow: 'hidden', height: 300, m: 0.5, borderRadius: 1.5}}>
            <CardMedia
                component="img"
                height="300"
                image={`/pitches/${pitch.surfaceType.toLowerCase()}.png`}
                alt={pitch.name}
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
                    top: 150,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(to top, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main}66 10%, transparent 100%)` ,
                    opacity: 1,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                }}
            >
            </Box>

            <Box sx={{
                position: 'absolute',
                bottom: 12,
                left: 12,
                p: 0.8,
                borderRadius: 1,
                backdropFilter: "blur(2px)",
            }}>
                <Chip label={pitch.location.address.addressLine}
                      variant="outlined"
                      color="primary"
                      size="small"
                      icon={<LocationOn/>}
                      sx={{
                          backgroundColor: 'white',
                          fontWeight: 700,
                      }}
                />
            </Box>

            <Box sx={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                p: 0.8,
                borderRadius: 1,
                backdropFilter: "blur(2px)",
            }}>
                <LocationDistance userLocation={userLocation} geom={pitch.location.geom}></LocationDistance>
            </Box>

            <Box sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                p: 0.8,
                borderRadius: 1,
                backdropFilter: "blur(2px)",
            }}>
                <Favorite color="secondary"></Favorite>
            </Box>


        </Box>
    );
}