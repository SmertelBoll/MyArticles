import { Typography } from "@mui/material";
import React from "react";

function TagButton({ children, onClick }) {
  return (
    <Typography
      variant="disc2"
      onClick={onClick}
      sx={{
        color: "grey.dark",
        ":hover": {
          color: "black",
          cursor: "pointer",
        },
      }}
    >
      {children}
    </Typography>
  );
}

export default TagButton;
