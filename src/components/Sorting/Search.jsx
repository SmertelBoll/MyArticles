import { IconButton } from "@mui/material";
import React from "react";

import TextFieldCustom from "../customMUI/TextFieldCustom";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBox = TextFieldCustom("#E6E4DA");

function Search({ inputText, onChangeInput }) {
  const handleChange = (e) => {
    onChangeInput(e);
  };
  const handleClear = (e) => {
    onChangeInput(e, true);
  };
  return (
    <SearchBox
      autoFocus
      label="Search"
      value={inputText}
      onChange={handleChange}
      sx={{
        width: "100%",
        maxWidth: { xs: "auto", md: "35vw" },
        "& .Mui-focused .MuiIconButton-root": { color: "black" },
        "& .MuiOutlinedInput-notchedOutline": { borderRadius: "30px" },
      }}
      InputProps={{
        startAdornment: (
          <IconButton disabled>
            <SearchIcon />
          </IconButton>
        ),
        endAdornment: (
          <IconButton sx={{ visibility: inputText ? "visible" : "hidden" }} onClick={handleClear}>
            <ClearIcon />
          </IconButton>
        ),
      }}
    />
  );
}

export default Search;
