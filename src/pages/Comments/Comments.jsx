import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextFieldCustom from "../../components/customMUI/TextFieldCustom";
import TelegramIcon from "@mui/icons-material/Telegram";
import MainButton from "../../components/Buttons/MainButton";
import CommentBlock from "./CommentBlock";
import { useSelector } from "react-redux";

const InputBox = TextFieldCustom("#FAF8FF");

function Comments({ addCommnet, items, isLoaded, limit }) {
  const [commentText, setCommentText] = useState("");
  const { data: userData, isLoaded: isLoadedDataUser } = useSelector((state) => state.auth);

  const isPoints = limit < items?.length;
  if (limit) {
    items = items?.slice(0, limit);
  }

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
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <Typography variant="p" sx={{ color: "black" }}>
        Comments
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        {addCommnet && isLoadedDataUser && (
          <Box sx={{ display: "flex", gap: 2, mb: 2, width: "100%" }}>
            <Avatar src={userData?.user?.avatarUrl} />

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
        {isPoints && (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="p" sx={{ color: "grey.dark" }}>
              ...
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Comments;
