import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
  const res = await axios.get("/comments");
  return res.data;
});

const initialState = {
  items: [],
  isLoaded: false,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchComments.pending]: (state) => {
      // якщо відправка
      state.items = []; // щоб випадко не показало старі елементи
      state.isLoaded = false;
    },
    [fetchComments.fulfilled]: (state, action) => {
      // якщо успішно
      state.items = action.payload;
      state.isLoaded = true;
    },
    [fetchComments.rejected]: (state) => {
      // якщо помилка
      state.items = [];
      state.isLoaded = true;
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
