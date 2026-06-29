import {Alert, Button, Box} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
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
                <Box sx={{display: 'flex', gap: 1}}>
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
                    <Button
                        color="inherit"
                        size="small"
                        onClick={() => setLocationPermission('prompt')}
                        sx={{minWidth: 'auto', p: 0}}
                    >
                        <CloseIcon sx={{fontSize: '1.2rem'}} />
                    </Button>
                </Box>
            }
        >
            Enable location access to see distances and get directions to football locations.
        </Alert>
    );
}