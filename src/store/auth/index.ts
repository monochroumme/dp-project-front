import { createSlice } from "@reduxjs/toolkit";

import type { TAuthState } from "./types";

import reducers from "./reducers";
import extraReducers from "./extraReducers";

const initialState: TAuthState = {
  user: null,
  initialUserFetch: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers,
  extraReducers,
});

export default authSlice.reducer;

export const { setUser, logout } = authSlice.actions;
