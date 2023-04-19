import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ContainerCustom from "../components/customMUI/ContainerCustom";
import ArticleInfoBlock from "../components/Article/ArticleInfoBlock";
import Comments from "./Comments/Comments";
import { useParams } from "react-router-dom";
import axios from "../axios";

function FullArticle() {
  const [post, setPost] = useState(null);
  const [isLoadedPosts, setIsLoadedPosts] = useState(false);
  const [comments, setComments] = useState(null);
  const [isLoadedComments, setIsLoadedComments] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoadedPosts(true);
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при отриманні статті");
      });
  }, []);

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
  }, []);

  return (
    <ContainerCustom paddingY sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ bgcolor: "white", borderRadius: 2, overflow: "hidden" }}>
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
              commentsCount={post.commentsCount}
            />
          </>
        ) : (
          <div>loading...</div>
        )}
      </Box>

      <Comments addCommnet items={comments} isLoaded={isLoadedComments} />
    </ContainerCustom>
  );
}

export default FullArticle;
