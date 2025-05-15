import axios from "axios";

import type { TChangeOrderStatusRequestData } from "@/modules/waiter/types/change-order-status-request-data";

export const waiterApi = {
  getOrders: () =>
    axios({
      method: "GET",
      url: "/waiter/order",
    }),
  changeOrderStatus: (data: TChangeOrderStatusRequestData) => {
    const { id, served } = data;

    return axios({
      method: "PUT",
      url: `/waiter/order/${id}/status`,
      data: { served },
    });
  },
};
