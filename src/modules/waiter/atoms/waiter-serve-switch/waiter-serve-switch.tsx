import { Switch } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { waiterApi } from "@/modules/waiter/api";

import type { TOrder } from "@/modules/shared/types/order";

type WaiterServeSwitchProps = {
  order: TOrder;
};

const WaiterServeSwitch = (props: WaiterServeSwitchProps) => {
  const { order } = props;

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutateAsync: changeOrderStatus, isPending: isChangingOrderStatus } =
    useMutation({
      mutationKey: ["change-order-status"],
      mutationFn: waiterApi.changeOrderStatus,
      onError: (error) => {
        console.error(error);
        enqueueSnackbar(
          "There was an error while trying to change the order status",
          {
            variant: "error",
          },
        );
      },
    });

  const onChange = async (checked: boolean) => {
    try {
      await changeOrderStatus({ id: order.id, served: checked });
      queryClient.setQueryData(["orders"], (oldOrderRes) => ({
        ...oldOrderRes,
        data: oldOrderRes.data.map((oldOrder) => {
          if (oldOrder.id === order.id) {
            return {
              ...oldOrder,
              served: checked,
            };
          }

          return oldOrder;
        }),
      }));
    } catch {}
  };

  return (
    <Switch
      checked={order.served}
      disabled={isChangingOrderStatus}
      loading={isChangingOrderStatus}
      onChange={onChange}
    />
  );
};

export { WaiterServeSwitch };
