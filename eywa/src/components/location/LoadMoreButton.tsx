import {Box, Button, CircularProgress} from "@mui/material";
import theme from "../../theme/theme.ts";
import {useTranslation} from "react-i18next";

interface LoadMoreButtonProps {
    loading: boolean,
    onClick: () => void
}

export function LoadMoreButton({loading, onClick}: Readonly<LoadMoreButtonProps>) {
    const {t} = useTranslation();
    return (
        <Button
            variant="outlined"
            size="large"
            onClick={onClick}
            disabled={loading}
            sx={{
                px: 6,
                py: 2,
                borderRadius: 2,
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                borderColor: theme.palette.secondary.main,
            }}
        >
            {loading ? (
                <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <CircularProgress size={20}/>
                    {t('common.loading')}
                </Box>
            ) : (
                t('common.showMore')
            )}
        </Button>
    );
}