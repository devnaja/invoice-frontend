import {
  Paper,
  Typography,
  CssBaseline,
  Divider,
  Grid,
  Box,
} from "@mui/material";
import PrivateLayout from "layouts/privateLayout";
import React from "react";

function Details2() {
  const invoiceData = {
    data: {
      id: 1,
      attributes: {
        reqID: "1010",
        ReqDate: "2023-12-25T17:15:00.000Z",
        reqHeader: "Check",
        reqBody: "Please check again",
        reqParam: "data",
        reqUrl: "check.com.my",
        rtnDate: "2023-12-27T00:15:00.000Z",
        rtnStatusCode: "1",
        rtnHeader: "Good",
        rtnBody: "Status OK",
        createdAt: "2023-12-27T15:55:53.541Z",
        updatedAt: "2023-12-27T15:55:57.220Z",
        publishedAt: "2023-12-27T15:55:57.209Z",
      },
    },
    meta: {},
  };

  const labelWidth = 200;

  return (
    <PrivateLayout>
      <CssBaseline />
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography fontWeight="fontWeightMedium" variant="h5" mb={2}>
          Transaction Details
        </Typography>
        <Divider py={2} />
        <Box mt={2}>
          <Typography variant="h6">Invoice Info</Typography>
          <Grid item xs={12} sm={6} display={"flex"} my={1}>
            <Typography
              variant="subtitle1"
              fontWeight="fontWeightSemiBold"
              sx={{ minWidth: labelWidth }}
            >
              E-Invoice Number
            </Typography>
            <Typography variant="body1">
              : {invoiceData.data.attributes.reqID}
            </Typography>
          </Grid>
        </Box>
      </Paper>
    </PrivateLayout>
  );
}

export default Details2;
