import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import type {PitchView} from "../../../services/location.ts";

interface PitchCardButtonsProps {
    pitch: PitchView
}

export function PitchCardButtons({pitch}: Readonly<PitchCardButtonsProps>) {
    const navigate = useNavigate();

    return (
        <Box sx={{p: 3, pt: 0}}>
            <Box sx={{display: 'flex', gap: 1.5}}>
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
                        navigate(`/pitches/${pitch.id}`);
                    }}
                >
                    View Details
                </Button>
            </Box>
        </Box>
    );
}