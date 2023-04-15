import { Button, Typography } from "@mui/material";
import React from "react";

function MainButton({ children }) {
  return (
    <Button
      sx={{
        backgroundColor: "yellow.main",
        color: "black",
        borderRadius: 4,
        px: 5,
        alignSelf: "center",

        ":hover": {
          backgroundColor: "yellow.dark",
        },
      }}
    >
      <Typography variant="button">{children}</Typography>
    </Button>
  );
}

export default MainButton;
