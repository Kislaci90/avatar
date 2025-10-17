import React, {useEffect, useState} from 'react';
import { gql } from '@apollo/client';
import {useQuery} from "@apollo/client/react";
import {Alert, Box, CircularProgress, Container, Grid, Typography} from '@mui/material';
import {LoadMoreButton} from "../components/location/LoadMoreButton";
import {LocationCard} from "../components/location/LocationCard";
import type {UserLocation} from "../services/distance";
import {LocationSearchHeader} from "../components/LocationSearchHeader.tsx";
import type {SearchLocationResult} from "../services/location.ts";
import {LocationPermission} from "../components/LocationPermission.tsx";

const SEARCH_LOCATIONS = gql`
    query SearchLocations(
        $filter: LocationFilter!,
        $count:Int!,
        $offset:Int!,
        $sort:SortQuery!,
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

export type Filters = {
    searchTerm: string;
    properties: string[];
};

const LocationList: React.FC = () => {
    const [filters, setFilters] = useState<Filters>({
        searchTerm: '',
        properties: [""],
    });
    const [sort] = useState({
        field: 'name',
        direction: 'ASC'
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [locations, setLocations] = useState<any[]>([]);
    const [, setUserLocation] = useState<UserLocation | null>(null);
    const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

    // Get user's location on component mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    setLocationPermission('granted');
                },
                (error) => {
                    console.log('Location permission denied or error:', error);
                    setLocationPermission('denied');
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                }
            );
        }
    }, []);

    const {data, loading, error, refetch} = useQuery<SearchLocationResult>(SEARCH_LOCATIONS, {
        variables: {
            filter: filters,
            count: 0,
            offset: currentPage * 12,
            sort: sort
        }
    });

    useEffect(() => {
        if (data?.searchLocations) {
            console.log(data?.searchLocations.content);
            setLocations(data.searchLocations.content);
            setHasMore(data.searchLocations.content.length >= 12);
        }
    }, [data]);

    const handleSearch = () => {
        setCurrentPage(1);
        setHasMore(true);
        refetch({
            filters: filters,
            count: 12, // Number of items per page
            offset: currentPage * 12,
            sort: sort
        });
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);

        const itemsPerPage = 12;
        const totalItems = locations.length;
        const displayedItems = (nextPage + 1) * itemsPerPage;

        setHasMore(displayedItems < totalItems);
    };

    return (
        <Box sx={{bgcolor: 'background.default', minHeight: '100vh', py: 6}}>
            <Container maxWidth="lg">
                {locationPermission === 'denied' && (
                    <LocationPermission setLocationPermission={setLocationPermission} setUserLocation={setUserLocation} />
                )}

                <LocationSearchHeader filters={filters} setFilters={setFilters} handleSearch={handleSearch}/>

                {loading && (
                    <Box textAlign="center" py={6}>
                        <CircularProgress/>
                    </Box>
                )}
                {error && (
                    <Alert severity="error" sx={{mb: 4}}>
                        {error.message}
                    </Alert>
                )}
                {locations.length === 0 && !loading && (
                    <Alert severity="info" sx={{mb: 4}}>
                        No locations found matching your criteria. Try adjusting your filters.
                    </Alert>
                )}

                {/* Results Count and Stats */}
                {locations.length > 0 && (
                    <Box sx={{mb: 4}}>
                        <Typography variant="h5" fontWeight={700} color="primary.main">
                            Search Results
                        </Typography>
                    </Box>
                )}

                {locations.length > 0 && (
                    <Box sx={{mb: 6}}>
                        <Grid container spacing={3}>
                            {locations.map((location: any) => (
                                <Grid size={{xs:12, sm:6, lg:4}} key={location.id}>
                                    <LocationCard location={location}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {hasMore && locations.length > 0 && (
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 6}}>
                        <LoadMoreButton loading={loading} onClick={handleLoadMore}/>
                    </Box>
                )}

                {!hasMore && locations.length > 0 && (
                    <Box sx={{textAlign: 'center', mt: 6, py: 4}}>
                        <Typography variant="h6" color="text.secondary" sx={{mb: 2}}>
                            🎯 You've seen all available locations!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Try adjusting your filters to find more matches.
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default LocationList;