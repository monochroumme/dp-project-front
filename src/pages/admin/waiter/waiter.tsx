import { Button, Table, Empty } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { useCallback, useEffect } from "react";

import { PageCardLayout } from "@/layouts/page-card-layout";
import { EUserType } from "@/modules/shared/types/user-type";
import { waiterApi } from "@/modules/waiter/api";
import { WaiterServeSwitch } from "@/modules/waiter/atoms/waiter-serve-switch";

import type { ColumnType } from "antd/es/table";
import type { TOrder } from "@/modules/shared/types/order";

const columns: ColumnType<TOrder>[] = [
  {
    dataIndex: "clientName",
    title: "Client name",
  },
  {
    dataIndex: "order",
    title: "Order",
    render: (_, order) => order.items.map((item) => item.name).join(", "),
    width: "300px",
  },
  {
    dataIndex: "_actions_",
    title: "Actions",
    width: "100px",
    render: (_, order) => <WaiterServeSwitch order={order} />,
  },
];

const AdminWaiterPage = () => {
  const queryClient = useQueryClient();

  const { data: orders, isPending: isLoadingOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: waiterApi.getOrders,
    select: (res) => res.data as TOrder[],
  });

  const onRefetchOrders = useCallback(async () => {
    await queryClient.refetchQueries({ queryKey: ["orders"] });
  }, []);

  // Update orders every 20 seconds
  useEffect(() => {
    const interval = setInterval(onRefetchOrders, 20_000);

    return () => clearInterval(interval);
  }, [onRefetchOrders]);

  return (
    <PageCardLayout
      className="admin-waiter-page"
      userType={EUserType.WAITER}
      headerRightContent={
        <Button
          disabled={isLoadingOrders}
          icon={<ReloadOutlined />}
          onClick={onRefetchOrders}
          type="text"
        />
      }
    >
      {isLoadingOrders && !(orders as any)?.length ? <LoadingOutlined /> : null}
      {!isLoadingOrders && !orders?.length ? <Empty /> : null}
      {!isLoadingOrders && orders?.length ? (
        <Table
          columns={columns}
          dataSource={orders}
          pagination={{ position: ["bottomCenter"], hideOnSinglePage: true }}
        />
      ) : null}
    </PageCardLayout>
  );
};

export { AdminWaiterPage };
