import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";

import { authApi } from "@/modules/auth/api";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/auth";
import { EUserType } from "@/modules/shared/types/user-type";

import type {
  TLoginNonClientPayload,
  TLoginPayload,
} from "@/modules/auth/types/login";

const useLogin = (userType: EUserType, loginSuccessCb?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationKey: ["login", userType],
    mutationFn: async (payload: TLoginPayload | TLoginNonClientPayload) => {
      switch (userType) {
        case "owner":
          if ("username" in payload && "password" in payload) {
            return authApi.loginOwner(payload as TLoginNonClientPayload);
          } else {
            console.error(
              new Error(
                "Payload for owner's login must have username and password",
              ),
            );

            return undefined;
          }
        case "waiter":
          if ("username" in payload && "password" in payload) {
            return authApi.loginWaiter(payload as TLoginNonClientPayload);
          } else {
            console.error(
              new Error(
                "Payload for owner's login must have username and password",
              ),
            );

            return undefined;
          }
        default:
          return authApi.login(payload as TLoginPayload);
      }
    },
    onSuccess: async (res) => {
      if (res?.data.id) {
        switch (userType) {
          case EUserType.CLIENT:
            localStorage.setItem("clientId", res.data.id);
            dispatch(setUser(res.data));
            if (loginSuccessCb) loginSuccessCb();
            break;
          case EUserType.OWNER:
            localStorage.setItem("ownerId", res.data.id);
            dispatch(setUser(res.data));
            break;
          case EUserType.WAITER:
            localStorage.setItem("waiterId", res.data.id);
            dispatch(setUser(res.data));
            break;
        }
      } else {
        enqueueSnackbar("There was an error while trying to log in", {
          variant: "error",
        });
      }
    },
    onError: () => {
      enqueueSnackbar("There was an error while trying to log in", {
        variant: "error",
      });
    },
  });

  return {
    login,
    isLoggingIn,
  };
};

export { useLogin };
