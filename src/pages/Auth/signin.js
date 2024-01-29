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
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "api/Auth/login";
import Copyright from "components/copyright";
import { toast } from "react-toastify";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PublicLayout from "layouts/publicLayout";

const defaultTheme = createTheme();

export default function Signin() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleAccount = (property, event) => {
    const dataCopy = { ...data };
    dataCopy[property] = event.target.value;
    setData(dataCopy);
  };

  const handleSubmit = async () => {
    try {
      const result = await auth(data);
      setLoggedIn(true);
      navigate("/invoice-frontend");
      return result;
    } catch (error) {
      // Handle the error if needed
      // let errorList = error.response.data.error.details.errors;
      // console.error("An error occurred:", errorList);
      // if (errorList.length > 0) {
      //   for (const list of errorList) {
      //     toast.error(list.message + " " + list.path[0], {
      //       position: "top-right",
      //       autoClose: 3000,
      //     });
      //   }
      // }
    }
  };

  if (loggedIn) {
    <Navigate to="/invoice-frontend" />;
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
              marginTop: 10,
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
              {/* <TextField
                onChange={(event) => handleAccount("password", event)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              /> */}

              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => handleAccount("password", event)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                sx={{
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              /> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
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
