import React from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { Box, Button } from "@mui/material";

const ExportBtn = () => {
  const csvData = [
    [
      "id",
      "Transaction Type",
      "Supplier Name",
      "Supplier ID",
      "Supplier Email",
      "Supplier Phone Number",
      "Supplier Bank Account",
      "Supplier TIN",
      "Supplier SST Number",
      "Supplier Tourism Tax",
      "Supplier MSIC",
      "Supplier Digital Sign",
      "Supplier Address",
      "Supplier Business Description",
      "Buyer Name",
      "Buyer Tax Idenfication Number",
      "Buyer ID",
      "Buyer SST Number",
      "Buyer Email",
      "Buyer Phone Number",
      "Buyer Address",
      "e-invoice Type",
      "e-invoce Version",
      "e-invoice Number",
      "e-invoice Ref Number",
      "e-invoice Date",
      "Currency Exchange Rate",
      "Currency Code",
      "Validate Date",
      "Bill Frequency",
      "Product Classification",
      "IRBM Unique ID",
      "Product Unit Price",
      "Product Description",
      "Product Tax Type",
      "Product Tax Rate",
      "Product Tax Amount",
      "Product Tax Exemption Description",
      "Product Tax Exemption Amount",
      "Product Subtotal",
      "Product Total Exclude Tax",
      "Product Total Include Tax",
      "Product Quantity",
      "Product Measure",
      "Product Discount Rate",
      "Product Discount Amount",
      "Pay Mode",
      "Pay Amount",
      "Pay Term",
      "Bill Period",
      "Pay Date",
      "Pay Ref Number",
      "Bill Ref Number",
    ],
  ];

  return (
    <Box m={{ xs: 1, md: 2 }} sx={{ display: "flex", alignItems: "end" }}>
      <CSVLink data={csvData} filename={"template.csv"}>
        <Button variant="contained">Download Template</Button>
      </CSVLink>
    </Box>
  );
};

export default ExportBtn;
