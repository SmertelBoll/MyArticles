import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerCustom from "../components/customMUI/ContainerCustom";
import SortingBlock from "../components/Sorting/SortingBlock";
import Article from "../components/Article/Article";
import Comments from "./Comments/Comments";
import { Link } from "react-router-dom";
import { fetchPosts } from "../redux/slices/PostsSlice";
import { selectIsAuth } from "../redux/slices/AuthSlice";
import axios from "../axios";

function Home() {
  const dispatch = useDispatch();
  const { items: postItems, isLoaded: isLoadedPosts } = useSelector((state) => state.posts);
  const { data: userData, isLoaded: isLoadedDataUser } = useSelector((state) => state.auth);
  const isAuth = useSelector(selectIsAuth);

  const [commentItems, setCommentItems] = useState(null);
  const [isLoadedComments, setIsLoadedComments] = useState(false);

  useEffect(() => {
    axios
      .get(`/comments`)
      .then((res) => {
        setCommentItems(res.data);
        setIsLoadedComments(true);
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при отриманні коментарів");
      });
  }, []);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <ContainerCustom>
      <SortingBlock />

      <Box sx={{ display: "flex", gap: 3 }}>
        {/* articles */}
        <Box
          sx={{
            flexGrow: "2",
            flexBasis: "66.67%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 2,
          }}
        >
          {isLoadedPosts ? (
            <>
              {postItems.map((obj) => (
                <Article
                  key={obj._id}
                  _id={obj._id}
                  title={obj.title}
                  tags={obj.tags}
                  imageUrl={obj.imageUrl}
                  date={obj.updatedAt}
                  user={obj.user}
                  viewsCount={obj.viewsCount}
                  commentsCount={obj.commentsCount}
                  isOwner={isLoadedDataUser && isLoadedPosts ? userData?.user?._id === obj?.user?._id : false}
                />
              ))}
            </>
          ) : (
            <div>loading</div>
          )}
        </Box>

        {isAuth && (
          <Box
            sx={{
              flexGrow: "1",
              flexBasis: "33.33%",
              display: { xs: "none", md: "flex" },
            }}
          >
            {/* comments */}
            <Link style={{ width: "100%" }} to="/comments">
              <Box sx={{ borderRadius: 2, "&:hover": { outline: "1px solid black" } }}>
                <Comments items={commentItems} isLoaded={isLoadedComments} limit={5} />
              </Box>
            </Link>
          </Box>
        )}
      </Box>
    </ContainerCustom>
  );
}

export default Home;
