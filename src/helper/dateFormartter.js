import React from "react";
import moment from "moment";

const DateFormatter = (props) => {
  const runDateFormatter = (dateTimeString) => {
    const formattedDateTime = moment(dateTimeString).format(
      "MMMM D, YYYY h:mm:ss A"
    );
    return formattedDateTime;
  };

  return {
    format: runDateFormatter,
  };
};

export default DateFormatter;
