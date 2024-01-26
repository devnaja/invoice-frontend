import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import CustomTheme from "./customTheme";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { ToastContainer } from "react-toastify";

// set main base url
axios.defaults.baseURL = "http://localhost:1337/api";
// Bearer Token
// axios.defaults.headers.common[`Authorization`] =
//   "Bearer " + localStorage.getItem("token");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={CustomTheme}>
    <App />
    <ToastContainer />
  </ThemeProvider>
);
