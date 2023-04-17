import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import TagButton from "../Buttons/TagButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const testTags = ["react", "hohoho", "hello!1", "react", "hohoho", "hello!1"];

function ArticleInfoBlock({ text }) {
  return (
    <Box sx={{ backgroundColor: "white", p: { xs: 2, sm: 3 } }}>
      {/* user */}
      <Box sx={{ display: "flex" }}>
        <Avatar
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          sx={{ mr: 2 }}
        />

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="desc1" sx={{ color: "black" }}>
            Name
          </Typography>

          <Typography variant="desc2" sx={{ color: "grey.dark" }}>
            Date
          </Typography>
        </Box>
      </Box>

      <Box sx={{ ml: "56px", display: "flex", flexDirection: "column", gap: 1 }}>
        {/* title */}
        <Typography variant="h2" sx={{ color: "black" }}>
          title
        </Typography>

        {/* tags */}
        <Box sx={{ display: "flex", gap: "0 16px", flexWrap: "wrap" }}>
          {testTags.map((name, id) => (
            <TagButton key={`${id}_${name}`}>#{name}</TagButton>
          ))}
        </Box>

        {/* fullText */}
        {text && (
          <Box sx={{ py: 2 }}>
            <ReactMarkdown children={text} />
          </Box>
        )}

        {/* views and comments */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "grey.dark" }}>
            <VisibilityOutlinedIcon />
            <Typography>150</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "grey.dark" }}>
            <CommentOutlinedIcon />
            <Typography>5</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ArticleInfoBlock;
