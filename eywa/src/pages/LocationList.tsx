import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client/react";
import {Alert, Box, Container, Grid, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {LoadMoreButton} from "../components/location/LoadMoreButton";
import {LocationCard} from "../components/location/card/LocationCard.tsx";
import type {UserLocation} from "../services/distance";
import {SearchHeader} from "../components/search/SearchHeader.tsx";
import {LocationPermission} from "../components/LocationPermission.tsx";
import LocationsMap from "../components/location/map/LocationsMap";
import theme from "../theme/theme.ts";
import {type Filter, handleFilterChange} from "../services/filters";
import {useSearchParams} from "react-router-dom";
import {SearchLocationsDocument} from "../generated/graphql.ts";
import {graphql} from "../generated";
import type {LocationView} from "../generated/graphql-schema.ts";
import ViewToggle from "../components/location/ViewToggle.tsx";
import {AdvancedFilter} from "../components/search/AdvancedFilter.tsx";
import {SortSelect} from "../components/search/SortSelect.tsx";
import {SearchHeroSection} from "../components/search/SearchHeroSection.tsx";

graphql(`
    query SearchLocations(
        $filter: LocationFilter!,
        $count:Int!,
        $offset:Int!,
        $sort:String!,
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
`);

const LocationList: React.FC = () => {
    const {t} = useTranslation();
    const [searchParams] = useSearchParams()
    const [view, setView] = useState<'grid' | 'map'>('grid');
    const [filters, setFilters] = useState<Filter>({
        searchTerm: '',
        locationAmenities: [],
        cities: searchParams.get('cities') ? searchParams.get('cities')!.split(',') : [],
        properties: [],
        surfaceTypes: [],
        venueTypes: [],
    });
    const [sort, setSort] = useState<string>('DISTANCE_ASC');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [locations, setLocations] = useState<LocationView[]>([]);
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
    const itemsPerPage = 6;

    const onFilterChange = <K extends keyof Filter>(
        field: K,
        value: string | string[],
        checked?: boolean
    ) => {
        setFilters(prev => handleFilterChange(prev, field, value, checked));
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

    const {
        data,
        loading,
        error,
        refetch
    } = useQuery(SearchLocationsDocument, {
        variables: {
            filter: filters,
            count: 0,
            offset: currentPage * itemsPerPage,
            sort: sort
        }
    });

    useEffect(() => {
        if (data?.searchLocations?.content) {
            const content = (data.searchLocations.content.filter(Boolean) as LocationView[]);
            setLocations(content);
            setHasMore(content.length >= itemsPerPage);
        }
    }, [data]);

    const handleSearch = () => {
        setCurrentPage(1);
        setHasMore(true);
        refetch({
            filter: filters,
            count: 0,
            offset: currentPage * itemsPerPage,
            sort: sort
        });
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);

        const totalItems = locations.length;
        const displayedItems = (nextPage + 1) * itemsPerPage;

        setHasMore(displayedItems < totalItems);
    };

    const handleViewChange = (newView: 'grid' | 'map') => {
        if (newView === 'map') {
            const total = data?.searchLocations?.total;
            const safeOffsetForMap = typeof total === 'number' ? total : locations.length;
            refetch({
                filter: filters,
                count: 0,
                offset: safeOffsetForMap,
                sort: sort,
            });
        }
        if (newView === 'grid') {
            refetch({
                filter: filters,
                count: 0,
                offset: 6,
                sort: sort,
            })
        }
        setView(newView);
    };

    return (
        <Box sx={{minHeight: '100vh'}}>
            <Box sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 50%, ${theme.palette.secondary.main}20 100%)`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    pointerEvents: 'none',
                }
            }}>
                <Container maxWidth="lg" sx={{position: 'relative', zIndex: 1}}>
                    {locationPermission === 'denied' && (
                        <LocationPermission setLocationPermission={setLocationPermission}
                                            setUserLocation={setUserLocation}/>
                    )}

                    <SearchHeroSection/>

                    <Box sx={{pb: 5}}>
                        <SearchHeader filters={filters}
                                      handleSearch={handleSearch}
                                      handleFilterChange={onFilterChange}/>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: 4}}>
                <Grid container spacing={4}>
                    <Grid size={{xs: 12, md: 3}}>
                        <AdvancedFilter filters={filters}
                                        handleFilterChange={onFilterChange}/>
                    </Grid>
                    <Grid size={{xs: 12, md: 9}}>
                        <Grid size={{xs: 12, md: 12}}
                              sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <ViewToggle currentView={view} onViewChange={handleViewChange}/>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <SortSelect sort={sort} setSort={setSort}></SortSelect>
                            </Box>
                        </Grid>
                        {(error) && (
                            <Alert severity="error" sx={{mb: 4}}>
                                {error?.message}
                            </Alert>
                        )}
                        {locations.length === 0 && !loading && (
                            <Alert severity="info" sx={{mb: 4}}>
                                {t('locations.noResults')}
                            </Alert>
                        )}

                        {/* Map View */}
                        {view === 'map' && locations.length > 0 && (
                            <Box sx={{mb: 4}}>
                                <LocationsMap locations={locations}/>
                            </Box>
                        )}

                        {/* Grid View */}
                        {view === 'grid' && locations.length > 0 && (
                            <Box sx={{mb: 6}}>
                                <Grid container spacing={3}>
                                    {locations.map((location: LocationView) => (
                                        <Grid size={{xs: 12, sm: 6, lg: 4}} key={location.id}>
                                            <LocationCard location={location} userLocation={userLocation}
                                                          useImage={true}/>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}

                        {hasMore && locations.length > 0 && view === 'grid' && (
                            <Box sx={{display: 'flex', justifyContent: 'center', mt: 6}}>
                                <LoadMoreButton loading={loading} onClick={handleLoadMore}/>
                            </Box>
                        )}

                        {!hasMore && locations.length > 0 && view === 'grid' && (
                            <Box sx={{textAlign: 'center', mt: 6, py: 4}}>
                                <Typography variant="h6" color="text.secondary" sx={{mb: 2}}>
                                    {t('locations.allLocations')}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {t('locations.tryAdjusting')}
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default LocationList;