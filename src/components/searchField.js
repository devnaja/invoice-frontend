import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.neutral.light,
  "&:hover": {
    backgroundColor: alpha(theme.palette.neutral.medium),
  },
  marginTop: "32px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: theme.spacing(1),
    width: "70%",
  },
  [theme.breakpoints.up("xl")]: {
    marginLeft: theme.spacing(1),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  // width: "50%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

const SearchField = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Box>
  );
};

// const SearchIconWrapper = ({ children }) => (
//   <Box
//     sx={{
//       padding: 1,
//       pointerEvents: "none",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     }}
//   >
//     {children}
//   </Box>
// );

// const StyledInputBase = ({ ...props }) => (
//   <InputBase
//     sx={{
//       width: "100%", // Set width to 100% by default
//       "@media (min-width: 600px)": {
//         width: "50%", // Set width to 50% on medium-sized screens
//       },
//     }}
//     {...props}
//   />
// );

export default SearchField;
