import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import CustomTheme from "./customTheme";
import { ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={CustomTheme}>
    <App />
  </ThemeProvider>
);
