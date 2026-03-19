import {gql} from "@apollo/client";

export const GET_LOCATION_SEARCH_FILTERS = gql`
    query GetLocationSearchFilters {
        getLocationSearchFilters {
            cities
            locationProperties
        }
    }
`;

export type GetLocationSearchFilterResult = {
    getLocationSearchFilters: LocationSearchFilter,
}

export type LocationSearchFilter = {
    cities: [string],
    locationProperties: [string],
}

export const SEARCH_LOCATIONS = gql`
    query SearchLocations(
        $filter: LocationFilter!,
        $count:Int!,
        $offset:Int!,
        $sort:String,
    ) {
        searchLocations(
            filter: $filter,
            count: $count,
            offset: $offset,
            sort: $sort,
        ) {
            total
            pageable {
                pageNumber
                pageSize
            }
            content {
                id
                name
                description
                website
                address {
                    addressLine
                    postalCode
                    city
                }
                contact {
                    contactName
                    email
                    phoneNumber
                }
                geom {
                    x
                    y
                }
                properties
                pitches {
                    id
                    name
                    pitchType
                    surfaceType
                    properties
                }
            }
        }
    }
`;

export type SearchLocationResult = {
    searchLocations: SearchLocations,
}

export type GetLocationResult = {
    getLocation: LocationView,
}

export type SearchLocations = {
    total: number,
    pageable: {
        pageNumber: number,
        pageSize: number,
    },
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

export type LazyLocationView = {
    id : number,
    name: string,
    description: string,
    website: string,
    geom: PointView,
    address: Address,
    contact: Contact,
    properties: [string],
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
    description: string,
    name: string,
    pitchType: string,
    surfaceType: string,
    properties: [string],
    location: LazyLocationView,
}