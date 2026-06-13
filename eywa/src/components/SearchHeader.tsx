import {
    Badge,
    Box,
    Button,
    Checkbox,
    Chip,
    Collapse,
    Drawer,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {ArrowDownward, ArrowUpward, Close, Search, Tune} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import type {Filter} from "../services/filters.ts";
import {useQuery} from "@apollo/client/react";
import {getSurfaceTypeColor, getVenueTypeColor} from "../services/venues.ts";
import {graphql} from "../generated";
import {GetSearchFiltersDocument, type GetSearchFiltersQuery,} from "../generated/graphql.ts";

graphql(`
    query GetSearchFilters {
        getSearchFilters {
            cities
            locationAmenities
            surfaceTypes
            venueTypes
            venueProperties
        }
    }
`);

interface SearchHeaderProps<F extends Filter> {
    filters: F,
    handleSearch: () => void,
    handleFilterChange: <K extends keyof Filter>(field: K, value: Filter[K] | string | string[], checked?: boolean) => void,
    setSort: (value: string) => void,
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const selectMenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            minWidth: 250,
        },
    },
};

export function SearchHeader({
                                 filters,
                                 handleSearch,
                                 handleFilterChange,
                                 setSort
                             }: Readonly<SearchHeaderProps<Filter>>) {

    const {t} = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [showFilterDrawer, setShowFilterDrawer] = useState(false);
    const [searchFilters, setSearchFilters] = useState<GetSearchFiltersQuery>({
        getSearchFilters: {
            cities: [],
            locationAmenities: [],
            surfaceTypes: [],
            venueTypes: [],
            venueProperties: [],
        }
    } as GetSearchFiltersQuery);

    const sort = [
        {value: "DISTANCE_ASC", label: t('locations.nearestLocation'), icon: <ArrowUpward/>},
        {value: "DISTANCE_DESC", label: t('locations.farthestLocation'), icon: <ArrowDownward/>},
    ]

    const {data: searchFiltersData} = useQuery(GetSearchFiltersDocument);

    useEffect(() => {
        if (searchFiltersData?.getSearchFilters) {
            setSearchFilters(searchFiltersData);
        }
    }, [searchFiltersData]);

    const getActiveFiltersCount = () => {
        return Object.values(filters).filter(value => {
                if (Array.isArray(value)) {
                    return value.length > 0;
                }
                return value !== '' && value !== null
            }
        ).length;
    };

    return (
        <Paper sx={{
            p: 4,
            borderRadius: 3,
            border: "none",
            background: 'transparent',
            boxShadow: 'none',
        }}>
            <Box
                sx={{display: "flex", alignItems: "center", justifyContent: "center", mb: 3, borderBottom: 1}}>
                <Typography variant="h4" color="primary.main" sx={{fontWeight: 700}}>
                    {t('locations.searchHeader')}
                </Typography>
            </Box>

            <Box sx={{
                display: "flex",
                mb: 1,
                gap: 2,
                flexDirection: {xs: 'column', sm: 'row'},
                alignItems: {xs: 'stretch', sm: 'flex-end'}
            }}>
                <TextField
                    fullWidth
                    placeholder={t('locations.searchPlaceholder')}
                    value={filters.searchTerm}
                    onChange={e => handleFilterChange('searchTerm', e.target.value)}
                    variant="outlined"
                    size="medium"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{color: 'primary.main'}}/>
                                </InputAdornment>
                            ),
                            sx: {borderRadius: 2, backgroundColor: 'white'},
                        }
                    }}
                />
                <Button
                    variant="contained"
                    size="medium"
                    onClick={handleSearch}
                    sx={{
                        px: {xs: 2, sm: 4},
                        py: 1.75,
                        borderRadius: 2,
                        backgroundColor: theme.palette.secondary.main,
                        whiteSpace: 'nowrap',
                        minWidth: {xs: '100%', sm: 'auto'},
                        height: {xs: '56px', sm: 'auto'}
                    }}
                >
                    {t('locations.searchButton')}
                </Button>
                {isMobile ? (
                    <Badge
                        badgeContent={getActiveFiltersCount()}
                        color="secondary"
                        sx={{
                            '& .MuiBadge-badge': {
                                fontWeight: 700,
                                fontSize: '0.75rem'
                            }
                        }}
                    >
                        <Button
                            variant="outlined"
                            size="medium"
                            onClick={() => setShowFilterDrawer(true)}
                            sx={{
                                px: 2,
                                py: 1.75,
                                borderRadius: 2,
                                backgroundColor: 'white',
                                transition: 'all 0.3s ease',
                                minWidth: {xs: '100%', sm: 'auto'},
                                height: {xs: '56px', sm: 'auto'},
                                '&:hover': {
                                    backgroundColor: 'white',
                                }
                            }}
                        >
                            <Tune/>
                        </Button>
                    </Badge>
                ) : (
                    <Badge
                        badgeContent={getActiveFiltersCount()}
                        color="secondary"
                        sx={{
                            '& .MuiBadge-badge': {
                                fontWeight: 700,
                                fontSize: '0.75rem'
                            }
                        }}
                    >
                        <Button
                            variant="outlined"
                            size="medium"
                            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            sx={{
                                px: 2,
                                py: 1.75,
                                borderRadius: 2,
                                backgroundColor: 'white',
                                transition: 'all 0.3s ease',
                                height: {xs: '56px', sm: 'auto'},
                                '&:hover': {
                                    backgroundColor: 'white',
                                    transform: showAdvancedFilters ? 'scale(1.05)' : 'scale(1)',
                                }
                            }}
                        >
                            <Tune/>
                        </Button>
                    </Badge>
                )}
            </Box>

            <Collapse in={showAdvancedFilters} sx={{borderRadius: 2, backgroundColor: 'white', p: 3}}>
                <Box sx={{flexGrow: 1,}}>
                    <Grid container spacing={3}>
                        <Grid size={{xs: 12, sm: 6}}>
                            <FormControl fullWidth sx={{mb: 2}}>
                                <InputLabel id="cities-multiple-checkbox-label">{t('locations.cities')}</InputLabel>
                                <Select
                                    labelId="cities-multiple-checkbox-label"
                                    id="cities-multiple-checkbox"
                                    multiple
                                    size="small"
                                    value={filters.cities}
                                    onChange={e => handleFilterChange('cities', e.target.value)}
                                    input={<OutlinedInput label={t('locations.cities')}/>}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={selectMenuProps as any}
                                    sx={{
                                        borderRadius: 2,
                                        backgroundColor: 'white',
                                        '& .MuiOutlinedInput-input': {py: 2}
                                    }}
                                >
                                    {searchFilters?.getSearchFilters.cities.map((city) => (
                                        <MenuItem key={city} value={city}>
                                            <Checkbox checked={filters.cities.includes(city)}/>
                                            <ListItemText primary={city}/>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{xs: 12, sm: 6}}>
                            <FormControl fullWidth>
                                <InputLabel id="sort-multiple-checkbox-label">{t('locations.locationSort')}</InputLabel>
                                <Select
                                    labelId="sort-multiple-checkbox-label"
                                    id="sort-multiple-checkbox"
                                    size="small"
                                    onChange={e => setSort(String(e.target.value))}
                                    input={<OutlinedInput label={t('locations.locationSort')}/>}
                                    sx={{
                                        borderRadius: 2,
                                        backgroundColor: 'white',
                                        '& .MuiOutlinedInput-input': {py: 2}
                                    }}
                                >
                                    {sort.map((sort) => (
                                        <MenuItem key={sort.value} value={sort.value}>
                                            <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                                                {sort.icon}
                                                {sort.label}
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs: 12}}>
                            <FormLabel sx={{
                                fontWeight: 600,
                                mb: 2,
                                display: 'block',
                                fontSize: '0.95rem',
                                color: 'text.primary'
                            }}>{t('locations.locationProperty')}</FormLabel>
                            <Box sx={{
                                display: 'flex',
                                gap: 1.5,
                                flexWrap: 'wrap',
                                alignItems: 'center'
                            }}>
                                {searchFilters.getSearchFilters.locationAmenities.map((property) => {
                                    const isSelected = filters.locationAmenities.includes(property);
                                    return (
                                        <Chip
                                            key={property}
                                            label={t('locations.property.' + property)}
                                            onClick={() => {
                                                const newValue = filters.locationAmenities.includes(property)
                                                    ? filters.locationAmenities.filter(p => p !== property)
                                                    : [...filters.locationAmenities, property];
                                                handleFilterChange('locationAmenities', newValue);
                                            }}
                                            variant={isSelected ? "filled" : "outlined"}
                                            color="primary"
                                            sx={{
                                                borderRadius: '20px',
                                                fontWeight: 500,
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                                backgroundColor: isSelected ? 'primary.main' : 'transparent',
                                                color: isSelected ? 'white' : 'primary.main',
                                                border: isSelected ? 'none' : '1px solid',
                                                borderColor: isSelected ? 'primary.main' : 'primary.main',
                                                '&:hover': {
                                                    boxShadow: isSelected ? '0 2px 8px rgba(18, 18, 18, 0.15)' : '0 2px 8px rgba(18, 18, 18, 0.08)',
                                                    backgroundColor: isSelected ? 'primary.main' : 'rgba(18, 18, 18, 0.03)'
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        </Grid>
                        <Grid size={{xs: 12}}>
                            <FormLabel
                                sx={{fontWeight: 600, mb: 2, display: 'block', fontSize: '0.95rem', color: 'text.primary'}}>{t('pitches.properties')}</FormLabel>
                            <Box sx={{
                                display: 'flex',
                                gap: 1.5,
                                flexWrap: 'wrap',
                                alignItems: 'center'
                            }}>
                                {searchFilters.getSearchFilters.venueProperties.map((property) => {
                                    const isSelected = filters.properties.includes(property);
                                    return (
                                        <Chip
                                            key={property}
                                            label={t('pitches.pitchPropertyOptions.' + property)}
                                            onClick={() => {
                                                const newValue = filters.properties.includes(property)
                                                    ? filters.properties.filter(p => p !== property)
                                                    : [...filters.properties, property];
                                                handleFilterChange('properties', newValue);
                                            }}
                                            variant={isSelected ? "filled" : "outlined"}
                                            color="secondary"
                                            sx={{
                                                borderRadius: '20px',
                                                fontWeight: 500,
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                                backgroundColor: isSelected ? 'secondary.main' : 'transparent',
                                                color: isSelected ? 'white' : 'secondary.main',
                                                border: isSelected ? 'none' : '1px solid',
                                                borderColor: isSelected ? 'secondary.main' : 'secondary.main',
                                                '&:hover': {
                                                    boxShadow: isSelected ? '0 2px 8px rgba(255, 111, 0, 0.15)' : '0 2px 8px rgba(255, 111, 0, 0.08)',
                                                    backgroundColor: isSelected ? 'secondary.main' : 'rgba(255, 111, 0, 0.03)'
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        </Grid>
                        <Grid size={{xs: 12}}>
                            <FormLabel
                                sx={{fontWeight: 600, mb: 2, display: 'block', fontSize: '0.95rem', color: 'text.primary'}}>{t('pitches.surfaceType')}</FormLabel>
                            <Box sx={{
                                display: 'flex',
                                gap: 1.5,
                                flexWrap: 'wrap',
                                alignItems: 'center'
                            }}>
                                {searchFilters?.getSearchFilters.surfaceTypes.map((surfaceType) => {
                                    const isSelected = filters.surfaceTypes.includes(surfaceType);
                                    const typeColor = getSurfaceTypeColor(surfaceType);
                                    return (
                                        <Chip
                                            key={surfaceType}
                                            label={t('pitches.surfaceTypeOptions.' + surfaceType)}
                                            onClick={() => {
                                                const newValue = filters.surfaceTypes.includes(surfaceType)
                                                    ? filters.surfaceTypes.filter(s => s !== surfaceType)
                                                    : [...filters.surfaceTypes, surfaceType];
                                                handleFilterChange('surfaceTypes', newValue);
                                            }}
                                            variant={isSelected ? "filled" : "outlined"}
                                            sx={{
                                                borderRadius: '20px',
                                                fontWeight: 500,
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                                backgroundColor: isSelected ? typeColor : 'transparent',
                                                color: isSelected ? 'white' : typeColor,
                                                border: isSelected ? 'none' : `1px solid`,
                                                borderColor: typeColor,
                                                '&:hover': {
                                                    boxShadow: isSelected ? `0 2px 8px ${typeColor}30` : `0 2px 8px ${typeColor}15`,
                                                    backgroundColor: isSelected ? typeColor : `${typeColor}08`
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        </Grid>
                        <Grid size={{xs: 12}}>
                            <FormLabel
                                sx={{fontWeight: 600, mb: 2, display: 'block', fontSize: '0.95rem', color: 'text.primary'}}>{t('pitches.pitchType')}</FormLabel>
                            <Box sx={{
                                display: 'flex',
                                gap: 1.5,
                                flexWrap: 'wrap',
                                alignItems: 'center'
                            }}>
                                {searchFilters?.getSearchFilters.venueTypes.map((pitchType) => {
                                    const isSelected = filters.venueTypes.includes(pitchType);
                                    const typeColor = getVenueTypeColor(pitchType);
                                    return (
                                        <Chip
                                            key={pitchType}
                                            label={t('pitches.pitchTypeOptions.' + pitchType)}
                                            onClick={() => {
                                                const newValue = filters.venueTypes.includes(pitchType)
                                                    ? filters.venueTypes.filter(p => p !== pitchType)
                                                    : [...filters.venueTypes, pitchType];
                                                handleFilterChange('venueTypes', newValue);
                                            }}
                                            variant={isSelected ? "filled" : "outlined"}
                                            sx={{
                                                borderRadius: '20px',
                                                fontWeight: 500,
                                                fontSize: '0.9rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s ease',
                                                backgroundColor: isSelected ? typeColor : 'transparent',
                                                color: isSelected ? 'white' : typeColor,
                                                border: isSelected ? 'none' : `1px solid`,
                                                borderColor: typeColor,
                                                '&:hover': {
                                                    boxShadow: isSelected ? `0 2px 8px ${typeColor}30` : `0 2px 8px ${typeColor}15`,
                                                    backgroundColor: isSelected ? typeColor : `${typeColor}08`
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>

            {/* Mobile Filter Drawer */}
            <Drawer
                anchor="bottom"
                open={showFilterDrawer}
                onClose={() => setShowFilterDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                    }
                }}
            >
                <Box sx={{p: 3}}>
                    {/* Header with Close Button */}
                    <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2}}>
                        <Typography variant="h6" sx={{fontWeight: 600}}>
                            {t('locations.filterButton')}
                        </Typography>
                        <IconButton onClick={() => setShowFilterDrawer(false)} size="small">
                            <Close/>
                        </IconButton>
                    </Box>

                    {/* Filter Content */}
                    <Stack spacing={3}>
                        {/* Cities */}
                        <FormControl fullWidth>
                            <InputLabel id="mobile-cities-label">{t('locations.cities')}</InputLabel>
                            <Select
                                labelId="mobile-cities-label"
                                id="mobile-cities"
                                multiple
                                size="small"
                                value={filters.cities}
                                onChange={e => handleFilterChange('cities', e.target.value)}
                                input={<OutlinedInput label={t('locations.cities')}/>}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {searchFilters?.getSearchFilters.cities.map((city) => (
                                    <MenuItem key={city} value={city}>
                                        <Checkbox checked={filters.cities.includes(city)}/>
                                        <ListItemText primary={city}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Sort */}
                        <FormControl fullWidth>
                            <InputLabel id="mobile-sort-label">{t('locations.locationSort')}</InputLabel>
                            <Select
                                labelId="mobile-sort-label"
                                id="mobile-sort"
                                size="small"
                                onChange={e => setSort(String(e.target.value))}
                                input={<OutlinedInput label={t('locations.locationSort')}/>}
                            >
                                {sort.map((sortOption) => (
                                    <MenuItem key={sortOption.value} value={sortOption.value}>
                                        <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
                                            {sortOption.icon}
                                            {sortOption.label}
                                        </Stack>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Location Properties */}
                        <Box>
                            <FormLabel sx={{fontWeight: 600, mb: 2, display: 'block'}}>
                                {t('locations.locationProperty')}
                            </FormLabel>
                            <ToggleButtonGroup
                                value={filters.locationAmenities}
                                size="small"
                                color="secondary"
                                onChange={(_, newValue) => handleFilterChange('locationAmenities', newValue)}
                                orientation="vertical"
                                fullWidth
                            >
                                {searchFilters.getSearchFilters.locationAmenities.map((property) => (
                                    <ToggleButton
                                        key={property}
                                        value={property}
                                    >
                                        {t('locations.property.' + property)}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Box>

                        {/* Venue Properties */}
                        <Box>
                            <FormLabel sx={{fontWeight: 600, mb: 2, display: 'block'}}>
                                {t('pitches.properties')}
                            </FormLabel>
                            <ToggleButtonGroup
                                value={filters.properties}
                                size="small"
                                color="secondary"
                                onChange={(_, newValue) => handleFilterChange('properties', newValue)}
                                orientation="vertical"
                                fullWidth
                            >
                                {searchFilters.getSearchFilters.venueProperties.map((property) => (
                                    <ToggleButton
                                        key={property}
                                        value={property}
                                    >
                                        {t('pitches.pitchPropertyOptions.' + property)}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Box>

                        {/* Surface Types */}
                        <Box>
                            <FormLabel sx={{fontWeight: 600, mb: 2, display: 'block'}}>
                                {t('pitches.surfaceType')}
                            </FormLabel>
                            <ToggleButtonGroup
                                value={filters.surfaceTypes}
                                size="small"
                                onChange={(_, newValue) => handleFilterChange('surfaceTypes', newValue)}
                                orientation="vertical"
                                fullWidth
                            >
                                {searchFilters?.getSearchFilters.surfaceTypes.map((surfaceType) => (
                                    <ToggleButton
                                        key={surfaceType}
                                        value={surfaceType}
                                        sx={{
                                            color: getSurfaceTypeColor(surfaceType),
                                            '&.Mui-selected': {
                                                backgroundColor: getSurfaceTypeColor(surfaceType),
                                                color: 'white',
                                                borderColor: getSurfaceTypeColor(surfaceType),
                                                '&:hover': {
                                                    backgroundColor: getSurfaceTypeColor(surfaceType),
                                                    opacity: 0.8
                                                }
                                            },
                                            '&:hover': {
                                                backgroundColor: `${getSurfaceTypeColor(surfaceType)}20`,
                                                borderColor: getSurfaceTypeColor(surfaceType)
                                            }
                                        }}
                                    >
                                        {t('pitches.surfaceTypeOptions.' + surfaceType)}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Box>

                        {/* Venue Types */}
                        <Box>
                            <FormLabel sx={{fontWeight: 600, mb: 2, display: 'block'}}>
                                {t('pitches.pitchType')}
                            </FormLabel>
                            <ToggleButtonGroup
                                value={filters.venueTypes}
                                size="small"
                                onChange={(_, newValue) => handleFilterChange('venueTypes', newValue)}
                                orientation="vertical"
                                fullWidth
                            >
                                {searchFilters?.getSearchFilters.venueTypes.map((pitchType) => (
                                    <ToggleButton
                                        key={pitchType}
                                        value={pitchType}
                                        sx={{
                                            color: getVenueTypeColor(pitchType),
                                            '&.Mui-selected': {
                                                backgroundColor: getVenueTypeColor(pitchType),
                                                color: 'white',
                                                borderColor: getVenueTypeColor(pitchType),
                                                '&:hover': {
                                                    backgroundColor: getVenueTypeColor(pitchType),
                                                    opacity: 0.8
                                                }
                                            },
                                            '&:hover': {
                                                backgroundColor: `${getVenueTypeColor(pitchType)}20`,
                                                borderColor: getVenueTypeColor(pitchType)
                                            }
                                        }}
                                    >
                                        {t('pitches.pitchTypeOptions.' + pitchType)}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Box>

                        {/* Action Buttons */}
                        <Box sx={{display: "flex", gap: 2, mt: 2}}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => setShowFilterDrawer(false)}
                                sx={{borderRadius: 2}}
                            >
                                {t('locations.searchButton')}
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => {
                                    handleFilterChange('searchTerm', '');
                                    handleFilterChange('cities', []);
                                    handleFilterChange('locationAmenities', []);
                                    handleFilterChange('properties', []);
                                    handleFilterChange('surfaceTypes', []);
                                    handleFilterChange('venueTypes', []);
                                }}
                                sx={{borderRadius: 2}}
                            >
                                {t('locations.clearAll')}
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </Drawer>

        </Paper>
    );
}
