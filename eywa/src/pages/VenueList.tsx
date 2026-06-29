import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client/react";
import {Alert, Box, CircularProgress, Container, Grid, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {VenueCard} from "../components/venue/card/VenueCard.tsx";
import {LoadMoreButton} from "../components/location/LoadMoreButton.tsx";
import theme from "../theme/theme.ts";
import type {UserLocation} from "../services/distance.ts";
import {SearchHeader} from "../components/search/SearchHeader.tsx";
import {type Filter, handleFilterChange} from "../services/filters";
import {graphql} from "../generated";
import type {VenueView} from "../generated/graphql-schema.ts";
import {SearchVenuesDocument} from "../generated/graphql.ts";
import {LocationPermission} from "../components/LocationPermission.tsx";
import {AdvancedFilter} from "../components/search/AdvancedFilter.tsx";
import {SortSelect} from "../components/search/SortSelect.tsx";
import {SearchHeroSection} from "../components/search/SearchHeroSection.tsx";

graphql(`
    query searchVenues(
        $filter: VenueFilter!,
        $count:Int!,
        $offset:Int!,
        $sort:String!,
    ) {
        searchVenues(
            filter: $filter,
            count: $count,
            offset: $offset,
            sort: $sort,
        ) {
            content {
                id
                name
                description
                properties
                venueType
                surfaceType
                location {
                    id
                    name
                    amenities
                    description
                    website
                    contact {
                        contactName
                        email
                        phoneNumber
                    }
                    address {
                        addressLine
                        city
                        postalCode
                    }
                    geom {
                        x
                        y
                    }
                }
            }
        }
    }
`);

const VenueList: React.FC = () => {
    const {t} = useTranslation();
    const [filters, setFilters] = useState<Filter>({
        searchTerm: '',
        locationAmenities: [],
        cities: [],
        properties: [],
        surfaceTypes: [],
        venueTypes: [],
    });
    const [sort, setSort] = useState<string>('DISTANCE_ASC');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [pitches, setPitches] = useState<VenueView[]>([]);
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
    const itemsPerPage = 6;

    const {loading, error, data, refetch} = useQuery(SearchVenuesDocument, {
        variables: {
            filter: filters,
            count: 0,
            offset: currentPage * itemsPerPage,
            sort: sort
        }
    });

    useEffect(() => {
        if (data?.searchVenues) {
            setPitches(data.searchVenues.content);
            setHasMore(data.searchVenues.content.length >= itemsPerPage);
        }
    }, [data]);

    const onFilterChange = <K extends keyof Filter>(
        field: K,
        value: string | string[],
        checked?: boolean
    ) => {
        setFilters(prev => handleFilterChange(prev, field, value, checked));
    };

    const handleSearch = () => {
        setCurrentPage(1);
        setHasMore(true);
        refetch({
            filter: filters,
            count: 0,
            offset: currentPage * itemsPerPage,
            sort: sort,
        });
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);

        const totalItems = pitches.length;
        const displayedItems = (nextPage + 1) * itemsPerPage;

        setHasMore(displayedItems < totalItems);
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
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <SortSelect sort={sort} setSort={setSort}></SortSelect>
                            </Box>
                        </Grid>

                        {loading && (
                            <Box>
                                <CircularProgress/>
                            </Box>
                        )}
                        {error && (
                            <Alert severity="error" sx={{mb: 4}}>
                                {error.message}
                            </Alert>
                        )}
                        {pitches.length === 0 && !loading && (
                            <Alert severity="info" sx={{mb: 4}}>
                                {t('pitches.noResults')}
                            </Alert>
                        )}

                        {/* Pitch Cards Grid */}
                        {pitches.length > 0 && (
                            <Box sx={{mb: 6}}>
                                <Grid container spacing={3}>
                                    {pitches.map((pitch: VenueView, index: number) => (
                                        <Grid size={{xs: 12, sm: 6, lg: 4}} key={index}>
                                            <VenueCard pitch={pitch} userLocation={userLocation}/>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}

                        {/* Load More Button */}
                        {hasMore && pitches.length > 0 && (
                            <Box sx={{display: 'flex', justifyContent: 'center', mt: 6}}>
                                <LoadMoreButton loading={loading} onClick={handleLoadMore}/>
                            </Box>
                        )}

                        {/* No More Results */}
                        {!hasMore && pitches.length > 0 && (
                            <Box sx={{textAlign: 'center', mt: 6, py: 4}}>
                                <Typography variant="h6" color="text.secondary" sx={{mb: 2}}>
                                    {t('pitches.allPitches')}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {t('pitches.tryAdjusting')}
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default VenueList;