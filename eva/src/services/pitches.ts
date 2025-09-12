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
        GRASS: '#7ba05b',
        ARTIFICIAL_GRASS: '#4d8055',
        CONCRETE: '#b0b0b0',
        ASPHALT: '#4a4a4a',
        TURF: '#88b06a',
        HARDCOURT: '#a16d5d',
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