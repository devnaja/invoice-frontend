import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "pages/Homepage/charts";
import Deposits from "pages/Homepage/deposits";
import Orders from "pages/Homepage/orders";
import PrivateLayout from "layouts/privateLayout";
import Barchart from "./barchat";
import TransTypePie from "./pieChart";
import invType from "./invTypeChart";
import axios from "axios";
import StatusView from "./statusView";
import { blue, green, red, yellow } from "@mui/material/colors";
import { Typography } from "@mui/material";

export default function Homepage() {
  const [supplierArray, setSupplierArray] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [invType, setInvType] = useState([]);

  let supplierList = [];
  let amount = 0;
  let listType = [];

  const fetchDataList = async () => {
    let listType = [
      { name: "invoice", value: 0 },
      { name: "debitNote", value: 0 },
      { name: "creditNote", value: 0 },
      { name: "refund", value: 0 },
      { name: "others", value: 0 },
    ];
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

        if (item.attributes.eInvType === listType.name) {
        }
      });

      for (let transaction of data) {
        switch (transaction.attributes.eInvType) {
          case "Invoice":
            listType[0].value++;
            break;
          case "Debit Note":
            listType[1].value++;
            break;
          case "Credit Note":
            listType[2].value++;
            break;
          case "Refund":
            listType[3].value++;
            break;
          default:
            listType[4].value++;
            break;
        }
      }

      console.log("list", listType);
      // Convert the map back to an array of grouped objects
      setInvType(listType);
      setTotalAmount(amount);
      setSupplierArray(supplierList);
    } catch (error) {
      console.error("An error occurred:", error.response);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  // const user = React.useContext(useUser);
  // console.log("user", user);
  return (
    <PrivateLayout>
      {/* <Container sx={{ mt: 4, mb: 4 }}> */}
      <Typography mb={2} sx={{ fontSize: "26px", fontWeight: "bold" }}>
        Number of Transactions
      </Typography>
      <Grid container spacing={5}>
        {/* Number of transactions */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StatusView title="Success" total={120} bgcolor={green[500]} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StatusView title="Pending" total={12} bgcolor={yellow[600]} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StatusView title="Submitted" total={230} bgcolor={blue[500]} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StatusView title="Rejected" total={5} bgcolor={red[500]} />
          </Paper>
        </Grid>
      </Grid>

      <Typography mt={5} mb={2} sx={{ fontSize: "26px", fontWeight: "bold" }}>
        Total Amount Statisics
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
        {/* Recent Deposits */}
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
            <TransTypePie datas={invType} />
          </Paper>
        </Grid>
      </Grid>
      {/* </Container> */}
    </PrivateLayout>
  );
}
