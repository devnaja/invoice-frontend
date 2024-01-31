import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Typography,
  Paper,
  Checkbox,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Skeleton, Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import DateFormatter from "helper/dateFormartter";
import { toast } from "react-toastify";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IosShareIcon from "@mui/icons-material/IosShare";

// let rows;

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Company Name",
  },
  {
    id: "eInvNum",
    numeric: false,
    disablePadding: true,
    label: "Invoice Number",
  },
  {
    id: "buyerName",
    numeric: false,
    disablePadding: true,
    label: "Buyer Name",
  },
  {
    id: "buyEmail",
    numeric: false,
    disablePadding: true,
    label: "Buyer Email",
  },
  {
    id: "eInvType",
    numeric: true,
    disablePadding: false,
    label: "Invoice Type",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "createdAt",
    numeric: true,
    disablePadding: false,
    label: "Submitted At",
  },

  {
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell, i) => (
          <TableCell
            key={i}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Listing
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ListingTable({ data }) {
  const navigate = useNavigate();
  const dateFormatter = DateFormatter();
  let rows = data;
  let visibleRows = data;

  // const [visibleRows, setVisibleRows] = React.useState(data);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  let todayDate = new Date();

  // Format the Date object as needed
  let requestDate = moment(todayDate)
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  // const [valueofRow, setValueOfRow] = React.useState();

  let rtnDate = moment()
    .add(1, "days")
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const handleClickSet = async (value) => {
    const body = {
      supplierName: value.supplierName,
      buyerName: value.buyerName,
      invNum: value.eInvNum,
    };

    let reqtBody = {
      reqDate: requestDate,
      reqHeader: "Request for " + value.eInvType,
      reqBody:
        value.supplierName + " with tax identification number " + value.supTin,
      reqParam: "",
      reqUrl: `/request-history/${value.id}`,
      rtnDate: rtnDate,
      rtnHeader: "Result from IRBM",
      rtnBody: "Success request",
      rtnStatusCode: "success",
      transaction: {
        connect: [
          {
            id: value.id,
            position: { end: true },
          },
        ],
      },
    };
    try {
      const response = await axios.post(
        "/request-histories",
        { data: reqtBody }, // Send each object as payload
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
      let res = response.data.data;

      navigate("/request-history");

      // if(res.status) {
      //   let rtnBody = {
      //     transID: value.id,
      //     reqDate: formattedDateString,
      //     reqHeader: value.eInvType,
      //     reqBody: body,
      //     reqParam: "",
      //     reqUrl: `/request-history/${value.id}`,
      //   };
      // const response = await axios.put(
      //   "/request-histories",
      //   { data: rtnBody }, // Send each object as payload
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //       Accept: "application/json",
      //     },
      //   }
      // );

      toast.success("Request has been submitted.", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      let errorList = error.response.data.error.details.errors;
      console.error("An error occurred:", errorList);
      for (const list of errorList) {
        toast.error(list.message + " " + list.path[0], {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const submitRequest = () => {
    // const a = event;
    // try {
    //   const response = await axios.post(
    //     "/request-history",
    //     { data: dataItem }, // Send each object as payload
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         Accept: "application/json",
    //       },
    //     }
    //   );
    //   const res = response.data.data;
    //   toast.success("List payable transactions created successfully.", {
    //     position: "top-right",
    //     autoClose: 3000,
    //   });
    //   setOpen(false);
    // } catch (error) {
    //   let errorList = error.response.data.error.details.errors;
    //   console.error("An error occurred:", errorList);
    //   for (const list of errorList) {
    //     toast.error(list.message + " " + list.path[0], {
    //       position: "top-right",
    //       autoClose: 3000,
    //     });
    //   }
    // }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Function to render skeleton rows
  const renderSkeletonRows = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <TableRow key={index}>
        <TableCell colSpan={8}>
          <Skeleton animation="wave" height={48} />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Box>
      <Box sx={{}}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              {visibleRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12}>
                    <Typography textAlign="center" color="lightgray">
                      No Data Available
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                // Render actual rows
                <>
                  <TableBody>
                    {visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover key={row.id}>
                          <TableCell
                            padding="checkbox"
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}
                            onClick={(event) => handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                          >
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell>{row.id}</TableCell>

                          <TableCell>
                            {row.company?.data?.attributes?.name || "-"}
                          </TableCell>
                          <TableCell>{row.eInvNum}</TableCell>
                          <TableCell>{row.buyerName}</TableCell>
                          <TableCell>{row.buyEmail}</TableCell>

                          <TableCell>{row.eInvType}</TableCell>
                          <TableCell>{row.status}</TableCell>
                          <TableCell>
                            {dateFormatter.format(row.createdAt)}
                          </TableCell>

                          <TableCell display="flex">
                            <Box></Box>
                            <Link
                              to={`/account-receivable/${row.id}`}
                              state={{ dataRows: { row } }}
                            >
                              <Button size="small">
                                <Tooltip
                                  title="View Transaction"
                                  placement="right"
                                >
                                  <VisibilityIcon />
                                </Tooltip>
                              </Button>
                            </Link>

                            <Button
                              size="small"
                              onClick={() => {
                                handleClickSet(row);
                              }}
                            >
                              <Tooltip title="Submit request" placement="right">
                                <IosShareIcon />
                              </Tooltip>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={11} />
                      </TableRow>
                    )}
                  </TableBody>
                </>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[1, 3, 5]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {/* <Box display="flex" justifyContent="space-between" p={2}>
          <Typography>Page: {page + 1}</Typography>
          <Pagination
            count={rows.meta.pageCount}
            page={page}
            onChange={handleChange}
          />
        </Box> */}
        </Paper>
      </Box>
    </Box>
  );
}
