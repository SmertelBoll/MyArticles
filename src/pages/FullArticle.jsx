import React from "react";
import { Box } from "@mui/material";
import ContainerCustom from "../components/customMUI/ContainerCustom";
import ArticleInfoBlock from "../components/Article/ArticleInfoBlock";
import CommentsBlock from "./Comments/CommentBlock";

const texttt = `Hello

goodbye
#### hihihi`;

function FullArticle() {
  return (
    <ContainerCustom paddingY sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ bgcolor: "white", borderRadius: 2, overflow: "hidden" }}>
        <Box
          component="img"
          sx={{
            width: "100%",
            maxHeight: "50vh",
            objectFit: "cover",
          }}
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />

        <ArticleInfoBlock text={texttt} />
      </Box>

      <CommentsBlock addCommnet />
    </ContainerCustom>
  );
}

export default FullArticle;
