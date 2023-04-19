import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import TagButton from "../Buttons/TagButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function ArticleInfoBlock({ title, text, tags, date, user, viewsCount, commentsCount }) {
  const yearMonthDay = date.split("T")[0];
  return (
    <Box sx={{ backgroundColor: "white", p: { xs: 2, sm: 3 } }}>
      {/* user */}
      <Box sx={{ display: "flex" }}>
        <Avatar src={user.avatarUrl || ""} sx={{ mr: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="desc1" sx={{ color: "black" }}>
            {user.fullName}
          </Typography>

          <Typography variant="desc2" sx={{ color: "grey.dark" }}>
            {yearMonthDay}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ ml: "56px", display: "flex", flexDirection: "column", gap: 1 }}>
        {/* title */}
        <Typography variant="h2" sx={{ color: "black" }}>
          {title}
        </Typography>

        {/* tags */}
        <Box sx={{ display: "flex", gap: "0 16px", flexWrap: "wrap" }}>
          {tags.map((name, id) => (
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
            <Typography>{viewsCount}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "grey.dark" }}>
            <CommentOutlinedIcon />
            <Typography>{commentsCount}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ArticleInfoBlock;
