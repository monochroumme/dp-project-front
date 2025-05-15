import axios from "axios";

import type { TOrderItemsPayload } from "@/modules/shared/types/cart";

const clientApi = {
  orderItems: (data: TOrderItemsPayload) =>
    axios({
      method: "POST",
      url: "/menu/order",
      data,
    }),
  updateOrderedItems: (data: TOrderItemsPayload) =>
    axios({
      method: "PUT",
      url: "/menu/order",
      data,
    }),
  getOrderedItems: () =>
    axios({
      method: "GET",
      url: "/menu/order",
    }),
};

export { clientApi };
