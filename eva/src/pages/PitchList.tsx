import React, {useEffect, useState} from 'react';
import {gql} from '@apollo/client';
import {useQuery} from "@apollo/client/react";
import {Alert, Box, CircularProgress, Container, Grid, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import type {PitchView} from "../services/location.ts";
import type {SearchPitchesResult} from "../services/pitches.ts";
import {PitchCard} from "../components/pitch/card/PitchCard.tsx";
import {LoadMoreButton} from "../components/location/LoadMoreButton.tsx";
import theme from "../theme/theme.ts";
import type {UserLocation} from "../services/distance.ts";
import {SearchHeader} from "../components/SearchHeader.tsx";
import {type Filter, handleFilterChange} from "../services/filters";

const SEARCH_PITCHES = gql`
    query searchPitches(
        $filter: PitchFilter!,
        $count:Int!,
        $offset:Int!,
        $sort:String!,
    ) {
        searchPitches(
            filter: $filter,
            count: $count,
            offset: $offset,
            sort: $sort,
        ) {
            content {
                id
                name
                properties
                pitchType
                surfaceType
                location {
                    id
                    name
                    properties
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
`;

const PitchList: React.FC = () => {
    const {t} = useTranslation();
    const [filters, setFilters] = useState<Filter>({
        searchTerm: '',
        locationProperties: [],
        cities: [],
        properties: [],
        surfaceTypes: [],
        pitchTypes: [],
    });
    const [sort, setSort] = useState<string>('DISTANCE_ASC');
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [pitches, setPitches] = useState<PitchView[]>([]);
    const [userLocation] = useState<UserLocation | null>(null);
    const itemsPerPage = 6;

    const {loading, error, data, refetch} = useQuery<SearchPitchesResult>(SEARCH_PITCHES, {
        variables: {
            filter: filters,
            count: itemsPerPage,
            offset: currentPage * itemsPerPage,
            sort: sort
        }
    });

    useEffect(() => {
        if (data?.searchPitches) {
            setPitches(data.searchPitches.content);
            setHasMore(data.searchPitches.content.length >= itemsPerPage);
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
        // Use local page value instead of relying on async state update
        const newPage = 0;
        const newOffset = newPage * itemsPerPage;
        setCurrentPage(newPage);
        setHasMore(true);
        refetch({
            count: itemsPerPage,
            offset: newOffset,
            filter: filters,
            sort: sort,
        });
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        const newOffset = nextPage * itemsPerPage;
        setCurrentPage(nextPage);

        refetch({
            count: itemsPerPage,
            offset: newOffset,
            filter: filters,
            sort: sort,
        });
    };

    return (
        <Box sx={{minHeight: '100vh'}}>
            <Box sx={{
                pyb: 1,
                borderBottom: `1px solid ${theme.palette.divider}`,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}15 100%)`
            }}>
                <Container maxWidth="lg">
                    <SearchHeader filters={filters} handleSearch={handleSearch}
                                  setSort={setSort} handleFilterChange={onFilterChange}/>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{py: 4}}>

                {/* Results Section */}
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
                {pitches.length === 0 && !loading && (
                    <Alert severity="info" sx={{mb: 4}}>
                        {t('pitches.noResults')}
                    </Alert>
                )}

                {/* Pitch Cards Grid */}
                {pitches.length > 0 && (
                    <Box sx={{mb: 6}}>
                        <Grid container spacing={3}>
                            {pitches.map((pitch: PitchView, index: number) => (
                                <Grid size={{xs: 12, sm: 6, lg: 4}} key={index}>
                                    <PitchCard pitch={pitch} userLocation={userLocation}/>
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
            </Container>
        </Box>
    );
};

export default PitchList; 