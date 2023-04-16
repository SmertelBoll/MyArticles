import { Button, Typography } from "@mui/material";
import React from "react";

function SecondaryButton(props) {
  const { children, sx, active, ...rest } = props;
  return (
    <Button
      {...props}
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
