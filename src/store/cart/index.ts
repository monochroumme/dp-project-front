import { createSlice } from "@reduxjs/toolkit";

import type { TCartState } from "./types";

import reducers from "./reducers";

const initialState: TCartState = {
  items: [],
  isOrderPlaced: false,
  isOrderServed: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers,
});

export default cartSlice.reducer;

export const {
  addToCart,
  removeFromCart,
  setCartItems,
  setIsOrderPlaced,
  setIsServed,
  resetCart,
} = cartSlice.actions;
