import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/PostsSlice";
import { commentsReducer } from "./slices/CommentsSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export default store;
