import {Box, Card, CardContent, CardMedia, Chip, Stack, Tooltip, Typography} from "@mui/material";
import {getVenueTypeColor, getSurfaceTypeColor} from "../../../services/venues.ts";
import {venuePropertyIconMap} from "../../PropertyMap.tsx";
import type {VenueView} from "../../../generated/graphql-schema.ts";
import theme from "../../../theme/theme.ts";

interface LocationDetailPitchCardProps {
    venue: VenueView
}

export function LocationDetailVenueCard({venue}: Readonly<LocationDetailPitchCardProps>) {
    const surfaceColor = getSurfaceTypeColor(venue.surfaceType);
    const venueTypeColor = getVenueTypeColor(venue.venueType);

    return (
        <Card sx={{
            display: "flex",
            flexDirection: {xs: "column", sm: "row"},
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            borderLeft: `8px solid ${surfaceColor}`,
            transition: 'all 0.3s ease',
        }}>
            <CardMedia
                component="img"
                image={`/pitches/${venue.surfaceType.toLowerCase()}.png`}
                sx={{
                    height: {xs: 180, sm: 200},
                    width: {xs: '100%', sm: 160},
                    objectFit: "cover",
                    borderRight: {xs: 'none', sm: `1px solid ${theme.palette.divider}`}
                }}
                alt={venue.name}
            />

            <CardContent
                sx={{
                    flex: 1,
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    p: 3
                }}
            >
                <Box sx={{display: "flex", gap: 1.5, mb: 2, flexWrap: 'wrap'}}>
                    <Chip
                        label={venue.surfaceType}
                        size="small"
                        sx={{
                            backgroundColor: `${surfaceColor}15`,
                            color: surfaceColor,
                            fontWeight: 600,
                            border: `1px solid ${surfaceColor}40`,
                            '& .MuiChip-label': {
                                px: 1
                            }
                        }}
                    />
                    <Chip
                        label={venue.venueType}
                        size="small"
                        sx={{
                            backgroundColor: `${venueTypeColor}15`,
                            color: venueTypeColor,
                            fontWeight: 600,
                            border: `1px solid ${venueTypeColor}40`,
                            '& .MuiChip-label': {
                                px: 1
                            }
                        }}
                    />
                </Box>

                {/* Venue Name */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        fontSize: {xs: '1.1rem', sm: '1.25rem'},
                        letterSpacing: '-0.3px'
                    }}
                >
                    {venue.name}
                </Typography>

                {/* Description */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {venue.description}
                </Typography>

                {/* Properties */}
                <Box sx={{mt: "auto"}}>
                    <Stack
                        direction="row"
                        spacing={1}
                        useFlexGap
                        sx={{flexWrap: 'wrap', justifyContent: "flex-start"}}
                    >
                        {venue.properties.map((property: string) => (
                            <Tooltip title={property} key={property} placement="top">
                                <Chip
                                    size="small"
                                    variant="outlined"
                                    label={property}
                                    sx={{
                                        backgroundColor: `${theme.palette.primary.main}08`,
                                        borderColor: `${theme.palette.primary.main}30`,
                                        fontWeight: 500,
                                        transition: 'all 0.2s ease',
                                        '& .MuiChip-icon': {
                                            color: `${theme.palette.primary.main} !important`,
                                        }
                                    }}
                                    icon={venuePropertyIconMap[property]}
                                />
                            </Tooltip>
                        ))}
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
}