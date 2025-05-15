import type { TCartItem } from "@/modules/shared/types/cart";

export type TCartState = {
  items: TCartItem[];
  isOrderPlaced: boolean;
  isOrderServed: boolean;
};
