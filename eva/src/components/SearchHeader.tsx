import {
    Box,
    Button,
    Checkbox,
    Chip,
    Collapse,
    FormControl,
    FormLabel,
    Grid,
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
    Typography
} from "@mui/material";
import {ArrowDownward, ArrowUpward, Search, Tune} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {locationPropertyIconMap, pitchPropertyIconMap} from "./PropertyMap.tsx";
import {
    GET_SEARCH_FILTERS,
    type GetLocationSearchFilterResult,
    type LocationSearchFilter,
} from "../services/location.ts";
import theme from "../theme/theme.ts";
import type {Filter} from "../services/filters.ts";
import {useQuery} from "@apollo/client/react";
import {getPitchTypeColor, getSurfaceTypeColor} from "../services/pitches.ts";

interface SearchHeaderProps<F extends Filter> {
    filters: F,
    handleSearch: () => void,
    handleFilterChange: <K extends keyof Filter>(field: K, value: Filter[K] | string | string[], checked?: boolean) => void,
    setSort: (value: string) => void,
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
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
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [searchFilters, setSearchFilters] = useState<LocationSearchFilter>({
        locationProperties: [],
        cities: [],
        pitchProperties: [],
        pitchTypes: [],
        surfaceTypes: [],
    });

    const sort = [
        {value: "DISTANCE_ASC", label: t('locations.nearestLocation'), icon: <ArrowUpward/>},
        {value: "DISTANCE_DESC", label: t('locations.farthestLocation'), icon: <ArrowDownward/>},
    ]

    const {
        data: searchFiltersData,
    } = useQuery<GetLocationSearchFilterResult>(GET_SEARCH_FILTERS);

    useEffect(() => {
        if (searchFiltersData?.getSearchFilters) {
            setSearchFilters(searchFiltersData.getSearchFilters);
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
            <Box display="flex" alignItems="center" justifyContent="center" mb={3} sx={{borderBottom: 1}}>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                    {t('locations.searchHeader')}
                </Typography>
            </Box>

            <Box display="flex" gap={2} mb={1}>
                <TextField
                    fullWidth
                    placeholder={t('locations.searchPlaceholder')}
                    value={filters.searchTerm}
                    onChange={e => handleFilterChange('searchTerm', e.target.value)}
                    variant="outlined"
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
                    size="large"
                    onClick={handleSearch}
                    sx={{
                        px: 4,
                        borderRadius: 2,
                        backgroundColor: theme.palette.secondary.main,
                    }}
                >
                    {t('locations.searchButton')}
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    sx={{
                        borderRadius: 2,
                        backgroundColor: 'white',
                    }}
                >
                    <Tune/>
                </Button>
            </Box>

            {/* Active Filters Display */}
            {getActiveFiltersCount() > 0 && (
                <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
                    {filters.searchTerm && (
                        <Chip
                            label={`${t('locations.search')}: ${filters.searchTerm}`}
                            onDelete={() => handleFilterChange('searchTerm', '')}
                            color="primary"
                            variant="outlined"
                        />
                    )}
                    {filters.cities && filters.cities.length > 0 && (
                        <Chip
                            label={`${t('locations.cities')}: ${filters.cities.join(', ')}`}
                            onDelete={() => handleFilterChange('cities', [])}
                            color="primary"
                            variant="outlined"
                        />
                    )}
                    {filters.locationProperties && filters.locationProperties.length > 0 && (
                        <Chip
                            label={`${t('locations.locationProperty')}: ${filters.locationProperties.map((p: string) => t('locations.property.' + p)).join(', ')}`}
                            onDelete={() => handleFilterChange('locationProperties', [])}
                            color="primary"
                            variant="outlined"
                        />
                    )}
                </Box>
            )}

            <Collapse in={showAdvancedFilters} sx={{borderRadius: 2, backgroundColor: 'white', p: 3}}>
                <Box sx={{flexGrow: 1,}}>
                    <Grid container spacing={4}>
                        <Grid size={{xs: 6}}>
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
                                    MenuProps={MenuProps}
                                    sx={{borderRadius: 2, backgroundColor: 'white', '& .MuiOutlinedInput-input': {py: 2}}}
                                >
                                    {searchFilters?.cities.map((city) => (
                                        <MenuItem key={city} value={city}>
                                            <Checkbox checked={filters.cities.includes(city)}/>
                                            <ListItemText primary={city}/>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{xs: 6}}>
                            <FormControl fullWidth>
                                <InputLabel id="sort-multiple-checkbox-label">{t('locations.locationSort')}</InputLabel>
                                <Select
                                    labelId="sort-multiple-checkbox-label"
                                    id="sort-multiple-checkbox"
                                    size="small"
                                    onChange={e => setSort(String(e.target.value))}
                                    input={<OutlinedInput label={t('locations.locationSort')}/>}
                                    sx={{borderRadius: 2, backgroundColor: 'white', '& .MuiOutlinedInput-input': {py: 2}}}
                                >
                                    {sort.map((sort) => (
                                        <MenuItem key={sort.value} value={sort.value}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                {sort.icon}
                                                {sort.label}
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs: 8}}>
                            <FormLabel sx={{fontWeight: 600, mb: 2, display: 'block'}}>{t('locations.locationProperty')}</FormLabel>
                            <ToggleButtonGroup
                                value={filters.locationProperties}
                                size="small"
                                color="secondary"
                                onChange={(_, newValue) => handleFilterChange('locationProperties', newValue)}
                            >
                                {searchFilters?.locationProperties.map((property) => (
                                    <ToggleButton
                                        key={property}
                                        value={property}
                                    >
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            {locationPropertyIconMap[property]}
                                            {t('locations.property.'+property)}
                                        </Stack>
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid size={{xs: 4}}>
                            <FormLabel sx={{fontWeight: 600, mb: 2, display: 'block'}}>{t('pitches.properties')}</FormLabel>
                            <ToggleButtonGroup
                                value={filters.properties}
                                size="small"
                                color="secondary"
                                onChange={(_, newValue) => handleFilterChange('properties', newValue)}
                            >
                                {searchFilters?.pitchProperties.map((property) => (
                                    <ToggleButton
                                        key={property}
                                        value={property}
                                    >
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            {pitchPropertyIconMap[property]}
                                            {t('pitches.pitchPropertyOptions.'+property)}
                                        </Stack>
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid size={{xs: 6}}>
                            <FormLabel sx={{fontWeight: 600, mb: 2, display: 'block'}}>{t('pitches.surfaceType')}</FormLabel>
                            <ToggleButtonGroup
                                value={filters.surfaceTypes}
                                size="small"
                                onChange={(_, newValue) => handleFilterChange('surfaceTypes', newValue)}
                            >
                                {searchFilters?.surfaceTypes.map((surfaceType) => (
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
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            {t('pitches.surfaceTypeOptions.'+surfaceType)}
                                        </Stack>
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid size={{xs: 6}}>
                            <FormLabel sx={{fontWeight: 600, mb: 2, display: 'block'}}>{t('pitches.pitchType')}</FormLabel>
                            <ToggleButtonGroup
                                value={filters.pitchTypes}
                                size="small"
                                onChange={(_, newValue) => handleFilterChange('pitchTypes', newValue)}
                            >
                                {searchFilters?.pitchTypes.map((pitchType) => (
                                    <ToggleButton
                                        key={pitchType}
                                        value={pitchType}
                                        sx={{
                                            color: getPitchTypeColor(pitchType),
                                            '&.Mui-selected': {
                                                backgroundColor: getPitchTypeColor(pitchType),
                                                color: 'white',
                                                borderColor: getPitchTypeColor(pitchType),
                                                '&:hover': {
                                                    backgroundColor: getPitchTypeColor(pitchType),
                                                    opacity: 0.8
                                                }
                                            },
                                            '&:hover': {
                                                backgroundColor: `${getPitchTypeColor(pitchType)}20`,
                                                borderColor: getPitchTypeColor(pitchType)
                                            }
                                        }}
                                    >
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            {t('pitches.pitchTypeOptions.'+pitchType)}
                                        </Stack>
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>

        </Paper>
    );
}