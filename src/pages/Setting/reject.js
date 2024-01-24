import React from "react";
import {
  Box,
  Paper,
  Typography,
  Switch,
  Container,
  CssBaseline,
} from "@mui/material";

function AllowReject() {
  return (
    <Paper>
      <Box p={3} display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h5" fontWeight="fontWeightMedium">
            Allow Reject
          </Typography>
          <Typography variant="body2" my={2}>
            Allow customers to raise rejection from portal
          </Typography>
        </Box>
        <Switch defaultChecked />
      </Box>
    </Paper>
  );
}

export default AllowReject;
