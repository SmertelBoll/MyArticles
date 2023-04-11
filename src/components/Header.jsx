import { Box } from "@mui/material";
import React from "react";
import ContainerCustom from "./ContainerCustom";
import Logo from "./Logo";
import ButtonYellow from "./ButtonYellow";

function Header() {
  return (
    <Box component="header" bgcolor="white" sx={{ boxShadow: 0 }}>
      <ContainerCustom sx={{ py: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Logo />

          <Box sx={{ display: "flex", gap: 2 }}>
            <ButtonYellow>Sing up</ButtonYellow>
            <ButtonYellow>Log in</ButtonYellow>
          </Box>
        </Box>
      </ContainerCustom>
    </Box>
  );
}

export default Header;
