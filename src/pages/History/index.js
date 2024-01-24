import React, { useState, useEffect } from "react";
import axios from "axios";
import Listing from "./listing";
import { Box } from "@mui/material";
import PrivateLayout from "layouts/privateLayout";
import ListingTable from "./listing";
import BasicBreadcrumbs from "components/breadcrumb";
import SearchField from "components/searchField";
import DateFormatter from "helper/dateFormartter";

function History() {
  const [historyTransactions, setHistoryTransactions] = useState([]);
  // creating a new instance of the object
  const groupedByInvoiceAndCompany = new Map();
  const fetchDataAndUpdateList = async () => {
    try {
      const response = await axios.get(
        "/request-histories?populate=transaction",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );

      const data = response.data.data;
      console.log("data", data);

      setHistoryTransactions(data);
    } catch (error) {
      console.error("An error occurred:", error.response);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateList();
  }, []);

  return (
    <PrivateLayout>
      <ListingTable data={historyTransactions} />
    </PrivateLayout>
  );
}

export default History;
