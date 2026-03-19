import React, {useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import 'leaflet/dist/leaflet.css';
import type {LocationView} from "../../../services/location.ts";
import {LocationCard} from "../card/LocationCard.tsx";
import type {UserLocation} from "../../../services/distance.ts";
interface LocationsMapProps {
    locations: LocationView[];
}

const LocationsMap: React.FC<LocationsMapProps> = ({ locations }) => {
    const theme = useTheme();
    const [userLocation] = useState<UserLocation | null>(null);

    const calculateCenter = (): [number, number] => {
        if (locations.length === 0) return [47.5, 19.04]; // Default Budapest
        
        const avgLat = locations.reduce((sum, loc) => sum + ( parseInt(loc.geom?.x) || 0), 0) / locations.length;
        const avgLng = locations.reduce((sum, loc) => sum + (parseInt(loc.geom?.y) || 0), 0) / locations.length;
        return [avgLat, avgLng];
    };

    const LocationPopup = ({ location }: { location: LocationView }) => (
        <LocationCard location={location} userLocation={userLocation} useImage={false} />
    );

    const center = calculateCenter();

    return (
        <Box sx={{height: '800px', borderRadius: 3, overflow: 'hidden', border: `1px solid ${theme.palette.divider}`}}>
            <MapContainer
                center={center}
                zoom={locations.length > 0 ? 6 : 4}
                style={{height: '100%', width: '100%'}}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='"&copy; OpenStreetMap & CARTO"'
                />
                
                {locations.map((location) => (
                    location.geom && (
                        <Marker
                            key={`${location.id}`}
                            position={[parseInt(location.geom.x), parseInt(location.geom.y)]}
                        >
                            <Popup maxWidth={300}>
                                <LocationPopup location={location} />
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </Box>
    );
};

export default LocationsMap;


