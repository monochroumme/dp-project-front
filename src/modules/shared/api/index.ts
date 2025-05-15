import axios from "axios";

const sharedApi = {
  getCoffees: () =>
    axios({
      method: "GET",
      url: "/menu/coffee",
    }),
};

export { sharedApi };
