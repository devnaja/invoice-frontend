import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DateFormatter from "helper/dateFormartter";

export default function RequestTable(props) {
  const rows = props.rows;
  const dateFormatter = DateFormatter();

  // console.log("rows", rows);

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid black",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Invoice Number</TableCell>
            <TableCell>Request Header</TableCell>
            <TableCell>Request Body</TableCell>
            <TableCell>Request Params</TableCell>
            <TableCell>Request URL</TableCell>
            <TableCell>Request Date</TableCell>
            <TableCell>Return Header</TableCell>
            <TableCell>Return Body</TableCell>
            <TableCell>Return Status Code</TableCell>
            <TableCell>Return Date</TableCell>
          </TableRow>
        </TableHead>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={12}>
              <Typography textAlign="center" color="lightgray">
                No Data Available
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.tranId}
                </TableCell>
                <TableCell>{row.invNum}</TableCell>
                <TableCell>{row.reqHeader}</TableCell>
                <TableCell>{row.reqBody}</TableCell>
                <TableCell>{row.reqParams}</TableCell>
                <TableCell>{row.reqUrl}</TableCell>
                <TableCell>{row.reqDate}</TableCell>
                <TableCell>{row.rtnHeader}</TableCell>
                <TableCell>{row.rtnBody}</TableCell>
                <TableCell>{row.rtnStatusCode}</TableCell>
                <TableCell>{dateFormatter.format(row.rtnDate)}</TableCell>
              </TableRow>
            ))}
            {/* {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={11} />
              </TableRow>
            )} */}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
