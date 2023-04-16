import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

function Comment() {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Avatar src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" />

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Typography variant="desc1" sx={{ color: "grey.dark" }}>
          Name
        </Typography>
        <Typography variant="desc2" sx={{ color: "grey.dark" }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non error perferendis reprehenderit
          perspiciatis architecto voluptatum in dolor aliquid? Eveniet ut odio rerum eum, ea illum
          voluptatibus beatae.
        </Typography>
      </Box>
    </Box>
  );
}

export default Comment;
