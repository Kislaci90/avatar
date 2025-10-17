import {Box, Grid, Typography} from "@mui/material";
import type {LocationView} from "../../../services/location.ts";
import {PitchCard} from "../../pitch/PitchCard.tsx";
import {Divider} from "@mui/material";

interface LocationPitchesTabPanelProps {
    location: LocationView
}

export function LocationPitchesTabPanel({location}: Readonly<LocationPitchesTabPanelProps>) {

    return (
        <>
            <Typography variant="h5" sx={{mb: 3}}>
                Available Pitches ({location.pitches?.length || 0})
            </Typography>

            <Divider sx={{mb: 3}}/>

            {/* Pitch Cards Grid */}
            {location.pitches.length > 0 && (
                <Box sx={{mb: 6}}>
                    <Grid container spacing={3}>
                        {location.pitches.map((pitch: any, index: number) => (
                            <Grid size={{xs: 12, sm: 6, lg: 4}} key={index}>
                                <PitchCard pitch={pitch}/>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </>
    );
}