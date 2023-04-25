import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout, selectIsAuth } from "../../redux/slices/AuthSlice";
import { alertConfirm } from "../../alerts";
import Logo from "./Logo";
import ContainerCustom from "../customMUI/ContainerCustom";
import MainButton from "../Buttons/MainButton";
import BurgerMenu from "./BurgerMenu";

function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const logOutFunc = () => {
    window.localStorage.removeItem("token");
    dispatch(logout());
  };

  const onClickLogout = () => {
    alertConfirm("Are you sure?", logOutFunc);
  };

  return (
    <Box component="header" bgcolor="white" sx={{ boxShadow: 0 }}>
      <ContainerCustom sx={{ py: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/">
            <Logo />
          </Link>

          {/* button menu */}
          {!isAuth ? (
            <>
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
                <Link to="/register">
                  <MainButton>Sing up</MainButton>
                </Link>
                <Link to="/login">
                  <MainButton>Log in</MainButton>
                </Link>
              </Box>
              <BurgerMenu sx={{ display: { xs: "flex", md: "none" } }} onClickLogout={onClickLogout} />
            </>
          ) : (
            <BurgerMenu onClickLogout={onClickLogout} />
          )}
        </Box>
      </ContainerCustom>
    </Box>
  );
}

export default Header;
