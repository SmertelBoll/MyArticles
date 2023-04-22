import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainButton from "../../components/Buttons/MainButton";
import { Box, Typography } from "@mui/material";

function CommentsPage() {
  const [comments, setComments] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // get comments
  useEffect(() => {
    axios
      .get(`/comments`)
      .then((res) => {
        setComments(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при отриманні коментарів");
      });
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <ContainerCustom paddingY sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <MainButton startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ alignSelf: "start" }}>
        Back
      </MainButton>
      {Boolean(comments?.length) && false ? (
        <Comments items={comments} isLoaded={isLoaded} />
      ) : (
        <Box
          sx={{
            height: "100%",
            minHeight: "40vh",
            p: 2,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h2">
            You have no comments. Keep writing more great articles and they will be coming soon!
          </Typography>
        </Box>
      )}
    </ContainerCustom>
  );
}

export default CommentsPage;
