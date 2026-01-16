import {Box, Breadcrumbs, Link, Typography} from "@mui/material";
import theme from "../theme/theme.ts";

export function AppBreadcrumbs() {

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            py: 2,
            alignItems: "center",
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}15 100%)`,
        }}>
            <Breadcrumbs aria-label="breadcrumb" separator="/">
                <Link underline="hover" color="inherit" href="/" sx={{fontWeight: "700"}}>
                    Home
                </Link>
                <Typography sx={{color: theme.palette.primary.main, fontWeight: "700"}} >Find Locations</Typography>
            </Breadcrumbs>
        </Box>
    );
}