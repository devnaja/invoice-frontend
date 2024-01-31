import { Box, Modal, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "50%",
  display: "block",
};

function ImportButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [jsonData, setJsonData] = useState(null);

  const reader = new FileReader();

  function dateFormatterString(dateString) {
    let dateObject = new Date(dateString);

    // Format the Date object as needed
    let formattedDateString = moment(dateObject)
      .utc()
      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    return formattedDateString;
  }

  const convertCSVToJson = (csvData) => {
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const result = [];
    let formattedDate;

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");
      // Check if the current line has the same number of columns as headers
      if (currentLine.length === headers.length) {
        for (let j = 0; j < headers.length; j++) {
          // Check if currentLine[j] and headers[j] are defined before accessing 'trim'
          let sHeader = headers[j].trim();

          switch (sHeader) {
            case "id":
              sHeader = "transID";
              break;
            case "Transaction Type":
              sHeader = "tranType";
              break;
            case "Supplier Name":
              sHeader = "supplierName";
              break;
            case "Supplier ID":
              sHeader = "supID";
              break;
            case "Supplier Email":
              sHeader = "supEmail";
              break;
            case "Supplier Phone Number":
              sHeader = "supPhone";
              break;
            case "Supplier Bank Account":
              sHeader = "supBankAcctNum";
              break;
            case "Supplier TIN":
              sHeader = "supTin";
              break;
            case "Supplier SST Number":
              sHeader = "supSst";
              break;
            case "Supplier Tourism Tax":
              sHeader = "supTourismTax";
              break;
            case "Supplier MSIC":
              sHeader = "supMsic";
              break;
            case "Supplier Digital Sign":
              sHeader = "supDigitalSign";
              break;
            case "Supplier Address":
              sHeader = "supAddress";
              break;
            case "Supplier Business Description":
              sHeader = "supBusDesc";
              break;
            case "Buyer Name":
              sHeader = "buyerName";
              break;
            case "Buyer Tax Idenfication Number":
              sHeader = "buyTin";
              break;
            case "Buyer ID":
              sHeader = "buyID";
              break;
            case "Buyer SST Number":
              sHeader = "buySst";
              break;
            case "Buyer Email":
              sHeader = "buyEmail";
              break;
            case "Buyer Phone Number":
              sHeader = "buyPhone";
              break;
            case "Buyer Address":
              sHeader = "buyAddress";
              break;
            case "e-invoice Type":
              sHeader = "eInvType";
              break;
            case "e-invoce Version":
              sHeader = "eInvVer";
              break;
            case "e-invoice Ref Number":
              sHeader = "eInvRefNum";
              break;
            case "e-invoice Number":
              sHeader = "eInvNum";
              break;
            case "e-invoice Date":
              sHeader = "eInvDate";

              formattedDate = dateFormatterString(currentLine[j]);
              currentLine[j] = formattedDate;
              break;
            case "Currency Exchange Rate":
              sHeader = "currExRate";
              break;
            case "Currency Code":
              sHeader = "currCode";
              break;
            case "Validate Date":
              sHeader = "validateDate";

              formattedDate = dateFormatterString(currentLine[j]);
              currentLine[j] = formattedDate;
              break;
            case "Bill Frequency":
              sHeader = "billFreq";
              break;
            case "Product Classification":
              sHeader = "prodClass";
              break;
            case "IRBM Unique ID":
              sHeader = "irbmUniqueID";
              break;
            case "Product Unit Price":
              sHeader = "prodUnitPrice";
              break;
            case "Product Description":
              sHeader = "prodDesc";
              break;
            case "Product Tax Type":
              sHeader = "prodTaxType";
              break;
            case "Product Tax Rate":
              sHeader = "prodTaxRate";
              break;
            case "Product Tax Amount":
              sHeader = "prodTaxAmt";
              break;
            case "Product Tax Exemption Description":
              sHeader = "prodTaxExemptDesc";
              break;
            case "Product Tax Exemption Amount":
              sHeader = "prodTaxExemptAmt";
              break;
            case "Product Subtotal":
              sHeader = "prodSubtotal";
              break;
            case "Product Total Exclude Tax":
              sHeader = "prodTotalExclTax";
              break;
            case "Product Total Include Tax":
              sHeader = "prodTotalInclTax";
              break;
            case "Product Quantity":
              sHeader = "prodQty";
              break;
            case "Product Measure":
              sHeader = "prodMeasure";
              break;
            case "Product Discount Rate":
              sHeader = "prodDiscRate";
              break;
            case "Product Discount Amount":
              sHeader = "prodDiscAmt";
              break;
            case "Pay Mode":
              sHeader = "payMode";
              break;
            case "Pay Amount":
              sHeader = "payAmt";
              break;
            case "Pay Term":
              sHeader = "payTerm";
              break;
            case "Bill Period":
              sHeader = "billPeriod";
              break;
            case "Pay Date":
              sHeader = "payDate";

              formattedDate = dateFormatterString(currentLine[j]);
              currentLine[j] = formattedDate;
              break;
            case "Pay Ref Number":
              sHeader = "payRefNum";
              break;
            case "Bill Ref Number":
              sHeader = "billRefNum";
              break;
            default:
              sHeader = headers[j].trim();
              break;
          }

          obj[sHeader] = currentLine[j] === "" ? null : currentLine[j].trim();
          obj["status"] = "pending";
        }
        result.push(obj);
      } else {
        console.warn(
          `Skipping line ${
            i + 1
          } as it does not have the same number of columns as headers.`
        );
      }
    }
    return result;
  };

  const handleOnChange = (e) => {
    if (e.target.files[0]) {
      toast.success("Your csv files successfully uploaded", {
        position: "top-right",
        autoClose: 3000,
      });

      reader.onload = function (event) {
        const csvOutput = event.target.result;

        const jsonData = convertCSVToJson(csvOutput);
        setJsonData(jsonData);
      };

      reader.readAsText(e.target.files[0]);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const dataItem of jsonData) {
        const response = await axios.post(
          "/transactions",
          { data: dataItem }, // Send each object as payload
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              Accept: "application/json",
            },
          }
        );
      }

      toast.success("List receivable transactions created successfully.", {
        position: "top-right",
        autoClose: 3000,
      });

      setOpen(false);
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

  return (
    <Box
      m={{ xs: 1, md: 2 }}
      sx={{
        display: "flex",
        alignItems: "end",
      }}
    >
      <Button variant="contained" onClick={handleOpen}>
        Import Here
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input
            accept="text/csv"
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleOnChange}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              Upload
            </Button>
          </label>
        </Box>
      </Modal>
    </Box>
  );
}

export default ImportButton;
