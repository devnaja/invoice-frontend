import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PublicLayout from "layouts/publicLayout";
import { auth } from "api/Auth/login";
import Copyright from "components/copyright";

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const handleAccount = (property, event) => {
    const dataCopy = { ...data };
    dataCopy[property] = event.target.value;
    setData(dataCopy);
  };

  const handleSubmit = async () => {
    try {
      alert("submit");

      //   navigate("/signin");
      //   return result;
    } catch (error) {
      // Handle the error if needed
      console.error("Authentication failed!", error);
    }
  };

  return (
    <PublicLayout>
      {/* <ThemeProvider theme={defaultTheme}> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography>
            Lost your password? Please enter your email address. You will
            receive a link to create a new password via email.
          </Typography>

          {/* <Box sx={{ mt: 1 }}> */}
          <TextField
            onChange={(event) => handleAccount("identifier", event)}
            margin="normal"
            required
            fullWidth
            variant="standard"
            id="email"
            label="Email"
            name="email"
            autoFocus
          />
          <Box display="flex" justifyContent="start" fullWidth>
            {" "}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Reset Password
            </Button>
          </Box>

          <Grid container sx={{ mt: 4 }}>
            <Grid item xs>
              Remember your password?{" "}
              <Link href="/signin" variant="body2">
                Click Here
              </Link>
            </Grid>
          </Grid>
          {/* </Box> */}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      {/* </ThemeProvider> */}
    </PublicLayout>
  );
}
