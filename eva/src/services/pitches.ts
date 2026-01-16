import type {PitchView} from "./location.ts";
import theme from "../theme/theme.ts";

export type SearchPitchesResult = {
    searchPitches: SearchPitches,
}

export type SearchPitches = {
    total: number,
    content: [PitchView],
}


export type GetPitchResult = {
    getPitch: PitchView,
}

export function getSurfaceTypeColor (surfaceType: string){
    const colors: { [key: string]: string } = {
        GRASS: '#5c7d45',            // darker green
        ARTIFICIAL_GRASS: '#3d6543', // muted green
        CONCRETE: '#8c8c8c',         // softer gray
        ASPHALT: '#333333',          // darker gray
        TURF: '#6c8f57',             // soft green
        HARDCOURT: '#885c50',        // muted brown/red
    };
    return colors[surfaceType] || theme.palette.grey[500];
}

export function getPitchTypeColor (pitchType: string) {
    const colors: { [key: string]: string } = {
        'FULL_SIZE': '#5a7539',
        'HALF_SIZE': '#88b06a',
        'FIVE_A_SIDE': '#477572',
        'SEVEN_A_SIDE': '#667157',
        'INDOOR': '#a5a5a5',
        'OUTDOOR': '#f9a825',
    }
    return colors[pitchType] || theme.palette.grey[500];
}