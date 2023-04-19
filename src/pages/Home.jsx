import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerCustom from "../components/customMUI/ContainerCustom";
import SortingBlock from "../components/Sorting/SortingBlock";
import Article from "../components/Article/Article";
import Comments from "./Comments/Comments";
import { Link } from "react-router-dom";
import { fetchPosts } from "../redux/slices/PostsSlice";

function Home() {
  const dispatch = useDispatch();
  const { items, isLoaded } = useSelector((state) => state.posts);
  const isAuth = false;

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

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
          {isLoaded ? (
            <>
              {items.map((obj) => (
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
            <Link to="/comments">
              <Box sx={{ borderRadius: 2, "&:hover": { outline: "1px solid black" } }}>
                <Comments />
              </Box>
            </Link>
          </Box>
        )}
      </Box>
    </ContainerCustom>
  );
}

export default Home;
