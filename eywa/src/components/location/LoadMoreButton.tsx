import {Box, Button, CircularProgress} from "@mui/material";
import theme from "../../theme/theme.ts";

interface LoadMoreButtonProps {
    loading: boolean,
    onClick: () => void
}

export function LoadMoreButton({loading, onClick}: Readonly<LoadMoreButtonProps>) {
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
                    Loading...
                </Box>
            ) : (
                'Load More Locations'
            )}
        </Button>
    );
}