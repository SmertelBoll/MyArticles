import { Box, Typography } from "@mui/material";
import React from "react";
import ContainerCustom from "../components/customMUI/ContainerCustom";
import SortingBlock from "../components/Sorting/SortingBlock";
import Article from "../components/Article/Article";
import CommentsBlock from "./Comments/CommentBlock";
import { Link } from "react-router-dom";

function Home() {
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
          <Article />
          <Article />
          <Article />
          <Article />
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
            <CommentsBlock />
          </Link>
        </Box>
      </Box>
    </ContainerCustom>
  );
}

export default Home;
