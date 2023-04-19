import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const res = await axios.post("/auth/login", params);
  return res.data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const res = await axios.get("/auth/me");
  return res.data;
});

export const fetchRegister = createAsyncThunk("auth/fetchRegister", async (params) => {
  const res = await axios.post("/auth/register", params);
  return res.data;
});

const initialState = {
  data: null,
  isLoaded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.isLoaded = false;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.isLoaded = false;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoaded = true;
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.isLoaded = true;
    },
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.isLoaded = false;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoaded = true;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.isLoaded = true;
    },
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.isLoaded = false;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoaded = true;
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.isLoaded = true;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
