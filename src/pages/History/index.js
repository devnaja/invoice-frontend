import React, { useState, useEffect } from "react";
import axios from "axios";
import PrivateLayout from "layouts/privateLayout";
import ListingTable from "./listing";

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
