import {Box, Button} from "@mui/material";
import type {LocationView} from "../../../services/location.ts";
import {useNavigate} from "react-router-dom";

interface LocationCardButtonsProps {
    location: LocationView
}

export function LocationCardButtons({location}: Readonly<LocationCardButtonsProps>) {
    const navigate = useNavigate();

    return (
        <Box sx={{p: 3, pt: 0, display: 'flex', justifyContent: "right", alignItems: 'center'}}>
            <Box>
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
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
            </Box>
        </Box>
    );
}