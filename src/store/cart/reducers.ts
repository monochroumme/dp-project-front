import type { TCartItem } from "@/modules/shared/types/cart";
import type { TCartState } from "./types";

const reducers = {
  addToCart: (state: TCartState, action: { payload: TCartItem }) => {
    const itemInCart = state.items.find(
      (item) => item.id === action.payload.id,
    );

    if (!itemInCart) {
      state.items.push(action.payload);
    } else {
      itemInCart.quantity += action.payload.quantity;
    }
  },
  removeFromCart: (state: TCartState, action: { payload: TCartItem }) => {
    const itemInCartIndex = state.items.findIndex(
      (item) => item.id === action.payload.id,
    );
    const itemInCart =
      itemInCartIndex !== -1 ? state.items[itemInCartIndex] : null;

    if (itemInCart) {
      itemInCart.quantity = Math.max(
        itemInCart.quantity - action.payload.quantity,
      );

      if (itemInCart.quantity <= 0) {
        state.items.splice(itemInCartIndex, 1);
      }
    }
  },
  setCartItems: (state: TCartState, action: { payload: TCartItem[] }) => {
    state.items = action.payload;
  },
  setIsOrderPlaced: (state: TCartState, action: { payload: boolean }) => {
    state.isOrderPlaced = action.payload;
  },
  setIsServed: (state: TCartState, action: { payload: boolean }) => {
    state.isOrderServed = action.payload;
  },
  resetCart: (state: TCartState) => {
    state.items = [];
    state.isOrderPlaced = false;
    state.isOrderServed = false;
  },
};

export default reducers;
