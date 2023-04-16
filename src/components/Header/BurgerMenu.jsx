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

// auth: show information to
//  0 - users without registration
//  1 - registered users
//  -1 - all users
const navLinks = [
  { title: "Home", link: "/", auth: -1, icon: <HomeIcon /> },
  { title: "Log in", link: "/log-in", auth: 0, icon: <LoginIcon /> },
  { title: "Sing up", link: "/sing-up", auth: 0, icon: <PersonAddIcon /> },
  { title: "Write an article", link: "/create-article", auth: 1, icon: <CreateIcon /> },
  { title: "Comments", link: "/---", auth: 1, icon: <CommentOutlinedIcon /> },
  // { title: "", link: "/", auth: -1, icon: </> },
  { title: "Log out", auth: 1, icon: <LogoutIcon /> },
];

const BurgerMenu = ({ sx }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const user = true;

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
        {user && (
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Avatar sx={{ width: 75, height: 75, cursor: "pointer" }} />
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
              Lyubomyr Sholop
            </Typography>
          </Box>
        )}

        {/* navigate */}
        <Box sx={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
          {navLinks.map((obj) => (
            <React.Fragment key={obj.title}>
              {/* choose which buttons to show depending on authorization */}
              {(true || obj.auth === -1 || obj.auth == user) && (
                <>
                  {/* check if you need to forward to another page */}
                  {obj.link ? (
                    <Link to={obj.link}>
                      <SecondaryButton
                        startIcon={obj.icon}
                        fullWidth
                        onClick={handleDrawerClose}
                        sx={{ display: "flex", justifyContent: "flex-start" }}
                      >
                        {obj.title}
                      </SecondaryButton>
                    </Link>
                  ) : (
                    <SecondaryButton
                      startIcon={obj.icon}
                      fullWidth
                      // onClick={handleDrawerClose}
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
