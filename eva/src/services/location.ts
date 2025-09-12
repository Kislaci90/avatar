export type SearchLocationResult = {
    searchLocations: SearchLocations,
}

export type GetLocationResult = {
    getLocation: LocationView,
}

export type SearchLocations = {
    total: number,
    content: [LocationView],
}

export type LocationView = {
    id : number,
    name: string,
    description: string,
    website: string,
    geom: PointView,
    address: Address,
    contact: Contact,
    properties: [string],
    pitches: [PitchView]
}

export type PointView = {
    x: string
    y: string
}

export type Contact = {
    contactName: string,
    email: string,
    phoneNumber: string
}

export type Address = {
    city: string,
    addressLine: string,
    postalCode: string,
}

export type PitchView = {
    id: number,
    name: string,
    pitchType: string,
    surfaceType: string,
    properties: [string],
    location: LocationView,
}