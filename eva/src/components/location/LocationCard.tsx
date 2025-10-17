import {Card, useTheme} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {LocationCardContent} from "./LocationCardContent";
import type {LocationView} from "../../services/location.ts";
import {LocationCardImage} from "./LocationCardImage.tsx";
import {LocationCardButtons} from "./LocationCardButtons.tsx";

interface LocationCardProps {
    location: LocationView,
}

export function LocationCard({location}: Readonly<LocationCardProps>) {
    const theme = useTheme()
    const navigate = useNavigate();

    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 4,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
                    borderColor: theme.palette.secondary.main,
                    '& .card-image': {
                        transform: 'scale(1.05)',
                    },
                    '& .card-overlay': {
                        opacity: 1,
                    }
                }
            }}
            onClick={() => navigate(`/locations/${location.id}`)}
        >
            <LocationCardImage location={location}/>

            <LocationCardContent location={location}/>

            <LocationCardButtons location={location}/>

        </Card>
    );
}