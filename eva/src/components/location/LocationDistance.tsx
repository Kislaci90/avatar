import {GpsFixed} from "@mui/icons-material";
import {Chip} from "@mui/material";
import {calculateDistance, formatDistance, type UserLocation} from "../../services/distance.ts";
import type {PointView} from "../../services/location.ts";

interface LocationDistanceProps {
    userLocation: UserLocation,
    geom: PointView
}

export function LocationDistance({userLocation, geom}: Readonly<LocationDistanceProps>) {
    return (
        <Chip
            icon={<GpsFixed sx={{color: "white"}}/>}
            color="info"
            label={formatDistance(calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                parseInt(geom.x),
                parseInt(geom.y)
            ))}
        />
    );
}