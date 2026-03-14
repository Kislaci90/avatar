import {Box, CardContent, Chip, Divider, Link, Stack, Tooltip, Typography} from "@mui/material";
import {pitchPropertyIconMap} from "../../PropertyMap.tsx";
import type {PitchView} from "../../../services/location.ts";
import {useNavigate} from "react-router-dom";

interface PitchCardContentProps {
    pitch: PitchView
}

export function PitchCardContent({pitch}: Readonly<PitchCardContentProps>) {
    const navigate = useNavigate()

    return (
        <CardContent sx={{flexGrow: 1, p: 3}}>
            <Box sx={{justifyContent: "left", alignItems: "center", display: "flex"}}>
                <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{
                        mb: 1,
                    }}
                >
                    {pitch.name}
                </Typography>
            </Box>

            <Box sx={{justifyContent: "space-between", alignItems: "center", display: "flex"}}>
                <Typography variant="body1" sx={{mb: 1}}>
                    <Link component="button" underline="none" onClick={() => {
                        navigate(`/pitches/${pitch.id}`)
                    }}>{pitch.location.address.city}</Link>
                </Typography>
                <Typography variant="body1" sx={{mb: 1}}>
                    <Link component="button" underline="none" onClick={() => {
                        navigate(`/locations/${pitch.location.id}`)
                    }}>{pitch.location.name}</Link>
                </Typography>
            </Box>

            <Divider sx={{mb: 3}}/>

            {/* Description */}
            <Box sx={{mb: 3, justifyContent: "left", alignItems: "center", display: "flex"}}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary'
                    }}
                >
                    {pitch.description || 'A fantastic football location with multiple pitches and excellent facilities.'}
                </Typography>
            </Box>

            <Box>
                <Stack direction="row" spacing={1} useFlexGap
                       sx={{flexWrap: 'wrap', justifyContent: "flex-start"}}>
                    {pitch.properties.map((property: string) => (
                        <Tooltip title={property} key={property} placement="top">
                            <Chip size="small"
                                  variant="outlined"
                                  color="primary"
                                  label={property}
                                  sx={{
                                      '& .MuiChip-label': {
                                          px: 0.7,
                                      },
                                      border: "none"
                                  }}
                                  icon={pitchPropertyIconMap[property]}
                            />
                        </Tooltip>
                    ))}
                </Stack>
            </Box>

        </CardContent>
    );
}