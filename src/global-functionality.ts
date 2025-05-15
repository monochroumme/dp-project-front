import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@/store";
import { getUser } from "@/store/auth/thunks";
import { logout } from "@/store/auth";

import type { TState } from "@/store/types";

const authPaths = ["/auth", "/admin/owner/auth", "/admin/waiter/auth"];

const GlobalFunctionality = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, initialUserFetch } = useSelector((state: TState) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:5001/api/v1";

    axios.interceptors.request.use(
      (config) => {
        if (
          // don't add the token to auth requests
          config.url &&
          !["/auth"].includes(config.url)
        ) {
          // add a token to all api calls if the token exists
          const token =
            localStorage.getItem("clientId") ||
            localStorage.getItem("ownerId") ||
            localStorage.getItem("waiterId");

          if (token && config.headers)
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    dispatch(getUser());
  }, []);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // if any api call says 401 Unauthorized, then drop the token and redirect to the login page
        if (
          error.response?.status === 401 &&
          !["/auth"].includes(location.pathname)
        ) {
          handleLogout();
        }

        return Promise.reject(error);
      },
    );
  }, [location.pathname]);

  useEffect(() => {
    const token =
      localStorage.getItem("clientId") ||
      localStorage.getItem("ownerId") ||
      localStorage.getItem("waiterId");

    if (
      (!token && !authPaths.includes(location.pathname)) ||
      (!user && !initialUserFetch && !authPaths.includes(location.pathname))
    ) {
      handleLogout();
    } else if (token && user && authPaths.includes(location.pathname)) {
      if (location.pathname === "/admin/owner/auth") navigate("/admin/owner");
      else if (location.pathname === "/admin/waiter/auth")
        navigate("/admin/waiter");
      else navigate("/");
    }

    return undefined;
  }, [user, initialUserFetch, location.pathname]);

  return null;
};

export { GlobalFunctionality };
