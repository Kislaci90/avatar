import {Box, Chip, useTheme} from "@mui/material";
import type {LocationView} from "../../../services/location.ts";
import type {UserLocation} from "../../../services/distance.ts";
import {LocationOn} from "@mui/icons-material";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface LocationCardImageProps {
    location: LocationView,
    userLocation: UserLocation | null
}

export function LocationCardImage({location}: Readonly<LocationCardImageProps>) {
    const theme = useTheme()

    const mapCenter: [number, number] = [
        parseInt(location.geom?.x?.toString() || '47.5'),
        parseInt(location.geom?.y?.toString() || '19.04')
    ];

    return (
        <Box sx={{position: 'relative', overflow: 'hidden', height: 300, m: 0.5, borderRadius: 1.5}}>
            <MapContainer
                center={mapCenter}
                zoom={13}
                style={{height: '100%', width: '100%'}}
                dragging={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                keyboard={false}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapCenter} />
            </MapContainer>

            <Box
                className="card-overlay"
                sx={{
                    position: 'absolute',
                    top: 150,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(to top, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main}66 10%, transparent 100%)` ,
                    opacity: 1,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    pointerEvents: 'none',
                }}
            >
            </Box>

            <Box sx={{
                position: 'absolute',
                bottom: 12,
                left: 12,
                p: 0.8,
                borderRadius: 1,
                backdropFilter: "blur(2px)",
                zIndex: 1,
            }}>
                <Chip label={location.address.addressLine}
                      variant="outlined"
                      color="primary"
                      size="small"
                      icon={<LocationOn/>}
                      sx={{
                          backgroundColor: 'white',
                          fontWeight: 700,
                      }}
                />
            </Box>

            <Box sx={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                p: 0.8,
                borderRadius: 1,
                backdropFilter: "blur(2px)",
            }}>
            </Box>


        </Box>
    );
}