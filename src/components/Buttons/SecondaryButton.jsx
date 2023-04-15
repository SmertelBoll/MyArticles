import { Button, Typography } from "@mui/material";
import React from "react";

function SecondaryButton({ active, children, onClick, sx }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: active ? "yellow.main" : "",
        color: "black",
        px: 2,
        alignSelf: "center",
        borderRadius: 2,

        ":hover": {
          backgroundColor: "yellow.main",
        },
        ...sx,
      }}
    >
      <Typography variant="button">{children}</Typography>
    </Button>
  );
}

export default SecondaryButton;
