import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/PostsSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
