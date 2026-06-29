import {Box, Button, InputAdornment, Paper, TextField, useTheme} from "@mui/material";
import {Search} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import type {Filter} from "../../services/filters.ts";

interface SearchHeaderProps<F extends Filter> {
    filters: F,
    handleSearch: () => void,
    handleFilterChange: <K extends keyof Filter>(field: K, value: Filter[K] | string | string[], checked?: boolean) => void
}

export function SearchHeader({
                                 filters,
                                 handleSearch,
                                 handleFilterChange,
                             }: Readonly<SearchHeaderProps<Filter>>) {

    const {t} = useTranslation();
    const theme = useTheme();

    return (
        <Paper sx={{
            p: 4,
            borderRadius: 3,
            border: "none",
            background: 'transparent',
            boxShadow: 'none',
        }}>
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
            </Box>
        </Paper>
    );
}
