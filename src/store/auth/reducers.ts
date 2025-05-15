import type { TAuthState } from "./types";

const reducers = {
  setUser: (state: TAuthState, action: { payload: TAuthState["user"] }) => {
    state.user = action.payload;
  },
  logout: (state: TAuthState) => {
    localStorage.removeItem("clientId");
    localStorage.removeItem("ownerId");
    localStorage.removeItem("waiterId");
    state.user = null;
    state.initialUserFetch = true;
  },
};

export default reducers;
