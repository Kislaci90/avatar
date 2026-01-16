import {Box, Card, CardMedia, Typography} from "@mui/material";
import theme from "../../theme/theme.ts";
import {LocationOn} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';
import {getSurfaceTypeColor} from "../../services/pitches.ts";
import PitchSvg from "../PitchSvg.tsx";
import type {PitchView} from "../../services/location.ts";
import {PitchCardContent} from "./PitchCardContent.tsx";
import {PitchCardButtons} from "./PitchCardButtons.tsx";

interface PitchCardProps {
    pitch: PitchView
}

export function PitchCard({pitch}: Readonly<PitchCardProps>) {
    const navigate = useNavigate();

    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 4,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                '&:hover': {
                    borderColor: theme.palette.primary.main,
                    '& .card-image': {
                        transform: 'scale(1.05)',
                    },
                    '& .card-overlay': {
                        opacity: 1,
                    }
                }
            }}
            onClick={() => navigate(`/pitches/${pitch.id}`)}
        >
            {/* Image Container */}
            <Box sx={{position: 'relative', overflow: 'hidden', height: 200}}>
                <CardMedia
                    component="div"
                    className="card-image"
                    sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <PitchSvg
                        backgroundColor={getSurfaceTypeColor(pitch.surfaceType || '')}/>
                </CardMedia>
                {/* Overlay with quick info */}
                <Box
                    className="card-overlay"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}dd 0%, ${theme.palette.primary.main}bb 50%)`,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                    }}
                >
                    <Typography variant="h6" fontWeight={700} color="white">
                        View Details
                    </Typography>
                </Box>

                {/* Location Info */}
                {pitch.location && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            fontSize: '0.875rem'
                        }}
                    >
                        <LocationOn sx={{fontSize: 14, color: theme.palette.primary.main}}/>
                        {pitch.location.address.addressLine}
                    </Typography>
                )}
            </Box>

            <PitchCardContent pitch={pitch}/>

            <PitchCardButtons pitch={pitch}/>

        </Card>
    );
}