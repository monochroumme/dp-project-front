import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

import { clientApi } from "@/modules/client/api";
import { useAppDispatch } from "@/store";
import { setIsOrderPlaced } from "@/store/cart";

import type { TState } from "@/store/types";

const useOrderItems = (onOrderSuccess?: () => void) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { items, isOrderPlaced } = useSelector((state: TState) => state.cart);

  const { mutateAsync: orderItems, isPending: isOrderingItems } = useMutation({
    mutationKey: ["orderItems"],
    mutationFn: clientApi.orderItems,
    onSuccess: () => {
      dispatch(setIsOrderPlaced(true));
      enqueueSnackbar("Your order was successfully placed!", {
        variant: "success",
      });
    },
    onError: (error) => {
      console.error(error);
      enqueueSnackbar("There was an error while trying to place an order", {
        variant: "error",
      });
    },
  });

  const { mutateAsync: updateOrderedItems, isPending: isUpdatingOrderedItems } =
    useMutation({
      mutationKey: ["updateOrderedItems"],
      mutationFn: clientApi.updateOrderedItems,
      onSuccess: () => {
        enqueueSnackbar("Your order was successfully updated!", {
          variant: "success",
        });
      },
      onError: (error) => {
        console.error(error);
        enqueueSnackbar(
          "There was an error while trying to update your order",
          {
            variant: "error",
          },
        );
      },
    });

  const onOrder = async () => {
    try {
      if (isOrderPlaced) {
        await updateOrderedItems(items);
      } else {
        await orderItems(items);
      }
      onOrderSuccess?.();
    } catch {}
  };

  const isOrdering = isOrderingItems || isUpdatingOrderedItems;

  return {
    onOrder,
    isOrdering,
  };
};

export { useOrderItems };
