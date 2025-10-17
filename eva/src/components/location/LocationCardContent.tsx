import {Box, CardContent, Chip, Divider, Stack, Tooltip, Typography, useTheme} from "@mui/material";
import {LocationOn} from "@mui/icons-material";
import {type LocationView} from "../../services/location.ts";
import {locationPropertyIconMap} from "../PropertyMap.tsx";

interface LocationCardContentProps {
    location: LocationView
}

export function LocationCardContent({location}: Readonly<LocationCardContentProps>) {
    const theme = useTheme();

    return (
        <CardContent sx={{flexGrow: 1, p: 3}}>
            {/* Title and Location */}
            <Box sx={{mb: 2}}>
                <Typography
                    variant="h5"
                    color="text.primary"
                    sx={{
                        mb: 1,
                    }}
                >
                    {location.name}
                </Typography>
            </Box>

            <Divider sx={{mb: 3}}/>

            {/* Address and Location Info */}
            <Box sx={{mb: 3}}>
                <Typography
                    variant="h5"
                    sx={{mb: 1}}
                >
                    <LocationOn sx={{fontSize: 20, color: theme.palette.primary.main}}/>
                    {location.address.addressLine}
                </Typography>
            </Box>

            {/* Description */}
            <Typography
                variant="body2"
                sx={{mb: 2, minHeight: 60}}
            >
                {location.description || 'A fantastic football location with multiple pitches and excellent facilities.'}
            </Typography>

            <Box>
                <Stack direction="row" spacing={2}>
                    {location.properties.map((property: string) => (
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