import React, {useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    Chip,
    CircularProgress,
    Collapse,
    Container,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import {
    AccessTime,
    Clear,
    Lightbulb,
    LocalParking,
    LocationOn,
    MeetingRoom,
    People,
    Search,
    Shower,
    Sort,
    SportsSoccer,
    Tune
} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const SEARCH_PITCHES = gql`
    query SearchPitches(
        $pitchType: PitchType
        $surfaceType: SurfaceType
        $hasLighting: Boolean
        $page: Int
        $size: Int
    ) {
        searchPitches(
            pitchType: $pitchType
            surfaceType: $surfaceType
            hasLighting: $hasLighting
            page: $page
            size: $size
        ) {
            content {
                id
                name
                description
                pricePerHour
                pitchType
                surfaceType
                hasLighting
                capacity
                imageUrls
                owner {
                    username
                }
                location {
                    id
                    name
                    address
                    hasParking
                    hasShowers
                    hasChangingRooms
                    hasCafe
                    hasEquipmentRental
                }
            }
            totalElements
            totalPages
            size
            number
        }
    }
`;

const PitchList: React.FC = () => {
    const theme = useTheme();
    const [filters, setFilters] = useState({
        searchTerm: '',
        pitchType: '',
        surfaceType: '',
        hasLighting: false,
        hasParking: false,
        hasShowers: false,
        hasChangingRooms: false,
        hasCafe: false,
        hasEquipmentRental: false,
        capacity: '',
        sortBy: 'name',
        sortOrder: 'asc'
    });
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

    const {loading, error, data, refetch, fetchMore} = useQuery(SEARCH_PITCHES, {
        variables: {
            page: 0,
            size: 12,
            pitchType: filters.pitchType || null,
            surfaceType: filters.surfaceType || null,
            hasLighting: filters.hasLighting || null
        }
    });

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
            hasLighting: filters.hasLighting || null
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
                hasLighting: filters.hasLighting || null
            },
            updateQuery: (prev, {fetchMoreResult}) => {
                if (!fetchMoreResult) return prev;

                const newContent = [...prev.searchPitches.content, ...fetchMoreResult.searchPitches.content];
                const hasMorePages = nextPage < fetchMoreResult.searchPitches.totalPages - 1;
                setHasMore(hasMorePages);

                return {
                    searchPitches: {
                        ...fetchMoreResult.searchPitches,
                        content: newContent
                    }
                };
            }
        });
    };

    const clearFilters = () => {
        setFilters({
            searchTerm: '',
            pitchType: '',
            surfaceType: '',
            hasLighting: false,
            hasParking: false,
            hasShowers: false,
            hasChangingRooms: false,
            hasCafe: false,
            hasEquipmentRental: false,
            capacity: '',
            sortBy: 'name',
            sortOrder: 'asc'
        });
        setCurrentPage(0);
        setHasMore(true);
    };

    const getActiveFiltersCount = () => {
        return Object.values(filters).filter(value =>
            value !== '' && value !== false && value !== 'name' && value !== 'asc'
        ).length;
    };

    const getFallbackImage = (pitchType: string) => {
        const images = {
            'FULL_SIZE': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
            'HALF_SIZE': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
            'FIVE_A_SIDE': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
            'SEVEN_A_SIDE': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
            'INDOOR': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
            'OUTDOOR': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
        };
        return images[pitchType as keyof typeof images] || images['FULL_SIZE'];
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

    const capacityOptions = [
        {value: '10', label: 'Up to 10 players'},
        {value: '14', label: 'Up to 14 players'},
        {value: '22', label: 'Up to 22 players'},
        {value: '30', label: '30+ players'}
    ];

    const sortOptions = [
        {value: 'name', label: 'Name'},
        {value: 'rating', label: 'Rating'},
        {value: 'distance', label: 'Distance'}
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
                            {filters.hasLighting && (
                                <Chip
                                    label="Lighting"
                                    onDelete={() => handleFilterChange('hasLighting', false)}
                                    color="primary"
                                    variant="outlined"
                                />
                            )}
                            {filters.hasParking && (
                                <Chip
                                    label="Parking"
                                    onDelete={() => handleFilterChange('hasParking', false)}
                                    color="primary"
                                    variant="outlined"
                                />
                            )}
                            {filters.hasShowers && (
                                <Chip
                                    label="Showers"
                                    onDelete={() => handleFilterChange('hasShowers', false)}
                                    color="primary"
                                    variant="outlined"
                                />
                            )}
                            {filters.hasChangingRooms && (
                                <Chip
                                    label="Changing Rooms"
                                    onDelete={() => handleFilterChange('hasChangingRooms', false)}
                                    color="primary"
                                    variant="outlined"
                                />
                            )}
                            {filters.hasCafe && (
                                <Chip
                                    label="Cafe"
                                    onDelete={() => handleFilterChange('hasCafe', false)}
                                    color="primary"
                                    variant="outlined"
                                />
                            )}
                            {filters.hasEquipmentRental && (
                                <Chip
                                    label="Equipment Rental"
                                    onDelete={() => handleFilterChange('hasEquipmentRental', false)}
                                    color="primary"
                                    variant="outlined"
                                />
                            )}
                            {filters.capacity && (
                                <Chip
                                    label={`Capacity: ${capacityOptions.find(c => c.value === filters.capacity)?.label}`}
                                    onDelete={() => handleFilterChange('capacity', '')}
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
                            <Grid item xs={12} md={6}>
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
                            <Grid item xs={12} md={6}>
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

                            {/* Capacity */}
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Capacity</InputLabel>
                                    <Select
                                        value={filters.capacity}
                                        onChange={e => handleFilterChange('capacity', e.target.value)}
                                        label="Capacity"
                                    >
                                        <MenuItem value="">Any Capacity</MenuItem>
                                        {capacityOptions.map(capacity => (
                                            <MenuItem key={capacity.value} value={capacity.value}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    <People fontSize="small"/>
                                                    {capacity.label}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Features */}
                            <Grid item xs={12}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Features & Amenities
                                </Typography>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filters.hasLighting}
                                                onChange={e => handleFilterChange('hasLighting', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <Lightbulb sx={{color: theme.palette.warning.main}}/>
                                                Lighting
                                            </Box>
                                        }
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filters.hasParking}
                                                onChange={e => handleFilterChange('hasParking', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <LocalParking sx={{color: theme.palette.primary.main}}/>
                                                Parking
                                            </Box>
                                        }
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filters.hasShowers}
                                                onChange={e => handleFilterChange('hasShowers', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <Shower sx={{color: theme.palette.primary.main}}/>
                                                Showers
                                            </Box>
                                        }
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filters.hasChangingRooms}
                                                onChange={e => handleFilterChange('hasChangingRooms', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <MeetingRoom sx={{color: theme.palette.primary.main}}/>
                                                Changing Rooms
                                            </Box>
                                        }
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filters.hasCafe}
                                                onChange={e => handleFilterChange('hasCafe', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <AccessTime sx={{color: theme.palette.primary.main}}/>
                                                Cafe
                                            </Box>
                                        }
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filters.hasEquipmentRental}
                                                onChange={e => handleFilterChange('hasEquipmentRental', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                <SportsSoccer sx={{color: theme.palette.primary.main}}/>
                                                Equipment Rental
                                            </Box>
                                        }
                                    />
                                </FormGroup>
                            </Grid>

                            {/* Sort Options */}
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={filters.sortBy}
                                        onChange={e => handleFilterChange('sortBy', e.target.value)}
                                        label="Sort By"
                                    >
                                        {sortOptions.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                                    <Sort fontSize="small"/>
                                                    {option.label}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Sort Order</FormLabel>
                                    <RadioGroup
                                        row
                                        value={filters.sortOrder}
                                        onChange={e => handleFilterChange('sortOrder', e.target.value)}
                                    >
                                        <FormControlLabel value="asc" control={<Radio/>} label="A to Z"/>
                                        <FormControlLabel value="desc" control={<Radio/>} label="Z to A"/>
                                    </RadioGroup>
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
                {data?.searchPitches?.content?.length === 0 && !loading && (
                    <Alert severity="info" sx={{mb: 4}}>
                        No pitches found matching your criteria. Try adjusting your filters.
                    </Alert>
                )}

                {/* Results Count and Stats */}
                {data?.searchPitches?.content?.length > 0 && (
                    <Box sx={{mb: 4}}>
                        <Typography variant="h5" fontWeight={700} color="primary.main">
                            Search Results
                        </Typography>
                    </Box>
                )}

                {/* Pitch Cards Grid */}
                {data?.searchPitches?.content?.length > 0 && (
                    <Box sx={{mb: 6}}>
                        <Grid container spacing={3}>
                            {data?.searchPitches?.content?.map((pitch: any, index: number) => (
                                <Grid item xs={12} sm={6} lg={4} key={pitch.id}>
                                    <Card
                                        elevation={0}
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            border: `1px solid ${theme.palette.divider}`,
                                            borderRadius: 4,
                                            overflow: 'hidden',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                                                borderColor: theme.palette.primary.main,
                                                '& .card-image': {
                                                    transform: 'scale(1.05)',
                                                },
                                                '& .card-overlay': {
                                                    opacity: 1,
                                                }
                                            }
                                        }}
                                        onClick={() => navigate(`/pitches/${pitch.id}`)}
                                    >
                                        {/* Image Container */}
                                        <Box sx={{position: 'relative', overflow: 'hidden', height: 200}}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={pitch.imageUrls && pitch.imageUrls.length > 0 ? pitch.imageUrls[0] : getFallbackImage(pitch.pitchType)}
                                                alt={pitch.name}
                                                className="card-image"
                                                sx={{
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                }}
                                            />
                                            {/* Overlay with quick info */}
                                            <Box
                                                className="card-overlay"
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}dd 0%, ${theme.palette.primary.main}bb 100%)`,
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                }}
                                            >
                                                <Typography variant="h6" fontWeight={700}>
                                                    View Details
                                                </Typography>
                                            </Box>

                                            {/* Price Badge */}
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 12,
                                                    right: 12,
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: 'white',
                                                    px: 2,
                                                    py: 1,
                                                    borderRadius: 3,
                                                    fontWeight: 700,
                                                    fontSize: '1rem',
                                                    boxShadow: `0 4px 12px ${theme.palette.primary.main}4d`,
                                                }}
                                            >
                                                £{pitch.pricePerHour}/hr
                                            </Box>

                                            {/* Location Info */}
                                            {pitch.location && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'text.secondary',
                                                        mb: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                        fontSize: '0.875rem'
                                                    }}
                                                >
                                                    <LocationOn sx={{fontSize: 14, color: theme.palette.primary.main}}/>
                                                    {pitch.location.address}
                                                </Typography>
                                            )}
                                        </Box>

                                        <CardContent sx={{flexGrow: 1, p: 3}}>
                                            {/* Title and Type */}
                                            <Box sx={{mb: 2}}>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight={700}
                                                    color="text.primary"
                                                    sx={{
                                                        mb: 1,
                                                        lineHeight: 1.2,
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    {pitch.name}
                                                </Typography>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    flexWrap: 'wrap'
                                                }}>
                                                    <Chip
                                                        label={pitch.pitchType?.replace('_', ' ')}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: theme.palette.primary.main,
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '0.75rem'
                                                        }}
                                                    />
                                                    <Chip
                                                        label={pitch.surfaceType?.replace('_', ' ')}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{fontWeight: 600, fontSize: '0.75rem'}}
                                                    />
                                                </Box>
                                            </Box>

                                            {/* Description */}
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.secondary',
                                                    mb: 2,
                                                    lineHeight: 1.5,
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {pitch.description}
                                            </Typography>

                                            {/* Features Grid */}
                                            <Box sx={{mb: 2}}>
                                                <Grid container spacing={0.5}>
                                                    {pitch.hasLighting && (
                                                        <Grid item xs={6}>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                p: 0.5
                                                            }}>
                                                                <Lightbulb sx={{
                                                                    color: theme.palette.warning.main,
                                                                    fontSize: 16
                                                                }}/>
                                                                <Typography variant="caption" sx={{
                                                                    color: 'text.primary',
                                                                    fontWeight: 500
                                                                }}>
                                                                    Lighting
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    )}
                                                    {pitch.location?.hasParking && (
                                                        <Grid item xs={6}>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                p: 0.5
                                                            }}>
                                                                <LocalParking sx={{
                                                                    color: theme.palette.primary.main,
                                                                    fontSize: 16
                                                                }}/>
                                                                <Typography variant="caption" sx={{
                                                                    color: 'text.primary',
                                                                    fontWeight: 500
                                                                }}>
                                                                    Parking
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    )}
                                                    {pitch.location?.hasShowers && (
                                                        <Grid item xs={6}>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                p: 0.5
                                                            }}>
                                                                <Shower sx={{
                                                                    color: theme.palette.primary.main,
                                                                    fontSize: 16
                                                                }}/>
                                                                <Typography variant="caption" sx={{
                                                                    color: 'text.primary',
                                                                    fontWeight: 500
                                                                }}>
                                                                    Showers
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    )}
                                                    {pitch.location?.hasChangingRooms && (
                                                        <Grid item xs={6}>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                p: 0.5
                                                            }}>
                                                                <MeetingRoom sx={{
                                                                    color: theme.palette.primary.main,
                                                                    fontSize: 16
                                                                }}/>
                                                                <Typography variant="caption" sx={{
                                                                    color: 'text.primary',
                                                                    fontWeight: 500
                                                                }}>
                                                                    Changing Rooms
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    )}
                                                    {pitch.location?.hasCafe && (
                                                        <Grid item xs={6}>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                p: 0.5
                                                            }}>
                                                                <AccessTime sx={{
                                                                    color: theme.palette.primary.main,
                                                                    fontSize: 16
                                                                }}/>
                                                                <Typography variant="caption" sx={{
                                                                    color: 'text.primary',
                                                                    fontWeight: 500
                                                                }}>
                                                                    Cafe
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    )}
                                                    {pitch.location?.hasEquipmentRental && (
                                                        <Grid item xs={6}>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                p: 0.5
                                                            }}>
                                                                <SportsSoccer sx={{
                                                                    color: theme.palette.primary.main,
                                                                    fontSize: 16
                                                                }}/>
                                                                <Typography variant="caption" sx={{
                                                                    color: 'text.primary',
                                                                    fontWeight: 500
                                                                }}>
                                                                    Equipment Rental
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    )}
                                                    {pitch.capacity && (
                                                        <Grid item xs={6}>
                                                            <Box sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5,
                                                                p: 0.5
                                                            }}>
                                                                <People sx={{
                                                                    color: theme.palette.primary.main,
                                                                    fontSize: 16
                                                                }}/>
                                                                <Typography variant="caption" sx={{
                                                                    color: 'text.primary',
                                                                    fontWeight: 500
                                                                }}>
                                                                    {pitch.capacity} players
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            </Box>
                                        </CardContent>

                                        {/* Action Buttons */}
                                        <Box sx={{p: 3, pt: 0}}>
                                            <Box sx={{display: 'flex', gap: 1.5}}>
                                                <Button
                                                    variant="contained"
                                                    size="medium"
                                                    sx={{
                                                        flex: 1,
                                                        fontWeight: 600,
                                                        borderRadius: 2,
                                                        py: 1,
                                                        textTransform: 'none',
                                                        fontSize: '0.875rem',
                                                        '&:hover': {
                                                            transform: 'translateY(-1px)',
                                                            boxShadow: `0 8px 16px ${theme.palette.primary.main}4d`,
                                                        }
                                                    }}
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        navigate(`/pitches/${pitch.id}`);
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}

                {/* Load More Button */}
                {hasMore && data?.searchPitches?.content?.length > 0 && (
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 6}}>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={handleLoadMore}
                            disabled={loading}
                            sx={{
                                px: 6,
                                py: 2,
                                borderRadius: 3,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                                }
                            }}
                        >
                            {loading ? (
                                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                    <CircularProgress size={20}/>
                                    Loading...
                                </Box>
                            ) : (
                                'Load More Pitches'
                            )}
                        </Button>
                    </Box>
                )}

                {/* No More Results */}
                {!hasMore && data?.searchPitches?.content?.length > 0 && (
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