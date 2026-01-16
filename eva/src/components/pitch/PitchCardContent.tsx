import {Box, CardContent, Chip, Divider, Stack, Tooltip, Typography} from "@mui/material";
import {locationPropertyIconMap, pitchPropertyIconMap} from "../PropertyMap.tsx";
import type {PitchView} from "../../services/location.ts";

interface PitchCardContentProps {
    pitch: PitchView
}

export function PitchCardContent({pitch}: Readonly<PitchCardContentProps>) {
    return (
        <CardContent sx={{flexGrow: 1, p: 3}}>
            {/* Title and Type */}
            <Box sx={{justifyContent: "left", alignItems: "center", display: "flex"}}>
                <Typography sx={{mb: 1}}
                            variant="h6"
                >
                    {pitch.name}
                </Typography>
            </Box>

            <Box sx={{justifyContent: "left", alignItems: "center", display: "flex"}}>
                <Typography variant="body1" sx={{mb: 1}}>
                    {pitch.location.name}
                </Typography>
            </Box>

            <Divider sx={{mb: 3}}/>

            {/* Description */}
            <Box sx={{mb: 3, justifyContent: "left", alignItems: "center", display: "flex"}}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        mb: 2
                    }}
                >
                    {pitch.description} Lorem Ipsum Description for Pitches, because I was lazy to implement the
                    description
                </Typography>
            </Box>

            <Box>
                <Stack direction="row" spacing={2}>
                    {pitch.properties.map((property: string) => (
                        <Tooltip title={property} key={property} placement="top">
                            <Chip size="medium"
                                  icon={pitchPropertyIconMap[property]}
                                  sx={{
                                      '& .MuiChip-label': {
                                          padding: 0.8,
                                      },
                                  }}
                            />
                        </Tooltip>
                    ))}
                    {pitch.location.properties.map((property: string) => (
                        <Tooltip title={property} key={property} placement="top">
                            <Chip size="medium"
                                  icon={locationPropertyIconMap[property]}
                                  sx={{
                                      '& .MuiChip-label': {
                                          padding: 0.8,
                                      },
                                  }}
                            />
                        </Tooltip>
                    ))}
                </Stack>
            </Box>

        </CardContent>
    );
}