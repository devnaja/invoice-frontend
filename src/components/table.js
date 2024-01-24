import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import DateFormatter from "helper/dateFormartter";

export default function TableList(props) {
  const rows = props.rows;
  const dateFormatter = DateFormatter();

  console.log("rows", rows);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ref. Number</TableCell>
            <TableCell>Classification</TableCell>
            <TableCell>Descriptions</TableCell>
            <TableCell>Discount Amount&nbsp;(RM)</TableCell>
            <TableCell>Discount Rate&nbsp;(%)</TableCell>
            <TableCell>Measure</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Pay Amount</TableCell>
            <TableCell>Pay Date</TableCell>
            <TableCell>Pay Mode</TableCell>
            <TableCell>Pay Term</TableCell>
            <TableCell>Pay Ref. Number</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Sub Total</TableCell>
            <TableCell>Tax Amount</TableCell>
            <TableCell>Tax Rate</TableCell>
            <TableCell>Tax Type</TableCell>
            <TableCell>Tax Exemption Amount</TableCell>
            <TableCell>Tax Exemption Description</TableCell>
            <TableCell>Total Exclude Tax</TableCell>
            <TableCell>Total Include Tax</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.billRefNum}
              </TableCell>
              <TableCell>{row.class}</TableCell>
              <TableCell>{row.desc}</TableCell>
              <TableCell>{row.discAmt}</TableCell>
              <TableCell>{row.discRate}</TableCell>
              <TableCell>{row.measure}</TableCell>
              <TableCell>{row.unitPrice}</TableCell>
              <TableCell>{row.payAmt}</TableCell>
              <TableCell>{dateFormatter.format(row.payDate)}</TableCell>
              <TableCell>{row.payMode}</TableCell>
              <TableCell>{row.payRefNum}</TableCell>
              <TableCell>{row.payTerm}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.subtotal}</TableCell>
              <TableCell>{row.taxAmt}</TableCell>
              <TableCell>{row.taxRate}</TableCell>
              <TableCell>{row.taxType}</TableCell>
              <TableCell>{row.taxExemptAmt}</TableCell>
              <TableCell>{row.taxExemptDesc}</TableCell>
              <TableCell>{row.totalExclTax}</TableCell>
              <TableCell>{row.totalInclTax}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
