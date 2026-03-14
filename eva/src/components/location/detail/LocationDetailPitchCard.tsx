import {Box, Card, CardContent, CardMedia, Chip, Stack, Tooltip, Typography} from "@mui/material";
import {getPitchTypeColor, getSurfaceTypeColor} from "../../../services/pitches.ts";
import {pitchPropertyIconMap} from "../../PropertyMap.tsx";
import type {PitchView} from "../../../services/location.ts";

interface LocationDetailPitchCardProps {
    pitch: PitchView
}

export function LocationDetailPitchCard({pitch}: Readonly<LocationDetailPitchCardProps>) {
    return (
        <Card sx={{display: "flex"}}>
            <CardMedia
                component="img"
                image={`/pitches/${pitch.surfaceType.toLowerCase()}.png`}
                sx={{
                    height: 200,
                    width: 150,
                    objectFit: "cover",
                }}
                alt={pitch.name}
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
                        color={getSurfaceTypeColor(pitch.surfaceType)}
                    >
                        {pitch.surfaceType}
                    </Typography>
                    |
                    <Typography
                        sx={{fontWeight: 700}}
                        variant="body1"
                        color={getPitchTypeColor(pitch.pitchType)}
                    >
                        {pitch.pitchType}
                    </Typography>
                </Box>

                <Typography variant="h6">
                    {pitch.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {pitch.description}
                </Typography>

                <Box sx={{mt: "auto"}}>
                    <Stack direction="row" spacing={1} useFlexGap
                           sx={{flexWrap: 'wrap', justifyContent: "flex-start"}}>
                    {pitch.properties.map((property: string) => (
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