import {
    Box,
    Button,
    Checkbox,
    Chip,
    Collapse,
    Divider,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {ArrowDownward, ArrowUpward, Search, Tune} from "@mui/icons-material";
import type {LocationFilter} from "../../pages/LocationList.tsx";
import {useState} from "react";
import { useTranslation } from "react-i18next";
import {locationPropertyIconMap} from "../PropertyMap.tsx";

interface SearchHeaderProps {
    filters: LocationFilter,
    handleSearch: () => void,
    clearFilters: () => void,
    handleFilterChange: <K extends keyof LocationFilter>(field: K, value: LocationFilter[K]) => void,
    setSort: (value: string) => void
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

const cities = [
    {value: 'Budapest', label: 'Budapest'},
    {value: 'Eger', label: 'Eger'}
];

export function LocationSearchHeader({
                                         filters,
                                         handleSearch,
                                         handleFilterChange,
                                         setSort
                                     }: Readonly<SearchHeaderProps>) {

    const { t } = useTranslation();
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const locationSort = [
        {value: "DISTANCE_ASC", label: t('locations.nearestLocation'), icon: <ArrowUpward/>},
        {value: "DISTANCE_DESC", label: t('locations.farthestLocation'), icon: <ArrowDownward/>},
    ]

    const locationProperties = [
        {value: 'FREE_PARKING', label: t('locations.freeParking'), icon: locationPropertyIconMap["FREE_PARKING"]},
        {value: 'SHOWER', label: t('locations.shower'), icon: locationPropertyIconMap["SHOWER"]},
        {value: 'CHANGING_ROOM', label: t('locations.changingRoom'), icon: locationPropertyIconMap["CHANGING_ROOM"]},
        {value: 'CAFE', label: t('locations.cafe'), icon: locationPropertyIconMap["CAFE"]},
        {value: 'EQUIPMENT_RENTAL', label: t('locations.equipmentRental'), icon: locationPropertyIconMap["EQUIPMENT_RENTAL"]},
    ];

    const getActiveFiltersCount = () => {
        return Object.values(filters).filter(value =>
            value !== '' && value !== null && !Array.isArray(value)
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

            <Box display="flex" gap={2} mb={3}>
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
                            label={`Search: ${filters.searchTerm}`}
                            onDelete={() => handleFilterChange('searchTerm', '')}
                            color="primary"
                            variant="outlined"
                        />
                    )}
                    {filters.cities && filters.cities.length > 0 && (
                        <Chip
                            label={`Cities: ${cities.find(c => filters.cities.includes(c.value))?.label}`}
                            onDelete={() => handleFilterChange('cities', [])}
                            color="primary"
                            variant="outlined"
                        />
                    )}
                </Box>
            )}


            <Collapse in={showAdvancedFilters}>
                <Divider sx={{my: 3}}/>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={4}>
                        <Grid size={{xs: 4}}>
                            <FormControl fullWidth sx={{mb: 2}}>
                                <InputLabel id="cities-multiple-checkbox-label">{t('locations.cities')}</InputLabel>
                                <Select
                                    labelId="cities-multiple-checkbox-label"
                                    id="cities-multiple-checkbox"
                                    multiple
                                    value={filters.cities}
                                    onChange={e => handleFilterChange('cities', Array.from(e.target.value))}
                                    input={<OutlinedInput label={t('locations.cities')}/>}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    sx={{borderRadius: 2, backgroundColor: 'white'}}
                                >
                                    {cities.map((city) => (
                                        <MenuItem key={city.value} value={city.value}>
                                            <Checkbox checked={filters.cities.includes(city.value)}/>
                                            <ListItemText primary={city.label}/>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs: 4}}>
                            <FormControl fullWidth>
                                <InputLabel id="location-properties-multiple-checkbox-label">{t('locations.locationProperty')}</InputLabel>
                                <Select
                                    labelId="location-properties-multiple-checkbox-label"
                                    id="location-properties-multiple-checkbox"
                                    multiple
                                    value={filters.locationProperties}
                                    onChange={e => handleFilterChange('locationProperties', Array.from(e.target.value))}
                                    input={<OutlinedInput label={t('locations.locationProperty')}/>}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    sx={{borderRadius: 2, backgroundColor: 'white'}}
                                >
                                    {locationProperties.map((property) => (
                                        <MenuItem key={property.value} value={property.value}>
                                            <Checkbox checked={filters.locationProperties.includes(property.value)}/>
                                            {property.icon}
                                            <ListItemText primary={property.label}/>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid size={{xs: 4}}>
                            <FormControl fullWidth>
                                <InputLabel id="sort-multiple-checkbox-label">{t('locations.locationSort')}</InputLabel>
                                <Select
                                    labelId="sort-multiple-checkbox-label"
                                    id="sort-multiple-checkbox"
                                    onChange={e => setSort(String(e.target.value))}
                                    input={<OutlinedInput label={t('locations.locationSort')}/>}
                                    sx={{borderRadius: 2, backgroundColor: 'white'}}
                                >
                                    {locationSort.map((sort) => (
                                        <MenuItem key={sort.value} value={sort.value}>
                                            <Box sx={{mr: 1, mt: 1}}>{sort.icon}</Box> {sort.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>

        </Paper>
    );
}