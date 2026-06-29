import {Box, CardContent, Checkbox, Chip, Divider, Stack, Tooltip, Typography} from "@mui/material";
import {type LocationView} from "../../../services/location.ts";
import {locationAmenityIconMap} from "../../PropertyMap.tsx";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {CityLink} from "../../CityLink.tsx";

interface LocationCardContentProps {
    location: LocationView
}

export function LocationCardContent({location}: Readonly<LocationCardContentProps>) {

    return (
        <CardContent sx={{flexGrow: 1, p: 3}}>
            <Box sx={{justifyContent: "space-between", alignItems: "center", display: "flex"}}>
                <CityLink city={location.address.city}/>
            </Box>

            <Box sx={{justifyContent: "space-between", alignItems: "center", display: "flex"}}>
                <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{
                        mb: 1,
                    }}
                >
                    {location.name}
                </Typography>
                <Box>
                    <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} color="secondary"/>
                </Box>
            </Box>

            <Divider sx={{mb: 3}}/>

            <Box sx={{mb: 2}}>
                <Stack direction="row" spacing={1}
                       useFlexGap
                       sx={{flexWrap: 'wrap', justifyContent: "flex-start"}}>
                    {location.amenities.map((property: string) => (
                        <Tooltip title={property} key={property} placement="top">
                            <Chip size="small"
                                  variant="outlined"
                                  color="primary"
                                  sx={{
                                      '& .MuiChip-label': {
                                          px: 0.7,
                                      },
                                      border: "none"
                                  }}
                                  icon={locationAmenityIconMap[property]}
                            />
                        </Tooltip>
                    ))}
                </Stack>
            </Box>
        </CardContent>
    );
}