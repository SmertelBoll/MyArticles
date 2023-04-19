import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import TextFieldCustom from "../../components/customMUI/TextFieldCustom";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import MainButton from "../../components/Buttons/MainButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/AuthSlice";
import { Navigate } from "react-router-dom";

const InputBox = TextFieldCustom("#FAF8FF");

function RegistrationForm() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Обробка завантаженого аватару
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);

      setFormData((prevData) => ({
        ...prevData,
        avatar: file,
      }));
      setAvatarUrl(imageUrl);
    }
  };

  const handleDeleteAvatar = () => {
    setFormData((prevData) => ({
      ...prevData,
      avatar: null,
    }));
    setAvatarUrl("");
  };

  const inputRef = useRef(null);

  const handleAvatarClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await dispatch(fetchRegister(formData));

    if (data?.payload?.token) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Не вдалося зареєструватися");
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

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
        }}
      >
        <Typography variant="h2">Create your account</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              onClick={handleAvatarClick}
              src={avatarUrl}
              sx={{ width: 90, height: 90, cursor: "pointer" }}
            />
            <input
              type="file"
              onChange={handleFileInputChange}
              style={{ display: "none" }}
              ref={inputRef}
              accept="image/*"
            />

            {avatarUrl && (
              <IconButton sx={{ position: "absolute", top: -25, right: -25, color: "black" }}>
                <HighlightOffIcon fontSize="large" onClick={handleDeleteAvatar} />
              </IconButton>
            )}
          </Box>

          <InputBox
            value={formData.fullName}
            onChange={handleInputChange}
            required
            fullWidth
            id="fullname"
            label="Full Name"
            name="fullName"
            autoFocus
          />
          <InputBox
            value={formData.email}
            onChange={handleInputChange}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
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
            Sign up
          </MainButton>
        </Box>
      </Box>
    </ContainerCustom>
  );
}

export default RegistrationForm;
