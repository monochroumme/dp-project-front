import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { TClient } from "@/modules/shared/types/client";
import type { AxiosError } from "axios";

const getUser = createAsyncThunk<
  TClient | null,
  void,
  { rejectValue: AxiosError | null }
>("auth/getUser", async (_, { rejectWithValue }) => {
  const clientToken = localStorage.getItem("clientId");
  const ownerToken = localStorage.getItem("ownerId");
  const waiterToken = localStorage.getItem("waiterId");

  const hasToken = clientToken || ownerToken || waiterToken;

  if (hasToken) {
    let endpoint = "/auth/client";

    if (ownerToken) endpoint = "/auth/owner";
    else if (waiterToken) endpoint = "/auth/waiter";

    return new Promise((resolve, reject) => {
      axios
        .get(endpoint)
        .then((res) => {
          resolve(res?.data || null);
        })
        .catch((e: AxiosError) => {
          reject(rejectWithValue(e));
        });
    });
  }

  return null;
});

export { getUser };
