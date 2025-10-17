import {LocationOn} from "@mui/icons-material";
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
            <Box sx={{mb: 2}}>
                <Typography
                    variant="h5"
                    color="text.primary"
                    sx={{
                        mb: 1,
                        lineHeight: 1.2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    <LocationOn color="primary"/> {pitch.location.name} / {pitch.name}
                </Typography>
                <Divider/>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexWrap: 'wrap'
                }}>
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
                {pitch.description} Lorem Ipsum Description for Pitches, because I was lazy to implement the
                description
            </Typography>

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