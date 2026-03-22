import {
    Box,
    Button,
    Checkbox,
    Chip,
    Collapse,
    FormControl,
    FormControlLabel,
    FormGroup,
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
                                    value={filters.cities}
                                    onChange={e => handleFilterChange('cities', e.target.value)}
                                    input={<OutlinedInput label={t('locations.cities')}/>}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    sx={{borderRadius: 2, backgroundColor: 'white'}}
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
                                    onChange={e => setSort(String(e.target.value))}
                                    input={<OutlinedInput label={t('locations.locationSort')}/>}
                                    sx={{borderRadius: 2, backgroundColor: 'white'}}
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
                        <Grid size={{xs: 12}}>
                            <FormLabel>{t('locations.locationProperty')}</FormLabel>
                            <FormGroup row sx={{
                                mt: 2,
                                flexWrap: 'wrap',
                                gap: 2,
                                justifyContent: 'space-between',
                                backgroundColor: 'white',
                                borderRadius: 2,
                                padding: 2
                            }}>
                                {searchFilters?.locationProperties.map((property) => (
                                    <FormControlLabel key={property} control={
                                        <Checkbox checked={filters.locationProperties.includes(property)}
                                                  value={property}
                                                  onChange={e => handleFilterChange('locationProperties', e.target.value, e.target.checked)}/>}
                                                      label={
                                                          <Stack direction="row" spacing={1} alignItems="center">
                                                              {locationPropertyIconMap[property]}
                                                              {t('locations.property.'+property)}
                                                          </Stack>
                                                      }/>
                                ))}
                            </FormGroup>
                        </Grid>
                        <Grid size={{xs: 4}}>
                            <FormLabel>{t('pitches.properties')}</FormLabel>
                            <FormGroup sx={{
                                mt: 2,
                                flexWrap: 'wrap',
                                gap: 2,
                                justifyContent: 'space-between',
                                backgroundColor: 'white',
                                borderRadius: 2,
                                padding: 2
                            }}>
                                {searchFilters?.pitchProperties.map((property) => (
                                    <FormControlLabel key={property} control={
                                        <Checkbox checked={filters.properties.includes(property)}
                                                  value={property}
                                                  onChange={e => handleFilterChange('properties', e.target.value, e.target.checked)}/>}
                                                      label={
                                                          <Stack direction="row" spacing={1} alignItems="center">
                                                              {pitchPropertyIconMap[property]}
                                                              {t('pitches.pitchPropertyOptions.'+property)}
                                                          </Stack>
                                                      }/>
                                ))}
                            </FormGroup>
                        </Grid>
                        <Grid size={{xs: 4}}>
                            <FormLabel>{t('pitches.surfaceType')}</FormLabel>
                            <FormGroup sx={{
                                mt: 2,
                                flexWrap: 'wrap',
                                gap: 2,
                                justifyContent: 'space-between',
                                backgroundColor: 'white',
                                borderRadius: 2,
                                padding: 2
                            }}>
                                {searchFilters?.surfaceTypes.map((surfaceType) => (
                                    <FormControlLabel key={surfaceType} control={
                                        <Checkbox checked={filters.surfaceTypes.includes(surfaceType)}
                                                  sx={{color: getSurfaceTypeColor(surfaceType), '&.Mui-checked': {color: getSurfaceTypeColor(surfaceType)}}}
                                                  value={surfaceType}
                                                  onChange={e => handleFilterChange('surfaceTypes', e.target.value, e.target.checked)}/>}
                                                      label={
                                                          <Stack direction="row" spacing={1} alignItems="center">
                                                              {t('pitches.surfaceTypeOptions.'+surfaceType)}
                                                          </Stack>
                                                      }/>
                                ))}
                            </FormGroup>
                        </Grid>
                        <Grid size={{xs: 4}}>
                            <FormLabel>{t('pitches.pitchType')}</FormLabel>
                            <FormGroup sx={{
                                mt: 2,
                                flexWrap: 'wrap',
                                gap: 2,
                                justifyContent: 'space-between',
                                backgroundColor: 'white',
                                borderRadius: 2,
                                padding: 2
                            }}>
                                {searchFilters?.pitchTypes.map((type) => (
                                    <FormControlLabel key={type} control={
                                        <Checkbox checked={filters.pitchTypes.includes(type)}
                                                  value={type}
                                                  sx={{color: getPitchTypeColor(type), '&.Mui-checked': {color: getPitchTypeColor(type)}}}
                                                  onChange={e => handleFilterChange('pitchTypes', e.target.value, e.target.checked)}/>}
                                                      label={
                                                          <Stack direction="row" spacing={1} alignItems="center">
                                                              {t('pitches.pitchTypeOptions.'+type)}
                                                          </Stack>
                                                      }/>
                                ))}
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>

        </Paper>
    );
}