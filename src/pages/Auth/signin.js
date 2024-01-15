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

export default function Signin() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleAccount = (property, event) => {
    const dataCopy = { ...data };
    dataCopy[property] = event.target.value;
    setData(dataCopy);
  };

  const handleSubmit = async () => {
    try {
      const result = await auth(data);
      setLoggedIn(true);
      navigate("/");
      return result;
    } catch (error) {
      // Handle the error if needed
      console.error("Authentication failed!", error);
    }
  };

  if (loggedIn) {
    <Navigate to="/" />;
  } else {
    <Navigate to="/signin" />;
  }

  return (
    <PublicLayout>
      <ThemeProvider theme={defaultTheme}>
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

            <Box sx={{ mt: 1 }}>
              <TextField
                onChange={(event) => handleAccount("identifier", event)}
                margin="normal"
                required
                fullWidth
                id="id"
                label="Login ID"
                name="id"
                autoFocus
              />
              <TextField
                onChange={(event) => handleAccount("password", event)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Sign In
              </Button>

              <Grid container sx={{ mt: 2 }}>
                <Grid item xs>
                  <Link href="/forgotPassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright />
        </Container>
      </ThemeProvider>
    </PublicLayout>
  );
}
