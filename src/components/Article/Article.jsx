import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import ArticleInfoBlock from "./ArticleInfoBlock";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/slices/PostsSlice";

function Article({ _id, title, tags, imageUrl, date, user, viewsCount, commentsCount, isOwner }) {
  const dispatch = useDispatch();
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleDeleteArticle = () => {
    if (window.confirm("Ви точно хочете видалити статтю?")) {
      axios
        .delete(`/posts/${_id}`)
        .then((res) => {
          alert("Стаття успішно видалена");
          dispatch(deletePost(_id));
        })
        .catch((err) => {
          console.warn(err);
          alert("Не вдалося видалити статтю");
        });
    }
  };

  return (
    <Box
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      sx={{ position: "relative", boxShadow: 0 }}
    >
      <Link to={`/article/${_id}`}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 2,
            overflow: "hidden",

            "&:hover": {
              outline: "1px solid",
              outlineColor: (theme) => theme.palette.black,
            },
          }}
        >
          {/* image */}
          {imageUrl && (
            <Box
              component="img"
              sx={{
                width: "100%",
                maxHeight: "50vh",
                objectFit: "cover",
              }}
              src={imageUrl}
            />
          )}

          {/* info */}
          <ArticleInfoBlock
            title={title}
            tags={tags}
            date={date}
            user={user}
            viewsCount={viewsCount}
            commentsCount={commentsCount}
          />
        </Box>
      </Link>

      {/* update button */}
      {isOwner && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            bgcolor: "white",
            p: "3px",
            borderRadius: 2,
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <Tooltip title={<Typography fontSize={16}>Edit</Typography>} placement="top">
            <Link to={`/update/${_id}`}>
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
  );
}

export default Article;
