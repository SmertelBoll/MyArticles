import { Avatar, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import TextFieldCustom from "../../components/customMUI/TextFieldCustom";
import TelegramIcon from "@mui/icons-material/Telegram";
import MainButton from "../../components/Buttons/MainButton";

const testComments = [1, 2, 3, 4];
const InputBox = TextFieldCustom("#FAF8FF");

function CommentsBlock({ addCommnet }) {
  const [commentText, setCommentText] = useState("");

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(commentText);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignSelf: "start",
      }}
    >
      <Typography variant="p" sx={{ color: "black" }}>
        Comments
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {addCommnet && (
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Avatar src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2" />

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "100%",
              }}
            >
              <InputBox
                value={commentText}
                onChange={handleChange}
                fullWidth
                id="Comment"
                placeholder="Add your comment..."
                name="Comment"
                sx={{ "& .MuiOutlinedInput-notchedOutline": { borderRadius: "8px" } }}
              />
              <MainButton type="submit" endIcon={<TelegramIcon />} sx={{ alignSelf: "flex-start" }}>
                Send
              </MainButton>
            </Box>
          </Box>
        )}
        {testComments.map((name) => (
          <Box sx={{ display: "flex", gap: 2 }} key={name}>
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
        ))}
      </Box>
    </Box>
  );
}

export default CommentsBlock;
