import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/store";
import { logout as sLogout } from "@/store/auth";
import { resetCart } from "@/store/cart";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = async () => {
    try {
      dispatch(sLogout());
      dispatch(resetCart());
      navigate("/auth");
    } catch {}
  };

  return {
    logout,
  };
};

export { useLogout };
