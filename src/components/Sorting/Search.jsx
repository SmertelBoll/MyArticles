import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styled from "@emotion/styled";
import TextFieldCustom from "../customMUI/TextFieldCustom";

const SearchBox = TextFieldCustom("#E6E4DA");

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
        "& .MuiOutlinedInput-notchedOutline": { borderRadius: "30px" },
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
