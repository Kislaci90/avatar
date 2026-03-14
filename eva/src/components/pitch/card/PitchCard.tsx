import {Card, useTheme} from "@mui/material";
import type {PitchView} from "../../../services/location.ts";
import {PitchCardContent} from "./PitchCardContent.tsx";
import {PitchCardButtons} from "./PitchCardButtons.tsx";
import {PitchCardImage} from "./PitchCardImage.tsx";
import type {UserLocation} from "../../../services/distance.ts";

interface PitchCardProps {
    pitch: PitchView,
    userLocation: UserLocation | null
}

export function PitchCard({pitch, userLocation}: Readonly<PitchCardProps>) {
    const theme = useTheme()

    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: `2px solid ${theme.palette.divider}`,
                borderRadius: 2,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                '&:hover': {
                    borderColor: theme.palette.primary.main,
                    '& .card-image': {
                        transform: 'scale(1.05)',
                    }
                }
            }}
        >
            <PitchCardImage pitch={pitch} userLocation={userLocation} />

            <PitchCardContent pitch={pitch}/>

            <PitchCardButtons pitch={pitch}/>

        </Card>
    );
}