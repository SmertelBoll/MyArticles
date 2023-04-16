import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import TextFieldCustom from "../../components/customMUI/TextFieldCustom";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import MainButton from "../../components/Buttons/MainButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const InputBox = TextFieldCustom("#FAF8FF");

function LoginForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <ContainerCustom sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          maxWidth: "500px",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "center",
          bgcolor: "white",
          borderRadius: 2,
          my: 4,
          p: 5,
          boxShadow: 0,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          position: "relative",
        }}
      >
        <Typography variant="h2">Welcome</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
        >
          <InputBox
            value={formData.email}
            onChange={handleInputChange}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
          />
          <InputBox
            value={formData.password}
            onChange={handleInputChange}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />

          <MainButton type="submit" fullWidth sx={{ borderRadius: 1 }}>
            Log in
          </MainButton>
        </Box>

        <Button
          onClick={handleClickOpen}
          sx={{
            alignSelf: "center",
            color: "grey.main",
            position: "absolute",
            top: 2,
            right: 5,
            "&:hover": { bgcolor: "transparent", color: "grey.dark" },
          }}
        >
          <InfoOutlinedIcon />
          <Typography sx={{ ml: "2px" }}>test account</Typography>
        </Button>

        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle variant="p" sx={{ color: "black" }}>
            Test account
          </DialogTitle>
          <DialogContent>
            <DialogContentText variant="p" sx={{ color: "grey.dark" }}>
              login: xxxxxxxx@xx.x
            </DialogContentText>
            <DialogContentText variant="p" sx={{ color: "grey.dark" }}>
              password: 12345
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <SecondaryButton onClick={handleClose}>OK</SecondaryButton>
          </DialogActions>
        </Dialog>
      </Box>
    </ContainerCustom>
  );
}

export default LoginForm;
