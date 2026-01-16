import React, {useEffect, useState} from 'react';
import {gql} from '@apollo/client';
import {useQuery} from "@apollo/client/react";
import {Alert, Box, CircularProgress, Container, Grid, Typography} from '@mui/material';
import {LoadMoreButton} from "../components/location/LoadMoreButton";
import {LocationCard} from "../components/location/card/LocationCard.tsx";
import type {UserLocation} from "../services/distance";
import {LocationSearchHeader} from "../components/location/LocationSearchHeader.tsx";
import type {SearchLocationResult} from "../services/location.ts";
import {LocationPermission} from "../components/LocationPermission.tsx";
import theme from "../theme/theme.ts";

const SEARCH_LOCATIONS = gql`
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

export type LocationFilter = {
    searchTerm: string;
    locationProperties: string[];
    cities: string[];
};

const LocationList: React.FC = () => {
    const [filters, setFilters] = useState<LocationFilter>({
        searchTerm: '',
        locationProperties: [],
        cities: [],
    });
    const [sort, setSort] = useState<string>();
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [locations, setLocations] = useState<any[]>([]);
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

    const handleFilterChange = <K extends keyof LocationFilter>(
        field: K,
        value: LocationFilter[K]
    ) => {
        setFilters(prev => ({...prev, [field]: value}));
    };

    const clearFilters = () => {
        setFilters({
            searchTerm: '',
            locationProperties: [],
            cities: [],
        });
        setCurrentPage(0);
        setHasMore(true);
    };


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
            offset: currentPage * 6,
            sort: sort
        }
    });

    useEffect(() => {
        if (data?.searchLocations) {
            console.log(data?.searchLocations.content);
            setLocations(data.searchLocations.content);
            setHasMore(data.searchLocations.content.length >= 6);
        }
    }, [data]);

    const handleSearch = () => {
        setCurrentPage(1);
        setHasMore(true);
        refetch({
            filters: filters,
            count: 6, // Number of items per page
            offset: currentPage * 6,
            sort: sort
        });
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);

        const itemsPerPage = 6;
        const totalItems = locations.length;
        const displayedItems = (nextPage + 1) * itemsPerPage;

        setHasMore(displayedItems < totalItems);
    };

    return (
        <Box sx={{minHeight: '100vh'}}>
            <Box sx={{
                pyb: 1,
                borderBottom: `1px solid ${theme.palette.divider}`,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}15 100%)`
            }}>
                <Container maxWidth="lg">
                    {locationPermission === 'denied' && (
                        <LocationPermission setLocationPermission={setLocationPermission}
                                            setUserLocation={setUserLocation}/>
                    )}

                    <LocationSearchHeader filters={filters} clearFilters={clearFilters}
                                          handleSearch={handleSearch} setSort={setSort}
                                          handleFilterChange={handleFilterChange}/>
                </Container>
            </Box>
            <Container maxWidth="lg" sx={{py: 4}}>
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

                {locations.length > 0 && (
                    <Box sx={{mb: 6}}>
                        <Grid container spacing={3}>
                            {locations.map((location: any) => (
                                <Grid size={{xs: 12, sm: 6, lg: 4}} key={location.id}>
                                    <LocationCard location={location} userLocation={userLocation}/>
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