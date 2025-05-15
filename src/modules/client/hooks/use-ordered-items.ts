import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import isEqual from "lodash/isEqual";

import { clientApi } from "@/modules/client/api";
import { useAppDispatch } from "@/store";
import { setCartItems, setIsOrderPlaced, setIsServed } from "@/store/cart";

import type { TCartItem } from "@/modules/shared/types/cart";
import type { AxiosError } from "axios";
import type { TState } from "@/store/types";

const useOrderedItems = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { items, isOrderPlaced, isOrderServed } = useSelector(
    (state: TState) => state.cart,
  );
  const [itemsDb, setItemsDb] = useState<TCartItem[]>([]);

  const { mutateAsync: getOrderedItems, isPending: isGettingOrderedItems } =
    useMutation({
      mutationKey: ["getOrderedItems"],
      mutationFn: clientApi.getOrderedItems,
      onSuccess: (res) => {
        if (res.data.id) {
          setItemsDb(res.data.items);
          dispatch(setIsOrderPlaced(true));
          dispatch(setIsServed(res.data.served));
        }
      },
      onError: (error) => {
        if ((error as AxiosError).response?.status !== 404) {
          console.error(error);
          enqueueSnackbar(
            "There was an error while trying to retrieve your order info",
            {
              variant: "error",
            },
          );
        } else {
          dispatch(setIsOrderPlaced(false));
          dispatch(setIsServed(false));
        }
      },
    });

  // Initial fetch
  useEffect(() => {
    (async () => {
      try {
        const orderedItemsRes = await getOrderedItems();

        if (orderedItemsRes?.data?.items) {
          dispatch(setCartItems(orderedItemsRes.data.items));
        }
      } catch {}
    })();
  }, []);

  // Fetch on an interval
  useEffect(() => {
    if (isOrderPlaced && !isOrderServed) {
      const interval = setInterval(async () => {
        try {
          await getOrderedItems();
        } catch {}
      }, 20_000); // check every 20 seconds

      return () => clearInterval(interval);
    }
  }, [isOrderPlaced, isOrderServed]);

  const localItemsMatchDb = useMemo(
    () => isEqual(items, itemsDb),
    [items, itemsDb],
  );

  return {
    itemsDb,
    setItemsDb,
    isGettingOrderedItems,
    localItemsMatchDb,
  };
};

export { useOrderedItems };
