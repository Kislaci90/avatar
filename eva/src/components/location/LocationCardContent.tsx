import {Box, Button, CardContent, Chip, Divider, Stack, Typography, useTheme} from "@mui/material";
import {Directions, LocationOn} from "@mui/icons-material";
import {getDirectionsUrl} from "../../services/distance";
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

            {/* Description */}
            <Typography
                variant="body2"
                sx={{mb: 2, minHeight: 60}}
            >
                {location.description || 'A fantastic football location with multiple pitches and excellent facilities.'}
            </Typography>

            {/* Address and Location Info */}
            <Box sx={{mb: 3}}>
                <Typography
                    variant="body2"
                    sx={{mb: 1}}
                >
                    <LocationOn sx={{fontSize: 14, color: theme.palette.primary.main}}/>
                    {location.address.addressLine}
                </Typography>

                {/* Directions Button */}
                <Button
                    variant="outlined"
                    size="medium"
                    startIcon={<Directions/>}
                    sx={{
                        color: theme.palette.info.main,
                        '&:hover': {
                            bgcolor: 'white'
                        }
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(getDirectionsUrl(location), '_blank');
                    }}
                >
                    Get Directions
                </Button>
            </Box>

            <Box>
                <Stack direction="row" spacing={2}>
                    {location.properties.map((property: string) => (
                        <Chip size="medium" icon={locationPropertyIconMap[property]} key={property}/>
                    ))}
                </Stack>
            </Box>
        </CardContent>
    );
}