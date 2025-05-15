import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { TAuthState } from "./types";

import { getUser } from "./thunks";

const extraReducers = (builder: ActionReducerMapBuilder<TAuthState>): void => {
  builder.addCase(getUser.fulfilled, (state, { payload }) => {
    state.user = payload;
    state.initialUserFetch = false;
  });
  builder.addCase(getUser.rejected, (state) => {
    state.initialUserFetch = false;
  });
};

export default extraReducers;
