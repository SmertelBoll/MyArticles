import { Avatar, Box, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import TextFieldCustom from "../customMUI/TextFieldCustom";
import MainButton from "../Buttons/MainButton";

const InputBox = TextFieldCustom("#FAF8FF");

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          maxWidth: "380px",
          width: "100%",
          textAlign: "center",
          bgcolor: "white",
          borderRadius: 2,
          my: 4,
          p: 5,
          boxShadow: 0,
          display: "flex",
          flexDirection: "column",

          gap: 3,
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
      </Box>
    </Box>
  );
}

export default LoginForm;
