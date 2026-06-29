import {Box, Typography} from "@mui/material";
import theme from "../theme/theme.ts";
import {useTranslation} from "react-i18next";

interface SectionHeaderProps {
    translateKey: string
}

export function SectionHeader({translateKey}: Readonly<SectionHeaderProps>) {
    const {t} = useTranslation();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'left',
                mb: 4,
                mt: 4,
                pb: 2,
                pl: 3,
                borderLeft: `3px solid ${theme.palette.primary.main}`,
                backgroundColor: `${theme.palette.primary.main}04`,
            }}
        >
            <Typography variant="h5" component="h2" sx={{fontWeight: 700}}>
                {t(translateKey)}
            </Typography>
        </Box>
    );
}