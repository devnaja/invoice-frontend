import React from "react";
import Listing from "./listing";
import { Box } from "@mui/material";
import PrivateLayout from "layouts/privateLayout";
import ListingTable from "components/table";
import BasicBreadcrumbs from "components/breadcrumb";
import SearchField from "components/searchField";
import ImportButton from "./importBtn";

function Payable() {
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
    </PrivateLayout>
  );
}

export default Payable;
