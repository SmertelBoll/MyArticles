import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MainButton from "../Buttons/MainButton";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";
import SecondaryButton from "../Buttons/SecondaryButton";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/AuthSlice";

const BurgerMenu = ({ sx, onClickLogout }) => {
  // auth: show information to
  //  0 - users without registration
  //  1 - registered users
  //  -1 - all users
  const navLinks = [
    { title: "Home", link: "/", auth: -1, icon: <HomeIcon />, func: null },
    { title: "Log in", link: "/login", auth: 0, icon: <LoginIcon />, func: null },
    { title: "Sing up", link: "/register", auth: 0, icon: <PersonAddIcon />, func: null },
    { title: "Write an article", link: "/create", auth: 1, icon: <CreateIcon />, func: null },
    { title: "Comments", link: "/comments", auth: 1, icon: <CommentOutlinedIcon />, func: null },
    // { title: "", link: "/", auth: -1, icon: </>, func: null },
    { title: "Log out", auth: 1, icon: <LogoutIcon />, func: onClickLogout },
  ];

  const isAuth = useSelector(selectIsAuth);
  const { data, isLoaded } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", ...sx }}>
      <Button onClick={handleDrawerOpen} sx={{ alignSelf: "center", p: 2, color: "black" }}>
        <MenuIcon fontSize="large" />
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "min(70vw, 300px)",
            p: 2,
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
          },
        }}
      >
        {/* user */}
        {isAuth && isLoaded && (
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Avatar src={data?.user?.avatarUrl} sx={{ width: 75, height: 75, cursor: "pointer" }} />
            <Typography
              sx={{
                display: "-webkit-box",
                wordWrap: "break-word",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                whiteSpace: "pre-line",
                fontSize: "24px",
              }}
            >
              {data?.user?.fullName}
            </Typography>
          </Box>
        )}

        {/* navigate */}
        <Box sx={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
          {navLinks.map((obj) => (
            <React.Fragment key={obj.title}>
              {/* choose which buttons to show depending on authorization */}
              {(obj.auth === -1 || obj.auth == isAuth) && (
                <>
                  {/* check if you need to forward to another page */}
                  {obj.link ? (
                    <Link to={obj.link}>
                      <SecondaryButton
                        startIcon={obj.icon}
                        fullWidth
                        onClick={obj.func ? obj.func : handleDrawerClose}
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                      >
                        {obj.title}
                      </SecondaryButton>
                    </Link>
                  ) : (
                    <SecondaryButton
                      startIcon={obj.icon}
                      fullWidth
                      onClick={obj.func ? obj.func : handleDrawerClose}
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      {obj.title}
                    </SecondaryButton>
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </Box>

        <MainButton fullWidth onClick={handleDrawerClose}>
          Close
        </MainButton>
      </Drawer>
    </Box>
  );
};

export default BurgerMenu;