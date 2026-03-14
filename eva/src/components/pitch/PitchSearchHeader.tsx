import {
    Box,
    Button,
    Chip,
    Collapse,
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
} from "@mui/material";
import {Search, SportsSoccer, Tune} from "@mui/icons-material";
import {useState} from "react";

interface PitchSearchHeaderProps {
    filters: { searchTerm: string; surfaceType: string; pitchType: string },
    clearFilters: () => void,
    handleSearch: () => void,
    handleFilterChange: (field: string, value: any) => void
}

export function PitchSearchHeader({
                                      filters,
                                      handleSearch,
                                      handleFilterChange
                                  }: Readonly<PitchSearchHeaderProps>) {
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

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

    const getActiveFiltersCount = () => {
        return Object.values(filters).filter(value =>
            value !== '' && value !== 'name' && value !== 'asc'
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
                    Find Your Pitches Locations
                </Typography>
            </Box>

            {/* Main Search Bar */}
            <Box display="flex" gap={2} mb={3}>
                <TextField
                    fullWidth
                    placeholder="Search by pitch name, description, or location..."
                    value={filters.searchTerm}
                    onChange={e => handleFilterChange('searchTerm', e.target.value)}
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
                <Button
                    variant="outlined"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    sx={{
                        borderRadius: 2,
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
                    <Grid size={{xs: 4}}>
                        <FormControl fullWidth>
                            <InputLabel>Pitch Type</InputLabel>
                            <Select
                                value={filters.pitchType}
                                onChange={e => handleFilterChange('pitchType', e.target.value)}
                                label="Pitch Type"
                                sx={{borderRadius: 2, backgroundColor: 'white'}}
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
                    <Grid size={{xs: 4}}>
                        <FormControl fullWidth>
                            <InputLabel>Surface Type</InputLabel>
                            <Select
                                value={filters.surfaceType}
                                onChange={e => handleFilterChange('surfaceType', e.target.value)}
                                label="Surface Type"
                                sx={{borderRadius: 2, backgroundColor: 'white'}}
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
    );
}