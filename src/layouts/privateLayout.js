import React, { useEffect, useState } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Link,
  Typography,
  Divider,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import GradingIcon from "@mui/icons-material/Grading";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CustomTheme from "customTheme";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const PrivateLayout = ({ children }) => {
  const UserContext = React.createContext();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(!isMobile);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigation = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const loggedInID = localStorage.getItem("loggedInID");
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInID");
    navigation("/signin");
  };
  return (
    <ThemeProvider theme={CustomTheme}>
      <UserContext.Provider value={user}>
        <Box sx={{ display: "flex", overflow: "hidden" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {/* {this.props.useState.user} */}
                {user.username}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer} color="inherit">
                <ChevronLeftIcon sx={{ color: "contrastText" }} />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {/* {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}

              <ListItemButton component={Link} to="/">
                <ListItemIcon
                  sx={{ color: (theme) => theme.palette.primary.contrastText }}
                >
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton component={Link} to="/account-receivable">
                <ListItemIcon
                  sx={{ color: (theme) => theme.palette.primary.contrastText }}
                >
                  <GradingIcon />
                </ListItemIcon>
                <ListItemText primary="Account Receivable" />
              </ListItemButton>
              <ListItemButton component={Link} to="/account-payable">
                <ListItemIcon
                  sx={{ color: (theme) => theme.palette.primary.contrastText }}
                >
                  <GradingIcon />
                </ListItemIcon>
                <ListItemText primary="Account Payable" />
              </ListItemButton>
              <ListItemButton component={Link} to="/request-history">
                <ListItemIcon
                  sx={{ color: (theme) => theme.palette.primary.contrastText }}
                >
                  <GradingIcon />
                </ListItemIcon>
                <ListItemText primary="Request History" />
              </ListItemButton>
              <ListItemButton component={Link} to="/setting">
                <ListItemIcon
                  sx={{ color: (theme) => theme.palette.primary.contrastText }}
                >
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>

              <Divider />

              {localStorage.getItem("token") ? (
                <ListItemButton onClick={logout}>
                  <ListItemIcon
                    sx={{
                      color: (theme) => theme.palette.primary.contrastText,
                    }}
                  >
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              ) : null}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflowY: "scroll",
            }}
          >
            <Toolbar />
            <Box m={{ xs: 2, md: 5 }}>{children}</Box>
          </Box>
        </Box>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default PrivateLayout;
