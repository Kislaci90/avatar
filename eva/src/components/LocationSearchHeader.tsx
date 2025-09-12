import {Box, Button, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {Search} from "@mui/icons-material";
import type {Filters} from "../pages/LocationList.tsx";

interface SearchHeaderProps {
    filters: { searchTerm: string; properties: string[] },
    handleSearch: () => void,
    setFilters: (value: (((prevState: Filters) => Filters) | Filters)) => void
}

export function LocationSearchHeader({filters, handleSearch, setFilters}: Readonly<SearchHeaderProps>) {
    return (
        <Paper elevation={3} sx={{p: 4, mb: 6, borderRadius: 3}}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h4" fontWeight={700} color="primary.main">
                    Find Football Locations
                </Typography>
            </Box>

            <Box display="flex" gap={2} mb={3}>
                <TextField
                    fullWidth
                    placeholder="Search by location name, description, or address..."
                    value={filters.searchTerm}
                    onChange={e => setFilters(prev => ({...prev, searchTerm: e.target.value}))}
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{color: 'primary.main'}}/>
                                </InputAdornment>
                            ),
                            sx: {borderRadius: 2}
                        }
                    }}
                />
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleSearch}
                    sx={{
                        px: 4
                    }}
                >
                    Search
                </Button>
            </Box>
        </Paper>
    );
}