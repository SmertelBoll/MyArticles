import React, { useEffect, useState } from "react";
import Comments from "./Comments";
import ContainerCustom from "../../components/customMUI/ContainerCustom";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MainButton from "../../components/Buttons/MainButton";

function CommentsPage() {
  const [comments, setComments] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
      <Comments items={comments} isLoaded={isLoaded} />
    </ContainerCustom>
  );
}

export default CommentsPage;
