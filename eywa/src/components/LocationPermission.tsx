import {Alert, Button} from "@mui/material";
import type {UserLocation} from "../services/distance.ts";

interface LocationPermissionProps {
    setUserLocation: (value: (((prevState: (UserLocation | null)) => (UserLocation | null)) | UserLocation | null)) => void,
    setLocationPermission: (value: (((prevState: ("granted" | "denied" | "prompt")) => ("granted" | "denied" | "prompt")) | "granted" | "denied" | "prompt")) => void,
}

export function LocationPermission({
                                       setLocationPermission,
                                       setUserLocation,
                                   }: Readonly<LocationPermissionProps>) {
    return (
        <Alert
            severity="info"
            sx={{mb: 3, borderRadius: 2}}
            action={
                <Button
                    color="inherit"
                    size="small"
                    onClick={() => {
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(
                                (position) => {
                                    setUserLocation({
                                        latitude: position.coords.latitude,
                                        longitude: position.coords.longitude
                                    });
                                    setLocationPermission('granted');
                                },
                                () => setLocationPermission('denied')
                            );
                        }
                    }}
                >
                    Enable Location
                </Button>
            }
        >
            Enable location access to see distances and get directions to football locations.
        </Alert>
    );
}