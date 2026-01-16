import React, {useEffect, useState} from 'react';
import {gql} from '@apollo/client';
import {useQuery} from "@apollo/client/react";
import {Alert, Box, CircularProgress, Container, Grid, Typography} from '@mui/material';
import type {PitchView} from "../services/location.ts";
import type {SearchPitchesResult} from "../services/pitches.ts";
import {PitchCard} from "../components/pitch/PitchCard.tsx";
import {LoadMoreButton} from "../components/location/LoadMoreButton.tsx";
import {PitchSearchHeader} from "../components/pitch/PitchSearchHeader.tsx";

const SEARCH_PITCHES = gql`
    query searchPitches(
        $filter: PitchFilter!,
        $count:Int!,
        $offset:Int!,
        $sort:PitchSort!,
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
                }
            }
        }
    }
`;

const PitchList: React.FC = () => {
    const [filters, setFilters] = useState({
        searchTerm: '',
        surfaceType: '',
        pitchType: '',
    });
    const [sort] = useState({
        field: 'name',
        direction: 'ASC'
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [pitches, setPitches] = useState<PitchView[]>([]);

    const {loading, error, data, refetch, fetchMore} = useQuery<SearchPitchesResult>(SEARCH_PITCHES, {
        variables: {
            filter: filters,
            count: 0,
            offset: 12,
            sort: sort
        }
    });

    useEffect(() => {
        if (data?.searchPitches) {
            setPitches(data.searchPitches.content);
            setHasMore(data.searchPitches.content.length >= 12);
        }
    }, [data]);

    const handleFilterChange = (field: string, value: any) => {
        setFilters(prev => ({...prev, [field]: value}));
    };

    const handleSearch = () => {
        setCurrentPage(0);
        setHasMore(true);
        refetch({
            page: 0,
            size: 12,
            pitchType: filters.pitchType || null,
            surfaceType: filters.surfaceType || null,
        });
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);

        fetchMore({
            variables: {
                page: nextPage,
                size: 12,
                pitchType: filters.pitchType || null,
                surfaceType: filters.surfaceType || null,
            },
            // updateQuery: (prev, {fetchMoreResult}) => {
            //     if (!fetchMoreResult) return prev;
            //
            //     const newContent = [...prev.searchPitches.content, ...fetchMoreResult.searchPitches.content];
            //     const hasMorePages = nextPage < fetchMoreResult.searchPitches.total - 1;
            //     setHasMore(hasMorePages);
            //
            //     return {
            //         searchPitches: {
            //             ...fetchMoreResult.searchPitches,
            //             content: newContent
            //         }
            //     };
            // }
        });
    };

    const clearFilters = () => {
        setFilters({
            searchTerm: '',
            pitchType: '',
            surfaceType: ''
        });
        setCurrentPage(0);
        setHasMore(true);
    };

    return (
        <Box sx={{bgcolor: 'background.default', minHeight: '100vh', py: 6}}>
            <Container maxWidth="lg">

                <PitchSearchHeader filters={filters} clearFilters={clearFilters} handleSearch={handleSearch}
                                   handleFilterChange={handleFilterChange}/>

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
                        No pitches found matching your criteria. Try adjusting your filters.
                    </Alert>
                )}

                {/* Pitch Cards Grid */}
                {pitches.length > 0 && (
                    <Box sx={{mb: 6}}>
                        <Grid container spacing={3}>
                            {pitches.map((pitch: any, index: number) => (
                                <Grid size={{xs: 12, sm: 6, lg: 4}} key={index}>
                                    <PitchCard pitch={pitch}/>
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
                            🎯 You've seen all available pitches!
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

export default PitchList; 