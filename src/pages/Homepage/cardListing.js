import { Container, Grid } from "@mui/material";
import { OverviewBudget } from "components/overview/overview-budget";
import { OverviewTasksProgress } from "components/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "components/overview/overview-total-customers";
import { OverviewTotalProfit } from "components/overview/overview-total-profit";
import React from "react";

const CardListing = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} lg={3}>
          <OverviewBudget
            difference={12}
            positive
            sx={{ height: "100%" }}
            value="$24k"
          />
        </Grid>
        <Grid xs={12} sm={6} lg={3}>
          <OverviewTotalCustomers
            difference={16}
            positive={false}
            sx={{ height: "100%" }}
            value="1.6k"
          />
        </Grid>
        <Grid xs={12} sm={6} lg={3}>
          <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
        </Grid>
        <Grid xs={12} sm={6} lg={3}>
          <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CardListing;
