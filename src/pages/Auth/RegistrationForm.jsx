import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import { useTheme } from "@mui/material/styles";

import { fetchRegister, selectIsAuth } from "../../redux/slices/AuthSlice";
import TextFieldCustom from "../../components/customMUI/TextFieldCustom";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import MainButton from "../../components/Buttons/MainButton";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { alertError } from "../../alerts";

function RegistrationForm() {
  const theme = useTheme();
  const InputBox = useMemo(
    () => TextFieldCustom(theme.palette.bg.second, theme.palette.text.main),
    [theme.palette.mode]
  );

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Обробка завантаженого аватару
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    event.target.value = null;

    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);

      setData((prevData) => ({
        ...prevData,
        avatar: file,
      }));
      setAvatarUrl(imageUrl);
    }
  };

  // upload image to DB
  const uploadFileToDB = async () => {
    try {
      if (data.avatar && typeof data.avatar === "string") return data.avatar;

      const formDataImg = new FormData();
      formDataImg.append("image", data.avatar);

      const { data: dataUrl } = await axios.post("/upload", formDataImg);

      return `http://localhost:4444${dataUrl.url}`;
    } catch (error) {
      console.warn(error);
      alertError("Image error", "Error loading file");
      return null;
    }
  };

  const handleDeleteAvatar = () => {
    setData((prevData) => ({
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

    let avaUrl = "";
    if (data.avatar) {
      avaUrl = await uploadFileToDB();
    }

    if (avaUrl === null) return;

    const formData = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      avatarUrl: avaUrl,
    };

    const resData = await dispatch(fetchRegister(formData));

    if (resData?.payload?.token) {
      window.localStorage.setItem("token", resData.payload.token);
    } else {
      alertError("Authorization error", "You have entered incorrect data");
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
          bgcolor: "bg.second",
          borderRadius: 2,
          my: 4,
          p: { xs: 2, sm: 3, md: 5 },
          boxShadow: 0,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography color="text.main" variant="h2">
          Create your account
        </Typography>

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
              <IconButton sx={{ position: "absolute", top: -25, right: -25, color: "text.main" }}>
                <HighlightOffIcon fontSize="large" onClick={handleDeleteAvatar} />
              </IconButton>
            )}
          </Box>

          <InputBox
            value={data.fullName}
            onChange={handleInputChange}
            required
            fullWidth
            id="fullname"
            label="Full Name"
            name="fullName"
            autoFocus
          />
          <InputBox
            value={data.email}
            onChange={handleInputChange}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
          />
          <InputBox
            value={data.password}
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
