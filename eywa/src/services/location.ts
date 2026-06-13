import {gql} from "@apollo/client";
export type {LocationView} from "../generated/graphql-schema";

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