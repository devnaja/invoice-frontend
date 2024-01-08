import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#184478",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF4081",
    },
    neutral: {
      light: grey[50],
      medium: grey[200],
      normal: grey[700],
      main: grey[900],
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  // Add more customizations as needed
});

export default theme;
