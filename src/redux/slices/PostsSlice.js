import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (params) => {
  const url = `/posts?${
    params.sortBy === "_filter_" ? `filter=${params.search}` : `sortBy=${params.sortBy}`
  }`;
  const res = await axios.get(url);
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
