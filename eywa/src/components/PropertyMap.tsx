import type {JSX} from "react";
import ShowerIcon from '@mui/icons-material/Shower';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import CircleIcon from '@mui/icons-material/Circle';
import SportsSoccerIcon from '@mui/icons-material/SportsHandball';
import HighlightIcon from '@mui/icons-material/Highlight';
import FestivalIcon  from '@mui/icons-material/Festival';
import theme from "../theme/theme.ts";
import {getSurfaceTypeColor, getVenueTypeColor} from "../services/venues.ts";

export const getLocationAmenityIcon = (amenity: string): JSX.Element => {
    const icon = locationAmenityIconMap[amenity];
    if (!icon) {
        throw new Error(`No icon found for amenity: ${amenity}`);
    }
    return icon;
}

export const locationAmenityIconMap: Record<string, JSX.Element> = {
    FREE_PARKING: <LocalParkingIcon sx={{color: theme.palette.primary.main}} />,
    SHOWER: <ShowerIcon sx={{color: theme.palette.primary.main}}/>,
    CHANGING_ROOM: <CheckroomIcon sx={{color: theme.palette.primary.main}}/>,
    CAFE: <LocalCafeIcon sx={{color: theme.palette.primary.main}}/>,
    EQUIPMENT_RENTAL: <SportsSoccerIcon sx={{color: theme.palette.primary.main}}/>,
};

export const getVenuePropertyIcon = (venueProperty: string): JSX.Element => {
    const icon = venuePropertyIconMap[venueProperty];
    if (!icon) {
        throw new Error(`No icon found for venue property: ${venueProperty}`);
    }
    return icon;
}

export const venuePropertyIconMap: Record<string, JSX.Element> = {
    LIGHTING: <HighlightIcon sx={{color: theme.palette.primary.main}} />,
    COVERED: <FestivalIcon  sx={{color: theme.palette.primary.main}}/>,
};

export const getVenueTypeIcon = (venueType: string): JSX.Element => {
    const color = getVenueTypeColor(venueType);
    return <CircleIcon sx={{fill: color}} />;
};

export const getSurfaceTypeIcon = (venueType: string): JSX.Element => {
    const color = getSurfaceTypeColor(venueType);
    return <CircleIcon sx={{fill: color}} />;
};