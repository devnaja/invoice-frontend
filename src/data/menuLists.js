import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "@mui/material";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/invoice-frontend">
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
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Account Receivable" />
    </ListItemButton>
    <ListItemButton component={Link} to="/account-payable">
      <ListItemIcon
        sx={{ color: (theme) => theme.palette.primary.contrastText }}
      >
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Account Payable" />
    </ListItemButton>
    <ListItemButton component={Link} to="/setting">
      <ListItemIcon
        sx={{ color: (theme) => theme.palette.primary.contrastText }}
      >
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <ListItemButton>
    <ListItemIcon sx={{ color: (theme) => theme.palette.primary.contrastText }}>
      <ExitToAppIcon />
    </ListItemIcon>
    <ListItemText primary="Logout" />
  </ListItemButton>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
// <ListItemButton>
//   <ListItemIcon>
//     <AssignmentIcon />
//   </ListItemIcon>
//   <ListItemText primary="Current month" />
// </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );
