import React from "react";
import {
  Box,
  Paper,
  Typography,
  Switch,
  Container,
  CssBaseline,
} from "@mui/material";

function AllowImport() {
  return (
    // <Container spacing={2}>
    //   <CssBaseline />

    <Paper>
      <Box p={3} display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h5" fontWeight="fontWeightMedium">
            Allow Import
          </Typography>
          <Typography variant="body2" my={2}>
            Allow user to mass import invoices from file
          </Typography>
        </Box>
        <Switch defaultChecked />
      </Box>
    </Paper>
    // </Container>
  );
}

export default AllowImport;
