import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await axios.get("/posts");
  return res.data;
});

const initialState = {
  items: [],
  isLoaded: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      // якщо відправка
      state.items = []; // щоб випадко не показало старі елементи
      state.isLoaded = false;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      // якщо успішно
      state.items = action.payload;
      state.isLoaded = true;
    },
    [fetchPosts.rejected]: (state) => {
      // якщо помилка
      state.items = [];
      state.isLoaded = true;
    },
  },
});

export const postsReducer = postsSlice.reducer;
