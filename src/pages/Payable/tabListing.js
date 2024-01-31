import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material";
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function TabListing() {
  const status = [
    { name: "" },
    { name: "failed" },
    { name: "rejected" },
    { name: "dispute" },
  ];
  const [value, setValue] = React.useState(0);
  const [dataList, setDataList] = React.useState([]);
  const dateFormatter = DateFormatter();
  const groupedByInvoiceAndCompany = new Map();

  const fetchDataAndUpdateList = async (i) => {
    try {
      let filter = "";

      switch (i) {
        case 0:
          filter = `populate=*&filters[tranType][$eq]=AP`;
          break;
        case 1:
          filter = `populate=*&filters[tranType][$eq]=AP&filters[status][$eq]=${status[i].name}`;
          break;
        case 2:
          filter = `populate=*&filters[tranType][$eq]=AP&filters[status][$eq]=${status[i].name}`;
          break;
        case 3:
          filter = `populate=*&filters[tranType][$eq]=AP&filters[status][$eq]=${status[i].name}`;
          break;
      }

      const response = await axios.get(`/transactions?` + filter, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      const data = response.data.data;

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
            status: item.attributes.status,
            request: item.attributes.request_history.data,
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

      const groupedInvoicesArray = [...groupedByInvoiceAndCompany.values()];
      setDataList(groupedInvoicesArray);
    } catch (error) {
      console.error("An error occurred:", error.response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDataAndUpdateList(value);
    };

    fetchData();
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    fetchDataAndUpdateList(newValue);
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
