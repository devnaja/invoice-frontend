import React, { useState, useEffect } from "react";
import axios from "axios";
import Listing from "./listing";
import { Box } from "@mui/material";
import PrivateLayout from "layouts/privateLayout";
import ListingTable from "./listing";
import BasicBreadcrumbs from "components/breadcrumb";
import SearchField from "components/searchField";
import ImportButton from "./importBtn";
import DateFormatter from "helper/dateFormartter";

function Receivable() {
  const [receivableTransactions, setReceivableTransactions] = useState([]);
  const dateFormatter = DateFormatter();
  // creating a new instance of the object
  const groupedByInvoiceAndCompany = new Map();
  const fetchDataAndUpdateList = async () => {
    try {
      const response = await axios.get(
        "/transactions?filters[tranType][$eq]=AR",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );

      const data = response.data.data;

      data.forEach((item) => {
        const key = `${item.attributes.eInvNum}`;
        // check the object has a specified key or not.
        if (!groupedByInvoiceAndCompany.has(key)) {
          groupedByInvoiceAndCompany.set(key, {
            id: item.id,
            eInvType: item.attributes.eInvType,
            eInvNum: item.attributes.eInvNum,
            eInvRefNum: item.attributes.eInvRefNum,
            issuanceDate: item.attributes.eInvDate,
            currCode: item.attributes.currCode,
            currExRate: item.attributes.currExRate,
            billFreq: item.attributes.billFreq,
            billPeriod: item.attributes.billPeriod,
            irbmUniqueID: item.attributes.irbmUniqueID,
            validateDate: item.attributes.validateDate,
            eInvVer: item.attributes.eInvVer,
            supDigitalSign: item.attributes.supDigitalSign,
            supID: item.attributes.supID,
            supplierName: item.attributes.supplierName,
            supEmail: item.attributes.supEmail,
            supPhone: item.attributes.supPhone,
            supBankAcctNum: item.attributes.supBankAcctNum,
            supTin: item.attributes.supTin,
            supSst: item.attributes.supSst,
            supTourismTax: item.attributes.supTourismTax,
            supMsic: item.attributes.supMsic,
            buyID: item.attributes.buyID,
            buyerName: item.attributes.buyerName,
            buyEmail: item.attributes.buyEmail,
            buyPhone: item.attributes.buyPhone,
            buyTin: item.attributes.buyTin,
            buySst: item.attributes.buySst,
            createdAt: item.attributes.createdAt,
            updatedAt: item.attributes.updatedAt,
            publishedAt: item.attributes.publishedAt,
            products: [],
          });
        }
        groupedByInvoiceAndCompany.get(key).products.push({
          class: item.attributes.prodClass,
          unitPrice: item.attributes.prodUnitPrice,
          desc: item.attributes.prodDesc,
          taxType: item.attributes.prodTaxType,
          taxRate: item.attributes.prodTaxRate,
          taxAmt: item.attributes.prodTaxAmt,
          taxExemptDesc: item.attributes.prodTaxExemptDesc,
          taxExemptAmt: item.attributes.prodTaxExemptAmt,
          subtotal: item.attributes.prodSubtotal,
          totalExclTax: item.attributes.prodTotalExclTax,
          totalInclTax: item.attributes.prodTotalInclTax,
          quantity: item.attributes.prodQty,
          measure: item.attributes.prodMeasure,
          discRate: item.attributes.prodDiscRate,
          discAmt: item.attributes.prodDiscAmt,
          payMode: item.attributes.payMode,
          payTerm: item.attributes.payTerm,
          payAmt: item.attributes.payAmt,
          payDate: dateFormatter.format(item.attributes.payDate),
          payRefNum: item.attributes.payRefNum,
          billRefNum: item.attributes.billRefNum,
        });
      });

      // Convert the map back to an array of grouped objects
      const groupedInvoicesArray = [...groupedByInvoiceAndCompany.values()];

      setReceivableTransactions(groupedInvoicesArray);
    } catch (error) {
      console.error("An error occurred:", error.response);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateList();
  }, []);

  return (
    <PrivateLayout>
      {/* <Listing /> */}
      <BasicBreadcrumbs />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <SearchField />
        <ImportButton />
      </Box>

      <ListingTable data={receivableTransactions} />
    </PrivateLayout>
  );
}

export default Receivable;
