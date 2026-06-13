import {Card, useTheme} from "@mui/material";
import {VenueCardContent} from "./VenueCardContent.tsx";
import {VenueCardButtons} from "./VenueCardButtons.tsx";
import {VenueCardImage} from "./VenueCardImage.tsx";
import type {UserLocation} from "../../../services/distance.ts";
import type {VenueView} from "../../../generated/graphql-schema.ts";

interface PitchCardProps {
    pitch: VenueView,
    userLocation: UserLocation | null
}

export function VenueCard({pitch, userLocation}: Readonly<PitchCardProps>) {
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
            <VenueCardImage pitch={pitch} userLocation={userLocation} />

            <VenueCardContent pitch={pitch}/>

            <VenueCardButtons pitch={pitch}/>

        </Card>
    );
}