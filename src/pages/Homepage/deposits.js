import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "components/title";
import moment from "moment";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({ data }) {
  let todayDate = moment().format("Do MMMM YYYY");
  // let requestDate = moment(todayDate);

  return (
    <React.Fragment>
      <Title>Recent Tax Amount</Title>
      <Typography component="p" variant="h4">
        RM {data}
      </Typography>

      <div>
        <Typography color="text.secondary" sx={{}}>
          {todayDate}
        </Typography>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link> */}
      </div>
    </React.Fragment>
  );
}
