import { Box } from "@mui/material";
import React from "react";
import ContainerCustom from "./customMUI/ContainerCustom";
import Logo from "./Logo";
import MainButton from "./Buttons/MainButton";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box component="header" bgcolor="white" sx={{ boxShadow: 0 }}>
      <ContainerCustom sx={{ py: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/">
            <Logo />
          </Link>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Link to="/sing-up">
              <MainButton>Sing up</MainButton>
            </Link>
            <MainButton>Log in</MainButton>
          </Box>
        </Box>
      </ContainerCustom>
    </Box>
  );
}

export default Header;
