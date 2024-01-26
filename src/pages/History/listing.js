import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Skeleton, Button, styled, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import DateFormatter from "helper/dateFormartter";
import BasicBreadcrumbs from "components/breadcrumb";
import SearchField from "components/searchField";

let rows;

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
    id: "transID",
    numeric: false,
    disablePadding: true,
    label: "Transaction ID",
  },
  {
    id: "tranType",
    numeric: false,
    disablePadding: true,
    label: "Transaction Type",
  },

  {
    id: "reqHeader",
    numeric: false,
    disablePadding: true,
    label: "Request Header",
  },
  {
    id: "reqBody",
    numeric: false,
    disablePadding: true,
    label: "Request Body",
  },
  {
    id: "reqParam",
    numeric: false,
    disablePadding: true,
    label: "Request Param",
  },
  {
    id: "reqURL",
    numeric: true,
    disablePadding: false,
    label: "Request URL",
  },
  {
    id: "reqDate",
    numeric: false,
    disablePadding: true,
    label: "Request Date",
  },

  {
    id: "rtnHeader",
    numeric: true,
    disablePadding: false,
    label: "Return Header",
  },
  {
    id: "rtnBody",
    numeric: true,
    disablePadding: false,
    label: "Return Body",
  },
  {
    id: "rtnStatusCode",
    numeric: true,
    disablePadding: false,
    label: "Status Code",
  },
  {
    id: "rtnDate",
    numeric: true,
    disablePadding: false,
    label: "Return Date",
  },

  // {
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Actions",
  // },
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
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            align="center"
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
  const dateFormatter = DateFormatter();
  rows = data;
  let visibleRows = data;
  console.log("1", visibleRows);

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

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

  const resubmit = () => {
    return;
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

  const Root = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  }));

  return (
    <Box>
      <BasicBreadcrumbs first="Receivable" second="Listing" />
      <Root>
        <SearchField />
      </Root>

      <Box sx={{ mt: 4, mb: 4 }}>
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
                <>
                  <TableBody>
                    {visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover key={index}>
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

                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell sx={{ width: "100px" }}>
                            {row.attributes.transaction.data.id}
                          </TableCell>
                          <TableCell sx={{ width: "100px" }}>
                            {
                              row.attributes.transaction.data.attributes
                                .tranType
                            }
                          </TableCell>

                          <TableCell>{row.attributes.reqHeader}</TableCell>
                          <TableCell>{row.attributes.reqBody}</TableCell>
                          <TableCell>
                            {row.attributes.reqParam || "-"}
                          </TableCell>

                          <TableCell>{row.attributes.reqUrl}</TableCell>
                          <TableCell>
                            {dateFormatter.format(row.attributes.reqDate)}
                          </TableCell>

                          <TableCell>{row.attributes.rtnHeader}</TableCell>
                          <TableCell>{row.attributes.rtnBody}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.attributes.rtnStatusCode}
                              color={
                                row.attributes.rtnStatusCode == "success"
                                  ? "success"
                                  : "error"
                              }
                            />
                          </TableCell>
                          <TableCell>
                            {dateFormatter.format(row.attributes.rtnDate)}
                          </TableCell>

                          <TableCell>
                            {row.attributes.rtnStatusCode != "success" ?? (
                              <Button
                                variant="contained"
                                size="small"
                                onClick={resubmit()}
                              >
                                Resubmit
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={12} />
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
        </Paper>
      </Box>
    </Box>
  );
}
