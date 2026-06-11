import type {LazyLocationView, LocationView} from "./location.ts";

export type UserLocation = {
    latitude: number;
    longitude: number;
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export function formatDistance(distance: number): string {
    if (distance < 1) {
        return `${Math.round(distance * 1000)}m`;
    } else if (distance < 10) {
        return `${distance.toFixed(1)}km`;
    } else {
        return `${Math.round(distance)}km`;
    }
}

export function getGoogleMap(location: LocationView | LazyLocationView, zoom: number, size: string) {
    const markerColor = "0xFF6D00"
    return `https://maps.googleapis.com/maps/api/staticmap?center=${location.geom.x},${location.geom.y}&zoom=${zoom}&size=${size}&markers=color:${markerColor}%7C${location.geom.x},${location.geom.y}&style=feature:poi|visibility:off&style=feature:transit|visibility:off&key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}`
}

export function getMediumGoogleMap(location: LocationView | LazyLocationView) {
    const zoom = 13
    const size = "400x300"

    return getGoogleMap(location, zoom, size);
}

export function getLargeGoogleMap(location: LocationView | LazyLocationView) {
    const zoom = 11
    const size = "640x640"

    return getGoogleMap(location, zoom, size);
}