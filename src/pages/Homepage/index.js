import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "pages/Homepage/charts";
import Deposits from "pages/Homepage/deposits";
import PrivateLayout from "layouts/privateLayout";
import TransTypePie from "./pieChart";
import axios from "axios";
import StatusView from "./statusView";
import { blue, orange, red, yellow } from "@mui/material/colors";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SimCardAlertIcon from "@mui/icons-material/SimCardAlert";
import WarningIcon from "@mui/icons-material/Warning";
import RestorePageIcon from "@mui/icons-material/RestorePage";

export default function Homepage() {
  const [supplierArray, setSupplierArray] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [statusType, setStatusType] = useState([
    { name: "pending", value: 0 },
    { name: "failed", value: 0 },
    { name: "rejected", value: 0 },
    { name: "dispute", value: 0 },
    { name: "others", value: 0 },
  ]);
  const [filterSelected, setFilterSelected] = React.useState("");

  const handleChange = (event) => {
    setFilterSelected(event.target.value);
  };

  let supplierList = [];
  let amount = 0;

  const fetchDataList = async () => {
    try {
      const response = await axios.get("/transactions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });

      const data = response.data.data;

      data.forEach((item) => {
        supplierList.push({
          name: item.attributes.supplierName,
          amount: item.attributes.prodTotalInclTax,
        });
        amount = amount + item.attributes.prodTotalInclTax;
      });

      for (let transaction of data) {
        switch (transaction.attributes.status) {
          case "pending":
            statusType[0].value++;
            break;
          case "failed":
            statusType[1].value++;
            break;
          case "rejected":
            statusType[2].value++;
            break;
          case "dispute":
            statusType[3].value++;
            break;
          default:
            statusType[4].value++;
            break;
        }
      }

      // Convert the map back to an array of grouped objects
      setStatusType(statusType);
      setTotalAmount(amount);
      setSupplierArray(supplierList);
    } catch (error) {
      console.error("An error occurred:", error.response);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  return (
    <PrivateLayout>
      <Box display="flex" justifyContent="space-between">
        <Typography mb={2} sx={{ fontSize: "26px", fontWeight: "bold" }}>
          Number of Transactions
        </Typography>

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            value={filterSelected}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={{ xs: 1, md: 2, lg: 5 }}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StatusView
              title="Total Pending"
              total={statusType[0].value}
              icon={<PendingActionsIcon />}
              bgColor={yellow[700]}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StatusView
              title="Total Failed"
              total={statusType[1].value}
              icon={<SimCardAlertIcon />}
              bgColor={orange[800]}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StatusView
              title="Total Rejected"
              total={statusType[2].value}
              icon={<WarningIcon />}
              bgColor={red[900]}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StatusView
              title="Total Dispute"
              total={statusType[3].value}
              icon={<RestorePageIcon />}
              bgColor={blue[900]}
            />
          </Paper>
        </Grid>
      </Grid>

      <Typography mt={5} mb={2} sx={{ fontSize: "26px", fontWeight: "bold" }}>
        Total Amount Statistics
      </Typography>
      <Grid container spacing={5}>
        {/* Chart */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 300,
            }}
          >
            <Chart data={supplierArray} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={5}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <Deposits data={totalAmount} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <TransTypePie datas={statusType} />
          </Paper>
        </Grid>
      </Grid>
    </PrivateLayout>
  );
}
