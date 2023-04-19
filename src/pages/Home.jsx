import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerCustom from "../components/customMUI/ContainerCustom";
import SortingBlock from "../components/Sorting/SortingBlock";
import Article from "../components/Article/Article";
import CommentsBlock from "./Comments/CommentBlock";
import { Link } from "react-router-dom";
import { fetchPosts } from "../redux/slices/PostsSlice";

function Home() {
  const dispatch = useDispatch();
  const { items, isLoaded } = useSelector((state) => state.posts);

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
          {isLoaded ? (
            <>
              {items.map((obj) => (
                <Article key={obj._id} />
              ))}
            </>
          ) : (
            <div>loading</div>
          )}
          {/* <Article />
          <Article />
          <Article />
          <Article /> */}
        </Box>

        <Box
          sx={{
            flexGrow: "1",
            flexBasis: "33.33%",
            display: { xs: "none", md: "flex" },
            // display: "flex",
            // flexDirection: "column",
            // gap: 3,
          }}
        >
          {/* comments */}
          <Link to="/comments">
            <Box sx={{ borderRadius: 2, "&:hover": { outline: "1px solid black" } }}>
              <CommentsBlock />
            </Box>
          </Link>
        </Box>
      </Box>
    </ContainerCustom>
  );
}

export default Home;
