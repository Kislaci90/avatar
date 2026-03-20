import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client/react";
import {Alert, Box, Container, Grid, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {LoadMoreButton} from "../components/location/LoadMoreButton";
import {LocationCard} from "../components/location/card/LocationCard.tsx";
import type {UserLocation} from "../services/distance";
import {SearchHeader} from "../components/SearchHeader.tsx";
import {type LocationView, SEARCH_LOCATIONS, type SearchLocationResult} from "../services/location.ts";
import {LocationPermission} from "../components/LocationPermission.tsx";
import ViewToggle from "../components/location/ViewToggle";
import LocationsMap from "../components/location/map/LocationsMap";
import theme from "../theme/theme.ts";
import {type Filter, handleFilterChange} from "../services/filters";

const LocationList: React.FC = () => {
    const {t} = useTranslation();
    const [view, setView] = useState<'grid' | 'map'>('grid');
    const [filters, setFilters] = useState<Filter>({
        searchTerm: '',
        locationProperties: [],
        cities: [],
        properties: [],
        surfaceTypes: [],
        pitchTypes: [],
    });
    const [sort, setSort] = useState<string>('DISTANCE_ASC');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [locations, setLocations] = useState<LocationView[]>([]);
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

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
        data: data,
        loading: loading,
        error: error,
        refetch: refetch
    } = useQuery<SearchLocationResult>(SEARCH_LOCATIONS, {
        variables: {
            filter: filters,
            count: 0,
            offset: currentPage * 6,
            sort: sort
        }
    });

    useEffect(() => {
        if (data?.searchLocations) {
            setLocations(data.searchLocations.content);
            setHasMore(data.searchLocations.content.length > 6);
        }
    }, [data]);

    const handleSearch = () => {
        setCurrentPage(1);
        setHasMore(true);
        refetch({
            filters: filters,
            count: 0,
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
                pyb: 1,
                borderBottom: `1px solid ${theme.palette.divider}`,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}15 100%)`
            }}>
                <Container maxWidth="lg">
                    {locationPermission === 'denied' && (
                        <LocationPermission setLocationPermission={setLocationPermission}
                                            setUserLocation={setUserLocation}/>
                    )}

                    <SearchHeader filters={filters}
                                  handleSearch={handleSearch} setSort={setSort}
                                  handleFilterChange={onFilterChange}/>
                </Container>
            </Box>
            <Container maxWidth="lg" sx={{py: 4}}>
                {/* View Toggle */}
                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                    <Typography variant="h5"
                                sx={{mb: 2}}>{t('locations.total')}: {data?.searchLocations.total}</Typography>
                    <ViewToggle currentView={view} onViewChange={handleViewChange}/>
                </Box>

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
                                    <LocationCard location={location} userLocation={userLocation} useImage={true}/>
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
            </Container>
        </Box>
    );
};

export default LocationList;