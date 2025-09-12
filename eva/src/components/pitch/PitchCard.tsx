import {Box, Button, Card, CardContent, CardMedia, Chip, Grid, Typography} from "@mui/material";
import theme from "../../theme/theme";
import {
    AccessTime,
    Lightbulb,
    LocalParking,
    LocationOn,
    MeetingRoom,
    People,
    Shower,
    SportsSoccer
} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';

interface PitchCardProps {
    pitch: any
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
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
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
                    component="img"
                    height="200"
                    image='/football_pitch.jpg'
                    alt={pitch.name}
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
                    <Typography variant="h6" fontWeight={700}>
                        View Details
                    </Typography>
                </Box>

                {/* Price Badge */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: '1rem',
                        boxShadow: `0 4px 12px ${theme.palette.primary.main}4d`,
                    }}
                >
                    £pitch.pricePerHour/hr
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

            <CardContent sx={{flexGrow: 1, p: 3}}>
                {/* Title and Type */}
                <Box sx={{mb: 2}}>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        color="text.primary"
                        sx={{
                            mb: 1,
                            lineHeight: 1.2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    >
                        {pitch.name}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        flexWrap: 'wrap'
                    }}>
                        <Chip
                            label={pitch.pitchType?.replace('_', ' ')}
                            size="small"
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.75rem'
                            }}
                        />
                        <Chip
                            label={pitch.surfaceType?.replace('_', ' ')}
                            size="small"
                            variant="outlined"
                            sx={{fontWeight: 600, fontSize: '0.75rem'}}
                        />
                    </Box>
                </Box>

                {/* Description */}
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        mb: 2,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontSize: '0.875rem'
                    }}
                >
                    {pitch.description}
                </Typography>

                {/* Features Grid */}
                <Box sx={{mb: 2}}>
                    <Grid container spacing={0.5}>
                        {pitch.hasLighting && (
                            <Grid size={{xs: 6}}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    p: 0.5
                                }}>
                                    <Lightbulb sx={{
                                        color: theme.palette.warning.main,
                                        fontSize: 16
                                    }}/>
                                    <Typography variant="caption" sx={{
                                        color: 'text.primary',
                                        fontWeight: 500
                                    }}>
                                        Lighting
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                        {pitch.location?.hasParking && (
                            <Grid size={{xs: 6}}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    p: 0.5
                                }}>
                                    <LocalParking sx={{
                                        color: theme.palette.primary.main,
                                        fontSize: 16
                                    }}/>
                                    <Typography variant="caption" sx={{
                                        color: 'text.primary',
                                        fontWeight: 500
                                    }}>
                                        Parking
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                        {pitch.location?.hasShowers && (
                            <Grid size={{xs: 6}}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    p: 0.5
                                }}>
                                    <Shower sx={{
                                        color: theme.palette.primary.main,
                                        fontSize: 16
                                    }}/>
                                    <Typography variant="caption" sx={{
                                        color: 'text.primary',
                                        fontWeight: 500
                                    }}>
                                        Showers
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                        {pitch.location?.hasChangingRooms && (
                            <Grid size={{xs: 6}}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    p: 0.5
                                }}>
                                    <MeetingRoom sx={{
                                        color: theme.palette.primary.main,
                                        fontSize: 16
                                    }}/>
                                    <Typography variant="caption" sx={{
                                        color: 'text.primary',
                                        fontWeight: 500
                                    }}>
                                        Changing Rooms
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                        {pitch.location?.hasCafe && (
                            <Grid size={{xs: 6}}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    p: 0.5
                                }}>
                                    <AccessTime sx={{
                                        color: theme.palette.primary.main,
                                        fontSize: 16
                                    }}/>
                                    <Typography variant="caption" sx={{
                                        color: 'text.primary',
                                        fontWeight: 500
                                    }}>
                                        Cafe
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                        {pitch.location?.hasEquipmentRental && (
                            <Grid size={{xs: 6}}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    p: 0.5
                                }}>
                                    <SportsSoccer sx={{
                                        color: theme.palette.primary.main,
                                        fontSize: 16
                                    }}/>
                                    <Typography variant="caption" sx={{
                                        color: 'text.primary',
                                        fontWeight: 500
                                    }}>
                                        Equipment Rental
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                        {pitch.capacity && (
                            <Grid size={{xs: 6}}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    p: 0.5
                                }}>
                                    <People sx={{
                                        color: theme.palette.primary.main,
                                        fontSize: 16
                                    }}/>
                                    <Typography variant="caption" sx={{
                                        color: 'text.primary',
                                        fontWeight: 500
                                    }}>
                                        {pitch.capacity} players
                                    </Typography>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </CardContent>

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
                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: `0 8px 16px ${theme.palette.primary.main}4d`,
                            }
                        }}
                        onClick={e => {
                            e.stopPropagation();
                            navigate(`/pitches/${pitch.id}`);
                        }}
                    >
                        View Details
                    </Button>
                </Box>
            </Box>
        </Card>
    );
}