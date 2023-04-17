import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import ArticleInfoBlock from "./ArticleInfoBlock";

function Article() {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Link to={`/article/0`}>
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
        <ArticleInfoBlock />
      </Box>
    </Link>
  );
}

export default Article;
