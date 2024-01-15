import { useState, useEffect } from "react";
import { Box, Typography, Autocomplete, TextField } from "@mui/material";
import FilterPrducts from "./filterProducts";
import { getAll } from "../../api/users";

function SearchBar(props) {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const sendDataToParent = (e) => {
    // Call the parent function with dataToSend
    props.onDataFromChild(e);
  };

  const handleInput = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value.toLowerCase());
    sendDataToParent(input);
  };

  useEffect(() => {
    getAll().then((res) => setList(res));
  }, []);

  return (
    <Box
      className="App"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      {/* <Typography>React Search Bar</Typography> */}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={list.map((item) => item.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search title"
            onSelect={handleInput}
            sx={{
              width: 550,
              margin: "5px auto",
            }}
          />
        )}
      />

      {/* <FilterPrducts searchstring={input} list={list} /> */}
    </Box>
  );
}

export default SearchBar;
