import type { TAuthState } from "./auth/types";
import type { TCartState } from "./cart/types";

export type TStore = never;

export type TState = {
  auth: TAuthState;
  cart: TCartState;
};
