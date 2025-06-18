import React from 'react';
import Grid from '@mui/material/Grid';

import { Image, Details } from './components';

import Container from "../../components/Container";
import Main from "../../layouts/Main";
import Box from "@mui/material/Box";
import {Breadcrumb, Newsletter} from "../LocationSearch/components";
import {useTheme} from "@mui/material/styles";

const LocationDetails = () => {
    const theme = useTheme();
    return (
        <Main>
            <Box bgcolor={"alternate.main"}>
                <Container paddingY={2}>
                    <Breadcrumb />
                </Container>
            </Box>
            <Container>
                <Grid container spacing={{ xs: 2, md: 4 }}>
                    <Grid item xs={12} md={7}>
                        <Image />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Details />
                    </Grid>
                </Grid>
            </Container>
            <Box
                position={"relative"}
                marginTop={{ xs: 4, md: 6 }}
                sx={{
                    backgroundColor: theme.palette.alternate.main,
                }}
            >
            <Container>
                <Newsletter />
            </Container>
            </Box>
        </Main>
    );
};

export default LocationDetails;