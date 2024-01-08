import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";

export default function PaginationComponent(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);
  console.log("props", props);
  const value = props.data.pagination;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 1));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    // <Box my={3}>
    //   <TablePagination
    //     rowsPerPageOptions={[1, 3, 5]}
    //     component="div"
    //     count={value.total}
    //     rowsPerPage={rowsPerPage}
    //     page={page}
    //     onPageChange={handleChangePage}
    //     onRowsPerPageChange={handleChangeRowsPerPage}
    //   />
    // </Box>
  );
}
