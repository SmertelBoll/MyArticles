import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import TagButton from "../../components/Buttons/TagButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const testTags = ["react", "hohoho", "hello!1", "react", "hohoho", "hello!1"];

function Article() {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Box
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        "&:hover": {
          outline: "1px solid",
          outlineColor: (theme) => theme.palette.black,
        },
      }}
    >
      {/* image */}
      <Box
        component="img"
        sx={{
          width: "100%",
          maxHeight: "40vh",
          objectFit: "cover",
        }}
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />

      {/* update button */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          bgcolor: "white",
          p: "3px",
          borderRadius: 2,
          opacity: isHovering ? 1 : 0,
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        <IconButton sx={{ color: "black" }}>
          <EditIcon />
        </IconButton>
        <IconButton sx={{ color: "black" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* info */}
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
    </Box>
  );
}

export default Article;
