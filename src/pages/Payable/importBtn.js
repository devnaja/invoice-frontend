import { Box, Button } from "@mui/material";
import React from "react";

function ImportButton() {
  return (
    <Box sx={{ display: "flex", alignItems: "end" }}>
      <Button variant="contained">Import Here</Button>
    </Box>
  );
}

export default ImportButton;
