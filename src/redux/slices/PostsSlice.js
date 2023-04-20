import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchNewPosts = createAsyncThunk("posts/fetchNewPosts", async (params) => {
  const res = await axios.get(`/posts?sortBy=${params.sortBy}`);
  return res.data;
});
export const fetchPopularPosts = createAsyncThunk("posts/fetchPopularPosts", async (params) => {
  const res = await axios.get(`/posts?sortBy=${params.sortBy}`);
  return res.data;
});
// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (params) => {
//   const url = `/posts?${
//     params.sortBy === "_filter_" ? `filter=${params.search}` : `sortBy=${params.sortBy}`
//   }`;
//   const res = await axios.get(url);
//   return res.data;
// });

const initialState = {
  new: {
    items: [],
    isLoaded: false,
  },
  popular: {
    items: [],
    isLoaded: false,
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    deletePost: (state, action) => {
      state.new.items = state.new.items.filter((post) => post._id !== action.payload);
      state.popular.items = state.new.items.filter((post) => post._id !== action.payload);
    },
  },
  extraReducers: {
    [fetchNewPosts.pending]: (state) => {
      state.new.items = [];
      state.new.isLoaded = false;
    },
    [fetchNewPosts.fulfilled]: (state, action) => {
      state.new.items = action.payload;
      state.new.isLoaded = true;
    },
    [fetchNewPosts.rejected]: (state) => {
      state.new.items = [];
      state.new.isLoaded = true;
    },
    [fetchPopularPosts.pending]: (state) => {
      state.popular.items = [];
      state.popular.isLoaded = false;
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.popular.items = action.payload;
      state.popular.isLoaded = true;
    },
    [fetchPopularPosts.rejected]: (state) => {
      state.popular.items = [];
      state.popular.isLoaded = true;
    },
  },
});

export const postsReducer = postsSlice.reducer;

export const { deletePost } = postsSlice.actions;
