import { Box, Typography } from "@mui/material";
import React from "react";

const styles = {
  textTransform: "uppercase",
  fontFamily: "Bungee",
  color: "black",
  lineHeight: 1,
};

function Logo() {
  return (
    <Box>
      <Typography
        variant="logo"
        sx={{
          ...styles,
          color: "yellow.main",
          WebkitTextStrokeWidth: { xs: "1px", sm: "2px" },
          WebkitTextStrokeColor: "black",
        }}
      >
        my
      </Typography>
      <br />
      <Typography variant="logo" sx={{ ...styles }}>
        articles
      </Typography>
    </Box>
  );
}

export default Logo;
