import {Box, Button, Card, CardMedia, Typography, useTheme} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {LocationCardContent} from "./LocationCardContent";
import type {LocationView} from "../../services/location.ts";

interface LocationCardProps {
    location: LocationView,
}

export function LocationCard({location}: Readonly<LocationCardProps>) {
    const theme = useTheme()
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
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
                    borderColor: theme.palette.secondary.main,
                    '& .card-image': {
                        transform: 'scale(1.05)',
                    },
                    '& .card-overlay': {
                        opacity: 1,
                    }
                }
            }}
            onClick={() => navigate(`/locations/${location.id}`)}
        >
            {/* Image Container */}
            <Box sx={{position: 'relative', overflow: 'hidden', height: 200}}>
                <CardMedia
                    component="img"
                    height="200"
                    image='/football_pitch.jpg'
                    alt={location.name}
                    className="card-image"
                    sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                />
                {/* Overlay with quick info */}
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

            {/* Content */}
            <LocationCardContent location={location}/>

            {/* Action Buttons */}
            <Box sx={{p: 3, pt: 0}}>
                <Box sx={{display: 'flex', gap: 1.5}}>
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{
                            flex: 1,
                            fontWeight: 600,
                            borderRadius: 2,
                            py: 1,
                            textTransform: 'none',
                            fontSize: '0.875rem',
                        }}
                        onClick={e => {
                            e.stopPropagation();
                            navigate(`/locations/${location.id}`);
                        }}
                    >
                        View Details
                    </Button>
                    <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                            flex: 1,
                            fontWeight: 600,
                            borderRadius: 2,
                            py: 1,
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            border: `1px solid ${theme.palette.primary.main}`,
                            '&:focus': {
                                outline: 'none',
                                border: `1px solid ${theme.palette.primary.main}`,
                            }
                        }}
                        onClick={e => {
                            e.stopPropagation();
                            navigate(`/locations/${location.id}#pitches`);
                        }}
                    >
                        View Pitches
                    </Button>
                </Box>
            </Box>
        </Card>
    );
}