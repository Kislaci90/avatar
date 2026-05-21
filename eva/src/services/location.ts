import {gql} from "@apollo/client";

export const GET_SEARCH_FILTERS = gql`
    query GetSearchFilters {
        getSearchFilters {
            cities
            locationAmenities
            surfaceTypes
            venueTypes
            venueProperties
        }
    }
`;

export type GetLocationSearchFilterResult = {
    getSearchFilters: LocationSearchFilter,
}

export type LocationSearchFilter = {
    cities: string[],
    locationAmenities: string[],
    venueProperties: string[],
    venueTypes: string[],
    surfaceTypes: string[],
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
                amenities
                venues {
                    id
                    name
                    venueType
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
    content: LocationView[],
}

export type LocationView = {
    id : number,
    name: string,
    description: string,
    website: string,
    geom: PointView,
    address: Address,
    contact: Contact,
    amenities: [string],
    venues: [VenueView]
}

export type LazyLocationView = {
    id : number,
    name: string,
    description: string,
    website: string,
    geom: PointView,
    address: Address,
    contact: Contact,
    amenities: [string],
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

export type VenueView = {
    id: number,
    description: string,
    name: string,
    venueType: string,
    surfaceType: string,
    properties: [string],
    location: LazyLocationView,
}