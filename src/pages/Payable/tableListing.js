import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Typography, styled } from "@mui/material";
import Box from "@mui/material/Box";
import ListingTable from "./listing";
import axios from "axios";
import DateFormatter from "helper/dateFormartter";
import BasicBreadcrumbs from "components/breadcrumb";
import SearchField from "components/searchField";
import ImportButton from "./importBtn";
import ExportBtn from "./exportBtn";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabListing({ getData, data }) {
  const status = [
    { name: "all" },
    { name: "failed" },
    { name: "rejected" },
    { name: "dispute" },
  ];
  const [value, setValue] = React.useState(0);
  const [dataList, setDataList] = React.useState([]);
  const dateFormatter = DateFormatter();
  // creating a new instance of the object
  const groupedByInvoiceAndCompany = new Map();

  const fetchDataAndUpdateList = async () => {
    try {
      const response = await axios.get(
        "/transactions?populate=company&filters[tranType][$eq]=AR",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );

      const data = response.data.data;
      // console.log("data", data);
      console.log("masuk");

      data.forEach((item) => {
        const key = `${item.attributes.eInvNum}`;
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
            buyID: item.attributes.buyId,
            buyerName: item.attributes.buyerName,
            buyEmail: item.attributes.buyEmail,
            buyPhone: item.attributes.buyPhone,
            buyTin: item.attributes.buyTin,
            buySst: item.attributes.buySst,
            createdAt: item.attributes.createdAt,
            updatedAt: item.attributes.updatedAt,
            publishedAt: item.attributes.publishedAt,
            products: [],
            company: item.attributes.company,
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

      setDataList(groupedInvoicesArray);
    } catch (error) {
      console.error("An error occurred:", error.response);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateList();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Root = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  }));

  return (
    <Box sx={{ width: "100%" }}>
      <BasicBreadcrumbs first="Receivable" second="Listing" />
      <Root>
        <SearchField />
        <Box display="flex" justifyContent="end">
          <ImportButton />
          <ExportBtn />
        </Box>
      </Root>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All" />
          <Tab label="Exception List" />
          <Tab label="IRB Exception " />
          <Tab label="Dispute " />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ListingTable data={dataList} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ListingTable data={dataList} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ListingTable data={dataList} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ListingTable data={dataList} />
      </CustomTabPanel>
    </Box>
  );
}
