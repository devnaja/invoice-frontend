import React from "react";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  Box,
  CssBaseline,
  Chip,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PrivateLayout from "layouts/privateLayout";
import moment from "moment";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    subtitle1: {
      color: "rgba(0, 0, 0, 0.87)",
    },
    // Add more styles as needed
  },
});

function DetailsInfo() {
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

  const supplierData = {
    data: {
      id: 1,
      attributes: {
        name: "Tomta Technology",
        token: "TT456789234231dfv2345",
        TIN: "10021",
        SST: "6",
        MSIC: "2321",
        tourismTax: "10",
        createdAt: "2023-12-27T07:30:46.259Z",
        updatedAt: "2023-12-27T07:51:33.552Z",
        publishedAt: "2023-12-27T07:51:33.543Z",
        identifier: "TTID01",
        companyID: "TT01",
      },
    },
    meta: {},
  };

  const buyerData = {
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
      },
    },
    meta: {},
  };
  const products = [
    {
      reqID: "1512",
      reqDate: "2023-12-25T17:15:00.000Z",
      name: "Product One",
      desc: "Please check again",
      quantity: "5",
      createdAt: "2023-12-27T00:15:00.000Z",
    },
    {
      reqID: "1512",
      reqDate: "2023-12-25T17:15:00.000Z",
      name: "Product Two",
      desc: "Please check again",
      quantity: "5",
      createdAt: "2023-12-27T00:15:00.000Z",
    },
    {
      reqID: "1512",
      reqDate: "2023-12-25T17:15:00.000Z",
      name: "Product Three",
      desc: "Please check again",
      quantity: "5",
      createdAt: "2023-12-27T00:15:00.000Z",
    },
  ];

  // Define a mapping of keys to custom labels
  const invoiceLabel = {
    reqID: "IRBM Unique Identifier Number",
    reqID: "e-Invoice Number",
    ReqDate: "e-Invoice Type",
    ReqDate: "Validation Date & Time",
    reqHeader: "Original e-Invoice Reference Number",
    ReqDate: "e-Invoice Version",
    reqBody: "Issuance Date & Time",
    reqParam: "Invoice Currency Code",
    reqUrl: "Currency Exchange Rate",
    rtnDate: "Frequency of Billing",
    rtnStatusCode: "Billing Period",
    rtnHeader: "Return Header",
    rtnBody: "Return Body",
    createdAt: "Issuer Digital Signature",
    updatedAt: "Created At",
    publishedAt: "Published At",
  };

  const supplierLabel = {
    name: "Name",
    token: "Tax Identification Number",
    TIN: "Legal ID",
    SST: "SST Registration Number",
    tourismTax: "Tourism Tax Registration Number",
    identifier: "Email",
    MSIC: "MSIC Code",
    companyID: "Business Activity Description",
    createdAt: "Address",
  };

  const buyerLabel = {
    reqID: "Name",
    ReqDate: "Tax Identification Number",
    reqHeader: "Legal ID",
    reqBody: "SST Registration Number",
    reqParam: "Email",
    reqUrl: "Address",
    rtnDate: "Contact Number",
  };

  const labelWidth = 280;

  const runDateFormatter = (dateTimeString) => {
    const formattedDateTime = moment(dateTimeString).format(
      "MMMM D, YYYY h:mm:ss A"
    );
    return formattedDateTime;
  };

  return (
    // <ThemeProvider theme={theme}>
    <PrivateLayout>
      <CssBaseline />
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography fontWeight="fontWeightMedium" variant="h5" mb={2}>
          Transaction Details
        </Typography>
        {/* <Divider my={5} /> */}
        <Typography fontWeight="fontWeightMedium" variant="h6" mb={2}>
          <Divider textAlign="center">
            <Chip label="Invoice Details" />
          </Divider>
        </Typography>
        <Grid container spacing={2} py={2}>
          {/* <pre>{(invoiceData?.data.attributes)}</pre> */}
          {Object.entries(invoiceData?.data.attributes).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key} display={"flex"}>
              <Typography
                variant="subtitle1"
                fontWeight="fontWeightBold"
                sx={{
                  "@media (max-width: 600px)": {
                    // Set minWidth for screens less than 600px wide
                    minWidth: "150",
                  },
                  "@media (min-width: 601px) and (max-width: 900px)": {
                    // Set minWidth for screens between 601px and 900px wide
                    minWidth: "100",
                  },
                  // Add more media queries as needed
                  // For larger screens, you can use the default labelWidth
                  minWidth: "50",
                }}
              >
                {invoiceLabel[key] || key}
              </Typography>

              <Typography variant="body1">
                :{" "}
                {typeof value === "string" && !isNaN(new Date(value))
                  ? runDateFormatter(value)
                  : value === ""
                  ? "-"
                  : value}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2} py={4}>
          {/* Supplier Data */}
          <Grid item xs={12} sm={6} display="flex">
            <Box>
              <Typography fontWeight="fontWeightMedium" variant="h6" mb={2}>
                <Divider textAlign="left">
                  <Chip label="Supplier Details" />
                </Divider>
              </Typography>
              {Object.entries(supplierData?.data.attributes).map(
                ([key, value]) => (
                  <Grid item xs={12} key={key} display="flex" pt={2}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="fontWeightBold"
                      sx={{ minWidth: labelWidth }}
                    >
                      {supplierLabel[key] || key}
                    </Typography>
                    <Typography variant="body1">
                      {typeof value === "string" && !isNaN(new Date(value))
                        ? runDateFormatter(value)
                        : value}
                    </Typography>
                  </Grid>
                )
              )}
            </Box>
          </Grid>

          {/* Buyer Data */}
          <Grid item xs={12} sm={6} display="flex">
            <Box>
              <Typography fontWeight="fontWeightMedium" variant="h6" mb={2}>
                <Divider textAlign="left">
                  <Chip label="Buyer Details" />
                </Divider>
              </Typography>
              {Object.entries(buyerData?.data.attributes).map(
                ([key, value]) => (
                  <Grid item xs={12} key={key} display="flex" pt={2}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="fontWeightBold"
                      sx={{ minWidth: labelWidth }}
                    >
                      {buyerLabel[key] || key}:
                    </Typography>
                    <Typography variant="body1">
                      :{" "}
                      {typeof value === "string" && !isNaN(new Date(value))
                        ? runDateFormatter(value)
                        : value}
                    </Typography>
                  </Grid>
                )
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Product Data */}
        <Typography fontWeight="fontWeightMedium" variant="h6" mb={2}>
          <Divider textAlign="center">
            <Chip label="Products Details" />
          </Divider>
        </Typography>
        <Grid container spacing={2} py={4}>
          {/* <List sx={{ width: "100%" }}> */}
          {Object.entries(products).map(([key, value]) => (
            // <React.Fragment>
            //   <ListItem alignItems="flex-start">
            //     <ListItemText
            //       primary={value.name}
            //       secondary={
            //         <React.Fragment>
            //           <Grid container spacing={2}>
            //             <Grid item xs={12} key={key} display="flex">
            //               <Box display="flex" alignItems="center">
            //                 <Typography
            //                   variant="subtitle1"
            //                   fontWeight="fontWeightMedium"
            //                   sx={{ minWidth: 150 }}
            //                 >
            //                   ID:
            //                 </Typography>
            //                 <Typography variant="">
            //                   {value.reqID}
            //                 </Typography>
            //               </Box>
            //             </Grid>

            //             <Grid item xs={12} key={key} display="flex">
            //               <Box display="flex" alignItems="center">
            //                 <Typography
            //                   variant="subtitle1"
            //                   fontWeight="fontWeightMedium"
            //                   sx={{ minWidth: 150 }}
            //                 >
            //                   Description:
            //                 </Typography>
            //                 <Typography>{value.desc}</Typography>
            //               </Box>
            //             </Grid>

            //             <Grid item xs={12} key={key} display="flex">
            //               <Box display="flex" alignItems="center">
            //                 <Typography
            //                   variant="subtitle1"
            //                   fontWeight="fontWeightMedium"
            //                   sx={{ minWidth: 150 }}
            //                 >
            //                   Request Date:
            //                 </Typography>
            //                 <Typography>
            //                   :{" "}
            //                   {typeof value.reqDate === "string" &&
            //                   !isNaN(new Date(value.reqDate))
            //                     ? runDateFormatter(value.reqDate)
            //                     : value.reqDate}
            //                 </Typography>
            //               </Box>
            //             </Grid>

            //             <Grid item xs={12} key={key} display="flex">
            //               <Box display="flex" alignItems="center">
            //                 <Typography
            //                   variant="subtitle1"
            //                   fontWeight="fontWeightMedium"
            //                   sx={{ minWidth: 150 }}
            //                 >
            //                   Quantity:
            //                 </Typography>
            //                 <Typography>
            //                   :{" "}
            //                   {typeof value.quantity === "string" &&
            //                   !isNaN(new Date(value.quantity))
            //                     ? runDateFormatter(value.quantity)
            //                     : value.quantity}
            //                 </Typography>
            //               </Box>
            //             </Grid>

            //             <Grid item xs={12} key={key} display="flex">
            //               <Box display="flex" alignItems="center">
            //                 <Typography
            //                   variant="subtitle1"
            //                   fontWeight="fontWeightMedium"
            //                   sx={{ minWidth: 150 }}
            //                 >
            //                   Created Date:
            //                 </Typography>
            //                 <Typography>
            //                   :{" "}
            //                   {typeof value.createdAt === "string" &&
            //                   !isNaN(new Date(value.createdAt))
            //                     ? runDateFormatter(value.createdAt)
            //                     : value.createdAt}
            //                 </Typography>
            //               </Box>
            //             </Grid>
            //           </Grid>
            //         </React.Fragment>
            //       }
            //     />
            //   </ListItem>
            //   <Divider component="li" />
            // </React.Fragment>
            <Grid item xs={12} key={key} display="flex" pt={2}>
              <Box key={key} mb={4}>
                <Typography
                  variant="h6"
                  fontWeight="fontWeightBold"
                  mb={2}
                  sx={{
                    textTransform: "uppercase",
                    textDecoration: "underline",
                  }}
                >
                  Product {value.reqID}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} key={key} display="flex">
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="fontWeightBold"
                        sx={{ minWidth: 150 }}
                      >
                        Name
                      </Typography>
                      <Typography variant="body1"> : {value.name}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} key={key} display="flex">
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="fontWeightBold"
                        sx={{ minWidth: 150 }}
                      >
                        Description
                      </Typography>
                      <Typography variant="body1"> : {value.desc}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} key={key} display="flex">
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="fontWeightBold"
                        sx={{ minWidth: 150 }}
                      >
                        Request Date
                      </Typography>
                      <Typography variant="body1">
                        :{" "}
                        {typeof value.reqDate === "string" &&
                        !isNaN(new Date(value.reqDate))
                          ? runDateFormatter(value.reqDate)
                          : value.reqDate}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} key={key} display="flex">
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="fontWeightBold"
                        sx={{ minWidth: 150 }}
                      >
                        Quantity
                      </Typography>
                      <Typography variant="body1">
                        :{" "}
                        {typeof value.quantity === "string" &&
                        !isNaN(new Date(value.quantity))
                          ? runDateFormatter(value.quantity)
                          : value.quantity}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} key={key} display="flex">
                    <Box display="flex" alignItems="center">
                      <Typography
                        variant="subtitle1"
                        fontWeight="fontWeightBold"
                        sx={{ minWidth: 150 }}
                      >
                        Created Date
                      </Typography>
                      <Typography variant="body1">
                        :{" "}
                        {typeof value.createdAt === "string" &&
                        !isNaN(new Date(value.createdAt))
                          ? runDateFormatter(value.createdAt)
                          : value.createdAt}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
          {/* </List> */}
        </Grid>
      </Paper>
    </PrivateLayout>
    // </ThemeProvider>
  );
}

export default DetailsInfo;
