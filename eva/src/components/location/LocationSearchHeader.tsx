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
import {ArrowDownward, ArrowUpward, Clear, Search, Tune} from "@mui/icons-material";
import type {LocationFilter} from "../../pages/LocationList.tsx";
import {useState} from "react";
import {locationPropertyIconMap} from "../PropertyMap.tsx";

interface SearchHeaderProps {
    filters: LocationFilter,
    handleSearch: () => void,
    clearFilters: any,
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

const locationSort = [
    {value: "DISTANCE_ASC", label: "Nearest location", icon: <ArrowUpward/>},
    {value: "DISTANCE_DESC", label: "Farest location", icon: <ArrowDownward/>},
]

const cities = [
    {value: 'Budapest', label: 'Budapest'},
    {value: 'Eger', label: 'Eger'}
];

const locationProperties = [
    {value: 'FREE_PARKING', label: 'Free Parking', icon: locationPropertyIconMap["FREE_PARKING"]},
    {value: 'SHOWER', label: 'Shower', icon: locationPropertyIconMap["SHOWER"]},
    {value: 'CHANGING_ROOM', label: 'Changing room', icon: locationPropertyIconMap["CHANGING_ROOM"]},
    {value: 'CAFE', label: 'Cafe', icon: locationPropertyIconMap["CAFE"]},
    {value: 'EQUIPMENT_RENTAL', label: 'Equipment Rental', icon: locationPropertyIconMap["EQUIPMENT_RENTAL"]},
];

export function LocationSearchHeader({
                                         filters,
                                         handleSearch,
                                         clearFilters,
                                         handleFilterChange,
                                         setSort
                                     }: Readonly<SearchHeaderProps>) {

    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

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
            <Box display="flex" alignItems="center" justifyContent="center" mb={3} sx={{ borderBottom: 1 }}>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                    Find Your Football Locations
                </Typography>
            </Box>

            <Box display="flex" gap={2} mb={3}>
                <TextField
                    fullWidth
                    placeholder="Search by location name, description, or address..."
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
                    Search
                </Button>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="right">
                <Box display="flex" gap={1}>
                    <Button
                        variant="contained"
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
                    <Grid container spacing={2}>
                        <Grid size={{xs: 6}}>
                            <FormControl fullWidth sx={{mb: 2}}>
                                <InputLabel id="cities-multiple-checkbox-label">Cities</InputLabel>
                                <Select
                                    labelId="cities-multiple-checkbox-label"
                                    id="cities-multiple-checkbox"
                                    multiple
                                    value={filters.cities}
                                    onChange={e => handleFilterChange('cities', Array.from(e.target.value))}
                                    input={<OutlinedInput label="Cities"/>}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    sx={{backgroundColor: 'white'}}
                                >
                                    {cities.map((city) => (
                                        <MenuItem key={city.value} value={city.value}>
                                            <Checkbox checked={filters.cities.includes(city.value)}/>
                                            <ListItemText primary={city.label}/>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="location-properties-multiple-checkbox-label">Location
                                    Property</InputLabel>
                                <Select
                                    labelId="location-properties-multiple-checkbox-label"
                                    id="location-properties-multiple-checkbox"
                                    multiple
                                    value={filters.locationProperties}
                                    onChange={e => handleFilterChange('locationProperties', Array.from(e.target.value))}
                                    input={<OutlinedInput label="Location Porperties"/>}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    sx={{backgroundColor: 'white'}}
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

                        <Grid size={{xs: 6}}>
                            <FormControl fullWidth>
                                <InputLabel id="sort-multiple-checkbox-label">Location Sort</InputLabel>
                                <Select
                                    labelId="sort-multiple-checkbox-label"
                                    id="sort-multiple-checkbox"
                                    onChange={e => setSort(String(e.target.value))}
                                    input={<OutlinedInput label="Location sorting"/>}
                                    sx={{backgroundColor: 'white'}}
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