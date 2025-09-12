import React, {useEffect, useState} from 'react';
import {gql} from '@apollo/client';
import {useQuery} from "@apollo/client/react";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Collapse,
    Container,
    Divider,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@mui/material';
import {Clear, Search, SportsSoccer, Tune} from '@mui/icons-material';
import type {PitchView} from "../services/location.ts";
import type {SearchPitchesResult} from "../services/pitches.ts";
import {PitchCard} from "../components/pitch/PitchCard.tsx";
import {LoadMoreButton} from "../components/location/LoadMoreButton.tsx";

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
                pitchType
                surfaceType
                location {
                    id
                    name
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
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
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

    const getActiveFiltersCount = () => {
        return Object.values(filters).filter(value =>
            value !== '' && value !== 'name' && value !== 'asc'
        ).length;
    };

    const pitchTypes = [
        {value: 'FULL_SIZE', label: 'Full Size (11-a-side)', icon: <SportsSoccer/>},
        {value: 'HALF_SIZE', label: 'Half Size', icon: <SportsSoccer/>},
        {value: 'FIVE_A_SIDE', label: '5-a-Side', icon: <SportsSoccer/>},
        {value: 'SEVEN_A_SIDE', label: '7-a-Side', icon: <SportsSoccer/>},
        {value: 'INDOOR', label: 'Indoor', icon: <SportsSoccer/>},
        {value: 'OUTDOOR', label: 'Outdoor', icon: <SportsSoccer/>}
    ];

    const surfaceTypes = [
        {value: 'GRASS', label: 'Natural Grass', color: '#4caf50'},
        {value: 'ARTIFICIAL_GRASS', label: 'Artificial Grass', color: '#8bc34a'},
        {value: 'CONCRETE', label: 'Concrete', color: '#9e9e9e'},
        {value: 'ASPHALT', label: 'Asphalt', color: '#607d8b'},
        {value: 'TURF', label: 'Turf', color: '#795548'},
        {value: 'HARDCOURT', label: 'Hard Court', color: '#ff9800'}
    ];

    return (
        <Box sx={{bgcolor: 'background.default', minHeight: '100vh', py: 6}}>
            <Container maxWidth="lg">

                <Paper elevation={3} sx={{p: 4, mb: 6, borderRadius: 3}}>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                        <Typography variant="h4" fontWeight={700} color="primary.main">
                            Find Your Perfect Pitch
                        </Typography>
                        <Box display="flex" gap={1}>
                            <Button
                                variant="outlined"
                                startIcon={<Tune/>}
                                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                                sx={{borderRadius: 2}}
                            >
                                Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
                            </Button>
                            {getActiveFiltersCount() > 0 && (
                                <Button
                                    variant="text"
                                    startIcon={<Clear/>}
                                    onClick={clearFilters}
                                    sx={{borderRadius: 2}}
                                >
                                    Clear
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {/* Main Search Bar */}
                    <Box display="flex" gap={2} mb={3}>
                        <TextField
                            fullWidth
                            placeholder="Search by pitch name, description, or location..."
                            value={filters.searchTerm}
                            onChange={e => handleFilterChange('searchTerm', e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{color: 'primary.main'}}/>
                                    </InputAdornment>
                                ),
                                sx: {borderRadius: 2}
                            }}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleSearch}
                            sx={{
                                px: 4,
                                borderRadius: 2,
                                minWidth: 120
                            }}
                        >
                            Search
                        </Button>
                    </Box>

                    {/* Active Filters Display */}
                    {getActiveFiltersCount() > 0 && (
                        <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
                            {filters.searchTerm && (
                                <Chip
                                    label={`Search: ${filters.searchTerm}`}
                                    onDelete={() => handleFilterChange('searchTerm', '')}
                                    color="primary"
                                    variant="outlined"
                                />
                            )}
                            {filters.pitchType && (
                                <Chip
                                    label={`Type: ${pitchTypes.find(t => t.value === filters.pitchType)?.label}`}
                                    onDelete={() => handleFilterChange('pitchType', '')}
                                    color="primary"
                                    variant="outlined"
                                />
                            )}
                            {filters.surfaceType && (
                                <Chip
                                    label={`Surface: ${surfaceTypes.find(s => s.value === filters.surfaceType)?.label}`}
                                    onDelete={() => handleFilterChange('surfaceType', '')}
                                    color="primary"
                                    variant="outlined"
                                />
                            )}
                        </Box>
                    )}

                    {/* Advanced Filters */}
                    <Collapse in={showAdvancedFilters}>
                        <Divider sx={{my: 3}}/>
                        <Grid container spacing={4}>
                            {/* Pitch Type */}
                            <Grid size={{xs: 12}}>
                                <FormControl fullWidth>
                                    <InputLabel>Pitch Type</InputLabel>
                                    <Select
                                        value={filters.pitchType}
                                        onChange={e => handleFilterChange('pitchType', e.target.value)}
                                        label="Pitch Type"
                                    >
                                        <MenuItem value="">All Types</MenuItem>
                                        {pitchTypes.map(type => (
                                            <MenuItem key={type.value} value={type.value}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    {type.icon}
                                                    {type.label}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Surface Type */}
                            <Grid size={{xs: 12}}>
                                <FormControl fullWidth>
                                    <InputLabel>Surface Type</InputLabel>
                                    <Select
                                        value={filters.surfaceType}
                                        onChange={e => handleFilterChange('surfaceType', e.target.value)}
                                        label="Surface Type"
                                    >
                                        <MenuItem value="">All Surfaces</MenuItem>
                                        {surfaceTypes.map(surface => (
                                            <MenuItem key={surface.value} value={surface.value}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    <Box sx={{
                                                        width: 16,
                                                        height: 16,
                                                        borderRadius: '50%',
                                                        bgcolor: surface.color
                                                    }}/>
                                                    {surface.label}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Paper>

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

                {/* Results Count and Stats */}
                {pitches.length > 0 && (
                    <Box sx={{mb: 4}}>
                        <Typography variant="h5" fontWeight={700} color="primary.main">
                            Search Results
                        </Typography>
                    </Box>
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