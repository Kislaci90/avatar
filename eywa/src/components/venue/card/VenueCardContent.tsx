import {Box, CardContent, Checkbox, Chip, Divider, Stack, Tooltip, Typography} from "@mui/material";
import {pitchPropertyIconMap} from "../../PropertyMap.tsx";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {CityLink} from "../../CityLink.tsx";
import type {VenueView} from "../../../generated/graphql-schema.ts";

interface PitchCardContentProps {
    pitch: VenueView
}

export function VenueCardContent({pitch}: Readonly<PitchCardContentProps>) {
    return (
        <CardContent sx={{flexGrow: 1, p: 3}}>
            <Box sx={{justifyContent: "space-between", alignItems: "center", display: "flex"}}>
                <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{
                        mb: 1,
                    }}
                >
                    {pitch.name}
                </Typography>
                <Box>
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} color="secondary"/>
                </Box>
            </Box>

            <Box sx={{justifyContent: "space-between", alignItems: "center", display: "flex"}}>
                <CityLink city={pitch.location.address.city}/>
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