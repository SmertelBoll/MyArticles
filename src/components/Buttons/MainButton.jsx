import { Button, Typography } from "@mui/material";
import React from "react";

function MainButton(props) {
  const { children, sx, ...rest } = props;
  return (
    <Button
      {...rest}
      sx={{
        backgroundColor: "yellow.main",
        color: "black",
        borderRadius: 4,
        px: 5,
        alignSelf: "center",

        ":hover": {
          backgroundColor: "yellow.dark",
        },
        ...sx,
      }}
    >
      <Typography variant="button">{children}</Typography>
    </Button>
  );
}

export default MainButton;
