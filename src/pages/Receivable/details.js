import React, { useState, useEffect } from "react";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  Box,
  CssBaseline,
  Chip,
} from "@mui/material";
import PrivateLayout from "layouts/privateLayout";
import { useLocation } from "react-router-dom";
import DateFormatter from "helper/dateFormartter";
import ProductTable from "./productTable";
import BasicBreadcrumbs from "components/breadcrumb";

const DetailItem = ({ label, value }) => (
  <Box display="flex" alignItems="center" mb={1}>
    <Typography variant="subtitle1" sx={{ minWidth: 200, fontWeight: "bold" }}>
      {label}
    </Typography>
    <Typography variant="body1">: {value}</Typography>
  </Box>
);

const DetailsInfoPayable = () => {
  const location = useLocation();

  const labelWidth = 280;

  const [data, setData] = useState({
    invoiceInfo: {},
    supplierInfo: {},
    productInfo: [],
    buyerInfo: {},
  });

  const dateFormatter = DateFormatter();
  const structredList = async (data) => {
    const dataRows = data.row;
    const invoiceInfo = {
      id: dataRows.id,
      type: dataRows.eInvType,
      number: dataRows.eInvNum,
      oriRefNumber: dataRows.eInvRefNum,
      issuanceDate: dateFormatter.format(dataRows.eInvDate),
      currencyCode: dataRows.currCode,
      exchangeRate: dataRows.currExRate,
      billFreq: dataRows.billFreq,
      billPeriod: dataRows.billPeriod,
      irbm: dataRows.irbmUniqueID,
      validationDate: dateFormatter.format(dataRows.validateDate),
      version: dataRows.eInvVer,
      signature: dataRows.supDigitalSign,
    };

    const supplierInfo = {
      id: dataRows.supID,
      name: dataRows.supplierName,
      email: dataRows.supEmail,
      phone: dataRows.supPhone,
      accNum: dataRows.supBankAcctNum,
      tin: dataRows.supTin,
      sstNum: dataRows.supSst,
      tourismTaxNum: dataRows.supTourismTax,
      msicNum: dataRows.supMsic,
    };

    const buyerInfo = {
      id: dataRows.buyID,
      name: dataRows.buyerName,
      email: dataRows.buyEmail,
      phone: dataRows.buyPhone,
      tin: dataRows.buyTin,
      sstNum: dataRows.buySst,
    };

    const productInfo = dataRows.products;

    setData({
      invoiceInfo,
      supplierInfo,
      productInfo,
      buyerInfo,
    });
  };

  useEffect(() => {
    const { dataRows } = location.state;
    structredList(dataRows);
  }, []);

  return (
    <PrivateLayout>
      <BasicBreadcrumbs first="Receivable" second="Details" />

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
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <DetailItem
                  label="E-Invoice Number"
                  value={data.invoiceInfo.number}
                />
                <DetailItem
                  label="Invoice Type"
                  value={data.invoiceInfo.type}
                />
                <DetailItem
                  label="E-Invoice Ref. Number"
                  value={data.invoiceInfo.oriRefNumber}
                />
                <DetailItem
                  label="Issuance Date & Time"
                  value={data.invoiceInfo.issuanceDate}
                />
                <DetailItem
                  label="Invoice Currency Code"
                  value={data.invoiceInfo.currencyCode}
                />
                <DetailItem
                  label="Currency Exchange Rate"
                  value={data.invoiceInfo.exchangeRate}
                />
                <DetailItem
                  label="Frequency of Billing"
                  value={data.invoiceInfo.billFreq}
                />
                <DetailItem
                  label="Billing Period"
                  value={data.invoiceInfo.billPeriod}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DetailItem
                  label="IRBM Unique Identifier Number"
                  value={data.invoiceInfo.irbm}
                />
                <DetailItem
                  label="Validation Date & Time"
                  value={data.invoiceInfo.validationDate}
                />
                <DetailItem
                  label="E Invoice Version"
                  value={data.invoiceInfo.version}
                />
                <DetailItem
                  label="Issuer Digital Signature"
                  value={data.invoiceInfo.signature}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider />
        <Grid container spacing={2} py={2}>
          <Grid
            item
            mt={2}
            xs={12}
            md={6}
            display="flex"
            justifyContent="space-between"
          >
            {/* Suplier */}
            <Grid container spacing={2}>
              <Typography fontWeight="fontWeightMedium" variant="h6" mb={2}>
                <Divider textAlign="center">
                  <Chip label="Supplier Details" />
                </Divider>
              </Typography>

              <Grid item xs={12}>
                <DetailItem label="Name" value={data.supplierInfo.name} />
                <DetailItem label="Email" value={data.supplierInfo.email} />
                <DetailItem
                  label="Phone Number"
                  value={data.supplierInfo.phone}
                />
                <DetailItem
                  label="Account Number"
                  value={data.supplierInfo.accNum}
                />
                <DetailItem
                  label="Tax Identification Number"
                  value={data.supplierInfo.tin}
                />
                <DetailItem
                  label="SST Number"
                  value={data.supplierInfo.sstNum}
                />
                <DetailItem
                  label="Tourism Tax Number"
                  value={data.supplierInfo.tourismTaxNum}
                />
                <DetailItem
                  label="MSIC Number"
                  value={data.supplierInfo.msicNum}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Buyer */}

          <Grid
            item
            mt={2}
            xs={12}
            md={6}
            display="flex"
            justifyContent="space-between"
          >
            <Grid container spacing={2}>
              <Typography fontWeight="fontWeightMedium" variant="h6" mb={2}>
                <Divider textAlign="center">
                  <Chip label="Buyer Details" />
                </Divider>
              </Typography>
              <Grid item xs={12}>
                <DetailItem label="ID" value={data.buyerInfo.id} />
                <DetailItem label="Name" value={data.buyerInfo.name} />
                <DetailItem label="Email" value={data.buyerInfo.email} />
                <DetailItem label="Phone Number" value={data.buyerInfo.phone} />

                <DetailItem
                  label="Tax Identification Number"
                  value={data.buyerInfo.tin}
                />
                <DetailItem label="SST Number" value={data.buyerInfo.sstNum} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography fontWeight="fontWeightMedium" variant="h6" mb={2}>
          <Divider textAlign="center">
            <Chip label="Products Details" />
          </Divider>
        </Typography>
        <ProductTable rows={data.productInfo} />

        <Typography fontWeight="fontWeightMedium" variant="h6" mt={4} mb={2}>
          <Divider textAlign="center">
            <Chip label="Request Details" />
          </Divider>
        </Typography>
      </Paper>
    </PrivateLayout>
  );
};

export default DetailsInfoPayable;
