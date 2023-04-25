import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";

import { alertConfirm, alertError, alertSuccess } from "../alerts";
import { deletePost } from "../redux/slices/PostsSlice";
import ContainerCustom from "../components/customMUI/ContainerCustom";
import ArticleInfoBlock from "../components/Article/ArticleInfoBlock";
import Comments from "./Comments/Comments";
import MainButton from "../components/Buttons/MainButton";
import CircularProgressCustom from "../components/customMUI/CircularProgressCustom";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
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

  const { data: userData, isLoaded: isLoadedDataUser } = useSelector((state) => state.auth);

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
          alertError("Article error", "Could not find article");
          navigate("/");
        }
      })
      .catch((err) => {
        console.warn(err);
        alertError("Article error", "An error occurred while receiving the article");
        navigate("/");
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
        alertError("Comments error", "Error getting comments");
      });
  }, [countNewComments]);

  const deleteArticleFunc = () => {
    axios
      .delete(`/posts/${id}`)
      .then((res) => {
        alertSuccess("The article has been successfully deleted");
        dispatch(deletePost(id));
        navigate("/");
      })
      .catch((err) => {
        console.warn(err);
        alertError("Article error", "Failed to delete article");
      });
  };

  const handleDeleteArticle = () => {
    alertConfirm("Are you sure you want to delete the article?", deleteArticleFunc);
  };

  return (
    <ContainerCustom paddingY sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <MainButton startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ alignSelf: "start" }}>
        Back
      </MainButton>
      <Box sx={{ bgcolor: "bg.second", borderRadius: 2, overflow: "hidden", position: "relative" }}>
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
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgressCustom />
          </Box>
        )}

        {isLoadedPosts && userData?._id === post?.user?._id && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "bg.second",
              p: "3px",
              borderRadius: 2,
            }}
          >
            <Tooltip title={<Typography fontSize={16}>Edit</Typography>} placement="top">
              <Link to={`/update/${id}`}>
                <IconButton sx={{ color: "text.main" }}>
                  <EditIcon />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title={<Typography fontSize={16}>Delete</Typography>} placement="top">
              <IconButton sx={{ color: "text.main" }} onClick={handleDeleteArticle}>
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
        ownArticle={userData?._id === post?.user?._id}
      />
    </ContainerCustom>
  );
}

export default FullArticle;
