import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

export function SearchHeroSection() {
    const {t} = useTranslation();

    return (
        <Box sx={{py: 6, textAlign: 'center'}}>
            <Typography
                variant="h2"
                sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 1,
                    fontSize: {xs: '2rem', sm: '2.5rem', md: '3rem'},
                    letterSpacing: '-0.5px'
                }}
            >
                {t('locations.findYourPerfectPitch')}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                    color: 'rgba(255,255,255,0.9)',
                    mb: 4,
                    fontSize: {xs: '0.95rem', md: '1.1rem'},
                    fontWeight: 300,
                    maxWidth: '600px',
                    mx: 'auto'
                }}
            >
                {t('locations.discoverVenues')}
            </Typography>
        </Box>
    );
}