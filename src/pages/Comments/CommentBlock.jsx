import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

function CommentBlock({ text, avatarUrl, fullname }) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Avatar src={avatarUrl || ""} />

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Typography variant="desc1" sx={{ color: "grey.dark" }}>
          {fullname}
        </Typography>
        <Typography variant="desc2" sx={{ color: "grey.dark" }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

export default CommentBlock;
