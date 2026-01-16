import {GpsFixed} from "@mui/icons-material";
import {Chip} from "@mui/material";
import {calculateDistance, formatDistance, type UserLocation} from "../../services/distance.ts";
import type {PointView} from "../../services/location.ts";

interface LocationDistanceProps {
    userLocation: UserLocation | null,
    geom: PointView
}

export function LocationDistance({userLocation, geom}: Readonly<LocationDistanceProps>) {
    return (
        <>
            {userLocation != null &&
                <Chip
                    icon={<GpsFixed sx={{color: "white"}}/>}
                    color="info"
                    variant="outlined"
                    size="small"
                    label={formatDistance(calculateDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        parseInt(geom.x),
                        parseInt(geom.y)
                    ))}
                    sx={{
                        backgroundColor: 'white',
                        fontWeight: 700,
                    }}
                />
            }
        </>
    );
}