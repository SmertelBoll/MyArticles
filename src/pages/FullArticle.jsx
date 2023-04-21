import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import ContainerCustom from "../components/customMUI/ContainerCustom";
import ArticleInfoBlock from "../components/Article/ArticleInfoBlock";
import Comments from "./Comments/Comments";
import { Link, useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import axios from "../axios";
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/slices/PostsSlice";
import MainButton from "../components/Buttons/MainButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function FullArticle() {
  const [post, setPost] = useState(null);
  const [isLoadedPosts, setIsLoadedPosts] = useState(false);
  const [comments, setComments] = useState(null);
  const [isLoadedComments, setIsLoadedComments] = useState(false);
  const [countNewComments, setCountNewComments] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdate = () => {
    setCountNewComments((prev) => prev + 1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // posts
  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        if (res.data) {
          setPost(res.data);
          setIsLoadedPosts(true);
        } else {
          // тут має бути сторінка 404
          alert("Невдалося знайти статтю");
          navigate("/");
        }
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при отриманні статті");
      });
  }, []);

  // comments
  useEffect(() => {
    axios
      .get(`/comments/${id}`)
      .then((res) => {
        setComments(res.data);
        setIsLoadedComments(true);
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при отриманні коментарів");
      });
  }, [countNewComments]);

  const handleDeleteArticle = () => {
    if (window.confirm("Ви точно хочете видалити статтю?")) {
      axios
        .delete(`/posts/${id}`)
        .then((res) => {
          alert("Стаття успішно видалена");
          dispatch(deletePost(id));
          navigate("/");
        })
        .catch((err) => {
          console.warn(err);
          alert("Не вдалося видалити статтю");
        });
    }
  };

  return (
    <ContainerCustom paddingY sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <MainButton startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ alignSelf: "start" }}>
        Back
      </MainButton>
      <Box sx={{ bgcolor: "white", borderRadius: 2, overflow: "hidden", position: "relative" }}>
        {isLoadedPosts ? (
          <>
            <Box
              component="img"
              sx={{
                width: "100%",
                maxHeight: "50vh",
                objectFit: "cover",
              }}
              src={post.imageUrl}
            />

            <ArticleInfoBlock
              title={post.title}
              text={post.text}
              tags={post.tags}
              date={post.updatedAt}
              user={post.user}
              viewsCount={post.viewsCount}
              commentsCount={post.commentsCount + countNewComments}
            />
          </>
        ) : (
          <div>loading...</div>
        )}

        {isLoadedPosts && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "white",
              p: "3px",
              borderRadius: 2,
            }}
          >
            <Tooltip title={<Typography fontSize={16}>Edit</Typography>} placement="top">
              <Link to={`/update/${id}`}>
                <IconButton sx={{ color: "black" }}>
                  <EditIcon />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title={<Typography fontSize={16}>Delete</Typography>} placement="top">
              <IconButton sx={{ color: "black" }} onClick={handleDeleteArticle}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      <Comments
        addCommnet
        items={comments}
        isLoaded={isLoadedComments}
        postId={id}
        onUpdate={handleUpdate}
        countNewComments={countNewComments}
      />
    </ContainerCustom>
  );
}

export default FullArticle;
