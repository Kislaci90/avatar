import type {VenueView} from "./location.ts";
import theme from "../theme/theme.ts";

export type SearchVenuesResult = {
    searchVenues: SearchVenues,
}

export type SearchVenues = {
    total: number,
    content: VenueView[],
}


export type GetVenueResult = {
    getVenue: VenueView,
}

export function getSurfaceTypeColor (surfaceType: string){
    const colors: { [key: string]: string } = {
        GRASS: '#5c7d45',
        ARTIFICIAL_GRASS: '#3d6543',
        CONCRETE: '#8c8c8c',
        ASPHALT: '#333333',
        TURF: '#6c8f57',
        HARDCOURT: '#885c50',
    };
    return colors[surfaceType] || theme.palette.grey[500];
}

export function getVenueTypeColor (venueType: string) {
    const colors: { [key: string]: string } = {
        'FULL_SIZE': '#5a7539',
        'HALF_SIZE': '#88b06a',
        'FIVE_A_SIDE': '#477572',
        'SEVEN_A_SIDE': '#667157',
        'INDOOR': '#a5a5a5',
        'OUTDOOR': '#f9a825',
    }
    return colors[venueType] || theme.palette.grey[500];
}