import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrivateLayout from "layouts/privateLayout";
import { useLocation } from "react-router-dom";
import DateFormatter from "helper/dateFormartter";
import ProductTable from "./productTable";
import RequestTable from "./requestTable";

const DetailItem = ({ label, value }) => (
  <Box display="flex" alignItems="center" mb={1}>
    <Typography
      variant="subtitle1"
      sx={{ minWidth: 200, fontWeight: "bold" }}
      width="180px"
    >
      {label}
    </Typography>
    <Typography variant="body1">: {value}</Typography>
  </Box>
);

export default function DetailsInfo() {
  const location = useLocation();

  const [data, setData] = useState({
    invoiceInfo: {},
    supplierInfo: {},
    productInfo: [],
    requestInfo: [],
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
    let requestInfo = [];

    if (dataRows.request) {
      requestInfo = [
        {
          tranId: dataRows.id,
          invNum: dataRows.eInvNum,
          id: dataRows.request.id,
          reqHeader: dataRows.request.attributes.reqHeader,
          reqBody: dataRows.request.attributes.reqBody,
          reqDate: dataRows.request.attributes.reqDate,
          reqParam: dataRows.request.attributes.reqParam,
          reqUrl: dataRows.request.attributes.reqUrl,
          rtnHeader: dataRows.request.attributes.rtnHeader,
          rtnBody: dataRows.request.attributes.rtnBody,
          rtnStatusCode: dataRows.request.attributes.rtnStatusCode,
          rtnDate: dataRows.request.attributes.rtnDate,
          createdAt: dataRows.request.attributes.createdAt,
          publishedAt: dataRows.request.attributes.publishedAt,
          updatedAt: dataRows.request.attributes.updatedAt,
        },
      ];
    } else {
      requestInfo = [];
    }

    setData({
      invoiceInfo,
      supplierInfo,
      productInfo,
      requestInfo,
      buyerInfo,
    });
  };

  useEffect(() => {
    const { dataRows } = location.state;
    structredList(dataRows);
  }, []);

  return (
    <PrivateLayout>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            textTransform="uppercase"
            sx={{ textDecoration: "underline" }}
          >
            Invoice Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            textTransform="uppercase"
            sx={{ textDecoration: "underline" }}
          >
            Supplier & Buyer Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
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
                {/* <Typography fontWeight="fontWeightMedium" variant="h6" mb={2}>
                  <Divider textAlign="center">
                    <Chip label="Supplier" />
                  </Divider>
                </Typography> */}

                <Grid item xs={12}>
                  <DetailItem
                    label="Supplier Name"
                    value={data.supplierInfo.name}
                  />
                  <DetailItem
                    label="Supplier Email"
                    value={data.supplierInfo.email}
                  />
                  <DetailItem
                    label="Supplier Phone Number"
                    value={data.supplierInfo.phone}
                  />
                  <DetailItem
                    label="Supplier Account Number"
                    value={data.supplierInfo.accNum}
                  />
                  <DetailItem
                    label="Supplier Tax Identification Number"
                    value={data.supplierInfo.tin}
                  />
                  <DetailItem
                    label="Supplier SST Number"
                    value={data.supplierInfo.sstNum}
                  />
                  <DetailItem
                    label=" Supplier Tourism Tax Number"
                    value={data.supplierInfo.tourismTaxNum}
                  />
                  <DetailItem
                    label="Supplier MSIC Number"
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
                {/* <Typography fontWeight="fontWeightMedium" variant="h6" mb={2}>
                  <Divider textAlign="center">
                    <Chip label="Buyer" />
                  </Divider>
                </Typography> */}
                <Grid item xs={12}>
                  {/* <DetailItem label="Buyer ID" value={data.buyerInfo.id} /> */}
                  <DetailItem label="Buyer Name" value={data.buyerInfo.name} />
                  <DetailItem
                    label="Buyer Email"
                    value={data.buyerInfo.email}
                  />
                  <DetailItem
                    label="Buyer Phone Number"
                    value={data.buyerInfo.phone}
                  />

                  <DetailItem
                    label="Buyer Tax Identification Number"
                    value={data.buyerInfo.tin}
                  />
                  <DetailItem
                    label="Buyer SST Number"
                    value={data.buyerInfo.sstNum}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            textTransform="uppercase"
            sx={{ textDecoration: "underline" }}
          >
            Products Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProductTable rows={data.productInfo} />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography
            variant="h6"
            textTransform="uppercase"
            fontWeight="bold"
            sx={{ textDecoration: "underline" }}
          >
            Request Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RequestTable rows={data.requestInfo} />
        </AccordionDetails>
      </Accordion>
    </PrivateLayout>
  );
}
