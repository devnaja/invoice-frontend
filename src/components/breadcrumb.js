import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs({ first, second, third }) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {first && (
          <Link underline="hover" color="inherit" href="/">
            {first}
          </Link>
        )}
        {second && (
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            {second}
          </Link>
        )}
        {third && <Typography color="text.primary">{third}</Typography>}
      </Breadcrumbs>
    </div>
  );
}
