import axios from "axios";

import type {
  TLoginPayload,
  TLoginNonClientPayload,
} from "@/modules/auth/types/login";

const authApi = {
  login: (data: TLoginPayload) =>
    axios({
      method: "POST",
      url: "/auth/login",
      data,
    }),
  loginOwner: (data: TLoginNonClientPayload) =>
    axios({
      method: "POST",
      url: "/auth/login/owner",
      data,
    }),
  loginWaiter: (data: TLoginNonClientPayload) =>
    axios({
      method: "POST",
      url: "/auth/login/waiter",
      data,
    }),
  logout: () =>
    axios({
      method: "POST",
      url: "/auth/logout",
    }),
};

export { authApi };
