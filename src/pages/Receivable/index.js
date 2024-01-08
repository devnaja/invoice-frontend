import React from "react";
import Listing from "./listing";
import { Box } from "@mui/material";
import PrivateLayout from "layouts/privateLayout";
import ListingTable from "components/table";
import ListingAccount from "./listing";
import BasicBreadcrumbs from "components/breadcrumb";
import SearchField from "components/searchField";
import ImportButton from "./importBtn";

function Receivable() {
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

      <ListingTable />
      {/* <ListingAccount /> */}
    </PrivateLayout>
  );
}

export default Receivable;
