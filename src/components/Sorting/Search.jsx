import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styled from "@emotion/styled";

const SearchBox = styled(TextField)(() => ({
  "& input": {
    "&:-webkit-autofill": {
      "-webkit-box-shadow": "0 0 0 100px #E6E4DA inset",
    },
  },
  "& fieldset": {
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
  },
  "& label.Mui-focused": {
    color: "#0C1618",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#0C1618",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0C1618",
    },
  },
}));

function Search() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <SearchBox
      autoFocus
      label="Search"
      value={value}
      onChange={handleChange}
      sx={{
        width: "100%",
        maxWidth: { xs: "auto", md: "35vw" },
        "& .Mui-focused .MuiIconButton-root": { color: "black" },
      }}
      InputProps={{
        startAdornment: (
          <IconButton disabled>
            <SearchIcon />
          </IconButton>
        ),
        endAdornment: (
          <IconButton
            sx={{ visibility: value ? "visible" : "hidden" }}
            onClick={() => {
              setValue("");
            }}
          >
            <ClearIcon />
          </IconButton>
        ),
      }}
    />
  );
}

export default Search;
