import type {JSX} from "react";
import ShowerIcon from '@mui/icons-material/Shower';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import SportsSoccerIcon from '@mui/icons-material/SportsHandball';
import HighlightIcon from '@mui/icons-material/Highlight';
import FestivalIcon  from '@mui/icons-material/Festival';
import theme from "../theme/theme.ts";

export const locationPropertyIconMap: Record<string, JSX.Element> = {
    FREE_PARKING: <LocalParkingIcon sx={{color: theme.palette.secondary.main}} />,
    SHOWER: <ShowerIcon sx={{color: theme.palette.secondary.main}}/>,
    CHANGING_ROOM: <CheckroomIcon sx={{color: theme.palette.secondary.main}}/>,
    CAFE: <LocalCafeIcon sx={{color: theme.palette.secondary.main}}/>,
    EQUIPMENT_RENTAL: <SportsSoccerIcon sx={{color: theme.palette.secondary.main}}/>,
};

export const pitchPropertyIconMap: Record<string, JSX.Element> = {
    LIGHTING: <HighlightIcon sx={{color: theme.palette.secondary.main}} />,
    COVERED: <FestivalIcon  sx={{color: theme.palette.secondary.main}}/>,
};