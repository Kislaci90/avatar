import {Box, Button, useTheme} from "@mui/material";
import type {LocationView} from "../../services/location.ts";
import {useNavigate} from "react-router-dom";

interface LocationCardButtonsProps {
    location: LocationView
}

export function LocationCardButtons({location}: Readonly<LocationCardButtonsProps>) {
    const theme = useTheme()
    const navigate = useNavigate();

    return (
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
                    }}
                    onClick={e => {
                        e.stopPropagation();
                        navigate(`/locations/${location.id}`);
                    }}
                >
                    View Details
                </Button>
                <Button
                    variant="outlined"
                    size="medium"
                    sx={{
                        flex: 1,
                        fontWeight: 600,
                        borderRadius: 2,
                        py: 1,
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        border: `1px solid ${theme.palette.primary.main}`,
                        '&:focus': {
                            outline: 'none',
                            border: `1px solid ${theme.palette.primary.main}`,
                        }
                    }}
                    onClick={e => {
                        e.stopPropagation();
                        navigate(`/locations/${location.id}#pitches`);
                    }}
                >
                    View Pitches
                </Button>
            </Box>
        </Box>
    );
}