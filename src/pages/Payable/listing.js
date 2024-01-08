import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import PrivateLayout from "layouts/privateLayout";
import SearchBar from "./searchbar";
import { fetchdata } from "../../api/fetchData";
import ImportButton from "./importBtn";
import PaginationComponent from "components/pagination";
import BasicBreadcrumbs from "components/breadcrumb";

function Listing() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const lists = {
    data: [
      {
        id: 1,
        attributes: {
          name: "Tomta Technology",
          token: "TT456789234231dfv2345",
          TIN: "10021",
          SST: "6",
          MSIC: "2321",
          tourismTax: "10",
          createdAt: "2023-12-27T07:30:46.259Z",
          updatedAt: "2023-12-27T07:51:33.552Z",
          publishedAt: "2023-12-27T07:51:33.543Z",
          identifier: "TTID01",
          companyID: "TT01",
        },
      },
      {
        id: 2,
        attributes: {
          name: "Gosum Consulting",
          token: "GS54353523452324342",
          TIN: "AA6457454",
          SST: "6",
          MSIC: "5435",
          tourismTax: "10",
          createdAt: "2023-12-27T07:55:56.667Z",
          updatedAt: "2023-12-27T08:45:50.935Z",
          publishedAt: "2023-12-27T08:45:50.925Z",
          identifier: "GSID001",
          companyID: "GS01",
        },
      },
      {
        id: 3,
        attributes: {
          name: "Tealive",
          token: "TL567890vbnm2345678",
          TIN: "AA234567",
          SST: "8",
          MSIC: "3456",
          tourismTax: "15",
          createdAt: "2023-12-27T08:11:30.414Z",
          updatedAt: "2023-12-27T08:11:31.392Z",
          publishedAt: "2023-12-27T08:11:31.382Z",
          identifier: "Qwertyu",
          companyID: "TL001",
        },
      },
      {
        id: 4,
        attributes: {
          name: "Inside Scoop",
          token: "IS1234564321dfgv21",
          TIN: "AA98765432",
          SST: "5",
          MSIC: "4878",
          tourismTax: "5",
          createdAt: "2023-12-27T08:56:13.373Z",
          updatedAt: "2023-12-27T08:56:15.098Z",
          publishedAt: "2023-12-27T08:56:15.091Z",
          identifier: "094909322",
          companyID: "IS001",
        },
      },
      {
        id: 6,
        attributes: {
          name: "Montigo Sdn Bhd",
          token: "4537829044",
          TIN: "AA64392749",
          SST: "6",
          MSIC: "MT5238432",
          tourismTax: "10",
          createdAt: "2023-12-28T07:37:48.354Z",
          updatedAt: "2023-12-28T07:37:48.354Z",
          publishedAt: "2023-12-28T07:37:48.346Z",
          identifier: null,
          companyID: null,
        },
      },
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 1,
        total: 5,
      },
    },
  };

  const arrayList = lists.data;
  const paginationList = lists.meta;
  //   const [lists, setList] = useState([]);

  const handleDataFromChild = (data) => {
    console.log("data", data);
    //   setDataFromChild(data);
  };

  //   useEffect(() => {
  //     const fetchDataAndUpdateList = async () => {
  //       try {
  //         const result = await fetchdata();
  //         console.log("result", result);
  //         setList(result);
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchDataAndUpdateList();
  //   }, []);
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    console.log("order", order);
    console.log("orderby", orderBy);
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    // console.log(stabilizedThis);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[1], b[1]);
      //   if (order !== 0) {
      //     return order;
      //   }
      //   return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const visibleRows = React.useMemo(
    () =>
      stableSort(arrayList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <SearchBar onDataFromChild={handleDataFromChild} />
        <ImportButton />
      </Box>
      <BasicBreadcrumbs />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>MSIC</TableCell>
              <TableCell>Created At</TableCell>
              {/* <TableCell>Company ID</TableCell> */}
            </TableRow>
          </TableHead>
          {/* {lists.data} */}
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              {
                arrayList.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        inputProps={{
                          "aria-label": "select all desserts",
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.attributes.companyID}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.attributes.name}
                    </TableCell>
                    <TableCell>{row.attributes.token}</TableCell>
                    <TableCell>{row.attributes.MSIC}</TableCell>
                    <TableCell>{row.attributes.createdAt}</TableCell>
                    {/* <TableCell>{row.attributes.companyID}</TableCell> */}
                  </TableRow>
                ));
              }
            })}
          </TableBody>
        </Table>
        <PaginationComponent data={paginationList} />
      </TableContainer>
    </Box>
  );
}

export default Listing;
