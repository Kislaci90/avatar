import {Box, Card, CardContent, CardMedia, Chip, Stack, Tooltip, Typography} from "@mui/material";
import {getVenueTypeColor, getSurfaceTypeColor} from "../../../services/venues.ts";
import {pitchPropertyIconMap} from "../../PropertyMap.tsx";
import type {VenueView} from "../../../generated/graphql-schema.ts";

interface LocationDetailPitchCardProps {
    venue: VenueView
}

export function LocationDetailPitchCard({venue}: Readonly<LocationDetailPitchCardProps>) {
    return (
        <Card sx={{display: "flex"}}>
            <CardMedia
                component="img"
                image={`/pitches/${venue.surfaceType.toLowerCase()}.png`}
                sx={{
                    height: 200,
                    width: 150,
                    objectFit: "cover",
                }}
                alt={venue.name}
            />

            <CardContent
                sx={{
                    flex: 1,
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box sx={{display: "flex", gap: 2, mb: 1}}>
                    <Typography
                        sx={{fontWeight: 700}}
                        variant="body1"
                        color={getSurfaceTypeColor(venue.surfaceType)}
                    >
                        {venue.surfaceType}
                    </Typography>
                    |
                    <Typography
                        sx={{fontWeight: 700}}
                        variant="body1"
                        color={getVenueTypeColor(venue.venueType)}
                    >
                        {venue.venueType}
                    </Typography>
                </Box>

                <Typography variant="h6">
                    {venue.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {venue.description}
                </Typography>

                <Box sx={{mt: "auto"}}>
                    <Stack direction="row" spacing={1} useFlexGap
                           sx={{flexWrap: 'wrap', justifyContent: "flex-start"}}>
                    {venue.properties.map((property: string) => (
                        <Tooltip title={property} key={property} placement="top">
                            <Chip
                                size="small"
                                variant="outlined"
                                label={property}
                                sx={{
                                    mr: 1, my: 1, border: "none", '& .MuiChip-icon': {
                                        color: 'primary.main',
                                    },
                                }}
                                icon={pitchPropertyIconMap[property]}
                            />
                        </Tooltip>
                    ))}
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
}