import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import Main from "../../layouts/Main";
import Container from "../../components/Container";
import { Breadcrumb, Newsletter, Result } from "./components";

const LocationSearch = () => {
  const theme = useTheme();
  return (
    <Main>
      <Box bgcolor={"alternate.main"}>
        <Container paddingY={2}>
          <Breadcrumb />
        </Container>
      </Box>
      <Container>
        <Result />
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

export default LocationSearch;
