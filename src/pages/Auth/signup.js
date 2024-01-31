import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PublicLayout from "layouts/publicLayout";
import Copyright from "components/copyright";
import emailjs from "@emailjs/browser";
import { Divider } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const service_id = process.env.REACT_APP_EMAIL_SERVICE_ID;
  const template_id = process.env.REACT_APP_EMAIL_TEMPLATE_ID;
  const public_key = process.env.REACT_APP_EMAIL_PUBLIC_KEY;

  const [data, setData] = React.useState({
    companyName: "",
    identifier: "",
    parentCompanyName: "",
    tourismTaxNumber: "",
    sstNumber: "",
    msicCode: "",
    tin: "",
    username: "",
    password: "",
    userEmail: "",
  });

  const handleChange = (property, event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const response = emailjs.send(service_id, template_id, data, public_key);

    toast.promise(response, {
      pending: {
        render() {
          return "Please wait...";
        },
        icon: true,
      },
      success: {
        render({ data }) {
          navigate("/signin");
          return "Your registration will be procees within 3 days of working day.";
        },
        icon: "🟢",
      },
      error: {
        render({ data }) {
          return "error";
        },
      },
    });
  };

  return (
    <PublicLayout>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(event) => handleChange("companyName", event)}
                    name="companyName"
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(event) => handleChange("identifier", event)}
                    required
                    fullWidth
                    id="identifier"
                    label="Identifier"
                    name="identifier"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(event) =>
                      handleChange("parentCompanyName", event)
                    }
                    required
                    fullWidth
                    name="parentCompanyName"
                    label="Parent Company Name"
                    id="parentCompanyName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(event) =>
                      handleChange("tourismTaxNumber", event)
                    }
                    required
                    fullWidth
                    name="tourismTaxNumber"
                    label="Tourism Tax Number"
                    id="tourismTaxNumber"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(event) => handleChange("sstNumber", event)}
                    required
                    fullWidth
                    name="sstNumber"
                    label="SST Number"
                    id="sstNumber"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(event) => handleChange("msicCode", event)}
                    required
                    fullWidth
                    name="msicCode"
                    label="MSIC Code"
                    id="msicCode"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(event) => handleChange("tin", event)}
                    required
                    fullWidth
                    name="tin"
                    label="Tax Identification Number"
                    id="tin"
                  />
                </Grid>
                <Divider />
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(event) => handleChange("username", event)}
                    required
                    fullWidth
                    name="username"
                    label="User Name"
                    id="username"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(event) => handleChange("password", event)}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={(event) => handleChange("userEmail", event)}
                    required
                    fullWidth
                    name="userEmail"
                    label="User Email"
                    id="userEmail"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </PublicLayout>
  );
}
