import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextFieldCustom from "../../components/customMUI/TextFieldCustom";
import TelegramIcon from "@mui/icons-material/Telegram";
import MainButton from "../../components/Buttons/MainButton";
import { fetchComments } from "../../redux/slices/CommentsSlice";
import { useDispatch, useSelector } from "react-redux";
import CommentBlock from "./CommentBlock";

const InputBox = TextFieldCustom("#FAF8FF");

function Comments({ addCommnet, items, isLoaded, limit }) {
  const [commentText, setCommentText] = useState("");

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  console.log(items);

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
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <Typography variant="p" sx={{ color: "black" }}>
        Comments
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        {addCommnet && (
          <Box sx={{ display: "flex", gap: 2, mb: 2, width: "100%" }}>
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
        {isLoaded ? (
          <>
            {items &&
              items.map((obj) => (
                <CommentBlock
                  key={obj._id}
                  text={obj.text}
                  avatarUrl={obj.user.avatarUrl}
                  fullname={obj.user.fullName}
                />
              ))}
          </>
        ) : (
          <div>loading...</div>
        )}
        {false && (
          <>
            {[1, 2, 3, 4, 5].map((obj) => (
              <CommentBlock key={obj._id} />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Comments;
