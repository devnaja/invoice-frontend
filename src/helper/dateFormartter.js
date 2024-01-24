import React from "react";
import moment from "moment";

const DateFormatter = (props) => {
  const runDateFormatter = (dateTimeString) => {
    const formattedDateTime =
      moment(dateTimeString).format("D-MMM-YYYY h:mm A");
    return formattedDateTime;
  };

  return {
    format: runDateFormatter,
  };
};

export default DateFormatter;
