import {Box, CardContent, Chip, Divider, Link, Stack, Tooltip, Typography} from "@mui/material";
import {type LocationView} from "../../../services/location.ts";
import {locationPropertyIconMap} from "../../PropertyMap.tsx";
import {useNavigate} from "react-router-dom";

interface LocationCardContentProps {
    location: LocationView
}

export function LocationCardContent({location}: Readonly<LocationCardContentProps>) {
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
                    {location.name}
                </Typography>
            </Box>

            <Box sx={{justifyContent: "space-between", alignItems: "center", display: "flex"}}>
                <Typography variant="body1" sx={{mb: 1}}>
                    <Link component="button" underline="none" onClick={() => {
                        navigate(`/locations/${location.id}`)
                    }}>{location.address.city}</Link>
                </Typography>
                <Box>
                    <Chip sx={{border: "none"}} size="small" color="primary" variant="outlined"
                          label={`${location.pitches?.length || 0} Pitches`}/>
                </Box>
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
                    {location.description || 'A fantastic football location with multiple pitches and excellent facilities.'}
                </Typography>
            </Box>

            <Box>
                <Stack direction="row" spacing={2} useFlexGap
                       sx={{flexWrap: 'wrap'}}>
                    {location.properties.map((property: string) => (
                        <Tooltip title={property} key={property} placement="top">
                            <Chip size="medium"
                                  variant="outlined"
                                  color="secondary"
                                  sx={{
                                      '& .MuiChip-label': {
                                          px: 0.7,
                                      },
                                      border: "none"
                                  }}
                                  icon={locationPropertyIconMap[property]}
                            />
                        </Tooltip>
                    ))}
                </Stack>
            </Box>
        </CardContent>
    );
}