import * as React from "react";
import { Box, Container } from "@mui/material";
import FetchContent from "../components/mediaCard";

export default function Index() {
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}>
          <FetchContent />
        </Box>
      </Container>
    </>
  );
}
