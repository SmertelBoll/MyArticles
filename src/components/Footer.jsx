import { Box, Typography } from "@mui/material";
import React from "react";
import ContainerCustom from "./ContainerCustom";

function Footer() {
  return (
    <Box component="footer" bgcolor="white" sx={{ boxShadow: 0 }}>
      <ContainerCustom>
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="p">© 2023 Lyubomyr Sholop</Typography>
        </Box>
      </ContainerCustom>
    </Box>
  );
}

export default Footer;
