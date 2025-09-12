import {GpsFixed} from "@mui/icons-material";
import {Chip} from "@mui/material";
import {calculateDistance, formatDistance, type UserLocation} from "../../services/distance.ts";
import theme from "../../theme/theme.ts";
import type {PointView} from "../../services/location.ts";

interface LocationDistanceProps {
    userLocation: UserLocation,
    geom: PointView
}

export function LocationDistance({userLocation, geom}: Readonly<LocationDistanceProps>) {
    return (
        <Chip
            icon={<GpsFixed sx={{fontSize: 32, color: 'white'}}/>}
            label={formatDistance(calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                parseInt(geom.x),
                parseInt(geom.y)
            ))}
            size="small"
            sx={{
                bgcolor: theme.palette.info.main,
                color: 'white',
            }}
        />
    );
}