import axios from "axios";

import type { TWaiterCreatePayload } from "@/modules/shared/types/waiter";

export const ownerApi = {
  getWaiters: () =>
    axios({
      method: "GET",
      url: "/owner/waiter",
    }),
  createWaiter: (data: TWaiterCreatePayload) =>
    axios({
      method: "POST",
      url: "/owner/waiter",
      data,
    }),
  deleteWaiter: (id: string) =>
    axios({
      method: "DELETE",
      url: `/owner/waiter/${id}`,
    }),
  updateWaiter: (payload: TWaiterCreatePayload & { id: string }) => {
    const { id, ...data } = payload;

    return axios({
      method: "PUT",
      url: `/owner/waiter/${id}`,
      data,
    });
  },
};
