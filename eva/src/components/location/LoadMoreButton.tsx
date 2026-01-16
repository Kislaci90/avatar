import {Box, Button, CircularProgress} from "@mui/material";

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
                borderRadius: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderWidth: 2,
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