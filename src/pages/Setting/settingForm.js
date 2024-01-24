import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Container,
} from "@mui/material";
import React from "react";

function SettingForm() {
  const labelWidth = 130;

  return (
    // <PrivateLayout>
    // <Container>
    <Paper>
      <Box p={3}>
        <Typography variant="h5" fontWeight="fontWeightMedium">
          Company Settings
        </Typography>
        <Grid container spacing={3}>
          {/* First item in the grid */}
          <Grid item xs={12} my={3}>
            <Box display="flex" my={1}>
              <Typography
                display="flex"
                alignItems="center"
                px={4}
                sx={{ minWidth: labelWidth }}
              >
                ID
              </Typography>
              <TextField
                size="small"
                id="id"
                variant="outlined"
                sx={{ width: 500 }}
                inputProps={{ sx: { height: 15 } }}
              />
            </Box>
            <Box display="flex">
              <Typography
                display="flex"
                alignItems="center"
                px={4}
                sx={{ minWidth: labelWidth }}
              >
                Token
              </Typography>
              <TextField
                size="small"
                id="token"
                variant="outlined"
                sx={{ width: 500 }}
                inputProps={{ sx: { height: 15 } }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
    // </Container>
    // </PrivateLayout>
  );
}

export default SettingForm;
