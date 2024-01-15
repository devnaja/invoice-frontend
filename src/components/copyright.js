import React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      display="flex"
      justifyContent="center"
      sx={{ mt: 4 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Tomta Technology
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
