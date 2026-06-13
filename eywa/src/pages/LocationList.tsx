import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client/react";
import {Alert, Box, Container, Grid, Typography, Chip, Badge} from '@mui/material';
import {LocationOn} from '@mui/icons-material';
import {useTranslation} from 'react-i18next';
import {LoadMoreButton} from "../components/location/LoadMoreButton";
import {LocationCard} from "../components/location/card/LocationCard.tsx";
import type {UserLocation} from "../services/distance";
import {SearchHeader} from "../components/SearchHeader.tsx";
import {LocationPermission} from "../components/LocationPermission.tsx";
import ViewToggle from "../components/location/ViewToggle";
import LocationsMap from "../components/location/map/LocationsMap";
import theme from "../theme/theme.ts";
import {type Filter, handleFilterChange} from "../services/filters";
import {useSearchParams} from "react-router-dom";
import {SearchLocationsDocument} from "../generated/graphql.ts";
import {graphql} from "../generated";
import type {LocationView} from "../generated/graphql-schema.ts";

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
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2, flexWrap: 'wrap'}}>
                    <Badge
                        badgeContent={data?.searchLocations?.total || 0}
                        color="primary"
                        max={999999}
                        sx={{
                            '& .MuiBadge-badge': {
                                fontSize: '1rem',
                                fontWeight: 700,
                                padding: '4px 8px',
                                borderRadius: '8px',
                                backgroundColor: theme.palette.secondary.main,
                                color: 'white'
                            }
                        }}
                    >
                        <Chip
                            icon={<LocationOn />}
                            label={t('locations.total')}
                            variant="outlined"
                            sx={{
                                fontWeight: 600,
                                fontSize: '1rem',
                                padding: '4px 8px',
                                borderColor: theme.palette.primary.main,
                                color: theme.palette.primary.main,
                                '& .MuiChip-icon': {
                                    color: theme.palette.secondary.main,
                                    marginRight: '4px'
                                }
                            }}
                        />
                    </Badge>
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