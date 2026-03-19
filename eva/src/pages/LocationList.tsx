import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client/react";
import {Alert, Box, CircularProgress, Container, Grid, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {LoadMoreButton} from "../components/location/LoadMoreButton";
import {LocationCard} from "../components/location/card/LocationCard.tsx";
import type {UserLocation} from "../services/distance";
import {LocationSearchHeader} from "../components/location/LocationSearchHeader.tsx";
import {
    GET_LOCATION_SEARCH_FILTERS, type GetLocationSearchFilterResult, type LocationSearchFilter,
    type LocationView,
    SEARCH_LOCATIONS,
    type SearchLocationResult
} from "../services/location.ts";
import {LocationPermission} from "../components/LocationPermission.tsx";
import ViewToggle from "../components/location/ViewToggle";
import LocationsMap from "../components/location/map/LocationsMap";
import theme from "../theme/theme.ts";

export type LocationFilter = {
    searchTerm: string;
    locationProperties: string[];
    cities: string[];
};

const LocationList: React.FC = () => {
    const { t } = useTranslation();
    const [view, setView] = useState<'grid' | 'map'>('grid');
    const [filters, setFilters] = useState<LocationFilter>({
        searchTerm: '',
        locationProperties: [],
        cities: [],
    });
    const [sort, setSort] = useState<string>();
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [locations, setLocations] = useState<LocationView[]>([]);
    const [searchFilters, setSearchFilters] = useState<LocationSearchFilter>({
        locationProperties: [''],
        cities: [''],
    });
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

    const handleFilterChange = <K extends keyof LocationFilter>(
        field: K,
        value: string | string[],
        checked?: boolean
    ) => {
        setFilters(prev => {
            const current = prev[field];

            if (Array.isArray(current)) {
                if (typeof checked === "boolean") {
                    return {
                        ...prev,
                        [field]: checked
                            ? [...current, value as string]
                            : current.filter(v => v !== value)
                    };
                }

                if (Array.isArray(value)) {
                    return { ...prev, [field]: value };
                }

                return {
                    ...prev,
                    [field]: [...current, value as string]
                };
            }

            return {
                ...prev,
                [field]: value as string
            };
        });
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

    const {data: locationsData, loading: locationsLoading, error: locationsError, refetch: locationsRefetch} = useQuery<SearchLocationResult>(SEARCH_LOCATIONS, {
        variables: {
            filter: filters,
            count: 0,
            offset: currentPage * 6,
            sort: sort
        }
    });

    const {data: searchFiltersData, error: searchFilterError} = useQuery<GetLocationSearchFilterResult>(GET_LOCATION_SEARCH_FILTERS);

    useEffect(() => {
        if (searchFiltersData?.getLocationSearchFilters) {
            setSearchFilters(searchFiltersData.getLocationSearchFilters);
        }
    }, [searchFiltersData]);

    useEffect(() => {
        if (locationsData?.searchLocations) {
            setLocations(locationsData.searchLocations.content);
            setHasMore(locationsData.searchLocations.content.length >= 6);
        }
    }, [locationsData]);

    const handleSearch = () => {
        setCurrentPage(1);
        setHasMore(true);
        locationsRefetch({
            filters: filters,
            count: 6,
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

    const handleViewChange = (newView: 'grid' | 'map') => {
        if (newView === 'map') {
            locationsRefetch({
                filter: filters,
                count: 0,
                offset: locationsData?.searchLocations.total,
                sort: sort,
            });
        }if (newView === 'grid') {
            locationsRefetch({
                filter: filters,
                count: 0,
                offset: 6,
            })
        }
        setView(newView);
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
                                          handleFilterChange={handleFilterChange}
                                          searchFilters={searchFilters}/>
                </Container>
            </Box>
            <Container maxWidth="lg" sx={{py: 4}}>
                {/* View Toggle */}
                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                    <Typography variant="h5" sx={{mb: 2}}>{t('locations.total')}: {locationsData?.searchLocations.total}</Typography>
                    <ViewToggle currentView={view} onViewChange={handleViewChange} />
                </Box>

                {(locationsError || searchFilterError) && (
                    <Alert severity="error" sx={{mb: 4}}>
                        {locationsError?.message}, {searchFilterError?.message}
                    </Alert>
                )}
                {locations.length === 0 && !locationsLoading && (
                    <Alert severity="info" sx={{mb: 4}}>
                        {t('locations.noResults')}
                    </Alert>
                )}

                {/* Map View */}
                {view === 'map' && locations.length > 0 && (
                    <Box sx={{mb: 4}}>
                        <LocationsMap locations={locations} />
                    </Box>
                )}

                {/* Grid View */}
                {view === 'grid' && locations.length > 0 && (
                    <Box sx={{mb: 6}}>
                        <Grid container spacing={3}>
                            {locations.map((location: LocationView) => (
                                <Grid size={{xs: 12, sm: 6, lg: 4}} key={location.id}>
                                    <LocationCard location={location} userLocation={userLocation} useImage={true}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {hasMore && locations.length > 0 && view === 'grid' && (
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 6}}>
                        <LoadMoreButton loading={locationsLoading} onClick={handleLoadMore}/>
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
            </Container>
        </Box>
    );
};

export default LocationList;