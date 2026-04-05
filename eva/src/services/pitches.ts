import {gql} from "@apollo/client";
import type {PitchView} from "./location.ts";
import theme from "../theme/theme.ts";

export type SearchPitchesResult = {
    searchPitches: SearchPitches,
}

export type SearchPitches = {
    total: number,
    content: PitchView[],
}


export type GetPitchResult = {
    getPitch: PitchView,
}

export type PitchInput = {
    name: string,
    description: string,
    pitchType: string,
    surfaceType: string,
    properties: string[],
    locationId: number,
}

export const CREATE_PITCH = gql`
    mutation CreatePitch($pitchInput: PitchInput!) {
        createPitch(pitchInput: $pitchInput) {
            id
            name
            description
            pitchType
            surfaceType
            properties
            location {
                id
                name
            }
        }
    }
`;

export const UPDATE_PITCH = gql`
    mutation UpdatePitch($id: Int!, $pitchInput: PitchInput!) {
        updatePitch(id: $id, pitchInput: $pitchInput) {
            id
            name
            description
            pitchType
            surfaceType
            properties
            location {
                id
                name
            }
        }
    }
`;

export const DELETE_PITCH = gql`
    mutation DeletePitch($id: Int!) {
        deletePitch(id: $id)
    }
`;

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