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
import { useTranslation } from "react-i18next";

interface PitchSearchHeaderProps {
    filters: { searchTerm: string; surfaceType: string; pitchType: string },
    clearFilters: () => void,
    handleSearch: () => void,
    handleFilterChange: (field: string, value: string) => void
}

export function PitchSearchHeader({
                                      filters,
                                      handleSearch,
                                      handleFilterChange
                                  }: Readonly<PitchSearchHeaderProps>) {
    const { t } = useTranslation();
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const pitchTypes = [
        {value: 'FULL_SIZE', label: t('pitches.fullSize'), icon: <SportsSoccer/>},
        {value: 'HALF_SIZE', label: t('pitches.halfSize'), icon: <SportsSoccer/>},
        {value: 'FIVE_A_SIDE', label: t('pitches.fiveASide'), icon: <SportsSoccer/>},
        {value: 'SEVEN_A_SIDE', label: t('pitches.sevenASide'), icon: <SportsSoccer/>},
        {value: 'INDOOR', label: t('pitches.indoor'), icon: <SportsSoccer/>},
        {value: 'OUTDOOR', label: t('home.browseAllPitches'), icon: <SportsSoccer/>}
    ];

    const surfaceTypes = [
        {value: 'GRASS', label: t('pitches.naturalGrass'), color: '#4caf50'},
        {value: 'ARTIFICIAL_GRASS', label: t('pitches.artificialGrass'), color: '#8bc34a'},
        {value: 'CONCRETE', label: t('pitches.concrete'), color: '#9e9e9e'},
        {value: 'ASPHALT', label: t('pitches.asphalt'), color: '#607d8b'},
        {value: 'TURF', label: t('pitches.turf'), color: '#795548'},
        {value: 'HARDCOURT', label: t('pitches.hardCourt'), color: '#ff9800'}
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
                    {t('pitches.searchHeader')}
                </Typography>
            </Box>

            {/* Main Search Bar */}
            <Box display="flex" gap={2} mb={3}>
                <TextField
                    fullWidth
                    placeholder={t('pitches.searchPlaceholder')}
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
                    {t('pitches.searchButton')}
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
                            <InputLabel>{t('pitches.pitchType')}</InputLabel>
                            <Select
                                value={filters.pitchType}
                                onChange={e => handleFilterChange('pitchType', e.target.value)}
                                label={t('pitches.pitchType')}
                                sx={{borderRadius: 2, backgroundColor: 'white'}}
                            >
                                <MenuItem value="">{t('pitches.allTypes')}</MenuItem>
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
                            <InputLabel>{t('pitches.surfaceType')}</InputLabel>
                            <Select
                                value={filters.surfaceType}
                                onChange={e => handleFilterChange('surfaceType', e.target.value)}
                                label={t('pitches.surfaceType')}
                                sx={{borderRadius: 2, backgroundColor: 'white'}}
                            >
                                <MenuItem value="">{t('pitches.allSurfaces')}</MenuItem>
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